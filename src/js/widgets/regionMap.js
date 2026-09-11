// Clickable figure. Hover, tap or focus a region to read its name and
// explanation; a native select lists the same regions for keyboard use.
// The drawing comes from a figure function that marks each region with
// data-region="<key>". All text comes from props, so this file holds no
// lecture content.
//
// props: {
//   figure: ({ layer, labels, uid }) => svgString,
//   layers: [{ key, label, regions: [{ key, name, info }] }],
//   defaultLayer?: key,          // default: first layer
//   labels?: boolean,            // draw text labels on the figure (default true)
//   intro?: string,              // shown in the panel before anything is chosen
//   layerLabel?: string,         // legend text for the layer control
//   selectLabel?: string,        // label for the region select
//   placeholder?: string,        // empty option text in the select
// }

import { el } from '../dom.js';

let counter = 0;

export const regionMap = {
  fallback(props) {
    const layer = props.defaultLayer || props.layers?.[0]?.key;
    return props.figure({ layer, labels: props.labels !== false, uid: `fb${(counter += 1)}` });
  },

  mount(container, props) {
    const layers = props.layers || [];
    let layerKey = props.defaultLayer || layers[0]?.key;
    let pinned = null;
    const uid = `rm${(counter += 1)}`;

    const host = el('div', { class: 'region-map' });
    const title = el('p', { class: 'widget-info-title' });
    const body = el('p', { class: 'widget-info-body' });
    const panel = el('div', { class: 'widget-info', 'aria-live': 'polite' }, [title, body]);
    const select = el('select', { 'aria-label': props.selectLabel || 'Region' });

    function currentLayer() {
      return layers.find((l) => l.key === layerKey) || layers[0];
    }

    function findRegion(key) {
      return currentLayer()?.regions.find((r) => r.key === key) || null;
    }

    function show(key) {
      const region = key ? findRegion(key) : null;
      host.querySelectorAll('[data-region].is-active').forEach((n) => n.classList.remove('is-active'));
      if (!region) {
        title.textContent = '';
        body.textContent = props.intro || '';
        return;
      }
      host.querySelectorAll(`[data-region="${region.key}"]`).forEach((n) => n.classList.add('is-active'));
      title.textContent = region.name;
      body.textContent = region.info || '';
    }

    function pin(key) {
      pinned = key;
      show(key);
      if (select.value !== key) select.value = key || '';
    }

    function renderFigure() {
      host.innerHTML = props.figure({ layer: layerKey, labels: props.labels !== false, uid });
      const layer = currentLayer();
      const keys = new Set(layer.regions.map((r) => r.key));
      host.querySelectorAll('[data-region]').forEach((node) => {
        const key = node.dataset.region;
        if (!keys.has(key)) {
          node.classList.remove('map-region');
          node.setAttribute('pointer-events', 'none');
          return;
        }
        const region = findRegion(key);
        node.setAttribute('tabindex', '0');
        node.setAttribute('role', 'button');
        node.setAttribute('aria-label', region.name);
        node.addEventListener('mouseenter', () => show(key));
        node.addEventListener('mouseleave', () => show(pinned));
        node.addEventListener('focus', () => show(key));
        node.addEventListener('blur', () => show(pinned));
        node.addEventListener('click', () => pin(pinned === key ? null : key));
        node.addEventListener('keydown', (event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            pin(pinned === key ? null : key);
          }
        });
      });

      select.replaceChildren(
        el('option', { value: '' }, props.placeholder || 'Choose'),
        ...layer.regions.map((r) => el('option', { value: r.key }, r.name))
      );
      pinned = null;
      select.value = '';
      show(null);
    }

    select.addEventListener('change', () => pin(select.value || null));

    const controls = el('div', { class: 'widget-controls' });
    if (layers.length > 1) {
      const legend = el('span', { class: 'widget-legend' }, props.layerLabel || 'Layer');
      const group = el('fieldset', { class: 'widget-radios' }, [
        el('legend', { class: 'visually-hidden' }, props.layerLabel || 'Layer'),
        legend,
        layers.map((l) =>
          el('label', { class: 'widget-radio' }, [
            el('input', {
              type: 'radio',
              name: `${uid}-layer`,
              value: l.key,
              checked: l.key === layerKey,
              onChange: () => {
                layerKey = l.key;
                renderFigure();
              },
            }),
            el('span', {}, l.label),
          ])
        ),
      ]);
      controls.appendChild(group);
    }
    controls.appendChild(el('label', { class: 'widget-select' }, [el('span', {}, props.selectLabel || 'Region'), select]));

    container.replaceChildren(host, panel, controls);
    renderFigure();
  },
};
