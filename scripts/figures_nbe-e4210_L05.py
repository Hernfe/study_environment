#!/usr/bin/env python3
"""Build every raster figure asset for Lecture 5 from the sources.

Reproducible record of where each file in src/assets/figures/nbe-e4210/L05
comes from. Rerun after changing a crop or paint box. Steps use
extract_figures.py (slide crops) and retouch_figure.py (paint out
burned-in labels, inpaint leader stubs, sub-crop).

Source: the L05 slide deck (course material). Most figures are Bear,
Connors and Paradiso textbook figures as shown on the slides; the
organ of Corti drawing (slide 18) and the tonotopy spiral (slide 14)
are slide graphics of unknown origin, named in CREDITS.md. The deck
links 3D models, simulations and videos instead of embedding clips;
nothing is extracted from those. Slides 5, 9, 11, 15 and 29 hold
AI-generated pictures (slide 11 says its cochlea is not accurate); none
is used.
"""

import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PDF = ROOT / "source/nbe-e4210/slides/NBE-E4210 LECTURE 05 - 2026.pdf"
F = ROOT / "src/assets/figures/nbe-e4210/L05"
PY = sys.executable


def run(*args):
    cmd = [PY, *[str(a) for a in args]]
    print("+", " ".join(cmd[1:]))
    subprocess.run(cmd, check=True, cwd=ROOT)


def extract(page, image, name):
    run("scripts/extract_figures.py", "crop", PDF, "--course", "nbe-e4210", "--lecture", "L05", "--page", page, "--image", image, "--name", name)


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


def inpaint(name, boxes, out=None):
    """Inpaint whole label boxes that sit over shaded artwork."""
    args = ["scripts/retouch_figure.py", "erase", F / f"{name}.webp", F / f"{out or name}.webp"]
    for b in boxes:
        args += ["--box", *b]
    run(*args)


def crop(name, box, out=None):
    run("scripts/retouch_figure.py", "crop", F / f"{name}.webp", F / f"{out or name}.webp", "--box", *box)


# 1. Raw extractions (slide, placed image, name).
RAW = [
    (4, 1, "sound-wave"),        # compression bands and the sine, amplitude, wavelength
    (6, 1, "ear"),               # Figure 11.3, outer, middle, inner ear
    (8, 1, "middle-ear"),        # Figure 11.6, ossicles, muscles, windows
    (10, 1, "cochlea-uncoiled"), # Figure 11.8, uncoiled cochlea (with coiling sketch)
    (12, 1, "scalae"),           # Figure 11.7, cross section with the ear inset
    (14, 2, "tonotopy-spiral"),  # characteristic frequency along the spiral
    (16, 1, "traveling-wave"),   # Figure 11.9
    (18, 1, "corti"),            # organ of Corti drawing with labels
    (19, 1, "transduction"),     # Figure 11.15
    (20, 1, "shear"),            # Figure 11.13 a and b
    (24, 1, "ohc-motor"),        # Figure 11.17 a and b
    (24, 3, "innervation"),      # Figure 11.16
    (31, 1, "phase-lock"),       # sound pressure and receptor potential
    (32, 2, "spiral-ganglion"),  # spiral ganglion in the modiolus
    (33, 1, "labelled-line"),    # Figure 11.20
    (34, 1, "tuning"),           # Figure 11.19
    (35, 1, "pathway"),          # Figure 11.18
    (38, 1, "a1"),               # Figure 11.27
]


def ear():
    """Figure 11.3: the seven structures of HW3 Figure 1, labels painted
    out for the hotspot quiz and the label question. The outer, middle
    and inner ear brackets stay."""
    paint("ear", [
        [46.5, 23.5, 57, 29],    # Ossicles
        [89.5, 30.5, 99.5, 39],  # Oval window
        [87.5, 65.5, 99.5, 77.5],  # Auditory-vestibular nerve
        [85.5, 79.5, 96, 85],    # Cochlea
        [66.5, 87.5, 79, 96],    # Tympanic membrane
        [40.5, 87.5, 51, 96],    # Auditory canal
        [5.5, 91.5, 13, 96],     # Pinna
    ])
    leaders("ear", [
        [56, 27, 60.5, 45.5], [56, 27, 64, 47], [56, 27, 68.5, 57],  # ossicles leaders
        [90, 35.5, 72.5, 55],    # oval window
        [88, 66.5, 85.5, 60],    # nerve
        [86.5, 80, 81, 66.5],    # cochlea
        [66.5, 88, 61, 62],      # tympanic membrane
        [40.5, 88, 36.5, 66],    # auditory canal
        [13, 91, 17.5, 79],      # pinna
    ])
    crop("ear", [5, 0, 100, 100])
    # Second pass on what the first left, in cropped coordinates.
    run("scripts/retouch_figure.py", "erase", F / "ear.webp", F / "ear.webp", "--corridor", 22, "--chroma", 70,
        *sum((["--leader", *l] for l in [
            [56.5, 35.5, 60, 45], [59, 35, 62, 39.5], [60.5, 39.5, 67, 58],   # ossicles
            [72.5, 52.5, 75.5, 49.5],  # oval window
            [84.5, 58, 86, 59.5],      # nerve
            [79.5, 64.5, 81, 66.5],    # cochlea
            [58.5, 63.5, 61.5, 66.5], [61, 73.5, 63.5, 76.5],  # tympanic membrane
            [31, 63.5, 36.5, 80],      # auditory canal
            [11.5, 79.5, 13, 82.5],    # pinna
        ]), []))
    # Black leader ends over the coloured ossicles, measured on a zoom.
    erase("ear", [[57.6, 44.4, 59.6, 51.2], [59.9, 44.7, 61.4, 48.4], [60.6, 44.7, 66.6, 58.1], [84.6, 58.5, 85.4, 60.3]], width=5)


def corti():
    """Slide 18 organ of Corti drawing: the label boxes are cropped off,
    the leader stubs and their end dots inpainted."""
    crop("corti", [21, 13, 79, 92])


def corti_leaders():
    # Coordinates in percent of the cropped picture.
    # Coloured leaders (not grey), so exact lines plus a box per end dot.
    erase("corti", [
        [0, 3.5, 12.5, 11],      # scala media
        [0, 27, 29, 17.5],       # tectorial membrane
        [0, 40, 30.5, 34],       # outer hair cells
        [100, 20, 69, 46],       # inner hair cells
        [0, 75, 9, 72.5],        # basilar membrane
        [100, 69, 94.5, 71.5],   # cochlear nerve
        [0, 91, 13, 91.5],       # scala tympani
    ], width=7)
    inpaint("corti", [
        [11.3, 9.2, 13.7, 12.8], [27.8, 15.7, 30.2, 19.3], [29.3, 32.2, 31.7, 35.8],
        [67.8, 44.2, 70.2, 47.8], [7.8, 70.7, 10.2, 74.3], [93.3, 69.7, 95.7, 73.3],
        [11.8, 89.7, 14.2, 93.3],
    ])
    # The scala media stub at the top left, and a wider blend over the
    # pale streaks the first pass left on the gradient background.
    erase("corti", [[0, 2.5, 10.5, 7]], width=12)
    erase("corti", [[0, 27, 27, 18.5], [100, 20, 70.5, 44.5]], width=18)
    crop("corti", [1, 9, 100, 96])  # trims the stub and a stray letter at the edges


def scalae():
    """Figure 11.7 cross section only (the ear inset and arrow cut off),
    labels and leaders removed."""
    paint("scalae", [[38, 84.5, 48.5, 97]])  # Basilar membrane label
    leaders("scalae", [
        [44.5, 20, 55, 36],      # Reissner's membrane
        [41, 32.5, 58, 52.5],    # tectorial membrane
        [43.5, 57.5, 49.5, 55],  # stria vascularis
        [42.5, 73, 57, 65.5],    # organ of Corti
        [45.5, 85, 57.5, 67.5],  # basilar membrane
        [84.5, 14.5, 66, 34.5],  # scala vestibuli
        [84.5, 27.5, 60.5, 48],  # scala media
        [84.5, 76.5, 66, 76],    # scala tympani
    ])
    crop("scalae", [45, 6, 84, 98])
    # Second pass on the segments the first left, in cropped coordinates.
    run("scripts/retouch_figure.py", "erase", F / "scalae.webp", F / "scalae.webp", "--corridor", 22, "--chroma", 70,
        *sum((["--leader", *l] for l in [
            [20.5, 30, 29.5, 36], [32.5, 47, 43.5, 42.5], [35.5, 51.5, 39, 54],
            [24.5, 62.5, 30.5, 59.5], [16.5, 63.5, 19.5, 65], [14.5, 77.5, 20.5, 73.5],
            [74.5, 77, 77.5, 77], [83.5, 77, 91.5, 77], [74.5, 22, 80.5, 19], [83.5, 30, 87.5, 28.5],
        ]), []))


def main():
    F.mkdir(parents=True, exist_ok=True)
    for page, image, name in RAW:
        extract(page, image, name)
    ear()
    corti()
    corti_leaders()
    scalae()
    crop("cochlea-uncoiled", [5, 43, 100, 100])
    # Slide text and printed captions that spill into the crops; the
    # captions are given by the page instead.
    paint("middle-ear", [[0, 0, 18, 10], [0, 22, 3, 29]])
    crop("middle-ear", [8, 2, 100, 100])
    crop("traveling-wave", [0, 0, 100, 55])
    paint("transduction", [[39, 76, 100, 100]])
    paint("pathway", [[66, 80, 100, 100]])
    crop("a1", [0, 6, 100, 80])
    paint("innervation", [[0, 50, 15, 76], [0, 97, 100, 100]])


if __name__ == "__main__":
    main()
