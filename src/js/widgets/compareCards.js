// Comparison card. Native radio buttons pick one item; the card shows
// that item's drawing and a short definition list. Optionally a table
// of every item follows, so the whole comparison is on the page for
// copying onto a cheat sheet. All text and drawings come from props.
//
// props: {
//   items: [{ key, label, figure: svgString, rows: [{ term, text }] }],
//   chooseLabel?: string,         // legend for the radio group
//   fallback?: () => svgString,   // static picture before mount (default: first item)
//   table?: { caption, columns: [string], rows: [[string]] }  // optional summary table
// }

import { el } from '../dom.js';

let counter = 0;

export const compareCards = {
  fallback(props) {
    if (typeof props.fallback === 'function') return props.fallback();
    return props.items?.[0]?.figure || '';
  },

  mount(container, props) {
    const items = props.items || [];
    const uid = `cc${(counter += 1)}`;
    let current = items[0]?.key;

    const picture = el('div', { class: 'compare-figure' });
    const heading = el('p', { class: 'widget-info-title' });
    const list = el('dl', { class: 'compare-rows' });
    const card = el('div', { class: 'widget-info', 'aria-live': 'polite' }, [heading, list]);

    function render() {
      const item = items.find((i) => i.key === current) || items[0];
      if (!item) return;
      picture.innerHTML = item.figure || '';
      heading.textContent = item.label;
      list.replaceChildren(...(item.rows || []).flatMap((r) => [el('dt', {}, r.term), el('dd', {}, r.text)]));
    }

    const radios = el('fieldset', { class: 'widget-radios' }, [
      el('legend', { class: 'visually-hidden' }, props.chooseLabel || 'Choose'),
      el('span', { class: 'widget-legend' }, props.chooseLabel || 'Choose'),
      items.map((item) =>
        el('label', { class: 'widget-radio' }, [
          el('input', {
            type: 'radio',
            name: `${uid}-item`,
            value: item.key,
            checked: item.key === current,
            onChange: () => {
              current = item.key;
              render();
            },
          }),
          el('span', {}, item.label),
        ])
      ),
    ]);

    const controls = el('div', { class: 'widget-controls' }, radios);
    const children = [picture, card, controls];

    if (props.table) {
      const table = el('table', { class: 'compare-table' }, [
        props.table.caption ? el('caption', {}, props.table.caption) : null,
        el('thead', {}, el('tr', {}, props.table.columns.map((c) => el('th', { scope: 'col' }, c)))),
        el(
          'tbody',
          {},
          props.table.rows.map((row) =>
            el(
              'tr',
              {},
              row.map((cell, i) => (i === 0 ? el('th', { scope: 'row' }, cell) : el('td', {}, cell)))
            )
          )
        ),
      ]);
      children.push(el('div', { class: 'table-wrap' }, table));
    }

    container.replaceChildren(...children);
    render();
  },
};
