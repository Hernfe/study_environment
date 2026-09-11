// Widget registry. A content visual of type 'widget' names a key here.
// Each widget is { mount(container, props), fallback?(props) -> svg string }.

import { sliderPlot } from './sliderPlot.js';

export const widgets = {
  'slider-plot': sliderPlot,
};
