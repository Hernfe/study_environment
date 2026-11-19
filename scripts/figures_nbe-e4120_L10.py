"""Extract the original quantal-release traces and histogram from L10."""
from pathlib import Path

import pymupdf
from PIL import Image

root = Path(__file__).resolve().parents[1]
deck = root / "source/nbe-e4120/lectures/Ephys-Lecture-10-2026_Synapse.pdf"
output = root / "src/assets/figures/nbe-e4120/L10/katz-release.webp"
with pymupdf.open(deck) as document:
    panel = document[30].get_pixmap(
        matrix=pymupdf.Matrix(2, 2),
        clip=pymupdf.Rect(424, 90, 952, 361),
        alpha=False,
    )
    output.parent.mkdir(parents=True, exist_ok=True)
    Image.frombytes("RGB", (panel.width, panel.height), panel.samples).save(output, quality=92)
