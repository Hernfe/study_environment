#!/usr/bin/env python3
"""Trace per-segment skin regions from Figure 12.12 for the dermatome widget.

Reads src/assets/figures/nbe-e4210/L06/dermatomes.webp (made by
figures_nbe-e4210_L06.py), splits the coloured body into the regions
bounded by the figure's own dark lines, and assigns a region to a
segment only where the figure labels it: each seed below is a point on
or next to one of the figure's printed labels or leader-line ends,
read off the picture. A region nobody labels stays unassigned, so the
widget never claims more than the figure shows. Writes
src/content/nbe-e4210/figures/dermatome-regions.js (SVG paths in the
picture's pixel space) and, with --check DIR, one overlay per spinal
group to look at.

Needs opencv-python-headless and numpy.
"""

import argparse
import json
from pathlib import Path

import cv2
import numpy as np

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "src/assets/figures/nbe-e4210/L06/dermatomes.webp"
OUT = ROOT / "src/content/nbe-e4210/figures/dermatome-regions.js"

# Seeds in percent of the picture (x, y). Front view midline x = 25,
# back view midline x = 75.3. Trunk bands are split at the midline by
# their printed labels, so each gets a seed on both sides.
FRONT_TRUNK = {
    "C2": 13.3, "C3": 14.8, "C4": 16.5, "C5": 18.2, "T1": 21.5, "T2": 23.0,
    "T3": 24.3, "T4": 25.6, "T5": 27.3, "T6": 29.3, "T7": 31.3, "T8": 33.0,
    "T9": 35.0, "T10": 37.6, "T11": 40.2, "T12": 42.3, "L1": 44.2,
}
BACK_TRUNK = {
    "C2": 5.5, "C3": 8.3, "C4": 10.8, "C5": 12.8, "C6": 14.7, "C7": 16.5,
    "C8": 18.3, "T1": 20.0, "T2": 21.2, "T3": 22.4, "T4": 23.5, "T5": 24.7,
    "T6": 26.0, "T7": 27.3, "T8": 28.7, "T9": 30.0, "T10": 31.5, "T11": 32.8,
    "T12": 34.0, "L1": 35.2, "L2": 36.6, "L3": 38.0, "L4": 39.5, "L5": 41.0,
}
# Limb seeds: leader-line ends and in-place labels, read on a 1 percent
# grid. Regions bounded by the figure's lines are filled; where the
# figure only points (the hands, the back of the foot), the widget
# shows a marker instead (POINTS).
LIMB_SEEDS = {
    "L2": [(22.5, 51.5)],
    "L3": [(21.6, 56.0), (76.3, 68.4)],
    "L4": [(19.8, 59.5), (77.6, 78.5)],
    "L5": [(19.6, 76.5), (81.3, 62.3)],
    "S1": [(21.6, 87.8), (78.1, 45.5), (79.4, 64.4)],
    "S2": [(78.3, 46.6), (77.6, 66.4)],
    "S3": [(77.3, 47.6)],
    "S4": [(76.3, 49.0)],
    "S5": [(76.1, 49.9)],
}
# Regions the figure labels with a range rather than one segment.
SHARED = {(24.0, 48.0): ["S2", "S3", "S4"]}  # "S2-S4", the genital region
POINTS = {
    "C5": [(10.8, 43.3)],
    "C6": [(8.0, 49.0), (92.8, 48.0)],
    "C7": [(8.8, 52.6), (92.8, 52.8)],
    "C8": [(9.8, 54.8), (91.3, 54.0)],
    "L5": [(75.0, 92.4)],
}
SEGMENTS = (
    [f"C{i}" for i in range(2, 9)] + [f"T{i}" for i in range(1, 13)]
    + [f"L{i}" for i in range(1, 6)] + [f"S{i}" for i in range(1, 6)]
)


# Seeds left out because the figure's printed labels break the line
# between two neighbouring bands there, so one traced region would cover
# both: the back of the head (C2, C3), the left back arm (C6 to T1), T2
# and T3 right of the midline, L2 and L3 on the back, and the two outer
# sacral rings. Each segment keeps its other, properly bounded regions.
SKIP = {
    ("C2", 73.2), ("C2", 77.4), ("C3", 73.2), ("C3", 77.4),
    ("C6", 73.2), ("C7", 73.2), ("C8", 73.2), ("T1", 73.2),
    ("T2", 77.4), ("T3", 77.4),
    ("L2", 73.2), ("L2", 77.4), ("L3", 73.2), ("L3", 77.4),
    ("S1", 78.1), ("S2", 78.3),
}


def seeds_for(seg):
    return [(x, y) for x, y in _seeds_for(seg) if (seg, x) not in SKIP]


def _seeds_for(seg):
    out = []
    if seg in FRONT_TRUNK:
        y = FRONT_TRUNK[seg]
        out += [(22.8, y), (27.2, y)]
    if seg in BACK_TRUNK:
        y = BACK_TRUNK[seg]
        out += [(73.2, y), (77.4, y)]
    out += LIMB_SEEDS.get(seg, [])
    return out


def regions(img):
    hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    line = cv2.dilate((gray < 150).astype(np.uint8), np.ones((3, 3), np.uint8), 1)
    colour = (hsv[..., 1] > 25) & (gray > 120)
    free = ((line == 0) & colour).astype(np.uint8)
    _, lab = cv2.connectedComponents(free, connectivity=4)
    return lab


def nearest_label(lab, x, y, radius=10):
    h, w = lab.shape
    best = None
    for r in range(radius + 1):
        ys, xs = np.mgrid[max(0, y - r):min(h, y + r + 1), max(0, x - r):min(w, x + r + 1)]
        vals = lab[ys, xs]
        nz = vals[vals > 0]
        if nz.size:
            vals_list, counts = np.unique(nz, return_counts=True)
            best = int(vals_list[np.argmax(counts)])
            break
    return best


def paths_for(mask):
    contours, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    out = []
    for c in contours:
        if cv2.contourArea(c) < 40:
            continue
        c = cv2.approxPolyDP(c, 1.2, True)
        pts = c.reshape(-1, 2)
        out.append("M" + "L".join(f"{x},{y}" for x, y in pts) + "Z")
    return " ".join(out)


def main():
    ap = argparse.ArgumentParser(description=__doc__.split("\n")[0])
    ap.add_argument("--check", help="directory for overlay pictures")
    args = ap.parse_args()
    img = cv2.imread(str(SRC))
    h, w = img.shape[:2]
    lab = regions(img)
    claims = {}
    seg_ids = {}
    for seg in SEGMENTS:
        ids = set()
        for sx, sy in seeds_for(seg):
            i = nearest_label(lab, int(sx / 100 * w), int(sy / 100 * h))
            if i is None:
                print(f"warning: {seg} seed ({sx}, {sy}) found no region")
                continue
            claims.setdefault(i, set()).add(seg)
            ids.add(i)
        seg_ids[seg] = ids
    # A region claimed by two segments is one the figure does not split;
    # it goes to neither.
    shared = {i for i, segs in claims.items() if len(segs) > 1}
    for i in sorted(shared):
        print(f"dropped region {i}: claimed by {sorted(claims[i])}")
    for (sx, sy), segs in SHARED.items():
        i = nearest_label(lab, int(sx / 100 * w), int(sy / 100 * h))
        for seg in segs:
            seg_ids[seg].add(i)
        shared.discard(i)
    result = {}
    for seg in SEGMENTS:
        ids = seg_ids[seg] - shared
        if not ids:
            print(f"note: {seg} has no region of its own")
        mask = np.isin(lab, list(ids)).astype(np.uint8)
        # Close the label-text holes and the dilated line gaps.
        mask = cv2.dilate(mask, np.ones((3, 3), np.uint8), 1)
        result[seg] = paths_for(mask) if ids else ""
    points = {seg: [[round(x / 100 * w), round(y / 100 * h)] for x, y in pts] for seg, pts in POINTS.items()}
    OUT.write_text(
        "// Generated by scripts/trace_dermatomes.py from Figure 12.12\n"
        "// (src/assets/figures/nbe-e4210/L06/dermatomes.webp). SVG paths in the\n"
        f"// picture's pixel space ({w} x {h}). A segment covers only the regions\n"
        "// the figure itself labels. Do not edit by hand.\n\n"
        f"export const DERMATOME_SIZE = {{ width: {w}, height: {h} }};\n\n"
        f"export const DERMATOME_PATHS = {json.dumps(result, indent=2)};\n\n"
        "// Leader-line ends where the figure points without drawing a boundary.\n"
        f"export const DERMATOME_POINTS = {json.dumps(points)};\n",
        encoding="utf-8",
    )
    print("wrote", OUT.relative_to(ROOT))
    if args.check:
        d = Path(args.check)
        d.mkdir(parents=True, exist_ok=True)
        palette = [(40, 40, 230), (40, 170, 40), (230, 120, 0), (200, 0, 200)]
        for group in "CTLS":
            over = img.copy()
            segs = [s for s in SEGMENTS if s[0] == group]
            for k, seg in enumerate(segs):
                mask = np.zeros((h, w), np.uint8)
                for p in result[seg].split("Z"):
                    p = p.strip().lstrip("M")
                    if not p:
                        continue
                    pts = np.array([[int(v) for v in q.split(",")] for q in p.split("L")], np.int32)
                    cv2.fillPoly(mask, [pts], 1)
                col = np.array(palette[k % 4])
                over[mask > 0] = (0.35 * over[mask > 0] + 0.65 * col).astype(np.uint8)
                ys, xs = np.nonzero(mask)
                for half in (xs < w / 2, xs >= w / 2):
                    if half.any():
                        cx, cy = int(xs[half].mean()), int(ys[half].mean())
                        cv2.putText(over, seg, (cx - 12, cy + 5), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 0), 2, cv2.LINE_AA)
                        cv2.putText(over, seg, (cx - 12, cy + 5), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 255), 1, cv2.LINE_AA)
            cv2.imwrite(str(d / f"derm-{group}.png"), over)


if __name__ == "__main__":
    main()
