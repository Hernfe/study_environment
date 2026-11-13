"""Actual cumulative exam browser acceptance; writes evidence only beneath /work."""
import json,os
from pathlib import Path
from playwright.sync_api import sync_playwright,expect
out=Path('/work/.codex-progression/final-mocks/browser');out.mkdir(exist_ok=True)
base=os.environ.get('MOCK_BASE_URL','http://127.0.0.1:5173')
with sync_playwright() as p:
 browser=p.chromium.launch(headless=True,executable_path='/work/.codex-revision/browsers/chromium_headless_shell-1248/chrome-headless-shell-linux64/chrome-headless-shell')
 page=browser.new_page(viewport={'width':1280,'height':1000});errors=[]
 page.on('pageerror',lambda e:errors.append(str(e)))
 page.goto(base+'/courses/nbe-e4120/');page.locator('.final-mock').first.wait_for()
 exams=page.evaluate("async()=> (await import('/content/nbe-e4120/final-mocks.js')).fullCourseMocks") if ':5173' in base else json.loads(Path('/work/.codex-progression/final-mocks/exams.json').read_text())
 assert page.locator('.final-mock').count()==5
 assert page.locator('nav[aria-label="Full-course mock exam links"] a').count()==5
 for a in page.locator('nav[aria-label="Full-course mock exam links"] a').all():
  target=a.get_attribute('href');assert page.locator(target).count()==1
 for theme in ['light','dark']:
  page.emulate_media(color_scheme=theme)
  for width in [380,768,1280,1920]:
   page.set_viewport_size({'width':width,'height':1000})
   page.locator('nav[aria-label="Full-course mock exam links"]').evaluate('(e)=>e.scrollIntoView({behavior:"instant"})')
   page.screenshot(path=str(out/f'home-{width}-{theme}.png'))
   assert page.evaluate('document.documentElement.scrollWidth<=innerWidth+1')
 for n,exam in enumerate(exams):
  card=page.locator('#'+exam['id'])
  card.get_by_role('button',name='Start real-exam practice',exact=True).focus();page.keyboard.press('Enter')
  assert card.locator('textarea').count()==5
  assert card.locator('.progressive-hints,.written-practice,.checked-stages').count()==0
  card.get_by_role('button',name='Submit attempt',exact=True).click()
  assert 'Still unanswered: 1, 2, 3, 4, 5' in card.inner_text()
  for i in range(5):card.locator('textarea').nth(i).fill(f'Exam {n+1}, response {i+1}: working and sketch recorded on paper.')
  page.reload();page.locator('.final-mock').first.wait_for()
  assert card.locator('textarea').nth(4).input_value()==f'Exam {n+1}, response 5: working and sketch recorded on paper.'
  # Another cumulative exam remains untouched.
  if n<4:assert page.locator('#'+exams[n+1]['id']).get_by_role('button',name='Start real-exam practice',exact=True).count()==1
  for theme in ['light','dark']:
   page.emulate_media(color_scheme=theme)
   for width in [380,768,1280,1920]:
    page.set_viewport_size({'width':width,'height':1000});card.evaluate('(e)=>e.scrollIntoView({behavior:"instant"})')
    page.screenshot(path=str(out/f'exam-{n+1}-{width}-{theme}.png'))
    assert page.evaluate('document.documentElement.scrollWidth<=innerWidth+1')
  card.get_by_role('button',name='Submit attempt',exact=True).click()
  assert card.locator('textarea[readonly]').count()==5
  assert card.locator('.checked-stages').count()==2
  reviews=card.locator('.written-practice')
  assert reviews.count()==3
  for review in reviews.all():
   expect(review.locator('textarea')).to_have_value(__import__('re').compile(f'Exam {n+1}'))
   review.locator('summary').click()
   review.locator('input[type=checkbox]').first.check()
   review.get_by_role('button',name='Record self-review',exact=True).click()
   for box in review.locator('input[type=checkbox]').all():box.check()
   review.get_by_role('button',name='Record self-review',exact=True).click()
  for j,q in enumerate([q for q in exam['questions'] if q['type']=='multiStepCalc']):
   numeric=card.locator('.checked-stages').nth(j)
   # Wrong answer earns no numeric stage credit; downstream values remain independent.
   numeric.locator('input').first.fill('99999')
   numeric.get_by_role('button',name='Check stage',exact=True).first.click()
   assert 'Not quite.' in numeric.inner_text()
   for k,stage in enumerate(q['stages']):
    numeric.locator('input').nth(k).fill(str(stage['answer']['value']))
    numeric.get_by_role('button',name='Check stage',exact=True).nth(k).focus();page.keyboard.press('Enter')
   details=card.get_by_text(f'Question {j+3}: full worked model and method checklist',exact=True).locator('..')
   details.locator('summary').click()
   for box in details.locator('input[type=checkbox]').all():box.check()
  assert 'Practice mark: 50 / 50' in card.inner_text(),card.inner_text()[-1800:]
  page.reload();page.locator('.final-mock').first.wait_for()
  assert 'Practice mark: 50 / 50' in card.inner_text()
  assert card.locator('input[type=checkbox]:checked').count()==23
  model=card.get_by_text('Question 3: full worked model and method checklist',exact=True).locator('..')
  model.locator('summary').click()
  for theme in ['light','dark']:
   page.emulate_media(color_scheme=theme)
   for width in [380,768,1280,1920]:
    page.set_viewport_size({'width':width,'height':1000});model.evaluate('(e)=>e.scrollIntoView({behavior:"instant"})')
    page.screenshot(path=str(out/f'model-{n+1}-{width}-{theme}.png'))
    equation=model.locator('.math-display').first
    assert equation.get_attribute('tabindex')=='0'
    equation.focus()
    if equation.evaluate('(e)=>e.scrollWidth>e.clientWidth+1'):
     equation.evaluate('(e)=>e.scrollLeft=0');page.keyboard.press('ArrowRight');page.wait_for_timeout(120)
     assert equation.evaluate('(e)=>e.scrollLeft>0')
    assert page.evaluate('document.documentElement.scrollWidth<=innerWidth+1')
    page.set_viewport_size({'width':width,'height':1000});card.locator('.notice').last.evaluate('(e)=>e.scrollIntoView({behavior:"instant"})')
    page.screenshot(path=str(out/f'review-{n+1}-{width}-{theme}.png'))
    assert page.evaluate('document.documentElement.scrollWidth<=innerWidth+1')
  card.get_by_role('button',name='Start a new attempt',exact=True).click()
  assert '1 saved previous attempts' in card.inner_text()
  page.reload();page.locator('.final-mock').first.wait_for()
  assert '1 saved previous attempts' in card.inner_text()
  card.get_by_role('button',name='Start with hints and checks',exact=True).click()
  assert card.locator('.progressive-hints').count()==5
  assert card.locator('textarea').first.input_value()==''
  # History has all original submitted answers and score. No lecture-mock keys collide.
  saved=page.evaluate('(id)=>JSON.parse(localStorage.getItem("nbe:nbe-e4120:practice:mock:FULL-L01-L09:"+id))',exam['id'])
  assert saved['history'][0]['mark']==50 and len(saved['history'][0]['answers'])==5
 assert page.evaluate('Object.keys(localStorage).every(k=>!k.includes("mock:L0"))')
 assert page.locator('.katex-error').count()==0
 ids=page.locator('[id]').evaluate_all('xs=>xs.map(x=>x.id)');assert len(ids)==len(set(ids))
 assert not errors,errors
 # E4210 home remains free of cumulative content; preserved lecture mocks keep default rendering.
 page.goto(base+'/courses/nbe-e4210/');page.locator('.course-map').wait_for()
 assert page.locator('.mock-exams').count()==0
 page.goto(base+'/courses/nbe-e4120/lectures/L01/');page.locator('#mock-exams').wait_for()
 assert page.locator('#mock-exams h3').count()==3
 page.locator('#mock-exams').get_by_role('button',name='Start real-exam practice',exact=True).first.click()
 assert page.locator('#mock-exams textarea').count()==5
 assert 'Practice mark:' not in page.locator('#mock-exams').inner_text()
 assert not errors,errors
 (out/'results.json').write_text(json.dumps({'exams':5,'questions':25,'numericStages':45,'screenshots':128,'widths':[380,768,1280,1920],'themes':['light','dark'],'errors':errors,'base':base},indent=2))
 browser.close()
print('PASS: five exams, draft/submission/stage/method/self-review/score/history restoration, keyboard, responsive captures and lecture/E4210 smoke')
