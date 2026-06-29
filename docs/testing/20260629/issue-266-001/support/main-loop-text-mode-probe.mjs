import fs from "node:fs/promises";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");

const sessionDir = path.resolve("docs/testing/20260629/issue-266-001");
const screenshotsDir = path.join(sessionDir, "screenshots");
const supportDir = path.join(sessionDir, "support");
const baseUrl = "https://eviltester.github.io/grid-table-editor/site/app.html";

async function openApp(page) {
  await page.goto(baseUrl, { waitUntil: "networkidle" });
  if ((await page.getByRole("region", { name: /Test Data Population Panel/i }).count()) === 0) {
    await page.getByText("Test Data", { exact: true }).click();
  }
  await page.getByRole("region", { name: /Test Data Population Panel/i }).waitFor();
  const edit = page.getByRole("button", { name: "Edit as Text" });
  if ((await edit.count()) > 0) {
    await edit.click();
  }
  await page.locator('textarea[aria-label="Schema text"]').waitFor();
}

async function runScenario(page, scenario) {
  const result = { name: scenario.name, schema: scenario.schema, count: scenario.count, mode: scenario.mode || "New Table" };
  try {
    await openApp(page);
    if (scenario.before) {
      await page.locator('textarea[aria-label="Schema text"]').fill(scenario.before.schema);
      await page.locator('input[type="number"]').first().fill(String(scenario.before.count));
      await page.getByLabel("New Table").check();
      await page.getByRole("button", { name: /^Generate$/ }).click();
      await page.waitForTimeout(600);
    }
    await page.locator('textarea[aria-label="Schema text"]').fill(scenario.schema);
    await page.locator('input[type="number"]').first().fill(String(scenario.count));
    await page.getByLabel(scenario.mode || "New Table").check();
    await page.getByRole("button", { name: /^Generate$/ }).click();
    await page.waitForTimeout(900);
    if (scenario.afterAction === "filter-open") {
      await page.getByLabel("Filter:").fill("Open");
      await page.waitForTimeout(400);
    }
    if (scenario.afterAction === "sort-first") {
      await page.getByRole("button", { name: "Sort ascending" }).first().click();
      await page.waitForTimeout(400);
    }
    if (scenario.afterAction === "grid-to-enum") {
      await page.getByRole("button", { name: "Grid to Enum Schema", exact: true }).click();
      await page.waitForTimeout(600);
    }
    const screenshot = `main-loop-text-${scenario.name}.png`;
    await page.screenshot({ path: path.join(screenshotsDir, screenshot), fullPage: true });
    result.status = "completed";
    result.screenshot = `screenshots/${screenshot}`;
    result.info = await page.evaluate(() => {
      const headers = [...document.querySelectorAll(".tabulator-col-title")].map((el) => el.textContent?.trim()).filter(Boolean);
      const rows = [...document.querySelectorAll(".tabulator-row")].map((row) =>
        [...row.querySelectorAll(".tabulator-cell")].map((cell) => cell.textContent?.trim() ?? "")
      );
      const schemaText = document.querySelector('textarea[aria-label="Schema text"]')?.value ?? "";
      const visibleText = document.body.innerText;
      return {
        headers,
        rows,
        schemaText,
        totalRowsText: [...visibleText.matchAll(/Total rows: ?\\d+/g)].map((m) => m[0]).pop() || "",
        messages: visibleText.split("\\n").filter((line) => /failed|invalid|error|Row \\d|Total rows|Schema validation/i.test(line)).slice(0, 50),
      };
    });
  } catch (error) {
    result.status = "error";
    result.error = error?.stack || String(error);
  }
  return result;
}

async function main() {
  await fs.mkdir(screenshotsDir, { recursive: true });
  await fs.mkdir(supportDir, { recursive: true });
  const scenarios = [
    {
      name: "positive-regex-domain-enum",
      count: 5,
      schema: `code
[A-C]{2}[0-9]
qty
number.int(1,3)
status
datatype.enum("Open","Closed")`,
    },
    {
      name: "amend-table-adds-city",
      count: 3,
      mode: "Amend Table",
      before: { count: 3, schema: `id
autoIncrement.sequence(1,1)
name
person.firstName()` },
      schema: `city
location.city()`,
    },
    {
      name: "filter-open-after-generation",
      count: 8,
      afterAction: "filter-open",
      schema: `seq
autoIncrement.sequence(1,1)
status
datatype.enum("Open","Closed")`,
    },
    {
      name: "sort-after-generation",
      count: 6,
      afterAction: "sort-first",
      schema: `seq
autoIncrement.sequence(1,1)
qty
number.int(1,9)`,
    },
    {
      name: "grid-to-enum-schema",
      count: 6,
      afterAction: "grid-to-enum",
      schema: `status
datatype.enum("New","Active","Closed")`,
    },
    {
      name: "invalid-helper-message",
      count: 2,
      schema: `helper
helpers.arrayElement()`,
    },
    {
      name: "invalid-auto-sequence-step-zero",
      count: 2,
      schema: `id
autoIncrement.sequence(1,0)`,
    },
  ];
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1366, height: 900 } });
  context.setDefaultTimeout(8000);
  const page = await context.newPage();
  const results = [];
  for (const scenario of scenarios) {
    results.push(await runScenario(page, scenario));
    await fs.writeFile(path.join(supportDir, "main-loop-text-mode-results.json"), JSON.stringify({ baseUrl, results }, null, 2));
  }
  await browser.close();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
