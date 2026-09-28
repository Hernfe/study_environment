# Figures

Hand-drawn SVG geometry looks homemade and takes the longest to make.
The slides already contain the exact diagrams the course examines.
Extract first, draw last. The repo's `docs/DESIGN.md` section 6 is the
authoritative figure spec; where this file and it disagree, the repo
wins.

## Source order

Work down this list per figure and stop at the first that yields a
usable result.

1. The lecture's own slide deck. The right answer for anything
   structural, a circuit diagram, a recording trace, a data table or a
   teacher-drawn schematic. It also guarantees the student sees the same
   picture in the exam.
2. NIH BioArt Source (bioart.niaid.nih.gov, public domain, attribution
   requested) or SMART Servier (smart.servier.com, CC BY 4.0), for
   anatomy and cell biology where the slide version cannot be cleaned.
   `scripts/bioart_fetch.py` and `scripts/servier_fetch.py` download
   into `assets/incoming/` (ignored by git).
3. Bioicons (bioicons.com; mixed CC0, MIT and CC BY). Strong on membrane
   proteins and channels, thin on anatomy. `scripts/find_asset.py`
   searches a local clone in `assets/bioicons/` (ignored).
4. Hand-drawn SVG with d3 for scales, axes and ticks. Only when a
   variable changes an outcome, or when nothing above exists.

Record every asset in `CREDITS.md`: file, where used, source, URL,
licence, attribution. Videos and poster frames too.

## Extraction

`scripts/extract_figures.py`:

- `list "<deck.pdf>" --preview`: every placed image with page, pixel
  size and rectangle, numbered preview pages, and a closing video
  report (clips the PDF export renders as a black box, media
  annotations, links to online videos, by slide). `videos "<deck.pdf>"`
  prints the video report alone.
- `crop "<deck.pdf>" --course <slug> --lecture L0X --page N` with
  `--rect` (points), `--frac` (page fractions) or `--image K` (embedded
  image K from `list`), and `--name`. Writes
  `src/assets/figures/<slug>/L0X/<name>.webp` at 300 DPI, under 200 KB,
  with a sidecar JSON recording source, page and crop box.

Write the whole lecture's steps into `scripts/figures_<slug>_L0X.py`
so the set regenerates after a style change.

## Retouching

`scripts/retouch_figure.py`:

- `paint`: fill boxes with a flat colour (printed labels on flat
  backgrounds).
- `smear`: extend neighbouring pixels over a box.
- `erase`: OpenCV inpainting along lines (leader stubs) or over boxes
  (labels on shaded artwork). Needs `opencv-python-headless`.
- `crop`, `compose` (panels side by side or in columns).

Erase the labels, keep the artwork, so the hotspot widget draws the only
leaders. If a photograph or micrograph has labels baked in so that
inpainting damages it, keep them and set `quiz: false`.

## Hotspots

`image-hotspots` (`src/js/widgets/imageHotspots.js`) labels beside the
picture, not on it:

- A 5 px anchor dot on the structure (fixed blue with a white ring, so
  it reads on any photograph; on SVG charts a 9 px hollow accent ring).
- A 1 px accent leader from the anchor to the badge.
- An 18 px numbered badge in a gutter outside the image. `gutter:
  'sides' | 'ends' | 'all' | 'auto'` (auto uses the ends for strips
  wider than 2.2:1). Badges go to the nearest gutter unless `side` says
  otherwise, and are spread so none overlap.
- Hover or focus on a badge or list entry: that badge fills, its leader
  thickens, its outline appears, everything else dims to 35 percent.
- `side: 'inline'` only where the picture has clear empty space: 16 px
  badge, no leader, edge touching the anchor on the `dir` side, or at
  `bx, by` (charts put it just past the printed value). Never centred on
  the anchor.
- Below 48 rem the gutters collapse: every badge becomes inline and
  offset from its anchor.
- Region list beside the picture on wide screens, below it on narrow or
  with `layout: 'stack'`.
- Arrow keys and Home/End move between regions; Enter or Space pins.
- Quiz mode hides the names and asks through selects. Off when the
  picture prints the answers. The same regions drive the label question.
- At most seven regions per figure. One idea per figure: if a second
  idea needs the same picture, make a second figure with its own
  regions.

Watch the resize path. If the stage's max-width depends on aspect ratio,
the content box can be identical with and without gutters, so a
ResizeObserver on it never fires when the gutters collapse. Observe
something that actually changes, or listen to the media query.

## Charts and interactive demos

Use d3 for scales, axes and ticks, and apply the Tufte skill.

- One idea per figure, at most seven labelled elements.
- Range-framed axes with two ticks at the data extremes, no grid.
- Direct labels next to the data, no legend where it fits, no second
  axis, no 3D, no pie charts, no rainbow scales, no chart frame.
- Colour only on the element under discussion; every other row muted
  grey, one focal row in the accent.
- Hand-drawn SVG: 1.5 px `currentColor` strokes, 1 px muted leaders,
  11 px labels. Charts: 12 px labels, 11 px units and ticks, 1.5 px
  value lines, 4 px dots.
- Sorted dot plots as small multiples, one panel per measure. When
  measures rank items differently, keep one shared order and print each
  panel's own rank as a small muted number.
- On a chart, never run a leader across a printed value; use the hollow
  ring and an inline badge past the value.
- Charts and demo plots scroll sideways inside `.plot` on narrow
  screens rather than shrinking below legibility.
- Tall pictures are capped at 28 rem. Every figure has a one or two
  sentence caption and a `fallbackAlt` describing what is drawn.

For traces and waveforms the student must read in the exam, keep axis
units and scale identical to the course's own figures so the shapes
match what they will see.
