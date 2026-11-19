"""Smoke test against a built distribution, using Python Playwright."""

import argparse
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from threading import Thread

from playwright.sync_api import expect, sync_playwright

args = argparse.ArgumentParser()
args.add_argument("dist", type=Path)
args.add_argument("--chromium")
args.add_argument("--screenshots", type=Path)
config = args.parse_args()


class QuietHandler(SimpleHTTPRequestHandler):
    def log_message(self, *_):
        pass


server = ThreadingHTTPServer(("127.0.0.1", 0), partial(QuietHandler, directory=config.dist))
Thread(target=server.serve_forever, daemon=True).start()
base = f"http://127.0.0.1:{server.server_port}"
home = "/courses/tu-e4350/"
weeks = [f"{home}lectures/L{i:02}/" for i in range(1, 11)]
key = "nbe:tu-e4350:practice:required:L01:w01-value"

try:
    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(executable_path=config.chromium)
        page = browser.new_page()
        errors = []
        page.on("pageerror", lambda error: errors.append(str(error)))

        def visit(path):
            response = page.goto(base + path)
            assert response.ok, path
            expect(page.locator("h1")).to_be_visible()

        for theme in ("light", "dark"):
            page.emulate_media(color_scheme=theme)
            for width in (380, 768, 1280, 1920):
                page.set_viewport_size({"width": width, "height": 900})
                for i, path in enumerate([home, *weeks]):
                    visit(path)
                    assert page.evaluate("document.documentElement.scrollWidth <= innerWidth"), (path, width)
                    if i:
                        expect(page.locator(".question")).to_have_count(8)
                        expect(page.locator(".option-feedback")).to_have_count(0)
                        scope = (
                            "Based on the designated Exam essentials." if i >= 7
                            else "Provisional review priorities from the supplied teaching slides."
                        )
                        expect(page.get_by_text(scope, exact=True)).to_be_visible()
                        if i == 8:
                            expect(page.locator("#brief-context .katex")).to_have_count(2)
                        expect(page.locator("#brief-context")).not_to_have_attribute("open", "")
                    else:
                        expect(page.get_by_text("Source slides unavailable", exact=True)).to_have_count(2)
                        expect(page.get_by_text("Slides audited · Lesson pending", exact=True)).to_have_count(0)
                    if config.screenshots:
                        config.screenshots.mkdir(parents=True, exist_ok=True)
                        page.screenshot(path=config.screenshots / f"{theme}-{width}-{i}.png")
                print(f"PASS eleven TU routes, {theme}, {width}px")

        visit("/")
        page.get_by_role("link", name="Technology Entrepreneurship", exact=True).click()
        page.get_by_role("link", name="Start Week 1").click()
        for slug in ("nbe-e4070", "nbe-e4120", "nbe-e4210"):
            page.evaluate("(slug) => localStorage.setItem('nbe:' + slug + ':progress:L01', '{}')", slug)
        page.get_by_role("link", name="Brief context", exact=True).press("Enter")
        expect(page.locator("#brief-context")).to_have_attribute("open", "")
        expect(page.get_by_text("0 of 8 checked · 0 correct")).to_be_visible()
        first = page.locator(".question").first
        expect(first.locator(".option-feedback")).to_have_count(0)
        expect(first.get_by_role("button", name="Check", exact=True)).to_be_disabled()
        first.get_by_role("button", name="Which prototype best showcases the speed").press("Space")
        first.get_by_role("button", name="Check", exact=True).press("Enter")
        expect(first.get_by_text("Not quite.", exact=True)).to_be_visible()
        assert page.evaluate("(key) => JSON.parse(localStorage.getItem(key)).checkedChoice", key) == 1
        page.reload()
        first.get_by_role("button", name="Try again").press("Enter")
        first.get_by_role("button", name="Which customer task benefits from speed").press("Enter")
        first.get_by_role("button", name="Check", exact=True).press("Enter")
        expect(first.get_by_text("Correct.", exact=True)).to_be_visible()
        expect(first.locator(".option-feedback")).to_have_count(3)
        for question in page.locator(".question").all()[1:]:
            question.locator("button.option").first.press("Space")
            question.get_by_role("button", name="Check", exact=True).press("Enter")
        expect(page.get_by_text("8 of 8 checked", exact=False)).to_be_visible()
        visit(home)
        expect(page.get_by_text("1 of 10 available weeks practised.", exact=False)).to_be_visible()
        expect(page.get_by_role("link", name="Continue Week 2")).to_be_visible()
        visit(weeks[0])
        expect(first.get_by_text("Correct.", exact=True)).to_be_visible()
        page.get_by_role("link", name="Next · Week 2").click()
        expect(page.get_by_role("link", name="Previous · Week 1")).to_be_visible()
        visit(weeks[4])
        page.get_by_role("link", name="Next · Week 6").click()
        expect(page.get_by_role("link", name="Previous · Week 5")).to_be_visible()
        visit(weeks[-1])
        last_week_question = page.locator(".question").first
        last_week_question.get_by_role("button", name="2, credible but unproven").press("Space")
        last_week_question.get_by_role("button", name="Check", exact=True).press("Enter")
        expect(last_week_question.get_by_text("Correct.", exact=True)).to_be_visible()
        page.reload()
        expect(last_week_question.get_by_text("Correct.", exact=True)).to_be_visible()
        page.get_by_role("link", name="Back to week map").click()
        expect(page.locator(".course-map li").nth(9).get_by_text("1 of 8 checked · 1 correct")).to_be_visible()
        visit(home)
        entry = page.get_by_role("link", name="Start 16-question diagnostic")
        expect(entry).not_to_be_visible()
        page.get_by_text("Optional quick diagnostic", exact=True).press("Enter")
        expect(entry).to_be_visible()
        for index, (slug, right_choice) in enumerate((
            ("market", "Whether inspection crews face costly delays the scanner can reduce"),
            ("validation", "Whether supervisors act on realistic alerts in their workflow"),
            ("growth", "An equity vesting schedule"),
            ("diagnostic", "Packaging operators reduce a costly production delay."),
        )):
            visit(home)
            if slug == "diagnostic":
                page.get_by_text("Optional quick diagnostic", exact=True).click()
                entry.click()
            else:
                page.get_by_role("link", name=f"Mock {index + 1}", exact=False).click()
            expect(page.get_by_text("Neither week’s source slides are available here.", exact=False)).to_be_visible()
            expect(page.get_by_role("radio")).to_have_count(48)
            expect(page.get_by_text("Correct choice", exact=False)).to_have_count(0)
            expect(page.get_by_role("checkbox")).to_have_count(0)
            expect(page.locator("textarea")).to_have_count(0 if slug == "diagnostic" else 5)
            expect(page.get_by_role("button", name="Submit and show answer key")).to_be_visible()
            for theme in ("light", "dark"):
                page.emulate_media(color_scheme=theme)
                for width in (380, 768, 1280, 1920):
                    page.set_viewport_size({"width": width, "height": 900})
                    assert page.evaluate("document.documentElement.scrollWidth <= innerWidth"), (slug, theme, width)
            page.set_viewport_size({"width": 380, "height": 900})
            correct = page.get_by_role("radio", name=right_choice, exact=True)
            correct.press("Space")
            if slug != "diagnostic":
                page.locator("textarea").first.fill("Synthetic browser test draft.")
            page.reload()
            expect(correct).to_be_checked()
            if slug != "diagnostic":
                expect(page.locator("textarea").first).to_have_value("Synthetic browser test draft.")
            expect(page.get_by_text("Correct choice", exact=False)).to_have_count(0)
            page.get_by_role("button", name="Submit and show answer key").press("Enter")
            expect(page.get_by_role("heading", name="Results", exact=True)).to_be_focused()
            expect(page.get_by_text("MCQs 1/16.", exact=False)).to_be_visible()
            expect(page.get_by_text("Correct choice", exact=False)).to_have_count(16)
            expect(correct).to_be_disabled()
            expect(page.get_by_role("checkbox")).to_have_count(0 if slug == "diagnostic" else 14)
            if slug != "diagnostic":
                expect(page.locator("textarea").first).to_have_attribute("readonly", "")
                page.get_by_role("checkbox").first.check()
                expect(page.get_by_text("Practice total 2/30.", exact=False)).to_be_visible()
            assert page.evaluate("document.documentElement.scrollWidth <= innerWidth"), slug
            page.reload()
            expect(correct).to_be_disabled()
            if slug != "diagnostic":
                expect(page.get_by_role("checkbox").first).to_be_checked()
                expect(page.get_by_text("Practice total 2/30.", exact=False)).to_be_visible()
            print(f"PASS {slug} entry, coverage, layout, gating, keyboard, scoring and reload")
        assert page.evaluate("(key) => JSON.parse(localStorage.getItem(key)).checkedChoice", key) == 0

        for slug in ("nbe-e4070", "nbe-e4120", "nbe-e4210"):
            assert page.evaluate("(slug) => localStorage.getItem('nbe:' + slug + ':progress:L01')", slug) == "{}"
            visit(f"/courses/{slug}/")
            if slug == "nbe-e4120":
                expect(page.locator(".final-mock")).to_have_count(5)
            visit(f"/courses/{slug}/lectures/L01/")
            print(f"PASS {slug} home and L01")
        print("PASS keyboard, feedback gating, retry, reload, completion, next week and storage isolation")

        page = browser.new_page()
        page.on("pageerror", lambda error: errors.append(str(error)))
        page.add_init_script("Object.defineProperty(window, 'localStorage', {get() {throw new Error('blocked')}})")
        visit(weeks[0])
        expect(page.get_by_text("Browser storage is unavailable.", exact=False)).to_be_visible()
        question = page.locator(".question").first
        question.locator("button.option").first.click()
        question.get_by_role("button", name="Check", exact=True).click()
        expect(page.get_by_text("1 of 8 checked", exact=False)).to_be_visible()
        visit(f"{home}practice/?form=diagnostic")
        expect(page.get_by_text("Browser storage is unavailable.", exact=False)).to_be_visible()
        page.get_by_role("radio").first.press("Space")
        page.get_by_role("button", name="Submit and show answer key").press("Enter")
        expect(page.get_by_role("heading", name="Results", exact=True)).to_be_visible()
        assert not errors, errors
        print("PASS blocked storage, no uncaught page errors")

    assert not list(config.dist.rglob("*.pdf")), "PDF found in dist"
    print("PASS production distribution contains no PDFs")
finally:
    server.shutdown()
    server.server_close()
