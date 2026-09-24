#!/usr/bin/env python3
"""Pull figures out of a lecture slide PDF with PyMuPDF.

Three commands:

  list    List every embedded image, with page number, pixel size, the
          rectangle it is drawn into (PDF points, origin top-left) and
          its xref, so you can decide what to crop. Ends with the video
          report below.

  videos  Only the video report. PowerPoint exports an embedded video
          without a poster frame as a flat black rectangle. Each slide
          is rendered and scanned for such rectangles; media
          annotations (Screen, Movie, RichMedia) and links to video
          sites or files are reported too. Every hit needs the original
          PPTX or the video file from the student (see
          scripts/video_asset.py and CLAUDE.md, lecture build step 2).

  crop    Render any rectangle of any page at 300 DPI and save it as a
          WebP under 200 KB in src/assets/figures/<lecture>/, with a
          sidecar JSON recording the source file, page, crop box and DPI.

Page numbers are 1-based everywhere. Rectangles are given in PDF points
(the slides are 960 x 540 pt), or as fractions of the page with --frac
(0-1 for x0 y0 x1 y1).

Examples:
  python scripts/extract_figures.py list "source/slides/NBE-E4210 LECTURE 01 - 2026.pdf"
  python scripts/extract_figures.py list "source/slides/NBE-E4210 LECTURE 01 - 2026.pdf" --page 12 --preview
  python scripts/extract_figures.py crop "source/slides/NBE-E4210 LECTURE 01 - 2026.pdf" \\
      --lecture L01 --page 12 --rect 60 90 900 500 --name cortex-lobes
  python scripts/extract_figures.py crop "source/slides/NBE-E4210 LECTURE 01 - 2026.pdf" \\
      --lecture L01 --page 12 --image 1 --name cortex-lobes     # crop to embedded image 1 on that page
  python scripts/extract_figures.py crop ... --page 12 --frac 0 0.15 1 1 --name whole-slide
  python scripts/extract_figures.py videos "source/slides/NBE-E4210 LECTURE 04 - 2026.pdf"

--preview with list writes a low-res PNG of the page(s) with each image
rectangle outlined and numbered, into the scratch directory given by
--preview-dir (default: build/figure-previews/).
"""

import argparse
import io
import json
import re
import sys
from datetime import datetime, timezone
from pathlib import Path

import numpy as np
import pymupdf
from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parent.parent
OUT_ROOT = ROOT / "src" / "assets" / "figures"
DPI = 300
MAX_BYTES = 200 * 1024


def page_index(page_no):
    return page_no - 1


def list_images(doc, pages):
    rows = []
    for pno in pages:
        page = doc[page_index(pno)]
        for idx, info in enumerate(page.get_images(full=True), start=1):
            xref = info[0]
            rects = page.get_image_rects(xref)
            for r in rects:
                rows.append({
                    "page": pno,
                    "image": idx,
                    "xref": xref,
                    "width_px": info[2],
                    "height_px": info[3],
                    "rect": [round(r.x0, 1), round(r.y0, 1), round(r.x1, 1), round(r.y1, 1)],
                    "rect_pt": [round(r.width, 1), round(r.height, 1)],
                    "colorspace": info[5],
                    "filter": info[8],
                })
    return rows


VIDEO_HOSTS = re.compile(r"youtu\.?be|vimeo\.com|panopto|\.(mp4|m4v|mov|wmv|avi|webm|mkv)(\?|$)", re.I)
SCAN_ZOOM = 0.5


def dark_boxes(page):
    """Flat black rectangles on a rendered slide, in PDF points.
    Returns [(rect, kind)] where kind is 'placeholder' (uniform black,
    the PowerPoint export of a video with no poster frame) or 'possible'
    (nearly uniform and very dark, e.g. a video whose poster is a dark
    frame, or a dark photo; check it by eye)."""
    pix = page.get_pixmap(matrix=pymupdf.Matrix(SCAN_ZOOM, SCAN_ZOOM), alpha=False)
    img = np.frombuffer(pix.samples, dtype=np.uint8).reshape(pix.height, pix.width, pix.n)
    lum = img[..., :3].mean(axis=2)
    mask = lum < 20
    page_area = pix.width * pix.height
    boxes = []
    try:
        import cv2
        n, _, stats, _ = cv2.connectedComponentsWithStats(mask.astype(np.uint8), connectivity=4)
        comps = [tuple(int(v) for v in stats[i]) for i in range(1, n)]
    except ImportError:
        # No OpenCV: fall back to the bounding box of all dark pixels.
        ys, xs = np.nonzero(mask)
        comps = [] if not len(xs) else [(int(xs.min()), int(ys.min()), int(xs.max() - xs.min() + 1), int(ys.max() - ys.min() + 1), int(mask.sum()))]
    for x, y, w, h, area in comps:
        if w * h < 0.02 * page_area or w < 40 or h < 30 or w * h > 0.95 * page_area:
            continue
        region = lum[y:y + h, x:x + w]
        fill = area / (w * h)
        if fill >= 0.95 and region.mean() < 8 and region.std() < 4:
            kind = "placeholder"
        elif fill >= 0.85 and region.mean() < 20 and region.std() < 12:
            kind = "possible"
        else:
            continue
        rect = pymupdf.Rect(x / SCAN_ZOOM, y / SCAN_ZOOM, (x + w) / SCAN_ZOOM, (y + h) / SCAN_ZOOM)
        boxes.append((rect, kind))
    return boxes


def find_videos(doc, pages):
    """Rows for the video report: black placeholders, media annotations
    and links to video files or sites, one row per hit, by slide."""
    rows = []
    for pno in pages:
        page = doc[page_index(pno)]
        title = slide_title(page)
        for rect, kind in dark_boxes(page):
            rows.append({"page": pno, "kind": kind, "title": title, "rect": [round(v, 1) for v in rect], "detail": f"black box {rect.width:.0f}x{rect.height:.0f} pt"})
        for annot in page.annots() or []:
            if annot.type[1] in ("Screen", "Movie", "RichMedia", "Sound"):
                r = annot.rect
                rows.append({"page": pno, "kind": "media-annotation", "title": title, "rect": [round(v, 1) for v in r], "detail": annot.type[1]})
        seen = set()
        for link in page.get_links():
            uri = link.get("uri") or ""
            if uri and VIDEO_HOSTS.search(uri) and uri not in seen:
                seen.add(uri)
                r = link["from"]
                rows.append({"page": pno, "kind": "linked", "title": title, "rect": [round(v, 1) for v in r], "detail": uri})
    return rows


def slide_title(page):
    """The largest text line on the slide, as a hint."""
    best = ("", 0)
    for block in page.get_text("dict").get("blocks", []):
        for line in block.get("lines", []):
            text = "".join(span["text"] for span in line["spans"]).strip()
            size = max((span["size"] for span in line["spans"]), default=0)
            if text and size > best[1]:
                best = (text, size)
    return best[0][:60]


VIDEO_LABELS = {
    "placeholder": "EMBEDDED VIDEO exported as a black box: need the PPTX or the video file",
    "possible": "possible video (very dark, uniform box): check the slide, may need the file",
    "media-annotation": "media annotation in the PDF: the clip may be extractable, else need the file",
    "linked": "linked online video: decide whether to embed or link",
}


def print_videos(pdf_name, rows):
    print(f"\nVideo report for {pdf_name}")
    if not rows:
        print("  no video placeholders, media annotations or video links found")
        return
    for r in rows:
        box = ", ".join(str(v) for v in r["rect"])
        print(f"  slide {r['page']:>2}  {VIDEO_LABELS[r['kind']]}")
        print(f"            {r['detail']} at [{box}] pt, title '{r['title']}'")


def write_preview(doc, pages, rows, preview_dir, videos=()):
    preview_dir.mkdir(parents=True, exist_ok=True)
    for pno in pages:
        page = doc[page_index(pno)]
        zoom = 1.0
        pix = page.get_pixmap(matrix=pymupdf.Matrix(zoom, zoom), alpha=False)
        img = Image.frombytes("RGB", (pix.width, pix.height), pix.samples)
        draw = ImageDraw.Draw(img)
        for row in rows:
            if row["page"] != pno:
                continue
            x0, y0, x1, y1 = [v * zoom for v in row["rect"]]
            draw.rectangle([x0, y0, x1, y1], outline=(220, 40, 40), width=2)
            draw.text((x0 + 3, y0 + 2), f"{row['image']}", fill=(220, 40, 40))
        for video in videos:
            if video["page"] != pno or video["kind"] == "linked":
                continue
            x0, y0, x1, y1 = [v * zoom for v in video["rect"]]
            draw.rectangle([x0, y0, x1, y1], outline=(40, 90, 230), width=3)
            draw.text((x0 + 3, y0 + 2), "VIDEO", fill=(40, 90, 230))
        out = preview_dir / f"page-{pno:02d}.png"
        img.save(out)
        print(f"preview {out}")


def resolve_rect(page, args):
    """Return (rect, native_px_width or None)."""
    if args.image:
        infos = page.get_images(full=True)
        if args.image > len(infos):
            sys.exit(f"page {args.page} has only {len(infos)} images")
        rects = page.get_image_rects(infos[args.image - 1][0])
        if not rects:
            sys.exit("that image is not drawn on the page")
        return rects[0], infos[args.image - 1][2]
    if args.frac:
        fx0, fy0, fx1, fy1 = args.frac
        w, h = page.rect.width, page.rect.height
        return pymupdf.Rect(fx0 * w, fy0 * h, fx1 * w, fy1 * h), None
    if args.rect:
        return pymupdf.Rect(*args.rect), None
    return page.rect, None


def encode_webp_under(img, max_bytes):
    """Return (bytes, quality, scale) for the largest WebP under max_bytes.
    Lower quality first, then shrink the image if quality alone is not enough."""
    scale = 1.0
    while True:
        work = img if scale == 1.0 else img.resize((max(1, int(img.width * scale)), max(1, int(img.height * scale))), Image.LANCZOS)
        for quality in (90, 85, 80, 75, 70, 65, 60):
            buf = io.BytesIO()
            work.save(buf, "WEBP", quality=quality, method=6)
            if buf.tell() <= max_bytes:
                return buf.getvalue(), quality, scale
        scale *= 0.85
        if scale < 0.2:
            return buf.getvalue(), quality, scale


def crop(doc, pdf_path, args):
    page = doc[page_index(args.page)]
    rect, native_w = resolve_rect(page, args)
    rect = rect & page.rect
    if rect.is_empty:
        sys.exit("crop rectangle is empty or outside the page")
    # Render at 300 DPI, but never wider than the embedded image's own
    # pixels (upscaling only adds bytes) or --max-px.
    zoom = DPI / 72
    limit = min(args.max_px, native_w or args.max_px)
    if rect.width * zoom > limit:
        zoom = limit / rect.width
    pix = page.get_pixmap(matrix=pymupdf.Matrix(zoom, zoom), clip=rect, alpha=False)
    img = Image.frombytes("RGB", (pix.width, pix.height), pix.samples)
    data, quality, scale = encode_webp_under(img, MAX_BYTES)

    out_dir = OUT_ROOT / args.lecture
    out_dir.mkdir(parents=True, exist_ok=True)
    name = args.name or f"p{args.page:02d}-{int(rect.x0)}-{int(rect.y0)}"
    name = re.sub(r"[^a-z0-9-]+", "-", name.lower()).strip("-")
    webp_path = out_dir / f"{name}.webp"
    json_path = out_dir / f"{name}.json"
    webp_path.write_bytes(data)
    sidecar = {
        "file": webp_path.relative_to(ROOT).as_posix(),
        "source": pdf_path.relative_to(ROOT).as_posix() if pdf_path.is_relative_to(ROOT) else str(pdf_path),
        "page": args.page,
        "crop_box_pt": [round(rect.x0, 2), round(rect.y0, 2), round(rect.x1, 2), round(rect.y1, 2)],
        "page_size_pt": [round(page.rect.width, 2), round(page.rect.height, 2)],
        "dpi": round(zoom * 72),
        "rendered_px": [pix.width, pix.height],
        "saved_px": [int(pix.width * scale), int(pix.height * scale)],
        "webp_quality": quality,
        "bytes": len(data),
        "extracted": datetime.now(timezone.utc).isoformat(timespec="seconds"),
        "note": "Course slide material. Redraw or replace before publishing; see CREDITS.md.",
    }
    json_path.write_text(json.dumps(sidecar, indent=1), encoding="utf-8")
    print(f"saved {webp_path} ({len(data) // 1024} KB, q{quality}, scale {scale:.2f}, {sidecar['saved_px'][0]}x{sidecar['saved_px'][1]} px)")
    print(f"sidecar {json_path}")


def parse_pages(spec, count):
    if not spec:
        return list(range(1, count + 1))
    pages = set()
    for part in spec.split(","):
        if "-" in part:
            a, b = part.split("-")
            pages.update(range(int(a), int(b) + 1))
        else:
            pages.add(int(part))
    return sorted(p for p in pages if 1 <= p <= count)


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = ap.add_subparsers(dest="command", required=True)

    lp = sub.add_parser("list", help="list embedded images")
    lp.add_argument("pdf")
    lp.add_argument("--page", help="page or range, e.g. 5 or 3-8 or 2,5,9 (default all)")
    lp.add_argument("--json", action="store_true")
    lp.add_argument("--preview", action="store_true", help="write annotated page PNGs")
    lp.add_argument("--preview-dir", default=str(ROOT / "build" / "figure-previews"))

    vp = sub.add_parser("videos", help="report video placeholders and video links by slide")
    vp.add_argument("pdf")
    vp.add_argument("--page", help="page or range (default all)")
    vp.add_argument("--json", action="store_true")

    cp = sub.add_parser("crop", help="render a rectangle to webp")
    cp.add_argument("pdf")
    cp.add_argument("--lecture", required=True, help="output folder name, e.g. L01")
    cp.add_argument("--page", type=int, required=True)
    cp.add_argument("--name", help="output file stem (default from page and box)")
    cp.add_argument("--max-px", type=int, default=1600, help="cap on output width in pixels (default 1600)")
    g = cp.add_mutually_exclusive_group()
    g.add_argument("--rect", type=float, nargs=4, metavar=("X0", "Y0", "X1", "Y1"), help="crop box in PDF points")
    g.add_argument("--frac", type=float, nargs=4, metavar=("FX0", "FY0", "FX1", "FY1"), help="crop box as page fractions")
    g.add_argument("--image", type=int, help="crop to embedded image N on the page (from list)")

    args = ap.parse_args()
    pdf_path = Path(args.pdf).resolve()
    if not pdf_path.exists():
        sys.exit(f"not found: {pdf_path}")
    doc = pymupdf.open(pdf_path)

    if args.command == "list":
        pages = parse_pages(args.page, doc.page_count)
        rows = list_images(doc, pages)
        videos = find_videos(doc, pages)
        if args.json:
            print(json.dumps({"images": rows, "videos": videos}, indent=1))
        else:
            print(f"{pdf_path.name}: {doc.page_count} pages, page size {page_size(doc)}; {len(rows)} placed images")
            for r in rows:
                print(f"  p{r['page']:02d} img {r['image']}  {r['width_px']}x{r['height_px']} px  at [{', '.join(str(v) for v in r['rect'])}] pt  ({r['rect_pt'][0]}x{r['rect_pt'][1]} pt)  {r['colorspace']} {r['filter']}")
            print_videos(pdf_path.name, videos)
        if args.preview:
            write_preview(doc, pages, rows, Path(args.preview_dir), videos)
    elif args.command == "videos":
        pages = parse_pages(args.page, doc.page_count)
        videos = find_videos(doc, pages)
        if args.json:
            print(json.dumps(videos, indent=1))
        else:
            print_videos(pdf_path.name, videos)
    else:
        crop(doc, pdf_path, args)


def page_size(doc):
    r = doc[0].rect
    return f"{r.width:.0f}x{r.height:.0f} pt"


if __name__ == "__main__":
    main()
