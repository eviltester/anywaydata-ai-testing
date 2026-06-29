import { chromium } from 'playwright';
import { access, writeFile } from 'node:fs/promises';
import path from 'node:path';

const supportDir =
  'D:/github/anywaydata-ai-testing/docs/testing/20260629/issue-266-001/support';

const pages = [
  'https://eviltester.github.io/grid-table-editor/site/',
  'https://eviltester.github.io/grid-table-editor/site/docs/intro',
  'https://eviltester.github.io/grid-table-editor/site/docs/category/generating-data',
  'https://eviltester.github.io/grid-table-editor/site/docs/test-data/faker-test-data',
  'https://eviltester.github.io/grid-table-editor/site/docs/test-data/Schema-Definition',
  'https://eviltester.github.io/grid-table-editor/site/docs/test-data/data-grid-editable',
  'https://eviltester.github.io/grid-table-editor/site/docs/test-data/test-data-generation',
  'https://eviltester.github.io/grid-table-editor/site/docs/interfaces-and-deployment/web-ui',
  'https://eviltester.github.io/grid-table-editor/site/docs/interfaces-and-deployment/rest-api',
  'https://eviltester.github.io/grid-table-editor/site/docs/interfaces-and-deployment/cli-node-and-bun',
  'https://eviltester.github.io/grid-table-editor/site/app.html',
  'https://eviltester.github.io/grid-table-editor/generator.html',
];

const patterns = [
  /method picker/i,
  /datatype\.enum/i,
  /\benum\s*\(/i,
  /urlLoremFlickr/i,
  /helpers\.uniqueArray/i,
  /internet\.httpMethod/i,
  /data grid/i,
  /generate/i,
  /faker\./i,
  /command/i,
];

function cleanText(text) {
  return String(text || '').replace(/\s+/g, ' ').trim();
}

async function pageInventory(page, url) {
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 });
  await page.waitForLoadState('load', { timeout: 15000 }).catch(() => {});
  await page.waitForTimeout(1250);
  const title = await page.title();
  const inventory = await page.evaluate((sources) => {
    const clean = (value) => String(value || '').replace(/\s+/g, ' ').trim();
    const headings = [...document.querySelectorAll('h1,h2,h3')]
      .map((el) => ({ level: el.tagName, text: clean(el.textContent) }))
      .filter((item) => item.text);
    const links = [...document.querySelectorAll('a[href]')]
      .map((el) => ({ text: clean(el.textContent), href: el.href }))
      .filter((item) => item.href);
    const codeBlocks = [...document.querySelectorAll('pre code, pre, code')]
      .map((el) => clean(el.textContent))
      .filter(Boolean);
    const controls = [...document.querySelectorAll('button,input,select,textarea,[role=button],[role=tab]')]
      .map((el) => ({
        tag: el.tagName,
        type: el.getAttribute('type') || '',
        role: el.getAttribute('role') || '',
        name: clean(el.getAttribute('aria-label') || el.getAttribute('title') || el.textContent || el.getAttribute('placeholder') || el.value),
        id: el.id || '',
        classes: el.className || '',
      }))
      .filter((item) => item.name || item.id || item.classes);
    const bodyText = clean(document.body.innerText);
    const regexes = sources.map((source) => new RegExp(source, 'i'));
    const excerpts = bodyText
      .split(/(?<=[.!?])\s+|\n+/)
      .map(clean)
      .filter((line) => regexes.some((rx) => rx.test(line)))
      .slice(0, 80);
    return { headings, links, codeBlocks, controls, excerpts, bodyLength: bodyText.length };
  }, patterns.map((pattern) => pattern.source));
  return { url, title, ...inventory };
}

const chromePath = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
let launchOptions = { headless: true };
try {
  await access(chromePath);
  launchOptions = { ...launchOptions, executablePath: chromePath };
} catch {
  // Use the bundled Playwright browser when it is installed.
}
const browser = await chromium.launch(launchOptions);
const context = await browser.newContext({ viewport: { width: 1440, height: 1100 } });
const page = await context.newPage();
const results = [];

for (const url of pages) {
  const result = await pageInventory(page, url);
  results.push(result);
  const safeName = url
    .replace('https://eviltester.github.io/grid-table-editor/', '')
    .replace(/[^a-z0-9]+/gi, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase()
    .slice(0, 80);
  await page.screenshot({
    path: path.join(supportDir, `docs-consistency-${safeName || 'home'}.png`),
    fullPage: true,
  });
}

await browser.close();

await writeFile(
  path.join(supportDir, 'docs-consistency-page-inventory.json'),
  JSON.stringify(results, null, 2),
  'utf8',
);

const markdown = results
  .map((result) => {
    const codes = result.codeBlocks
      .filter((code) => patterns.some((pattern) => pattern.test(code)))
      .slice(0, 20)
      .map((code) => `- \`${code.slice(0, 240).replace(/`/g, '\\`')}${code.length > 240 ? '...' : ''}\``)
      .join('\n');
    const excerpts = result.excerpts.map((line) => `- ${line}`).join('\n');
    return [
      `## ${result.title}`,
      '',
      result.url,
      '',
      `Headings: ${result.headings.map((h) => `${h.level}:${h.text}`).join(' | ')}`,
      '',
      'Relevant excerpts:',
      excerpts || '- None captured',
      '',
      'Relevant code/examples:',
      codes || '- None captured',
    ].join('\n');
  })
  .join('\n\n---\n\n');

await writeFile(
  path.join(supportDir, 'docs-consistency-page-inventory.md'),
  markdown,
  'utf8',
);
