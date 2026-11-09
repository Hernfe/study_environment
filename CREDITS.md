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
| In-house SVG (`src/content/nbe-e4210/figures/`) | Same as this repository | No | Hand-drawn for this site. |
| NIH BioArt Source, https://bioart.niaid.nih.gov | Public Domain (US Government work) | No, but credit "Courtesy of NIAID" is requested | SVG, PNG, AI and EPS per illustration. Creator named on each detail page. |
| Servier Medical Art, https://smart.servier.com | CC BY 4.0, https://creativecommons.org/licenses/by/4.0/ | Yes | Web PNGs (small) and PPTX kits (vector). Credit line: "Servier Medical Art, https://smart.servier.com, CC BY 4.0". |
| Bioicons, https://bioicons.com (repo https://github.com/duerrsimon/bioicons) | Per icon: cc-0, cc-by-3.0, cc-by-4.0, cc-by-sa-3.0, cc-by-sa-4.0, mit, bsd | Depends on the icon; `scripts/find_asset.py` prints it | The licence is the first folder under `static/icons/`; author is the third. Servier icons inside Bioicons are the older CC BY 3.0 release. |

## Assets in use

### Lecture 7

Rebuilt by `scripts/figures_nbe-e4210_L07.py`; crop/mask provenance is in
each asset's JSON sidecar. All paths below are under
`src/assets/figures/nbe-e4210/L07/`. Source: the locally supplied
`source/nbe-e4210/slides/NBE-E4210 LECTURE 07 - 2026.pdf`, no public deck
URL supplied. These are course/publisher copyrighted material for private
study, not newly licensed illustrations. Attribution: NBE-E4210 lecturer;
Bear, Connors and Paradiso, Neuroscience: Exploring the Brain, 4th ed.,
where the deck reproduces its figures. No library or generated images.

| File | Where used | Original source / attribution |
| --- | --- | --- |
| `anatomy.webp` | Orientation label practice | Slide 5, medial temporal anatomy |
| `control.webp` | Three control systems label practice | Slide 8, Bear Fig. 15.1 |
| `modulators.webp` | Monoamine label practice | Slide 11, Bear Figs. 15.12–15.14 |
| `cholinergic.webp` | Acetylcholine label practice | Slide 11, Bear Fig. 15.15 |
| `hypothalamus.webp` | Hypothalamic zones label practice | Slide 12, Bear Fig. 15.3 |
| `posterior.webp` | Posterior pituitary label practice | Slide 13, Bear Fig. 15.4 |
| `anterior.webp` | Anterior pituitary label practice | Slide 13, Bear Fig. 15.6 |
| `ans.webp` | Autonomic circuits label practice | Slide 14, Bear Fig. 15.8 |
| `ans-organs.webp` | Autonomic divisions label practice | Slide 15, Bear Fig. 15.9 |
| `emotions.webp` | Six emotions label practice | Slide 16, Nummenmaa et al. (2014), bodily maps reproduced on the slide; slide-only use, no additional box content |
| `masking.webp` | Unconscious emotion label practice | Slide 17, Bear Fig. 18.3; Morris, Öhman and Dolan (1998) |
| `elicitation.webp` | Measurement label practice | Slide 19, Levenson, emotion elicitation schematic |
| `papez.webp` | Limbic circuit label practice | Slide 22, Bear Fig. 18.5 |
| `dimensions.webp` | Emotion dimensions label practice | Slide 27, Bear Fig. 18.7 |
| `amygdala.webp` | Amygdala practice and quiz q03 | Slide 30, Bear Fig. 18.8 |
| `conditioning.webp` | Conditioning practice and quiz q15 | Slide 32; source link printed on the deck: https://oxfordre.com/view/10.1093/acrefore/9780190264086.001.0001/acrefore-9780190264086-e-129 |
| `fear.webp` | Fear circuit label practice | Slide 34, Bear Fig. 18.10 |
| `plasticity.webp` | LA plasticity label practice | Slide 36; https://pubmed.ncbi.nlm.nih.gov/11584069/ |
| `aggression.webp` | Aggression circuit label practice | Slide 37, Bear Fig. 18.14 |

No video assets were found or added.

All raster files are in `src/assets/figures/nbe-e4210/L01/`, built by
`scripts/figures_nbe-e4210_L01.py`; each has a sidecar JSON with the source page
or file and the crop and paint boxes. The slide crops are the figures
the lecturer showed, reproduced here for the student's own study of
that course; most of them are textbook figures (Bear, Connors and
Paradiso, Neuroscience: Exploring the Brain) and stay under the
publisher's copyright, so this site should not be redistributed beyond
the course context. Printed labels were painted out so the quiz mode
works, and their leader-line stubs were inpainted
(`scripts/retouch_figure.py erase`, OpenCV Telea) so the hotspot widget
draws the only leaders; `gyri-sulci.webp` is also cropped to the brain.
`scripts/figures_nbe-e4210_L01.py` records every step.

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
| `src/content/nbe-e4210/figures/charts.js` (neuron-counts, disorder-burden) | L01 | d3 charts drawn for this site; data read off slides 16 and 13 (Herculano-Houzel; DiLuca and Olesen 2014) | n/a | Repository licence | No |
| `src/content/nbe-e4210/figures/cells.js` (axonal-transport) | L01 Axonal transport | In-house SVG (no slide figure or library asset exists for this), shown through the image-hotspots widget | n/a | Repository licence | No |
| `src/content/nbe-e4210/figures/example-cell.js` | L00 (dev example) | In-house SVG | n/a | Repository licence | No |

Lecture 2 raster files are in `src/assets/figures/nbe-e4210/L02/`, built by
`scripts/figures_nbe-e4210_L02.py` (slide crops with labels painted out, smeared
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
| `src/content/nbe-e4210/figures/membrane.js` (ap-waveform) and the widgets `nernst-calc`, `ghk-explorer`, `ap-scrubber`, `voltage-clamp`, `conduction-demo` | L02 | d3 figures and demos drawn for this site from a Hodgkin-Huxley model (`src/js/widgets/hhModel.js`) and textbook constants | n/a | Repository licence | No |

Lecture 3 raster files are in `src/assets/figures/nbe-e4210/L03/`, built by
`scripts/figures_nbe-e4210_L03.py`. Two slide figures reproduce published
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
| `glutamate-receptors.webp` | L03 Transmitter systems; lecture quiz q25 (table) | L03 slide deck, page 35 | Course slides | Course material | Cite the course |
| `gabaa.webp` | L03 Transmitter systems | L03 slide deck, page 36 (textbook Figure 6.22) | Course slides | Course material | Cite the course |
| `nmda.webp` | L03 NMDA | L03 slide deck, page 39 (textbook Figure 6.21) | Course slides | Course material | Cite the course |
| `interneuron-types.webp`, `interneuron-targets.webp`, `interneuron-markers.webp`, `circuit-motifs.webp` | L03 Interneurons, Coupling | L03 slide deck, pages 44, 46 and 48 (Sultan and Shi 2018, Figure 1) | https://doi.org/10.1002/wdev.306 | CC BY 4.0 (WIREs Dev Biol open access) | Yes: Sultan and Shi 2018 |
| `ne-cascade.webp` | L03 Pharmacology | L03 slide deck, page 53 (textbook Figure 5.22) | Course slides | Course material | Cite the course |
| Widgets `synapse-timeline`, `synapse-compare`, `driving-force`, `summation-shunt`, `circuit-motifs`, `ampa-nmda` | L03 | d3 demos drawn for this site; the NMDA block uses the Jahr and Stevens 1990 form | n/a | Repository licence | No |

Lecture 4 raster files are in `src/assets/figures/nbe-e4210/L04/`, built by
`scripts/figures_nbe-e4210_L04.py`. Nearly all are Bear, Connors and Paradiso
figures as shown on the slides. The slide 34 video ("Cortical neurons V1") is not on the site yet.

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
| `bipolar-a.webp` | L04 lecture quiz q24 (table) | Crop of `bipolar.webp`, panel (a) only, panel letter painted out | Course slides | Course material | Cite the course |
| `cs-spot.webp` | L04 Center-surround | L04 slide deck, page 20 (textbook Figure 9.27) | Course slides | Course material | Cite the course |
| `cs-edge.webp` | L04 Center-surround, lecture quiz q08 | L04 slide deck, page 21 (textbook Figure 9.28) | Course slides | Course material | Cite the course |
| `retinofugal.webp` | L04 Retinofugal projection, lecture quiz q03 | L04 slide deck, page 22 (textbook Figure 10.2) | Course slides | Course material | Cite the course |
| `hemifields.webp` | L04 Retinofugal projection; L00 renderer test q35, q36 (lesion sites) | L04 slide deck, page 23 (textbook Figure 10.3) | Course slides | Course material | Cite the course |
| `binocular-fields.webp` | L04 Retinofugal projection | L04 slide deck, page 23 (the two binocular field schematics, composed) | Course slides | Course material | Cite the course |
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
| `src/content/nbe-e4210/figures/vision.js` (rod and cone density, hierarchy chart) and the widgets `center-surround`, `hemifield-tracer`, `simple-cell` | L04 | d3 figures and demos drawn for this site; density curves traced from the slide, latencies and field sizes read off slide 39 | n/a | Repository licence | No |
| `sound-wave.webp` | L05 What sound is | L05 slide deck, page 4 (slide graphic, compression bands and pressure wave) | Course slides | Course material | Cite the course |
| `ear.webp` | L05 Ear anatomy, lecture quiz q03 | L05 slide deck, page 6 (textbook Figure 11.3), labels painted out | Course slides | Course material | Cite the course |
| `middle-ear.webp` | L05 Middle ear | L05 slide deck, page 8 (textbook Figure 11.6) | Course slides | Course material | Cite the course |
| `cochlea-uncoiled.webp` | L05 Cochlea | L05 slide deck, page 10 (textbook Figure 11.8) | Course slides | Course material | Cite the course |
| `scalae.webp` | L05 Cochlea | L05 slide deck, page 12 (textbook Figure 11.7), labels painted out | Course slides | Course material | Cite the course |
| `tonotopy-spiral.webp` | L05 Frequency analyzer | L05 slide deck, page 14 (slide graphic, best frequency along the cochlea; origin not given) | Course slides | Course material | Cite the course |
| `traveling-wave.webp` | L05 Frequency analyzer | L05 slide deck, page 16 (textbook Figure 11.9), caption cropped | Course slides | Course material | Cite the course |
| `corti.webp` | L05 Organ of Corti | L05 slide deck, page 18 (slide drawing of unknown origin), label boxes cropped off | Course slides | Course material | Cite the course |
| `transduction.webp` | L05 Transduction | L05 slide deck, page 19 (textbook Figure 11.15) | Course slides | Course material | Cite the course |
| `shear.webp` | L05 Compression and rarefaction | L05 slide deck, page 20 (textbook Figure 11.13) | Course slides | Course material | Cite the course |
| `ohc-motor.webp` | L05 Outer hair cells | L05 slide deck, page 24 (textbook Figure 11.17 a, b) | Course slides | Course material | Cite the course |
| `innervation.webp` | L05 Inner versus outer hair cells | L05 slide deck, page 24 (textbook Figure 11.16) | Course slides | Course material | Cite the course |
| `phase-lock.webp` | L05 Phase locking | L05 slide deck, page 31 (slide graphic after Figure 11.14b) | Course slides | Course material | Cite the course |
| `spiral-ganglion.webp` | L05 Spiral ganglion | L05 slide deck, page 32 (slide graphic, signed illustration) | Course slides | Course material | Cite the course |
| `labelled-line.webp` | L05 Labelled lines | L05 slide deck, page 33 (textbook Figure 11.20) | Course slides | Course material | Cite the course |
| `tuning.webp` | L05 Labelled lines, lecture quiz q16 | L05 slide deck, page 34 (textbook Figure 11.19) | Course slides | Course material | Cite the course |
| `pathway.webp` | L05 Central pathway | L05 slide deck, page 35 (textbook Figure 11.18), caption painted out | Course slides | Course material | Cite the course |
| `a1.webp` | L05 Auditory cortex | L05 slide deck, page 38 (textbook Figure 11.27) | Course slides | Course material | Cite the course |
| Widgets `traveling-wave`, `hair-cell-stepper`, `compression-rarefaction`, `phase-locking` | L05 | d3 demos drawn for this site; the place map is the Greenwood function, the phase-locking model a jittered refractory spiking model, both illustrative | n/a | Repository licence | No |
| Link: https://youtu.be/aBZPPOm0_pA | L05 Frequency analyzer (optional link card) | Video recommended by the L05 teaching assistant; linked, not embedded | YouTube | Third party | n/a |
| `skin.webp` | L06 Somatosensory system | L06 slide deck, page 8 (textbook Figure 12.1), labels and leaders removed | Course slides | Course material | Cite the course |
| `rf-recording.webp` | L06 Receptive fields | L06 slide deck, page 9 (textbook Figure 12.2a) | Course slides | Course material | Cite the course |
| `rf-hands.webp` | L06 Receptive fields | L06 slide deck, page 9 (textbook Figure 12.2b), cropped | Course slides | Course material | Cite the course |
| `mech-table.webp` | L06 Receptive fields | L06 slide deck, page 10 (textbook Figure 12.3) | Course slides | Course material | Cite the course |
| `freq-tuning.webp` | L06 Receptive fields | L06 slide deck, page 10 (textbook Figure 12.4) | Course slides | Course material | Cite the course |
| `pacinian.webp` | L06 Adaptation | L06 slide deck, page 11 (textbook Figure 12.5) | Course slides | Course material | Cite the course |
| `mech-channels.webp` | L06 Mechanosensitive channels | L06 slide deck, page 12 (textbook Figure 12.6) | Course slides | Course material | Cite the course |
| `spinal-roots.webp` | L06 lecture quiz q02 | L06 slide deck, page 13 (textbook Figure 12.9), labels and leaders removed | Course slides | Course material | Cite the course |
| `fibre-classes.webp` | L06 Afferent axons | L06 slide deck, page 14 (textbook Figure 12.10) | Course slides | Course material | Cite the course |
| `segments.webp` | L06 Spinal segments and dermatomes | L06 slide deck, page 15 (textbook Figure 12.11) | Course slides | Course material | Cite the course |
| `dermatomes.webp` | L06 Dermatome widget | L06 slide deck, page 16 (textbook Figure 12.12); regions traced by scripts/trace_dermatomes.py into src/content/nbe-e4210/figures/dermatome-regions.js | Course slides | Course material | Cite the course |
| `dorsal-horn.webp` | L06 Dorsal column pathway | L06 slide deck, page 17 (textbook Figure 12.14), labels and leaders removed | Course slides | Course material | Cite the course |
| `dcml.webp` | L06 Dorsal column pathway | L06 slide deck, page 17 (textbook Figure 12.15), stray slide text cropped | Course slides | Course material | Cite the course |
| `trigeminal.webp` | L06 Trigeminal pathway | L06 slide deck, page 18 (textbook Figure 12.16) | Course slides | Course material | Cite the course |
| `s1-areas.webp` | L06 Somatosensory cortex | L06 slide deck, page 19 (textbook Figure 12.17) | Course slides | Course material | Cite the course |
| `s1-columns.webp` | L06 Somatosensory cortex | L06 slide deck, page 20 (textbook Figure 12.18) | Course slides | Course material | Cite the course |
| `homunculus.webp` | L06 Somatotopic map | L06 slide deck, page 21 (textbook Figure 12.19), slide text cropped | Course slides | Course material | Cite the course |
| `plasticity.webp` | L06 Map plasticity | L06 slide deck, page 23 (textbook Figure 12.23) | Course slides | Course material | Cite the course |
| `pain-soup.webp` | L06 Nociceptors | L06 slide deck, page 26 (textbook Figure 12.25) | Course slides | Course material | Cite the course |
| `spinothalamic.webp` | L06 Spinothalamic pathway | L06 slide deck, page 27 (textbook Figure 12.30), stray bullets painted out | Course slides | Course material | Cite the course |
| `two-pathways.webp` | L06 Spinothalamic pathway | L06 slide deck, page 27 (textbook Figure 12.31) | Course slides | Course material | Cite the course |
| `gate.webp` | L06 Pain regulation | L06 slide deck, page 28 (textbook Figure 12.33), slide text cropped | Course slides | Course material | Cite the course |
| `pag.webp` | L06 Pain regulation | L06 slide deck, page 28 (textbook Figure 12.34) | Course slides | Course material | Cite the course |
| `trp.webp` | L06 Temperature | L06 slide deck, page 30 (textbook Figure 12.35 with slide additions) | Course slides | Course material | Cite the course |
| `thermo-adapt.webp` | L06 Temperature | L06 slide deck, page 31 (textbook Figure 12.36) | Course slides | Course material | Cite the course |
| `muscle.webp` | L06 Skeletal muscle | L06 slide deck, page 33 (textbook Figure 13.1) | Course slides | Course material | Cite the course |
| `muscle-structure.webp` | L06 Skeletal muscle | L06 slide deck, page 33 (adapted from Komi 2003 and Monroy et al. 2012, as on the slide) | Course slides | Course material | Cite the course |
| `motor-unit.webp` | L06 Motor unit | L06 slide deck, page 36 (textbook Figure 13.7) | Course slides | Course material | Cite the course |
| `twitch-summation.webp` | L06 Motor unit | L06 slide deck, page 36 (textbook Figure 13.8) | Course slides | Course material | Cite the course |
| `mu-types.webp` | L06 Motor unit, lecture quiz q13 | L06 slide deck, page 36 (textbook Figure 13.10) | Course slides | Course material | Cite the course |
| `lmn-inputs.webp` | L06 Lower motor neurons | L06 slide deck, page 38 (textbook Figure 13.9) | Course slides | Course material | Cite the course |
| `alpha-gamma.webp` | L06 Lower motor neurons | L06 slide deck, page 38 (textbook Figure 13.20) | Course slides | Course material | Cite the course |
| `lmn.webp` | L06 Lower motor neurons | L06 slide deck, page 39 (textbook Figure 13.4) | Course slides | Course material | Cite the course |
| `ventral-horn-map.webp` | L06 Lower motor neurons | L06 slide deck, page 39 (textbook Figure 13.6) | Course slides | Course material | Cite the course |
| `spindle.webp` | L06 Muscle spindles | L06 slide deck, page 40 (textbook Figure 13.21), slide title and caption painted out | Course slides | Course material | Cite the course |
| `gto.webp` | L06 Golgi tendon organs | L06 slide deck, page 41 (textbook Figure 13.22) | Course slides | Course material | Cite the course |
| `gto-series.webp` | L06 Golgi tendon organs | L06 slide deck, page 41 (textbook Figure 13.23) | Course slides | Course material | Cite the course |
| `hierarchy.webp` | L06 Motor control hierarchy | L06 slide deck, page 44 (Kandel et al. 2013, Principles of Neural Science, as on the slide) | Course slides | Course material | Cite the course |
| `tracts-section.webp` | L06 Descending tracts | L06 slide deck, page 45 (textbook Figure 14.2) | Course slides | Course material | Cite the course |
| `tracts-summary.webp` | L06 Descending tracts | L06 slide deck, page 45 (textbook Figure 14.6) | Course slides | Course material | Cite the course |
| `motor-map.webp` | L06 Motor areas | L06 slide deck, page 46 (textbook Figure 14.8 with the sensory map), slide title painted out | Course slides | Course material | Cite the course |
| `motor-areas.webp` | L06 Motor areas | L06 slide deck, page 47 (textbook Figure 14.7), slide caption cropped | Course slides | Course material | Cite the course |
| `bg-loop.webp` | L06 Basal ganglia loop | L06 slide deck, page 48 (adapted textbook Figure 14.14); striatum-to-GPe arrow recoloured inhibitory and its plus made a minus, per the TA notes and p. 500 | Course slides | Course material | Cite the course |
| `cerebellar-loop.webp` | L06 Cerebellar loop | L06 slide deck, page 49 (textbook Figure 14.22) | Course slides | Course material | Cite the course |
| `corticospinal-pools.webp` | L06 Cerebellar loop | L06 slide deck, page 49 (textbook Figure 14.15) | Course slides | Course material | Cite the course |
| `fmri-map.webp` | L06 Mapping the motor cortex | L06 slide deck, page 50 (Meier et al. 2008, J Neurophysiol 100:1800, Fig. 4, as on the slide), citation cropped | Course slides | Course material | Cite the course |
| Widgets `adaptation-demo`, `dermatome-map`, `pathway-tracer`, `recruitment-demo`, `control-loop` | L06 | d3 and SVG demos drawn for this site; adaptation, recruitment and control-loop models are illustrative; the dermatome map overlays regions traced from Figure 12.12 | n/a | Repository licence | No |

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
| `src/assets/figures/nbe-e4210/L03/interneuron-groups.webp` | Built by `scripts/figures_nbe-e4210_L03.py`; the three Rudy groups are taught as a compare table instead, so no page shows the picture. Delete it or use it, but do not lose the provenance. | L03 slide deck, page 45 (Rudy et al. 2011) | https://doi.org/10.1002/dneu.20853 | Publisher copyright, course material |

### Bioicons

Nothing copied out yet. Search with `python scripts/find_asset.py <keyword>`.


## NBE-E4120 lecture 1, private study slide extracts

All assets below are reproduced by `scripts/figures_nbe-e4120_L01.py`. Source: Irina Ignatova, Cellular Electrophysiology lecture 1, 4 September 2026, supplied MyCourses PDF. Original URL: local supplied course document, no public asset URL established. Copyright remains with original authors; no open redistribution licence claimed. Used only in this local personal study site. Printed attribution/labels retained where supplied.

| File under `src/assets/figures/nbe-e4120/L01/` | Source PDF page | Use |
|---|---|---|
| apparatus.webp | 15 | L01 source reference or segment figure; methods figures also in mocks |
| applications.webp | 10 | L01 source reference or segment figure; methods figures also in mocks |
| capacitor.webp | 23 | L01 source reference or segment figure; methods figures also in mocks |
| circuits.webp | 27 | L01 source reference or segment figure; methods figures also in mocks |
| current.webp | 19 | L01 source reference or segment figure; methods figures also in mocks |
| diffusion.webp | 29 | L01 source reference or segment figure; methods figures also in mocks |
| divider.webp | 22 | L01 source reference or segment figure; methods figures also in mocks |
| donnan.webp | 38 | L01 source reference or segment figure; methods figures also in mocks |
| filters.webp | 25 | L01 source reference or segment figure; methods figures also in mocks |
| ions.webp | 32 | L01 source reference or segment figure; methods figures also in mocks |
| lowpass.webp | 26 | Prepared source reference crop, not mounted in L01 |
| membrane.webp | 18 | Prepared source reference crop, not mounted in L01 |
| nernst.webp | 30 | L01 source reference or segment figure; methods figures also in mocks |
| neurons.webp | 8 | L01 source reference or segment figure; methods figures also in mocks |
| neutrality.webp | 36 | L01 source reference or segment figure; methods figures also in mocks |
| ohm.webp | 21 | L01 source reference or segment figure; methods figures also in mocks |
| patch.webp | 17 | L01 source reference or segment figure; methods figures also in mocks |
| rc.webp | 24 | L01 source reference or segment figure; methods figures also in mocks |
| recordings.webp | 14 | L01 source reference or segment figure; methods figures also in mocks |
| resistors.webp | 20 | Prepared source reference crop, not mounted in L01 |
| signals.webp | 13 | Prepared source reference crop, not mounted in L01 |
| transport.webp | 35 | L01 source reference or segment figure; methods figures also in mocks |


## NBE-E4120 lecture 2

All following assets are local extracts from the supplied `source/nbe-e4120/lectures/Ephys-Lectures-2-2026_Potentials_11-9-26 (1).pdf`, Irina Ignatova / cited original slide contributors, 2026. Original URL: not supplied (local course PDF). Copyright retained by original owners, no open redistribution licence claimed; private personal study only. Printed labels and original axes retained. Reproduce with `scripts/figures_nbe-e4120_L02.py`; exact crops and PDF page numbers are in sidecars. Calcium composes the control and residual/subtracted panels from PDF28. No generated recordings or library illustrations.

| File (under src/assets/figures/nbe-e4120/L02/) | Where used | Source PDF page |
|---|---|---|
| action-potential.webp | L02 teaching and related practice/mocks | 16 |
| activation.webp | L02 teaching and related practice/mocks | 28 |
| blockers.webp | L02 teaching and related practice/mocks | 19 |
| calcium.webp | L02 teaching and related practice/mocks | 28 |
| cell-potentials.webp | L02 teaching and related practice/mocks | 12 |
| chloride.webp | L02 teaching and related practice/mocks | 4 |
| circuit.webp | L02 teaching and related practice/mocks | 22 |
| clamp.webp | L02 teaching and related practice/mocks | 18 |
| conductance.webp | L02 teaching and related practice/mocks | 24 |
| equilibrium.webp | L02 teaching and related practice/mocks | 2 |
| iv.webp | L02 teaching and related practice/mocks | 27 |
| neuron.webp | L02 teaching and related practice/mocks | 14 |
| parallel.webp | L02 teaching and related practice/mocks | 26 |
| permeability.webp | L02 teaching and related practice/mocks | 5 |
| potassium.webp | L02 teaching and related practice/mocks | 9 |
| rectification.webp | L02 teaching and related practice/mocks | 7 |
| rectifier-recordings.webp | L02 teaching and related practice/mocks | 8 |
| resting.webp | L02 teaching and related practice/mocks | 10 |
| signalling.webp | L02 teaching and related practice/mocks | 15 |
| slope.webp | L02 teaching and related practice/mocks | 25 |
| terminology.webp | L02 teaching and related practice/mocks | 11 |

## NBE-E4120 lecture 3 source figures

All are private-study extractions from Irina Ignatova’s Aalto course lecture deck. No open licence is asserted. Original axes and printed labels are retained; hotspot quiz is disabled. Local PDF is the source URL, never uploaded.

| File | Used in | Source | Original URL | Licence / attribution |
|---|---|---|---|---|
| `src/assets/figures/nbe-e4120/L03/analogy.webp` | L03 teaching/practice | Lecture 3 PDF p4; crop recipe `scripts/figures_nbe-e4120_L03.py` | `source/nbe-e4120/lectures/Ephys-Lectures-3_2026_Cable (1).pdf` | Original figure rights retained by slide author / cited rights holders; personal study only |
| `src/assets/figures/nbe-e4120/L03/assumptions.webp` | L03 teaching/practice | Lecture 3 PDF p10; crop recipe `scripts/figures_nbe-e4120_L03.py` | `source/nbe-e4120/lectures/Ephys-Lectures-3_2026_Cable (1).pdf` | Original figure rights retained by slide author / cited rights holders; personal study only |
| `src/assets/figures/nbe-e4120/L03/boundaries.webp` | L03 teaching/practice | Lecture 3 PDF p21; crop recipe `scripts/figures_nbe-e4120_L03.py` | `source/nbe-e4120/lectures/Ephys-Lectures-3_2026_Cable (1).pdf` | Original figure rights retained by slide author / cited rights holders; personal study only |
| `src/assets/figures/nbe-e4120/L03/compartments.webp` | L03 teaching/practice | Lecture 3 PDF p11; crop recipe `scripts/figures_nbe-e4120_L03.py` | `source/nbe-e4120/lectures/Ephys-Lectures-3_2026_Cable (1).pdf` | Original figure rights retained by slide author / cited rights holders; personal study only |
| `src/assets/figures/nbe-e4120/L03/conservation.webp` | L03 teaching/practice | Lecture 3 PDF p13; crop recipe `scripts/figures_nbe-e4120_L03.py` | `source/nbe-e4120/lectures/Ephys-Lectures-3_2026_Cable (1).pdf` | Original figure rights retained by slide author / cited rights holders; personal study only |
| `src/assets/figures/nbe-e4120/L03/cylinders.webp` | L03 teaching/practice | Lecture 3 PDF p7; crop recipe `scripts/figures_nbe-e4120_L03.py` | `source/nbe-e4120/lectures/Ephys-Lectures-3_2026_Cable (1).pdf` | Original figure rights retained by slide author / cited rights holders; personal study only |
| `src/assets/figures/nbe-e4120/L03/decay.webp` | L03 teaching/practice | Lecture 3 PDF p16; crop recipe `scripts/figures_nbe-e4120_L03.py` | `source/nbe-e4120/lectures/Ephys-Lectures-3_2026_Cable (1).pdf` | Original figure rights retained by slide author / cited rights holders; personal study only |
| `src/assets/figures/nbe-e4120/L03/distance.webp` | L03 teaching/practice | Lecture 3 PDF p18; crop recipe `scripts/figures_nbe-e4120_L03.py` | `source/nbe-e4120/lectures/Ephys-Lectures-3_2026_Cable (1).pdf` | Original figure rights retained by slide author / cited rights holders; personal study only |
| `src/assets/figures/nbe-e4120/L03/distributed.webp` | L03 teaching/practice | Lecture 3 PDF p9; crop recipe `scripts/figures_nbe-e4120_L03.py` | `source/nbe-e4120/lectures/Ephys-Lectures-3_2026_Cable (1).pdf` | Original figure rights retained by slide author / cited rights holders; personal study only |
| `src/assets/figures/nbe-e4120/L03/equation.webp` | L03 teaching/practice | Lecture 3 PDF p14; crop recipe `scripts/figures_nbe-e4120_L03.py` | `source/nbe-e4120/lectures/Ephys-Lectures-3_2026_Cable (1).pdf` | Original figure rights retained by slide author / cited rights holders; personal study only |
| `src/assets/figures/nbe-e4120/L03/filter.webp` | L03 teaching/practice | Lecture 3 PDF p6; crop recipe `scripts/figures_nbe-e4120_L03.py` | `source/nbe-e4120/lectures/Ephys-Lectures-3_2026_Cable (1).pdf` | Original figure rights retained by slide author / cited rights holders; personal study only |
| `src/assets/figures/nbe-e4120/L03/functions.webp` | L03 teaching/practice | Lecture 3 PDF p2; crop recipe `scripts/figures_nbe-e4120_L03.py` | `source/nbe-e4120/lectures/Ephys-Lectures-3_2026_Cable (1).pdf` | Original figure rights retained by slide author / cited rights holders; personal study only |
| `src/assets/figures/nbe-e4120/L03/geometry.webp` | L03 teaching/practice | Lecture 3 PDF p12; crop recipe `scripts/figures_nbe-e4120_L03.py` | `source/nbe-e4120/lectures/Ephys-Lectures-3_2026_Cable (1).pdf` | Original figure rights retained by slide author / cited rights holders; personal study only |
| `src/assets/figures/nbe-e4120/L03/myelin.webp` | L03 teaching/practice | Lecture 3 PDF p20; crop recipe `scripts/figures_nbe-e4120_L03.py` | `source/nbe-e4120/lectures/Ephys-Lectures-3_2026_Cable (1).pdf` | Original figure rights retained by slide author / cited rights holders; personal study only |
| `src/assets/figures/nbe-e4120/L03/normalization.webp` | L03 teaching/practice | Lecture 3 PDF p22; crop recipe `scripts/figures_nbe-e4120_L03.py` | `source/nbe-e4120/lectures/Ephys-Lectures-3_2026_Cable (1).pdf` | Original figure rights retained by slide author / cited rights holders; personal study only |
| `src/assets/figures/nbe-e4120/L03/pulse.webp` | L03 teaching/practice | Lecture 3 PDF p15; crop recipe `scripts/figures_nbe-e4120_L03.py` | `source/nbe-e4120/lectures/Ephys-Lectures-3_2026_Cable (1).pdf` | Original figure rights retained by slide author / cited rights holders; personal study only |
| `src/assets/figures/nbe-e4120/L03/responses.webp` | L03 teaching/practice | Lecture 3 PDF p3; crop recipe `scripts/figures_nbe-e4120_L03.py` | `source/nbe-e4120/lectures/Ephys-Lectures-3_2026_Cable (1).pdf` | Original figure rights retained by slide author / cited rights holders; personal study only |
| `src/assets/figures/nbe-e4120/L03/scaling.webp` | L03 teaching/practice | Lecture 3 PDF p17; crop recipe `scripts/figures_nbe-e4120_L03.py` | `source/nbe-e4120/lectures/Ephys-Lectures-3_2026_Cable (1).pdf` | Original figure rights retained by slide author / cited rights holders; personal study only |
| `src/assets/figures/nbe-e4120/L03/sphere.webp` | L03 teaching/practice | Lecture 3 PDF p8; crop recipe `scripts/figures_nbe-e4120_L03.py` | `source/nbe-e4120/lectures/Ephys-Lectures-3_2026_Cable (1).pdf` | Original figure rights retained by slide author / cited rights holders; personal study only |
| `src/assets/figures/nbe-e4120/L03/time.webp` | L03 teaching/practice | Lecture 3 PDF p19; crop recipe `scripts/figures_nbe-e4120_L03.py` | `source/nbe-e4120/lectures/Ephys-Lectures-3_2026_Cable (1).pdf` | Original figure rights retained by slide author / cited rights holders; personal study only |

## NBE-E4120 lecture 4 source figures

Private local study use. The lecture/exercise authors retain copyright; no open licence is claimed. Reproducible recipe: `scripts/figures_nbe-e4120_L04.py`. Printed labels retained, hotspot quiz disabled. Original remote URL is not supplied; the exact local source path is recorded instead.

| File (under src/assets/figures/nbe-e4120/L04/) | Use | Source / original URL | Licence and attribution |
|---|---|---|---|
| boundaries.webp and provenance JSON | L04 concept and source-interpretation practice | `source/nbe-e4120/lectures/Ephys-Lectures-4_2026_Cable (1).pdf`, PDF 4; no remote URL supplied | Copyright original authors, course material supplied by Irina Ignatova/Akseli Pullinen; personal study use only |
| distance.webp and provenance JSON | L04 concept and source-interpretation practice | `source/nbe-e4120/lectures/Ephys-Lectures-4_2026_Cable (1).pdf`, PDF 19; no remote URL supplied | Copyright original authors, course material supplied by Irina Ignatova/Akseli Pullinen; personal study use only |
| ends.webp and provenance JSON | L04 concept and source-interpretation practice | `source/nbe-e4120/lectures/Ephys-Lectures-4_2026_Cable (1).pdf`, PDF 9; no remote URL supplied | Copyright original authors, course material supplied by Irina Ignatova/Akseli Pullinen; personal study use only |
| hyperbolic.webp and provenance JSON | L04 concept and source-interpretation practice | `source/nbe-e4120/lectures/Ephys-Lectures-4_2026_Cable (1).pdf`, PDF 10; no remote URL supplied | Copyright original authors, course material supplied by Irina Ignatova/Akseli Pullinen; personal study use only |
| infinite.webp and provenance JSON | L04 concept and source-interpretation practice | `source/nbe-e4120/lectures/Ephys-Lectures-4_2026_Cable (1).pdf`, PDF 6; no remote URL supplied | Copyright original authors, course material supplied by Irina Ignatova/Akseli Pullinen; personal study use only |
| input.webp and provenance JSON | L04 concept and source-interpretation practice | `source/nbe-e4120/lectures/Ephys-Lectures-4_2026_Cable (1).pdf`, PDF 7; no remote URL supplied | Copyright original authors, course material supplied by Irina Ignatova/Akseli Pullinen; personal study use only |
| loads.webp and provenance JSON | L04 concept and source-interpretation practice | `source/nbe-e4120/lectures/Ephys-Lectures-4_2026_Cable (1).pdf`, PDF 11; no remote URL supplied | Copyright original authors, course material supplied by Irina Ignatova/Akseli Pullinen; personal study use only |
| neuron.webp and provenance JSON | L04 concept and source-interpretation practice | `source/nbe-e4120/lectures/Ephys-Lectures-4_2026_Cable (1).pdf`, PDF 13; no remote URL supplied | Copyright original authors, course material supplied by Irina Ignatova/Akseli Pullinen; personal study use only |
| normalized.webp and provenance JSON | L04 concept and source-interpretation practice | `source/nbe-e4120/lectures/Ephys-Lectures-4_2026_Cable (1).pdf`, PDF 5; no remote URL supplied | Copyright original authors, course material supplied by Irina Ignatova/Akseli Pullinen; personal study use only |
| profiles.webp and provenance JSON | L04 concept and source-interpretation practice | `source/nbe-e4120/lectures/Ephys-Lectures-4_2026_Cable (1).pdf`, PDF 8; no remote URL supplied | Copyright original authors, course material supplied by Irina Ignatova/Akseli Pullinen; personal study use only |
| return.webp and provenance JSON | L04 concept and source-interpretation practice | `source/nbe-e4120/exercises/Exercise4 Cable (3).pdf`, PDF 1; no remote URL supplied | Copyright original authors, course material supplied by Irina Ignatova/Akseli Pullinen; personal study use only |
| spatial.webp and provenance JSON | L04 concept and source-interpretation practice | `source/nbe-e4120/lectures/Ephys-Lectures-4_2026_Cable (1).pdf`, PDF 18; no remote URL supplied | Copyright original authors, course material supplied by Irina Ignatova/Akseli Pullinen; personal study use only |
| speed.webp and provenance JSON | L04 concept and source-interpretation practice | `source/nbe-e4120/lectures/Ephys-Lectures-4_2026_Cable (1).pdf`, PDF 3; no remote URL supplied | Copyright original authors, course material supplied by Irina Ignatova/Akseli Pullinen; personal study use only |
| summation.webp and provenance JSON | L04 concept and source-interpretation practice | `source/nbe-e4120/lectures/Ephys-Lectures-4_2026_Cable (1).pdf`, PDF 15; no remote URL supplied | Copyright original authors, course material supplied by Irina Ignatova/Akseli Pullinen; personal study use only |
| superposition.webp and provenance JSON | L04 concept and source-interpretation practice | `source/nbe-e4120/lectures/Ephys-Lectures-4_2026_Cable (1).pdf`, PDF 16; no remote URL supplied | Copyright original authors, course material supplied by Irina Ignatova/Akseli Pullinen; personal study use only |
| synapses.webp and provenance JSON | L04 concept and source-interpretation practice | `source/nbe-e4120/lectures/Ephys-Lectures-4_2026_Cable (1).pdf`, PDF 14; no remote URL supplied | Copyright original authors, course material supplied by Irina Ignatova/Akseli Pullinen; personal study use only; slide attribution doi:10.1126/science.adk4858 |
| temporal.webp and provenance JSON | L04 concept and source-interpretation practice | `source/nbe-e4120/lectures/Ephys-Lectures-4_2026_Cable (1).pdf`, PDF 17; no remote URL supplied | Copyright original authors, course material supplied by Irina Ignatova/Akseli Pullinen; personal study use only |
| wave.webp and provenance JSON | L04 concept and source-interpretation practice | `source/nbe-e4120/lectures/Ephys-Lectures-4_2026_Cable (1).pdf`, PDF 2; no remote URL supplied | Copyright original authors, course material supplied by Irina Ignatova/Akseli Pullinen; personal study use only |

## NBE-E4120 Lecture 5 source panels

- `src/assets/figures/nbe-e4120/L05/active.webp`: available source comparison panel, not currently embedded; source `source/nbe-e4120/lectures/Ephys-Lectures-5_2026_Rall.pdf`, PDF p12. Original labels/axes retained. Original URL: not supplied, local course PDF. Copyright original authors, private study use; no open licence claimed. Recipe: `scripts/figures_nbe-e4120_L05.py`.
- `src/assets/figures/nbe-e4120/L05/alpha.webp`: L05 teaching/practice and selected mocks; source `source/nbe-e4120/lectures/Ephys-Lectures-5_2026_Rall.pdf`, PDF p33. Original labels/axes retained. Original URL: not supplied, local course PDF. Copyright original authors, private study use; no open licence claimed. Recipe: `scripts/figures_nbe-e4120_L05.py`.
- `src/assets/figures/nbe-e4120/L05/backprop.webp`: L05 teaching/practice and selected mocks; source `source/nbe-e4120/lectures/Ephys-Lectures-5_2026_Rall.pdf`, PDF p14. Original labels/axes retained. Original URL: not supplied, local course PDF. Copyright original authors, private study use; no open licence claimed. Recipe: `scripts/figures_nbe-e4120_L05.py`.
- `src/assets/figures/nbe-e4120/L05/branch.webp`: L05 teaching/practice and selected mocks; source `source/nbe-e4120/lectures/Ephys-Lectures-5_2026_Rall.pdf`, PDF p20. Original labels/axes retained. Original URL: not supplied, local course PDF. Copyright original authors, private study use; no open licence claimed. Recipe: `scripts/figures_nbe-e4120_L05.py`.
- `src/assets/figures/nbe-e4120/L05/compartments.webp`: L05 teaching/practice and selected mocks; source `source/nbe-e4120/lectures/Ephys-Lectures-5_2026_Rall.pdf`, PDF p19. Original labels/axes retained. Original URL: not supplied, local course PDF. Copyright original authors, private study use; no open licence claimed. Recipe: `scripts/figures_nbe-e4120_L05.py`.
- `src/assets/figures/nbe-e4120/L05/distributed.webp`: L05 teaching/practice and selected mocks; source `source/nbe-e4120/lectures/Ephys-Lectures-5_2026_Rall.pdf`, PDF p5. Original labels/axes retained. Original URL: not supplied, local course PDF. Copyright original authors, private study use; no open licence claimed. Recipe: `scripts/figures_nbe-e4120_L05.py`.
- `src/assets/figures/nbe-e4120/L05/echo.webp`: L05 teaching/practice and selected mocks; source `source/nbe-e4120/lectures/Ephys-Lectures-5_2026_Rall.pdf`, PDF p15. Original labels/axes retained. Original URL: not supplied, local course PDF. Copyright original authors, private study use; no open licence claimed. Recipe: `scripts/figures_nbe-e4120_L05.py`.
- `src/assets/figures/nbe-e4120/L05/equivalent.webp`: L05 teaching/practice and selected mocks; source `source/nbe-e4120/lectures/Ephys-Lectures-5_2026_Rall.pdf`, PDF p18. Original labels/axes retained. Original URL: not supplied, local course PDF. Copyright original authors, private study use; no open licence claimed. Recipe: `scripts/figures_nbe-e4120_L05.py`.
- `src/assets/figures/nbe-e4120/L05/example.webp`: L05 teaching/practice and selected mocks; source `source/nbe-e4120/lectures/Ephys-Lectures-5_2026_Rall.pdf`, PDF p30. Original labels/axes retained. Original URL: not supplied, local course PDF. Copyright original authors, private study use; no open licence claimed. Recipe: `scripts/figures_nbe-e4120_L05.py`.
- `src/assets/figures/nbe-e4120/L05/finite.webp`: L05 teaching/practice and selected mocks; source `source/nbe-e4120/lectures/Ephys-Lectures-5_2026_Rall.pdf`, PDF p28. Original labels/axes retained. Original URL: not supplied, local course PDF. Copyright original authors, private study use; no open licence claimed. Recipe: `scripts/figures_nbe-e4120_L05.py`.
- `src/assets/figures/nbe-e4120/L05/graded.webp`: L05 teaching/practice and selected mocks; source `source/nbe-e4120/lectures/Ephys-Lectures-5_2026_Rall.pdf`, PDF p11. Original labels/axes retained. Original URL: not supplied, local course PDF. Copyright original authors, private study use; no open licence claimed. Recipe: `scripts/figures_nbe-e4120_L05.py`.
- `src/assets/figures/nbe-e4120/L05/local.webp`: L05 teaching/practice and selected mocks; source `source/nbe-e4120/lectures/Ephys-Lectures-5_2026_Rall.pdf`, PDF p13. Original labels/axes retained. Original URL: not supplied, local course PDF. Copyright original authors, private study use; no open licence claimed. Recipe: `scripts/figures_nbe-e4120_L05.py`.
- `src/assets/figures/nbe-e4120/L05/lumped.webp`: L05 teaching/practice and selected mocks; source `source/nbe-e4120/lectures/Ephys-Lectures-5_2026_Rall.pdf`, PDF p4. Original labels/axes retained. Original URL: not supplied, local course PDF. Copyright original authors, private study use; no open licence claimed. Recipe: `scripts/figures_nbe-e4120_L05.py`.
- `src/assets/figures/nbe-e4120/L05/models.webp`: L05 teaching/practice and selected mocks; source `source/nbe-e4120/lectures/Ephys-Lectures-5_2026_Rall.pdf`, PDF p3. Original labels/axes retained. Original URL: not supplied, local course PDF. Copyright original authors, private study use; no open licence claimed. Recipe: `scripts/figures_nbe-e4120_L05.py`.
- `src/assets/figures/nbe-e4120/L05/one.webp`: L05 teaching/practice and selected mocks; source `source/nbe-e4120/lectures/Ephys-Lectures-5_2026_Rall.pdf`, PDF p6. Original labels/axes retained. Original URL: not supplied, local course PDF. Copyright original authors, private study use; no open licence claimed. Recipe: `scripts/figures_nbe-e4120_L05.py`.
- `src/assets/figures/nbe-e4120/L05/path.webp`: L05 teaching/practice and selected mocks; source `source/nbe-e4120/lectures/Ephys-Lectures-5_2026_Rall.pdf`, PDF p29. Original labels/axes retained. Original URL: not supplied, local course PDF. Copyright original authors, private study use; no open licence claimed. Recipe: `scripts/figures_nbe-e4120_L05.py`.
- `src/assets/figures/nbe-e4120/L05/profiles.webp`: L05 teaching/practice and selected mocks; source `source/nbe-e4120/lectures/Ephys-Lectures-5_2026_Rall.pdf`, PDF p27. Original labels/axes retained. Original URL: not supplied, local course PDF. Copyright original authors, private study use; no open licence claimed. Recipe: `scripts/figures_nbe-e4120_L05.py`.
- `src/assets/figures/nbe-e4120/L05/rall-tree.webp`: L05 teaching/practice and selected mocks; source `source/nbe-e4120/lectures/Ephys-Lectures-5_2026_Rall.pdf`, PDF p21. Original labels/axes retained. Original URL: not supplied, local course PDF. Copyright original authors, private study use; no open licence claimed. Recipe: `scripts/figures_nbe-e4120_L05.py`.
- `src/assets/figures/nbe-e4120/L05/receptors.webp`: L05 teaching/practice and selected mocks; source `source/nbe-e4120/lectures/Ephys-Lectures-5_2026_Rall.pdf`, PDF p10. Original labels/axes retained. Original URL: not supplied, local course PDF. Copyright original authors, private study use; no open licence claimed. Recipe: `scripts/figures_nbe-e4120_L05.py`.
- `src/assets/figures/nbe-e4120/L05/replace.webp`: L05 teaching/practice and selected mocks; source `source/nbe-e4120/lectures/Ephys-Lectures-5_2026_Rall.pdf`, PDF p24. Original labels/axes retained. Original URL: not supplied, local course PDF. Copyright original authors, private study use; no open licence claimed. Recipe: `scripts/figures_nbe-e4120_L05.py`.
- `src/assets/figures/nbe-e4120/L05/soma.webp`: L05 teaching/practice and selected mocks; source `source/nbe-e4120/lectures/Ephys-Lectures-5_2026_Rall.pdf`, PDF p31. Original labels/axes retained. Original URL: not supplied, local course PDF. Copyright original authors, private study use; no open licence claimed. Recipe: `scripts/figures_nbe-e4120_L05.py`.
- `src/assets/figures/nbe-e4120/L05/stems.webp`: L05 teaching/practice and selected mocks; source `source/nbe-e4120/lectures/Ephys-Lectures-5_2026_Rall.pdf`, PDF p26. Original labels/axes retained. Original URL: not supplied, local course PDF. Copyright original authors, private study use; no open licence claimed. Recipe: `scripts/figures_nbe-e4120_L05.py`.
- `src/assets/figures/nbe-e4120/L05/step.webp`: L05 teaching/practice and selected mocks; source `source/nbe-e4120/lectures/Ephys-Lectures-5_2026_Rall.pdf`, PDF p32. Original labels/axes retained. Original URL: not supplied, local course PDF. Copyright original authors, private study use; no open licence claimed. Recipe: `scripts/figures_nbe-e4120_L05.py`.
- `src/assets/figures/nbe-e4120/L05/transmission.webp`: L05 teaching/practice and selected mocks; source `source/nbe-e4120/lectures/Ephys-Lectures-5_2026_Rall.pdf`, PDF p9. Original labels/axes retained. Original URL: not supplied, local course PDF. Copyright original authors, private study use; no open licence claimed. Recipe: `scripts/figures_nbe-e4120_L05.py`.
- `src/assets/figures/nbe-e4120/L05/trees.webp`: L05 teaching/practice and selected mocks; source `source/nbe-e4120/lectures/Ephys-Lectures-5_2026_Rall.pdf`, PDF p16. Original labels/axes retained. Original URL: not supplied, local course PDF. Copyright original authors, private study use; no open licence claimed. Recipe: `scripts/figures_nbe-e4120_L05.py`.
- `src/assets/figures/nbe-e4120/L05/two.webp`: L05 teaching/practice and selected mocks; source `source/nbe-e4120/lectures/Ephys-Lectures-5_2026_Rall.pdf`, PDF p7. Original labels/axes retained. Original URL: not supplied, local course PDF. Copyright original authors, private study use; no open licence claimed. Recipe: `scripts/figures_nbe-e4120_L05.py`.

## NBE-E4120 lecture 6: nonlinear permeation and gating

- `src/assets/figures/nbe-e4120/L06/activation.webp`, used in L06 teaching and/or question panels. Source: `source/nbe-e4120/lectures/Ephys-Lecture-6-2026_Nonlinearities_full (1).pdf`, PDF p16. Original URL: no public source URL supplied, local course PDF. Copyright original authors/course lecturers, private personal study only; no open licence claimed. Labels and axes retained, quiz mode off. Reproduce with `scripts/figures_nbe-e4120_L06.py`; crop/embedded-image indices in the sidecar JSON.
- `src/assets/figures/nbe-e4120/L06/barrier.webp`, used in L06 teaching and/or question panels. Source: `source/nbe-e4120/lectures/Ephys-Lecture-6-2026_Nonlinearities_full (1).pdf`, PDF p4. Original URL: no public source URL supplied, local course PDF. Copyright original authors/course lecturers, private personal study only; no open licence claimed. Labels and axes retained, quiz mode off. Reproduce with `scripts/figures_nbe-e4120_L06.py`; crop/embedded-image indices in the sidecar JSON.
- `src/assets/figures/nbe-e4120/L06/channel.webp`, used in L06 teaching and/or question panels. Source: `source/nbe-e4120/lectures/Ephys-Lecture-6-2026_Nonlinearities_full (1).pdf`, PDF p11. Original URL: no public source URL supplied, local course PDF. Copyright original authors/course lecturers, private personal study only; no open licence claimed. Labels and axes retained, quiz mode off. Reproduce with `scripts/figures_nbe-e4120_L06.py`; crop/embedded-image indices in the sidecar JSON.
- `src/assets/figures/nbe-e4120/L06/chord.webp`, used in L06 teaching and/or question panels. Source: `source/nbe-e4120/exercises/Exercise6 (2).pdf`, PDF p2. Original URL: no public source URL supplied, local course PDF. Copyright original authors/course lecturers, private personal study only; no open licence claimed. Labels and axes retained, quiz mode off. Reproduce with `scripts/figures_nbe-e4120_L06.py`; crop/embedded-image indices in the sidecar JSON.
- `src/assets/figures/nbe-e4120/L06/clamp.webp`, used in L06 teaching and/or question panels. Source: `source/nbe-e4120/exercises/Exercise6 (2).pdf`, PDF p1. Original URL: no public source URL supplied, local course PDF. Copyright original authors/course lecturers, private personal study only; no open licence claimed. Labels and axes retained, quiz mode off. Reproduce with `scripts/figures_nbe-e4120_L06.py`; crop/embedded-image indices in the sidecar JSON.
- `src/assets/figures/nbe-e4120/L06/comparison.webp`, used in L06 teaching and/or question panels. Source: `source/nbe-e4120/lectures/Ephys-Lecture-6-2026_Nonlinearities_full (1).pdf`, PDF p21. Original URL: no public source URL supplied, local course PDF. Copyright original authors/course lecturers, private personal study only; no open licence claimed. Labels and axes retained, quiz mode off. Reproduce with `scripts/figures_nbe-e4120_L06.py`; crop/embedded-image indices in the sidecar JSON.
- `src/assets/figures/nbe-e4120/L06/concentrations.webp`, used in L06 teaching and/or question panels. Source: `source/nbe-e4120/lectures/Ephys-Lecture-6-2026_Nonlinearities_full (1).pdf`, PDF p9. Original URL: no public source URL supplied, local course PDF. Copyright original authors/course lecturers, private personal study only; no open licence claimed. Labels and axes retained, quiz mode off. Reproduce with `scripts/figures_nbe-e4120_L06.py`; crop/embedded-image indices in the sidecar JSON.
- `src/assets/figures/nbe-e4120/L06/gating.webp`, used in L06 teaching and/or question panels. Source: `source/nbe-e4120/lectures/Ephys-Lecture-6-2026_Nonlinearities_full (1).pdf`, PDF p13. Original URL: no public source URL supplied, local course PDF. Copyright original authors/course lecturers, private personal study only; no open licence claimed. Labels and axes retained, quiz mode off. Reproduce with `scripts/figures_nbe-e4120_L06.py`; crop/embedded-image indices in the sidecar JSON.
- `src/assets/figures/nbe-e4120/L06/ghk.webp`, used in L06 teaching and/or question panels. Source: `source/nbe-e4120/lectures/Ephys-Lecture-6-2026_Nonlinearities_full (1).pdf`, PDF p3. Original URL: no public source URL supplied, local course PDF. Copyright original authors/course lecturers, private personal study only; no open licence claimed. Labels and axes retained, quiz mode off. Reproduce with `scripts/figures_nbe-e4120_L06.py`; crop/embedded-image indices in the sidecar JSON.
- `src/assets/figures/nbe-e4120/L06/kinetics.webp`, used in L06 teaching and/or question panels. Source: `source/nbe-e4120/lectures/Ephys-Lecture-6-2026_Nonlinearities_full (1).pdf`, PDF p17. Original URL: no public source URL supplied, local course PDF. Copyright original authors/course lecturers, private personal study only; no open licence claimed. Labels and axes retained, quiz mode off. Reproduce with `scripts/figures_nbe-e4120_L06.py`; crop/embedded-image indices in the sidecar JSON.
- `src/assets/figures/nbe-e4120/L06/multiple.webp`, used in L06 teaching and/or question panels. Source: `source/nbe-e4120/lectures/Ephys-Lecture-6-2026_Nonlinearities_full (1).pdf`, PDF p10. Original URL: no public source URL supplied, local course PDF. Copyright original authors/course lecturers, private personal study only; no open licence claimed. Labels and axes retained, quiz mode off. Reproduce with `scripts/figures_nbe-e4120_L06.py`; crop/embedded-image indices in the sidecar JSON.
- `src/assets/figures/nbe-e4120/L06/position.webp`, used in L06 teaching and/or question panels. Source: `source/nbe-e4120/lectures/Ephys-Lecture-6-2026_Nonlinearities_full (1).pdf`, PDF p8. Original URL: no public source URL supplied, local course PDF. Copyright original authors/course lecturers, private personal study only; no open licence claimed. Labels and axes retained, quiz mode off. Reproduce with `scripts/figures_nbe-e4120_L06.py`; crop/embedded-image indices in the sidecar JSON.
- `src/assets/figures/nbe-e4120/L06/rectification.webp`, used in L06 teaching and/or question panels. Source: `source/nbe-e4120/lectures/Ephys-Lecture-6-2026_Nonlinearities_full (1).pdf`, PDF p2. Original URL: no public source URL supplied, local course PDF. Copyright original authors/course lecturers, private personal study only; no open licence claimed. Labels and axes retained, quiz mode off. Reproduce with `scripts/figures_nbe-e4120_L06.py`; crop/embedded-image indices in the sidecar JSON.
- `src/assets/figures/nbe-e4120/L06/tilt.webp`, used in L06 teaching and/or question panels. Source: `source/nbe-e4120/lectures/Ephys-Lecture-6-2026_Nonlinearities_full (1).pdf`, PDF p7. Original URL: no public source URL supplied, local course PDF. Copyright original authors/course lecturers, private personal study only; no open licence claimed. Labels and axes retained, quiz mode off. Reproduce with `scripts/figures_nbe-e4120_L06.py`; crop/embedded-image indices in the sidecar JSON.

## NBE-E4120 lecture 7 source panels

All panels preserve supplied source axes/labels; private study only. Source: Irina Ignatova, Aalto NBE-E4120 full Lecture 7 PDF, local course source, no public deck URL supplied. Original authors retain copyright; no new licence is asserted. Recipe: `scripts/figures_nbe-e4120_L07.py`.

| File | Use | Source | Original URL/licence/attribution |
|---|---|---|---|
| `src/assets/figures/nbe-e4120/L07/blockers.webp` | L07 blockers theory/practice | Full deck PDF p12 | Local supplied PDF, original slide/figure authors; copyrighted personal-study use. |
| `src/assets/figures/nbe-e4120/L07/choline.webp` | L07 choline theory/practice | Full deck PDF p11 | Local supplied PDF, original slide/figure authors; copyrighted personal-study use. |
| `src/assets/figures/nbe-e4120/L07/clamp.webp` | L07 clamp theory/practice | Full deck PDF p7 | Local supplied PDF, original slide/figure authors; copyrighted personal-study use. |
| `src/assets/figures/nbe-e4120/L07/conductances.webp` | L07 conductances theory/practice | Full deck PDF p18 | Local supplied PDF, original slide/figure authors; copyrighted personal-study use. |
| `src/assets/figures/nbe-e4120/L07/currents.webp` | L07 currents theory/practice | Full deck PDF p8 | Local supplied PDF, original slide/figure authors; copyrighted personal-study use. |
| `src/assets/figures/nbe-e4120/L07/fitting.webp` | L07 fitting theory/practice | Full deck PDF p28 | Local supplied PDF, original slide/figure authors; copyrighted personal-study use. |
| `src/assets/figures/nbe-e4120/L07/gates.webp` | L07 gates theory/practice | Full deck PDF p20 | Local supplied PDF, original slide/figure authors; copyrighted personal-study use. |
| `src/assets/figures/nbe-e4120/L07/group.webp` | L07 group theory/practice | Full deck PDF p32 | Local supplied PDF, original slide/figure authors; copyrighted personal-study use. |
| `src/assets/figures/nbe-e4120/L07/inactivation.webp` | L07 inactivation theory/practice | Full deck PDF p22 | Local supplied PDF, original slide/figure authors; copyrighted personal-study use. Slide cites DOI 10.1186/s12915-023-01559-5 for the adjacent modern recording; this extracted prepulse panel has no separate citation. |
| `src/assets/figures/nbe-e4120/L07/ions.webp` | L07 ions theory/practice | Full deck PDF p6 | Local supplied PDF, original slide/figure authors; copyrighted personal-study use. |
| `src/assets/figures/nbe-e4120/L07/k-instant.webp` | L07 k-instant theory/practice | Full deck PDF p17 | Local supplied PDF, original slide/figure authors; copyrighted personal-study use. |
| `src/assets/figures/nbe-e4120/L07/potassium.webp` | L07 potassium theory/practice | Full deck PDF p6 | Local supplied PDF, original slide/figure authors; copyrighted personal-study use. |
| `src/assets/figures/nbe-e4120/L07/powers.webp` | L07 powers theory/practice | Full deck PDF p23 | Local supplied PDF, original slide/figure authors; copyrighted personal-study use. |
| `src/assets/figures/nbe-e4120/L07/prediction.webp` | L07 prediction theory/practice | Full deck PDF p3 | Local supplied PDF, original slide/figure authors; copyrighted personal-study use. |
| `src/assets/figures/nbe-e4120/L07/protocol.webp` | L07 protocol theory/practice | Full deck PDF p14 | Local supplied PDF, original slide/figure authors; copyrighted personal-study use. |
| `src/assets/figures/nbe-e4120/L07/rates.webp` | L07 rates theory/practice | Full deck PDF p31 | Local supplied PDF, original slide/figure authors; copyrighted personal-study use. |
| `src/assets/figures/nbe-e4120/L07/recording.webp` | L07 recording theory/practice | Full deck PDF p2 | Local supplied PDF, original slide/figure authors; copyrighted personal-study use. |
| `src/assets/figures/nbe-e4120/L07/reversal.webp` | L07 reversal theory/practice | Full deck PDF p9 | Local supplied PDF, original slide/figure authors; copyrighted personal-study use. |
| `src/assets/figures/nbe-e4120/L07/sensor.webp` | L07 sensor theory/practice | Full deck PDF p19 | Local supplied PDF, original slide/figure authors; copyrighted personal-study use. |
| `src/assets/figures/nbe-e4120/L07/sodium.webp` | L07 sodium theory/practice | Full deck PDF p15 | Local supplied PDF, original slide/figure authors; copyrighted personal-study use. |
| `src/assets/figures/nbe-e4120/L07/states.webp` | L07 states theory/practice | Full deck PDF p21 | Local supplied PDF, original slide/figure authors; copyrighted personal-study use. Slide attributes DOI 10.3390/cells10071595. |
| `src/assets/figures/nbe-e4120/L07/steady.webp` | L07 steady theory/practice | Full deck PDF p29 | Local supplied PDF, original slide/figure authors; copyrighted personal-study use. |
| `src/assets/figures/nbe-e4120/L07/subtraction.webp` | L07 subtraction theory/practice | Full deck PDF p10 | Local supplied PDF, original slide/figure authors; copyrighted personal-study use. |
| `src/assets/figures/nbe-e4120/L07/time.webp` | L07 time theory/practice | Full deck PDF p27 | Local supplied PDF, original slide/figure authors; copyrighted personal-study use. |
| `src/assets/figures/nbe-e4120/L07/transitions.webp` | L07 transitions theory/practice | Full deck PDF p25 | Local supplied PDF, original slide/figure authors; copyrighted personal-study use. |

## NBE-E4120 lecture 8 source panels

All panels retain source labels/axes. Personal local study use; underlying author copyright retained, no open licence inferred. Rebuild with scripts/figures_nbe-e4120_L08.py. Original sources supplied locally; no public deck URL supplied.

| File | Use | Source | Original URL | Licence / attribution |
|---|---|---|---|---|
| src/assets/figures/nbe-e4120/L08/accommodation.webp | L08 teaching/practice/source audit | source/nbe-e4120/lectures/Ephys-Lecture-8-1-2026_HHmodel2 (1).pdf, PDF 13 | Not supplied; local course PDF | Course slide authors and original credited figure authors, copyright retained; private study |
| src/assets/figures/nbe-e4120/L08/agreement.webp | L08 teaching/practice/source audit | source/nbe-e4120/lectures/Ephys-Lecture-8-1-2026_HHmodel2 (1).pdf, PDF 3 | Not supplied; local course PDF | Course slide authors and original credited figure authors, copyright retained; private study |
| src/assets/figures/nbe-e4120/L08/ais.webp | L08 teaching/practice/source audit | source/nbe-e4120/lectures/Ephys-Lecture-8-2-2026_Saltatory_v4 (1).pdf, PDF 2 | Not supplied; local course PDF | Course slide authors and original credited figure authors, copyright retained; private study |
| src/assets/figures/nbe-e4120/L08/anesthetic.webp | L08 teaching/practice/source audit | source/nbe-e4120/lectures/Ephys-Lecture-8-2-2026_Saltatory_v4 (1).pdf, PDF 12 | Not supplied; local course PDF | Course slide authors and original credited figure authors, copyright retained; private study |
| src/assets/figures/nbe-e4120/L08/capacitance.webp | L08 teaching/practice/source audit | source/nbe-e4120/lectures/Ephys-Lecture-8-1-2026_HHmodel2 (1).pdf, PDF 19 | Not supplied; local course PDF | Course slide authors and original credited figure authors, copyright retained; private study |
| src/assets/figures/nbe-e4120/L08/channels.webp | L08 teaching/practice/source audit | source/nbe-e4120/lectures/Ephys-Lecture-8-2-2026_Saltatory_v4 (1).pdf, PDF 11 | Not supplied; local course PDF | Course slide authors and original credited figure authors, copyright retained; private study |
| src/assets/figures/nbe-e4120/L08/charge.webp | L08 teaching/practice/source audit | source/nbe-e4120/lectures/Ephys-Lecture-8-1-2026_HHmodel2 (1).pdf, PDF 20 | Not supplied; local course PDF | Course slide authors and original credited figure authors, copyright retained; private study |
| src/assets/figures/nbe-e4120/L08/circuit.webp | L08 teaching/practice/source audit | source/nbe-e4120/lectures/Ephys-Lecture-8-1-2026_HHmodel2 (1).pdf, PDF 2 | Not supplied; local course PDF | Course slide authors and original credited figure authors, copyright retained; private study |
| src/assets/figures/nbe-e4120/L08/continuity.webp | L08 teaching/practice/source audit | source/nbe-e4120/lectures/Ephys-Lecture-8-2-2026_Saltatory_v4 (1).pdf, PDF 17 | Not supplied; local course PDF | Course slide authors and original credited figure authors, copyright retained; private study |
| src/assets/figures/nbe-e4120/L08/continuous.webp | L08 teaching/practice/source audit | source/nbe-e4120/lectures/Ephys-Lecture-8-2-2026_Saltatory_v4 (1).pdf, PDF 9 | Not supplied; local course PDF | Course slide authors and original credited figure authors, copyright retained; private study |
| src/assets/figures/nbe-e4120/L08/diameter.webp | L08 teaching/practice/source audit | source/nbe-e4120/lectures/Ephys-Lecture-8-2-2026_Saltatory_v4 (1).pdf, PDF 3 | Not supplied; local course PDF | Course slide authors and original credited figure authors, copyright retained; private study |
| src/assets/figures/nbe-e4120/L08/dimensions.webp | L08 teaching/practice/source audit | source/nbe-e4120/lectures/Ephys-Lecture-8-2-2026_Saltatory_v4 (1).pdf, PDF 8 | Not supplied; local course PDF | Course slide authors and original credited figure authors, copyright retained; private study |
| src/assets/figures/nbe-e4120/L08/double.webp | L08 teaching/practice/source audit | source/nbe-e4120/lectures/Ephys-Lecture-8-2-2026_Saltatory_v4 (1).pdf, PDF 16 | Not supplied; local course PDF | Course slide authors and original credited figure authors, copyright retained; private study |
| src/assets/figures/nbe-e4120/L08/energy.webp | L08 teaching/practice/source audit | source/nbe-e4120/lectures/Ephys-Lecture-8-1-2026_HHmodel2 (1).pdf, PDF 16 | Not supplied; local course PDF | Course slide authors and original credited figure authors, copyright retained; private study |
| src/assets/figures/nbe-e4120/L08/ex-gating.webp | L08 teaching/practice/source audit | source/nbe-e4120/exercises/Exercise8HH.pdf, PDF 3 | Not supplied; local course PDF | Course slide authors and original credited figure authors, copyright retained; private study |
| src/assets/figures/nbe-e4120/L08/ex-potassium.webp | L08 teaching/practice/source audit | source/nbe-e4120/exercises/Exercise8HH.pdf, PDF 2 | Not supplied; local course PDF | Course slide authors and original credited figure authors, copyright retained; private study |
| src/assets/figures/nbe-e4120/L08/ex-table.webp | L08 teaching/practice/source audit | source/nbe-e4120/exercises/Exercise8HH.pdf, PDF 2 | Not supplied; local course PDF | Course slide authors and original credited figure authors, copyright retained; private study |
| src/assets/figures/nbe-e4120/L08/extracellular.webp | L08 teaching/practice/source audit | source/nbe-e4120/lectures/Ephys-Lecture-8-2-2026_Saltatory_v4 (1).pdf, PDF 14 | Not supplied; local course PDF | Course slide authors and original credited figure authors, copyright retained; private study |
| src/assets/figures/nbe-e4120/L08/feedback.webp | L08 teaching/practice/source audit | source/nbe-e4120/lectures/Ephys-Lecture-8-1-2026_HHmodel2 (1).pdf, PDF 11 | Not supplied; local course PDF | Course slide authors and original credited figure authors, copyright retained; private study |
| src/assets/figures/nbe-e4120/L08/gating.webp | L08 teaching/practice/source audit | source/nbe-e4120/lectures/Ephys-Lecture-8-1-2026_HHmodel2 (1).pdf, PDF 18 | Not supplied; local course PDF | Course slide authors and original credited figure authors, copyright retained; private study |
| src/assets/figures/nbe-e4120/L08/glia.webp | L08 teaching/practice/source audit | source/nbe-e4120/lectures/Ephys-Lecture-8-2-2026_Saltatory_v4 (1).pdf, PDF 5 | Not supplied; local course PDF | Course slide authors and original credited figure authors, copyright retained; private study |
| src/assets/figures/nbe-e4120/L08/moving-iv.webp | L08 teaching/practice/source audit | source/nbe-e4120/lectures/Ephys-Lecture-8-1-2026_HHmodel2 (1).pdf, PDF 9 | Not supplied; local course PDF | Course slide authors and original credited figure authors, copyright retained; private study |
| src/assets/figures/nbe-e4120/L08/myelin.webp | L08 teaching/practice/source audit | source/nbe-e4120/lectures/Ephys-Lecture-8-2-2026_Saltatory_v4 (1).pdf, PDF 6 | Not supplied; local course PDF | Course slide authors and original credited figure authors, copyright retained; private study |
| src/assets/figures/nbe-e4120/L08/noble.webp | L08 teaching/practice/source audit | source/nbe-e4120/lectures/Ephys-Lecture-8-1-2026_HHmodel2 (1).pdf, PDF 8 | Not supplied; local course PDF | Course slide authors and original credited figure authors, copyright retained; private study |
| src/assets/figures/nbe-e4120/L08/node.webp | L08 teaching/practice/source audit | source/nbe-e4120/lectures/Ephys-Lecture-8-2-2026_Saltatory_v4 (1).pdf, PDF 7 | Not supplied; local course PDF | Course slide authors and original credited figure authors, copyright retained; private study |
| src/assets/figures/nbe-e4120/L08/nonpropagating.webp | L08 teaching/practice/source audit | source/nbe-e4120/lectures/Ephys-Lecture-8-1-2026_HHmodel2 (1).pdf, PDF 5 | Not supplied; local course PDF | Course slide authors and original credited figure authors, copyright retained; private study |
| src/assets/figures/nbe-e4120/L08/phases.webp | L08 teaching/practice/source audit | source/nbe-e4120/lectures/Ephys-Lecture-8-1-2026_HHmodel2 (1).pdf, PDF 12 | Not supplied; local course PDF | Course slide authors and original credited figure authors, copyright retained; private study |
| src/assets/figures/nbe-e4120/L08/propagating.webp | L08 teaching/practice/source audit | source/nbe-e4120/lectures/Ephys-Lecture-8-1-2026_HHmodel2 (1).pdf, PDF 7 | Not supplied; local course PDF | Course slide authors and original credited figure authors, copyright retained; private study |
| src/assets/figures/nbe-e4120/L08/propagation.webp | L08 teaching/practice/source audit | source/nbe-e4120/lectures/Ephys-Lecture-8-1-2026_HHmodel2 (1).pdf, PDF 6 | Not supplied; local course PDF | Course slide authors and original credited figure authors, copyright retained; private study |
| src/assets/figures/nbe-e4120/L08/refractory.webp | L08 teaching/practice/source audit | source/nbe-e4120/lectures/Ephys-Lecture-8-1-2026_HHmodel2 (1).pdf, PDF 14 | Not supplied; local course PDF | Course slide authors and original credited figure authors, copyright retained; private study |
| src/assets/figures/nbe-e4120/L08/saltatory.webp | L08 teaching/practice/source audit | source/nbe-e4120/lectures/Ephys-Lecture-8-2-2026_Saltatory_v4 (1).pdf, PDF 10 | Not supplied; local course PDF | Course slide authors and original credited figure authors, copyright retained; private study |
| src/assets/figures/nbe-e4120/L08/sensor.webp | L08 teaching/practice/source audit | source/nbe-e4120/lectures/Ephys-Lecture-8-1-2026_HHmodel2 (1).pdf, PDF 15 | Not supplied; local course PDF | Course slide authors and original credited figure authors, copyright retained; private study |
| src/assets/figures/nbe-e4120/L08/slope.webp | L08 teaching/practice/source audit | source/nbe-e4120/lectures/Ephys-Lecture-8-1-2026_HHmodel2 (1).pdf, PDF 17 | Not supplied; local course PDF | Course slide authors and original credited figure authors, copyright retained; private study |
| src/assets/figures/nbe-e4120/L08/space.webp | L08 teaching/practice/source audit | source/nbe-e4120/lectures/Ephys-Lecture-8-1-2026_HHmodel2 (1).pdf, PDF 4 | Not supplied; local course PDF | Course slide authors and original credited figure authors, copyright retained; private study |
| src/assets/figures/nbe-e4120/L08/speed.webp | L08 teaching/practice/source audit | source/nbe-e4120/lectures/Ephys-Lecture-8-2-2026_Saltatory_v4 (1).pdf, PDF 4 | Not supplied; local course PDF | Course slide authors and original credited figure authors, copyright retained; private study |
| src/assets/figures/nbe-e4120/L08/threshold.webp | L08 teaching/practice/source audit | source/nbe-e4120/lectures/Ephys-Lecture-8-1-2026_HHmodel2 (1).pdf, PDF 10 | Not supplied; local course PDF | Course slide authors and original credited figure authors, copyright retained; private study |
| src/assets/figures/nbe-e4120/L08/twitch.webp | L08 teaching/practice/source audit | source/nbe-e4120/lectures/Ephys-Lecture-8-2-2026_Saltatory_v4 (1).pdf, PDF 13 | Not supplied; local course PDF | Course slide authors and original credited figure authors, copyright retained; private study |
| src/assets/figures/nbe-e4120/L08/voltage-current.webp | L08 teaching/practice/source audit | source/nbe-e4120/lectures/Ephys-Lecture-8-2-2026_Saltatory_v4 (1).pdf, PDF 15 | Not supplied; local course PDF | Course slide authors and original credited figure authors, copyright retained; private study |

`src/content/nbe-e4120/figures/tabulatedIV.js`: reusable d3 plot renderer used by three L08 steady-current panels. Numeric inputs are the supplied Exercise8HH PDF p2 table plus p1 conditions, authored in L08.js. Original visualization code; table remains course-author material for personal study. Connecting lines are explicitly visual guides, not a fitted/simulated recording.

## NBE-E4120 lecture 9 local source panels

All panels are extracted from the supplied private course PDFs, attributed to the lecturer/underlying figure owners identified on those slides. No public source-deck URL or open redistribution licence is supplied. Personal local study only. Labels and axes are retained; quiz mode is disabled. The reproducible recipe and per-file source/page/crop metadata are `scripts/figures_nbe-e4120_L09.py` and adjacent JSON files. Embedded panels avoid clipping source labels. No library or generated experimental figures were added.

| Asset | Use | Original source | URL | Licence / attribution |
|---|---|---|---|---|
| `src/assets/figures/nbe-e4120/L09/applications-02.webp` | L09 teaching / source-based bank or mock practice | `source/nbe-e4120/lectures/Ephys-Lecture-9_2-2026_Channelopathy_v2.pdf`, PDF p2 | Local supplied PDF; no public deck URL | Course/underlying figure copyright; attribution as printed on source slide; private study |
| `src/assets/figures/nbe-e4120/L09/applications-03.webp` | L09 teaching / source-based bank or mock practice | `source/nbe-e4120/lectures/Ephys-Lecture-9_2-2026_Channelopathy_v2.pdf`, PDF p3 | Local supplied PDF; no public deck URL | Course/underlying figure copyright; attribution as printed on source slide; private study |
| `src/assets/figures/nbe-e4120/L09/applications-04.webp` | L09 teaching / source-based bank or mock practice | `source/nbe-e4120/lectures/Ephys-Lecture-9_2-2026_Channelopathy_v2.pdf`, PDF p4 | Local supplied PDF; no public deck URL | Course/underlying figure copyright; attribution as printed on source slide; private study |
| `src/assets/figures/nbe-e4120/L09/applications-05.webp` | L09 teaching / source-based bank or mock practice | `source/nbe-e4120/lectures/Ephys-Lecture-9_2-2026_Channelopathy_v2.pdf`, PDF p5 | Local supplied PDF; no public deck URL | Course/underlying figure copyright; attribution as printed on source slide; private study |
| `src/assets/figures/nbe-e4120/L09/applications-06.webp` | L09 teaching / source-based bank or mock practice | `source/nbe-e4120/lectures/Ephys-Lecture-9_2-2026_Channelopathy_v2.pdf`, PDF p6 | Local supplied PDF; no public deck URL | Course/underlying figure copyright; attribution as printed on source slide; private study |
| `src/assets/figures/nbe-e4120/L09/applications-07.webp` | L09 teaching / source-based bank or mock practice | `source/nbe-e4120/lectures/Ephys-Lecture-9_2-2026_Channelopathy_v2.pdf`, PDF p7 | Local supplied PDF; no public deck URL | Course/underlying figure copyright; attribution as printed on source slide; private study |
| `src/assets/figures/nbe-e4120/L09/applications-08.webp` | L09 teaching / source-based bank or mock practice | `source/nbe-e4120/lectures/Ephys-Lecture-9_2-2026_Channelopathy_v2.pdf`, PDF p8 | Local supplied PDF; no public deck URL | Course/underlying figure copyright; attribution as printed on source slide; private study |
| `src/assets/figures/nbe-e4120/L09/applications-09.webp` | L09 teaching / source-based bank or mock practice | `source/nbe-e4120/lectures/Ephys-Lecture-9_2-2026_Channelopathy_v2.pdf`, PDF p9 | Local supplied PDF; no public deck URL | Course/underlying figure copyright; attribution as printed on source slide; private study |
| `src/assets/figures/nbe-e4120/L09/applications-10.webp` | L09 teaching / source-based bank or mock practice | `source/nbe-e4120/lectures/Ephys-Lecture-9_2-2026_Channelopathy_v2.pdf`, PDF p10 | Local supplied PDF; no public deck URL | Course/underlying figure copyright; attribution as printed on source slide; private study |
| `src/assets/figures/nbe-e4120/L09/applications-11.webp` | L09 teaching / source-based bank or mock practice | `source/nbe-e4120/lectures/Ephys-Lecture-9_2-2026_Channelopathy_v2.pdf`, PDF p11 | Local supplied PDF; no public deck URL | Course/underlying figure copyright; attribution as printed on source slide; private study |
| `src/assets/figures/nbe-e4120/L09/applications-12.webp` | L09 teaching / source-based bank or mock practice | `source/nbe-e4120/lectures/Ephys-Lecture-9_2-2026_Channelopathy_v2.pdf`, PDF p12 | Local supplied PDF; no public deck URL | Course/underlying figure copyright; attribution as printed on source slide; private study |
| `src/assets/figures/nbe-e4120/L09/applications-13.webp` | L09 teaching / source-based bank or mock practice | `source/nbe-e4120/lectures/Ephys-Lecture-9_2-2026_Channelopathy_v2.pdf`, PDF p13 | Local supplied PDF; no public deck URL | Course/underlying figure copyright; attribution as printed on source slide; private study |
| `src/assets/figures/nbe-e4120/L09/ions-02.webp` | L09 teaching / source-based bank or mock practice | `source/nbe-e4120/lectures/Ephys-Lecture-9_1_2026-Ion_channels.pdf`, PDF p2 | Local supplied PDF; no public deck URL | Course/underlying figure copyright; attribution as printed on source slide; private study |
| `src/assets/figures/nbe-e4120/L09/ions-03.webp` | L09 teaching / source-based bank or mock practice | `source/nbe-e4120/lectures/Ephys-Lecture-9_1_2026-Ion_channels.pdf`, PDF p3 | Local supplied PDF; no public deck URL | Course/underlying figure copyright; attribution as printed on source slide; private study |
| `src/assets/figures/nbe-e4120/L09/ions-04.webp` | L09 teaching / source-based bank or mock practice | `source/nbe-e4120/lectures/Ephys-Lecture-9_1_2026-Ion_channels.pdf`, PDF p4 | Local supplied PDF; no public deck URL | Course/underlying figure copyright; attribution as printed on source slide; private study |
| `src/assets/figures/nbe-e4120/L09/ions-05.webp` | L09 teaching / source-based bank or mock practice | `source/nbe-e4120/lectures/Ephys-Lecture-9_1_2026-Ion_channels.pdf`, PDF p5 | Local supplied PDF; no public deck URL | Course/underlying figure copyright; attribution as printed on source slide; private study |
| `src/assets/figures/nbe-e4120/L09/ions-06.webp` | L09 teaching / source-based bank or mock practice | `source/nbe-e4120/lectures/Ephys-Lecture-9_1_2026-Ion_channels.pdf`, PDF p6 | Local supplied PDF; no public deck URL | Course/underlying figure copyright; attribution as printed on source slide; private study |
| `src/assets/figures/nbe-e4120/L09/ions-07.webp` | L09 teaching / source-based bank or mock practice | `source/nbe-e4120/lectures/Ephys-Lecture-9_1_2026-Ion_channels.pdf`, PDF p7 | Local supplied PDF; no public deck URL | Course/underlying figure copyright; attribution as printed on source slide; private study |
| `src/assets/figures/nbe-e4120/L09/ions-08.webp` | L09 teaching / source-based bank or mock practice | `source/nbe-e4120/lectures/Ephys-Lecture-9_1_2026-Ion_channels.pdf`, PDF p8 | Local supplied PDF; no public deck URL | Course/underlying figure copyright; attribution as printed on source slide; private study |
| `src/assets/figures/nbe-e4120/L09/ions-09.webp` | L09 teaching / source-based bank or mock practice | `source/nbe-e4120/lectures/Ephys-Lecture-9_1_2026-Ion_channels.pdf`, PDF p9 | Local supplied PDF; no public deck URL | Course/underlying figure copyright; attribution as printed on source slide; private study |
| `src/assets/figures/nbe-e4120/L09/ions-10.webp` | L09 teaching / source-based bank or mock practice | `source/nbe-e4120/lectures/Ephys-Lecture-9_1_2026-Ion_channels.pdf`, PDF p10 | Local supplied PDF; no public deck URL | Course/underlying figure copyright; attribution as printed on source slide; private study |
| `src/assets/figures/nbe-e4120/L09/ions-11.webp` | L09 teaching / source-based bank or mock practice | `source/nbe-e4120/lectures/Ephys-Lecture-9_1_2026-Ion_channels.pdf`, PDF p11 | Local supplied PDF; no public deck URL | Course/underlying figure copyright; attribution as printed on source slide; private study |
| `src/assets/figures/nbe-e4120/L09/ions-12.webp` | L09 teaching / source-based bank or mock practice | `source/nbe-e4120/lectures/Ephys-Lecture-9_1_2026-Ion_channels.pdf`, PDF p12 | Local supplied PDF; no public deck URL | Course/underlying figure copyright; attribution as printed on source slide; private study |
| `src/assets/figures/nbe-e4120/L09/ions-13.webp` | L09 teaching / source-based bank or mock practice | `source/nbe-e4120/lectures/Ephys-Lecture-9_1_2026-Ion_channels.pdf`, PDF p13 | Local supplied PDF; no public deck URL | Course/underlying figure copyright; attribution as printed on source slide; private study |
| `src/assets/figures/nbe-e4120/L09/ions-14.webp` | L09 teaching / source-based bank or mock practice | `source/nbe-e4120/lectures/Ephys-Lecture-9_1_2026-Ion_channels.pdf`, PDF p14 | Local supplied PDF; no public deck URL | Course/underlying figure copyright; attribution as printed on source slide; private study |
| `src/assets/figures/nbe-e4120/L09/ions-15.webp` | L09 teaching / source-based bank or mock practice | `source/nbe-e4120/lectures/Ephys-Lecture-9_1_2026-Ion_channels.pdf`, PDF p15 | Local supplied PDF; no public deck URL | Course/underlying figure copyright; attribution as printed on source slide; private study |
| `src/assets/figures/nbe-e4120/L09/ions-16.webp` | L09 teaching / source-based bank or mock practice | `source/nbe-e4120/lectures/Ephys-Lecture-9_1_2026-Ion_channels.pdf`, PDF p16 | Local supplied PDF; no public deck URL | Course/underlying figure copyright; attribution as printed on source slide; private study |
| `src/assets/figures/nbe-e4120/L09/ions-17.webp` | L09 teaching / source-based bank or mock practice | `source/nbe-e4120/lectures/Ephys-Lecture-9_1_2026-Ion_channels.pdf`, PDF p17 | Local supplied PDF; no public deck URL | Course/underlying figure copyright; attribution as printed on source slide; private study |
| `src/assets/figures/nbe-e4120/L09/ions-18.webp` | L09 teaching / source-based bank or mock practice | `source/nbe-e4120/lectures/Ephys-Lecture-9_1_2026-Ion_channels.pdf`, PDF p18 | Local supplied PDF; no public deck URL | Course/underlying figure copyright; attribution as printed on source slide; private study |
| `src/assets/figures/nbe-e4120/L09/ions-19.webp` | L09 teaching / source-based bank or mock practice | `source/nbe-e4120/lectures/Ephys-Lecture-9_1_2026-Ion_channels.pdf`, PDF p19 | Local supplied PDF; no public deck URL | Course/underlying figure copyright; attribution as printed on source slide; private study |
| `src/assets/figures/nbe-e4120/L09/ions-20.webp` | L09 teaching / source-based bank or mock practice | `source/nbe-e4120/lectures/Ephys-Lecture-9_1_2026-Ion_channels.pdf`, PDF p20 | Local supplied PDF; no public deck URL | Course/underlying figure copyright; attribution as printed on source slide; private study |
| `src/assets/figures/nbe-e4120/L09/ions-21.webp` | L09 teaching / source-based bank or mock practice | `source/nbe-e4120/lectures/Ephys-Lecture-9_1_2026-Ion_channels.pdf`, PDF p21 | Local supplied PDF; no public deck URL | Course/underlying figure copyright; attribution as printed on source slide; private study |
| `src/assets/figures/nbe-e4120/L09/ions-22.webp` | L09 teaching / source-based bank or mock practice | `source/nbe-e4120/lectures/Ephys-Lecture-9_1_2026-Ion_channels.pdf`, PDF p22 | Local supplied PDF; no public deck URL | Course/underlying figure copyright; attribution as printed on source slide; private study |

L09 extraction note: `applications-04.webp` composes two rendered source rectangles, preserving PDF vector labels in the TTX table. `applications-07.webp` renders the source image together with its PDF mask and vector class labels. The recipe composites embedded transparency onto white where appropriate.
