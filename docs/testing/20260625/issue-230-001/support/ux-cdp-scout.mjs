import { writeFile } from 'node:fs/promises';
import path from 'node:path';

const port = 9227;
const root = process.cwd();
const outDir = path.join(root, 'docs/testing/20260625/issue-230-001');
const screenshotsDir = path.join(outDir, 'screenshots');
const supportDir = path.join(outDir, 'support');

class Cdp {
  constructor(wsUrl) {
    this.ws = new WebSocket(wsUrl);
    this.nextId = 1;
    this.pending = new Map();
    this.events = [];
    this.ws.addEventListener('message', (event) => {
      const msg = JSON.parse(event.data);
      if (msg.id && this.pending.has(msg.id)) {
        const { resolve, reject } = this.pending.get(msg.id);
        this.pending.delete(msg.id);
        if (msg.error) reject(new Error(JSON.stringify(msg.error)));
        else resolve(msg.result || {});
      } else {
        this.events.push(msg);
      }
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
    const payload = { id, method, params };
    if (sessionId) payload.sessionId = sessionId;
    this.ws.send(JSON.stringify(payload));
    return new Promise((resolve, reject) => this.pending.set(id, { resolve, reject }));
  }

  close() {
    this.ws.close();
  }
}

async function createPage(cdp, url) {
  const { targetId } = await cdp.send('Target.createTarget', { url: 'about:blank' });
  const { sessionId } = await cdp.send('Target.attachToTarget', { targetId, flatten: true });
  await cdp.send('Page.enable', {}, sessionId);
  await cdp.send('Runtime.enable', {}, sessionId);
  await cdp.send('Page.setViewport', { width: 1366, height: 900 }, sessionId).catch(() => {});
  await navigate(cdp, sessionId, url);
  return sessionId;
}

async function navigate(cdp, sessionId, url) {
  await cdp.send('Page.navigate', { url }, sessionId);
  await waitForLoad(cdp, sessionId);
}

async function waitForLoad(cdp, sessionId) {
  for (let i = 0; i < 80; i++) {
    const state = await evalJson(cdp, sessionId, `(() => document.readyState)()`);
    if (state === 'complete') return;
    await delay(250);
  }
}

async function waitFor(cdp, sessionId, predicateSource, timeout = 10000) {
  const start = Date.now();
  while (Date.now() - start < timeout) {
    const value = await evalJson(cdp, sessionId, predicateSource);
    if (value) return value;
    await delay(150);
  }
  throw new Error(`Timed out waiting for ${predicateSource}`);
}

async function evalJson(cdp, sessionId, expression) {
  const result = await cdp.send('Runtime.evaluate', {
    expression,
    awaitPromise: true,
    returnByValue: true,
  }, sessionId);
  if (result.exceptionDetails) {
    throw new Error(result.exceptionDetails.text || 'Runtime exception');
  }
  return result.result?.value;
}

async function screenshot(cdp, sessionId, name) {
  const result = await cdp.send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false }, sessionId);
  const file = path.join(screenshotsDir, name);
  await writeFile(file, Buffer.from(result.data, 'base64'));
  return file;
}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const cdp = await Cdp.connect();
try {
  const sessionId = await createPage(cdp, 'https://eviltester.github.io/grid-table-editor/');
  await waitFor(cdp, sessionId, `(() => document.body && document.body.innerText.includes('Open app.html'))()`);
  const landing = await evalJson(cdp, sessionId, `(() => ({
    url: location.href,
    title: document.title,
    text: document.body.innerText.slice(0, 2000),
    links: [...document.querySelectorAll('a')].map(a => ({ text: a.innerText.trim(), href: a.href })).filter(x => x.text || x.href)
  }))()`);
  await screenshot(cdp, sessionId, 'ux-regression-00-browser-proof-landing.png');

  await evalJson(cdp, sessionId, `(() => [...document.querySelectorAll('a')].find(a => a.innerText.includes('Open app.html')).click())()`);
  await waitFor(cdp, sessionId, `(() => location.href.includes('app.html') && document.body.innerText.length > 100)()`);
  await delay(2000);
  const appProof = await evalJson(cdp, sessionId, `(() => ({
    url: location.href,
    title: document.title,
    text: document.body.innerText.slice(0, 3000),
    buttons: [...document.querySelectorAll('button,input[type=button],summary,a')].map((el, i) => ({
      i,
      tag: el.tagName,
      text: (el.innerText || el.value || el.getAttribute('aria-label') || el.title || '').trim(),
      id: el.id,
      classes: el.className
    })).filter(x => x.text || x.id).slice(0, 120)
  }))()`);
  await screenshot(cdp, sessionId, 'ux-regression-01-browser-proof-app-loaded.png');

  await navigate(cdp, sessionId, 'https://eviltester.github.io/grid-table-editor/generator.html');
  await delay(2000);
  const generator = await evalJson(cdp, sessionId, `(() => ({
    url: location.href,
    title: document.title,
    text: document.body.innerText.slice(0, 5000),
    controls: [...document.querySelectorAll('button,input,select,textarea,a,summary,[role=tab],[role=dialog]')].map((el, i) => ({
      i,
      tag: el.tagName,
      type: el.getAttribute('type'),
      role: el.getAttribute('role'),
      text: (el.innerText || el.value || el.getAttribute('aria-label') || el.title || el.placeholder || '').trim(),
      id: el.id,
      name: el.getAttribute('name'),
      classes: el.className,
      disabled: el.disabled || el.getAttribute('aria-disabled')
    })).filter(x => x.text || x.id || x.name || x.role).slice(0, 200)
  }))()`);
  await screenshot(cdp, sessionId, 'ux-regression-02-generator-initial.png');

  await writeFile(path.join(supportDir, 'ux-regression-scout.json'), JSON.stringify({ landing, appProof, generator }, null, 2));
  console.log(JSON.stringify({
    ok: true,
    landingTitle: landing.title,
    appUrl: appProof.url,
    generatorControls: generator.controls.length,
    screenshots: [
      'screenshots/ux-regression-00-browser-proof-landing.png',
      'screenshots/ux-regression-01-browser-proof-app-loaded.png',
      'screenshots/ux-regression-02-generator-initial.png'
    ]
  }, null, 2));
} finally {
  cdp.close();
}
