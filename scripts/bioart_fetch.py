#!/usr/bin/env python3
"""Fetch metadata and SVG files from NIH BioArt Source (bioart.niaid.nih.gov).

The site is a Next.js app. Each detail page /bioart/<id> embeds a React
Server Components payload that contains the title, licence, creator,
keywords, and a "filemapping" of representation group -> {AI, EPS, PNG, SVG}
file ids. Files are served at /api/bioarts/<id>/files/<fileId>.

Usage:
    python scripts/bioart_fetch.py info 424 397        # print metadata
    python scripts/bioart_fetch.py get 424 --out assets/incoming   # download all SVG reps
    python scripts/bioart_fetch.py get 424 --first     # only the first representation
"""

import argparse
import json
import re
import sys
import urllib.request
from pathlib import Path

BASE = "https://bioart.niaid.nih.gov"
UA = {"User-Agent": "Mozilla/5.0 (study-site asset fetch)"}


def fetch(url, binary=False):
    req = urllib.request.Request(url, headers=UA)
    with urllib.request.urlopen(req, timeout=60) as r:
        data = r.read()
    return data if binary else data.decode("utf-8", "replace")


def rsc_text(html):
    # Unescape the JSON-in-script payload so regexes see plain quotes.
    return html.replace('\\"', '"').replace("\u0026", "&").replace("\u003c", "<").replace("\u003e", ">")


def parse_detail(bioart_id):
    html = fetch(f"{BASE}/bioart/{bioart_id}")
    t = rsc_text(html)
    info = {"id": int(bioart_id), "url": f"{BASE}/bioart/{bioart_id}"}
    m = re.search(r'Licensing:.*?<a[^>]*>([^<]+)</a>', html)
    info["license"] = m.group(1).strip() if m else None
    m = re.search(r'"filemapping":(\{.*?\}\})', t)
    info["filemapping"] = json.loads(m.group(1)) if m else {}
    m = re.search(r'"carouselItems":(\[\{.*?\}\])', t)
    reps = []
    if m:
        try:
            for item in json.loads(m.group(1)):
                reps.append({"group": str(item.get("bioartFileGroupId")), "caption": item.get("caption"), "png_name": item.get("name")})
        except json.JSONDecodeError:
            pass
    info["representations"] = reps
    # Title from the first caption ("Pyramidal Neuron - Beige") or <title>.
    if reps and reps[0]["caption"]:
        info["title"] = reps[0]["caption"].split(" - ")[0]
    else:
        m = re.search(r"<title>([^<]*)</title>", html)
        info["title"] = m.group(1) if m else str(bioart_id)
    m = re.search(r'NIAID Visual & Medical Arts\. \(([^)]*)\)\. ([^.]*)\. NIAID NIH BIOART Source', t)
    if m:
        info["title"] = m.group(2)
        info["published"] = m.group(1)
    # Server-rendered "<h6>Label</h6><p>value</p>" pairs in the metadata grid.
    for label in ("Keywords", "Creator", "Credit", "Image Type", "Anatomy", "Cells and Organelles", "Category"):
        m = re.search(r'<h6[^>]*>' + re.escape(label) + r'</h6>\s*<p[^>]*>([^<]*)</p>', html)
        info[label.lower().replace(" ", "_")] = m.group(1).strip() if m else None
    m = re.search(r'"__html":"<p>(.*?)</p>"', t)
    info["description"] = re.sub(r"<[^>]+>", "", m.group(1)) if m else None
    return info


def slug(text):
    return re.sub(r"[^a-z0-9]+", "-", text.lower()).strip("-")


def download(info, out_dir, first_only=False):
    out_dir = Path(out_dir)
    out_dir.mkdir(parents=True, exist_ok=True)
    saved = []
    reps = info["representations"] or [{"group": g, "caption": info["title"]} for g in info["filemapping"]]
    for rep in reps:
        files = info["filemapping"].get(rep["group"], {})
        file_id = files.get("SVG") or files.get("PNG")
        if not file_id:
            continue
        ext = "svg" if files.get("SVG") else "png"
        name = f"bioart-{info['id']:06d}-{slug(rep['caption'] or info['title'])}.{ext}"
        path = out_dir / name
        data = fetch(f"{BASE}/api/bioarts/{info['id']}/files/{file_id}", binary=True)
        path.write_bytes(data)
        saved.append(str(path))
        print(f"saved {path} ({len(data) // 1024} KB)")
        if first_only:
            break
    return saved


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("command", choices=["info", "get"])
    ap.add_argument("ids", nargs="+", type=int)
    ap.add_argument("--out", default="assets/incoming/bioart")
    ap.add_argument("--first", action="store_true", help="download only the first representation")
    args = ap.parse_args()
    for i in args.ids:
        info = parse_detail(i)
        if args.command == "info":
            print(json.dumps({k: v for k, v in info.items() if k not in ("filemapping", "representations")}, indent=1))
            print("  representations:", [r["caption"] for r in info["representations"]])
        else:
            download(info, args.out, args.first)
            meta = Path(args.out) / f"bioart-{i:06d}.json"
            meta.write_text(json.dumps(info, indent=1), encoding="utf-8")


if __name__ == "__main__":
    main()
