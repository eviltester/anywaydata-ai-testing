import fs from "node:fs/promises";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");

const sessionDir = path.resolve("docs/testing/20260629/issue-266-001");
const screenshotsDir = path.join(sessionDir, "screenshots");
const videosDir = path.join(sessionDir, "videos");
const supportDir = path.join(sessionDir, "support");

function activeLabel() {
  const el = document.activeElement;
  if (!el) return null;
  return {
    tag: el.tagName,
    aria: el.getAttribute("aria-label"),
    text: el.textContent?.trim(),
    placeholder: el.getAttribute("placeholder"),
    role: el.getAttribute("role"),
    className: el.className,
    dataRole: el.getAttribute("data-role"),
  };
}

async function main() {
  await fs.mkdir(screenshotsDir, { recursive: true });
  await fs.mkdir(videosDir, { recursive: true });
  await fs.mkdir(supportDir, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1366, height: 900 },
    recordVideo: { dir: videosDir, size: { width: 1366, height: 900 } },
  });
  context.setDefaultTimeout(10000);
  const page = await context.newPage();
  await page.goto("https://eviltester.github.io/grid-table-editor/site/generator.html", { waitUntil: "networkidle" });
  await page.locator('input[aria-label="Column Name"]').first().focus();
  const steps = [];
  steps.push({ action: "focus Column Name", active: await page.evaluate(activeLabel) });
  for (let i = 1; i <= 8; i += 1) {
    await page.keyboard.press("Tab");
    await page.waitForTimeout(150);
    steps.push({ action: `Tab ${i}`, active: await page.evaluate(activeLabel) });
  }
  const screenshot = "screenshots/defect-generator-schema-keyboard-loop.png";
  await page.screenshot({ path: path.join(sessionDir, screenshot), fullPage: true });
  await context.close();
  const rawVideo = await page.video().path();
  const video = "videos/defect-generator-schema-keyboard-loop.webm";
  await fs.copyFile(rawVideo, path.join(sessionDir, video));
  await browser.close();
  await fs.writeFile(
    path.join(supportDir, "confirmed-accessibility-defect.json"),
    JSON.stringify({ screenshot, video, steps }, null, 2)
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
