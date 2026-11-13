"""Exact E4210 DOM/pixels with original dirty-tree shared modules versus current."""
from pathlib import Path
import hashlib,json
from playwright.sync_api import sync_playwright
out=Path('/work/.codex-progression/final-mocks/isolation');out.mkdir(exist_ok=True)
results=[]
with sync_playwright() as p:
 browser=p.chromium.launch(headless=True,executable_path='/work/.codex-revision/browsers/chromium_headless_shell-1248/chrome-headless-shell-linux64/chrome-headless-shell')
 for path,selector in [('','header'),('lectures/L00/','#mock-exams')]:
  for theme in ['light','dark']:
   for width in [380,768,1280,1920]:
    captures=[];doms=[]
    for old in [True,False]:
     context=browser.new_context(viewport={'width':width,'height':1000},color_scheme=theme)
     context.add_init_script('Math.random=()=>0.42')
     page=context.new_page()
     if old:
      for module in ['mockExam','courseHome']:
       def intercept(route,request,module=module):
        response=route.fetch();route.fulfill(response=response,body=('import.meta.env = {DEV: true};\n' if module=='courseHome' else '')+Path(f'/work/.codex-progression/final-mocks/{module}.before.js').read_text())
       page.route(f'**/js/{module}.js*',intercept)
     page.goto('http://127.0.0.1:5173/courses/nbe-e4210/'+path)
     page.locator(selector).wait_for()
     if path:
      page.locator('#mock-exams').get_by_role('button',name='Start real-exam practice',exact=True).first.click()
     page.locator(selector).evaluate('(e)=>e.scrollIntoView({behavior:"instant"})')
     page.wait_for_timeout(150)
     doms.append(page.locator('.page-inner').inner_html())
     captures.append(hashlib.sha256(page.screenshot(path=str(out/f'{bool(path)}-{theme}-{width}-{old}.png'))).hexdigest())
     context.close()
    assert doms[0]==doms[1],(path,theme,width,'DOM')
    assert captures[0]==captures[1],(path,theme,width,'pixels')
    results.append(dict(path=path,theme=theme,width=width,equal=True))
 browser.close()
(out/'results.json').write_text(json.dumps(results,indent=2))
print('PASS: E4210 homepage and default exam runner match original shared modules in DOM and pixels, 16 width/theme/page combinations')
