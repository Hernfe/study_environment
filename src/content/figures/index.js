// Static figure registry. A content visual of type 'svg' names a key
// here; the value is a function (props) => svg markup string.
// Figures use currentColor and the CSS colour tokens so they follow
// the theme. Keep each figure (or family of figures) in its own file.
// Raster figures (slide crops, BioArt, Servier) are not registered here;
// they are shown through the image-hotspots widget with a src URL.

import { exampleCell } from './example-cell.js';
import { disorderBurden, neuronCounts } from './charts.js';
import { axonalTransport } from './cells.js';

export const figures = {
  'example-cell': exampleCell,
  'disorder-burden': disorderBurden,
  'neuron-counts': neuronCounts,
  'axonal-transport': axonalTransport,
};
