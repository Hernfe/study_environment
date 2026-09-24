#!/usr/bin/env python3
"""Lint the question bank of every lecture content file.

Reads src/content/L*.js through scripts/dump_questions.mjs (Node) and
reports, per lecture:

  Multiple-choice fairness (every question with options: concept quizzes,
  lecture mc, clinicalCase and interpret questions that use options)
    longest    the correct option is the longest by more than 20 percent
               of the mean option length (gap to the next longest)
    shortest   the correct option is the shortest by more than 20 percent
               of the mean option length (gap to the next shortest)
    short-distractor
               a distractor is under half the length of the correct option
    positions  the correct-answer positions across the lecture deviate
               far from uniform (chi-square p < 0.05), both as authored
               and as shown after the seeded shuffle in conceptQuiz.js

  Question-bank mix (docs/PEDAGOGY.md section 2, docs/exam-format.md)
    12 to 15 questions ordered easy, medium, hard; target about 3 easy,
    5 medium, 5 hard; no essay unless labelled beyondExam, at most 1;
    at least 2 classify, 1 label with a word bank, 2 trueFalse with a
    false statement to correct, 2 clinicalCase; at least one mc, order,
    fillBlank and interpret; required fields of each type.

  Word banks (fillBlank, label, classify categories)
    wordbank   an answer missing from the bank, a duplicate entry, a
               once-only entry needed twice, or a distractor that is not
               plausible: its length is under half or over twice the
               mean answer length, its capitalisation differs from every
               answer, or it appears nowhere in any lecture's text (a
               distractor must be a course term).
    wordbank-note (advisory)
               no distractors and no reusable entries, so the last pick
               follows by elimination. The mini-exam does this; fine
               for easy items, avoid it on medium and hard.

  Maths
    plain-text symbols and units outside $...$ (E_K, g_Na, 65 mV, Na+),
    which must go through KaTeX. Counted per lecture with examples.

Lengths are measured on the text a student reads: HTML tags removed,
$...$ maths counted by its TeX source without commands.

Usage:
  python scripts/lint_questions.py            report on every lecture
  python scripts/lint_questions.py L04 L05    only these lectures
  python scripts/lint_questions.py --strict   exit 1 if any fairness or
                                              mix finding is reported
  python scripts/lint_questions.py --json     machine-readable output

Runs after every `npm run build` (scripts/build_report.mjs) as the build
report. It never fails the build unless --strict is given.
"""

import argparse
import json
import math
import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DUMP = ROOT / "scripts" / "dump_questions.mjs"

# Lectures written before the 2026-09-24 authoring rules. Findings are
# still reported, marked legacy, so a retrofit pass has a checklist.
LEGACY = {
    "L00": "renderer test page, shows every type",
    "L01": "legacy, written before the 2026-09-24 rules",
    "L02": "legacy, written before the 2026-09-24 rules",
}

TARGET = {"easy": 3, "medium": 5, "hard": 5}
TIERS = ["easy", "medium", "hard"]
TYPES = {"mc", "essay", "label", "order", "calc", "trueFalse", "fillBlank", "clinicalCase", "interpret", "classify"}
# Minimum count per type, or per question feature (docs/PEDAGOGY.md section 2).
MIN_MIX = [
    ("classify", 2, lambda q: q.get("type") == "classify"),
    ("label with a word bank", 1, lambda q: q.get("type") == "label" and q.get("wordBank")),
    ("trueFalse with a false statement to correct", 2, lambda q: q.get("type") == "trueFalse" and has_false(q)),
    ("clinicalCase", 2, lambda q: q.get("type") == "clinicalCase"),
    ("mc", 1, lambda q: q.get("type") == "mc"),
    ("order", 1, lambda q: q.get("type") == "order"),
    ("fillBlank", 1, lambda q: q.get("type") == "fillBlank"),
    ("interpret", 1, lambda q: q.get("type") == "interpret"),
]
BANK_LENGTH = (0.5, 2.0)
LENGTH_GAP = 0.20
SHORT_RATIO = 0.5
P_LIMIT = 0.05


# ---------------------------------------------------------------------
# Text helpers

TAG = re.compile(r"<[^>]+>")
MATH = re.compile(r"(?<!\\)\$(.+?)(?<!\\)\$")


def plain(text):
    """Text as read: tags removed, maths reduced to its visible symbols."""
    if isinstance(text, list):
        text = " ".join(str(t) for t in text)
    text = TAG.sub("", str(text or ""))
    text = MATH.sub(lambda m: tex_visible(m.group(1)), text)
    return re.sub(r"\s+", " ", text).strip()


def tex_visible(tex):
    """Roughly what a TeX expression shows: layout commands vanish, a
    symbol command such as \\tau counts as one character."""
    tex = re.sub(r"\\(?:text|mathrm|mathit|operatorname|frac|left|right|displaystyle)\b", "", tex)
    tex = re.sub(r"\\[,;:! ]|\\q?quad\b", "", tex)
    tex = re.sub(r"\\[A-Za-z]+", "x", tex)
    return re.sub(r"[{}^_\\]", "", tex)


def outside_math(text):
    return MATH.sub(" ", TAG.sub(" ", str(text or "")))


# Plain-text maths that should be KaTeX. Kept narrow to avoid noise.
SYMBOL_PATTERNS = [
    ("subscript", re.compile(r"\b[A-Za-z]{1,3}_[A-Za-z0-9]+\b")),
    ("unit", re.compile(r"(?<![\w.])[-+]?\d+(?:\.\d+)?\s?(?:mV|uV|µV|μV|ms|mM|µM|uM|nM|nA|pA|µA|uA|Hz|kHz|nS|pS|MΩ|Mohm|um|µm|nm|pF|µF)\b")),
    ("ion", re.compile(r"\b(?:Na|K|Ca|Cl|Mg)(?:2)?(?:\+|-)(?=[\s,.;:)]|$)")),
    ("ascii-op", re.compile(r"\blog10\b|\*\s?log|\bexp\(")),
]


def symbol_hits(text):
    body = outside_math(text)
    hits = []
    for name, pattern in SYMBOL_PATTERNS:
        for m in pattern.finditer(body):
            hits.append((name, m.group(0)))
    return hits


# ---------------------------------------------------------------------
# Seeded order, a port of seededOrder in src/js/dom.js. Keep in sync.

M32 = 0xFFFFFFFF


def imul(a, b):
    return (a * b) & M32


def seeded_order(n, seed):
    h = 0x811C9DC5
    for ch in str(seed):
        h ^= ord(ch)
        h = imul(h, 0x01000193)
    state = h

    def random():
        nonlocal state
        state = (state + 0x6D2B79F5) & M32
        t = state
        t = imul(t ^ (t >> 15), t | 1)
        t ^= (t + imul(t ^ (t >> 7), t | 61)) & M32
        return ((t ^ (t >> 14)) & M32) / 4294967296

    out = list(range(n))
    for i in range(n - 1, 0, -1):
        j = math.floor(random() * (i + 1))
        out[i], out[j] = out[j], out[i]
    return out


# ---------------------------------------------------------------------
# Chi-square survival function (regularised upper incomplete gamma).

def gammq(a, x):
    if x <= 0:
        return 1.0
    if x < a + 1:
        term = total = 1.0 / a
        ap = a
        for _ in range(500):
            ap += 1
            term *= x / ap
            total += term
            if abs(term) < abs(total) * 1e-12:
                break
        return 1.0 - total * math.exp(-x + a * math.log(x) - math.lgamma(a))
    b = x + 1 - a
    c = 1e300
    d = 1 / b
    h = d
    for i in range(1, 500):
        an = -i * (i - a)
        b += 2
        d = an * d + b
        d = 1e-300 if abs(d) < 1e-300 else d
        c = b + an / c
        c = 1e-300 if abs(c) < 1e-300 else c
        d = 1 / d
        delta = d * c
        h *= delta
        if abs(delta - 1) < 1e-12:
            break
    return math.exp(-x + a * math.log(x) - math.lgamma(a)) * h


def position_test(items):
    """items: [(position, n_options)]. Returns (p, observed, expected)."""
    if not items:
        return 1.0, [], []
    width = max(n for _, n in items)
    observed = [0] * width
    expected = [0.0] * width
    for pos, n in items:
        observed[pos] += 1
        for k in range(n):
            expected[k] += 1 / n
    cells = [(o, e) for o, e in zip(observed, expected) if e > 0]
    chi2 = sum((o - e) ** 2 / e for o, e in cells)
    df = len(cells) - 1
    p = gammq(df / 2, chi2 / 2) if df > 0 else 1.0
    return p, observed, expected


# ---------------------------------------------------------------------
# Checks

def mc_questions(content):
    """Every question with options, with where it lives."""
    for section in content.get("sections", []):
        for q in section.get("conceptQuiz") or []:
            yield f"concept {q.get('id')}", q
    for q in content.get("lectureQuiz", []):
        if q.get("options"):
            yield f"quiz {q.get('id')}", q


def check_lengths(where, q):
    out = []
    options = q.get("options") or []
    correct = q.get("correct")
    if correct is None or not (0 <= correct < len(options)) or len(options) < 2:
        return [("error", where, "options or correct index missing")]
    lengths = [len(plain(o.get("text"))) for o in options]
    mean = sum(lengths) / len(lengths)
    c = lengths[correct]
    others = [l for i, l in enumerate(lengths) if i != correct]
    if c > max(others) and c - max(others) > LENGTH_GAP * mean:
        out.append(("longest", where, f"correct option is the longest: {c} chars vs next {max(others)} (mean {mean:.0f})"))
    if c < min(others) and min(others) - c > LENGTH_GAP * mean:
        out.append(("shortest", where, f"correct option is the shortest: {c} chars vs next {min(others)} (mean {mean:.0f})"))
    for i, l in enumerate(lengths):
        if i != correct and l < SHORT_RATIO * c:
            out.append(("short-distractor", where, f"option {i + 1} is {l} chars, under half the correct option ({c})"))
    return out


def check_mix(content):
    out = []
    quiz = content.get("lectureQuiz", [])
    n = len(quiz)
    if not 12 <= n <= 15:
        out.append(("mix", "quiz", f"{n} questions; the rule is 12 to 15"))
    tiers = [q.get("difficulty") for q in quiz]
    counts = {t: tiers.count(t) for t in TIERS}
    ranks = [TIERS.index(t) if t in TIERS else -1 for t in tiers]
    if any(r < 0 for r in ranks):
        out.append(("error", "quiz", "a question has no easy, medium or hard label"))
    elif ranks != sorted(ranks):
        first = next(i for i in range(1, len(ranks)) if ranks[i] < ranks[i - 1])
        out.append(("mix", "quiz", f"not ordered easy, medium, hard (question {first + 1}, {quiz[first].get('id')})"))
    off = [f"{t} {counts[t]} (target {TARGET[t]})" for t in TIERS if abs(counts[t] - TARGET[t]) > 1]
    if off:
        out.append(("tiers", "quiz", "tier split " + ", ".join(off) + "; advisory, never relabel to hit it"))
    essays = [q for q in quiz if q.get("type") == "essay"]
    if len(essays) > 1:
        out.append(("mix", "quiz", f"{len(essays)} essays; the mini-exam has none, keep at most 1"))
    for q in essays:
        if not q.get("beyondExam"):
            out.append(("mix", f"quiz {q.get('id')}", "essay not labelled beyondExam: true; the mini-exam has no essays"))
    for name, least, test in MIN_MIX:
        count = sum(1 for q in quiz if test(q))
        if count < least:
            out.append(("mix", "quiz", f"{count} {name}; at least {least}"))
    return out


def has_false(q):
    if q.get("statements"):
        return any(s.get("answer") is False for s in q["statements"])
    return q.get("answer") is False


def check_fields(q):
    where = f"quiz {q.get('id')}"
    t = q.get("type")
    out = []
    if t not in TYPES:
        return [("error", where, f"unknown type {t!r}")]
    if not q.get("modelAnswer") and not (t == "calc" and q.get("steps")):
        out.append(("error", where, "no modelAnswer"))
    if t == "trueFalse" and q.get("statements") is not None:
        statements = q.get("statements") or []
        if len(statements) < 2:
            out.append(("error", where, "statements needs at least 2 entries; use answer and justification for one"))
        for i, s in enumerate(statements):
            tag = f"statement {chr(97 + i)}"
            if not isinstance(s.get("answer"), bool):
                out.append(("error", where, f"{tag} needs answer: true or false"))
            elif s["answer"] is False:
                fix = plain(s.get("correction"))
                if not fix:
                    out.append(("error", where, f"{tag} is false and needs a one-line correction"))
                elif len(fix) > 200:
                    out.append(("error", where, f"{tag} correction is {len(fix)} chars; keep it to one line (200)"))
    elif t == "trueFalse":
        if not isinstance(q.get("answer"), bool):
            out.append(("error", where, "trueFalse needs answer: true or false"))
        just = plain(q.get("justification"))
        if not just:
            out.append(("error", where, "trueFalse needs a one-line justification"))
        elif len(just) > 200:
            out.append(("error", where, f"justification is {len(just)} chars; keep it to one line (200)"))
    elif t == "fillBlank":
        gaps = str(q.get("text") or "").count("___")
        blanks = q.get("blanks") or []
        if gaps == 0 or gaps != len(blanks):
            out.append(("error", where, f"text has {gaps} ___ but {len(blanks)} blanks"))
        if any(not b.get("accept") for b in blanks):
            out.append(("error", where, "every blank needs at least one accepted answer"))
    elif t == "clinicalCase":
        if not q.get("scenario"):
            out.append(("error", where, "clinicalCase needs a scenario"))
        if not q.get("options") and not q.get("accept"):
            out.append(("error", where, "clinicalCase needs options and correct, or accept"))
        if len(q.get("modelAnswer") or []) < 3:
            out.append(("error", where, "clinicalCase reasoning (modelAnswer) should have at least 3 steps"))
    elif t == "interpret":
        if not q.get("figure") and not q.get("video"):
            out.append(("error", where, "interpret needs a figure or a video"))
        if not q.get("options") and not q.get("markScheme"):
            out.append(("error", where, "interpret needs options or a markScheme"))
    elif t == "essay":
        scheme = q.get("markScheme") or []
        if sum(m.get("points", 0) for m in scheme) != q.get("points", sum(m.get("points", 0) for m in scheme)):
            out.append(("error", where, "markScheme points do not sum to points"))
    elif t == "classify":
        categories = [bank_text(c) for c in q.get("categories") or []]
        items = q.get("items") or []
        if len(categories) < 2:
            out.append(("error", where, "classify needs at least 2 categories"))
        if len(items) < 2:
            out.append(("error", where, "classify needs at least 2 items"))
        for i, item in enumerate(items):
            if not plain(item.get("text")):
                out.append(("error", where, f"item {chr(97 + i)} has no text"))
            if item.get("answer") not in categories:
                out.append(("error", where, f"item {chr(97 + i)} answer {item.get('answer')!r} is not a category"))
            if str(item.get("text") or "").count("___") > 1:
                out.append(("error", where, f"item {chr(97 + i)} has more than one ___"))
    for key in ("points", "itemPoints"):
        value = q.get(key)
        if value is not None and not (isinstance(value, (int, float)) and value > 0):
            out.append(("error", where, f"{key} must be a positive number"))
    return out


# ---------------------------------------------------------------------
# Word banks

def bank_text(entry):
    return entry.get("text") if isinstance(entry, dict) else entry


def norm(text):
    text = plain(text).lower()
    text = re.sub(r"[‐-―−]", "-", text)
    return re.sub(r"[.,;:!?]+$", "", re.sub(r"\s+", " ", text)).strip()


def bank_of(q):
    """(entries, answers needed) for a question with a closed list, or
    None. entries: [(text, reusable)]; answers: list of bank texts, one
    per sub-item, in order (None where no entry matches)."""
    t = q.get("type")
    if t == "classify":
        entries = [(bank_text(c), True if not isinstance(c, dict) else c.get("reusable", True)) for c in q.get("categories") or []]
        return entries, [i.get("answer") for i in q.get("items") or []]
    if not q.get("wordBank"):
        return None
    entries = [(bank_text(e), bool(e.get("reusable")) if isinstance(e, dict) else False) for e in q["wordBank"]]
    by_norm = {norm(text): text for text, _ in entries}
    if t == "fillBlank":
        answers = []
        for blank in q.get("blanks") or []:
            hit = next((by_norm[norm(a)] for a in blank.get("accept") or [] if norm(a) in by_norm), None)
            answers.append(hit)
        return entries, answers
    if t == "label":
        regions = (q.get("hotspots") or {}).get("regions") or q.get("regions") or []
        labels = [r.get("label") for r in regions]
        return entries, [lab if lab in dict(entries) else None for lab in labels]
    return None


def check_bank(q, corpus, owner):
    found = bank_of(q)
    if not found:
        return []
    entries, answers = found
    where = f"quiz {q.get('id')}"
    out = []
    texts_ = [text for text, _ in entries]
    reusable = dict(entries)
    seen = set()
    for text in texts_:
        key = norm(text)
        if key in seen:
            out.append(("wordbank", where, f"duplicate entry {text!r}"))
        seen.add(key)
    if q.get("type") != "classify":
        for i, a in enumerate(answers):
            if a is None:
                out.append(("wordbank", where, f"sub-item {i + 1}: its answer is not in the word bank"))
        for text in set(a for a in answers if a):
            if answers.count(text) > 1 and not reusable.get(text):
                out.append(("wordbank", where, f"{text!r} answers {answers.count(text)} sub-items but is not marked reusable"))
    used = [a for a in answers if a]
    distractors = [text for text in texts_ if text not in used]
    if not used:
        return out
    mean = sum(len(plain(a)) for a in used) / len(used)
    caps = {plain(a)[:1].isupper() for a in used}
    for d in distractors:
        length = len(plain(d))
        if not BANK_LENGTH[0] * mean <= length <= BANK_LENGTH[1] * mean:
            out.append(("wordbank", where, f"distractor {d!r} is {length} chars against a mean answer of {mean:.0f}; match the answers in form"))
        if len(caps) == 1 and plain(d)[:1].isupper() not in caps:
            out.append(("wordbank", where, f"distractor {d!r} is capitalised differently from every answer"))
        if not in_corpus(d, corpus, owner):
            out.append(("wordbank", where, f"distractor {d!r} appears in no lecture text; use a course term a half-prepared student might pick"))
    if not distractors and not any(reusable.get(t) for t in texts_) and q.get("type") != "classify":
        out.append(("wordbank-note", where, "no distractors and every entry once-only, so the last pick follows by elimination"))
    return out


def in_corpus(term, corpus, exclude):
    """True if the term (or its plural or singular) appears in the text of
    any lecture, not counting the question `exclude` itself."""
    key = norm(term)
    variants = {key, key.rstrip("s"), key + "s", re.sub(r"y$", "ies", key)}
    pattern = re.compile("|".join(r"(?<![a-z])" + re.escape(v) + r"(?![a-z])" for v in variants if v))
    return any(owner != exclude and pattern.search(text) for owner, text in corpus)


BANK_KEYS = {"wordBank", "categories", "labels", "labelPool"}


def corpus_of(data):
    """Every lecture's student-facing text as (owner, lower-cased text),
    owner being (lecture, question id) for quiz text and None otherwise.
    Word banks and label pools are left out: a distractor must occur in
    teaching text or another question, not only in a list of options."""
    corpus = []
    for lecture_id, entry in data.items():
        content = entry.get("content")
        if not content:
            continue
        rest = {k: v for k, v in content.items() if k not in {"meta", "lectureQuiz"}}
        corpus.extend((None, plain(t).lower()) for t in texts(rest))
        for q in content.get("lectureQuiz", []):
            owner = (lecture_id, q.get("id"))
            kept = {k: v for k, v in q.items() if k not in BANK_KEYS}
            corpus.extend((owner, plain(t).lower()) for t in texts({"q": kept}))
            regions = (q.get("hotspots") or {}).get("regions") or q.get("regions") or []
            corpus.extend((owner, str(r.get("label") or "").lower()) for r in regions if isinstance(r, dict))
    return corpus


def texts(content):
    """Every student-facing string, for the maths check."""
    def collect(value, key=""):
        if isinstance(value, str):
            if key not in {"id", "src", "poster", "type", "name", "tex", "file", "math", "expression", "sectionId", "lectureId", "difficulty"}:
                yield value
        elif isinstance(value, list):
            for v in value:
                yield from collect(v, key)
        elif isinstance(value, dict):
            for k, v in value.items():
                if k in {"meta", "visual", "figure", "props", "hotspots"}:
                    continue
                yield from collect(v, k)
    yield from collect({k: v for k, v in content.items() if k != "meta"})


def lint(lecture_id, content, corpus):
    findings = []
    positions_authored = []
    positions_shown = []
    for where, q in mc_questions(content):
        findings += check_lengths(where, q)
        options = q.get("options") or []
        correct = q.get("correct")
        if isinstance(correct, int) and 0 <= correct < len(options):
            positions_authored.append((correct, len(options)))
            order = seeded_order(len(options), f"{lecture_id}:{q.get('id')}")
            positions_shown.append((order.index(correct), len(options)))
    for label, items in (("authored", positions_authored), ("shown", positions_shown)):
        p, observed, expected = position_test(items)
        if p < P_LIMIT:
            dist = ", ".join(f"{k + 1}: {o} (exp {e:.1f})" for k, (o, e) in enumerate(zip(observed, expected)))
            findings.append(("positions", "all options", f"{label} correct positions far from uniform, p = {p:.3f}; {dist}"))
    findings += check_mix(content)
    for q in content.get("lectureQuiz", []):
        findings += check_fields(q)
        findings += check_bank(q, corpus, (lecture_id, q.get("id")))

    hits = []
    for text in texts(content):
        hits += symbol_hits(text)
    return findings, hits, positions_authored, positions_shown


def dump(lectures):
    cmd = ["node", str(DUMP), *lectures]
    try:
        result = subprocess.run(cmd, cwd=ROOT, capture_output=True, text=True, encoding="utf-8", check=True)
    except FileNotFoundError:
        sys.exit("lint_questions: node is not on PATH")
    except subprocess.CalledProcessError as error:
        sys.exit(f"lint_questions: dump failed\n{error.stderr}")
    return json.loads(result.stdout)


SEVERE = {"error", "longest", "shortest", "short-distractor", "positions", "mix", "wordbank"}


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("lectures", nargs="*", help="lecture ids, e.g. L04 (default: all)")
    ap.add_argument("--strict", action="store_true", help="exit 1 on any fairness, mix or field finding")
    ap.add_argument("--json", action="store_true")
    ap.add_argument("--examples", type=int, default=3, help="plain-text maths examples to show per lecture")
    ap.add_argument("--verbose", action="store_true", help="list every finding for legacy lectures too")
    args = ap.parse_args()

    # Every lecture is loaded for the word-bank corpus; only the requested
    # ones are reported.
    data = dump([])
    corpus = corpus_of(data)
    wanted = set(args.lectures)
    report = {}
    severe = 0
    for lecture_id, entry in sorted(data.items()):
        if wanted and lecture_id not in wanted and not any(lecture_id.startswith(w) for w in wanted):
            continue
        if entry.get("error"):
            report[lecture_id] = {"error": entry["error"]}
            severe += 1
            continue
        findings, hits, authored, shown = lint(lecture_id, entry["content"], corpus)
        report[lecture_id] = {"file": entry["file"], "findings": findings, "symbols": hits, "mc": len(authored)}
        if lecture_id not in LEGACY:
            severe += sum(1 for f in findings if f[0] in SEVERE)

    if args.json:
        print(json.dumps(report, indent=1, ensure_ascii=False))
    else:
        print("Question lint (scripts/lint_questions.py)")
        for lecture_id, r in report.items():
            if "error" in r:
                print(f"\n{lecture_id}: could not load\n  {r['error'].splitlines()[0]}")
                continue
            tag = f" ({LEGACY[lecture_id]})" if lecture_id in LEGACY else ""
            findings = r["findings"]
            print(f"\n{lecture_id}{tag}: {len(findings)} findings, {r['mc']} questions with options, {len(r['symbols'])} plain-text symbols")
            per_question = {"longest", "shortest", "short-distractor"}
            brief = lecture_id in LEGACY and not args.verbose
            for kind, where, message in findings:
                if not (brief and kind in per_question):
                    print(f"  [{kind}] {where}: {message}")
            if brief:
                counts = {k: sum(1 for f in findings if f[0] == k) for k in sorted(per_question)}
                if any(counts.values()):
                    print("  [options] " + ", ".join(f"{v} {k}" for k, v in counts.items() if v) + " (--verbose to list)")
            if r["symbols"]:
                sample = ", ".join(sorted({h[1] for h in r["symbols"]})[: args.examples])
                print(f"  [maths] {len(r['symbols'])} symbols or units outside $...$, e.g. {sample}")
    if args.strict and severe:
        sys.exit(1)


if __name__ == "__main__":
    main()
