#!/usr/bin/env python3
"""Build every raster figure asset for Lecture 1 from the sources.

Reproducible record of where each file in src/assets/figures/L01 comes
from. Rerun after changing a crop or paint box. Steps use
extract_figures.py (slide crops) and retouch_figure.py (paint out
burned-in labels, sub-crop, compose panels, rasterise SVG).

Sources: the L01 slide deck (course material), NIH BioArt (public
domain) and Servier Medical Art (CC BY 4.0). See CREDITS.md.
"""

import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PDF = ROOT / "source/slides/NBE-E4210 LECTURE 01 - 2026.pdf"
F = ROOT / "src/assets/figures/L01"
PY = sys.executable


def run(*args):
    cmd = [PY, *[str(a) for a in args]]
    print("+", " ".join(cmd[1:]))
    subprocess.run(cmd, check=True, cwd=ROOT)


def extract(page, image, name):
    run("scripts/extract_figures.py", "crop", PDF, "--lecture", "L01", "--page", page, "--image", image, "--name", name)


def paint(name, boxes, out=None):
    args = ["scripts/retouch_figure.py", "paint", F / f"{name}.webp", F / f"{out or name}.webp", "--color", "#ffffff"]
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

    # Cortical surface: gross features (slide 18), gyri and sulci (19),
    # lobes (20), functional areas (21), Brodmann's map (25). Printed
    # labels are painted out; leader-line stubs stay and the hotspot
    # markers sit on their ends.
    extract(18, 2, "gross-features")
    crop("gross-features", [0, 0, 100, 87])
    paint("gross-features", [[0, 5, 20, 14], [0, 71, 14, 93], [45, 87, 49.6, 100], [88, 92, 100, 100]])

    extract(19, 2, "gyri-sulci")
    paint("gyri-sulci", [[17, 6, 37, 14], [38, 1, 56, 9], [60, 7, 80, 15], [0, 77, 22, 90], [77, 70, 100, 84], [67, 90, 78, 98]])

    extract(20, 2, "lobes")
    paint("lobes", [[0, 8, 13, 18], [54, 0, 66, 7], [12, 88, 25, 98], [68, 66, 81, 75], [66, 50, 74, 57], [54, 88, 61, 95]])

    extract(21, 2, "functional-areas")
    paint("functional-areas", [[44, 0, 63, 5.5], [25, 4, 46, 11.5], [53, 4, 71, 11.5], [66, 8.5, 86, 16.5], [14, 11, 26, 19.5], [77, 27, 91, 35.5], [4, 69, 18, 75], [15, 79, 32, 88], [37, 82, 50, 90], [66, 61, 74, 68], [10, 87, 30, 100], [66, 90, 79.5, 98]])

    extract(25, 2, "brodmann-map")
    crop("brodmann-map", [3, 0, 100, 92])
    paint("brodmann-map", [[80, 76, 97, 88]])

    # Views and section planes (slide 17).
    extract(17, 2, "four-views")
    paint("four-views", [[17, 0, 30, 4], [37, 0, 48, 13], [65, 0, 79, 4], [88.5, 0, 98, 12.5], [29, 49, 36, 54], [83, 49, 90, 54], [37, 96, 45, 100], [89, 96, 96, 100], [19, 57, 31, 62], [69, 57, 80, 62], [3, 96, 27, 100], [54, 96, 78, 100]])

    # Cytoarchitecture (slide 24, V1 to V2 laminar photo, labels kept).
    extract(24, 3, "cortical-layers")

    # Scales of the brain (slide 11, labels kept).
    extract(11, 2, "scales")

    # Internal structure of the neuron (slide 34, Figure 2.8, labels kept).
    extract(34, 2, "neuron-internal")
    crop("neuron-internal", [0, 0, 100, 92])

    # Stains: Nissl (27), Golgi (27), electron micrograph (36).
    extract(27, 2, "nissl-photo")
    crop("nissl-photo", [2, 3, 44, 94])
    extract(27, 4, "golgi-photo")
    crop("golgi-photo", [0, 0, 100, 82])
    extract(36, 2, "em-synapse")
    crop("em-synapse", [15, 10, 63, 48])
    compose("stains", [F / "nissl-photo.webp", F / "golgi-photo.webp", F / "em-synapse.webp"], height=520, gap=30)

    # Glia: astrocyte (slide 35, Figure 2.24), oligodendrocyte (BioArt
    # 397), microglia (Servier).
    extract(35, 3, "astrocyte-slide")
    crop("astrocyte-slide", [0, 0, 100, 76])
    run("scripts/retouch_figure.py", "svg2png", "assets/incoming/bioart/bioart-000397-oligodendrocyte.svg", F / "oligodendrocyte-bioart.webp", "--width", 1200, "--trim")
    run("scripts/retouch_figure.py", "crop", "assets/incoming/servier/servier-microglia-01.png", F / "microglia-servier.webp", "--box", 0, 0, 100, 100)
    compose("glia-types", [F / "astrocyte-slide.webp", F / "oligodendrocyte-bioart.webp", F / "microglia-servier.webp"], height=520, gap=40)

    # Prototypical neuron (BioArt 197) and synapse (Servier).
    run("scripts/retouch_figure.py", "svg2png", "assets/incoming/bioart/bioart-000197-healthy-neuron.svg", F / "neuron.webp", "--width", 1400, "--trim")
    run("scripts/retouch_figure.py", "crop", "assets/incoming/servier/servier-synapse-03.png", F / "synapse.webp", "--box", 0, 0, 100, 100)


if __name__ == "__main__":
    main()
