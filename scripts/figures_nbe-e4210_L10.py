"""Regenerate embedded figure panels from the local Brain L10 deck."""
from io import BytesIO
from pathlib import Path

import pymupdf
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
DECK = ROOT / 'source/nbe-e4210/slides/NBE-E4210 LECTURE 10 - 2026.pdf'
OUT = ROOT / 'src/assets/figures/nbe-e4210/L10'
# Rectangles are fractions of each embedded image, with captions removed
# where the study page supplies its own. Original chart axes are retained.
PANELS = {
    'visual-pathway': (5, 1, (0, 0, 1, .95)),
    'cleavage': (8, 1, (0, 0, 1, 1)),
    'inside-out': (14, 1, (0, 0, 1, 1)),
    'differentiation': (21, 1, (0, 0, 1, .84)),
    'guidance-address': (26, 1, (0, .40, 1, 1)),
    'growth-cone': (28, 1, (0, 0, 1, .77)),
    'synapse-assembly': (30, 1, (0, 0, 1, 1)),
    'trophic-competition': (33, 1, (0, 0, 1, .80)),
    'pruning': (35, 1, (0, 0, 1, 1)),
    'hebb': (38, 1, (.35, 0, 1, 1)),
    'stimulation': (42, 1, (0, 0, 1, 1)),
    'stripes': (43, 1, (0, 0, 1, 1)),
    'dominance-histogram': (44, 1, (0, 0, 1, 1)),
    'right-eye-recording': (45, 1, (0, 0, 1, 1)),
    'modulators': (46, 1, (0, 0, 1, 1)),
    'nmda-resting': (56, 1, (0, 0, 1, 1)),
    'nmda-depolarised': (56, 2, (0, 0, 1, 1)),
}


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    with pymupdf.open(DECK) as deck:
        for name, (slide, index, bounds) in PANELS.items():
            xref = deck[slide - 1].get_images()[index - 1][0]
            raw = deck.extract_image(xref)['image']
            with Image.open(BytesIO(raw)) as original:
                width, height = original.size
                x0, y0, x1, y1 = bounds
                panel = original.convert('RGB').crop(
                    (round(x0 * width), round(y0 * height), round(x1 * width), round(y1 * height))
                )
            if name == 'nmda-depolarised':
                with Image.open(OUT / 'nmda-resting.webp') as resting:
                    pair = Image.new('RGB', (resting.width + 10 + panel.width, max(resting.height, panel.height)), 'white')
                    pair.paste(resting, (0, 0))
                    pair.paste(panel, (resting.width + 10, 0))
                pair.save(OUT / 'nmda-coincidence.webp', quality=89)
                (OUT / 'nmda-resting.webp').unlink()
            else:
                panel.thumbnail((1320, 1080))
                panel.save(OUT / f'{name}.webp', quality=87)


if __name__ == '__main__':
    main()
