import fs from "node:fs/promises";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");

const sessionDir = path.resolve("docs/testing/20260629/issue-266-001");
const screenshotsDir = path.join(sessionDir, "screenshots");
const videosDir = path.join(sessionDir, "videos");
const supportDir = path.join(sessionDir, "support");

async function ensureDirs() {
  await fs.mkdir(screenshotsDir, { recursive: true });
  await fs.mkdir(videosDir, { recursive: true });
  await fs.mkdir(supportDir, { recursive: true });
}

async function appTextMode(page) {
  await page.goto("https://eviltester.github.io/grid-table-editor/site/app.html", { waitUntil: "networkidle" });
  const panel = page.getByRole("region", { name: /Test Data Population Panel/i });
  if ((await panel.count()) === 0) {
    await page.getByText("Test Data", { exact: true }).click();
  }
  await page.getByRole("region", { name: /Test Data Population Panel/i }).waitFor();
  const textarea = page.locator('textarea[aria-label="Schema text"]');
  if (!(await textarea.isVisible().catch(() => false))) {
    const edit = page.getByRole("button", { name: "Edit as Text" });
    if ((await edit.count()) > 0) await edit.click();
  }
  await textarea.waitFor({ state: "visible" });
}

async function gridInfo(page) {
  return page.evaluate(() => ({
    filter: document.querySelector('input[placeholder="Filter..."]')?.value ?? "",
    headers: [...document.querySelectorAll(".tabulator-col-title")].map((el) => el.textContent?.trim()).filter(Boolean),
    rows: [...document.querySelectorAll(".tabulator-row")].map((row) =>
      [...row.querySelectorAll(".tabulator-cell")].map((cell) => cell.textContent?.trim() ?? "")
    ),
    bodyLines: document.body.innerText.split("\n").filter((line) => /Total rows|Generate complete|Schema validation|ERROR|invalid|failed|Expected|JSON|Grid updated|Filtered/i.test(line)),
  }));
}

async function saveVideo(page, targetName) {
  const video = page.video();
  if (!video) return null;
  const raw = await video.path();
  const target = path.join(videosDir, `${targetName}.webm`);
  await fs.copyFile(raw, target);
  return `videos/${targetName}.webm`;
}

async function withRecordedPage(name, fn) {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1366, height: 900 },
    recordVideo: { dir: videosDir, size: { width: 1366, height: 900 } },
  });
  context.setDefaultTimeout(10000);
  const page = await context.newPage();
  const result = { name };
  try {
    await fn(page, result);
    result.status = "completed";
  } catch (error) {
    result.status = "error";
    result.error = error?.stack || String(error);
  }
  await context.close();
  result.video = await saveVideo(page, `defect-${name}`);
  await browser.close();
  return result;
}

async function main() {
  await ensureDirs();
  const results = [];

  results.push(await withRecordedPage("autoincrement-invalid-step-app", async (page, result) => {
    await appTextMode(page);
    await page.locator('textarea[aria-label="Schema text"]').fill(`id
autoIncrement.sequence(1,0)`);
    await page.locator('input[type="number"]').first().fill("2");
    await page.getByRole("button", { name: /^Generate$/ }).click();
    await page.waitForTimeout(800);
    result.info = await gridInfo(page);
    result.screenshot = "screenshots/defect-autoincrement-invalid-step-app.png";
    await page.screenshot({ path: path.join(sessionDir, result.screenshot), fullPage: true });
  }));

  results.push(await withRecordedPage("filter-amend-not-reapplied", async (page, result) => {
    await appTextMode(page);
    await page.locator('textarea[aria-label="Schema text"]').fill(`CaseId
autoIncrement.sequence(1,1)
Status
datatype.enum("active","blocked")`);
    await page.locator('input[type="number"]').first().fill("3");
    await page.getByRole("button", { name: /^Generate$/ }).click();
    await page.waitForTimeout(600);
    await page.getByLabel("Filter:").fill("2");
    await page.waitForTimeout(400);
    result.before = await gridInfo(page);
    await page.locator('textarea[aria-label="Schema text"]').fill(`CaseId
autoIncrement.sequence(100,1)
Status
datatype.enum("active","blocked")`);
    await page.getByLabel("Amend Table").check();
    await page.getByRole("button", { name: /^Generate$/ }).click();
    await page.waitForTimeout(800);
    result.after = await gridInfo(page);
    result.screenshot = "screenshots/defect-filter-amend-not-reapplied.png";
    await page.screenshot({ path: path.join(sessionDir, result.screenshot), fullPage: true });
  }));

  results.push(await withRecordedPage("invalid-json-import-no-visible-error", async (page, result) => {
    const consoleMessages = [];
    page.on("console", (msg) => consoleMessages.push(`${msg.type()}: ${msg.text()}`));
    await page.goto("https://eviltester.github.io/grid-table-editor/site/app.html", { waitUntil: "networkidle" });
    await page.getByText("Import / Export", { exact: true }).click();
    await page.getByRole("link", { name: "JSON", exact: true }).click();
    await page.locator('textarea[aria-label="Preview text editor"]').fill('[{"name":"Ada",]');
    await page.getByRole("button", { name: "Set Grid From Text" }).click();
    await page.waitForTimeout(800);
    result.info = await gridInfo(page);
    result.consoleMessages = consoleMessages;
    result.screenshot = "screenshots/defect-invalid-json-import-no-visible-error.png";
    await page.screenshot({ path: path.join(sessionDir, result.screenshot), fullPage: true });
  }));

  results.push(await withRecordedPage("autoincrement-invalid-step-generator", async (page, result) => {
    await page.goto("https://eviltester.github.io/grid-table-editor/site/generator.html", { waitUntil: "networkidle" });
    const edit = page.getByRole("button", { name: "Edit as Text" });
    if ((await edit.count()) > 0) await edit.click();
    await page.locator('textarea[aria-label="Schema text"]').fill(`Id
autoIncrement.sequence(step=0)`);
    await page.getByRole("button", { name: "Preview", exact: true }).click();
    await page.waitForTimeout(800);
    result.text = await page.locator("body").innerText();
    result.screenshot = "screenshots/defect-autoincrement-invalid-step-generator.png";
    await page.screenshot({ path: path.join(sessionDir, result.screenshot), fullPage: true });
  }));

  results.push(await withRecordedPage("autoincrement-negative-zeropadding-generator", async (page, result) => {
    await page.goto("https://eviltester.github.io/grid-table-editor/site/generator.html", { waitUntil: "networkidle" });
    const edit = page.getByRole("button", { name: "Edit as Text" });
    if ((await edit.count()) > 0) await edit.click();
    await page.locator('textarea[aria-label="Schema text"]').fill(`Id
autoIncrement.sequence(zeropadding=-1)`);
    await page.getByRole("button", { name: "Preview", exact: true }).click();
    await page.waitForTimeout(800);
    result.text = await page.locator("body").innerText();
    result.screenshot = "screenshots/defect-autoincrement-negative-zeropadding-generator.png";
    await page.screenshot({ path: path.join(sessionDir, result.screenshot), fullPage: true });
  }));

  await fs.writeFile(path.join(supportDir, "confirmed-defects.json"), JSON.stringify(results, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
