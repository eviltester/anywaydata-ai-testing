import { writeFile } from 'node:fs/promises';
import path from 'node:path';

const port = 9227;
const outDir = path.join(process.cwd(), 'docs/testing/20260625/issue-230-001');
const screenshotsDir = path.join(outDir, 'screenshots');
const supportDir = path.join(outDir, 'support');

class Cdp {
  constructor(wsUrl) {
    this.ws = new WebSocket(wsUrl);
    this.nextId = 1;
    this.pending = new Map();
    this.ws.addEventListener('message', (event) => {
      const msg = JSON.parse(event.data);
      if (!msg.id || !this.pending.has(msg.id)) return;
      const { resolve, reject } = this.pending.get(msg.id);
      this.pending.delete(msg.id);
      msg.error ? reject(new Error(JSON.stringify(msg.error))) : resolve(msg.result || {});
    });
  }

  static async connect() {
    const version = await fetch(`http://127.0.0.1:${port}/json/version`).then((r) => r.json());
    const cdp = new Cdp(version.webSocketDebuggerUrl);
    await new Promise((resolve, reject) => {
      cdp.ws.addEventListener('open', resolve, { once: true });
      cdp.ws.addEventListener('error', reject, { once: true });
    });
    return cdp;
  }

  send(method, params = {}, sessionId) {
    const id = this.nextId++;
    const payload = sessionId ? { id, method, params, sessionId } : { id, method, params };
    this.ws.send(JSON.stringify(payload));
    return new Promise((resolve, reject) => this.pending.set(id, { resolve, reject }));
  }

  close() {
    this.ws.close();
  }
}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function evalJson(cdp, sessionId, expression) {
  const result = await cdp.send('Runtime.evaluate', {
    expression,
    awaitPromise: true,
    returnByValue: true,
  }, sessionId);
  if (result.exceptionDetails) {
    throw new Error(result.exceptionDetails.exception?.description || result.exceptionDetails.text || 'Runtime exception');
  }
  return result.result?.value;
}

async function waitFor(cdp, sessionId, expression, timeout = 10000) {
  const start = Date.now();
  while (Date.now() - start < timeout) {
    const value = await evalJson(cdp, sessionId, expression);
    if (value) return value;
    await delay(150);
  }
  throw new Error(`Timed out waiting for ${expression}`);
}

async function screenshot(cdp, sessionId, name) {
  const { data } = await cdp.send('Page.captureScreenshot', {
    format: 'png',
    captureBeyondViewport: false,
  }, sessionId);
  await writeFile(path.join(screenshotsDir, name), Buffer.from(data, 'base64'));
  return `screenshots/${name}`;
}

async function createPage(cdp, url) {
  const { targetId } = await cdp.send('Target.createTarget', { url: 'about:blank' });
  const { sessionId } = await cdp.send('Target.attachToTarget', { targetId, flatten: true });
  await cdp.send('Page.enable', {}, sessionId);
  await cdp.send('Runtime.enable', {}, sessionId);
  await cdp.send('Emulation.setDeviceMetricsOverride', {
    width: 1366,
    height: 900,
    deviceScaleFactor: 1,
    mobile: false,
  }, sessionId);
  await navigate(cdp, sessionId, url);
  return sessionId;
}

async function navigate(cdp, sessionId, url) {
  await cdp.send('Page.navigate', { url }, sessionId);
  await waitFor(cdp, sessionId, `(() => document.readyState === 'complete')()`, 20000);
  await delay(1200);
}

async function press(cdp, sessionId, key, code = key, windowsVirtualKeyCode = undefined) {
  const params = { key, code, type: 'rawKeyDown' };
  if (windowsVirtualKeyCode) params.windowsVirtualKeyCode = windowsVirtualKeyCode;
  await cdp.send('Input.dispatchKeyEvent', params, sessionId);
  await cdp.send('Input.dispatchKeyEvent', { ...params, type: 'keyUp' }, sessionId);
  await delay(250);
}

async function openDomainPicker(cdp, sessionId) {
  await evalJson(cdp, sessionId, `(() => {
    const type = document.querySelector('select[data-field="sourceType"]') || document.querySelector('select');
    type.value = 'domain';
    type.dispatchEvent(new Event('change', { bubbles: true }));
    const button = document.querySelector('[data-action="pick-command"]');
    button.focus();
    button.click();
    return true;
  })()`);
  await waitFor(cdp, sessionId, `(() => !!document.querySelector('.method-picker-overlay'))()`);
  await delay(250);
}

async function state(cdp, sessionId, label) {
  return {
    label,
    ...(await evalJson(cdp, sessionId, `(() => {
      const overlay = document.querySelector('.method-picker-overlay');
      const active = document.activeElement;
      const visibleTiles = [...document.querySelectorAll('[data-role="method-picker-tile"]')].filter(el => el.offsetParent !== null);
      const selectedTile = document.querySelector('[data-role="method-picker-tile"].is-selected');
      const detail = document.querySelector('[data-role="method-picker-detail"], .method-picker-detail');
      const search = document.querySelector('[data-role="method-picker-search"]');
      const button = document.querySelector('[data-action="pick-command"]');
      const commandSelect = document.querySelector('select[data-field="command"]');
      const docsLink = document.querySelector('[data-field="faker-doc-link"], .shared-schema-help-link');
      const paramsButton = document.querySelector('[data-action="edit-params"]');
      return {
        url: location.href,
        overlayOpen: !!overlay,
        activeTag: active?.tagName || '',
        activeRole: active?.getAttribute('data-role') || active?.getAttribute('role') || '',
        activeText: (active?.innerText || active?.value || active?.placeholder || active?.getAttribute('aria-label') || '').trim(),
        focusOnPickerButton: active === button,
        searchValue: search?.value || '',
        activeTab: document.querySelector('[data-role="method-picker-tab"].is-active')?.textContent.trim() || '',
        visibleTileCount: visibleTiles.length,
        firstTiles: visibleTiles.slice(0, 10).map(el => el.querySelector('[data-role="method-picker-command"]')?.textContent.trim() || el.textContent.trim()),
        selectedTile: selectedTile?.querySelector('[data-role="method-picker-command"]')?.textContent.trim() || '',
        detailText: detail?.innerText?.slice(0, 2200) || '',
        rowButtonText: button?.innerText.trim() || '',
        rowCommandValue: commandSelect?.value || '',
        rowSourceType: document.querySelector('select[data-field="sourceType"]')?.value || '',
        paramsButtonDisabled: paramsButton ? !!paramsButton.disabled : null,
        docsHref: docsLink?.href || '',
        bodyStatus: document.body.innerText.match(/Schema validation failed[^\\n]*|Generate complete[^\\n]*|Generated[^\\n]*/)?.[0] || ''
      };
    })()`))
  };
}

async function searchPicker(cdp, sessionId, value) {
  await evalJson(cdp, sessionId, `(() => {
    const search = document.querySelector('[data-role="method-picker-search"]');
    search.focus();
    search.value = ${JSON.stringify(value)};
    search.dispatchEvent(new Event('input', { bubbles: true }));
    return true;
  })()`);
  await delay(350);
}

async function clickPickerCommand(cdp, sessionId, command) {
  return evalJson(cdp, sessionId, `(() => {
    const tile = [...document.querySelectorAll('[data-role="method-picker-tile"]')]
      .find(el => (el.querySelector('[data-role="method-picker-command"]')?.textContent.trim() || '') === ${JSON.stringify(command)});
    if (!tile) return false;
    tile.click();
    return true;
  })()`);
}

async function clickBySelector(cdp, sessionId, selector) {
  await evalJson(cdp, sessionId, `(() => {
    const el = document.querySelector(${JSON.stringify(selector)});
    if (!el) return false;
    el.click();
    return true;
  })()`);
  await delay(300);
}

async function clickButtonByText(cdp, sessionId, text) {
  return evalJson(cdp, sessionId, `(() => {
    const el = [...document.querySelectorAll('button')].find(button => button.textContent.trim() === ${JSON.stringify(text)});
    if (!el) return false;
    el.click();
    return true;
  })()`);
}

const results = [];
const screenshots = [];
const cdp = await Cdp.connect();

try {
  const sessionId = await createPage(cdp, 'https://eviltester.github.io/grid-table-editor/generator.html');

  await openDomainPicker(cdp, sessionId);
  results.push(await state(cdp, sessionId, 'open-domain-picker'));
  screenshots.push(await screenshot(cdp, sessionId, 'ux-regression-04-method-picker-open-full.png'));
  await press(cdp, sessionId, 'Escape', 'Escape', 27);
  results.push(await state(cdp, sessionId, 'escape-after-open'));

  await openDomainPicker(cdp, sessionId);
  await searchPicker(cdp, sessionId, 'internet.httpMethod');
  results.push(await state(cdp, sessionId, 'search-internet-httpMethod'));
  screenshots.push(await screenshot(cdp, sessionId, 'ux-regression-05-method-picker-search-httpmethod.png'));
  await press(cdp, sessionId, 'Enter', 'Enter', 13);
  results.push(await state(cdp, sessionId, 'enter-after-search'));

  if ((await state(cdp, sessionId, 'check-open')).overlayOpen) {
    await clickBySelector(cdp, sessionId, '[data-role="method-picker-cancel-button"], .method-picker-cancel');
  }
  results.push(await state(cdp, sessionId, 'cancel-after-search'));

  await openDomainPicker(cdp, sessionId);
  await searchPicker(cdp, sessionId, 'internet.httpMethod');
  await clickPickerCommand(cdp, sessionId, 'internet.httpMethod');
  results.push(await state(cdp, sessionId, 'selected-httpmethod-before-backdrop'));
  await cdp.send('Input.dispatchMouseEvent', { type: 'mousePressed', x: 10, y: 10, button: 'left', clickCount: 1 }, sessionId);
  await cdp.send('Input.dispatchMouseEvent', { type: 'mouseReleased', x: 10, y: 10, button: 'left', clickCount: 1 }, sessionId);
  await delay(500);
  results.push(await state(cdp, sessionId, 'backdrop-click-after-selection'));
  if ((await state(cdp, sessionId, 'check-open-2')).overlayOpen) {
    await clickBySelector(cdp, sessionId, '[data-role="method-picker-cancel-button"], .method-picker-cancel');
  }

  await openDomainPicker(cdp, sessionId);
  await searchPicker(cdp, sessionId, 'internet.httpMethod');
  await clickPickerCommand(cdp, sessionId, 'internet.httpMethod');
  results.push(await state(cdp, sessionId, 'selected-httpmethod-before-apply'));
  await clickBySelector(cdp, sessionId, '[data-role="method-picker-apply-button"], .method-picker-apply');
  results.push(await state(cdp, sessionId, 'after-apply-httpmethod'));

  await evalJson(cdp, sessionId, `(() => {
    const name = document.querySelector('input[data-field="name"]');
    name.value = 'method';
    name.dispatchEvent(new Event('input', { bubbles: true }));
    const count = document.querySelector('input[data-role="input"][type="number"], input[type="number"]');
    count.value = '5';
    count.dispatchEvent(new Event('input', { bubbles: true }));
    return true;
  })()`);
  await clickButtonByText(cdp, sessionId, 'Preview');
  await delay(1200);
  results.push({
    label: 'after-preview-httpmethod',
    ...(await evalJson(cdp, sessionId, `(() => ({
      bodyStatus: document.body.innerText.match(/Schema validation failed[^\\n]*|Generate complete[^\\n]*|Generated[^\\n]*|Preview[^\\n]*/)?.[0] || '',
      outputText: [...document.querySelectorAll('textarea, pre, code, .tabulator-cell')].map(el => el.innerText || el.value || '').filter(Boolean).slice(-10),
      visibleTextTail: document.body.innerText.slice(-2500)
    }))()`))
  });
  screenshots.push(await screenshot(cdp, sessionId, 'ux-regression-06-generator-preview-httpmethod.png'));

  await openDomainPicker(cdp, sessionId);
  results.push(await state(cdp, sessionId, 'reopen-after-apply-selected-continuity'));
  await clickBySelector(cdp, sessionId, '[data-tab="recent"]');
  results.push(await state(cdp, sessionId, 'recent-tab-after-apply'));
  await clickBySelector(cdp, sessionId, '[data-tab="domain:string"]');
  await searchPicker(cdp, sessionId, 'string.symbol');
  await clickPickerCommand(cdp, sessionId, 'string.symbol');
  results.push(await state(cdp, sessionId, 'selected-string-symbol-before-cancel'));
  screenshots.push(await screenshot(cdp, sessionId, 'ux-regression-07-method-picker-string-symbol-detail.png'));
  await clickBySelector(cdp, sessionId, '[data-role="method-picker-cancel-button"], .method-picker-cancel');
  results.push(await state(cdp, sessionId, 'after-cancel-string-symbol'));

  await openDomainPicker(cdp, sessionId);
  await clickBySelector(cdp, sessionId, '[data-tab="faker"]');
  await searchPicker(cdp, sessionId, 'helpers.mustache');
  await clickPickerCommand(cdp, sessionId, 'helpers.mustache');
  results.push(await state(cdp, sessionId, 'faker-tab-helper-selected-in-domain-picker'));
  screenshots.push(await screenshot(cdp, sessionId, 'ux-regression-08-method-picker-faker-helper-detail.png'));
  await clickBySelector(cdp, sessionId, '[data-role="method-picker-cancel-button"], .method-picker-cancel');

  let docsCheck;
  try {
    docsCheck = await fetch('https://eviltester.github.io/grid-table-editor/site/docs/test-data/domain/internet').then(async (r) => ({
      url: r.url,
      status: r.status,
      ok: r.ok,
      containsHttpMethod: (await r.text()).includes('internet.httpMethod')
    }));
  } catch (error) {
    docsCheck = { error: error.message };
  }
  results.push({ label: 'published-docs-domain-internet-fetch', docsCheck });

  await navigate(cdp, sessionId, 'https://eviltester.github.io/grid-table-editor/app.html');
  const appBefore = await evalJson(cdp, sessionId, `(() => ({
    url: location.href,
    hasTestDataText: document.body.innerText.includes('Test Data'),
    summaries: [...document.querySelectorAll('summary')].map(s => s.textContent.trim()).slice(0, 30),
    buttons: [...document.querySelectorAll('button')].map(b => b.textContent.trim() || b.getAttribute('aria-label') || b.title).filter(Boolean).slice(0, 80)
  }))()`);
  await evalJson(cdp, sessionId, `(() => {
    const summary = [...document.querySelectorAll('summary')].find(s => /Test Data|Data Generator/i.test(s.textContent));
    if (summary && !summary.closest('details')?.open) summary.click();
    const type = document.querySelector('select[data-field="sourceType"]');
    if (type) {
      type.value = 'domain';
      type.dispatchEvent(new Event('change', { bubbles: true }));
    }
    return true;
  })()`);
  await delay(700);
  const appAfterOpen = await evalJson(cdp, sessionId, `(() => ({
    url: location.href,
    hasPickerButton: !!document.querySelector('[data-action="pick-command"]'),
    bodyText: document.body.innerText.slice(0, 5000)
  }))()`);
  if (appAfterOpen.hasPickerButton) {
    await openDomainPicker(cdp, sessionId);
    await searchPicker(cdp, sessionId, 'internet.httpMethod');
    await clickPickerCommand(cdp, sessionId, 'internet.httpMethod');
    await clickBySelector(cdp, sessionId, '[data-role="method-picker-apply-button"], .method-picker-apply');
    await evalJson(cdp, sessionId, `(() => {
      const name = document.querySelector('input[data-field="name"]');
      if (name) {
        name.value = 'method';
        name.dispatchEvent(new Event('input', { bubbles: true }));
      }
      const count = document.querySelector('input[data-role="input"][type="number"], input[type="number"]');
      if (count) {
        count.value = '3';
        count.dispatchEvent(new Event('input', { bubbles: true }));
      }
      return true;
    })()`);
    const generated = await clickButtonByText(cdp, sessionId, 'Generate');
    if (!generated) await clickButtonByText(cdp, sessionId, 'Generate Data');
    await delay(1500);
  }
  results.push({
    label: 'app-embedded-test-data-integration',
    appBefore,
    appAfterOpen,
    ...(await evalJson(cdp, sessionId, `(() => ({
      rowButtonText: document.querySelector('[data-action="pick-command"]')?.innerText.trim() || '',
      bodyStatus: document.body.innerText.match(/Schema validation failed[^\\n]*|Generate complete[^\\n]*|Grid updated[^\\n]*|Generated[^\\n]*/)?.[0] || '',
      gridText: document.body.innerText.slice(0, 7000)
    }))()`))
  });
  screenshots.push(await screenshot(cdp, sessionId, 'ux-regression-09-app-embedded-generator-httpmethod.png'));

  await writeFile(path.join(supportDir, 'ux-regression-flow-results.json'), JSON.stringify({ results, screenshots }, null, 2));
  console.log(JSON.stringify({ ok: true, results: results.length, screenshots }, null, 2));
} finally {
  cdp.close();
}
