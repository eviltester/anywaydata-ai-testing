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
      if (msg.id && this.pending.has(msg.id)) {
        const { resolve, reject } = this.pending.get(msg.id);
        this.pending.delete(msg.id);
        msg.error ? reject(new Error(JSON.stringify(msg.error))) : resolve(msg.result || {});
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
    this.ws.send(JSON.stringify(sessionId ? { id, method, params, sessionId } : { id, method, params }));
    return new Promise((resolve, reject) => this.pending.set(id, { resolve, reject }));
  }
  close() { this.ws.close(); }
}
async function evalJson(cdp, sessionId, expression) {
  const result = await cdp.send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true }, sessionId);
  if (result.exceptionDetails) throw new Error(result.exceptionDetails.text || 'Runtime exception');
  return result.result?.value;
}
async function delay(ms) { return new Promise((resolve) => setTimeout(resolve, ms)); }

const cdp = await Cdp.connect();
try {
  const { targetId } = await cdp.send('Target.createTarget', { url: 'about:blank' });
  const { sessionId } = await cdp.send('Target.attachToTarget', { targetId, flatten: true });
  await cdp.send('Page.enable', {}, sessionId);
  await cdp.send('Runtime.enable', {}, sessionId);
  await cdp.send('Page.navigate', { url: 'https://eviltester.github.io/grid-table-editor/generator.html' }, sessionId);
  await delay(2500);
  const result = await evalJson(cdp, sessionId, `(() => {
    const type = document.querySelector('select');
    type.value = 'domain';
    type.dispatchEvent(new Event('change', { bubbles: true }));
    const row = type.closest('fieldset, tr, div') || document.body;
    const pick = (el, i) => ({
      i,
      tag: el.tagName,
      type: el.getAttribute('type'),
      text: (el.innerText || el.value || el.placeholder || el.getAttribute('aria-label') || el.title || '').trim(),
      id: el.id,
      name: el.getAttribute('name'),
      cls: el.className,
      html: el.outerHTML.slice(0, 600)
    });
    return {
      text: document.body.innerText.slice(0, 7000),
      active: document.activeElement?.outerHTML?.slice(0, 300),
      controls: [...document.querySelectorAll('button,input,select,textarea,a,summary,[role=dialog],[role=tab]')].map(pick).filter(x => x.text || x.id || x.name || x.cls).slice(0, 260),
      rowHtml: row.outerHTML.slice(0, 5000)
    };
  })()`);
  await writeFile(path.join(outDir, 'support/ux-regression-domain-inspect.json'), JSON.stringify(result, null, 2));
  console.log(JSON.stringify({ ok: true, controls: result.controls.length, text: result.text.slice(0, 1000) }, null, 2));
} finally {
  cdp.close();
}
