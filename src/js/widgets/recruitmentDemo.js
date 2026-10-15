// Recruitment and rate coding (L06, slides 36 and 37; HW3 3B.1). A force
// slider asks one muscle for a fraction of its maximal voluntary
// contraction (MVC). The motor neuron pool is drawn as a row of motor
// units, smallest first; a unit fills when it is recruited. Below, one
// second of spikes from every active unit shows rate coding, and on the
// right force is plotted against the share of the pool recruited (the
// curve of slide 37).
//
// Model (illustrative, not fitted): units get twitch forces spread
// exponentially over a 60-fold range; the first half are slow (S), the
// next 30 percent fast fatigue-resistant (FR), the last 20 percent fast
// fatigable (FF). Recruitment thresholds rise with unit size (Henneman's
// size principle), so all units are in by 70 percent of the excitatory
// drive and the rest of the range is rate coding. A recruited unit
// starts at 8 spikes/s and speeds up with the drive, up to 20 (S), 40
// (FR) or 50 (FF) spikes/s; its force grows with rate as twitches fuse.
// The drive needed for the asked force is found by bisection.
//
// props: {
//   units: 24, initial: 20,
//   labels: { force, pool, small, large, raster, curve, curveX, curveY,
//             recruited, rate, active, types: { S, FR, FF } },
// }

import { el } from '../dom.js';
import { svgIn, sliderRow, readout, scaleLinear, rangeAxisBottom, rangeAxisLeft, spikeTrain, halo, MUTED, ACCENT, INK, BORDER, FONT } from './d3util.js';

export function makePool(n = 24) {
  const ratio = 60;
  return Array.from({ length: n }, (_, i) => {
    const f = i / (n - 1);
    const type = f < 0.5 ? 'S' : f < 0.8 ? 'FR' : 'FF';
    return {
      i,
      type,
      size: Math.exp(Math.log(ratio) * f),
      threshold: 0.01 + 0.69 * Math.pow(f, 1.15),
      maxRate: type === 'S' ? 20 : type === 'FR' ? 40 : 50,
    };
  });
}

const fusion = (rate) => 1 - Math.exp(-rate / 14);

export function poolState(pool, drive) {
  let force = 0;
  let maxForce = 0;
  const units = pool.map((u) => {
    maxForce += u.size * fusion(u.maxRate);
    if (drive < u.threshold) return { ...u, rate: 0, force: 0 };
    const rate = Math.min(u.maxRate, 8 + (drive - u.threshold) * 90);
    const f = u.size * fusion(rate);
    force += f;
    return { ...u, rate, force: f };
  });
  return { units, force: force / maxForce };
}

export function driveFor(pool, target) {
  let lo = 0;
  let hi = 1.2;
  for (let k = 0; k < 40; k += 1) {
    const mid = (lo + hi) / 2;
    if (poolState(pool, mid).force < target) lo = mid; else hi = mid;
  }
  return hi;
}

function draw(container, props, pool) {
  const L = props.labels || {};
  const TYPES = L.types || { S: 'Slow', FR: 'Fast fatigue-resistant', FF: 'Fast fatigable' };
  const W = 670;
  const n = pool.length;
  const PX0 = 30;
  const PX1 = 640;
  const yPool = 54;
  const step = (PX1 - PX0) / n;
  const rMax = step * 0.48;
  const rOf = (u) => Math.max(2.2, rMax * Math.sqrt(u.size / pool[n - 1].size));
  const RX0 = 30;
  const RX1 = 380;
  const RY0 = 140;
  const rowH = 7;
  const RY1 = RY0 + n * rowH;
  const H = RY1 + 48;
  const svg = svgIn(container, W, H);
  const g = svg.append('g');

  g.append('text').attr('x', PX0).attr('y', 14).attr('font-size', FONT - 1).attr('fill', INK).text(L.pool || 'Motor neuron pool, smallest unit first');
  // Type brackets.
  for (const t of ['S', 'FR', 'FF']) {
    const us = pool.filter((u) => u.type === t);
    const a = PX0 + us[0].i * step + 2;
    const b = PX0 + (us[us.length - 1].i + 1) * step - 2;
    g.append('path').attr('d', `M${a},${yPool + rMax + 8}v4H${b}v-4`).attr('fill', 'none').attr('stroke', BORDER);
    g.append('text').attr('x', (a + b) / 2).attr('y', yPool + rMax + 24).attr('text-anchor', 'middle').attr('font-size', FONT - 2).attr('fill', MUTED).text(TYPES[t]);
  }
  const dots = pool.map((u) => g.append('circle').attr('cx', PX0 + (u.i + 0.5) * step).attr('cy', yPool).attr('r', rOf(u)).attr('stroke-width', 1.2));

  // Raster of one second of spikes, one row per unit.
  g.append('text').attr('x', RX0).attr('y', RY0 - 26).attr('font-size', FONT - 1).attr('fill', INK).text(L.raster || 'Spikes in one second');
  const raster = g.append('g');
  const xr = scaleLinear().domain([0, 1]).range([RX0, RX1]);
  rangeAxisBottom(g, xr, [0, 1], RY1 + 6, (v) => v, 's');

  // Force against share of pool recruited.
  const CX0 = 452;
  const CX1 = 596;
  const CY0 = RY0;
  const CY1 = RY1;
  const xc = scaleLinear().domain([0, 100]).range([CX0, CX1]);
  const yc = scaleLinear().domain([0, 100]).range([CY1, CY0]);
  g.append('text').attr('x', CX0 - 40).attr('y', RY0 - 26).attr('font-size', FONT - 1).attr('fill', INK).text(L.curve || 'Force against units recruited');
  rangeAxisBottom(g, xc, [0, 50, 100], CY1 + 6, (v) => v);
  g.append('text').attr('x', (CX0 + CX1) / 2).attr('y', CY1 + 34).attr('text-anchor', 'middle').attr('font-size', FONT - 1).attr('fill', MUTED).text(L.curveX || '% of pool recruited');
  rangeAxisLeft(g, yc, [0, 50, 100], CX0 - 6, (v) => v, L.curveY || '% MVC');
  // The curve: force when exactly k units are recruited (each at its
  // recruitment rate, the drive just reaching unit k).
  const curve = pool.map((u) => {
    const s = poolState(pool, u.threshold + 1e-6);
    return [((u.i + 1) / n) * 100, s.force * 100];
  });
  g.append('path').attr('d', `M${xc(0)},${yc(0)}L${curve.map(([a, b]) => `${xc(a).toFixed(1)},${yc(b).toFixed(1)}`).join('L')}`).attr('fill', 'none').attr('stroke', MUTED).attr('stroke-width', 1.3);
  const marker = g.append('circle').attr('r', 4).attr('fill', ACCENT);
  const markerLabel = halo(g.append('text').attr('font-size', FONT - 1).attr('fill', ACCENT).attr('font-weight', 600));

  function update(target) {
    const drive = driveFor(pool, target / 100);
    const st = poolState(pool, drive);
    st.units.forEach((u, k) => {
      const on = u.rate > 0;
      dots[k].attr('fill', on ? ACCENT : 'var(--c-surface)').attr('stroke', on ? ACCENT : MUTED).attr('fill-opacity', on ? 0.35 + 0.65 * (u.rate / u.maxRate) : 1);
    });
    raster.selectAll('*').remove();
    st.units.forEach((u, k) => {
      const yy = RY0 + k * rowH + rowH / 2;
      raster.append('line').attr('x1', RX0).attr('x2', RX1).attr('y1', yy).attr('y2', yy).attr('stroke', BORDER).attr('stroke-width', 0.5);
      for (const t of spikeTrain(u.rate, 1)) {
        raster.append('line').attr('x1', xr(t)).attr('x2', xr(t)).attr('y1', yy - rowH / 2 + 1).attr('y2', yy + rowH / 2 - 1).attr('stroke', ACCENT).attr('stroke-width', 1.2);
      }
    });
    const active = st.units.filter((u) => u.rate > 0);
    const share = (active.length / n) * 100;
    marker.attr('cx', xc(share)).attr('cy', yc(st.force * 100));
    markerLabel.attr('x', xc(share) - 8).attr('y', yc(st.force * 100) - 9).attr('text-anchor', 'end').text(`${Math.round(st.force * 100)} %`);
    return { st, active, share };
  }
  return { update };
}

export const recruitmentDemo = {
  fallback(props) {
    const holder = document.createElement('div');
    draw(holder, props, makePool(props.units || 24)).update(props.initial ?? 20);
    return holder.innerHTML;
  },

  mount(container, props) {
    const L = props.labels || {};
    const TYPES = L.types || { S: 'Slow', FR: 'Fast fatigue-resistant', FF: 'Fast fatigable' };
    const pool = makePool(props.units || 24);
    const plot = el('div', { class: 'plot' });
    const c = draw(plot, props, pool);
    let target = props.initial ?? 20;
    const info = readout([[L.recruited || 'Units recruited'], [L.types_ || 'By type'], [L.rate || 'Firing rates']]);
    function refresh() {
      const { active, share } = c.update(target);
      info.set(0, `${active.length} of ${pool.length} (${Math.round(share)} %)`);
      const by = ['S', 'FR', 'FF'].map((t) => `${TYPES[t]} ${active.filter((u) => u.type === t).length}/${pool.filter((u) => u.type === t).length}`);
      info.set(1, by.join(', '));
      if (active.length) {
        const rates = active.map((u) => u.rate);
        info.set(2, `${Math.round(Math.min(...rates))} to ${Math.round(Math.max(...rates))} ${L.perSecond || 'spikes/s'}`);
      } else info.set(2, '0');
    }
    const slider = sliderRow(L.force || 'Force asked for', { min: 0, max: 100, step: 1, value: target, unit: '% MVC' }, (v) => { target = v; refresh(); });
    container.replaceChildren(plot, el('div', { class: 'widget-controls' }, [slider]), info.node);
    refresh();
  },
};
