import fs from "node:fs/promises";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");

const sessionDir = path.resolve("docs/testing/20260629/issue-266-001");
const screenshotsDir = path.join(sessionDir, "screenshots");
const videosDir = path.join(sessionDir, "videos");
const supportDir = path.join(sessionDir, "support");

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
  const result = {};

  await page.goto("https://eviltester.github.io/grid-table-editor/site/docs/test-data/faker/helpers", { waitUntil: "networkidle" });
  await page.getByText("helpers.uniqueArray(this.word.sample, 5)").first().scrollIntoViewIfNeeded();
  result.docsText = await page.locator("body").innerText();
  result.docsScreenshot = "screenshots/defect-docs-unique-array-this-example.png";
  await page.screenshot({ path: path.join(sessionDir, result.docsScreenshot), fullPage: true });

  await page.goto("https://eviltester.github.io/grid-table-editor/site/generator.html", { waitUntil: "networkidle" });
  const edit = page.getByRole("button", { name: "Edit as Text" });
  if ((await edit.count()) > 0) await edit.click();
  await page.locator('textarea[aria-label="Schema text"]').fill(`Words
helpers.uniqueArray(this.word.sample, 5)`);
  await page.getByRole("button", { name: "Preview", exact: true }).click();
  await page.waitForTimeout(800);
  result.generatorText = await page.locator("body").innerText();
  result.generatorScreenshot = "screenshots/defect-docs-unique-array-generator-rejects-this-example.png";
  await page.screenshot({ path: path.join(sessionDir, result.generatorScreenshot), fullPage: true });

  await context.close();
  const rawVideo = await page.video().path();
  result.video = "videos/defect-docs-unique-array-this-example.webm";
  await fs.copyFile(rawVideo, path.join(sessionDir, result.video));
  await browser.close();
  await fs.writeFile(path.join(supportDir, "confirmed-docs-defect.json"), JSON.stringify(result, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
