"""Browser regression checks. Requires playwright and a running npm run dev.

Run: python scripts/test_review_features.py
Uses installed Chrome; screenshots go to ignored shots/features/.
"""
from pathlib import Path
from playwright.sync_api import sync_playwright


with sync_playwright() as p:
    browser = p.chromium.launch(channel="chrome", headless=True)
    context = browser.new_context(timezone_id="Europe/Helsinki")
    page = context.new_page()
    errors = []
    page.on("pageerror", lambda error: errors.append(str(error)))
    page.goto("http://127.0.0.1:5173/courses/nbe-e4210/lectures/L00/")
    section = page.locator("#questions-only")
    section.wait_for()
    assert section.locator(".concept-body").count() == 0
    assert section.locator(".concept-quiz article").count() == 6
    assert page.locator("#questions-only-no-figure .concept-quiz article").count() == 1
    assert page.locator("#questions-only-no-figure > .question").count() == 0
    figure = section.locator(":scope > .question")
    selects = figure.locator("select")
    assert selects.count() == 3
    for i, label in enumerate(["Membrane", "Channel", "Pump"]):
        selects.nth(i).select_option(label=label)
        if i == 0:
            assert selects.nth(1).locator("option:disabled").filter(has_text="Membrane").count() == 1
    figure.get_by_role("button", name="Check", exact=True).click()
    assert "membrane separates" in figure.inner_text()
    first = section.locator(".concept-quiz article").first
    first.get_by_role("button", name="Ion pump", exact=True).click()
    first.get_by_role("button", name="Check", exact=True).click()
    assert first.locator(".option-feedback").count() == 3
    first.get_by_role("button", name="Try again", exact=True).click()
    assert first.locator(".option-feedback").count() == 0
    first.get_by_role("button", name="Membrane", exact=True).click()
    first.get_by_role("button", name="Check", exact=True).click()
    assert first.locator(".option-feedback").count() == 3
    progress = page.evaluate("JSON.parse(localStorage.getItem('nbe:nbe-e4210:progress:L00'))")
    assert "questions-only-figure" not in progress["questions"]
    assert progress["concept"]["questions-only-boundary"]["attempts"] == 2
    page.reload()
    section.wait_for()
    assert page.evaluate("JSON.parse(localStorage.getItem('nbe:nbe-e4210:progress:L00')).concept['questions-only-boundary'].attempts") == 2

    # Use the actual L00 page and real review module, with date fixtures.
    result = page.evaluate("""async () => {
      const {buildReviewQueue, examIsPast, renderReview} = await import('/js/review.js');
      const {registry} = await import('/content/nbe-e4210/registry.js');
      const now = new Date(2026, 10, 4, 23, 59);
      const q = {id: 'test'};
      const lectures = [
        {id: 'past', examDate: '2026-11-03', questions: [q]},
        {id: 'today', examDate: '2026-11-04', questions: [q]},
        {id: 'future', examDate: '2026-11-05', questions: [q]},
        {id: 'undated', questions: [q]},
      ];
      const getProgress = () => ({questions: {test: {lastResult: 'missed', lastAt: 1}}});
      const ids = buildReviewQueue(lectures, getProgress, now).map(e => e.lectureId).sort();
      const root = document.createElement('section'); root.id = 'review-fixture';
      document.querySelector('.page-inner').append(root);
      const today = new Date();
      const date = `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-${String(today.getDate()).padStart(2,'0')}`;
      renderReview(root, [{id:'L01', number:1, built:true, examDate:'2000-01-01'},
        {id:'L00', number:0, title:'Example', built:true, examDate:date}]);
      return {ids, midnight: examIsPast(lectures[1], new Date(2026,10,5)),
        onDay: examIsPast(lectures[1], now),
        excluded: registry.filter(e => examIsPast(e, now)).map(e => e.id)};
    }""")
    assert result["ids"] == ["future", "today", "undated"]
    assert result["midnight"] and not result["onDay"]
    assert result["excluded"] == ["L01", "L02", "L03", "L04", "L05", "L06"]
    review = page.locator("#review-fixture")
    assert "L01 (2000-01-01)" in review.locator(".review-exclusions").inner_text()
    review.get_by_role("button", name="Start review", exact=True).click()
    page.wait_for_function("document.querySelector('#review-fixture .review-list').children.length === 15")
    assert "Lecture 1" not in review.locator(".review-list").inner_text()
    assert "Lecture 0" in review.locator(".review-list").inner_text()
    assert "questions-only-figure" not in review.inner_html()
    page.evaluate("""async () => {
      const {renderReview} = await import('/js/review.js');
      renderReview(document.querySelector('#review-fixture'), [{id:'L01', number:1, built:true, examDate:'2000-01-01'}]);
    }""")
    review.get_by_role("button", name="Start review", exact=True).click()
    page.wait_for_function("document.querySelector('#review-fixture .review-progress').textContent.includes('nothing to review')")
    assert review.locator(".review-list > *").count() == 0

    out = Path("shots/features")
    out.mkdir(parents=True, exist_ok=True)
    for theme in ["light", "dark"]:
        page.emulate_media(color_scheme=theme)
        for width in [380, 768, 1280, 1920]:
            page.set_viewport_size({"width": width, "height": 1000})
            for item in page.locator(".page-inner > .section").all():
                item.screenshot(path=str(out / f"{item.get_attribute('id')}-{width}-{theme}.png"))
            review.screenshot(path=str(out / f"review-{width}-{theme}.png"))
            assert page.evaluate("document.documentElement.scrollWidth <= innerWidth"), (theme, width)
    assert not errors, errors
    browser.close()
print("L00 questions-only, feedback, word bank, progress, review dates and responsive checks passed.")
