const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const outDir = path.resolve('docs/testing/20260629/issue-253-001');
const screenshots = path.join(outDir, 'screenshots');
const support = path.join(outDir, 'support');

const ideas = [
  { id: 'L2-01', title: 'Duplicate params on autoIncrement.sequence', class: 'execute-now', schema: 'Seq\nautoIncrement.sequence(step=1, step=2)', expect: 'known invalid row validation' },
  { id: 'L2-02', title: 'Duplicate params on location cardinal direction', class: 'execute-now', schema: 'Dir\nlocation.cardinalDirection(abbreviated=true, abbreviated=false)', expect: 'known invalid row validation' },
  { id: 'L2-03', title: 'Malformed quote in number.int', class: 'execute-now', schema: 'Age\nnumber.int(min="1, max=3)', expect: 'known invalid or clear syntax feedback' },
  { id: 'L2-04', title: 'String structured param valid characters array', class: 'execute-now', schema: 'Token\nstring.fromCharacters(characters=["A","B"], length=4)', expect: 'valid structured params generate' },
  { id: 'L2-05', title: 'String structured param malformed quoted array', class: 'execute-now', schema: 'Token\nstring.fromCharacters(characters=["A","B], length=4)', expect: 'known invalid clear feedback' },
  { id: 'L2-06', title: 'Faker helper mustache from docs', class: 'execute-now', schema: 'Greeting\nhelpers.mustache("Hello {{name}}", { name: "Ada" })', expect: 'docs helper example works or clear support boundary' },
  { id: 'L2-07', title: 'Faker helper fake from docs', class: 'execute-now', schema: 'Greeting\nhelpers.fake("Hi, my name is {{person.firstName}} {{person.lastName}}!")', expect: 'docs helper example works' },
  { id: 'L2-08', title: 'person.fullName command-like docs example', class: 'execute-now', schema: 'Name\nperson.fullName()', expect: 'known faker/domain command accepted' },
  { id: 'L2-09', title: 'Unknown command-like docs boundary', class: 'execute-now', schema: 'Name\nperson.notACommand()', expect: 'unknown command prompt, not regex fallback' },
  { id: 'L2-10', title: 'Output format sweep JSON/Markdown for valid mixed schema', class: 'execute-now', schema: 'Age\nnumber.int(min=1, max=3)\nSeq\nautoIncrement.sequence(start=1, step=1)', outputFormats: ['JSON','MARKDOWN'], expect: 'valid generated data in alternate formats' },
  { id: 'L2-11', title: 'Full output-format sweep for all command matrix cases', class: 'defer', reason: 'Large combinatorial sweep; sampled representative alternate formats now.' },
  { id: 'L2-12', title: 'Spec-oracle check for empty arrays in string.fromCharacters', class: 'defer', reason: 'Requires product/source oracle beyond deployed-only evidence.' }
];

async function switchCase(page, idea) {
  const result = { ...idea, dialogs: [], statusTexts: [], modeAfter: null, buttonText: null, output: {}, screenshot: null, error: null };
  page.removeAllListeners('dialog');
  page.on('dialog', async dialog => { result.dialogs.push({ type: dialog.type(), message: dialog.message() }); await dialog.dismiss(); });
  await page.goto('https://eviltester.github.io/grid-table-editor/generator.html', { waitUntil: 'domcontentloaded' });
  await page.getByRole('button', { name: 'Edit as Text' }).waitFor({ timeout: 15000 });
  await page.getByRole('button', { name: 'Edit as Text' }).click();
  await page.getByRole('textbox', { name: 'Schema text' }).fill(idea.schema);
  await page.getByRole('button', { name: 'Edit as Schema' }).click();
  await page.waitForTimeout(500);
  result.modeAfter = await page.getByRole('button', { name: 'Edit as Text' }).count() ? 'schema' : 'text';
  result.buttonText = result.modeAfter === 'schema' ? 'Edit as Text' : 'Edit as Schema';
  result.statusTexts = await page.locator('[role="status"], .error, .alert, .validation-message').evaluateAll(nodes => nodes.map(n => (n.innerText || n.textContent || '').trim()).filter(Boolean));
  if (idea.outputFormats) {
    for (const fmt of idea.outputFormats) {
      await page.getByLabel('Output Format').selectOption(fmt);
      await page.getByRole('button', { name: 'Preview' }).click();
      await page.waitForTimeout(400);
      result.output[fmt] = await page.getByRole('textbox', { name: 'Output Preview' }).inputValue().catch(() => null);
    }
  } else if (result.modeAfter === 'schema' && result.statusTexts.length === 0) {
    await page.getByRole('button', { name: 'Preview' }).click();
    await page.waitForTimeout(400);
    result.output.CSV = await page.getByRole('textbox', { name: 'Output Preview' }).inputValue().catch(() => null);
  }
  const shotName = `main-loop2-${idea.id.toLowerCase()}.png`;
  await page.screenshot({ path: path.join(screenshots, shotName), fullPage: true });
  result.screenshot = `screenshots/${shotName}`;
  result.bodyExcerpt = (await page.locator('body').innerText()).slice(0, 1200);
  return result;
}

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1366, height: 900 } });
  const results = [];
  for (const idea of ideas) {
    if (idea.class === 'defer') { results.push({ ...idea, result: 'deferred' }); continue; }
    try { results.push(await switchCase(page, idea)); }
    catch (err) { results.push({ ...idea, error: err.message }); }
  }
  await browser.close();
  fs.writeFileSync(path.join(support, 'main-loop2-ideas-results.json'), JSON.stringify(results, null, 2));
  const md = ['# Loop 2 Ideas And Results', '', '| ID | Idea | Class | Result summary | Screenshot |', '| --- | --- | --- | --- | --- |'];
  for (const r of results) {
    let summary = r.result === 'deferred' ? `Deferred: ${r.reason}` : `mode=${r.modeAfter || ''}; status=${(r.statusTexts || []).join(' / ') || 'none'}; dialogs=${(r.dialogs || []).map(d => d.message).join(' / ') || 'none'}; output=${Object.entries(r.output || {}).map(([k,v]) => `${k}:${(v||'').slice(0,80).replace(/\n/g,' ')}`).join(' | ')}`;
    summary = summary.replace(/\|/g, '\\|');
    md.push(`| ${r.id} | ${r.title} | ${r.class} | ${summary} | ${r.screenshot ? `![${r.id}](../${r.screenshot})` : ''} |`);
  }
  fs.writeFileSync(path.join(support, 'main-loop2-ideas-results.md'), md.join('\n'));
})();
