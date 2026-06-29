import { chromium } from 'playwright';
import { access, writeFile } from 'node:fs/promises';
import path from 'node:path';

const supportDir =
  'D:/github/anywaydata-ai-testing/docs/testing/20260629/issue-266-001/support';
const chromePath = 'C:/Program Files/Google/Chrome/Application/chrome.exe';

async function launchBrowser() {
  const options = { headless: true };
  try {
    await access(chromePath);
    options.executablePath = chromePath;
  } catch {
    // Use bundled browser when available.
  }
  return chromium.launch(options);
}

const browser = await launchBrowser();
const context = await browser.newContext({ viewport: { width: 1440, height: 1150 } });
const page = await context.newPage();
await page.goto('https://eviltester.github.io/grid-table-editor/site/app.html', {
  waitUntil: 'domcontentloaded',
  timeout: 45000,
});
await page.waitForTimeout(1500);

const steps = [];
async function step(name, action) {
  try {
    await action();
    steps.push({ name, status: 'success' });
  } catch (error) {
    steps.push({ name, status: 'error', error: String(error?.message || error) });
  }
}

await step('import-csv-through-text-preview', async () => {
  const csv = 'Browser,Device,Theme\nChrome,Desktop,Light\nFirefox,Mobile,Dark\nChrome,Tablet,Dark';
  await page.locator('textarea.textrepresentation').fill(csv);
  await page.locator('#setgridfromtextbutton').click();
  await page.waitForTimeout(1000);
});

await page.screenshot({
  path: path.join(supportDir, 'docs-consistency-app-after-load-sample-data.png'),
  fullPage: true,
});

await step('open-test-data-section', async () => {
  await page.getByText('Test Data', { exact: true }).click();
  await page.waitForTimeout(500);
});

await step('grid-to-enum-schema', async () => {
  await page.getByRole('button', { name: 'Grid to Enum Schema', exact: true }).click();
  await page.waitForTimeout(1000);
});

await step('confirm-build-schema', async () => {
  await page.getByRole('button', { name: 'Build Schema', exact: true }).click();
  await page.waitForTimeout(1000);
});

const schemaText = await page
  .locator('textarea.testDataSchemaTextArea')
  .first()
  .inputValue()
  .catch(() => '');
const pageState = await page.evaluate(() => ({
  bodyExcerpt: document.body.innerText
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .filter((line) => /total rows|grid to enum|schema|generate|browser|device|theme|row/i.test(line))
    .slice(0, 120),
  mainGridHeaders: [...document.querySelectorAll('#example-table .tabulator-col-title')]
    .map((el) => el.textContent.trim())
    .filter(Boolean),
  schemaVisibleText: [...document.querySelectorAll('textarea.testDataSchemaTextArea')]
    .map((el) => el.value),
}));

await page.screenshot({
  path: path.join(supportDir, 'docs-consistency-app-grid-to-enum-schema.png'),
  fullPage: true,
});
await browser.close();

const result = {
  steps,
  schemaText,
  ...pageState,
  screenshots: [
    'docs-consistency-app-after-load-sample-data.png',
    'docs-consistency-app-grid-to-enum-schema.png',
  ],
};

await writeFile(
  path.join(supportDir, 'docs-consistency-app-grid-check.json'),
  JSON.stringify(result, null, 2),
  'utf8',
);

await writeFile(
  path.join(supportDir, 'docs-consistency-app-grid-check.md'),
  [
    '# App Grid/Test-Data Interplay Check',
    '',
    'Steps:',
    ...steps.map((item) =>
      `- ${item.name}: ${item.status}${item.error ? ` - ${item.error}` : ''}`,
    ),
    '',
    'Schema text captured:',
    '```',
    schemaText || '(empty)',
    '```',
    '',
    'Body excerpt:',
    ...pageState.bodyExcerpt.map((line) => `- ${line}`),
    '',
    'Screenshots:',
    ...result.screenshots.map((file) => `- ${file}`),
    '',
  ].join('\n'),
  'utf8',
);
