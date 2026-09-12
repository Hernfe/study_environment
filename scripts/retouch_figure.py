#!/usr/bin/env python3
"""Prepare figure assets for the site: paint out burned-in labels, crop,
compose panels, and rasterise SVG illustrations. Every command writes a
WebP under 200 KB and records what it did in the sidecar JSON next to
the output (the same sidecar format as extract_figures.py, with an extra
"retouch" list).

Boxes and crops are given as percentages of the input image: x0 y0 x1 y1.

Commands:
  paint  IN OUT --box x0 y0 x1 y1 [--box ...] [--color auto|#rrggbb]
         Fill boxes with a flat colour (default: sampled from the box's
         top-left corner) to remove printed labels or leader lines.
  smear  IN OUT --box x0 y0 x1 y1 [--box ...] [--dir left|right|up|down]
         Fill each box by extending the pixels just outside its left
         (right, top, bottom) edge across it, so a label on a gradient
         background disappears without a flat patch.
  erase  IN OUT [--line x0 y0 x1 y1 ...] [--box x0 y0 x1 y1 ...] [--width PX]
         Inpaint thin leader-line stubs that cross the artwork (OpenCV
         Telea inpainting under a mask of the given segments), so the
         hotspot widget can draw its own leaders. --box inpaints a whole
         rectangle: use it for a label printed over shaded artwork,
         where a flat paint would show.
  crop   IN OUT --box x0 y0 x1 y1
         Keep only the box.
  compose OUT --panel IN [--panel ...] [--cols N] [--gap PX] [--height PX]
         Place panels left to right (wrapping after N columns), each
         scaled to the same height, on a white ground.
  svg2png IN OUT [--width PX]
         Render an SVG. Illustrator exports (NIH BioArt) put fills in a
         <style> block that MuPDF ignores, so class fills are inlined first.

Examples:
  python scripts/retouch_figure.py paint src/assets/figures/L01/lobes.webp src/assets/figures/L01/lobes.webp --box 0 0 12 8
  python scripts/retouch_figure.py compose src/assets/figures/L01/stains.webp --panel a.webp --panel b.webp --panel c.webp --height 600
"""

import argparse
import io
import json
import re
import sys
from datetime import datetime, timezone
from pathlib import Path

import pymupdf
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
MAX_BYTES = 200 * 1024


def load(path):
    """Open any image as RGB; transparent pixels become white."""
    im = Image.open(path)
    if im.mode in ("RGBA", "LA") or (im.mode == "P" and "transparency" in im.info):
        im = im.convert("RGBA")
        bg = Image.new("RGBA", im.size, (255, 255, 255, 255))
        bg.alpha_composite(im)
        return bg.convert("RGB")
    return im.convert("RGB")


def encode_webp_under(img, max_bytes=MAX_BYTES):
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


def rel(path):
    p = Path(path).resolve()
    return p.relative_to(ROOT).as_posix() if p.is_relative_to(ROOT) else str(path)


def sidecar_for(path):
    return Path(path).with_suffix(".json")


def read_sidecar(path):
    p = sidecar_for(path)
    if p.exists():
        try:
            return json.loads(p.read_text(encoding="utf-8"))
        except json.JSONDecodeError:
            return {}
    return {}


def save(img, out, meta, step):
    out = Path(out)
    out.parent.mkdir(parents=True, exist_ok=True)
    data, quality, scale = encode_webp_under(img)
    out.write_bytes(data)
    meta = dict(meta)
    meta["file"] = rel(out)
    meta["saved_px"] = [int(img.width * scale), int(img.height * scale)]
    meta["webp_quality"] = quality
    meta["bytes"] = len(data)
    meta.setdefault("retouch", []).append({**step, "at": datetime.now(timezone.utc).isoformat(timespec="seconds")})
    sidecar_for(out).write_text(json.dumps(meta, indent=1), encoding="utf-8")
    print(f"saved {out} ({len(data) // 1024} KB, {meta['saved_px'][0]}x{meta['saved_px'][1]} px)")


def pct_box(img, box):
    x0, y0, x1, y1 = box
    return (int(img.width * x0 / 100), int(img.height * y0 / 100), int(img.width * x1 / 100), int(img.height * y1 / 100))


def border_mode(img, px):
    """Most common colour on the perimeter of the box, quantised so JPEG
    noise around white still counts as one colour."""
    from collections import Counter
    x0, y0, x1, y1 = px
    pts = [(x, y0) for x in range(x0, x1)] + [(x, max(y0, y1 - 1)) for x in range(x0, x1)] + [(x0, y) for y in range(y0, y1)] + [(max(x0, x1 - 1), y) for y in range(y0, y1)]
    counts = Counter(tuple(c // 8 * 8 for c in img.getpixel((min(max(x, 0), img.width - 1), min(max(y, 0), img.height - 1)))) for x, y in pts)
    c = counts.most_common(1)[0][0]
    return tuple(min(255, v + 4) for v in c)


def cmd_paint(args):
    img = load(args.input)
    meta = read_sidecar(args.input)
    for box in args.box:
        px = pct_box(img, box)
        color = border_mode(img, px) if args.color == "auto" else tuple(int(args.color.lstrip("#")[i:i + 2], 16) for i in (0, 2, 4))
        img.paste(color, px)
    save(img, args.output, meta, {"op": "paint", "boxes_pct": args.box, "color": args.color})


def cmd_smear(args):
    import numpy as np
    img = load(args.input)
    meta = read_sidecar(args.input)
    arr = np.array(img.convert("RGB"))
    for box in args.box:
        x0, y0, x1, y1 = pct_box(img, box)
        if args.dir == "left":
            arr[y0:y1, x0:x1] = arr[y0:y1, max(x0 - 1, 0):max(x0, 1)]
        elif args.dir == "right":
            arr[y0:y1, x0:x1] = arr[y0:y1, min(x1, img.width - 1):min(x1 + 1, img.width)]
        elif args.dir == "up":
            arr[y0:y1, x0:x1] = arr[max(y0 - 1, 0):max(y0, 1), x0:x1]
        else:
            arr[y0:y1, x0:x1] = arr[min(y1, img.height - 1):min(y1 + 1, img.height), x0:x1]
    save(Image.fromarray(arr), args.output, meta, {"op": "smear", "boxes_pct": args.box, "dir": args.dir})


def cmd_erase(args):
    import cv2
    import numpy as np
    img = load(args.input)
    meta = read_sidecar(args.input)
    arr = np.array(img.convert("RGB"))
    mask = np.zeros(arr.shape[:2], dtype=np.uint8)
    for x0, y0, x1, y1 in args.line or []:
        p0 = (int(img.width * x0 / 100), int(img.height * y0 / 100))
        p1 = (int(img.width * x1 / 100), int(img.height * y1 / 100))
        cv2.line(mask, p0, p1, 255, args.width)
    for box in args.box or []:
        x0, y0, x1, y1 = pct_box(img, box)
        mask[y0:y1, x0:x1] = 255
    for box in args.text or []:
        # Only the dark, thick strokes inside the box (printed text), so
        # that thin outlines of the artwork under the text survive.
        x0, y0, x1, y1 = pct_box(img, box)
        gray = cv2.cvtColor(arr[y0:y1, x0:x1], cv2.COLOR_RGB2GRAY)
        dark = (gray < args.threshold).astype(np.uint8) * 255
        k = np.ones((args.open_px, args.open_px), np.uint8)
        thick = cv2.morphologyEx(dark, cv2.MORPH_OPEN, k)
        thick = cv2.dilate(thick, np.ones((args.grow_px, args.grow_px), np.uint8))
        mask[y0:y1, x0:x1] = np.maximum(mask[y0:y1, x0:x1], thick)
    out = cv2.inpaint(arr, mask, args.radius, cv2.INPAINT_TELEA)
    save(Image.fromarray(out), args.output, meta, {"op": "erase", "lines_pct": args.line, "boxes_pct": args.box, "text_pct": args.text, "width_px": args.width})


def cmd_crop(args):
    img = load(args.input)
    meta = read_sidecar(args.input)
    img = img.crop(pct_box(img, args.box))
    save(img, args.output, meta, {"op": "crop", "box_pct": args.box})


def cmd_compose(args):
    panels = [load(p) for p in args.panel]
    h = args.height
    scaled = [p.resize((max(1, round(p.width * h / p.height)), h), Image.LANCZOS) for p in panels]
    cols = args.cols or len(scaled)
    rows = [scaled[i:i + cols] for i in range(0, len(scaled), cols)]
    width = max(sum(p.width for p in r) + args.gap * (len(r) - 1) for r in rows)
    height = h * len(rows) + args.gap * (len(rows) - 1)
    out = Image.new("RGB", (width, height), "white")
    layout = []
    y = 0
    for r in rows:
        x = 0
        for p in r:
            out.paste(p, (x, y))
            layout.append({"x_pct": round(100 * x / width, 2), "y_pct": round(100 * y / height, 2), "w_pct": round(100 * p.width / width, 2), "h_pct": round(100 * p.height / height, 2)})
            x += p.width + args.gap
        y += h + args.gap
    meta = {"sources": [{"file": rel(p), **{k: v for k, v in read_sidecar(p).items() if k in ("source", "page", "crop_box_pt")}} for p in args.panel], "panels_pct": layout}
    save(out, args.output, meta, {"op": "compose", "cols": cols, "gap": args.gap, "height": h})


def inline_svg_classes(svg_text):
    """Turn .cls-1{fill:#abc;} rules into fill attributes on the elements."""
    rules = {}
    for m in re.finditer(r"\.([\w-]+)\s*\{([^}]*)\}", svg_text):
        rules[m.group(1)] = m.group(2)

    def repl(m):
        cls = m.group(1)
        style = rules.get(cls)
        if not style:
            return m.group(0)
        return f'style="{style}"'

    return re.sub(r'class="([\w-]+)"', repl, svg_text)


def cmd_svg2png(args):
    text = Path(args.input).read_text(encoding="utf-8")
    text = inline_svg_classes(text)
    doc = pymupdf.open(stream=text.encode("utf-8"), filetype="svg")
    page = doc[0]
    zoom = args.width / page.rect.width
    pix = page.get_pixmap(matrix=pymupdf.Matrix(zoom, zoom), alpha=False)
    img = Image.frombytes("RGB", (pix.width, pix.height), pix.samples)
    if args.trim:
        from PIL import ImageChops
        bg = Image.new("RGB", img.size, (255, 255, 255))
        bbox = ImageChops.difference(img, bg).getbbox()
        if bbox:
            pad = int(0.02 * max(img.size))
            img = img.crop((max(0, bbox[0] - pad), max(0, bbox[1] - pad), min(img.width, bbox[2] + pad), min(img.height, bbox[3] + pad)))
    meta = {"source": rel(args.input)}
    save(img, args.output, meta, {"op": "svg2png", "width": args.width})


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = ap.add_subparsers(dest="command", required=True)

    p = sub.add_parser("paint")
    p.add_argument("input"); p.add_argument("output")
    p.add_argument("--box", type=float, nargs=4, action="append", required=True, metavar=("X0", "Y0", "X1", "Y1"))
    p.add_argument("--color", default="auto")
    p.set_defaults(fn=cmd_paint)

    sm = sub.add_parser("smear")
    sm.add_argument("input")
    sm.add_argument("output")
    sm.add_argument("--box", type=float, nargs=4, action="append", required=True, metavar=("X0", "Y0", "X1", "Y1"))
    sm.add_argument("--dir", default="left", choices=["left", "right", "up", "down"])
    sm.set_defaults(fn=cmd_smear)

    e = sub.add_parser("erase")
    e.add_argument("input"); e.add_argument("output")
    e.add_argument("--line", type=float, nargs=4, action="append", required=False, metavar=("X0", "Y0", "X1", "Y1"))
    e.add_argument("--box", type=float, nargs=4, action="append", required=False, metavar=("X0", "Y0", "X1", "Y1"))
    e.add_argument("--text", type=float, nargs=4, action="append", required=False, metavar=("X0", "Y0", "X1", "Y1"), help="inpaint only thick dark strokes (printed text) inside the box")
    e.add_argument("--threshold", type=int, default=110, help="--text: grey level below which a pixel counts as ink")
    e.add_argument("--open-px", dest="open_px", type=int, default=4, help="--text: strokes thinner than this survive")
    e.add_argument("--grow-px", dest="grow_px", type=int, default=5, help="--text: dilate the text mask by this much")
    e.add_argument("--width", type=int, default=7, help="mask thickness in px")
    e.add_argument("--radius", type=int, default=5, help="inpaint radius in px")
    e.set_defaults(fn=cmd_erase)

    c = sub.add_parser("crop")
    c.add_argument("input"); c.add_argument("output")
    c.add_argument("--box", type=float, nargs=4, required=True, metavar=("X0", "Y0", "X1", "Y1"))
    c.set_defaults(fn=cmd_crop)

    m = sub.add_parser("compose")
    m.add_argument("output")
    m.add_argument("--panel", action="append", required=True)
    m.add_argument("--cols", type=int, default=0)
    m.add_argument("--gap", type=int, default=40)
    m.add_argument("--height", type=int, default=600)
    m.set_defaults(fn=cmd_compose)

    s = sub.add_parser("svg2png")
    s.add_argument("input"); s.add_argument("output")
    s.add_argument("--width", type=int, default=1200)
    s.add_argument("--trim", action="store_true", help="crop away white margins")
    s.set_defaults(fn=cmd_svg2png)

    args = ap.parse_args()
    args.fn(args)


if __name__ == "__main__":
    main()
