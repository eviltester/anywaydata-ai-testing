import fs from "node:fs/promises";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");

const sessionDir = path.resolve("docs/testing/20260629/issue-266-001");
const screenshotsDir = path.join(sessionDir, "screenshots");
const videosDir = path.join(sessionDir, "videos");
const supportDir = path.join(sessionDir, "support");
const baseUrl = "https://eviltester.github.io/grid-table-editor/site/app.html";

async function ensureDirs() {
  await fs.mkdir(screenshotsDir, { recursive: true });
  await fs.mkdir(videosDir, { recursive: true });
  await fs.mkdir(supportDir, { recursive: true });
}

async function expandTestData(page) {
  const panel = page.getByRole("region", { name: /Test Data Population Panel/i });
  if ((await panel.count()) === 0) {
    await page.getByText("Test Data", { exact: true }).click();
  }
  await page.getByRole("region", { name: /Test Data Population Panel/i }).waitFor();
}

async function reset(page) {
  await page.goto(baseUrl, { waitUntil: "networkidle" });
  await expandTestData(page);
}

async function clearSchemaRows(page) {
  const remove = page.getByRole("button", { name: "Remove field" });
  while ((await remove.count()) > 1) {
    await remove.nth(0).click();
  }
  await page.locator('input[aria-label="Column Name"]').fill("");
  await page.locator('select[aria-label="Field type"]').selectOption("regex");
  await page.locator('input[aria-label="Value / Regex"]').fill("");
}

async function setRow(page, index, { name, type, rule }) {
  const names = page.locator('input[aria-label="Column Name"]');
  const types = page.locator('select[aria-label="Field type"]');
  while ((await names.count()) <= index) {
    await page.getByRole("button", { name: "+ Add Field" }).click();
  }
  await names.nth(index).fill(name);
  await types.nth(index).selectOption(type);
  if (type === "domain" || type === "faker") {
    const match = /^(.*?)\((.*)\)$/.exec(rule);
    const command = match ? match[1] : rule;
    const params = match ? `(${match[2]})` : "";
    await page.locator("select.shared-schema-command-picker-shadow-select").last().selectOption(command);
    await page.locator('input[aria-label="Params"]').last().fill(params);
  } else {
    await page.locator('input[aria-label="Value / Regex"]').nth(index).fill(rule);
  }
}

async function fillSchema(page, rows) {
  await clearSchemaRows(page);
  for (let i = 0; i < rows.length; i += 1) {
    await setRow(page, i, rows[i]);
  }
}

async function generate(page, count, mode = "New Table") {
  await page.locator('input[type="number"]').first().fill(String(count));
  await page.getByLabel(mode).check();
  await page.locator('input[type="number"]').first().blur();
  await page.getByRole("button", { name: /^Generate$/ }).click({ timeout: 5000 });
  await page.waitForTimeout(700);
}

async function gridInfo(page) {
  return page.evaluate(() => {
    const headers = [...document.querySelectorAll(".tabulator-col-title")]
      .map((el) => el.textContent?.trim())
      .filter(Boolean);
    const rows = [...document.querySelectorAll(".tabulator-row")].map((row) =>
      [...row.querySelectorAll(".tabulator-cell")].map((cell) => cell.textContent?.trim() ?? "")
    );
    const status = document.querySelector('[role="status"]')?.textContent?.trim() ?? "";
    const errors = [...document.querySelectorAll(".error, .invalid, [role='alert']")].map((el) =>
      el.textContent?.trim()
    ).filter(Boolean);
    return { headers, rows, status, errors };
  });
}

async function scenario(page, name, fn) {
  const result = { name, status: "unknown", observations: [], screenshots: [] };
  try {
    await fn(result);
    result.status = "completed";
  } catch (error) {
    result.status = "error";
    result.error = error?.stack || String(error);
  }
  return result;
}

async function screenshot(page, name, result) {
  const file = `main-loop-${name}.png`;
  await page.screenshot({ path: path.join(screenshotsDir, file), fullPage: true });
  result.screenshots.push(`screenshots/${file}`);
}

async function main() {
  await ensureDirs();
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1366, height: 900 },
  });
  context.setDefaultTimeout(5000);
  context.setDefaultNavigationTimeout(15000);
  const page = await context.newPage();
  const results = [];
  const writeResults = async () => {
    await fs.writeFile(
      path.join(supportDir, "main-loop-deployed-probe-results.json"),
      JSON.stringify({ baseUrl, results }, null, 2)
    );
  };

  results.push(await scenario(page, "regex-domain-enum-new-table", async (result) => {
    await reset(page);
    await fillSchema(page, [
      { name: "code", type: "regex", rule: "[A-C]{2}[0-9]" },
      { name: "qty", type: "domain", rule: "number.int(1,3)" },
      { name: "status", type: "domain", rule: 'datatype.enum("Open","Closed")' },
    ]);
    await generate(page, 5);
    const info = await gridInfo(page);
    result.observations.push(info);
    await screenshot(page, "regex-domain-enum-new-table", result);
  }));
  await writeResults();

  results.push(await scenario(page, "amend-table-preserves-adds-columns", async (result) => {
    await reset(page);
    await fillSchema(page, [
      { name: "id", type: "domain", rule: "autoIncrement.sequence(1,1)" },
      { name: "name", type: "faker", rule: "person.firstName()" },
    ]);
    await generate(page, 3);
    const before = await gridInfo(page);
    await fillSchema(page, [
      { name: "city", type: "domain", rule: "location.city()" },
    ]);
    await generate(page, 3, "Amend Table");
    const after = await gridInfo(page);
    result.observations.push({ before, after });
    await screenshot(page, "amend-table-preserves-adds-columns", result);
  }));
  await writeResults();

  results.push(await scenario(page, "filter-sort-after-generation", async (result) => {
    await reset(page);
    await fillSchema(page, [
      { name: "seq", type: "domain", rule: "autoIncrement.sequence(1,1)" },
      { name: "status", type: "domain", rule: 'datatype.enum("Open","Closed")' },
    ]);
    await generate(page, 6);
    await page.getByLabel("Filter:").fill("Open");
    await page.waitForTimeout(400);
    const filtered = await gridInfo(page);
    await page.getByRole("button", { name: "Clear Filters" }).click();
    await page.getByRole("button", { name: "Sort ascending" }).first().click();
    await page.waitForTimeout(400);
    const sorted = await gridInfo(page);
    result.observations.push({ filtered, sorted });
    await screenshot(page, "filter-sort-after-generation", result);
  }));
  await writeResults();

  results.push(await scenario(page, "grid-to-enum-schema-from-grid", async (result) => {
    await reset(page);
    await fillSchema(page, [
      { name: "status", type: "domain", rule: 'datatype.enum("New","Active","Closed")' },
    ]);
    await generate(page, 6);
    const before = await gridInfo(page);
    await page.getByRole("button", { name: "Grid to Enum Schema" }).click();
    await page.waitForTimeout(400);
    const schema = await page.evaluate(() => {
      const names = [...document.querySelectorAll('input[aria-label="Column Name"]')].map((el) => el.value);
      const types = [...document.querySelectorAll('select[aria-label="Field type"]')].map((el) => el.value);
      const rules = [...document.querySelectorAll('input[aria-label="Value / Regex"]')].map((el) => el.value);
      return names.map((name, i) => ({ name, type: types[i], rule: rules[i] }));
    });
    result.observations.push({ before, schema });
    await screenshot(page, "grid-to-enum-schema-from-grid", result);
  }));
  await writeResults();

  results.push(await scenario(page, "invalid-command-feedback", async (result) => {
    await reset(page);
    await fillSchema(page, [
      { name: "bad", type: "domain", rule: "datatype.enum()" },
      { name: "helper", type: "faker", rule: "helpers.arrayElement()" },
    ]);
    await generate(page, 2);
    const info = await gridInfo(page);
    const bodyText = await page.locator("body").innerText();
    result.observations.push({ info, textSnippets: bodyText.split("\n").filter((line) => /error|invalid|datatype|arrayElement|schema/i.test(line)).slice(0, 30) });
    await screenshot(page, "invalid-command-feedback", result);
  }));
  await writeResults();

  await context.close();
  await browser.close();
  await writeResults();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
