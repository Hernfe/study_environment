#!/usr/bin/env python3
"""Build every raster figure asset for Lecture 2 from the sources.

Reproducible record of where each file in src/assets/figures/L02 comes
from. Rerun after changing a crop or paint box. Steps use
extract_figures.py (slide crops) and retouch_figure.py (paint out
burned-in labels, inpaint leader stubs, sub-crop, rasterise SVG).

Sources: the L02 slide deck (course material, mostly textbook figures)
and NIH BioArt (public domain). See CREDITS.md.
"""

import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PDF = ROOT / "source/slides/NBE-E4210 LECTURE 02 - 2026-1.pdf"
F = ROOT / "src/assets/figures/L02"
PY = sys.executable


def run(*args):
    cmd = [PY, *[str(a) for a in args]]
    print("+", " ".join(cmd[1:]))
    subprocess.run(cmd, check=True, cwd=ROOT)


def extract(page, image, name):
    run("scripts/extract_figures.py", "crop", PDF, "--lecture", "L02", "--page", page, "--image", image, "--name", name)


def paint(name, boxes, out=None, color="#ffffff"):
    args = ["scripts/retouch_figure.py", "paint", F / f"{name}.webp", F / f"{out or name}.webp", "--color", color]
    for b in boxes:
        args += ["--box", *b]
    run(*args)


def erase(name, lines, width=9, out=None):
    """Inpaint leader-line stubs left after the labels were painted out,
    so the hotspot widget draws the only leaders on the picture."""
    args = ["scripts/retouch_figure.py", "erase", F / f"{name}.webp", F / f"{out or name}.webp", "--width", width]
    for line in lines:
        args += ["--line", *line]
    run(*args)


def smear(name, boxes, direction="left", out=None):
    """Extend the pixels beside a box across it: removes a label on a
    gradient background without leaving a flat patch."""
    args = ["scripts/retouch_figure.py", "smear", F / f"{name}.webp", F / f"{out or name}.webp", "--dir", direction]
    for b in boxes:
        args += ["--box", *b]
    run(*args)


def crop(name, box, out=None):
    run("scripts/retouch_figure.py", "crop", F / f"{name}.webp", F / f"{out or name}.webp", "--box", *box)


def compose(out, panels, height=520, gap=40):
    args = ["scripts/retouch_figure.py", "compose", F / f"{out}.webp", "--height", height, "--gap", gap]
    for p in panels:
        args += ["--panel", p]
    run(*args)


def main():
    F.mkdir(parents=True, exist_ok=True)

    # Membrane: phospholipid bilayer (slide 6, Figure 3.3): the cross
    # section and the molecular zoom, labels painted out, composed side
    # by side; and a membrane ion channel (slide 11, Figure 3.7).
    extract(6, 5, "bilayer")
    paint("bilayer", [[10, 57.5, 22, 61.5], [11.5, 84.5, 21.5, 87.5]], color="auto")
    crop("bilayer", [1.2, 56.5, 28.0, 88.5], out="bilayer-section")
    crop("bilayer", [49.6, 37.5, 79.0, 90], out="bilayer-zoom")
    compose("bilayer", [F / "bilayer-section.webp", F / "bilayer-zoom.webp"], height=600, gap=40)
    (F / "bilayer-section.webp").unlink(); (F / "bilayer-section.json").unlink()
    (F / "bilayer-zoom.webp").unlink(); (F / "bilayer-zoom.json").unlink()

    extract(11, 2, "ion-channel")
    erase("ion-channel", [[59, 19.8, 50.5, 21.2]], width=12)
    smear("ion-channel", [[32, 5, 53, 10.5], [59, 2.2, 78.6, 11.5]], "down")
    smear("ion-channel", [[58.5, 15.5, 72.5, 22.5], [37.5, 73, 47.5, 77.5]], "up")
    crop("ion-channel", [6.5, 2.2, 78.5, 81.5])

    # Resting potential: measuring Vm (slide 14, Figure 3.11), K+
    # equilibrium (slide 14, Figure 3.12; labels are the content, kept),
    # the sodium-potassium pump (slide 20, Figure 3.16).
    extract(14, 2, "measure-vm")
    paint("measure-vm", [[56, 9, 68.5, 13], [63.5, 29.5, 72.5, 33.5], [53, 35, 69.5, 39]])
    erase("measure-vm", [[67.5, 12.8, 69.6, 17.6], [63.6, 30.6, 60.2, 27.4], [53.2, 36.6, 49.3, 31.8]], width=7)
    crop("measure-vm", [15, 1.8, 84, 77])

    extract(14, 3, "k-equilibrium")
    crop("k-equilibrium", [2, 1.5, 99, 55.3])

    extract(20, 2, "pump")
    smear("pump", [[37.5, 5.5, 66.5, 10.5], [81.5, 65.5, 94.5, 70.5]], "left")
    smear("pump", [[5, 5.5, 20.5, 14.5], [5, 72.5, 15.5, 77.5]], "right")
    erase("pump", [[50.6, 10.6, 38.8, 29.2], [50.6, 10.6, 61.6, 29.2], [95.8, 49.6, 93.6, 65.6], [94, 62, 92.8, 68]], width=9)
    crop("pump", [2.5, 2.5, 99, 80])

    # Action potential: intracellular versus extracellular recording
    # (slide 26, Box 4.1) and injecting current (slide 29, Figure 4.2).
    extract(26, 2, "recording")
    paint("recording", [[66.5, 0, 92.5, 5.5], [40.5, 13, 51.5, 19], [42, 32.5, 52, 38.5], [37, 40, 51.5, 50.5], [23, 88.5, 39, 98.5]], color="auto")
    erase("recording", [[43.4, 18, 40.8, 24.5], [43, 34.8, 39.5, 32], [37.2, 43.6, 32.2, 43.6], [32.2, 66, 29.6, 89]], width=13)

    extract(29, 2, "inject-current")
    # The blue panel is flat (#d5deed), so labels inside it are painted
    # with that colour; the green trace panel takes a smear.
    paint("inject-current", [[4.7, 16, 11.5, 23], [4.7, 42, 13.5, 49.5], [39, 8.5, 47.5, 13], [40, 27.5, 47, 32], [32.5, 39, 42, 46]], color="#d5deed")
    smear("inject-current", [[70, 12, 77.5, 19]], "left")
    paint("inject-current", [[24.5, 72.5, 29.5, 76.5], [4, 71, 7.5, 75], [59.5, 71, 63.5, 75]], color="#ffffff")
    erase("inject-current", [[43, 8, 40, 17], [40.2, 29.6, 38.4, 29.2], [13.4, 44.2, 15.8, 42], [32.8, 41.2, 30.8, 40.4], [24.6, 74.6, 23.2, 73]], width=15)
    crop("inject-current", [2.5, 6.5, 100, 78])

    # Channels: sodium channel structure (slide 33, Figure 4.7 b and c),
    # gating (slide 34, Figure 4.8), patch clamp (slide 35, Box 4.3),
    # single-channel records and the channel model (slide 36, Figure
    # 4.10; the records keep their labels, the model loses them).
    extract(33, 2, "sodium-channel")
    # S1 to S6 stay printed: the arches leave no room to paint them out
    # and they are structural indices, not quiz answers.
    paint("sodium-channel", [[56.5, 51, 64.5, 57], [79.5, 65, 100, 69], [79, 92, 100, 96], [79, 96.5, 87, 100]])
    erase("sodium-channel", [[66.6, 41.8, 60.4, 51.4], [60, 56.8, 59.8, 66.6], [80.5, 66.4, 63.2, 74.8], [68, 87.5, 80.5, 94], [66, 93.4, 78.5, 100], [72, 95.5, 80, 99]], width=16)
    crop("sodium-channel", [4.5, 0, 100, 100])

    extract(34, 3, "channel-gating")
    paint("channel-gating", [[12.5, 3.5, 28.5, 12.5], [65.5, 3.5, 79.5, 12.5]])

    extract(35, 2, "patch-clamp")
    paint("patch-clamp", [[0.3, 18.5, 7.2, 25.5], [5.5, 66.5, 13.5, 73.5], [0.5, 73.5, 5.5, 82], [43, 22.5, 50.5, 33.5], [57, 22.5, 71.5, 33.5], [78.5, 22.5, 91.5, 33.5], [19.5, 88.5, 28, 100]], color="auto")
    smear("patch-clamp", [[84.5, 49, 88.8, 54.5]], "left")
    erase("patch-clamp", [[7.2, 21.6, 8.6, 18.2], [12.1, 66.8, 13.6, 47.8], [49.0, 43.5, 50.5, 26], [67.4, 33.4, 66.6, 60.2], [87, 66, 89.2, 33], [27.6, 92.2, 43.6, 79.2]], width=11)

    extract(36, 2, "channel-states")
    crop("channel-states", [39, 1, 99.5, 58], out="channel-record")
    erase("channel-states", [[47, 68.4, 45.8, 72.6], [52.6, 87.6, 54.6, 79.2]], width=12)
    erase("channel-states", [[48.1, 92.5, 48.2, 92.5], [61.9, 92.5, 62, 92.5], [75.9, 92.5, 76, 92.5], [91.3, 92.5, 91.4, 92.5]], width=34)
    smear("channel-states", [[43, 64, 51, 69.5], [60.2, 66.5, 64.2, 70.5], [48.5, 87.5, 57.5, 91.5]], "left")
    crop("channel-states", [38, 63, 99.5, 96], out="channel-model")
    (F / "channel-states.webp").unlink(); (F / "channel-states.json").unlink()

    # Conduction: spike-initiation zone (slide 38, Figure 4.16). The red
    # membrane means a high density of voltage-gated sodium channels;
    # the caption says so.
    extract(38, 2, "spike-initiation")
    paint("spike-initiation", [[10, 19, 26, 23.5], [53.5, 19, 77.5, 31.5], [5, 53.5, 24.5, 60.5], [88, 38, 98.5, 45], [58.5, 58.5, 88.5, 65.5], [53, 55, 60, 62], [5, 67, 9.5, 70.5], [52, 67, 56.5, 70.5]])
    erase("spike-initiation", [[21, 54.6, 33.2, 45.6]], width=7)
    crop("spike-initiation", [4, 0, 100, 70.5])

    # Myelin and nodes: BioArt 197 (the L01 neuron), axon portion only.
    run("scripts/retouch_figure.py", "svg2png", "assets/incoming/bioart/bioart-000197-healthy-neuron.svg", F / "myelinated-axon.webp", "--width", 1400, "--trim")
    crop("myelinated-axon", [42, 18, 100, 78])


if __name__ == "__main__":
    main()
