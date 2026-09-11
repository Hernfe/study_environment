# Figure credits

Every image asset used on the study site is listed here with its
source, original URL, licence and whether attribution is required.
Keep this file current: when a lecture page starts using an asset,
add a row to "Assets in use". Assets that are downloaded but not yet
used are listed under "Downloaded, not yet in use" so their provenance
is not lost.

Lecture slides, TA notes and textbook figures are course material and
are never reproduced on the site as-is. Where a diagram is redrawn from
a slide, the row says "redrawn after slide" and names the deck and
page; the redrawing is original work.

## Sources and licences

| Source | Licence | Attribution required | Notes |
| --- | --- | --- | --- |
| In-house SVG (`src/content/figures/`) | Same as this repository | No | Hand-drawn for this site. |
| NIH BioArt Source, https://bioart.niaid.nih.gov | Public Domain (US Government work) | No, but credit "Courtesy of NIAID" is requested | SVG, PNG, AI and EPS per illustration. Creator named on each detail page. |
| Servier Medical Art, https://smart.servier.com | CC BY 4.0, https://creativecommons.org/licenses/by/4.0/ | Yes | Web PNGs (small) and PPTX kits (vector). Credit line: "Servier Medical Art, https://smart.servier.com, CC BY 4.0". |
| Bioicons, https://bioicons.com (repo https://github.com/duerrsimon/bioicons) | Per icon: cc-0, cc-by-3.0, cc-by-4.0, cc-by-sa-3.0, cc-by-sa-4.0, mit, bsd | Depends on the icon; `scripts/find_asset.py` prints it | The licence is the first folder under `static/icons/`; author is the third. Servier icons inside Bioicons are the older CC BY 3.0 release. |

## Assets in use

| File | Where used | Source | Original URL | Licence | Attribution required |
| --- | --- | --- | --- | --- | --- |
| `src/content/figures/brain-lateral.js` | L01 | In-house SVG, redrawn after slide | n/a | Repository licence | No |
| `src/content/figures/neuron.js` | L01 | In-house SVG | n/a | Repository licence | No |
| `src/content/figures/cells.js` (cortical-layers, synapse-steps, axonal-transport, glia-overview, stain-triptych) | L01 | In-house SVG | n/a | Repository licence | No |
| `src/content/figures/charts.js` (scales-ladder, disorder-burden, neuron-counts) | L01 | In-house SVG, data from slides | n/a | Repository licence | No |
| `src/content/figures/example-cell.js` | L00 (dev example) | In-house SVG | n/a | Repository licence | No |

## Downloaded, not yet in use

Files live in `assets/incoming/` (ignored by git). Each BioArt file has a
sidecar `bioart-NNNNNN.json` with the parsed metadata; the Servier
folder has `servier-index.json`.

### NIH BioArt Source (Public Domain, credit "Courtesy of NIAID")

| File | Title | Creator | Original URL |
| --- | --- | --- | --- |
| `assets/incoming/bioart/bioart-000060-brain-lateral.svg` | Brain Lateral | Ryan Kissinger | https://bioart.niaid.nih.gov/bioart/60 |
| `assets/incoming/bioart/bioart-000197-healthy-neuron.svg` | Healthy neuron (myelinated axon) | NIAID Visual & Medical Arts | https://bioart.niaid.nih.gov/bioart/197 |
| `assets/incoming/bioart/bioart-000397-oligodendrocyte.svg` | Oligodendrocyte | NIAID Visual & Medical Arts | https://bioart.niaid.nih.gov/bioart/397 |
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
