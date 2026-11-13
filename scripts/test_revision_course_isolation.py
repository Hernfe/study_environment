"""Compare E4210 with/without this revision's renderer/review changes in browser."""
import hashlib,json,os
from pathlib import Path
from playwright.sync_api import sync_playwright
out=Path('/work/.codex-revision/isolation');out.mkdir(exist_ok=True)
old_group="""...['easy', 'medium', 'hard'].flatMap((tier) => {
      const group = questions.filter((q) => q.sectionId === section.id && q.difficulty === tier);
      return group.length ? [el('h3', {}, `${tier[0].toUpperCase()}${tier.slice(1)} practice`), ...group.map((q) => renderQuestion(q, { lectureId }))] : [];
    }),"""
new_group="...renderSectionPractice(questions.filter((q) => q.sectionId === section.id), (q) => renderQuestion(q, { lectureId })),"
results=[]
with sync_playwright() as p:
 options={'executable_path':os.environ['PLAYWRIGHT_CHROMIUM_EXECUTABLE']} if os.environ.get('PLAYWRIGHT_CHROMIUM_EXECUTABLE') else {}
 browser=p.chromium.launch(**options)
 for theme in ['light','dark']:
  for width in [380,1280]:
   images=[];dom=[]
   for baseline in [False,True]:
    context=browser.new_context(viewport={'width':width,'height':1000},color_scheme=theme)
    # Existing order questions shuffle randomly; hold that unrelated input fixed.
    context.add_init_script('Math.random = () => 0.42')
    page=context.new_page()
    if baseline:
     def original_renderer(route):
      response=route.fetch();body=response.text()
      assert new_group in body
      body=body.replace(new_group,old_group)
      body='\n'.join(line for line in body.splitlines() if 'import { renderSectionPractice }' not in line)
      route.fulfill(response=response,body=body)
     page.route('**/js/render.js*',original_renderer)
    page.goto('http://127.0.0.1:5173/courses/nbe-e4210/lectures/L00/')
    page.locator('#questions-only').wait_for()
    page.locator('#questions-only').scroll_into_view_if_needed()
    page.locator('img').evaluate_all("xs=>xs.forEach(i=>i.loading='eager')")
    page.wait_for_function('Array.from(document.images).every(i=>i.complete)')
    image=page.screenshot(path=str(out/f'{width}-{theme}-{baseline}.png'))
    images.append(hashlib.sha256(image).hexdigest())
    dom.append(page.locator('.page-inner').inner_html())
    assert page.locator('#questions-only-no-figure > .question').count()==1
    context.close()
   if dom[0]!=dom[1]:
    import difflib
    (out/'dom-diff.txt').write_text('\n'.join(difflib.unified_diff(dom[0].splitlines(),dom[1].splitlines())))
   assert dom[0]==dom[1],(theme,width,'DOM differs')
   assert images[0]==images[1],(theme,width,'pixels differ')
   results.append({'theme':theme,'width':width,'identicalDOM':True,'identicalPixels':True})
 browser.close()
(out/'results.json').write_text(json.dumps(results,indent=2))
print('PASS: E4210 L00 DOM and viewport screenshots identical with original/revised renderer, 380/1280 light/dark. Existing no-figure fixture has one calculation in both versions.')
