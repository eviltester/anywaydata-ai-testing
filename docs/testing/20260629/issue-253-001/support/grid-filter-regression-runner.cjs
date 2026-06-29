const fs = require('fs');
const path = require('path');
const { chromium } = require('D:/github/grid-table-editor/node_modules/.pnpm/playwright-core@1.60.0/node_modules/playwright-core');

const sessionDir = 'D:/github/anywaydata-ai-testing/docs/testing/20260629/issue-253-001';
const screenshotsDir = path.join(sessionDir, 'screenshots');
const resultPath = path.join(sessionDir, 'support', 'grid-filter-regression-run.json');
const chromePath = 'C:/Users/mr_ri/AppData/Local/ms-playwright/chromium-1228/chrome-win64/chrome.exe';
const appUrl = 'https://eviltester.github.io/grid-table-editor/site/app.html';
const generatorUrl = 'https://eviltester.github.io/grid-table-editor/generator.html';
const docsUrl = 'https://eviltester.github.io/grid-table-editor/site/docs/';

function nowIso() {
  return new Date().toISOString();
}

async function gotoWithRetry(page, url) {
  let lastError;
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
      await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
      await page.waitForTimeout(750);
      return;
    } catch (error) {
      lastError = error;
      await page.waitForTimeout(1000 * attempt);
    }
  }
  throw lastError;
}

async function openTestDataPanel(page) {
  const details = page.locator('[data-role="test-data-details"]');
  const isOpen = await details.evaluate((el) => el.open);
  if (!isOpen) {
    await details.locator(':scope > summary').click();
    await page.waitForTimeout(300);
  }
}

async function ensureSchemaTextMode(page) {
  await openTestDataPanel(page);
  const toggle = page.locator('[data-role="schema-mode-toggle"]');
  const label = (await toggle.innerText()).trim();
  if (/Edit as Text/i.test(label)) {
    await toggle.click();
    await page.waitForTimeout(300);
  }
}

async function setSchemaText(page, text) {
  await ensureSchemaTextMode(page);
  await page.locator('[data-role="schema-textbox"]').fill(text);
  await page.waitForTimeout(250);
}

async function setGenerationRows(page, count) {
  await page.locator('[data-role="data-population-panel-root"] input[type="number"]').first().fill(String(count));
  await page.waitForTimeout(150);
}

async function setGenerationMode(page, value) {
  await page.locator(`input[name="testDataGenerationMode"][value="${value}"]`).check();
  await page.waitForTimeout(150);
}

async function clickGenerate(page) {
  await page.locator('[data-role="generate-button"]').click();
  await page.waitForTimeout(900);
}

async function setGlobalFilter(page, value) {
  const filter = page.locator('[data-role="filter-text-input"]');
  await filter.click();
  await page.keyboard.press('Control+A');
  if (value.length > 0) {
    await page.keyboard.type(value);
  } else {
    await page.keyboard.press('Backspace');
  }
  await page.waitForTimeout(500);
}

async function clearFilters(page) {
  await page.locator('[data-role="clear-filters-button"]').click();
  await page.waitForTimeout(500);
}

async function captureGridState(page, label, screenshotName) {
  const screenshotPath = screenshotName ? path.join(screenshotsDir, screenshotName) : null;
  if (screenshotPath) {
    await page.screenshot({ path: screenshotPath, fullPage: true });
  }
  const state = await page.evaluate(() => {
    const headers = Array.from(document.querySelectorAll('.tabulator-col'))
      .filter((header) => header.offsetParent !== null)
      .map((header) => ({
        title: (header.querySelector('.tabulator-col-title')?.textContent || '').trim(),
        text: (header.textContent || '').trim().replace(/\s+/g, ' '),
      }));
    const rows = Array.from(document.querySelectorAll('.tabulator-row'))
      .filter((row) => row.offsetParent !== null)
      .map((row) =>
        Array.from(row.querySelectorAll('.tabulator-cell'))
          .filter((cell) => cell.offsetParent !== null)
          .map((cell) => (cell.textContent || '').trim())
      );
    const filterValue = document.querySelector('[data-role="filter-text-input"]')?.value || '';
    const bodyText = document.body.innerText || '';
    const totalRows = bodyText.match(/Total rows:\s*\d+/)?.[0] || '';
    const schemaErrors = Array.from(
      document.querySelectorAll('[data-role*="error"], .shared-schema-row-validation')
    )
      .map((el) => (el.textContent || '').trim())
      .filter(Boolean);
    return { headers, rows, filterValue, totalRows, schemaErrors };
  });
  return { label, screenshot: screenshotPath, ...state };
}

async function setPreviewFormat(page, formatLabel) {
  const button = page.getByText(formatLabel, { exact: true }).first();
  await button.click();
  await page.waitForTimeout(300);
}

async function previewText(page) {
  return page.locator('[data-role="preview-text-editor"]').inputValue();
}

async function testFilterPreservedOnNewTable(page, results) {
  await setSchemaText(page, 'CaseId\nautoIncrement.sequence(start=100,step=1)');
  await setGenerationRows(page, 5);
  await setGenerationMode(page, 'new-table');
  await clickGenerate(page);
  results.states.push(await captureGridState(page, 'new table baseline 100-104', 'grid-filter-regression-002-new-table-baseline.png'));

  await setGlobalFilter(page, '202');
  results.states.push(await captureGridState(page, 'filter 202 before replacement', 'grid-filter-regression-003-filter-before-new-table.png'));

  await setSchemaText(page, 'CaseId\nautoIncrement.sequence(start=200,step=1)');
  await setGenerationRows(page, 5);
  await setGenerationMode(page, 'new-table');
  await clickGenerate(page);
  results.states.push(await captureGridState(page, 'filter 202 after new-table replacement', 'grid-filter-regression-004-filter-after-new-table.png'));

  await clearFilters(page);
  results.states.push(await captureGridState(page, 'clear filter after new-table replacement', 'grid-filter-regression-005-clear-filter-after-new-table.png'));
}

async function testFilterPreservedOnAmendTable(page, results) {
  await setSchemaText(page, 'CaseId\nautoIncrement.sequence(start=2,step=1)');
  await setGenerationRows(page, 2);
  await setGenerationMode(page, 'new-table');
  await clickGenerate(page);
  await setGlobalFilter(page, '2');
  results.states.push(await captureGridState(page, 'filter 2 before amend-table', 'grid-filter-regression-006-filter-before-amend.png'));

  await setSchemaText(page, 'CaseId\nautoIncrement.sequence(start=100,step=1)');
  await setGenerationRows(page, 1);
  await setGenerationMode(page, 'amend-table');
  await clickGenerate(page);
  results.states.push(await captureGridState(page, 'filter 2 after amend-table mutation', 'grid-filter-regression-007-filter-after-amend.png'));

  await clearFilters(page);
  results.states.push(await captureGridState(page, 'clear filter after amend-table mutation', 'grid-filter-regression-008-clear-filter-after-amend.png'));
}

async function testDuplicateColumnAndCopy(page, results) {
  await setSchemaText(page, 'CaseId\nautoIncrement.sequence(start=10,step=1)');
  await setGenerationRows(page, 3);
  await setGenerationMode(page, 'new-table');
  await clickGenerate(page);
  results.states.push(await captureGridState(page, 'duplicate baseline', 'grid-filter-regression-009-duplicate-baseline.png'));

  await page.locator('.customHeaderDuplicateButton').first().click();
  const modalField = page.locator('[data-role="text-input-dialog-field"]');
  if (await modalField.isVisible({ timeout: 1500 }).catch(() => false)) {
    await modalField.fill('CaseIdCopy');
    await page.locator('[data-role="text-input-dialog-ok"]').click();
  }
  await page.waitForTimeout(700);
  results.states.push(await captureGridState(page, 'after duplicate column', 'grid-filter-regression-010-after-duplicate-column.png'));

  await setGlobalFilter(page, '11');
  results.states.push(await captureGridState(page, 'duplicate column with filter 11', 'grid-filter-regression-011-duplicate-filter-11.png'));

  await clearFilters(page);
  await setPreviewFormat(page, 'CSV');
  await page.locator('[data-role="preview-edit-mode-button"]').click();
  if (await page.locator('[data-role="confirm-dialog-ok"]').isVisible({ timeout: 1500 }).catch(() => false)) {
    await page.locator('[data-role="confirm-dialog-ok"]').click();
  }
  await page.waitForTimeout(500);
  const csvText = await previewText(page).catch(() => '');
  await page.locator('[data-role="copy-text-button"]').click();
  await page.waitForTimeout(500);
  const clipboardText = await page.evaluate(() => navigator.clipboard.readText()).catch((error) => `clipboard-read-failed: ${error.message}`);
  results.copyChecks.push({
    label: 'CSV preview after duplicate column',
    text: csvText,
    clipboardText,
    clipboardMatchesPreview: csvText === clipboardText,
    clipboardMatchesPreviewNormalised: csvText.replace(/\r\n/g, '\n') === clipboardText.replace(/\r\n/g, '\n'),
    lineCount: csvText ? csvText.trim().split(/\r?\n/).length : 0,
  });
  await page.screenshot({
    path: path.join(screenshotsDir, 'grid-filter-regression-012-duplicate-csv-preview.png'),
    fullPage: true,
  });
}

async function scoutGeneratorAndDocs(page, results) {
  await gotoWithRetry(page, generatorUrl);
  results.generator = await page.evaluate(() => ({
    url: location.href,
    title: document.title,
    hasGenerate: !!document.querySelector('[data-role="generate-button"]'),
    hasSchemaTextbox: !!document.querySelector('[data-role="schema-textbox"]'),
    bodySnippet: (document.body.innerText || '').slice(0, 1200),
  }));
  await page.screenshot({
    path: path.join(screenshotsDir, 'grid-filter-regression-013-generator-scout.png'),
    fullPage: true,
  });

  await gotoWithRetry(page, docsUrl);
  results.docs = await page.evaluate(() => ({
    url: location.href,
    title: document.title,
    bodySnippet: (document.body.innerText || '').slice(0, 1200),
    links: Array.from(document.querySelectorAll('a'))
      .map((a) => ({ text: (a.textContent || '').trim(), href: a.href }))
      .filter((a) => /auto|schema|app|generator|filter/i.test(`${a.text} ${a.href}`))
      .slice(0, 20),
  }));
  await page.screenshot({
    path: path.join(screenshotsDir, 'grid-filter-regression-014-docs-scout.png'),
    fullPage: true,
  });
}

(async () => {
  fs.mkdirSync(screenshotsDir, { recursive: true });
  const browser = await chromium.launch({
    headless: true,
    executablePath: chromePath,
  });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1200 },
    permissions: ['clipboard-read', 'clipboard-write'],
  });
  const page = await context.newPage();
  const results = {
    startedAt: nowIso(),
    target: appUrl,
    states: [],
    copyChecks: [],
    consoleMessages: [],
    nonOkResponses: [],
    pageErrors: [],
  };
  page.on('console', (message) => {
    if (['error', 'warning'].includes(message.type())) {
      results.consoleMessages.push({ type: message.type(), text: message.text() });
    }
  });
  page.on('pageerror', (error) => {
    results.pageErrors.push(String(error?.message || error));
  });
  page.on('response', (response) => {
    if (response.status() >= 400) {
      results.nonOkResponses.push({
        status: response.status(),
        url: response.url(),
      });
    }
  });

  try {
    await gotoWithRetry(page, appUrl);
    results.appTitle = await page.title();
    await page.screenshot({
      path: path.join(screenshotsDir, 'grid-filter-regression-001-app-loaded.png'),
      fullPage: true,
    });
    await openTestDataPanel(page);
    await testFilterPreservedOnNewTable(page, results);
    await testFilterPreservedOnAmendTable(page, results);
    await testDuplicateColumnAndCopy(page, results);
    await scoutGeneratorAndDocs(page, results);
    results.finishedAt = nowIso();
    fs.writeFileSync(resultPath, JSON.stringify(results, null, 2));
  } finally {
    await browser.close();
  }
})().catch((error) => {
  fs.writeFileSync(
    resultPath,
    JSON.stringify({ failedAt: nowIso(), error: String(error?.stack || error) }, null, 2)
  );
  console.error(error);
  process.exit(1);
});
