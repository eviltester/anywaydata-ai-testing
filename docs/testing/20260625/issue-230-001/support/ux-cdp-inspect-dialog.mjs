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
async function shot(cdp, sessionId, name) {
  const { data } = await cdp.send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false }, sessionId);
  await writeFile(path.join(outDir, 'screenshots', name), Buffer.from(data, 'base64'));
}

const cdp = await Cdp.connect();
try {
  const { targetId } = await cdp.send('Target.createTarget', { url: 'about:blank' });
  const { sessionId } = await cdp.send('Target.attachToTarget', { targetId, flatten: true });
  await cdp.send('Page.enable', {}, sessionId);
  await cdp.send('Runtime.enable', {}, sessionId);
  await cdp.send('Page.navigate', { url: 'https://eviltester.github.io/grid-table-editor/generator.html' }, sessionId);
  await delay(2500);
  const result = await evalJson(cdp, sessionId, `(() => {
    const firstSelect = document.querySelector('select[data-field="sourceType"]') || document.querySelector('select');
    firstSelect.value = 'domain';
    firstSelect.dispatchEvent(new Event('change', { bubbles: true }));
    const button = document.querySelector('[data-action="pick-command"]');
    button.focus();
    const beforeOpenFocus = document.activeElement === button;
    button.click();
    const search = document.querySelector('[data-role="method-picker-search"]');
    const dialog = search?.closest('.text-input-modal-content, .modal-content, dialog, [role="dialog"]') ||
      document.querySelector('.method-picker-dialog, .method-picker, dialog[open], [role="dialog"]') ||
      search?.parentElement;
    const pick = (el, i) => ({
      i,
      tag: el.tagName,
      type: el.getAttribute('type'),
      role: el.getAttribute('role'),
      text: (el.innerText || el.value || el.placeholder || el.getAttribute('aria-label') || el.title || '').trim(),
      id: el.id,
      name: el.getAttribute('name'),
      cls: el.className,
      ariaSelected: el.getAttribute('aria-selected'),
      disabled: el.disabled || el.getAttribute('aria-disabled'),
      html: el.outerHTML.slice(0, 700)
    });
    return {
      beforeOpenFocus,
      url: location.href,
      active: document.activeElement?.outerHTML?.slice(0, 700),
      dialogFound: !!dialog,
      dialogTag: dialog?.tagName,
      dialogRole: dialog?.getAttribute('role'),
      dialogClasses: dialog?.className,
      dialogText: dialog?.innerText?.slice(0, 6000),
      controls: [...(dialog || document).querySelectorAll('button,input,select,textarea,a,summary,[role=tab],[role=option],[role=listbox]')].map(pick).filter(x => x.text || x.id || x.name || x.role || x.cls).slice(0, 300),
      methodPickerParts: [...document.querySelectorAll('[data-role*="method-picker"], [class*="method-picker"]')].map((el, i) => ({
        i,
        tag: el.tagName,
        role: el.getAttribute('data-role') || el.getAttribute('role'),
        cls: el.className,
        text: el.innerText?.slice(0, 1000),
        html: el.outerHTML.slice(0, 2500)
      })),
      allDialogHtml: dialog?.outerHTML?.slice(0, 12000)
    };
  })()`);
  await shot(cdp, sessionId, 'ux-regression-03-method-picker-open.png');
  await writeFile(path.join(outDir, 'support/ux-regression-dialog-inspect.json'), JSON.stringify(result, null, 2));
  console.log(JSON.stringify({ ok: true, dialogFound: result.dialogFound, controls: result.controls.length, active: result.active?.slice(0, 120), text: result.dialogText?.slice(0, 1000) }, null, 2));
} finally {
  cdp.close();
}
