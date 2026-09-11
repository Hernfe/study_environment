// Widget registry. A content visual of type 'widget' names a key here.
// Each widget is { mount(container, props), fallback?(props) -> svg string }.
// Several names can share one engine; the content file supplies the
// figure and the text, so the engine holds no lecture content.

import { sliderPlot } from './sliderPlot.js';
import { regionMap } from './regionMap.js';
import { compareCards } from './compareCards.js';
import { sectionPlanes } from './sectionPlanes.js';

export const widgets = {
  'slider-plot': sliderPlot,
  // Clickable figures: hover, tap or pick from a select.
  'cortical-map': regionMap,
  'neuron-parts': regionMap,
  // Pick one item, read its card; optional summary table.
  'glia-compare': compareCards,
  'stain-compare': compareCards,
  // Coronal, sagittal, horizontal on two views with direction terms.
  'section-planes': sectionPlanes,
};
