const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const outDir = path.resolve('docs/testing/20260629/issue-253-001');
const screenshots = path.join(outDir, 'screenshots');
const support = path.join(outDir, 'support');
const ideas = JSON.parse(fs.readFileSync(path.join(support, 'main-loop2-ideas-results.json'), 'utf8')).map(x => ({id:x.id,title:x.title,class:x.class,schema:x.schema,outputFormats:x.outputFormats,expect:x.expect,reason:x.reason}));
async function gotoWithRetry(page, url) { let last; for (let i=0;i<3;i++) { try { await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 }); await page.getByRole('button', { name: 'Edit as Text' }).waitFor({ timeout: 20000 }); return; } catch(e) { last=e; await page.waitForTimeout(1000); } } throw last; }
async function run(browser, idea) {
  if (idea.class === 'defer') return { ...idea, result: 'deferred' };
  const page = await browser.newPage({ viewport: { width: 1366, height: 900 } });
  const result = { ...idea, dialogs: [], statusTexts: [], modeAfter: null, buttonText: null, output: {}, screenshot: null, error: null };
  page.on('dialog', async dialog => { result.dialogs.push({ type: dialog.type(), message: dialog.message() }); await dialog.dismiss(); });
  try {
    await gotoWithRetry(page, 'https://eviltester.github.io/grid-table-editor/generator.html');
    await page.getByRole('button', { name: 'Edit as Text' }).click();
    await page.getByRole('textbox', { name: 'Schema text' }).fill(idea.schema);
    await page.getByRole('button', { name: 'Edit as Schema' }).click();
    await page.waitForTimeout(700);
    result.modeAfter = await page.getByRole('button', { name: 'Edit as Text' }).count() ? 'schema' : 'text';
    result.buttonText = result.modeAfter === 'schema' ? 'Edit as Text' : 'Edit as Schema';
    result.statusTexts = await page.locator('[role="status"], .error, .alert, .validation-message').evaluateAll(nodes => nodes.map(n => (n.innerText || n.textContent || '').trim()).filter(Boolean));
    if (idea.outputFormats) {
      for (const fmt of idea.outputFormats) {
        await page.getByLabel('Output Format').selectOption(fmt);
        await page.getByRole('button', { name: 'Preview', exact: true }).click();
        await page.waitForTimeout(500);
        result.output[fmt] = await page.getByRole('textbox', { name: 'Output Preview' }).inputValue().catch(() => null);
      }
    } else if (result.modeAfter === 'schema' && result.statusTexts.length === 0) {
      await page.getByRole('button', { name: 'Preview', exact: true }).click();
      await page.waitForTimeout(500);
      result.output.CSV = await page.getByRole('textbox', { name: 'Output Preview' }).inputValue().catch(() => null);
    }
    const shotName = `main-loop2-${idea.id.toLowerCase()}.png`;
    await page.screenshot({ path: path.join(screenshots, shotName), fullPage: true });
    result.screenshot = `screenshots/${shotName}`;
    result.bodyExcerpt = (await page.locator('body').innerText()).slice(0, 1200);
  } catch (e) { result.error = e.message; }
  await page.close();
  return result;
}
(async()=>{
  const browser = await chromium.launch({ headless: true });
  const results=[];
  for (const idea of ideas) results.push(await run(browser, idea));
  await browser.close();
  fs.writeFileSync(path.join(support, 'main-loop2-ideas-results.json'), JSON.stringify(results, null, 2));
  const md=['# Loop 2 Ideas And Results','','| ID | Idea | Class | Result summary | Screenshot |','| --- | --- | --- | --- | --- |'];
  for (const r of results) {
    let summary = r.result==='deferred' ? `Deferred: ${r.reason}` : (r.error ? `ERROR: ${r.error}` : `mode=${r.modeAfter}; status=${(r.statusTexts||[]).join(' / ')||'none'}; dialogs=${(r.dialogs||[]).map(d=>d.message).join(' / ')||'none'}; output=${Object.entries(r.output||{}).map(([k,v])=>`${k}:${(v||'').slice(0,80).replace(/\n/g,' ')}`).join(' | ')}`);
    summary=summary.replace(/\|/g,'\\|');
    md.push(`| ${r.id} | ${r.title} | ${r.class} | ${summary} | ${r.screenshot ? `![${r.id}](../${r.screenshot})` : ''} |`);
  }
  fs.writeFileSync(path.join(support, 'main-loop2-ideas-results.md'), md.join('\n'));
})();
