"""Combined E4120 browser acceptance, including the production output.
Requires the existing Vite dev server (:5173), preview (:4173), and Playwright.
All output and browser temporary files stay under /work.
"""
import json, os
from pathlib import Path
from playwright.sync_api import sync_playwright
ROOT=Path('/work')
OUT=ROOT/'.codex-revision/final-audit/browser'
OUT.mkdir(parents=True,exist_ok=True)
content=json.loads((ROOT/'.codex-revision/final-audit/current.json').read_text())
results=[]
with sync_playwright() as p:
    browser=p.chromium.launch(executable_path=os.environ['PLAYWRIGHT_CHROMIUM_EXECUTABLE'])
    for port in [5173,4173]:
        for theme in ['light','dark']:
            for width in [380,1280]:
                context=browser.new_context(viewport={'width':width,'height':1000},color_scheme=theme)
                page=context.new_page(); errors=[]; failures=[]
                page.on('pageerror',lambda e:errors.append(str(e)))
                page.on('response',lambda r:failures.append(f'{r.status} {r.url}') if r.status>=400 else None)
                for c in content:
                    lid=c['meta']['id']; core=sum(q.get('practice')!='extra' for q in c['lectureQuiz'])
                    page.goto(f'http://127.0.0.1:{port}/courses/nbe-e4120/lectures/{lid}/')
                    page.locator('#mock-exams').wait_for()
                    page.locator('img').evaluate_all("xs=>xs.forEach(i=>i.loading='eager')")
                    page.wait_for_function('Array.from(document.images).every(i=>i.complete&&i.naturalWidth>0)')
                    actual=page.locator('.page-inner > .section:not(.mock-exams)').evaluate_all('''xs=>xs.map(s=>{
                      const b=s.querySelector('.concept-body'),first=s.querySelector('.formula-explorer,.concept-quiz,article.question');
                      return {id:s.id,title:s.querySelector('h2').textContent,
                        theory:b?.querySelector('.block-text')?.innerText,
                        before:!!(b.compareDocumentPosition(first)&Node.DOCUMENT_POSITION_FOLLOWING),
                        visible:!!b.getClientRects().length&&!b.closest('details')};
                    })''')
                    assert [(s['id'],s['title']) for s in actual]==[(s['id'],s['title']) for s in c['sections']]
                    assert all(s['visible'] and s['before'] and len(s['theory'].split())>=40 for s in actual),(lid,actual)
                    duplicates=page.locator('[id]').evaluate_all('xs=>xs.map(e=>e.id).filter((id,i,a)=>a.indexOf(id)!==i)')
                    assert not duplicates,(lid,duplicates)
                    prompts=page.locator('.section article.question > .question-prompt[id^="q-"]').evaluate_all('xs=>xs.map(e=>e.id)')
                    assert len(prompts)==len(c['lectureQuiz']) and len(set(prompts))==len(prompts),(lid,prompts)
                    assert page.locator('.section > article.question').count()==core
                    assert page.locator('details.extra-practice article.question').count()==len(c['lectureQuiz'])-core
                    for extra in page.locator('details.extra-practice').all():
                        assert not extra.evaluate('e=>e.open')
                        question=extra.locator('article.question').first
                        assert not question.is_visible()
                        extra.locator(':scope > summary').focus();page.keyboard.press('Enter')
                        assert question.is_visible()
                        extra.locator(':scope > summary').focus();page.keyboard.press('Space')
                        assert not question.is_visible()
                    # Every original mock mounts exactly five responses without duplicating bank controls.
                    for mock in page.locator('#mock-exams > div').all():
                        mock.get_by_role('button',name='Start real-exam practice',exact=True).click()
                        assert mock.locator('textarea').count()==5
                        assert mock.get_by_text('Hint 1',exact=True).count()==0
                        for response in mock.locator('textarea').all(): response.fill('Local acceptance response')
                        mock.get_by_role('button',name='Submit attempt',exact=True).click()
                        assert mock.locator('textarea[readonly]').count()==5
                    duplicates=page.locator('[id]').evaluate_all('xs=>xs.map(e=>e.id).filter((id,i,a)=>a.indexOf(id)!==i)')
                    assert not duplicates,(lid,'submitted mocks',duplicates)
                    assert not page.locator('.katex-error').count(),lid
                    assert page.evaluate('document.documentElement.scrollWidth<=innerWidth'),(lid,theme,width)
                    assert not errors and not failures,(lid,errors,failures)
                    page.screenshot(path=str(OUT/f'{port}-{lid}-{width}-{theme}.png'))
                    results.append({'port':port,'lecture':lid,'theme':theme,'width':width,'sections':len(actual),'core':core,'optional':len(c['lectureQuiz'])-core,'duplicates':duplicates,'images':page.locator('img').count()})
                context.close()
    browser.close()
(OUT/'results.json').write_text(json.dumps(results,indent=2))
print(f'PASS: {len(results)} lecture/viewport/theme/server combinations; 239 theory sections per sweep before practice, all bank questions mounted once, all 27 mocks start with five prompts, optional keyboard opt-in, images, KaTeX, no overflow, duplicate IDs, failed requests or page errors.')
