#!/usr/bin/env python3
"""Search the local Bioicons collection by keyword.

Bioicons layout (assets/bioicons, cloned from github.com/duerrsimon/bioicons):

    static/icons/<license>/<category>/<author>/<name>.svg
    static/icons/icons.json    one record per icon: name, category, license, author
    static/icons/authors.json  author -> homepage URL

The licence is the first path segment under static/icons (cc-0, cc-by-3.0,
cc-by-4.0, cc-by-sa-3.0, cc-by-sa-4.0, mit, bsd). icons.json repeats it.

Usage:
    python scripts/find_asset.py neuron axon
    python scripts/find_asset.py "ion channel"        # all words must match
    python scripts/find_asset.py --any neuron glia    # any word may match
    python scripts/find_asset.py --json synapse       # machine-readable

Matching is case-insensitive against the file name, category and author,
with -, _ and spaces treated alike.
"""

import argparse
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
ICONS_DIR = ROOT / "assets" / "bioicons" / "static" / "icons"

LICENSE_URLS = {
    "cc-0": "https://creativecommons.org/publicdomain/zero/1.0/",
    "cc-by-3.0": "https://creativecommons.org/licenses/by/3.0/",
    "cc-by-4.0": "https://creativecommons.org/licenses/by/4.0/",
    "cc-by-sa-3.0": "https://creativecommons.org/licenses/by-sa/3.0/",
    "cc-by-sa-4.0": "https://creativecommons.org/licenses/by-sa/4.0/",
    "mit": "https://opensource.org/licenses/MIT",
    "bsd": "https://opensource.org/licenses/BSD-3-Clause",
}

ATTRIBUTION_REQUIRED = {
    "cc-0": False,
    "cc-by-3.0": True,
    "cc-by-4.0": True,
    "cc-by-sa-3.0": True,
    "cc-by-sa-4.0": True,
    "mit": True,
    "bsd": True,
}


def norm(text):
    return re.sub(r"[-_\s]+", " ", text).strip().lower()


def load_metadata():
    """Return {(license, category, author, name): record} from icons.json."""
    meta = {}
    path = ICONS_DIR / "icons.json"
    if path.exists():
        for rec in json.loads(path.read_text(encoding="utf-8")):
            key = (rec.get("license"), rec.get("category"), rec.get("author"), rec.get("name"))
            meta[key] = rec
    authors = {}
    apath = ICONS_DIR / "authors.json"
    if apath.exists():
        authors = json.loads(apath.read_text(encoding="utf-8"))
    return meta, authors


def collect_icons():
    """Yield one dict per SVG under static/icons."""
    meta, authors = load_metadata()
    for svg in sorted(ICONS_DIR.rglob("*.svg")):
        rel = svg.relative_to(ICONS_DIR)
        parts = rel.parts
        if len(parts) < 4:
            continue
        license_id, category, author = parts[0], parts[1], parts[2]
        name = svg.stem
        rec = meta.get((license_id, category, author, name), {})
        yield {
            "name": name,
            "path": str(svg.relative_to(ROOT)).replace("\\", "/"),
            "license": rec.get("license", license_id),
            "license_url": LICENSE_URLS.get(rec.get("license", license_id), ""),
            "attribution_required": ATTRIBUTION_REQUIRED.get(rec.get("license", license_id), True),
            "category": rec.get("category", category),
            "author": rec.get("author", author.replace("_", " ").replace("-", " ")),
            "author_url": authors.get(rec.get("author", author), ""),
            "size_bytes": svg.stat().st_size,
        }


def word_in(word, text):
    """True if word appears in text, also with internal spaces removed
    (so "ion channel" finds "ionchannel-membrane")."""
    w = norm(word)
    return w in text or w.replace(" ", "") in text.replace(" ", "")


def match_rank(icon, words, mode_any):
    """0 = matched in the file name, 1 = only in category or author, None = no match."""
    name = norm(icon["name"])
    other = " ".join([norm(icon["category"]), norm(icon["author"])])
    in_name = [word_in(w, name) for w in words]
    in_any = [word_in(w, name + " " + other) for w in words]
    combine = any if mode_any else all
    if combine(in_name):
        return 0
    if combine(in_any):
        return 1
    return None


def main(argv=None):
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("keywords", nargs="+", help="keywords to search for")
    parser.add_argument("--any", action="store_true", help="match if any keyword matches (default: all)")
    parser.add_argument("--json", action="store_true", help="print JSON instead of a table")
    parser.add_argument("--license", action="append", help="only these licences, e.g. --license cc-0 --license cc-by-4.0")
    args = parser.parse_args(argv)

    if not ICONS_DIR.exists():
        sys.exit(f"Bioicons not found at {ICONS_DIR}. Clone it: git clone --depth 1 https://github.com/duerrsimon/bioicons assets/bioicons")

    words = [w for kw in args.keywords for w in kw.split()] if args.any else args.keywords
    results = []
    for icon in collect_icons():
        rank = match_rank(icon, words, args.any)
        if rank is not None:
            icon["match"] = "name" if rank == 0 else "category/author"
            results.append(icon)
    results.sort(key=lambda i: (i["match"] != "name", i["path"]))
    if args.license:
        allowed = set(args.license)
        results = [i for i in results if i["license"] in allowed]

    if args.json:
        print(json.dumps(results, indent=2))
        return

    if not results:
        print(f"No icons match {' '.join(args.keywords)!r}.")
        return
    print(f"{len(results)} icon(s) match {' '.join(args.keywords)!r}:\n")
    for i in results:
        attr = "attribution required" if i["attribution_required"] else "no attribution required"
        print(f"{i['path']}")
        where = "" if i["match"] == "name" else "  [matched category/author only]"
        print(f"    licence: {i['license']} ({attr})  author: {i['author']}  category: {i['category']}  {i['size_bytes'] // 1024} KB{where}")


if __name__ == "__main__":
    main()
