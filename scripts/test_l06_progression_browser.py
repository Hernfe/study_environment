"""L06 conservative revision smoke; run against local Vite with Playwright."""
import json, os
from pathlib import Path
from playwright.sync_api import sync_playwright
out=Path('/work/.codex-progression/L06/browser');out.mkdir(exist_ok=True)
with sync_playwright() as p:
 browser=p.chromium.launch(headless=True,executable_path=os.environ['PLAYWRIGHT_CHROMIUM_EXECUTABLE'])
 page=browser.new_page(viewport={'width':1280,'height':1000});errors=[]
 page.on('pageerror',lambda e:errors.append(str(e)))
 page.goto('http://127.0.0.1:5173/courses/nbe-e4120/lectures/L06/')
 page.locator('#overview').wait_for()
 # Actual DOM: theory and formula explorers precede the two easy MCQs in every section.
 audit=page.locator('.page-inner > .section:not(.mock-exams)').evaluate_all('''xs=>xs.map(s=>{
 const cq=s.querySelector('.concept-quiz');const after=(a,b)=>!!(a.compareDocumentPosition(b)&Node.DOCUMENT_POSITION_FOLLOWING);
 const first=s.querySelector('.concept-quiz article,.formula-drill,article.question');
 return {id:s.id,firstIsMCQ:!!first.closest('.concept-quiz'),count:cq.querySelectorAll('article').length,
 theoryFirst:after(s.querySelector('.concept-body'),cq),formulaFirst:[...s.querySelectorAll('.formula-explorer')].every(f=>after(f,cq)),
 drillsLater:[...s.querySelectorAll('.formula-drill')].every(f=>after(cq,f)),noGate:!s.querySelector(':scope > article.question')||[...s.querySelectorAll(':scope > article button')].some(b=>!b.disabled)};
 })''')
 assert len(audit)==22 and all(r['count']==2 and all(r[k] for k in ['firstIsMCQ','theoryFirst','formulaFirst','drillsLater','noGate']) for r in audit),audit
 assert page.locator('.concept-quiz article').count()==44
 assert page.locator('.formula-drill').count()==20
 first=page.locator('article[aria-labelledby="cq-L06-overview-check"]')
 new=page.locator('article[aria-labelledby="cq-L06-overview-starter"]')
 for card,wrong,right in [(first,'The constant-field model with fixed permeability','The gate model with a dynamic state variable'),(new,'The rate of switching between channel states','The current carried by ions through the pore')]:
  assert card.locator('.option-feedback,details').count()==0
  order=card.locator('.option').all_text_contents()
  card.get_by_role('button',name=wrong,exact=True).focus();page.keyboard.press('Enter')
  card.get_by_role('button',name='Check',exact=True).focus();page.keyboard.press('Enter')
  assert 'Not quite.' in card.inner_text()
  assert card.locator('.option-feedback').count()==len(order)
  saved=page.evaluate("localStorage.getItem('nbe:nbe-e4120:progress:L06')")
  page.reload();page.locator('#overview').wait_for()
  assert page.evaluate("localStorage.getItem('nbe:nbe-e4120:progress:L06')")==saved
  assert card.locator('.option').evaluate_all('xs=>xs.map(x=>x.firstChild.textContent)')==order
  assert card.locator('.option-feedback').count()==len(order)
  card.get_by_role('button',name='Try again',exact=True).click()
  card.get_by_role('button',name=right,exact=True).click();card.get_by_role('button',name='Check',exact=True).click()
  assert 'Correct.' in card.inner_text()
 assert page.evaluate("JSON.parse(localStorage.getItem('nbe:nbe-e4120:progress:L06')).concept['L06-overview-check'].attempts")==2
 assert page.evaluate("JSON.parse(localStorage.getItem('nbe:nbe-e4120:progress:L06')).concept['L06-overview-starter'].attempts")==2
 for theme in ['light','dark']:
  page.emulate_media(color_scheme=theme)
  for width in [380,768,1280,1920]:
   page.set_viewport_size({'width':width,'height':1000});new.scroll_into_view_if_needed()
   page.screenshot(path=str(out/f'starter-feedback-{width}-{theme}.png'))
 assert page.locator('.section > article.question').count()==63
 extras=page.locator('details.extra-practice');assert extras.count()==6
 assert extras.locator('article.question').count()==8
 assert extras.evaluate_all('xs=>xs.every(e=>!e.open)')
 extra=page.locator('#kinetics > details.extra-practice')
 assert extra.locator('article.question').count()==1
 assert not extra.locator('input').first.is_visible()
 extra.locator(':scope > summary').focus();page.keyboard.press('Enter')
 assert extra.locator('input').first.is_visible()
 q=extra.locator('article.question').first
 # Obtain authored values, exercise actual staged controls, preserve saved result/hints.
 content=page.evaluate("async()=> (await import('/content/nbe-e4120/L06.js')).default")
 authored=next(x for x in content['lectureQuiz'] if x['id']=='L06-direct-tau')
 fields=q.locator('input');idx=0
 for i,stage in enumerate(authored['stages']):
  for field in stage.get('fields',[]):
   fields.nth(idx).fill(str(field['answer']['value']));idx+=1
  if 'answer' in stage:
   fields.nth(idx).fill(str(stage['answer']['value']));idx+=1
  if 'choices' in stage:q.locator('select').select_option(str(stage['correct']))
  q.get_by_role('button',name='Check stage',exact=True).nth(i).click()
 assert 'Correct.' in q.inner_text()
 q.get_by_text('Hint 2',exact=True).click()
 page.wait_for_function("JSON.parse(localStorage.getItem('nbe:nbe-e4120:progress:L06')).questions['L06-direct-tau'].hints.includes(2)")
 before=page.evaluate("localStorage.getItem('nbe:nbe-e4120:progress:L06')")
 extra.locator(':scope > summary').focus();page.keyboard.press('Space')
 assert not extra.locator('input').first.is_visible()
 page.reload();page.locator('#overview').wait_for()
 assert page.evaluate("localStorage.getItem('nbe:nbe-e4120:progress:L06')")==before
 assert not extra.evaluate('(e)=>e.open')
 extra.locator(':scope > summary').focus();page.keyboard.press('Enter')
 assert q.locator('input').first.input_value()!=''
 extra.locator(':scope > summary').click()
 result=page.evaluate('''async()=>{
 const {default:c}=await import('/content/nbe-e4120/L06.js');
 const {buildReviewQueue}=await import('/js/review.js');
 const {pruneLectureProgress}=await import('/js/progress.js');
 const lectures=[{id:'L06',questions:c.lectureQuiz}];
 return {fresh:buildReviewQueue(lectures,()=>({questions:{}})).length,
 saved:buildReviewQueue(lectures).length,removed:pruneLectureProgress('L06',c)};
 }''')
 assert result=={'fresh':63,'saved':64,'removed':0},result
 symbol=page.locator('#L06-f-tau [role=button]').first
 symbol.focus();page.keyboard.press('ArrowRight')
 assert page.locator('#L06-f-tau .symbol-description').inner_text()
 assert page.locator('.page-inner > .section:not(.mock-exams)').evaluate_all('''xs=>xs.length===22&&xs.every(s=>{
 const body=s.querySelector('.concept-body');
 const practice=s.querySelector('.formula-explorer,.concept-quiz,article.question');
 return body&&body.querySelectorAll('p').length>=2&&!body.closest('details')&&
 Boolean(body.compareDocumentPosition(practice)&Node.DOCUMENT_POSITION_FOLLOWING);
 })''')
 assert page.locator('#mock-exams > div').count()==3
 mock=page.locator('#mock-exams > div').first
 mock.get_by_role('button',name='Start real-exam practice',exact=True).click()
 for i in range(5):mock.locator('textarea').nth(i).fill(f'L06 response {i+1}')
 page.reload();page.locator('#overview').wait_for()
 assert mock.locator('textarea').nth(4).input_value()=='L06 response 5'
 mock.get_by_role('button',name='Submit attempt',exact=True).click()
 page.reload();page.locator('#overview').wait_for()
 assert mock.locator('textarea[readonly]').count()==5
 page.locator('img').evaluate_all("xs=>xs.forEach(i=>i.loading='eager')")
 page.wait_for_function('Array.from(document.images).every(i=>i.complete&&i.naturalWidth>0)')
 page.locator('img').evaluate_all('async xs=>Promise.all(xs.map(i=>i.decode()))')
 assert page.locator('.katex-error').count()==0
 page.add_style_tag(content='html {scroll-behavior:auto!important}')
 captures=[]
 for theme in ['light','dark']:
  page.emulate_media(color_scheme=theme)
  for width in [380,768,1280,1920]:
   page.set_viewport_size({'width':width,'height':1000})
   assert page.evaluate('document.documentElement.scrollWidth<=innerWidth'),(theme,width)
   for section in page.locator('.page-inner > .section:not(.mock-exams)').all():
    sid=section.get_attribute('id');page.evaluate('(id)=>document.getElementById(id).scrollIntoView()',sid)
    page.evaluate('()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)))')
    path=out/f'{sid}-{width}-{theme}.png';page.screenshot(path=str(path));captures.append(str(path))
 for width in [380,1280]:
  page.set_viewport_size({'width':width,'height':1000})
  extra.locator(':scope > summary').focus();page.keyboard.press('Enter')
  assert extra.locator('input').first.is_visible()
  extra.locator(':scope > summary').focus();page.keyboard.press('Space')
  assert not extra.locator('input').first.is_visible()
 assert not errors,errors
 (out/'results.json').write_text(json.dumps({'core':63,'optional':8,'sections':22,'review':result,'screenshots':len(captures),'errors':errors},indent=2))
 browser.close()
print('PASS: L06 progression, feedback, keyboard, saved numeric/hints/review/mock progress, images, and responsive themes.')
