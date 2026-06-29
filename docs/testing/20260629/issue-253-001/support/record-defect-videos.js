const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const outDir = path.resolve('docs/testing/20260629/issue-253-001');
const videos = path.join(outDir, 'videos');
const screenshots = path.join(outDir, 'screenshots');
fs.mkdirSync(videos,{recursive:true}); fs.mkdirSync(screenshots,{recursive:true});
const gen='https://eviltester.github.io/grid-table-editor/generator.html';
const app='https://eviltester.github.io/grid-table-editor/site/app.html';
async function wait(ms){return new Promise(r=>setTimeout(r,ms));}
async function startPage(browser, name, vp={width:1366,height:900}){
  const page=await browser.newPage({viewport:vp});
  await page.screencast.start({path:path.join(videos,`${name}.webm`), quality:80});
  return page;
}
async function chapter(page, text){ await page.screencast.showChapter(text); await wait(900); }
async function stop(page){ await wait(700); await page.screencast.stop(); await page.close(); }
async function gotoRetry(page,url,waitFor){ let last; for(let i=0;i<4;i++){ try{ await page.goto(url,{waitUntil:'domcontentloaded',timeout:30000}); if(waitFor) await waitFor(); return; } catch(e){ last=e; await wait(1200); } } throw last; }
async function addVisualNote(page, text){
  await page.evaluate((text)=>{ let d=document.getElementById('codex-video-note'); if(!d){d=document.createElement('div'); d.id='codex-video-note'; Object.assign(d.style,{position:'fixed',left:'12px',bottom:'12px',zIndex:'999999',background:'rgba(0,0,0,.82)',color:'white',padding:'10px 12px',font:'16px Arial,sans-serif',maxWidth:'70vw',borderRadius:'4px'}); document.body.appendChild(d);} d.textContent=text; }, text);
  await wait(1000);
}
(async()=>{
  const browser=await chromium.launch({headless:true});

  // DEF-001 docs/runtime mismatch
  let page=await startPage(browser,'defect-001-docs-helpers-uniquearray-this-word');
  await chapter(page,'DEF-001 Open deployed generator');
  await gotoRetry(page, gen, () => page.getByRole('button',{name:'Edit as Text'}).waitFor({timeout:20000}));
  await chapter(page,'Enter documented helper example');
  await page.getByRole('button',{name:'Edit as Text'}).click();
  await page.getByRole('textbox',{name:'Schema text'}).fill('Words\nhelpers.uniqueArray(this.word.sample, 5)');
  await chapter(page,'Preview rejects documented this.word.sample form');
  await page.getByRole('button',{name:'Preview', exact:true}).click(); await wait(1200);
  await addVisualNote(page,'Observed: deployed generator rejects docs example with unsafe/complex faker syntax.');
  await page.screenshot({path:path.join(screenshots,'defect-001-docs-helpers-uniquearray-this-word.png'),fullPage:true});
  await chapter(page,'Control: supported faker.word.sample form works');
  await page.getByRole('textbox',{name:'Schema text'}).fill('Words\nhelpers.uniqueArray(faker.word.sample, 5)');
  await page.getByRole('button',{name:'Preview', exact:true}).click(); await wait(1200);
  await addVisualNote(page,'Control: faker.word.sample generates output, so the docs syntax is the mismatch.');
  await page.screenshot({path:path.join(screenshots,'defect-001-control-helpers-uniquearray-faker-word.png'),fullPage:true});
  await stop(page);

  // DEF-002 app missing main/H1
  page=await startPage(browser,'defect-002-app-missing-main-h1',{width:390,height:844});
  await chapter(page,'DEF-002 Open deployed app on mobile viewport');
  await gotoRetry(page, app); await wait(5000);
  const landmark=await page.evaluate(()=>({mainCount:document.querySelectorAll('main,[role="main"]').length,h1Count:document.querySelectorAll('h1').length,title:document.title}));
  await addVisualNote(page,`DOM probe: main landmarks=${landmark.mainCount}, h1 elements=${landmark.h1Count}`);
  await page.screenshot({path:path.join(screenshots,'defect-002-app-missing-main-h1-mobile.png'),fullPage:true});
  await chapter(page,'Expected orientation landmarks are absent'); await wait(800); await stop(page);

  // DEF-003 touch targets
  page=await startPage(browser,'defect-003-sub-24px-touch-targets',{width:390,height:844});
  await chapter(page,'DEF-003 App mobile target-size scan');
  await gotoRetry(page, app); await wait(5000);
  await page.evaluate(()=>{for(const el of [...document.querySelectorAll('button,a,input,select,textarea')]){const r=el.getBoundingClientRect(); if(r.width>0&&r.height>0&&(r.width<24||r.height<24)){el.style.outline='3px solid red'; el.style.outlineOffset='2px';}}});
  await addVisualNote(page,'Red outlines mark visible controls below 24px in at least one dimension.');
  await page.screenshot({path:path.join(screenshots,'defect-003-app-sub-24px-touch-targets.png'),fullPage:true});
  await chapter(page,'Generator mobile target-size scan');
  await gotoRetry(page, gen); await wait(3000);
  await page.evaluate(()=>{for(const el of [...document.querySelectorAll('button,a,input,select,textarea')]){const r=el.getBoundingClientRect(); if(r.width>0&&r.height>0&&(r.width<24||r.height<24)){el.style.outline='3px solid red'; el.style.outlineOffset='2px';}}});
  await addVisualNote(page,'Generator also has help icons and schema controls below the 24px floor.');
  await page.screenshot({path:path.join(screenshots,'defect-003-generator-sub-24px-touch-targets.png'),fullPage:true});
  await stop(page);

  // DEF-004 schema tab order
  page=await startPage(browser,'defect-004-schema-row-tab-order',{width:1366,height:900});
  await chapter(page,'DEF-004 Focus first schema Column Name');
  await gotoRetry(page, gen, () => page.getByLabel('Column Name').waitFor({timeout:20000}));
  await page.getByLabel('Column Name').focus(); await wait(600);
  for(let i=1;i<=5;i++){ await chapter(page,`Press Tab ${i}`); await page.keyboard.press('Tab'); await wait(500); const info=await page.evaluate(()=>({tag:document.activeElement?.tagName,label:document.activeElement?.getAttribute('aria-label'),text:(document.activeElement?.innerText||document.activeElement?.value||'').slice(0,80)})); await addVisualNote(page,`Focus after Tab ${i}: ${info.tag || ''} ${info.label || info.text || ''}`); }
  await page.screenshot({path:path.join(screenshots,'defect-004-schema-row-tab-order.png'),fullPage:true});
  await stop(page);

  await browser.close();
})();

