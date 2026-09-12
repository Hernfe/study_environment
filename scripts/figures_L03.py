#!/usr/bin/env python3
"""Build every raster figure asset for Lecture 3 from the sources.

Reproducible record of where each file in src/assets/figures/L03 comes
from. Rerun after changing a crop or paint box. Steps use
extract_figures.py (slide crops) and retouch_figure.py (paint out
burned-in labels, smear labels on gradients, inpaint leader stubs,
sub-crop, compose panels).

Source: the L03 slide deck (course material; most figures are textbook
figures, two are from Sultan and Shi 2018 and Gerstner et al. 2014 as
shown on the slides). See CREDITS.md.
"""

import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PDF = ROOT / "source/slides/NBE-E4210 LECTURE 03 - 2026-1.pdf"
F = ROOT / "src/assets/figures/L03"
PY = sys.executable


def run(*args):
    cmd = [PY, *[str(a) for a in args]]
    print("+", " ".join(cmd[1:]))
    subprocess.run(cmd, check=True, cwd=ROOT)


def extract(page, image, name):
    run("scripts/extract_figures.py", "crop", PDF, "--lecture", "L03", "--page", page, "--image", image, "--name", name)


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


def erase_text(name, boxes, out=None, open_px=4, grow_px=5):
    """Inpaint only the printed text strokes inside a box, keeping the
    thin artwork lines under the text."""
    args = ["scripts/retouch_figure.py", "erase", F / f"{name}.webp", F / f"{out or name}.webp", "--open-px", open_px, "--grow-px", grow_px]
    for b in boxes:
        args += ["--text", *b]
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

    # Synapse organization -------------------------------------------
    extract(9, 3, "synapse-types")          # four synapse locations (S9), headers kept
    extract(10, 2, "gap-junction")          # Figure 5.1 b, c (S10)
    paint("gap-junction", [[1.5, 38.5, 11, 45], [28.5, 37.5, 45, 41.5], [1.5, 86, 11, 93], [20.5, 90.5, 33.5, 98.5], [34, 90.5, 52.5, 98.5], [64, 83.5, 72, 87.5], [84.5, 74, 93, 78.5], [83.8, 65.5, 86.2, 85], [92, 45.5, 94.8, 86.5], [93.5, 64.5, 100, 71], [1.5, 94, 6, 98.5], [64, 94, 68.5, 98.5]])
    erase("gap-junction", [[35, 38.5, 32.6, 45.6], [36.5, 38.5, 39.8, 45.6], [35.4, 91, 34.8, 83.4]], width=11)
    crop("gap-junction", [0, 39, 100, 91])

    extract(11, 2, "electrical-psp")        # Figure 5.2 (S11), labels kept
    paint("electrical-psp", [[91, 0, 100, 9]])
    crop("electrical-psp", [0, 0, 96, 78])
    extract(12, 2, "synchrony")             # Figure 5.3 (S12), labels kept

    extract(14, 2, "chemical-synapse")      # Figure 5.4 (S14)
    paint("chemical-synapse", [[77, 0, 100, 5.5], [19.5, 20.5, 36.5, 32.5], [7, 40.5, 19.5, 49], [65.5, 44, 80.5, 48.5], [0.5, 63.5, 11, 71]])
    inpaint("chemical-synapse", [[67, 62.5, 80, 67], [67, 67.5, 81, 75.5], [80.3, 63, 82.2, 75], [82.3, 64.5, 98.8, 72.5], [19.5, 71.5, 30.5, 79.5], [24.5, 81.5, 36.5, 86], [42.5, 83.5, 66.5, 89.5]])
    erase("chemical-synapse", [[31, 29, 39.8, 42.5], [18.4, 44.4, 35.4, 55.4], [18.4, 44.4, 34.4, 59.8], [66, 46, 54.6, 46], [66, 46.4, 57.2, 54.4], [10.6, 66.2, 30.8, 66.2], [31, 63.4, 31, 67.8], [31, 63.4, 32.8, 63.4], [31, 67.8, 32.8, 67.8], [67.8, 64.6, 53.6, 66.6], [67.8, 71.2, 58.6, 71], [30.2, 73.2, 39.6, 63.4], [30.2, 73.2, 42.2, 64], [36, 83.2, 39.4, 70], [36, 83.2, 45.2, 71]], width=12)
    crop("chemical-synapse", [0, 14, 100, 96])

    extract(15, 3, "synapse-em")            # Figure 5.5 electron micrograph (S15)
    erase("synapse-em", [[82, 30.2, 62.6, 31.6], [82, 30.2, 73.6, 23], [17, 52.6, 24.6, 60.2], [17, 70.6, 31, 68.2], [82, 75.6, 60.4, 63.4], [40, 90.5, 54.4, 59]], width=11)
    crop("synapse-em", [18.2, 0.5, 80.8, 78.5])

    extract(17, 3, "targeting")             # Figure 5.7 (S17)
    paint("targeting", [[59.5, 5, 100, 15.5], [23.5, 12, 28.5, 15.5], [40.5, 11, 49, 15.5], [38.5, 20.5, 52.5, 27], [10, 31, 26.5, 37], [20.5, 42.5, 27.5, 46.5], [44.5, 50, 60, 56], [73, 48.5, 80, 52], [3.5, 51.5, 8, 55], [92.5, 52, 97.5, 55.5], [47, 56.5, 60.5, 62.5], [56.5, 77.5, 60.5, 81], [9, 95, 23.5, 99], [40.5, 96, 47.5, 99.5]])
    erase("targeting", [[41, 13.2, 32, 18.6], [48, 13.2, 59.5, 15.8], [38.6, 24.6, 36, 29.4], [49, 25.6, 54.8, 33.4], [25.6, 33.2, 33.2, 35.6], [21.5, 44.2, 12, 44], [59, 52.2, 65.2, 41], [58.6, 50.4, 66, 54.8], [64, 53.2, 80.8, 55], [73.2, 50, 68, 50], [47.5, 60.8, 41.6, 62.2], [59.4, 61.4, 69.2, 73.8], [15.5, 96.5, 18.8, 85.6], [17.5, 96.5, 23.6, 87], [27.5, 94, 32, 88.5], [41, 97.6, 36, 97.2]], width=12)
    crop("targeting", [2, 5, 100, 100])
    # second pass on the cropped picture
    erase("targeting", [[48, 23.5, 52.5, 29.5], [33.5, 21.5, 36, 26], [14.5, 92, 17.5, 97], [11.5, 39.5, 15, 42.5], [60.5, 47, 67, 53], [59, 49, 72, 52], [55.5, 59, 60, 62], [59, 62, 67, 72], [22, 25, 25, 28], [90.5, 41, 94, 45]], width=14)

    extract(19, 2, "spine-em")              # spine ultrastructure (S19), labels kept
    extract(20, 2, "em-3d")                 # 3D EM reconstruction (S20), labels kept

    # Transmitter lifecycle -------------------------------------------
    extract(22, 2, "synthesis")             # Figure 5.11 (S22)
    crop("synthesis", [76.5, 58, 100, 95], out="synthesis-inset")
    inpaint("synthesis", [[25.5, 14.5, 34.5, 21.5], [38.5, 16.5, 51.5, 23], [69.5, 14, 77.5, 20], [24, 50.5, 32.5, 54.5], [52.5, 46, 61.5, 52.5], [35.5, 54, 44.5, 60]])
    smear("synthesis", [[2, 30, 9.5, 34]], "up")
    erase("synthesis", [[29.4, 21.6, 25.6, 32], [40.6, 23, 37, 27.6], [76, 19.6, 80.8, 22.8], [76.2, 19.6, 82.2, 28.4], [25, 56, 21.4, 50], [53.5, 46, 43.2, 35.6], [61, 46.2, 76.4, 37.8], [38.8, 55, 35.6, 45], [85.5, 54, 76.5, 58.5], [90, 54, 100, 58.5]], width=14)
    crop("synthesis", [0, 10, 100, 57])
    # second pass on the cropped picture for the leader stubs that survived
    erase("synthesis", [[28.6, 16, 27.4, 31], [38.5, 9, 37, 18], [48.5, 59, 42.5, 75], [49.5, 58, 44, 76], [57, 63.5, 57, 77], [78, 19, 81.5, 38], [76.5, 19, 79, 23], [36.5, 77, 35.5, 93], [23.5, 89, 21.5, 100], [80.5, 86, 85, 100], [91.5, 86, 96.5, 100]], width=16)

    extract(24, 2, "vesicle-cycle")         # Figure 5.12 (S24)
    erase_text("vesicle-cycle", [[67.5, 14, 100, 28]], open_px=3, grow_px=6)
    inpaint("vesicle-cycle", [[32.5, 22, 42.5, 30], [74, 35.5, 81.5, 43.5], [33, 42, 40.5, 47.5], [20, 63, 36.5, 70.5], [50.5, 63, 67.5, 70.5]])
    paint("vesicle-cycle", [[3.5, 48.5, 12.5, 56.5], [42.5, 72, 55.5, 77]])
    erase("vesicle-cycle", [[34.2, 22.5, 31, 29], [75.2, 43.4, 72, 47.4], [12.4, 51, 28.6, 54.4], [32.2, 58.4, 34.2, 49.8], [50.2, 60, 51.6, 53], [53.2, 60, 54, 53]], width=11)
    crop("vesicle-cycle", [2, 6, 100, 76])
    # second pass on the cropped picture
    erase("vesicle-cycle", [[33, 61, 30.5, 85], [49.8, 67, 52.8, 85]], width=16)

    extract(25, 6, "snare-1")               # Box 5.3 panels (S25)
    extract(25, 5, "snare-2")
    extract(25, 7, "snare-3")
    smear("snare-1", [[7.5, 42.5, 29.5, 49.5], [40.5, 38.5, 62.5, 49.5], [73, 43.5, 92.5, 49.5]], "left")
    erase("snare-1", [[19, 49.5, 20, 66.5], [19, 49.5, 27.4, 54.4], [48.4, 33.6, 48.6, 40], [78, 44, 79, 38.2], [29, 10, 30.6, 15], [86.6, 8, 77.4, 33.4], [50, 10, 50, 16], [46.2, 76, 45, 88], [85.6, 79.4, 84, 88]], width=7)
    crop("snare-1", [5.5, 11, 95.5, 87])
    crop("snare-2", [3, 3, 97, 97])
    crop("snare-3", [3, 3, 97, 97])
    compose("snare", [F / "snare-1.webp", F / "snare-2.webp", F / "snare-3.webp"], height=360, gap=24)
    drop("snare-1", "snare-2", "snare-3")

    extract(26, 2, "ionotropic")            # Figure 5.14 (S26), labels kept
    extract(52, 2, "gpcr-types")            # Figure 5.17 (S52)
    smear("gpcr-types", [[2, 14, 11, 19.5], [12, 14, 26, 19.5], [52, 14, 61, 19.5], [62, 14, 76, 19.5]], "right")
    smear("gpcr-types", [[34.5, 7.5, 48, 16], [21, 51.5, 29.5, 57], [88, 17, 96.5, 22], [71, 51.5, 79.5, 57]], "left")
    paint("gpcr-types", [[88, 58.5, 97.5, 66]], color="auto")
    erase("gpcr-types", [[5, 19.2, 7.8, 25.4], [12.8, 17.4, 10.6, 25.2], [38.6, 16, 38, 21.4], [23.6, 52.4, 22.2, 44.4], [55, 19.2, 57.8, 25.4], [62.8, 17.4, 60.6, 25.2], [89.8, 21, 86.2, 35.6], [73.6, 52.4, 72.2, 44.4]], width=12)
    crop("gpcr-types", [0.5, 3, 98.5, 70])

    # Postsynaptic potentials and integration --------------------------
    extract(35, 2, "psp-na")                # Figure 5.15 b (S35)
    extract(35, 5, "psp-epsp")              # Figure 5.15 c
    extract(35, 3, "psp-cl")                # Figure 5.16 b
    extract(35, 6, "psp-ipsp")              # Figure 5.16 c
    compose("psp-generation", [F / "psp-na.webp", F / "psp-epsp.webp", F / "psp-cl.webp", F / "psp-ipsp.webp"], height=330, gap=24, cols=2)
    drop("psp-na", "psp-epsp", "psp-cl", "psp-ipsp")
    extract(29, 2, "patch-transmitter")     # Figure 5.18 (S29), labels kept
    crop("patch-transmitter", [0, 0, 100, 67.5])
    extract(30, 2, "summation")             # Figure 5.19 (S30), labels kept
    crop("summation", [0, 8, 100, 100])
    extract(31, 2, "cable")                 # Figure 5.20 (S31), labels kept
    crop("cable", [0, 0, 92, 100])
    extract(32, 2, "shunting")              # Figure 5.21 (S32), labels kept
    paint("shunting", [[64, 87, 97, 100], [80, 1, 97, 9]])
    crop("shunting", [0, 0, 97, 100])

    # Transmitter systems and circuits --------------------------------
    extract(35, 4, "glutamate-receptors")   # AMPA, NMDA, kainate (S35), labels kept
    extract(36, 5, "gabaa")                 # Figure 6.22 (S36)
    smear("gabaa", [[42, 4.5, 57, 10], [66, 16, 90.5, 21], [65.5, 39, 96.5, 44], [21.5, 82.5, 76.5, 95.5]], "left")
    smear("gabaa", [[5, 12, 39.5, 17.5], [4.5, 34, 22, 39.5]], "right")
    erase("gabaa", [[40.8, 68.5, 34.8, 81]], width=12)
    crop("gabaa", [1.5, 1.5, 98.5, 98.5])
    extract(39, 2, "nmda")                  # Figure 6.21 (S39), labels kept
    crop("nmda", [0, 0, 100, 70])
    extract(44, 2, "interneurons")          # Sultan and Shi panels a, d (S44)
    crop("interneurons", [0, 0, 64, 100], out="interneuron-types")
    paint("interneuron-types", [[0, 0, 5, 9], [8.5, 55, 27.5, 62], [2, 89.5, 21, 97.5], [23, 89.5, 42.5, 97.5], [35.5, 65, 52.5, 72.5], [53, 89.5, 68, 97.5], [67, 77.5, 84, 90.5], [81, 63.5, 90.5, 76.5], [89, 76.5, 99.5, 88.5]], color="auto")
    crop("interneurons", [64, 0, 100, 100], out="interneuron-targets")
    paint("interneuron-targets", [[0, 0, 10, 8], [3.5, 31.5, 29.5, 45.5], [44, 22.5, 72.5, 34.5], [74.5, 31.5, 99, 43.5], [6.5, 83.5, 26.5, 95.5], [53.5, 82.5, 97.5, 95.5]], color="#faeeda")
    drop("interneurons")
    extract(45, 3, "interneuron-groups")    # Rudy et al. tree (S45), labels kept
    extract(46, 2, "interneuron-markers")   # Sultan and Shi panels b, c, e, f (S46)
    crop("interneuron-markers", [0, 55, 82, 100])
    extract(48, 2, "circuit-motifs")        # PV, SOM, VIP wiring and coupling (S48), labels kept
    extract(53, 2, "ne-cascade")            # Figure 5.22 (S53)
    smear("ne-cascade", [[1.5, 14.5, 10, 20.5]], "right")
    smear("ne-cascade", [[11.5, 14.5, 16, 20.5], [37, 16.5, 45, 28], [50, 9, 59.5, 20], [12.5, 67.5, 20.5, 73.5]], "left")
    paint("ne-cascade", [[45.5, 64, 51, 74.5]], color="auto")
    erase("ne-cascade", [[6.6, 17, 7.8, 28], [11.6, 16.5, 9.8, 27], [38.6, 26, 36.8, 44], [50.6, 18.5, 49.6, 26.5], [19.8, 68, 21.6, 54.4]], width=12)
    crop("ne-cascade", [1.6, 3.5, 60.5, 96])


if __name__ == "__main__":
    main()
