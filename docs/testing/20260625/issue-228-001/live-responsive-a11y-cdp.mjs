import { spawn } from "node:child_process";
import { mkdir, rm, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { setTimeout as delay } from "node:timers/promises";

const baseUrl = "https://eviltester.github.io/grid-table-editor/";
const outDir = "D:/github/anywaydata-ai-testing/docs/testing/20260625/issue-228-001";
const screenshotsDir = join(outDir, "screenshots");
const chromePath = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const port = 9228 + Math.floor(Math.random() * 500);
const profileDir = join(process.env.TEMP || ".", `grid-editor-cdp-${Date.now()}`);

if (!existsSync(chromePath)) {
  throw new Error(`Chrome not found at ${chromePath}`);
}

await mkdir(screenshotsDir, { recursive: true });

const chrome = spawn(chromePath, [
  `--remote-debugging-port=${port}`,
  `--user-data-dir=${profileDir}`,
  "--headless=new",
  "--disable-gpu",
  "--no-first-run",
  "--no-default-browser-check",
  "--window-size=1280,900",
  "about:blank",
], { stdio: "ignore" });

let browserWs;
for (let i = 0; i < 80; i += 1) {
  try {
    const res = await fetch(`http://127.0.0.1:${port}/json/version`);
    const json = await res.json();
    browserWs = json.webSocketDebuggerUrl;
    break;
  } catch {
    await delay(100);
  }
}
if (!browserWs) throw new Error("Could not connect to Chrome DevTools Protocol");

class Cdp {
  constructor(wsUrl) {
    this.nextId = 1;
    this.pending = new Map();
    this.ws = new WebSocket(wsUrl);
    this.ready = new Promise((resolve, reject) => {
      this.ws.addEventListener("open", resolve, { once: true });
      this.ws.addEventListener("error", reject, { once: true });
    });
    this.ws.addEventListener("message", (event) => {
      const msg = JSON.parse(event.data);
      if (msg.id && this.pending.has(msg.id)) {
        const { resolve, reject } = this.pending.get(msg.id);
        this.pending.delete(msg.id);
        if (msg.error) reject(new Error(JSON.stringify(msg.error)));
        else resolve(msg.result);
      }
    });
  }

  async send(method, params = {}, sessionId) {
    await this.ready;
    const id = this.nextId++;
    const payload = { id, method, params };
    if (sessionId) payload.sessionId = sessionId;
    this.ws.send(JSON.stringify(payload));
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      setTimeout(() => {
        if (this.pending.has(id)) {
          this.pending.delete(id);
          reject(new Error(`CDP timeout: ${method}`));
        }
      }, 15000);
    });
  }

  close() {
    this.ws.close();
  }
}

const cdp = new Cdp(browserWs);
const { targetId } = await cdp.send("Target.createTarget", { url: "about:blank" });
const { sessionId } = await cdp.send("Target.attachToTarget", { targetId, flatten: true });
await cdp.send("Page.enable", {}, sessionId);
await cdp.send("Runtime.enable", {}, sessionId);
await cdp.send("DOM.enable", {}, sessionId);

async function navigate(url) {
  await cdp.send("Page.navigate", { url }, sessionId);
  await delay(1400);
}

async function viewport(width, height, mobile = false) {
  await cdp.send("Emulation.setDeviceMetricsOverride", {
    width,
    height,
    deviceScaleFactor: mobile ? 2 : 1,
    mobile,
  }, sessionId);
  await delay(350);
}

async function evaluate(expression, awaitPromise = true) {
  const result = await cdp.send("Runtime.evaluate", {
    expression,
    awaitPromise,
    returnByValue: true,
  }, sessionId);
  if (result.exceptionDetails) {
    return { error: result.exceptionDetails.text };
  }
  return result.result.value;
}

async function screenshot(name, fullPage = true) {
  const metrics = await cdp.send("Page.getLayoutMetrics", {}, sessionId);
  const cssViewport = metrics.cssVisualViewport || { clientWidth: 1280, clientHeight: 900, pageX: 0, pageY: 0 };
  const cssContent = metrics.cssContentSize || { width: cssViewport.clientWidth, height: cssViewport.clientHeight, x: 0, y: 0 };
  const width = Math.max(1, Math.ceil(fullPage ? cssContent.width : cssViewport.clientWidth));
  const height = Math.max(1, Math.ceil(fullPage ? cssContent.height : cssViewport.clientHeight));
  const result = await cdp.send("Page.captureScreenshot", {
    format: "png",
    fromSurface: true,
    captureBeyondViewport: fullPage,
    clip: { x: 0, y: 0, width, height, scale: 1 },
  }, sessionId);
  const file = join(screenshotsDir, name);
  await writeFile(file, Buffer.from(result.data, "base64"));
  return file.replaceAll("\\", "/");
}

async function pressTab(times = 1) {
  for (let i = 0; i < times; i += 1) {
    await cdp.send("Input.dispatchKeyEvent", { type: "keyDown", key: "Tab", windowsVirtualKeyCode: 9, nativeVirtualKeyCode: 9 }, sessionId);
    await cdp.send("Input.dispatchKeyEvent", { type: "keyUp", key: "Tab", windowsVirtualKeyCode: 9, nativeVirtualKeyCode: 9 }, sessionId);
    await delay(80);
  }
}

async function clickSelector(selector) {
  return evaluate(`(() => {
    const el = document.querySelector(${JSON.stringify(selector)});
    if (!el) return { clicked: false, reason: "not found" };
    const r = el.getBoundingClientRect();
    el.scrollIntoView({ block: "center", inline: "center" });
    el.click();
    return { clicked: true, tag: el.tagName, text: (el.innerText || el.value || "").trim(), rect: { x: r.x, y: r.y, w: r.width, h: r.height } };
  })()`);
}

async function clickByText(patternSource) {
  return evaluate(`(() => {
    const re = new RegExp(${JSON.stringify(patternSource)}, "i");
    const els = [...document.querySelectorAll("button, a, summary, [role=button], input[type=button], input[type=submit], select")];
    const el = els.find((node) => re.test((node.innerText || node.value || node.getAttribute("aria-label") || node.getAttribute("title") || "").trim()));
    if (!el) return { clicked: false, reason: "not found" };
    el.scrollIntoView({ block: "center", inline: "center" });
    el.click();
    return { clicked: true, tag: el.tagName, text: (el.innerText || el.value || el.getAttribute("aria-label") || "").trim() };
  })()`);
}

async function collect(label) {
  return evaluate(`(() => {
    const visible = (el) => {
      const s = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      return s.visibility !== "hidden" && s.display !== "none" && r.width > 0 && r.height > 0;
    };
    const nameFor = (el) => {
      const id = el.id ? document.querySelector(\`label[for="\${CSS.escape(el.id)}"]\`) : null;
      const wrappingLabel = el.closest("label");
      return (el.getAttribute("aria-label") || el.getAttribute("aria-labelledby") || el.getAttribute("title") || id?.innerText || wrappingLabel?.innerText || el.innerText || el.value || "").trim().replace(/\\s+/g, " ");
    };
    const describe = (el) => {
      const r = el.getBoundingClientRect();
      return {
        tag: el.tagName.toLowerCase(),
        type: el.getAttribute("type") || "",
        role: el.getAttribute("role") || "",
        id: el.id || "",
        classes: el.className ? String(el.className).slice(0, 80) : "",
        name: nameFor(el).slice(0, 140),
        disabled: !!el.disabled || el.getAttribute("aria-disabled") === "true",
        rect: { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) },
      };
    };
    const interactive = [...document.querySelectorAll("a[href], button, input, select, textarea, summary, [tabindex], [role=button], [role=dialog], [role=combobox], [role=menuitem]")]
      .filter(visible)
      .map(describe);
    const unlabeled = interactive.filter((el) => ["button", "input", "select", "textarea"].includes(el.tag) && !el.name && !el.disabled);
    const overflow = [...document.querySelectorAll("body *")]
      .filter(visible)
      .map((el) => ({ el, r: el.getBoundingClientRect() }))
      .filter(({ r }) => r.right > document.documentElement.clientWidth + 1 || r.left < -1)
      .slice(0, 12)
      .map(({ el, r }) => ({ tag: el.tagName.toLowerCase(), id: el.id || "", classes: String(el.className || "").slice(0, 80), text: (el.innerText || "").trim().replace(/\\s+/g, " ").slice(0, 120), rect: { left: Math.round(r.left), right: Math.round(r.right), width: Math.round(r.width) } }));
    return {
      label: ${JSON.stringify(label)},
      url: location.href,
      title: document.title,
      h1: [...document.querySelectorAll("h1")].map((h) => h.innerText.trim()),
      viewport: { width: innerWidth, height: innerHeight, scrollWidth: document.documentElement.scrollWidth, clientWidth: document.documentElement.clientWidth, scrollHeight: document.documentElement.scrollHeight },
      links: [...document.querySelectorAll("a[href]")].filter(visible).map((a) => ({ text: a.innerText.trim().replace(/\\s+/g, " "), href: a.href })).slice(0, 80),
      interactive,
      unlabeled,
      overflow,
      dialogs: [...document.querySelectorAll("dialog, [role=dialog], .modal, [aria-modal=true]")].filter(visible).map(describe),
      details: [...document.querySelectorAll("details")].map((d) => ({ open: d.open, summary: d.querySelector("summary")?.innerText.trim() || "" })),
    };
  })()`);
}

async function focusTrace(label, steps = 24) {
  await evaluate("document.body.focus(); if (document.activeElement) document.activeElement.blur();");
  const trace = [];
  for (let i = 0; i < steps; i += 1) {
    await pressTab(1);
    trace.push(await evaluate(`(() => {
      const el = document.activeElement;
      if (!el) return null;
      const r = el.getBoundingClientRect();
      const name = (el.getAttribute("aria-label") || el.getAttribute("title") || el.innerText || el.value || el.id || el.name || "").trim().replace(/\\s+/g, " ");
      return { step: ${i + 1}, tag: el.tagName.toLowerCase(), type: el.getAttribute("type") || "", id: el.id || "", name: name.slice(0, 100), rect: { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) } };
    })()`));
  }
  return { label, trace };
}

const results = [];
try {
  await viewport(1280, 900);
  await navigate(baseUrl);
  results.push(await collect("index-desktop-scout"));
  await screenshot("responsive-a11y-index-desktop.png");
  const links = results[0].links.map((l) => l.href);
  const internal = [...new Set(links.filter((href) => href.startsWith(baseUrl)))];
  const routes = [baseUrl, ...internal].filter((href, index, arr) => arr.indexOf(href) === index);

  const proof = await clickByText("generator|app|editor|start|open");
  results.push({ label: "browser-control-proof-click", proof, afterUrl: await evaluate("location.href") });
  await screenshot("responsive-a11y-browser-proof-click.png");

  const selectedRoutes = routes.filter((href) => /(?:index|generator|editor|app|method|help|schema|$)/i.test(href)).slice(0, 8);
  if (!selectedRoutes.includes(baseUrl)) selectedRoutes.unshift(baseUrl);

  const viewports = [
    { label: "mobile-portrait-360x740", width: 360, height: 740, mobile: true },
    { label: "mobile-landscape-740x360", width: 740, height: 360, mobile: true },
    { label: "tablet-768x1024", width: 768, height: 1024, mobile: true },
    { label: "desktop-1280x900", width: 1280, height: 900, mobile: false },
  ];

  for (const route of selectedRoutes) {
    for (const vp of viewports) {
      await viewport(vp.width, vp.height, vp.mobile);
      await navigate(route);
      const slug = new URL(route).pathname.replace(/[^\w]+/g, "-").replace(/^-|-$/g, "") || "index";
      results.push(await collect(`${slug}-${vp.label}`));
      await screenshot(`responsive-a11y-${slug}-${vp.label}.png`);
      if (vp.label === "mobile-portrait-360x740" || vp.label === "desktop-1280x900") {
        results.push(await focusTrace(`${slug}-${vp.label}-tab-trace`, 26));
      }
    }
  }

  const generatorRoute = selectedRoutes.find((href) => /generator/i.test(href)) || selectedRoutes.find((href) => /editor|app/i.test(href)) || baseUrl;
  await viewport(360, 740, true);
  await navigate(generatorRoute);
  const scenarioClicks = [];
  for (const pattern of ["method|algorithm|strategy|picker", "param|option|setting|configure|edit", "help|\\?|about", "summary|details|advanced|more"]) {
    const clicked = await clickByText(pattern);
    await delay(350);
    scenarioClicks.push({ pattern, clicked, state: await collect(`after-click-${pattern}`) });
    await screenshot(`responsive-a11y-scenario-${pattern.replace(/[^\w]+/g, "-")}.png`);
  }
  results.push({ label: "mobile-generator-scenario-clicks", route: generatorRoute, scenarioClicks });

  await writeFile(join(outDir, "responsive-accessibility-cdp-results.json"), JSON.stringify({ baseUrl, capturedAt: new Date().toISOString(), routes: selectedRoutes, results }, null, 2));
} finally {
  cdp.close();
  chrome.kill();
  await delay(300);
  await rm(profileDir, { recursive: true, force: true });
}
