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
works, and their leader-line stubs were inpainted
(`scripts/retouch_figure.py erase`, OpenCV Telea) so the hotspot widget
draws the only leaders; `gyri-sulci.webp` is also cropped to the brain.
`scripts/figures_L01.py` records every step.

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
| `src/content/figures/cells.js` (axonal-transport) | L01 Axonal transport | In-house SVG (no slide figure or library asset exists for this), shown through the image-hotspots widget | n/a | Repository licence | No |
| `src/content/figures/example-cell.js` | L00 (dev example) | In-house SVG | n/a | Repository licence | No |

Lecture 2 raster files are in `src/assets/figures/L02/`, built by
`scripts/figures_L02.py` (slide crops with labels painted out, smeared
over gradients or inpainted; each sidecar JSON records the steps).

| File | Where used | Source | Original | Licence | Attribution required |
| --- | --- | --- | --- | --- | --- |
| `bilayer.webp` | L02 Membrane | L02 slide deck, page 6 (textbook Figure 3.3) | Course slides | Course material | Cite the course |
| `ion-channel.webp` | L02 Ion channels | L02 slide deck, page 11 (textbook Figure 3.7) | Course slides | Course material | Cite the course |
| `measure-vm.webp` | L02 Resting potential | L02 slide deck, page 14 (textbook Figure 3.11) | Course slides | Course material | Cite the course |
| `k-equilibrium.webp` | L02 Resting potential | L02 slide deck, page 14 (textbook Figure 3.12) | Course slides | Course material | Cite the course |
| `pump.webp` | L02 Ions and pumps | L02 slide deck, page 20 (textbook Figure 3.16) | Course slides | Course material | Cite the course |
| `recording.webp` | L02 Waveform | L02 slide deck, page 26 (textbook Box 4.1 Figure A) | Course slides | Course material | Cite the course |
| `inject-current.webp` | L02 Threshold | L02 slide deck, page 29 (textbook Figure 4.2) | Course slides | Course material | Cite the course |
| `sodium-channel.webp` | L02 Channel structure | L02 slide deck, page 33 (textbook Figure 4.7 b, c) | Course slides | Course material | Cite the course |
| `channel-gating.webp` | L02 Channel structure | L02 slide deck, page 34 (textbook Figure 4.8) | Course slides | Course material | Cite the course |
| `patch-clamp.webp` | L02 Patch clamp | L02 slide deck, page 35 (textbook Box 4.3 Figure A) | Course slides | Course material | Cite the course |
| `channel-record.webp`, `channel-model.webp` | L02 Patch clamp, Channel states | L02 slide deck, page 36 (textbook Figure 4.10) | Course slides | Course material | Cite the course |
| `spike-initiation.webp` | L02 Spike initiation | L02 slide deck, page 38 (textbook Figure 4.16) | Course slides | Course material | Cite the course |
| `myelinated-axon.webp` | L02 Myelin | NIH BioArt Source, Healthy neuron (axon crop), NIAID Visual & Medical Arts | https://bioart.niaid.nih.gov/bioart/197 | Public Domain | No; credit "Courtesy of NIAID" |
| `src/content/figures/membrane.js` (ap-waveform) and the widgets `nernst-calc`, `ghk-explorer`, `ap-scrubber`, `voltage-clamp`, `conduction-demo` | L02 | d3 figures and demos drawn for this site from a Hodgkin-Huxley model (`src/js/widgets/hhModel.js`) and textbook constants | n/a | Repository licence | No |

Lecture 3 raster files are in `src/assets/figures/L03/`, built by
`scripts/figures_L03.py`. Two slide figures reproduce published
review figures (Sultan and Shi 2018, Wiley Interdisciplinary Reviews:
Developmental Biology, CC BY; Rudy et al. 2011, Developmental
Neurobiology) as shown on the slides.

| File | Where used | Source | Original | Licence | Attribution required |
| --- | --- | --- | --- | --- | --- |
| `synapse-types.webp` | L03 Synapse anatomy | L03 slide deck, page 9 | Course slides | Course material | Cite the course |
| `chemical-synapse.webp` | L03 Synapse anatomy, lecture quiz q07 | L03 slide deck, page 14 (textbook Figure 5.4) | Course slides | Course material | Cite the course |
| `synapse-em.webp` | L03 Synapse anatomy | L03 slide deck, page 15 (textbook Figure 5.5 a) | Course slides | Course material | Cite the course |
| `gap-junction.webp` | L03 Electrical synapses | L03 slide deck, page 10 (textbook Figure 5.1) | Course slides | Course material | Cite the course |
| `electrical-psp.webp` | L03 Electrical synapses | L03 slide deck, page 11 (textbook Figure 5.2) | Course slides | Course material | Cite the course |
| `synchrony.webp` | L03 Electrical synapses | L03 slide deck, page 12 (textbook Figure 5.3) | Course slides | Course material | Cite the course |
| `targeting.webp` | L03 Targeting | L03 slide deck, page 17 (textbook Figure 5.7) | Course slides | Course material | Cite the course |
| `spine-em.webp` | L03 Spines | L03 slide deck, page 19 (Harris) | Course slides | Course material | Cite the course |
| `em-3d.webp` | L03 Spines | L03 slide deck, page 20 | Course slides | Course material | Cite the course |
| `synthesis.webp`, `synthesis-inset.webp` | L03 Transmitters | L03 slide deck, page 22 (textbook Figure 5.11) | Course slides | Course material | Cite the course |
| `vesicle-cycle.webp` | L03 Release | L03 slide deck, page 24 (textbook Figure 5.12) | Course slides | Course material | Cite the course |
| `snare.webp` | L03 Release | L03 slide deck, page 25 (textbook Box 5.3) | Course slides | Course material | Cite the course |
| `ionotropic.webp` | L03 Receptors | L03 slide deck, page 26 (textbook Figure 5.14) | Course slides | Course material | Cite the course |
| `gpcr-types.webp` | L03 Receptors | L03 slide deck, page 52 (textbook Figure 5.17) | Course slides | Course material | Cite the course |
| `psp-generation.webp` | L03 EPSPs and IPSPs | L03 slide deck, page 35 (textbook Figures 5.15 and 5.16) | Course slides | Course material | Cite the course |
| `patch-transmitter.webp` | L03 Recording | L03 slide deck, page 29 (textbook Figure 5.18) | Course slides | Course material | Cite the course |
| `summation.webp` | L03 Summation | L03 slide deck, page 30 (textbook Figure 5.19) | Course slides | Course material | Cite the course |
| `cable.webp`, `shunting.webp` | L03 Dendrites | L03 slide deck, pages 31 and 32 (textbook Figures 5.20 and 5.21) | Course slides | Course material | Cite the course |
| `glutamate-receptors.webp` | L03 Transmitter systems | L03 slide deck, page 35 | Course slides | Course material | Cite the course |
| `gabaa.webp` | L03 Transmitter systems | L03 slide deck, page 36 (textbook Figure 6.22) | Course slides | Course material | Cite the course |
| `nmda.webp` | L03 NMDA | L03 slide deck, page 39 (textbook Figure 6.21) | Course slides | Course material | Cite the course |
| `interneuron-types.webp`, `interneuron-targets.webp`, `interneuron-markers.webp`, `circuit-motifs.webp` | L03 Interneurons, Coupling | L03 slide deck, pages 44, 46 and 48 (Sultan and Shi 2018, Figure 1) | https://doi.org/10.1002/wdev.306 | CC BY 4.0 (WIREs Dev Biol open access) | Yes: Sultan and Shi 2018 |
| `ne-cascade.webp` | L03 Pharmacology | L03 slide deck, page 53 (textbook Figure 5.22) | Course slides | Course material | Cite the course |
| Widgets `synapse-timeline`, `synapse-compare`, `driving-force`, `summation-shunt`, `circuit-motifs`, `ampa-nmda` | L03 | d3 demos drawn for this site; the NMDA block uses the Jahr and Stevens 1990 form | n/a | Repository licence | No |

Lecture 4 raster files are in `src/assets/figures/L04/`, built by
`scripts/figures_L04.py`. Nearly all are Bear, Connors and Paradiso
figures as shown on the slides. The prey and predator field schematics
(`prey-field.webp`, `predator-field.webp`) are extracted but not used.
The slide 34 video ("Cortical neurons V1") is not on the site yet.

| File | Where used | Source | Original | Licence | Attribution required |
| --- | --- | --- | --- | --- | --- |
| `eye-gross.webp` | L04 Eye structure | L04 slide deck, page 6 (textbook Figure 9.4) | Course slides | Course material | Cite the course |
| `eye-section.webp` | L04 Eye structure | L04 slide deck, page 6 (textbook Figure 9.6) | Course slides | Course material | Cite the course |
| `accommodation.webp` | L04 Accommodation | L04 slide deck, page 7 (textbook Figure 9.8) | Course slides | Course material | Cite the course |
| `visual-field.webp` | L04 Visual field | L04 slide deck, page 9 (textbook Figure 9.9) | Course slides | Course material | Cite the course |
| `visual-angle.webp` | L04 Visual field | L04 slide deck, page 9 (textbook Figure 9.10) | Course slides | Course material | Cite the course |
| `retina-layers.webp` | L04 Retinal layers, lecture quiz q02 | L04 slide deck, page 10 (textbook Figure 9.12) | Course slides | Course material | Cite the course |
| `fovea.webp` | L04 Retinal layers | L04 slide deck, page 11 (textbook Figure 9.16) | Course slides | Course material | Cite the course |
| `convergence.webp` | L04 Rods and cones | L04 slide deck, page 12 (textbook Figure 9.15 b) | Course slides | Course material | Cite the course |
| `microcircuit.webp` | L04 Microcircuit | L04 slide deck, page 13 (textbook Figure 9.11) | Course slides | Course material | Cite the course |
| `receptive-field.webp` | L04 Receptive fields | L04 slide deck, page 15 (textbook Figure 9.25) | Course slides | Course material | Cite the course |
| `cnn-field.webp` | L04 Receptive fields | L04 slide deck, page 16 (convolutional network diagram) | Course slides | Course material | Cite the course |
| `bipolar.webp` | L04 Bipolar cells | L04 slide deck, page 17 (textbook Figure 9.26) | Course slides | Course material | Cite the course |
| `cs-spot.webp` | L04 Center-surround | L04 slide deck, page 20 (textbook Figure 9.27) | Course slides | Course material | Cite the course |
| `cs-edge.webp` | L04 Center-surround, lecture quiz q08 | L04 slide deck, page 21 (textbook Figure 9.28) | Course slides | Course material | Cite the course |
| `retinofugal.webp` | L04 Retinofugal projection, lecture quiz q03 | L04 slide deck, page 22 (textbook Figure 10.2) | Course slides | Course material | Cite the course |
| `hemifields.webp` | L04 Retinofugal projection | L04 slide deck, page 23 (textbook Figure 10.3) | Course slides | Course material | Cite the course |
| `visual-pathway.webp` | L04 LGN | L04 slide deck, page 24 (textbook Figure 10.4) | Course slides | Course material | Cite the course |
| `lgn-nissl.webp` | L04 LGN | L04 slide deck, page 25 (textbook Figure 10.7) | Course slides | Course material | Cite the course |
| `lgn-inputs.webp` | L04 LGN | L04 slide deck, page 25 (textbook Figure 10.8) | Course slides | Course material | Cite the course |
| `mp-cells.webp` | L04 LGN | L04 slide deck, page 26 (textbook Figure 9.30) | Course slides | Course material | Cite the course |
| `lgn-organization.webp` | L04 LGN | L04 slide deck, page 26 (textbook Figure 10.9) | Course slides | Course material | Cite the course |
| `v1-location.webp` | L04 Retinotopy | L04 slide deck, page 28 (textbook Figure 10.10) | Course slides | Course material | Cite the course |
| `retinotopy-a.webp` | L04 Retinotopy | L04 slide deck, page 28 (textbook Figure 10.11 a) | Course slides | Course material | Cite the course |
| `retinotopy.webp` | L04 Retinotopy | L04 slide deck, page 28 (textbook Figure 10.11 b) | Course slides | Course material | Cite the course |
| `autoradiography.webp` | L04 Ocular dominance | L04 slide deck, page 29 (textbook Figure 10.15) | Course slides | Course material | Cite the course |
| `od-stripes.webp` | L04 Ocular dominance | L04 slide deck, page 30 (textbook Figure 10.16) | Course slides | Course material | Cite the course |
| `od-human.webp` | L04 Ocular dominance | L04 slide deck, page 30 (human ocular dominance stripes) | Course slides | Course material | Cite the course |
| `od-mixing.webp` | L04 Ocular dominance | L04 slide deck, page 31 (textbook Figure 10.17) | Course slides | Course material | Cite the course |
| `cortex-layers.webp` | L04 Cortical layers | L04 slide deck, page 32 (textbook Figures 10.13 and 10.18, composed) | Course slides | Course material | Cite the course |
| `orientation.webp` | L04 Orientation | L04 slide deck, page 33 (textbook Figure 10.20) | Course slides | Course material | Cite the course |
| `simple-cell.webp` | L04 Orientation | L04 slide deck, page 35 (textbook Figure 10.23) | Course slides | Course material | Cite the course |
| `streams.webp` | L04 Streams | L04 slide deck, page 36 (textbook Figure 10.27 a) | Course slides | Course material | Cite the course |
| `extrastriate.webp` | L04 Streams | L04 slide deck, page 36 (textbook Figure 10.27 b) | Course slides | Course material | Cite the course |
| `stream-flow.webp` | L04 Streams | L04 slide deck, page 36 (textbook Figure 10.27 c) | Course slides | Course material | Cite the course |
| `wiring.webp` | L04 Streams | L04 slide deck, page 37 (Felleman and Van Essen style wiring diagram) | Course slides | Course material | Cite the course |
| `human-areas.webp` | L04 Streams | L04 slide deck, page 38 (textbook Figure 10.28) | Course slides | Course material | Cite the course |
| `hierarchy.webp` | L04 Organizational principles | L04 slide deck, page 39 (organizational principles diagram) | Course slides | Course material | Cite the course |
| `faces.webp` | L04 fMRI | L04 slide deck, page 40 (textbook Figure 10.29) | Course slides | Course material | Cite the course |
| `src/content/figures/vision.js` (rod and cone density, hierarchy chart) and the widgets `center-surround`, `hemifield-tracer`, `simple-cell` | L04 | d3 figures and demos drawn for this site; density curves traced from the slide, latencies and field sizes read off slide 39 | n/a | Repository licence | No |

Credit lines shown on the site: the footer of every page names the
sources whose licence asks for attribution and links here. When a page is
exported or shared, add "Illustrations: NIH BioArt (courtesy of NIAID);
Servier Medical Art (CC BY 4.0); Sultan and Shi 2018, WIREs Dev Biol,
CC BY 4.0; course slides".

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

### Slide crops built but not used

| File | Why it is kept | Source | Original | Licence |
| --- | --- | --- | --- | --- |
| `src/assets/figures/L03/interneuron-groups.webp` | Built by `scripts/figures_L03.py`; the three Rudy groups are taught as a compare table instead, so no page shows the picture. Delete it or use it, but do not lose the provenance. | L03 slide deck, page 45 (Rudy et al. 2011) | https://doi.org/10.1002/dneu.20853 | Publisher copyright, course material |

### Bioicons

Nothing copied out yet. Search with `python scripts/find_asset.py <keyword>`.
