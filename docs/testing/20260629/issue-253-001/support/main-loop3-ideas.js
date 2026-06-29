const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const outDir = path.resolve('docs/testing/20260629/issue-253-001');
const support = path.join(outDir,'support');
const screenshots = path.join(outDir,'screenshots');
fs.mkdirSync(support,{recursive:true}); fs.mkdirSync(screenshots,{recursive:true});
const URLS = { gen:'https://eviltester.github.io/grid-table-editor/generator.html', app:'https://eviltester.github.io/grid-table-editor/site/app.html', docs:'https://eviltester.github.io/grid-table-editor/site/docs/test-data/faker/helpers/' };
const ideas = [
 {id:'L3-01', title:'Recheck docs uniqueArray this.word.sample failure', class:'execute-now'},
 {id:'L3-02', title:'Control check uniqueArray faker.word.sample succeeds', class:'execute-now'},
 {id:'L3-03', title:'App page landmark and H1 scan across desktop/mobile', class:'execute-now'},
 {id:'L3-04', title:'Generator landmark and H1 scan across desktop/mobile', class:'execute-now'},
 {id:'L3-05', title:'App mobile touch target scan', class:'execute-now'},
 {id:'L3-06', title:'Generator mobile touch target scan', class:'execute-now'},
 {id:'L3-07', title:'Method picker mobile Tab sequence repeat', class:'execute-now'},
 {id:'L3-08', title:'Method picker desktop Tab sequence repeat', class:'execute-now'},
 {id:'L3-09', title:'Generator schema row desktop Tab sequence', class:'execute-now'},
 {id:'L3-10', title:'Generator schema row mobile Tab sequence', class:'execute-now'},
 {id:'L3-11', title:'Manual screen-reader confirmation of focus model', class:'defer', reason:'Requires assistive tech outside current deployed-browser automation.'},
 {id:'L3-12', title:'Full cross-browser keyboard comparison', class:'defer', reason:'Current requirement allows Playwright/DevTools; one-browser repeat is enough for defect packaging.'}
];
async function load(page,url){ for(let i=0;i<3;i++){try{await page.goto(url,{waitUntil:'domcontentloaded',timeout:30000}); await page.waitForTimeout(2000); return;}catch(e){if(i===2) throw e; await page.waitForTimeout(1000);}}}
async function runSchemaPreview(page, schema){await load(page,URLS.gen); await page.getByRole('button',{name:'Edit as Text'}).click(); await page.getByRole('textbox',{name:'Schema text'}).fill(schema); await page.getByRole('button',{name:'Preview', exact:true}).click(); await page.waitForTimeout(800); return await page.locator('body').innerText();}
async function landmarkScan(page,url,viewports){const rows=[]; for(const vp of viewports){await page.setViewportSize(vp); await load(page,url); rows.push(await page.evaluate((vp)=>({vp, mainCount:document.querySelectorAll('main,[role="main"]').length, h1Count:document.querySelectorAll('h1').length, title:document.title}),vp));} return rows;}
async function targetScan(page,url,vp){await page.setViewportSize(vp); await load(page,url); return await page.evaluate(()=>[...document.querySelectorAll('button,a,input,select,textarea,[role="button"],[role="link"]')].filter(el=>{const r=el.getBoundingClientRect(); const s=getComputedStyle(el); return r.width>0 && r.height>0 && s.visibility!=='hidden' && s.display!=='none' && (r.width<24 || r.height<24);}).slice(0,40).map(el=>{const r=el.getBoundingClientRect(); return {tag:el.tagName, text:(el.innerText||el.getAttribute('aria-label')||el.getAttribute('title')||el.getAttribute('data-role')||'').trim().slice(0,80), width:Math.round(r.width), height:Math.round(r.height)};}));}
async function openMethodPicker(page,vp){await page.setViewportSize(vp); await load(page,URLS.gen); await page.getByLabel('Field type').selectOption('domain'); await page.getByRole('button',{name:/Select domain command/i}).click(); await page.waitForTimeout(800);}
async function tabSeq(page, focusSelector, presses=8){if(focusSelector) await page.locator(focusSelector).first().focus(); const seq=[]; for(let i=0;i<presses;i++){seq.push(await page.evaluate(()=>({tag:document.activeElement?.tagName, label:document.activeElement?.getAttribute('aria-label'), text:(document.activeElement?.innerText||document.activeElement?.value||'').slice(0,80)}))); await page.keyboard.press('Tab'); await page.waitForTimeout(100);} seq.push(await page.evaluate(()=>({tag:document.activeElement?.tagName, label:document.activeElement?.getAttribute('aria-label'), text:(document.activeElement?.innerText||document.activeElement?.value||'').slice(0,80)}))); return seq;}
(async()=>{const browser=await chromium.launch({headless:true}); const page=await browser.newPage({viewport:{width:1366,height:900}}); const results=[];
for(const idea of ideas){try{let data=null, shot=null; if(idea.class==='defer'){results.push({...idea,result:'deferred'}); continue;}
 if(idea.id==='L3-01'){const body=await runSchemaPreview(page,'Words\nhelpers.uniqueArray(this.word.sample, 5)'); data={containsError:/Unsafe faker rule syntax|failed faker validation/i.test(body), excerpt:body.slice(0,1000)}; shot='main-loop3-l3-01.png'; await page.screenshot({path:path.join(screenshots,shot),fullPage:true});}
 if(idea.id==='L3-02'){const body=await runSchemaPreview(page,'Words\nhelpers.uniqueArray(faker.word.sample, 5)'); data={containsError:/failed faker validation|Unsafe/i.test(body), excerpt:body.slice(0,1000)}; shot='main-loop3-l3-02.png'; await page.screenshot({path:path.join(screenshots,shot),fullPage:true});}
 if(idea.id==='L3-03') data=await landmarkScan(page,URLS.app,[{width:1440,height:900},{width:390,height:844},{width:320,height:568}]);
 if(idea.id==='L3-04') data=await landmarkScan(page,URLS.gen,[{width:1440,height:900},{width:390,height:844},{width:320,height:568}]);
 if(idea.id==='L3-05') data=await targetScan(page,URLS.app,{width:390,height:844});
 if(idea.id==='L3-06') data=await targetScan(page,URLS.gen,{width:390,height:844});
 if(idea.id==='L3-07'){await openMethodPicker(page,{width:390,height:844}); data=await tabSeq(page,'[aria-label="Filter methods"]',8); shot='main-loop3-l3-07.png'; await page.screenshot({path:path.join(screenshots,shot),fullPage:true});}
 if(idea.id==='L3-08'){await openMethodPicker(page,{width:1440,height:900}); data=await tabSeq(page,'[aria-label="Filter methods"]',8); shot='main-loop3-l3-08.png'; await page.screenshot({path:path.join(screenshots,shot),fullPage:true});}
 if(idea.id==='L3-09'){await page.setViewportSize({width:1440,height:900}); await load(page,URLS.gen); data=await tabSeq(page,'[aria-label="Column Name"]',8); shot='main-loop3-l3-09.png'; await page.screenshot({path:path.join(screenshots,shot),fullPage:true});}
 if(idea.id==='L3-10'){await page.setViewportSize({width:390,height:844}); await load(page,URLS.gen); data=await tabSeq(page,'[aria-label="Column Name"]',8); shot='main-loop3-l3-10.png'; await page.screenshot({path:path.join(screenshots,shot),fullPage:true});}
 results.push({...idea,data,screenshot:shot?`screenshots/${shot}`:null});}catch(e){results.push({...idea,error:e.message});}}
await browser.close(); fs.writeFileSync(path.join(support,'main-loop3-ideas-results.json'),JSON.stringify(results,null,2));
const md=['# Loop 3 Ideas And Results','','| ID | Idea | Class | Result summary | Screenshot |','| --- | --- | --- | --- | --- |']; for(const r of results){let s=r.result==='deferred'?`Deferred: ${r.reason}`:r.error?`ERROR: ${r.error}`:JSON.stringify(r.data).slice(0,350); s=s.replace(/\|/g,'\\|'); md.push(`| ${r.id} | ${r.title} | ${r.class} | ${s} | ${r.screenshot?`![${r.id}](../${r.screenshot})`:''} |`);} fs.writeFileSync(path.join(support,'main-loop3-ideas-results.md'),md.join('\n'));
})();
