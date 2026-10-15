#!/usr/bin/env python3
"""Build every raster figure asset for Lecture 6 from the sources.

Reproducible record of where each file in src/assets/figures/nbe-e4210/L06
comes from. Rerun after changing a crop or paint box. Steps use
extract_figures.py (slide crops) and retouch_figure.py (paint out
burned-in labels, inpaint leader stubs, sub-crop).

Source: the L06 slide deck (course material). Most figures are Bear,
Connors and Paradiso textbook figures (chapters 12 to 14) as shown on
the slides; S44 is from Kandel et al. 2013 and S50 from Meier et al.
2008, both as shown on the slides and named in CREDITS.md. S6 holds a
black placed image (probably an embedded clip) and S34 a full-bleed
muscle render (probably a video still); neither is used. The control
diagrams of S42 and S43 are vector drawings; the control-loop widget
redraws them instead. The dermatome regions used by the dermatome
widget are traced from dermatomes.webp by scripts/trace_dermatomes.py.
"""

import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PDF = ROOT / "source/nbe-e4210/slides/NBE-E4210 LECTURE 06 - 2026.pdf"
F = ROOT / "src/assets/figures/nbe-e4210/L06"
PY = sys.executable


def run(*args):
    cmd = [PY, *[str(a) for a in args]]
    print("+", " ".join(cmd[1:]))
    subprocess.run(cmd, check=True, cwd=ROOT)


def extract(page, image, name):
    run("scripts/extract_figures.py", "crop", PDF, "--course", "nbe-e4210", "--lecture", "L06", "--page", page, "--image", image, "--name", name)


def paint(name, boxes, out=None, color="#ffffff"):
    args = ["scripts/retouch_figure.py", "paint", F / f"{name}.webp", F / f"{out or name}.webp", "--color", color]
    for b in boxes:
        args += ["--box", *b]
    run(*args)


def erase(name, lines, width=9, out=None):
    args = ["scripts/retouch_figure.py", "erase", F / f"{name}.webp", F / f"{out or name}.webp", "--width", width]
    for line in lines:
        args += ["--line", *line]
    run(*args)


def leaders(name, lines, corridor=40, out=None):
    """Grey leader lines known only roughly: inpaint the grey pixels in a
    corridor along each line (retouch_figure.py erase --leader)."""
    args = ["scripts/retouch_figure.py", "erase", F / f"{name}.webp", F / f"{out or name}.webp", "--corridor", corridor]
    for line in lines:
        args += ["--leader", *line]
    run(*args)


def text(name, boxes, out=None):
    """Inpaint printed text only (thick dark strokes) inside each box."""
    args = ["scripts/retouch_figure.py", "erase", F / f"{name}.webp", F / f"{out or name}.webp"]
    for b in boxes:
        args += ["--text", *b]
    run(*args)


def inpaint(name, boxes, out=None):
    args = ["scripts/retouch_figure.py", "erase", F / f"{name}.webp", F / f"{out or name}.webp"]
    for b in boxes:
        args += ["--box", *b]
    run(*args)


def degreen(name, box):
    """Whiten green pixels (the slide's arrow tip) inside a box given in
    percent of the image, leaving the figure's frame line alone."""
    from PIL import Image
    path = F / f"{name}.webp"
    im = Image.open(path).convert("RGB")
    w, h = im.size
    px = im.load()
    for x in range(int(box[0] * w / 100), int(box[2] * w / 100)):
        for y in range(int(box[1] * h / 100), int(box[3] * h / 100)):
            r, g, b = px[x, y]
            if g > r + 20 and g > b + 10:
                px[x, y] = (255, 255, 255)
    im.save(path, "WEBP", quality=88)


def reframe(name, x0, x1):
    """Redraw the figure's top frame line between x0 and x1 (percent),
    copying the frame row from just left of the gap."""
    from PIL import Image
    path = F / f"{name}.webp"
    im = Image.open(path).convert("RGB")
    w, h = im.size
    px = im.load()
    xs = int(x0 * w / 100)
    rows = [y for y in range(0, int(0.04 * h)) if sum(px[xs, y]) < 600]
    for y in rows:
        c = px[xs, y]
        for x in range(xs, int(x1 * w / 100)):
            px[x, y] = c
    im.save(path, "WEBP", quality=88)


def crop(name, box, out=None):
    run("scripts/retouch_figure.py", "crop", F / f"{name}.webp", F / f"{out or name}.webp", "--box", *box)


# 1. Raw extractions (slide, placed image, name).
RAW = [
    # Part 1, somatic sensation (chapter 12)
    (8, 2, "skin"),                # Figure 12.1, skin receptors
    (9, 2, "rf-recording"),        # Figure 12.2a, microneurography
    (9, 3, "rf-hands"),            # Figure 12.2b, Meissner and Pacinian fields
    (10, 2, "mech-table"),         # Figure 12.3, field size by adaptation
    (10, 3, "freq-tuning"),        # Figure 12.4, threshold by frequency
    (11, 2, "pacinian"),           # Figure 12.5, intact and stripped corpuscle
    (12, 2, "mech-channels"),      # Figure 12.6, three channel types
    (13, 3, "spinal-roots"),       # Figure 12.9, segment and roots
    (14, 2, "fibre-classes"),      # Figure 12.10, afferent axon sizes
    (15, 2, "segments"),           # Figure 12.11, segmental organization
    (16, 2, "dermatomes"),         # Figure 12.12, dermatomes front and back
    (17, 2, "dcml"),               # Figure 12.15, dorsal column-medial lemniscal
    (17, 3, "dorsal-horn"),        # Figure 12.14, A-beta trajectory
    (18, 2, "trigeminal"),         # Figure 12.16, trigeminal pathway
    (19, 2, "s1-areas"),           # Figure 12.17, areas 3a, 3b, 1, 2, 5, 7
    (20, 2, "s1-columns"),         # Figure 12.18, columns in area 3b
    (21, 2, "homunculus"),         # Figure 12.19, somatotopic map
    (23, 2, "plasticity"),         # Figure 12.23, map plasticity
    (26, 2, "pain-soup"),          # Figure 12.25, inflammatory mediators
    (27, 2, "spinothalamic"),      # Figure 12.30, spinothalamic pathway
    (27, 3, "two-pathways"),       # Figure 12.31, both ascending pathways
    (28, 2, "pag"),                # Figure 12.34, descending pain control
    (28, 3, "gate"),               # Figure 12.33, gate theory
    (30, 2, "trp"),                # Figure 12.35, thermosensitive TRP channels
    (31, 2, "thermo-adapt"),       # Figure 12.36, cold and warm receptors
    # Part 2, spinal control (chapter 13)
    (33, 2, "muscle"),             # Figure 13.1, muscle and its axons
    (33, 3, "muscle-structure"),   # muscle to myofilaments (Komi 2003)
    (36, 2, "motor-unit"),         # Figure 13.7, motor unit and pool
    (36, 3, "twitch-summation"),   # Figure 13.8, twitch to tetanus
    (36, 4, "mu-types"),           # Figure 13.10, three motor unit types
    (38, 2, "lmn-inputs"),         # Figure 13.9, three inputs
    (38, 3, "alpha-gamma"),        # Figure 13.20, alpha and gamma targets
    (39, 2, "lmn"),                # Figure 13.4, lower motor neurons
    (39, 3, "ventral-horn-map"),   # Figure 13.6, layout of the ventral horn
    (40, 2, "spindle"),            # Figure 13.21, alpha-gamma coactivation
    (41, 2, "gto-series"),         # Figure 13.23, spindle and tendon organ
    (41, 3, "gto"),                # Figure 13.22, Golgi tendon organ
    # Part 3, brain control (chapter 14)
    (44, 2, "hierarchy"),          # Kandel 2013, basal ganglia and cerebellar loops
    (45, 3, "tracts-section"),     # Figure 14.2, tracts in cross section
    (45, 2, "tracts-summary"),     # Figure 14.6, summary of the tracts
    (46, 2, "motor-map"),          # Figure 14.8 with the sensory map
    (47, 2, "motor-areas"),        # Figure 14.7, motor areas
    (48, 3, "bg-loop"),            # Figure 14.14 (adapted), direct and indirect
    (49, 2, "cerebellar-loop"),    # Figure 14.22, lateral cerebellar loop
    (49, 3, "corticospinal-pools"),  # Figure 14.15, layer V to motor pools
    (50, 2, "fmri-map"),           # Meier et al. 2008, winner-take-all maps
]


def skin():
    """Figure 12.1: receptor labels and their leaders removed for the
    hotspot quiz; the label column is cropped off. Epidermis, dermis and
    the hairy and glabrous skin brackets stay."""
    leaders("skin", [
        [16, 21.5, 66, 38.5],    # Merkel's disk
        [17, 33.5, 34.5, 40],    # free nerve ending
        [23.5, 48, 42, 46.5],    # epidermal-dermal border
        [17.5, 56.5, 57.5, 46.5],  # Meissner's corpuscle
        [19, 69, 45, 57],        # hair follicle receptor
        [16.5, 81, 33, 73],      # Pacinian corpuscle
        [13, 92.5, 53, 77],      # Ruffini's ending
    ], corridor=30)
    crop("skin", [26.5, 0, 100, 100])


def spinal_roots():
    """Figure 12.9: a segment with its roots, labels painted out for the
    label question."""
    paint("spinal-roots", [
        [6, 3, 26, 13], [42, 0, 59, 8], [58, 16, 74, 24], [65, 27, 93, 35],
        [69, 36, 90, 49], [83, 52, 97, 65], [52, 78, 64, 94], [67, 78, 81, 94],
        [16, 8, 20, 16],   # stub of the grey matter leader
    ])
    leaders("spinal-roots", [
        [21, 11, 24, 32], [44, 7, 38, 29], [60, 23, 57, 32], [66, 34, 63, 38],
        [70, 43, 64, 46], [88, 64, 87, 72], [57, 78, 60, 65], [70, 78, 70, 65],
    ], corridor=24)
    crop("spinal-roots", [0, 9, 96, 84])  # trim the empty margins


def dorsal_horn():
    """Figure 12.14: dorsal columns, horns and the A-beta axon, labels
    painted out for the hotspot quiz. "To brain" stays."""
    paint("dorsal-horn", [[12, 0, 40, 7], [8, 16, 21, 30], [0, 85, 19, 99], [19, 91, 39, 100], [85, 52, 100, 61]])
    leaders("dorsal-horn", [
        [27, 6, 30, 28], [29, 6, 42, 26], [17, 28, 22, 46], [12, 86, 29, 57],
        [24, 92, 27, 69], [89, 61, 87, 73],
    ], corridor=24)


def bg_loop():
    """Figure 14.14 as adapted on slide 48. The slide draws the striatum
    to GPe connection as a green, excitatory arrow with a plus; the TA
    notes (7.3) and the textbook (p. 500) say it is inhibitory. The arrow
    is recoloured to the slide's red and the plus becomes a minus."""
    from PIL import Image, ImageDraw
    path = F / "bg-loop.webp"
    im = Image.open(path).convert("RGB")
    w, h = im.size
    px = im.load()
    x0, x1, y0, y1 = int(0.52 * w), int(0.58 * w), int(0.405 * h), int(0.495 * h)
    for x in range(x0, x1):
        for y in range(y0, y1):
            r, g, b = px[x, y]
            if g > r + 25 and g > b + 25:   # the green arrow
                px[x, y] = (226, 30, 80)
    d = ImageDraw.Draw(im)
    bx0, by0, bx1, by1 = int(0.595 * w), int(0.44 * h), int(0.625 * w), int(0.48 * h)
    d.rectangle([bx0, by0, bx1, by1], fill=px[bx1 + 2, by0])
    cy = (by0 + by1) // 2
    cx = (bx0 + bx1) // 2
    d.line([cx - 6, cy, cx + 6, cy], fill=(30, 30, 30), width=2)
    im.save(path, "WEBP", quality=88)


def main():
    F.mkdir(parents=True, exist_ok=True)
    for page, image, name in RAW:
        extract(page, image, name)
    skin()
    spinal_roots()
    dorsal_horn()
    bg_loop()
    # Slide text, captions and stray marks that spill into the crops; the
    # page gives captions itself.
    paint("dcml", [[88, 88, 100, 100]])
    crop("dcml", [0, 0, 97, 100])
    crop("gate", [6, 28.6, 100, 100])
    degreen("gate", [40, 0, 75, 6])
    paint("gate", [[45, 0, 70, 0.9]])  # the arrow outline above the frame
    paint("gate", [[54.5, 2.0, 61, 4.4]])  # the tip below it, above the label
    inpaint("gate", [[56.3, 0.4, 60.7, 2.3]])  # where the tip crossed the frame
    reframe("gate", 54, 63)
    crop("homunculus", [41, 4, 100, 100])
    paint("homunculus", [[0, 0, 12, 12], [8, 18, 18, 24], [0, 25, 4.5, 39]])
    paint("motor-areas", [[30, 95, 70, 100]])
    crop("motor-areas", [0, 0, 100, 95])
    paint("motor-map", [[72, 2, 100, 21], [27, 79, 43, 86], [53, 79, 69, 86]])
    crop("motor-map", [0, 0, 97, 100])
    paint("spindle", [[60, 0, 100, 6], [80, 95, 100, 100]])
    paint("spinothalamic", [[94, 27, 98, 41]])
    crop("fmri-map", [0, 0, 100, 75])
    crop("rf-hands", [0, 0, 100, 86])


if __name__ == "__main__":
    main()
