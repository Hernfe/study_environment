"""Run against npm run dev. Local Playwright Python package and browser required."""
import json, os
from pathlib import Path
from playwright.sync_api import sync_playwright

out=Path('/work/.codex-revision/browser');out.mkdir(parents=True,exist_ok=True)
with sync_playwright() as p:
 options={'executable_path':os.environ['PLAYWRIGHT_CHROMIUM_EXECUTABLE']} if os.environ.get('PLAYWRIGHT_CHROMIUM_EXECUTABLE') else {}
 browser=p.chromium.launch(headless=True,**options)
 page=browser.new_page(viewport={'width':1280,'height':1000})
 errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
 url='http://127.0.0.1:5173/courses/nbe-e4120/lectures/L01/'
 page.goto(url);page.locator('#donnan').wait_for()
 extra=page.locator('#combinations > details.extra-practice')
 assert extra.count()==1 and not extra.evaluate('(e)=>e.open')
 assert extra.locator('article.question').count()==6
 assert page.locator('.section > article.question').count()==52
 assert not extra.locator('input').first.is_visible()
 # Native summary toggles by keyboard, and closing never destroys the nodes.
 extra.locator(':scope > summary').focus();page.keyboard.press('Enter')
 assert extra.evaluate('(e)=>e.open')
 q=extra.locator('article.question').first
 q.locator('input').first.fill('4000')
 q.locator('input').nth(1).fill('5000')
 q.get_by_role('button',name='Check stage',exact=True).first.click()
 q.locator('input').nth(2).fill('9')
 q.get_by_role('button',name='Check stage',exact=True).nth(1).click()
 q.locator('select').select_option('0')
 q.get_by_role('button',name='Check stage',exact=True).nth(2).click()
 assert 'Correct.' in q.inner_text()
 q.get_by_text('Hint 2',exact=True).click()
 page.wait_for_function("JSON.parse(localStorage.getItem('nbe:nbe-e4120:progress:L01')).questions['L01-direct-series-r'].hints.includes(2)")
 before=page.evaluate("localStorage.getItem('nbe:nbe-e4120:progress:L01')")
 extra.locator(':scope > summary').focus();page.keyboard.press('Space')
 assert not extra.evaluate('(e)=>e.open')
 page.reload();page.locator('#donnan').wait_for()
 assert page.evaluate("localStorage.getItem('nbe:nbe-e4120:progress:L01')")==before
 assert not extra.evaluate('(e)=>e.open')
 extra.locator(':scope > summary').focus();page.keyboard.press('Enter')
 q=extra.locator('article.question').first
 assert q.locator('input').first.input_value()=='4000'
 assert q.locator('input').nth(2).input_value()=='9'
 # Real review builder excludes untouched extras and keeps existing saved results.
 result=page.evaluate('''async()=>{
 const {default:c}=await import('/content/nbe-e4120/L01.js');
 const {buildReviewQueue}=await import('/js/review.js');
 const {getLectureProgress,pruneLectureProgress}=await import('/js/progress.js');
 const lectures=[{id:'L01',questions:c.lectureQuiz}];
 const fresh=buildReviewQueue(lectures,()=>({questions:{}})).map(e=>e.question.id);
 const saved=buildReviewQueue(lectures).map(e=>e.question.id);
 const removed=pruneLectureProgress('L01',c);
 return {fresh:fresh.length,saved:saved.length,first:saved[0],removed};
 }''')
 assert result=={'fresh':52,'saved':53,'first':'L01-direct-series-r','removed':0},result
 # Formula symbols remain keyboard operable; unit-aware drill still works.
 symbol=page.locator('#L01-f-current [role=button]').first
 symbol.focus();page.keyboard.press('ArrowRight')
 assert 'Duration' in page.locator('#L01-f-current .symbol-description').inner_text()
 page.keyboard.press('ArrowRight')
 assert 'Transferred charge' in page.locator('#L01-f-current .symbol-description').inner_text()
 drill=page.locator('.formula-drill[data-formula=L01-f-current]')
 drill.locator('input').fill('3000 pA');drill.get_by_role('button',name='Check drill',exact=True).click()
 assert 'Correct.' in drill.inner_text()
 assert page.locator('.katex-error').count()==0
 assert page.locator('img').evaluate_all('(xs)=>xs.every(x=>x.complete&&x.naturalWidth>0)')
 # Existing mock attempts keep their independent draft/submission storage.
 mock=page.locator('#mock-exams > div').first
 assert page.locator('#mock-exams > div').count()==3
 mock.get_by_role('button',name='Start real-exam practice',exact=True).click()
 assert mock.get_by_text('Hint 1',exact=True).count()==0
 for i in range(5):
  mock.locator('textarea').nth(i).fill(f'Practice response {i+1}')
 page.reload();page.locator('#donnan').wait_for()
 assert mock.locator('textarea').nth(4).input_value()=='Practice response 5'
 mock.get_by_role('button',name='Submit attempt',exact=True).click()
 assert mock.locator('textarea[readonly]').count()==5
 page.reload();page.locator('#donnan').wait_for()
 assert mock.get_by_text('Submitted. Review your answers below.',exact=True).is_visible()
 assert mock.locator('textarea[readonly]').count()==5
 # Theory and headings stay visible above formula drills and both practice paths.
 assert page.locator('.page-inner > .section:not(.mock-exams)').evaluate_all('''xs=>xs.every(s=>{
 const body=s.querySelector('.concept-body');
 const practice=s.querySelector('.formula-explorer,.concept-quiz,article.question');
 return body&&body.querySelectorAll('p').length>=2&&
 !body.closest('details')&&Boolean(body.compareDocumentPosition(practice)&Node.DOCUMENT_POSITION_FOLLOWING);
 })''')
 if extra.evaluate('(e)=>e.open'):
  extra.locator(':scope > summary').focus();page.keyboard.press('Enter')
 page.add_style_tag(content='html { scroll-behavior: auto !important; }')
 screenshots=[]
 for theme in ([] if os.environ.get('REVISION_INTERACTIONS_ONLY')=='1' else ['light','dark']):
  page.emulate_media(color_scheme=theme)
  for width in [380,768,1280,1920]:
   page.set_viewport_size({'width':width,'height':1000})
   assert page.evaluate('document.documentElement.scrollWidth<=innerWidth'),(theme,width)
   for section in page.locator('.page-inner > .section:not(.mock-exams)').all():
    # Capture the theory and source figure region without an enormous practice image.
    section.scroll_into_view_if_needed()
    page.evaluate('(id)=>document.getElementById(id).scrollIntoView()',section.get_attribute('id'))
    assert 0<=section.locator(':scope > h2').evaluate('(e)=>e.getBoundingClientRect().top')<300
    path=out/f"{section.get_attribute('id')}-{width}-{theme}.png"
    page.screenshot(path=str(path));screenshots.append(str(path))
 for width in [380,1280]:
  page.set_viewport_size({'width':width,'height':1000})
  assert not extra.evaluate('(e)=>e.open')
  extra.locator(':scope > summary').focus();page.keyboard.press('Enter')
  assert extra.locator('input').first.is_visible()
  extra.locator(':scope > summary').focus();page.keyboard.press('Space')
  assert not extra.locator('input').first.is_visible()
 # Check unchanged E4210 DOM path, and ensure even accidental extra flags have no effect.
 page.goto('http://127.0.0.1:5173/courses/nbe-e4210/lectures/L00/');page.locator('#questions-only').wait_for()
 assert page.locator('.extra-practice').count()==0
 assert page.locator('#questions-only .concept-body').count()==0
 assert page.locator('#questions-only .concept-quiz article').count()==6
 assert page.evaluate('''async()=>{const {isExtraPractice}=await import('/js/extraPractice.js');return !isExtraPractice({practice:'extra'});}''')
 assert not errors,errors
 filename='interaction-results.json' if os.environ.get('REVISION_INTERACTIONS_ONLY')=='1' else 'results.json'
 (out/filename).write_text(json.dumps({'review':result,'screenshots':len(screenshots),'errors':errors},indent=2))
 browser.close()
print(f'PASS: L01 Playwright keyboard opt-in, six extras/52 core, staged results/drafts/hints/reload/review, mock persistence, formula symbols/drill units, visible theory, images/KaTeX, {len(screenshots)} viewport/theme captures, E4210 smoke.')
