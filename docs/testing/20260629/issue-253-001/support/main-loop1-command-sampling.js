const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const outDir = path.resolve('docs/testing/20260629/issue-253-001');
const screenshots = path.join(outDir, 'screenshots');
const support = path.join(outDir, 'support');
fs.mkdirSync(screenshots, { recursive: true });
fs.mkdirSync(support, { recursive: true });

const cases = [
  { id: 'story-duplicate-min', family: 'domain validator duplicate params', schema: 'Num\nnumber.int(min=1, min=2, max=3)', expectation: 'known-invalid should switch to Schema UI with row validation per issue #253' },
  { id: 'valid-number-int', family: 'domain valid params', schema: 'Age\nnumber.int(min=1, max=3)', expectation: 'known-valid should switch to Schema UI' },
  { id: 'invalid-number-range', family: 'domain validator invalid range', schema: 'Age\nnumber.int(min=10, max=3)', expectation: 'known-invalid should be distinguishable from unknown' },
  { id: 'sequence-step-zero', family: 'changed autoIncrement.sequence validator', schema: 'Seq\nautoIncrement.sequence(start=1, step=0)', expectation: 'known-invalid should surface step validation' },
  { id: 'sequence-negative-zeropadding', family: 'changed autoIncrement.sequence validator', schema: 'Seq\nautoIncrement.sequence(start=1, step=1, zeropadding=-1)', expectation: 'known-invalid should surface zeropadding validation' },
  { id: 'valid-sequence', family: 'changed autoIncrement.sequence valid', schema: 'Seq\nautoIncrement.sequence(start=1, step=2, zeropadding=3)', expectation: 'known-valid should switch and preview/generate' },
  { id: 'unknown-command', family: 'removed/unknown command', schema: 'Mystery\nnotAReal.command(value=1)', expectation: 'unknown command should not silently become known domain command' },
  { id: 'malformed-call', family: 'malformed syntax', schema: 'Bad\nnumber.int(min=1, max=3', expectation: 'malformed command should be rejected or literal-prompted distinctly' },
  { id: 'regex-default', family: 'regex default examples', schema: 'Code\n[A-Z]{2}[0-9]{3}', expectation: 'regex-style value should work as default text schema' },
  { id: 'literal-default', family: 'literal/default examples', schema: 'Status\nliteral("active")', expectation: 'literal command should work or produce clear command feedback' }
];

async function runCase(page, testCase) {
  const result = { ...testCase, dialogs: [], statusTexts: [], modeAfter: null, buttonText: null, previewText: null, screenshot: null, error: null };
  page.on('dialog', async dialog => {
    result.dialogs.push({ type: dialog.type(), message: dialog.message() });
    await dialog.dismiss();
  });
  await page.goto('https://eviltester.github.io/grid-table-editor/generator.html', { waitUntil: 'domcontentloaded' });
  await page.getByRole('button', { name: 'Edit as Text' }).waitFor({ timeout: 15000 });
  await page.getByRole('button', { name: 'Edit as Text' }).click();
  const textBox = page.getByRole('textbox', { name: 'Schema text' });
  await textBox.fill(testCase.schema);
  await page.getByRole('button', { name: 'Edit as Schema' }).click();
  await page.waitForTimeout(500);
  const textModeCount = await page.getByRole('textbox', { name: 'Schema text' }).count();
  const editAsTextCount = await page.getByRole('button', { name: 'Edit as Text' }).count();
  const editAsSchemaCount = await page.getByRole('button', { name: 'Edit as Schema' }).count();
  result.modeAfter = textModeCount ? 'text' : 'schema';
  result.buttonText = editAsTextCount ? 'Edit as Text' : (editAsSchemaCount ? 'Edit as Schema' : 'unknown');
  result.statusTexts = await page.locator('[role="status"], .error, .alert, .validation-message').evaluateAll(nodes => nodes.map(n => n.innerText || n.textContent).filter(Boolean));
  result.bodyExcerpt = (await page.locator('body').innerText()).slice(0, 1200);
  const shotName = `main-loop1-${testCase.id}.png`;
  await page.screenshot({ path: path.join(screenshots, shotName), fullPage: true });
  result.screenshot = `screenshots/${shotName}`;
  if (result.modeAfter === 'schema') {
    try {
      await page.getByRole('button', { name: 'Preview' }).click({ timeout: 3000 });
      await page.waitForTimeout(500);
      result.previewText = await page.getByRole('textbox', { name: 'Output Preview' }).inputValue().catch(() => null);
    } catch (err) {
      result.previewError = err.message;
    }
  }
  return result;
}

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1366, height: 900 } });
  const results = [];
  for (const testCase of cases) {
    try {
      results.push(await runCase(page, testCase));
    } catch (err) {
      results.push({ ...testCase, error: err.message });
    }
  }
  await browser.close();
  fs.writeFileSync(path.join(support, 'main-loop1-command-sampling.json'), JSON.stringify(results, null, 2));
  const md = ['# Main Loop 1 Command Sampling', '', '| Case | Family | Mode after switch | Button | Dialogs | Status / evidence | Screenshot |', '| --- | --- | --- | --- | --- | --- | --- |'];
  for (const r of results) {
    const status = (r.statusTexts || []).join(' / ').replace(/\|/g, '\\|').replace(/\n/g, '<br>') || (r.error || '').replace(/\|/g, '\\|');
    const dialogs = (r.dialogs || []).map(d => `${d.type}: ${d.message}`).join('<br>').replace(/\|/g, '\\|');
    md.push(`| ${r.id} | ${r.family} | ${r.modeAfter || ''} | ${r.buttonText || ''} | ${dialogs} | ${status.slice(0, 300)} | ${r.screenshot ? `![${r.id}](../${r.screenshot})` : ''} |`);
  }
  fs.writeFileSync(path.join(support, 'main-loop1-command-sampling.md'), md.join('\n'));
})();
