import { chromium, devices } from 'playwright';
import fs from 'node:fs/promises';
import path from 'node:path';

const baseDir = path.resolve('docs/testing/20260625/issue-246-001');
const screenshotsDir = path.join(baseDir, 'screenshots');
const supportDir = path.join(baseDir, 'support');
const targetBase = 'https://eviltester.github.io/grid-table-editor';
const siteUrl = `${targetBase}/site/`;
const generatorUrl = `${targetBase}/generator.html`;
const appUrl = `${targetBase}/app.html`;

await fs.mkdir(screenshotsDir, { recursive: true });
await fs.mkdir(supportDir, { recursive: true });

const browser = await chromium.launch({ headless: true });
const run = {
  timestamp: new Date().toISOString(),
  targetBase,
  siteUrl,
  generatorUrl,
  appUrl,
  checks: [],
};

async function screenshot(page, name) {
  const file = path.join(screenshotsDir, name);
  await page.screenshot({ path: file, fullPage: true });
  return path.relative(baseDir, file).replaceAll('\\', '/');
}

async function pageText(page) {
  return await page.locator('body').innerText({ timeout: 5000 }).catch(() => '');
}

async function clickFirstVisibleByText(page, labels) {
  for (const label of labels) {
    const locator = page.getByText(label, { exact: false }).first();
    if (await locator.isVisible({ timeout: 1500 }).catch(() => false)) {
      await locator.click();
      return label;
    }
  }
  return null;
}

async function siteProof() {
  const page = await browser.newPage({ viewport: { width: 1366, height: 900 } });
  await page.goto(siteUrl, { waitUntil: 'domcontentloaded' });
  await page.waitForLoadState('networkidle').catch(() => {});
  const before = await screenshot(page, 'main-proof-site-home.png');
  const title = await page.title();
  const links = await page.locator('a').evaluateAll((anchors) =>
    anchors.slice(0, 80).map((a) => ({
      text: (a.textContent || '').trim(),
      href: a.href,
    })).filter((a) => a.text || a.href)
  );
  const clicked = await clickFirstVisibleByText(page, ['Docs', 'Test Data', 'Getting Started', 'Introduction']);
  await page.waitForLoadState('domcontentloaded').catch(() => {});
  const after = await screenshot(page, 'main-proof-site-after-click.png');
  run.checks.push({
    name: 'site proof and navigation interaction',
    status: 'success',
    url: page.url(),
    title,
    clicked,
    screenshots: [before, after],
    linkSample: links,
  });
  await page.close();
}

async function generatorSmoke() {
  const page = await browser.newPage({ viewport: { width: 1366, height: 900 } });
  await page.goto(generatorUrl, { waitUntil: 'domcontentloaded' });
  await page.waitForLoadState('networkidle').catch(() => {});
  const initial = await screenshot(page, 'main-generator-initial.png');
  const bodyBefore = await pageText(page);

  const editText = page.getByRole('button', { name: /edit as text/i }).first();
  if (await editText.isVisible({ timeout: 3000 }).catch(() => false)) {
    await editText.click();
  }

  const schema = [
    'Status',
    'enum("Open","In Progress","Closed")',
    'Method',
    'internet.httpMethod(commonOnly=true, excludes="delete,head")',
    'Amount',
    'number.int(min=1,max=5)',
  ].join('\n');

  const textareas = page.locator('textarea');
  const textareaCount = await textareas.count();
  if (textareaCount > 0) {
    await textareas.first().fill(schema);
  }

  const preview = page.getByRole('button', { name: /^preview$/i }).first();
  const generateData = page.getByRole('button', { name: /generate data/i }).first();
  if (await preview.isVisible({ timeout: 3000 }).catch(() => false)) {
    await preview.click();
  } else if (await generateData.isVisible({ timeout: 3000 }).catch(() => false)) {
    await generateData.click();
  }
  await page.waitForTimeout(1200);

  const after = await screenshot(page, 'main-generator-after-smoke-preview.png');
  const textareasAfter = await page.locator('textarea').evaluateAll((nodes) => nodes.map((n) => n.value).filter(Boolean));
  const bodyAfter = await pageText(page);
  run.checks.push({
    name: 'generator text schema smoke',
    status: bodyAfter.match(/Status|Method|Open|Closed|GET|POST|Amount/i) ? 'success' : 'suspicious',
    url: page.url(),
    schema,
    bodyBeforeExcerpt: bodyBefore.slice(0, 1000),
    textareasAfter,
    bodyAfterExcerpt: bodyAfter.slice(0, 1600),
    screenshots: [initial, after],
  });
  await page.close();
}

async function appSmoke() {
  const page = await browser.newPage({ viewport: { width: 1366, height: 900 } });
  await page.goto(appUrl, { waitUntil: 'domcontentloaded' });
  await page.waitForLoadState('networkidle').catch(() => {});
  const initial = await screenshot(page, 'main-app-initial.png');
  const expand = await clickFirstVisibleByText(page, ['Test Data', 'Generate Test Data']);
  await page.waitForTimeout(500);
  const schema = ['Decision', 'datatype.boolean(probability=0.5)', 'Role', 'enum("Admin","User")'].join('\n');
  const textareas = page.locator('textarea');
  if (await textareas.count()) {
    await textareas.first().fill(schema).catch(() => {});
  }
  const generate = page.getByRole('button', { name: /generate|preview/i }).first();
  if (await generate.isVisible({ timeout: 3000 }).catch(() => false)) {
    await generate.click();
  }
  await page.waitForTimeout(1500);
  const after = await screenshot(page, 'main-app-after-test-data-smoke.png');
  const body = await pageText(page);
  run.checks.push({
    name: 'app embedded test data smoke',
    status: body.match(/Decision|Role|Admin|User|true|false|Generate complete|Total rows/i) ? 'success' : 'suspicious',
    url: page.url(),
    expandedBy: expand,
    schema,
    bodyExcerpt: body.slice(0, 1800),
    screenshots: [initial, after],
  });
  await page.close();
}

async function responsiveScout() {
  const context = await browser.newContext({
    ...devices['iPhone 12'],
  });
  const page = await context.newPage();
  await page.goto(siteUrl, { waitUntil: 'domcontentloaded' });
  await page.waitForLoadState('networkidle').catch(() => {});
  const siteMobile = await screenshot(page, 'main-mobile-site.png');
  await page.goto(generatorUrl, { waitUntil: 'domcontentloaded' });
  await page.waitForLoadState('networkidle').catch(() => {});
  const generatorMobile = await screenshot(page, 'main-mobile-generator.png');
  const focusableCount = await page.locator('button, input, textarea, select, a[href], [tabindex]').count();
  run.checks.push({
    name: 'mobile responsive scout',
    status: 'success',
    viewport: devices['iPhone 12'].viewport,
    focusableCount,
    screenshots: [siteMobile, generatorMobile],
  });
  await context.close();
}

try {
  await siteProof();
  await generatorSmoke();
  await appSmoke();
  await responsiveScout();
} finally {
  await browser.close();
}

await fs.writeFile(path.join(supportDir, 'main-proof-and-smoke-results.json'), JSON.stringify(run, null, 2));
console.log(JSON.stringify(run, null, 2));
