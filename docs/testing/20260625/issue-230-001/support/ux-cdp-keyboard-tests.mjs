import { writeFile } from 'node:fs/promises';
import path from 'node:path';

const port = 9227;
const outDir = path.join(process.cwd(), 'docs/testing/20260625/issue-230-001');

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
    this.ws.send(JSON.stringify(sessionId ? { id, method, params, sessionId } : { id, method, params }));
    return new Promise((resolve, reject) => this.pending.set(id, { resolve, reject }));
  }
  close() { this.ws.close(); }
}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function evalJson(cdp, sessionId, expression) {
  const result = await cdp.send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true }, sessionId);
  if (result.exceptionDetails) throw new Error(result.exceptionDetails.exception?.description || result.exceptionDetails.text || 'Runtime exception');
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

async function key(cdp, sessionId, keyName, code, windowsVirtualKeyCode) {
  await cdp.send('Input.dispatchKeyEvent', { type: 'rawKeyDown', key: keyName, code, windowsVirtualKeyCode }, sessionId);
  await cdp.send('Input.dispatchKeyEvent', { type: 'keyUp', key: keyName, code, windowsVirtualKeyCode }, sessionId);
  await delay(250);
}

async function state(cdp, sessionId, label) {
  return {
    label,
    ...(await evalJson(cdp, sessionId, `(() => {
      const active = document.activeElement;
      const search = document.querySelector('[data-role="method-picker-search"]');
      const button = document.querySelector('[data-action="pick-command"]');
      return {
        overlayOpen: !!document.querySelector('.method-picker-overlay'),
        activeTag: active?.tagName || '',
        activeRole: active?.getAttribute('data-role') || active?.getAttribute('role') || '',
        activeText: (active?.innerText || active?.value || active?.placeholder || active?.getAttribute('aria-label') || '').trim(),
        searchValue: search?.value || '',
        selectedTile: document.querySelector('[data-role="method-picker-tile"].is-selected [data-role="method-picker-command"]')?.textContent.trim() || '',
        rowButtonText: button?.innerText.trim() || '',
        rowCommandValue: document.querySelector('select[data-field="command"]')?.value || '',
        focusOnPickerButton: active === button
      };
    })()`))
  };
}

async function setup(cdp, sessionId) {
  await cdp.send('Page.navigate', { url: 'https://eviltester.github.io/grid-table-editor/generator.html' }, sessionId);
  await waitFor(cdp, sessionId, `(() => document.readyState === 'complete')()`, 20000);
  await delay(1200);
  await evalJson(cdp, sessionId, `(() => {
    const type = document.querySelector('select[data-field="sourceType"]');
    type.value = 'domain';
    type.dispatchEvent(new Event('change', { bubbles: true }));
    document.querySelector('[data-action="pick-command"]').click();
    return true;
  })()`);
  await waitFor(cdp, sessionId, `(() => !!document.querySelector('.method-picker-overlay'))()`);
  await delay(300);
}

const cdp = await Cdp.connect();
const results = [];
try {
  const { targetId } = await cdp.send('Target.createTarget', { url: 'about:blank' });
  const { sessionId } = await cdp.send('Target.attachToTarget', { targetId, flatten: true });
  await cdp.send('Page.enable', {}, sessionId);
  await cdp.send('Runtime.enable', {}, sessionId);
  await cdp.send('Emulation.setDeviceMetricsOverride', { width: 1366, height: 900, deviceScaleFactor: 1, mobile: false }, sessionId);

  await setup(cdp, sessionId);
  results.push(await state(cdp, sessionId, 'slash-before'));
  await evalJson(cdp, sessionId, `(() => {
    const firstTile = document.querySelector('[data-role="method-picker-tile"]');
    firstTile.focus();
    return document.activeElement === firstTile;
  })()`);
  results.push(await state(cdp, sessionId, 'slash-with-tile-focused-before-key'));
  await key(cdp, sessionId, '/', 'Slash', 191);
  results.push(await state(cdp, sessionId, 'slash-after'));

  await evalJson(cdp, sessionId, `(() => {
    const search = document.querySelector('[data-role="method-picker-search"]');
    search.value = 'internet.httpMethod';
    search.dispatchEvent(new Event('input', { bubbles: true }));
    const tile = [...document.querySelectorAll('[data-role="method-picker-tile"]')]
      .find(el => el.querySelector('[data-role="method-picker-command"]')?.textContent.trim() === 'internet.httpMethod');
    tile.focus();
    return document.activeElement === tile;
  })()`);
  results.push(await state(cdp, sessionId, 'enter-with-tile-focused-before-key'));
  await key(cdp, sessionId, 'Enter', 'Enter', 13);
  results.push(await state(cdp, sessionId, 'enter-with-tile-focused-after-key'));

  const { data } = await cdp.send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false }, sessionId);
  await writeFile(path.join(outDir, 'screenshots/ux-regression-10-keyboard-enter-after-tile-focus.png'), Buffer.from(data, 'base64'));
  await writeFile(path.join(outDir, 'support/ux-regression-keyboard-results.json'), JSON.stringify(results, null, 2));
  console.log(JSON.stringify({ ok: true, results }, null, 2));
} finally {
  cdp.close();
}
