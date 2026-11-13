"""L09 browser regression: optional access, stored work, theory, mocks and layouts."""
import json,os
from pathlib import Path
from playwright.sync_api import sync_playwright,expect
out=Path('/work/.codex-progression/L09/browser');out.mkdir(exist_ok=True)
with sync_playwright() as p:
 browser=p.chromium.launch(headless=True,executable_path='/work/.codex-revision/browsers/chromium_headless_shell-1248/chrome-headless-shell-linux64/chrome-headless-shell')
 page=browser.new_page(viewport={'width':1280,'height':1000});errors=[]
 page.on('pageerror',lambda e:errors.append(str(e)))
 page.goto('http://127.0.0.1:5173/courses/nbe-e4120/lectures/L09/')
 page.locator('#screen').wait_for()
 # Every section starts practice with the retained and complementary easy MCQs.
 audit=page.locator('.page-inner > .section:not(.mock-exams)').evaluate_all("""xs=>xs.map(s=>{
 const cq=s.querySelector('.concept-quiz');const after=(a,b)=>!!(a.compareDocumentPosition(b)&Node.DOCUMENT_POSITION_FOLLOWING);
 const first=s.querySelector('.concept-quiz article,.formula-drill,article.question');
 return {id:s.id,firstIsMCQ:!!first.closest('.concept-quiz'),count:cq.querySelectorAll('article').length,
 theoryFirst:after(s.querySelector('.concept-body'),cq),formulaFirst:[...s.querySelectorAll('.formula-explorer')].every(f=>after(f,cq)),
 drillsLater:[...s.querySelectorAll('.formula-drill')].every(f=>after(cq,f)),noGate:!s.querySelector(':scope > article.question')||[...s.querySelectorAll(':scope > article button')].some(b=>!b.disabled)};
 })""")
 assert len(audit)==34 and all(r['count']==2 and all(r[k] for k in ['firstIsMCQ','theoryFirst','formulaFirst','drillsLater','noGate']) for r in audit),audit
 assert page.locator('.concept-quiz article').count()==68
 assert page.locator('.formula-drill').count()==12
 first=page.locator('article[aria-labelledby="cq-L09-overview-check"]')
 new=page.locator('article[aria-labelledby="cq-L09-overview-starter"]')
 for card,wrong,right in [(first,'Ion pumping against its electrochemical gradient','Ion passage down its electrochemical gradient'),(new,'Determine which ions fit best','Control when ions can pass')]:
  assert card.locator('.option-feedback,details').count()==0
  order=card.locator('.option').all_text_contents()
  card.get_by_role('button',name=wrong,exact=True).focus();page.keyboard.press('Enter')
  card.get_by_role('button',name='Check',exact=True).focus();page.keyboard.press('Enter')
  assert 'Not quite.' in card.inner_text()
  assert card.locator('.option-feedback').count()==len(order)
  saved=page.evaluate("localStorage.getItem('nbe:nbe-e4120:progress:L09')")
  page.reload();page.locator('#overview').wait_for()
  assert page.evaluate("localStorage.getItem('nbe:nbe-e4120:progress:L09')")==saved
  assert card.locator('.option').evaluate_all('xs=>xs.map(x=>x.firstChild.textContent)')==order
  assert card.locator('.option-feedback').count()==len(order)
  card.get_by_role('button',name='Try again',exact=True).click()
  card.get_by_role('button',name=right,exact=True).click();card.get_by_role('button',name='Check',exact=True).click()
  assert 'Correct.' in card.inner_text()
 assert page.evaluate("JSON.parse(localStorage.getItem('nbe:nbe-e4120:progress:L09')).concept['L09-overview-check'].attempts")==2
 assert page.evaluate("JSON.parse(localStorage.getItem('nbe:nbe-e4120:progress:L09')).concept['L09-overview-starter'].attempts")==2
 for theme in ['light','dark']:
  page.emulate_media(color_scheme=theme)
  for width in [380,768,1280,1920]:
   page.set_viewport_size({'width':width,'height':1000});new.scroll_into_view_if_needed()
   page.screenshot(path=str(out/f'starter-feedback-{width}-{theme}.png'))
 (out/'progression-dom.json').write_text(json.dumps(audit,indent=2))
 assert page.locator('.section > article.question').count()==97
 extras=page.locator('details.extra-practice')
 assert extras.locator('article.question').count()==14
 assert extras.evaluate_all('xs=>xs.every(e=>!e.open)')
 extra=page.locator('#screen > details.extra-practice');q=extra.locator('article.question').first
 expect(q.locator('input').first).to_be_hidden()
 extra.locator(':scope > summary').focus();page.keyboard.press('Enter')
 expect(q.locator('input').first).to_be_visible()
 c=page.evaluate("async()=> (await import('/content/nbe-e4120/L09.js')).default")
 authored=next(x for x in c['lectureQuiz'] if x['id']=='L09-direct-remaining')
 idx=0
 for i,stage in enumerate(authored['stages']):
  for field in stage.get('fields',[]):
   q.locator('input').nth(idx).fill(str(field['answer']['value']));idx+=1
  if 'answer' in stage:q.locator('input').nth(idx).fill(str(stage['answer']['value']));idx+=1
  if 'choices' in stage:q.locator('select').select_option(str(stage['correct']))
  q.get_by_role('button',name='Check stage',exact=True).nth(i).click()
 assert 'Correct.' in q.inner_text()
 q.get_by_text('Hint 2',exact=True).click()
 page.wait_for_function("JSON.parse(localStorage.getItem('nbe:nbe-e4120:progress:L09')).questions['L09-direct-remaining'].hints.includes(2)")
 before=page.evaluate("localStorage.getItem('nbe:nbe-e4120:progress:L09')")
 extra.locator(':scope > summary').focus();page.keyboard.press('Space')
 page.reload();page.locator('#screen').wait_for()
 assert page.evaluate("localStorage.getItem('nbe:nbe-e4120:progress:L09')")==before
 assert not extra.evaluate('(e)=>e.open')
 extra.locator(':scope > summary').focus();page.keyboard.press('Enter')
 assert q.locator('input').first.input_value()!=''
 extra.locator(':scope > summary').click()
 result=page.evaluate('''async()=>{
 const {default:c}=await import('/content/nbe-e4120/L09.js');
 const {buildReviewQueue}=await import('/js/review.js');
 const {pruneLectureProgress}=await import('/js/progress.js');
 const ls=[{id:'L09',questions:c.lectureQuiz}];
 return {fresh:buildReviewQueue(ls,()=>({questions:{}})).length,saved:buildReviewQueue(ls).length,removed:pruneLectureProgress('L09',c)};
 }''')
 assert result=={'fresh':97,'saved':98,'removed':0},result
 assert page.locator('.page-inner > .section:not(.mock-exams)').evaluate_all('''xs=>xs.length===34&&xs.every(s=>{
 const b=s.querySelector('.concept-body'),q=s.querySelector('.formula-explorer,.concept-quiz,article.question');
 return b&&b.querySelectorAll('p').length>=2&&!b.closest('details')&&Boolean(b.compareDocumentPosition(q)&Node.DOCUMENT_POSITION_FOLLOWING);
 })''')
 symbol=page.locator('.formula-explorer [role=button]').first
 symbol.focus();page.keyboard.press('ArrowRight')
 assert page.locator('.symbol-description').first.inner_text()
 assert page.locator('#mock-exams > div').count()==3
 mock=page.locator('#mock-exams > div').first
 mock.get_by_role('button',name='Start real-exam practice',exact=True).click()
 for i in range(5):mock.locator('textarea').nth(i).fill(f'L09 response {i+1}')
 page.reload();page.locator('#screen').wait_for()
 assert mock.locator('textarea').nth(4).input_value()=='L09 response 5'
 mock.get_by_role('button',name='Submit attempt',exact=True).click()
 page.reload();page.locator('#screen').wait_for()
 assert mock.locator('textarea[readonly]').count()==5
 page.locator('img').evaluate_all("xs=>xs.forEach(i=>i.loading='eager')")
 page.wait_for_function('Array.from(document.images).every(i=>i.complete&&i.naturalWidth>0)')
 assert page.locator('.katex-error').count()==0
 for fid,value in [('L09-f-binomial','0.4096'),('L09-f-poisson','0.049787068367863944')]:
  drill=page.locator(f'.formula-drill[data-formula="{fid}"]')
  drill.locator('input').last.fill(value)
  drill.get_by_role('button',name='Check drill',exact=True).click()
  assert 'Correct' in drill.inner_text()
 page.add_style_tag(content='html {scroll-behavior:auto!important}')
 captures=[]
 for theme in ['light','dark']:
  page.emulate_media(color_scheme=theme)
  for width in [380,768,1280,1920]:
   page.set_viewport_size({'width':width,'height':1000})
   assert page.evaluate('document.documentElement.scrollWidth<=innerWidth'),(theme,width)
   for section in page.locator('.page-inner > .section:not(.mock-exams)').all():
    sid=section.get_attribute('id');page.evaluate('(id)=>window.scrollTo({top:document.getElementById(id).getBoundingClientRect().top+window.scrollY,behavior:"instant"})',sid)
    page.wait_for_timeout(80)
    path=out/f'{sid}-{width}-{theme}.png';page.screenshot(path=str(path));captures.append(str(path))
 assert not errors,errors
 (out/'results.json').write_text(json.dumps({'core':97,'optional':14,'sections':34,'review':result,'screenshots':len(captures),'errors':errors},indent=2))
 browser.close()
print('PASS: L09 97 core/14 optional; keyboard toggles, staged answers/hints/reload/review, formula keyboard, visible theory, mock persistence, images/KaTeX, 272 responsive/theme captures.')
