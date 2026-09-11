// Static figure registry. A content visual of type 'svg' names a key
// here; the value is a function (props) => svg markup string.
// Figures use currentColor and the CSS colour tokens so they follow
// the theme. Keep each figure (or family of figures) in its own file.

import { exampleCell } from './example-cell.js';
import { brainLateral } from './brain-lateral.js';
import { neuron } from './neuron.js';
import { disorderBurden, neuronCounts, scalesLadder } from './charts.js';
import {
  corticalLayers,
  synapseSteps,
  axonalTransport,
  gliaOverview,
  stainTriptych,
} from './cells.js';

export const figures = {
  'example-cell': exampleCell,
  'brain-lateral': brainLateral,
  neuron,
  'scales-ladder': scalesLadder,
  'disorder-burden': disorderBurden,
  'neuron-counts': neuronCounts,
  'cortical-layers': corticalLayers,
  'synapse-steps': synapseSteps,
  'axonal-transport': axonalTransport,
  'glia-overview': gliaOverview,
  'stain-triptych': stainTriptych,
};
