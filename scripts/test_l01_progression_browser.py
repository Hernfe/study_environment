"""Local progression QA; use workspace-local Playwright and browser cache.
PLAYWRIGHT_BROWSERS_PATH=/work/.codex-progression/framework/browsers \\
.codex-progression/framework/venv/bin/python scripts/test_progression_browser.py
"""
import hashlib,json,os
from pathlib import Path
from playwright.sync_api import sync_playwright
ROOT=Path('/work'); OUT=ROOT/'.codex-progression/L01/browser';OUT.mkdir(parents=True,exist_ok=True)
BASE='http://127.0.0.1:5173'
with sync_playwright() as p:
 browser=p.chromium.launch(headless=True,executable_path=os.environ.get('PLAYWRIGHT_CHROMIUM_EXECUTABLE'))
 context=browser.new_context(viewport={'width':1280,'height':1000})
 page=context.new_page();errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
 page.goto(BASE+'/courses/nbe-e4120/lectures/L01/');page.locator('#donnan').wait_for()
 # Every section independently starts with a concept MCQ, after theory/equations.
 audit=page.locator('.page-inner > .section:not(.mock-exams)').evaluate_all('''sections=>sections.map(s=>{
 const first=s.querySelector('.concept-quiz article,.formula-drill,article.question');
 const concept=s.querySelector('.concept-quiz');
 const follows=(a,b)=>Boolean(a.compareDocumentPosition(b)&Node.DOCUMENT_POSITION_FOLLOWING);
 return {id:s.id,firstIsMCQ:!!first?.closest('.concept-quiz'),theoryFirst:follows(s.querySelector('.concept-body'),concept),
 equationsFirst:[...s.querySelectorAll('.formula-explorer')].every(x=>follows(x,concept)),
 drillsLater:[...s.querySelectorAll('.formula-drill')].every(x=>follows(concept,x)),
 noGate:[...s.querySelectorAll(':scope > article button')].some(b=>!b.disabled)};
 })''')
 assert len(audit)==17 and all(all(r[k] for k in ['firstIsMCQ','theoryFirst','equationsFirst','drillsLater','noGate']) for r in audit),audit
 assert all(2<=n<=4 for n in page.locator('.section > .concept-quiz').evaluate_all('xs=>xs.map(x=>x.querySelectorAll("article").length)'))
 assert page.locator('.formula-explorer .formula-drill').count()==0
 assert page.locator('.formula-drill').count()==30
 assert page.locator('.section > article.question').count()==52
 assert page.locator('.extra-practice article.question').count()==6
 assert page.locator('#mock-exams > div').count()==3
 first=page.locator('#cells .concept-quiz article').first
 assert page.locator('.concept-quiz article').count()==48
 assert first.locator('details,.option-feedback').count()==0
 before=first.locator('.option').all_text_contents()
 # Native buttons via keyboard; wrong submission teaches all distractors.
 first.get_by_role('button',name='Electroencephalography',exact=True).focus();page.keyboard.press('Enter')
 first.get_by_role('button',name='Check',exact=True).focus();page.keyboard.press('Enter')
 assert first.locator('.option-feedback').count()==3
 assert 'Not quite.' in first.inner_text()
 assert first.get_by_text('Show worked answer',exact=True).count()==1
 saved=page.evaluate("localStorage.getItem('nbe:nbe-e4120:progress:L01')")
 page.reload();page.locator('#donnan').wait_for()
 assert page.evaluate("localStorage.getItem('nbe:nbe-e4120:progress:L01')")==saved
 assert first.locator('.option-feedback').count()==3
 assert first.locator('.option').evaluate_all('xs=>xs.map(x=>x.firstChild.textContent)')==before
 first.get_by_role('button',name='Try again',exact=True).click()
 assert first.locator('details,.option-feedback').count()==0
 first.get_by_role('button',name='Electromyography',exact=True).click();first.get_by_role('button',name='Check',exact=True).click()
 assert 'Correct.' in first.inner_text()
 # Historical attempts remain; checked UI uses only the new independent key.
 assert page.evaluate("JSON.parse(localStorage.getItem('nbe:nbe-e4120:progress:L01')).concept['cells-check'].attempts")==2
 # New starters use their own stable IDs and preserve historical results on refresh.
 new=page.locator('article[aria-labelledby="cq-cells-starter-soma"]')
 old_record=page.evaluate("JSON.parse(localStorage.getItem('nbe:nbe-e4120:progress:L01')).concept['cells-check']")
 new.get_by_role('button',name='The axon',exact=True).click();new.get_by_role('button',name='Check',exact=True).click()
 assert new.locator('.option-feedback').count()==3
 new_order=new.locator('.option').evaluate_all('xs=>xs.map(x=>x.firstChild.textContent)')
 new_saved=page.evaluate("localStorage.getItem('nbe:nbe-e4120:progress:L01')")
 page.reload();page.locator('#donnan').wait_for()
 assert page.evaluate("localStorage.getItem('nbe:nbe-e4120:progress:L01')")==new_saved
 assert new.locator('.option').evaluate_all('xs=>xs.map(x=>x.firstChild.textContent)')==new_order
 assert page.evaluate("JSON.parse(localStorage.getItem('nbe:nbe-e4120:progress:L01')).concept['cells-check']")==old_record
 for theme in ['light','dark']:
  page.emulate_media(color_scheme=theme)
  for width in [380,768,1280,1920]:
   page.set_viewport_size({'width':width,'height':1000})
   new.evaluate('x=>x.scrollIntoView({block:"start",behavior:"instant"})')
   page.screenshot(path=str(OUT/f'new-starter-feedback-{width}-{theme}.png'))
 new.get_by_role('button',name='Try again',exact=True).click()
 new.get_by_role('button',name='The soma',exact=True).click();new.get_by_role('button',name='Check',exact=True).click()
 assert 'Correct.' in new.inner_text()
 assert page.evaluate("JSON.parse(localStorage.getItem('nbe:nbe-e4120:progress:L01')).concept['cells-starter-soma'].attempts")==2
 drill=page.locator('.formula-drill[data-formula="L01-f-current"]')
 drill.locator('input').fill('3000 pA');drill.get_by_role('button',name='Check drill',exact=True).click();assert 'Correct.' in drill.inner_text()
 # Optional controls remain accessible and never destroy mounted work.
 extra=page.locator('#combinations > details.extra-practice');assert not extra.evaluate('x=>x.open')
 extra.locator(':scope > summary').focus();page.keyboard.press('Enter');assert extra.evaluate('x=>x.open')
 extra.locator('input').first.fill('4000');extra.locator(':scope > summary').focus();page.keyboard.press('Space');assert not extra.evaluate('x=>x.open')
 assert extra.locator('input').first.input_value()=='4000'
 assert page.evaluate('''async()=>{const {default:c}=await import('/content/nbe-e4120/L01.js');const {pruneLectureProgress}=await import('/js/progress.js');return pruneLectureProgress('L01',c)}''')==0
 # New rendering cannot affect mock question flow or saved typed responses.
 mock=page.locator('#mock-exams > div').first
 mock.get_by_role('button',name='Start real-exam practice',exact=True).click()
 assert mock.locator('textarea').count()==5
 mock.locator('textarea').nth(4).fill('Persist this methods response')
 page.reload();page.locator('#donnan').wait_for();assert mock.locator('textarea').nth(4).input_value()=='Persist this methods response'
 page.locator('img').evaluate_all("xs=>xs.forEach(i=>i.loading='eager')")
 page.wait_for_function('Array.from(document.images).every(i=>i.complete&&i.naturalWidth>0)')
 page.add_style_tag(content='html { scroll-behavior:auto!important; }')
 shots=[]
 for theme in ['light','dark']:
  page.emulate_media(color_scheme=theme)
  for width in [380,768,1280,1920]:
   page.set_viewport_size({'width':width,'height':1000})
   assert page.evaluate('document.documentElement.scrollWidth<=innerWidth'),(width,theme)
   for section in page.locator('.page-inner > .section:not(.mock-exams)').all():
    sid=section.get_attribute('id');page.evaluate('(id)=>document.getElementById(id).scrollIntoView()',sid)
    path=OUT/f'L01-{sid}-{width}-{theme}.png';page.screenshot(path=str(path));shots.append(path.name)
 assert not errors,errors
 context.close()
 # E4210: exact original-current DOM and pixels at all requested viewports/themes.
 isolation=[]
 for theme in ['light','dark']:
  for width in [380,768,1280,1920]:
   dom=[];pixels=[]
   for baseline in [True,False]:
    ctx=browser.new_context(viewport={'width':width,'height':1000},color_scheme=theme)
    ctx.add_init_script('Math.random=()=>0.42')
    pg=ctx.new_page()
    if baseline:
     def original(route):
      name=route.request.url.split('/js/')[-1].split('?')[0].removesuffix('.js')
      path=ROOT/f'.codex-progression/framework/{name}.before.js'
      if path.exists():route.fulfill(status=200,content_type='application/javascript',body=path.read_text())
      else:route.continue_()
     pg.route('**/js/*.js*',original)
    pg.goto(BASE+'/courses/nbe-e4210/lectures/L00/');pg.locator('#questions-only').wait_for()
    pg.locator('img').evaluate_all("xs=>xs.forEach(i=>i.loading='eager')")
    pg.wait_for_function('Array.from(document.images).every(i=>i.complete)')
    pg.locator('#questions-only').scroll_into_view_if_needed()
    dom.append(pg.locator('.page-inner').inner_html())
    pixels.append(hashlib.sha256(pg.screenshot(path=str(OUT/f'E4210-{width}-{theme}-{baseline}.png'))).hexdigest())
    ctx.close()
   assert dom[0]==dom[1],(theme,width,'E4210 DOM changed')
   assert pixels[0]==pixels[1],(theme,width,'E4210 pixels changed')
   isolation.append({'width':width,'theme':theme,'identicalDOM':True,'identicalPixels':True})
 browser.close()
(OUT/'results.json').write_text(json.dumps({'sections':audit,'screenshots':shots,'isolation':isolation,'pageErrors':errors},indent=2))
print('PASS: L01 progression, wrong/correct feedback, keyboard, reload/deduplication, 30 drills, optional work, mocks; 136 L01 screenshots; E4210 DOM/pixel isolation in 8 combinations.')
