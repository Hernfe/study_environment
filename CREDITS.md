# Figure credits

Every image asset used on the study site is listed here with its
source, original URL, licence and whether attribution is required.
Keep this file current: when a lecture page starts using an asset,
add a row to "Assets in use". Assets that are downloaded but not yet
used are listed under "Downloaded, not yet in use" so their provenance
is not lost.

Figures cropped from the lecture slides are course material (many are
textbook figures under the publisher's copyright). They are used here
for the student's own study of the course and are listed with deck and
page so they can be replaced if the site is ever shared more widely.

## Sources and licences

| Source | Licence | Attribution required | Notes |
| --- | --- | --- | --- |
| In-house SVG (`src/content/figures/`) | Same as this repository | No | Hand-drawn for this site. |
| NIH BioArt Source, https://bioart.niaid.nih.gov | Public Domain (US Government work) | No, but credit "Courtesy of NIAID" is requested | SVG, PNG, AI and EPS per illustration. Creator named on each detail page. |
| Servier Medical Art, https://smart.servier.com | CC BY 4.0, https://creativecommons.org/licenses/by/4.0/ | Yes | Web PNGs (small) and PPTX kits (vector). Credit line: "Servier Medical Art, https://smart.servier.com, CC BY 4.0". |
| Bioicons, https://bioicons.com (repo https://github.com/duerrsimon/bioicons) | Per icon: cc-0, cc-by-3.0, cc-by-4.0, cc-by-sa-3.0, cc-by-sa-4.0, mit, bsd | Depends on the icon; `scripts/find_asset.py` prints it | The licence is the first folder under `static/icons/`; author is the third. Servier icons inside Bioicons are the older CC BY 3.0 release. |

## Assets in use

All raster files are in `src/assets/figures/L01/`, built by
`scripts/figures_L01.py`; each has a sidecar JSON with the source page
or file and the crop and paint boxes. The slide crops are the figures
the lecturer showed, reproduced here for the student's own study of
that course; most of them are textbook figures (Bear, Connors and
Paradiso, Neuroscience: Exploring the Brain) and stay under the
publisher's copyright, so this site should not be redistributed beyond
the course context. Printed labels were painted out so the quiz mode
works.

| File | Where used | Source | Original | Licence | Attribution required |
| --- | --- | --- | --- | --- | --- |
| `scales.webp` | L01 Scales | L01 slide deck, page 11 | Course slides | Course material | Cite the course |
| `four-views.webp` | L01 Directions (three figures) | L01 slide deck, page 17 (textbook Ch 7 figure) | Course slides | Course material | Cite the course |
| `gross-features.webp` | L01 Gross anatomy | L01 slide deck, page 18 | Course slides | Course material | Cite the course |
| `gyri-sulci.webp` | L01 Gross anatomy | L01 slide deck, page 19 | Course slides | Course material | Cite the course |
| `lobes.webp` | L01 Gross anatomy, lecture quiz q06 | L01 slide deck, page 20 | Course slides | Course material | Cite the course |
| `functional-areas.webp` | L01 Functional localization (two figures) | L01 slide deck, page 21 | Course slides | Course material | Cite the course |
| `brodmann-map.webp` | L01 Cytoarchitecture | L01 slide deck, page 25 | Course slides | Course material | Cite the course |
| `cortical-layers.webp` | L01 Cytoarchitecture | L01 slide deck, page 24 | Course slides | Course material | Cite the course |
| `neuron-internal.webp` | L01 Prototypical neuron | L01 slide deck, page 34 (textbook Figure 2.8) | Course slides | Course material | Cite the course |
| `stains.webp` (nissl-photo, golgi-photo, em-synapse) | L01 Neuron doctrine | L01 slide deck, pages 27 and 36 (textbook Figures 2.1, 2.3, 2.25) | Course slides | Course material | Cite the course |
| `glia-types.webp`, left panel (astrocyte-slide) | L01 Glia | L01 slide deck, page 35 (textbook Figure 2.24) | Course slides | Course material | Cite the course |
| `glia-types.webp`, middle panel (oligodendrocyte-bioart) | L01 Glia | NIH BioArt Source, Oligodendrocyte, NIAID Visual & Medical Arts | https://bioart.niaid.nih.gov/bioart/397 | Public Domain | No; credit "Courtesy of NIAID" |
| `glia-types.webp`, right panel (microglia-servier) | L01 Glia | Servier Medical Art, Microglia | https://smart.servier.com/smart_image/microglia/ | CC BY 4.0 | Yes: Servier Medical Art, https://smart.servier.com |
| `neuron.webp` | L01 Prototypical neuron | NIH BioArt Source, Healthy neuron, NIAID Visual & Medical Arts | https://bioart.niaid.nih.gov/bioart/197 | Public Domain | No; credit "Courtesy of NIAID" |
| `synapse.webp` | L01 Synaptic transmission | Servier Medical Art, Synapse | https://smart.servier.com/smart_image/synapse-overview/ | CC BY 4.0 | Yes: Servier Medical Art, https://smart.servier.com |
| `src/content/figures/charts.js` (neuron-counts, disorder-burden) | L01 | d3 charts drawn for this site; data read off slides 16 and 13 (Herculano-Houzel; DiLuca and Olesen 2014) | n/a | Repository licence | No |
| `src/content/figures/cells.js` (axonal-transport) | L01 Axonal transport | In-house SVG (no slide figure or library asset exists for this) | n/a | Repository licence | No |
| `src/content/figures/example-cell.js` | L00 (dev example) | In-house SVG | n/a | Repository licence | No |

Credit lines shown on the site: the footer of every page links here.
When a page is exported or shared, add "Illustrations: NIH BioArt
(courtesy of NIAID); Servier Medical Art (CC BY 4.0); course slides".

## Downloaded, not yet in use

Files live in `assets/incoming/` (ignored by git). Each BioArt file has a
sidecar `bioart-NNNNNN.json` with the parsed metadata; the Servier
folder has `servier-index.json`.

### NIH BioArt Source (Public Domain, credit "Courtesy of NIAID")

| File | Title | Creator | Original URL |
| --- | --- | --- | --- |
| `assets/incoming/bioart/bioart-000060-brain-lateral.svg` | Brain Lateral | Ryan Kissinger | https://bioart.niaid.nih.gov/bioart/60 |
| `assets/incoming/bioart/bioart-000197-healthy-neuron.svg` | Healthy neuron (myelinated axon), now in use as `neuron.webp` | NIAID Visual & Medical Arts | https://bioart.niaid.nih.gov/bioart/197 |
| `assets/incoming/bioart/bioart-000397-oligodendrocyte.svg` | Oligodendrocyte, now in use in `glia-types.webp` | NIAID Visual & Medical Arts | https://bioart.niaid.nih.gov/bioart/397 |
| `assets/incoming/bioart/bioart-000424-pyramidal-neuron-beige.svg` | Pyramidal Neuron | Ryan Kissinger | https://bioart.niaid.nih.gov/bioart/424 |
| `assets/incoming/bioart/bioart-000040-astrocyte.svg` | Astrocyte | NIAID Visual & Medical Arts | https://bioart.niaid.nih.gov/bioart/40 |
| `assets/incoming/bioart/bioart-000670-astrocyte-blue.svg` | Astrocyte | NIAID Visual & Medical Arts | https://bioart.niaid.nih.gov/bioart/670 |
| `assets/incoming/bioart/bioart-000671-astrocyte-blue.svg` | Astrocyte | NIAID Visual & Medical Arts | https://bioart.niaid.nih.gov/bioart/671 |
| `assets/incoming/bioart/bioart-000672-astrocyte-blue.svg` | Astrocyte (simple) | NIAID Visual & Medical Arts | https://bioart.niaid.nih.gov/bioart/672 |
| `assets/incoming/bioart/bioart-000688-blood-brain-barrier.svg` | Blood-Brain Barrier | NIAID Visual & Medical Arts | https://bioart.niaid.nih.gov/bioart/688 |

### Servier Medical Art (CC BY 4.0, attribution required)

Web PNGs: `assets/incoming/servier/servier-*.png`, one per illustration
in the Brain, Neural cells, Synapses and Other nervous system
categories; `servier-index.json` maps each file to its detail page.

Kits: `assets/incoming/servier/SMART-Nervous-system.pptx` and
`SMART-Neural-cells.pptx` (source
https://smart.servier.com/wp-content/uploads/2016/10/). Slides exported
with `scripts/pptx_export.ps1` to `assets/incoming/servier/kits/` as
3000 px PNG and vector EMF. Slides carry the Servier template
background, so crop before use.

### Bioicons

Nothing copied out yet. Search with `python scripts/find_asset.py <keyword>`.
