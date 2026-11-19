"""Representative opt-in acceptance on an in-memory L01 fixture."""
import os

from playwright.sync_api import expect, sync_playwright

base = os.environ.get("CONCISE_BASE_URL", "http://127.0.0.1:4198")
chromium = os.environ.get("CONCISE_CHROMIUM")

with sync_playwright() as playwright:
    browser = playwright.chromium.launch(executable_path=chromium)
    page = browser.new_page(viewport={"width": 380, "height": 850})
    errors = []
    page.on("pageerror", lambda error: errors.append(str(error)))
    blocked = []
    page.route("https://www.youtube-nocookie.com/**",
               lambda route: (blocked.append(route.request.url), route.abort()))
    page.goto(base + "/courses/nbe-e4120/lectures/L01/")
    expect(page.locator(".formula-drill").first).to_be_visible()
    page.evaluate("""async () => {
      const {default: original} = await import('/content/nbe-e4120/L01.js');
      const {renderLecture} = await import('/js/render.js');
      const section = original.sections.find(s => s.id === 'passive');
      const choice = {...section.conceptQuiz[0], type: 'mc', id: 'fixture-valid',
        difficulty: 'easy', sectionId: section.id};
      const block = {type: 'relevantVideo', videoId: '2VzAY8pEbEE',
        title: 'Cable theory and the space constant', topic: 'Passive voltage spread',
        channel: 'Science With Tal'};
      const extra = {type: 'optionalInfo', body: 'Supplementary background.'};
      const fiveChoices = {...choice, id: 'fixture-oversized',
        options: Array(5).fill(choice.options[0])};
      const fixture = {...original, standardPractice: 'mc-only',
        sections: [{...section, blocks: [block, extra, ...section.blocks]}],
        lectureQuiz: [...original.lectureQuiz, choice, fiveChoices]};
      renderLecture(fixture, document.querySelector('#app'));
    }""")
    expect(page.locator(".formula-drill")).to_have_count(0)
    expect(page.locator(".formula-explorer").first).to_be_visible()
    question = page.locator("#passive > .question")
    expect(question).to_have_count(1)
    expect(question.get_by_role("button", name="Check", exact=True)).to_be_disabled()
    question.locator(".option").first.click()
    question.get_by_role("button", name="Check", exact=True).click()
    assert page.evaluate("""() => JSON.parse(localStorage.getItem(
        'nbe:nbe-e4120:progress:L01')).questions['fixture-valid'].attempts === 1""")
    disclosure = page.locator(".block-detail", has_text="Supplementary background.")
    expect(disclosure).not_to_have_attribute("open", "")
    disclosure.locator("summary").focus()
    page.keyboard.press("Enter")
    expect(disclosure).to_have_attribute("open", "")
    expect(page.locator("#mock-exams").first).to_be_visible()
    video = page.locator(".relevant-video")
    expect(video.locator("iframe")).to_have_count(0)
    watch = video.get_by_role("button", name="Watch clip")
    watch.focus()
    page.keyboard.press("Enter")
    iframe = video.locator("iframe")
    expect(iframe).to_have_attribute("src", "https://www.youtube-nocookie.com/embed/2VzAY8pEbEE")
    expect(iframe).to_have_attribute("loading", "lazy")
    iframe.scroll_into_view_if_needed()
    expect(page.locator(".relevant-video iframe")).to_be_visible()
    if not blocked:
        page.wait_for_event("requestfailed", predicate=lambda request: "youtube-nocookie.com" in request.url)
    expect(video.get_by_role("link", name="Open on YouTube")).to_be_visible()
    for width, theme in [(380, "dark"), (1280, "light")]:
        page.set_viewport_size({"width": width, "height": 850})
        page.emulate_media(color_scheme=theme)
        bounds = iframe.bounding_box()
        assert bounds and abs(bounds["width"] / bounds["height"] - 16 / 9) < 0.03
        assert page.evaluate("document.documentElement.scrollWidth <= innerWidth + 1")
    video.get_by_role("button", name="Hide clip").click()
    expect(iframe).to_have_count(0)
    assert not errors, errors
    browser.close()
print("Concise lecture fixture and blocked-video fallback passed.")
