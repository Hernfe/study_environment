"""L02 conservative revision smoke; run against local Vite with Playwright."""
import json, os
from pathlib import Path
from playwright.sync_api import sync_playwright
out=Path('/work/.codex-revision/L02-browser');out.mkdir(exist_ok=True)
with sync_playwright() as p:
 browser=p.chromium.launch(headless=True,executable_path=os.environ['PLAYWRIGHT_CHROMIUM_EXECUTABLE'])
 page=browser.new_page(viewport={'width':1280,'height':1000});errors=[]
 page.on('pageerror',lambda e:errors.append(str(e)))
 page.goto('http://127.0.0.1:5173/courses/nbe-e4120/lectures/L02/')
 page.locator('#calcium').wait_for()
 assert page.locator('.section > article.question').count()==49
 extras=page.locator('details.extra-practice');assert extras.count()==2
 assert extras.locator('article.question').count()==5
 assert extras.evaluate_all('xs=>xs.every(e=>!e.open)')
 extra=page.locator('#charge > details.extra-practice')
 assert extra.locator('article.question').count()==4
 assert not extra.locator('input').first.is_visible()
 extra.locator(':scope > summary').focus();page.keyboard.press('Enter')
 assert extra.locator('input').first.is_visible()
 q=extra.locator('article.question').first
 # Obtain authored values, exercise actual staged controls, preserve saved result/hints.
 content=page.evaluate("async()=> (await import('/content/nbe-e4120/L02.js')).default")
 authored=next(x for x in content['lectureQuiz'] if x['id']=='L02-direct-sphere')
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
 page.wait_for_function("JSON.parse(localStorage.getItem('nbe:nbe-e4120:progress:L02')).questions['L02-direct-sphere'].hints.includes(2)")
 before=page.evaluate("localStorage.getItem('nbe:nbe-e4120:progress:L02')")
 extra.locator(':scope > summary').focus();page.keyboard.press('Space')
 assert not extra.locator('input').first.is_visible()
 page.reload();page.locator('#calcium').wait_for()
 assert page.evaluate("localStorage.getItem('nbe:nbe-e4120:progress:L02')")==before
 assert not extra.evaluate('(e)=>e.open')
 extra.locator(':scope > summary').focus();page.keyboard.press('Enter')
 assert q.locator('input').first.input_value()!=''
 extra.locator(':scope > summary').click()
 result=page.evaluate('''async()=>{
 const {default:c}=await import('/content/nbe-e4120/L02.js');
 const {buildReviewQueue}=await import('/js/review.js');
 const {pruneLectureProgress}=await import('/js/progress.js');
 const lectures=[{id:'L02',questions:c.lectureQuiz}];
 return {fresh:buildReviewQueue(lectures,()=>({questions:{}})).length,
 saved:buildReviewQueue(lectures).length,removed:pruneLectureProgress('L02',c)};
 }''')
 assert result=={'fresh':49,'saved':50,'removed':0},result
 symbol=page.locator('#L02-f-nernst [role=button]').first
 symbol.focus();page.keyboard.press('ArrowRight')
 assert page.locator('#L02-f-nernst .symbol-description').inner_text()
 assert page.locator('.page-inner > .section:not(.mock-exams)').evaluate_all('''xs=>xs.length===22&&xs.every(s=>{
 const body=s.querySelector('.concept-body');
 const practice=s.querySelector('.formula-explorer,.concept-quiz,article.question');
 return body&&body.querySelectorAll('p').length>=2&&!body.closest('details')&&
 Boolean(body.compareDocumentPosition(practice)&Node.DOCUMENT_POSITION_FOLLOWING);
 })''')
 assert page.locator('#mock-exams > div').count()==3
 mock=page.locator('#mock-exams > div').first
 mock.get_by_role('button',name='Start real-exam practice',exact=True).click()
 for i in range(5):mock.locator('textarea').nth(i).fill(f'L02 response {i+1}')
 page.reload();page.locator('#calcium').wait_for()
 assert mock.locator('textarea').nth(4).input_value()=='L02 response 5'
 mock.get_by_role('button',name='Submit attempt',exact=True).click()
 page.reload();page.locator('#calcium').wait_for()
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
 (out/'results.json').write_text(json.dumps({'core':49,'optional':5,'sections':22,'review':result,'screenshots':len(captures),'errors':errors},indent=2))
 browser.close()
print('PASS: L02 49 core/5 optional, keyboard toggles, staged answers/hints/reload/review, formula keyboard, theory before practice, mock draft/submission persistence, images/KaTeX, 176 responsive/theme captures.')
