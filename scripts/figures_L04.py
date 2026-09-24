#!/usr/bin/env python3
"""Build every raster figure asset for Lecture 4 from the sources.

Reproducible record of where each file in src/assets/figures/L04 comes
from. Rerun after changing a crop or paint box. Steps use
extract_figures.py (slide crops) and retouch_figure.py (paint out
burned-in labels, inpaint leader stubs, sub-crop, compose panels).

Source: the L04 slide deck (course material). Nearly every figure is a
Bear, Connors and Paradiso textbook figure as shown on the slides; the
exceptions are named in CREDITS.md. Slide 34 holds an embedded video
that the PDF export renders as a black box; it is not extracted.
"""

import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PDF = ROOT / "source/slides/NBE-E4210 LECTURE 04 - 2026.pdf"
F = ROOT / "src/assets/figures/L04"
PY = sys.executable


def run(*args):
    cmd = [PY, *[str(a) for a in args]]
    print("+", " ".join(cmd[1:]))
    subprocess.run(cmd, check=True, cwd=ROOT)


def extract(page, image, name):
    run("scripts/extract_figures.py", "crop", PDF, "--lecture", "L04", "--page", page, "--image", image, "--name", name)


def extract_rect(page, rect, name):
    run("scripts/extract_figures.py", "crop", PDF, "--lecture", "L04", "--page", page, "--rect", *rect, "--name", name)


def paint(name, boxes, out=None, color="#ffffff"):
    args = ["scripts/retouch_figure.py", "paint", F / f"{name}.webp", F / f"{out or name}.webp", "--color", color]
    for b in boxes:
        args += ["--box", *b]
    run(*args)


def smear(name, boxes, direction="left", out=None):
    args = ["scripts/retouch_figure.py", "smear", F / f"{name}.webp", F / f"{out or name}.webp", "--dir", direction]
    for b in boxes:
        args += ["--box", *b]
    run(*args)


def erase(name, lines, width=9, out=None):
    args = ["scripts/retouch_figure.py", "erase", F / f"{name}.webp", F / f"{out or name}.webp", "--width", width]
    for line in lines:
        args += ["--line", *line]
    run(*args)


def inpaint(name, boxes, out=None):
    """Inpaint whole label boxes that sit over shaded artwork."""
    args = ["scripts/retouch_figure.py", "erase", F / f"{name}.webp", F / f"{out or name}.webp"]
    for b in boxes:
        args += ["--box", *b]
    run(*args)


def crop(name, box, out=None):
    run("scripts/retouch_figure.py", "crop", F / f"{name}.webp", F / f"{out or name}.webp", "--box", *box)


def compose(out, panels, height=520, gap=40, cols=None):
    args = ["scripts/retouch_figure.py", "compose", F / f"{out}.webp", "--height", height, "--gap", gap]
    if cols:
        args += ["--cols", cols]
    for p in panels:
        args += ["--panel", p]
    run(*args)


def drop(*names):
    for n in names:
        (F / f"{n}.webp").unlink(missing_ok=True)
        (F / f"{n}.json").unlink(missing_ok=True)


def main():
    F.mkdir(parents=True, exist_ok=True)

    # The eye -----------------------------------------------------------
    extract(6, 3, "eye-gross")              # Figure 9.4 (S6)
    paint("eye-gross", [[69, 1, 81, 6], [77, 27, 87, 31.5], [3, 36, 30, 40.5], [78, 39, 93, 43.5], [78, 50, 92, 58], [3, 81, 21, 85.5], [72, 80, 99, 88]])
    erase("eye-gross", [[68, 5.5, 51.5, 17.5], [76, 28, 57.5, 21], [25, 35, 38.5, 27], [23, 40.5, 31, 53], [77, 38, 60, 25.5], [78, 42.5, 54, 56.5], [83, 58.5, 78, 66], [11.5, 81, 23, 70], [73, 80.5, 60, 68.5], [73, 80.5, 63, 80.5]], width=10)
    crop("eye-gross", [0, 0, 100, 89])

    extract(6, 2, "eye-section")            # Figure 9.6 (S6)
    paint("eye-section", [[23, 1.5, 32, 10], [18, 13.5, 23.5, 19], [15, 24, 22.5, 29], [14, 33, 21, 38], [15, 45, 24, 51], [16, 54, 27, 63], [22, 64, 31, 72], [31, 72, 42, 80.5], [60, 74.5, 72, 81], [72, 58, 86, 64.5], [77, 25, 86, 30], [72, 4, 80, 10]])
    erase("eye-section", [[30, 9, 34.5, 23], [30.5, 9, 36.5, 23.5], [31, 9, 38, 24], [22.5, 18, 33, 26], [22, 27, 36, 33.5], [24, 47, 28, 44.5], [26, 55, 31.5, 47.5], [30, 65, 37.5, 52.5], [40, 72, 44.5, 56.5], [64, 75, 60.5, 66.5], [81, 59, 79, 49.5], [77, 29, 72, 34], [73, 8.5, 67, 15], [32, 11, 37, 26], [32.5, 11, 38.5, 26], [31, 10, 35.5, 25], [35, 32.5, 37.5, 34.5]], width=10)
    crop("eye-section", [12, 0, 88, 82])

    extract(7, 3, "accommodation")          # Figure 9.8 (S7), labels kept
    crop("accommodation", [0, 0, 74, 100])
    extract(9, 2, "visual-field")           # Figure 9.9 (S9), labels kept
    crop("visual-field", [0, 0, 100, 55])
    extract(9, 3, "visual-angle")           # Figure 9.10 (S9), labels kept
    crop("visual-angle", [0, 0, 100, 81])

    # The retina --------------------------------------------------------
    extract(10, 2, "retina-layers")         # Figure 9.12 (S10): the layer column only
    crop("retina-layers", [47.6, 15.7, 84.4, 97.6])
    extract(11, 3, "fovea")                 # Figure 9.16 (S11)
    erase("fovea", [[62, 59.5, 63.5, 51.5], [62, 59.5, 66.5, 53], [83, 59, 80.5, 54], [83, 59, 82.5, 54.5], [41, 21.5, 42.5, 20]], width=8)
    crop("fovea", [41, 5, 87.4, 57.5])
    extract(12, 2, "convergence")           # Figure 9.15b (S12), labels kept
    extract(13, 2, "microcircuit")          # Figure 9.11 (S13)
    paint("microcircuit", [[5, 0, 51, 7], [51, 10, 80, 14.5], [6, 20, 27, 27], [6, 30, 24, 36.5], [6, 39, 29, 45.5], [48, 67, 80, 71.5]])
    erase("microcircuit", [[64, 13.8, 48, 17.5], [64, 13.8, 82, 17.8], [27.5, 22.5, 61.5, 26.5], [23, 32.5, 41, 31], [29, 41, 61.5, 35.3], [65, 67, 50, 63.5], [65, 67, 81, 63.5]], width=8)
    crop("microcircuit", [0, 0, 100, 72])
    extract(15, 2, "receptive-field")       # Figure 9.25 (S15), labels kept
    extract(16, 3, "cnn-field")             # convolutional network fields (S16)
    extract(17, 2, "bipolar")               # Figure 9.26 (S17), labels kept
    extract(20, 2, "cs-spot")               # Figure 9.27 (S20)
    paint("cs-spot", [[21, 0, 43, 15.5], [7, 13, 17.5, 24], [21, 17, 29.5, 23], [31, 17, 43, 23], [50, 17, 62, 23]])
    erase("cs-spot", [[15.5, 20, 18.5, 27.5], [26.3, 19, 26.3, 33], [33.5, 19, 31.5, 30], [56.2, 19, 56.2, 34.5]], width=8)
    crop("cs-spot", [0, 19, 100, 69])
    extract(21, 2, "cs-edge")               # Figure 9.28 (S21), labels kept
    crop("cs-edge", [0, 0, 100, 66])

    # Central pathway ---------------------------------------------------
    extract(22, 3, "retinofugal")           # Figure 10.2 (S22)
    paint("retinofugal", [[61, 2, 67, 7], [65, 10, 78.5, 15], [70, 18, 82.5, 24], [74, 29, 83, 42], [74, 51, 85, 56], [72, 67, 87, 75]])
    erase("retinofugal", [[61, 4.8, 55.5, 8.5], [65, 13, 48, 22], [70, 21.5, 44.5, 28], [74, 32, 44, 31], [74, 52.5, 42.5, 31.5], [72.5, 68.5, 47, 44]], width=9)
    crop("retinofugal", [18, 0, 72, 88])
    extract(23, 2, "hemifields")            # Figure 10.3 (S23)
    paint("hemifields", [[32, 0, 55, 3.2], [26, 9, 41, 12.5], [66, 9, 82, 16.5], [84, 46, 96, 52], [85, 54, 97, 62.5], [32, 62, 41, 66], [32, 69, 48, 73], [87, 65, 99, 71.5], [42, 79, 57, 83], [77, 77, 86, 83.5]])
    inpaint("hemifields", [[5, 15, 18, 22]])
    erase("hemifields", [[37, 11, 41.8, 29], [88.5, 48.5, 79, 52], [85, 57.5, 80, 58.5], [40, 63.5, 46, 60.5], [48, 70.5, 53, 67], [87.5, 67.5, 82, 71.5], [57, 80, 66, 77.5], [77.5, 77, 73.5, 72], [84.5, 47, 79.5, 50.5], [40.8, 20, 41.6, 27]], width=9)
    crop("hemifields", [0, 0, 100, 84])
    extract_rect(23, [599, 312, 782, 474], "human-field")   # binocular field schematics (S23), labels kept;
    extract_rect(23, [780, 374, 934, 538], "rabbit-field")  # rects, not --image, for resolution and no overlap
    compose("binocular-fields", [F / "human-field.webp", F / "rabbit-field.webp"], height=520, gap=40)
    drop("human-field", "rabbit-field")
    extract(24, 2, "visual-pathway")        # Figure 10.4 (S24), labels kept
    crop("visual-pathway", [0, 0, 100, 84])
    extract(25, 2, "lgn-nissl")             # Figure 10.7 (S25): the stained inset, layer numbers kept
    crop("lgn-nissl", [54, 17, 99, 80])
    extract(25, 3, "lgn-inputs")            # Figure 10.8 (S25), layer numbers kept
    paint("lgn-inputs", [[44, 10, 56, 13.5], [67, 1, 77, 4.5], [56, 55.8, 75, 66], [79, 47.8, 98.5, 57]])
    erase("lgn-inputs", [[61.5, 56, 62.8, 52.8], [69.6, 56, 68.2, 52.4], [83.6, 48, 84.8, 44.5], [91.2, 48, 90.2, 44.8]], width=6)
    crop("lgn-inputs", [0, 0, 100, 89])
    extract(26, 3, "mp-cells")              # Figure 9.30 (S26), labels kept
    crop("mp-cells", [0, 0, 100, 73.5])
    extract(26, 2, "lgn-organization")      # Figure 10.9 (S26), labels kept
    paint("lgn-organization", [[62, 0, 100, 5.5]])
    crop("lgn-organization", [0, 0, 100, 82])
    extract(28, 2, "v1-location")           # Figure 10.10 human (S28), labels kept
    extract(28, 3, "retinotopy")            # Figure 10.11 (S28), numbers and labels kept
    paint("retinotopy", [[40, 0, 100, 2.5], [79, 8, 100, 21]])
    crop("retinotopy", [0, 8, 37, 60], out="retinotopy-a")
    crop("retinotopy", [38, 7, 100, 78])

    # Striate cortex ----------------------------------------------------
    extract(29, 2, "autoradiography")       # Figure 10.15 (S29), step numbers kept
    crop("autoradiography", [34, 3, 100, 100])   # drop the Figure 10.8 inset and the printed caption
    extract(30, 2, "od-human")              # human ocular dominance stripes (S30)
    crop("od-human", [10, 5, 92, 94])        # drop the slide title fragment
    extract(30, 3, "od-stripes")            # Figure 10.16 (S30)
    extract(31, 3, "od-mixing")             # Figure 10.17 (S31)
    paint("od-mixing", [[12, 0, 36, 19.5], [39, 0, 63, 19.5], [15, 73, 36, 83.5], [39.5, 73, 62.5, 83.5], [73.5, 30, 94, 66]])
    crop("od-mixing", [0, 0, 100, 84])
    extract(32, 2, "cortex-cells")          # Figure 10.13 (S32), layer numerals kept
    extract(32, 3, "cortex-outputs")        # Figure 10.18 (S32)
    paint("cortex-outputs", [[26, 86, 96, 100]])
    compose("cortex-layers", [F / "cortex-cells.webp", F / "cortex-outputs.webp"], height=620, gap=30)
    drop("cortex-cells", "cortex-outputs")
    extract(33, 2, "orientation")           # Figure 10.20 (S33), labels kept
    paint("orientation", [[0, 73, 61, 100]])       # figure number and the clipped caption column
    extract(35, 2, "simple-cell")           # Figure 10.23 (S35), labels kept
    crop("simple-cell", [0, 0, 100, 64])

    # Beyond V1 ---------------------------------------------------------
    extract(36, 2, "extrastriate")          # Figure 10.27 (S36)
    crop("extrastriate", [0, 0, 53, 56], out="streams")        # panel a, labels kept
    crop("extrastriate", [0, 58, 56, 100], out="stream-flow")  # panel c, labels kept
    paint("extrastriate", [[82, 0.5, 89, 5], [89.5, 4, 97, 10], [95, 15, 99.5, 20], [95, 21, 99.5, 26.5], [86.5, 46, 91.5, 51.5], [80.5, 51, 85.5, 56]])
    erase("extrastriate", [[85.3, 5, 82.8, 27.5], [85.3, 5, 82.6, 27.5], [90.7, 9, 83.3, 27.5], [95, 18.3, 87.7, 23.5], [95, 25, 92.7, 26.7], [88.3, 47.5, 87.5, 39.5], [81.8, 51.5, 81, 44.5]], width=10)
    crop("extrastriate", [53, 3, 100, 56])
    extract(37, 3, "wiring")                # Felleman and Van Essen style diagram (S37)
    extract(38, 2, "human-areas")           # Figure 10.28 (S38), labels kept
    extract(39, 3, "hierarchy")             # organizational principles (S39), labels kept
    extract(40, 2, "faces")                 # Figure 10.29 (S40), labels kept
    crop("faces", [0, 0, 100, 62])          # drop the printed caption under the panels


if __name__ == "__main__":
    main()
