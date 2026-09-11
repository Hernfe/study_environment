// Static figure registry. A content visual of type 'svg' names a key
// here; the value is a function (props) => svg markup string.
// Figures use currentColor and the CSS colour tokens so they follow
// the theme. Keep each figure in its own file.

import { exampleCell } from './example-cell.js';

export const figures = {
  'example-cell': exampleCell,
};
