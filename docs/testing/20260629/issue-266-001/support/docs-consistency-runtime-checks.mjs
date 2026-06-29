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

async function prepareTextMode(page) {
  await page.goto('https://eviltester.github.io/grid-table-editor/generator.html', {
    waitUntil: 'domcontentloaded',
    timeout: 45000,
  });
  await page.waitForLoadState('load', { timeout: 15000 }).catch(() => {});
  await page.waitForTimeout(1200);
  await page.getByText('Edit as Text', { exact: true }).click();
  await page.waitForTimeout(300);
}

async function generateScenario(page, scenario) {
  await prepareTextMode(page);
  const schemaArea = page.locator('textarea.testDataSchemaTextArea').first();
  await schemaArea.fill(scenario.schema);
  await page.locator('input[type="number"]').first().fill(String(scenario.rows ?? 5));
  if (scenario.format) {
    await page.evaluate((format) => {
      const select = [...document.querySelectorAll('select')].find(
        (item) =>
          item.offsetParent !== null &&
          [...item.options].some((option) => option.value === format),
      );
      if (!select) {
        throw new Error(`No visible output format select for ${format}`);
      }
      select.value = format;
      select.dispatchEvent(new Event('change', { bubbles: true }));
    }, scenario.format);
  }
  await page.getByRole('button', { name: 'Preview', exact: true }).click();
  await page.waitForTimeout(1000);
  const bodyText = await page.locator('body').innerText();
  const textareas = await page.locator('textarea').evaluateAll((els) =>
    els.map((el, index) => ({
      index,
      className: el.className,
      placeholder: el.getAttribute('placeholder') || '',
      value: el.value,
    })),
  );
  const preview = textareas.find((item) => !item.className && item.value)?.value || '';
  const fileName = `docs-consistency-runtime-${scenario.id}.png`;
  await page.screenshot({ path: path.join(supportDir, fileName), fullPage: true });
  return {
    ...scenario,
    screenshot: fileName,
    preview: preview.slice(0, 2000),
    textareas,
    bodyExcerpt: bodyText
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)
      .filter((line) => /error|invalid|unknown|generated|schema|constraint|rows|enum|faker|command/i.test(line))
      .slice(0, 80),
  };
}

async function inspectMethodPicker(page) {
  await page.goto('https://eviltester.github.io/grid-table-editor/generator.html', {
    waitUntil: 'domcontentloaded',
    timeout: 45000,
  });
  await page.waitForTimeout(1200);
  const sourceSelect = page.locator('select').first();
  await sourceSelect.selectOption('domain');
  await page.waitForTimeout(500);
  const beforeButtons = await page.locator('button').evaluateAll((els) =>
    els.map((el, index) => ({
      index,
      text: el.textContent?.trim() || '',
      title: el.getAttribute('title') || '',
      ariaLabel: el.getAttribute('aria-label') || '',
      className: el.className || '',
    })),
  );
  for (const selector of [
    'button[title*="method" i]',
    'button[aria-label*="method" i]',
    '.method-picker button',
    '.helpicon',
  ]) {
    const candidate = page.locator(selector).first();
    if (await candidate.count()) {
      await candidate.click().catch(() => {});
      await page.waitForTimeout(500);
      break;
    }
  }
  const afterText = await page.locator('body').innerText();
  await page.screenshot({
    path: path.join(supportDir, 'docs-consistency-runtime-method-picker-domain.png'),
    fullPage: true,
  });
  return {
    selectedSource: 'domain',
    buttons: beforeButtons,
    bodyExcerpt: afterText
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)
      .filter((line) => /method|datatype|enum|domain|command|param|faker|http|fullName|Req|required/i.test(line))
      .slice(0, 120),
  };
}

const scenarios = [
  {
    id: 'schema-enum-basic',
    note: 'Docs Schema Definition basic enum example.',
    schema: 'Status\nenum("Open","In Progress","Closed")',
    rows: 6,
    format: 'csv',
  },
  {
    id: 'schema-inline-enum',
    note: 'Docs compact inline enum example.',
    schema: 'Browser: Chrome,Firefox,Safari\nTheme: Light,Dark',
    rows: 6,
    format: 'csv',
  },
  {
    id: 'schema-domain-datatype-enum',
    note: 'PR #243 domain datatype.enum bare-value drift probe.',
    schema: 'State\ndatatype.enum(active,inactive,pending)',
    rows: 6,
    format: 'csv',
  },
  {
    id: 'schema-domain-datatype-enum-csv',
    note: 'Documented PR #243 datatype.enum csv keyword form from pairwise docs.',
    schema: 'State\ndatatype.enum(csv="active,inactive,pending")',
    rows: 6,
    format: 'csv',
  },
  {
    id: 'schema-domain-awd-datatype-enum-csv',
    note: 'Documented AWD-prefixed enum command form from pairwise docs.',
    schema: 'State\nawd.datatype.enum(csv="active,inactive,pending")',
    rows: 6,
    format: 'csv',
  },
  {
    id: 'schema-faker-http-method',
    note: 'PR #247 command picker previous happy-path command.',
    schema: 'Method\ninternet.httpMethod(commonOnly=true)',
    rows: 6,
    format: 'csv',
  },
  {
    id: 'schema-helper-unique-array',
    note: 'Deployed catalog usage example for helpers.uniqueArray.',
    schema: 'Colours\nhelpers.uniqueArray(["red", "green", "blue"], 2)',
    rows: 3,
    format: 'json',
  },
  {
    id: 'schema-helper-unique-array-callback',
    note: 'Callback-style helpers.uniqueArray path mentioned in prior runtime work.',
    schema: 'Words\nhelpers.uniqueArray(faker.word.sample, 3)',
    rows: 3,
    format: 'json',
  },
  {
    id: 'schema-helper-unique-array-doc-this',
    note: 'Published Faker Helpers docs example using this.word.sample.',
    schema: 'Words\nhelpers.uniqueArray(this.word.sample, 5)',
    rows: 3,
    format: 'json',
  },
  {
    id: 'schema-legacy-lorem-flickr',
    note: 'Removed/deprecated Faker image command drift candidate.',
    schema: 'Image\nimage.urlLoremFlickr()',
    rows: 3,
    format: 'csv',
  },
  {
    id: 'schema-unknown-command',
    note: 'Docs say unknown command-like text should be schema error.',
    schema: 'Bad\nperson.notACommand()',
    rows: 3,
    format: 'csv',
  },
  {
    id: 'schema-basic-constraint',
    note: 'Docs copy-paste constraint example.',
    schema:
      'Priority\nenum("High","Low")\nStatus\nenum("Open","Closed")\nIF [Priority] = "High" THEN [Status] = "Open";',
    rows: 12,
    format: 'csv',
  },
];

const browser = await launchBrowser();
const context = await browser.newContext({ viewport: { width: 1440, height: 1100 } });
const page = await context.newPage();
const results = [];
for (const scenario of scenarios) {
  results.push(await generateScenario(page, scenario));
}
const methodPicker = await inspectMethodPicker(page);
await browser.close();

await writeFile(
  path.join(supportDir, 'docs-consistency-runtime-results.json'),
  JSON.stringify({ results, methodPicker }, null, 2),
  'utf8',
);

const summary = [
  '# Docs Consistency Runtime Checks',
  '',
  ...results.flatMap((result) => [
    `## ${result.id}`,
    '',
    result.note,
    '',
    'Schema:',
    '```',
    result.schema,
    '```',
    '',
    `Screenshot: ${result.screenshot}`,
    '',
    'Preview:',
    '```',
    result.preview || '(empty)',
    '```',
    '',
    'Body excerpt:',
    ...result.bodyExcerpt.map((line) => `- ${line}`),
    '',
  ]),
  '## method-picker-domain',
  '',
  'Screenshot: docs-consistency-runtime-method-picker-domain.png',
  '',
  'Body excerpt:',
  ...methodPicker.bodyExcerpt.map((line) => `- ${line}`),
  '',
].join('\n');

await writeFile(
  path.join(supportDir, 'docs-consistency-runtime-results.md'),
  summary,
  'utf8',
);
