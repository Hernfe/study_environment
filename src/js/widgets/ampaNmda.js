// AMPA versus NMDA. A Vm slider and a glutamate toggle. Left: the I-V
// relation of the two receptor channels (AMPA linear through 0 mV;
// NMDA with the voltage-dependent Mg2+ block, Jahr and Stevens form).
// Right: a schematic NMDA pore with Mg2+ in or out. Below: the time
// courses of the two currents after one release (AMPA fast, NMDA slow).
//
// props: {
//   labels: { vm, glutamate, ampa, nmda, block, mg, current, open, blocked, closed, ... },
// }

import { el } from '../dom.js';
import { svgIn, rangeAxisBottom, rangeAxisLeft, refLine, sliderRow, checkRow, readout, halo, scaleLinear, d3line, fmt0, MUTED, ACCENT, INK, BORDER, FONT } from './d3util.js';

const W = 640;
const H = 370;
const M = { top: 18, right: 24, bottom: 30, left: 56 };
const G_AMPA = 1;
const G_NMDA = 1;
const EREV = 0;
const MG = 1; // mM

// Fraction of NMDA channels not blocked by Mg2+ at voltage v (Jahr and Stevens 1990).
function unblocked(v) {
  return 1 / (1 + (MG / 3.57) * Math.exp(-0.062 * v));
}

function draw(container, props) {
  const L = props.labels || {};
  const svg = svgIn(container, W, H);
  const g = svg.append('g');
  const xl = scaleLinear().domain([-90, 40]).range([M.left, W * 0.52]);
  const yl = scaleLinear().domain([-100, 50]).range([H * 0.55, M.top]);
  rangeAxisBottom(g, xl, [-90, -60, -30, 0, 30], H * 0.55, (v) => String(v), 'mV');
  rangeAxisLeft(g, yl, [-100, -50, 0, 50], M.left, (v) => String(v), L.currentUnit || 'pA');
  refLine(g, xl(-90), xl(40), yl(0), '');
  const ampaPts = [];
  const nmdaPts = [];
  for (let v = -90; v <= 40; v += 1) {
    ampaPts.push([v, G_AMPA * (v - EREV)]);
    nmdaPts.push([v, G_NMDA * unblocked(v) * (v - EREV)]);
  }
  const lineFn = d3line().x((d) => xl(d[0])).y((d) => yl(Math.max(-100, Math.min(50, d[1]))));
  const ampaLine = g.append('path').attr('d', lineFn(ampaPts)).attr('fill', 'none').attr('stroke', INK).attr('stroke-width', 1.5);
  const nmdaLine = g.append('path').attr('d', lineFn(nmdaPts)).attr('fill', 'none').attr('stroke', ACCENT).attr('stroke-width', 2);
  g.append('text').attr('x', xl(-62)).attr('y', yl(-62) + 16).attr('fill', INK).attr('font-size', FONT - 1).text(L.ampa || 'AMPA');
  g.append('text').attr('x', xl(-50)).attr('y', yl(-4) - 8).attr('fill', ACCENT).attr('font-size', FONT - 1).text(L.nmda || 'NMDA');
  const cursor = g.append('line').attr('stroke', MUTED).attr('stroke-dasharray', '2 3');
  const dotA = g.append('circle').attr('r', 4).attr('fill', INK);
  const dotN = g.append('circle').attr('r', 4.5).attr('fill', ACCENT);
  const textN = halo(g.append('text').attr('fill', INK).attr('font-weight', 600).attr('font-size', FONT));

  // Pore schematic on the right.
  const px = W * 0.62;
  const pore = g.append('g').attr('transform', `translate(${px},${M.top + 10}) scale(1.15)`);
  pore.append('rect').attr('x', 0).attr('y', 44).attr('width', 200).attr('height', 28).attr('fill', BORDER).attr('opacity', 0.6);
  pore.append('path').attr('d', 'M70,20 L80,90 L120,90 L130,20 Z').attr('fill', 'var(--c-surface)').attr('stroke', INK).attr('stroke-width', 1.5);
  pore.append('rect').attr('x', 92).attr('y', 20).attr('width', 16).attr('height', 70).attr('fill', 'var(--c-bg)').attr('stroke', 'none');
  const glu = pore.append('circle').attr('cx', 66).attr('cy', 16).attr('r', 5).attr('fill', ACCENT);
  const mg = pore.append('circle').attr('r', 6).attr('fill', MUTED);
  const mgText = pore.append('text').attr('fill', MUTED).attr('font-size', FONT - 2);
  const flow = pore.append('g');
  const stateText = pore.append('text').attr('x', 100).attr('y', 112).attr('text-anchor', 'middle').attr('fill', INK).attr('font-weight', 600).attr('font-size', FONT);
  pore.append('text').attr('x', 4).attr('y', 12).attr('fill', MUTED).attr('font-size', FONT - 2).text(L.outside || '');
  pore.append('text').attr('x', 4).attr('y', 88).attr('fill', MUTED).attr('font-size', FONT - 2).text(L.inside || '');

  // Time courses, bottom.
  const xt = scaleLinear().domain([0, 200]).range([M.left, W - M.right]);
  const yt = scaleLinear().domain([0, 1]).range([H - M.bottom, H * 0.72]);
  rangeAxisBottom(g, xt, [0, 50, 100, 150, 200], H - M.bottom, (v) => String(v), 'ms');
  const tA = g.append('path').attr('fill', 'none').attr('stroke', INK).attr('stroke-width', 1.5);
  const tN = g.append('path').attr('fill', 'none').attr('stroke', ACCENT).attr('stroke-width', 2);
  g.append('text').attr('x', xt(6)).attr('y', yt(1) - 4).attr('fill', INK).attr('font-size', FONT - 2).text(L.ampaTime || '');
  const tNText = g.append('text').attr('x', xt(60)).attr('fill', ACCENT).attr('font-size', FONT - 2).text(L.nmdaTime || '');

  function update({ vm, glu: bound }) {
    const iA = bound ? G_AMPA * (vm - EREV) : 0;
    const frac = unblocked(vm);
    const iN = bound ? G_NMDA * frac * (vm - EREV) : 0;
    cursor.attr('x1', xl(vm)).attr('x2', xl(vm)).attr('y1', yl(50)).attr('y2', yl(-100));
    dotA.attr('cx', xl(vm)).attr('cy', yl(Math.max(-100, iA))).attr('opacity', bound ? 1 : 0.3);
    dotN.attr('cx', xl(vm)).attr('cy', yl(Math.max(-100, iN))).attr('opacity', bound ? 1 : 0.3);
    textN.attr('x', xl(vm) + 8).attr('y', yl(Math.max(-100, iN)) + 16).text(bound ? `${fmt0(iN)} ${L.currentUnit || 'pA'}` : '');
    ampaLine.attr('opacity', bound ? 1 : 0.3);
    nmdaLine.attr('opacity', bound ? 1 : 0.3);
    glu.attr('opacity', bound ? 1 : 0.2);
    const blocked = frac < 0.5;
    mg.attr('cx', 100).attr('cy', blocked ? 50 : -2).attr('opacity', 1);
    mgText.attr('x', 110).attr('y', blocked ? 54 : 2).text(L.mg || 'Mg2+');
    flow.selectAll('*').remove();
    if (bound && !blocked) {
      [[100, 30], [100, 60], [100, 84]].forEach(([x, y]) => flow.append('circle').attr('cx', x).attr('cy', y).attr('r', 2.5).attr('fill', ACCENT));
      flow.append('path').attr('d', 'M100,92 l-4,-6 M100,92 l4,-6').attr('stroke', ACCENT).attr('stroke-width', 1.5).attr('fill', 'none');
    }
    stateText.text(!bound ? L.closed || 'closed' : blocked ? L.blocked || 'open but blocked' : L.open || 'open, ions pass');
    // Time courses scaled by the currents at this voltage.
    const aAmp = bound ? Math.min(1, Math.abs(iA) / 65) : 0;
    const nAmp = bound ? Math.min(1, Math.abs(iN) / 65) : 0;
    const pa = [];
    const pn = [];
    for (let t = 0; t <= 200; t += 0.5) {
      pa.push([t, aAmp * (1 - Math.exp(-t / 0.5)) * Math.exp(-t / 3)]);
      pn.push([t, nAmp * (1 - Math.exp(-t / 5)) * Math.exp(-t / 80)]);
    }
    const tf = d3line().x((d) => xt(d[0])).y((d) => yt(d[1]));
    tA.attr('d', tf(pa));
    tN.attr('d', tf(pn));
    tNText.attr('y', yt(nAmp * 0.65) - 6);
    return { iA, iN, frac, blocked, bound };
  }
  return { update };
}

export const ampaNmda = {
  fallback(props) {
    const holder = document.createElement('div');
    draw(holder, props).update({ vm: -65, glu: true });
    return holder.innerHTML;
  },

  mount(container, props) {
    const L = props.labels || {};
    const state = { vm: -65, glu: true };
    const plot = el('div', { class: 'plot' });
    const c = draw(plot, props);
    const info = readout([[L.ampa || 'AMPA'], [L.nmda || 'NMDA'], [L.block || 'Mg2+ block']]);
    function refresh() {
      const r = c.update(state);
      info.set(0, [el('strong', {}, r.bound ? `${fmt0(r.iA)} ${L.currentUnit || 'pA'}` : L.closed || 'closed'), el('span', { class: 'demo-note' }, ` ${L.ampaNote || ''}`)]);
      info.set(1, [el('strong', {}, r.bound ? `${fmt0(r.iN)} ${L.currentUnit || 'pA'}` : L.closed || 'closed'), el('span', { class: 'demo-note' }, ` ${L.nmdaNote || ''}`)]);
      info.set(2, [el('strong', {}, `${fmt0((1 - r.frac) * 100)} % ${L.blockedPct || 'of channels blocked'}`), el('span', { class: 'demo-note' }, ` ${r.blocked ? L.blockNote || '' : L.unblockNote || ''}`)]);
    }
    const slider = sliderRow(L.vm || 'Membrane potential', { min: -90, max: 40, step: 1, value: -65, unit: 'mV' }, (v) => { state.vm = v; refresh(); });
    const chk = checkRow(L.glutamate || 'Glutamate bound', true, (v) => { state.glu = v; refresh(); });
    container.replaceChildren(plot, el('div', { class: 'widget-controls' }, [slider, el('div', { class: 'widget-radios' }, [chk])]), info.node);
    refresh();
  },
};
