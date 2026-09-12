// Hodgkin-Huxley membrane model (squid giant axon parameters, rest at
// -65 mV, ENa = +50, EK = -77) used by the action potential scrubber,
// the voltage clamp demo and the waveform figure. Rate constants are
// scaled by phi so the spike lasts about 2 ms, as on the slides.
//
// Units: mV, ms, mS/cm2, uA/cm2.

export const HH = {
  gNaMax: 120,
  gKMax: 36,
  gL: 0.3,
  ENa: 50,
  EK: -77,
  EL: -54.4,
  C: 1,
  rest: -65,
  phi: 2.2, // rate scaling; 1 is the original 6.3 C model
};

const safe = (x, eps = 1e-6) => (Math.abs(x) < eps ? eps : x);

export function rates(v) {
  const am = (0.1 * (v + 40)) / safe(1 - Math.exp(-(v + 40) / 10));
  const bm = 4 * Math.exp(-(v + 65) / 18);
  const ah = 0.07 * Math.exp(-(v + 65) / 20);
  const bh = 1 / (1 + Math.exp(-(v + 35) / 10));
  const an = (0.01 * (v + 55)) / safe(1 - Math.exp(-(v + 55) / 10));
  const bn = 0.125 * Math.exp(-(v + 65) / 80);
  return { am, bm, ah, bh, an, bn };
}

export function steadyState(v) {
  const r = rates(v);
  return {
    m: r.am / (r.am + r.bm),
    h: r.ah / (r.ah + r.bh),
    n: r.an / (r.an + r.bn),
    tm: 1 / (HH.phi * (r.am + r.bm)),
    th: 1 / (HH.phi * (r.ah + r.bh)),
    tn: 1 / (HH.phi * (r.an + r.bn)),
  };
}

// Current clamp: inject a rectangular current pulse and integrate.
// Returns samples { t, v, m, h, n, gNa, gK, iNa, iK } every `every` ms.
export function simulateCurrentClamp({ total = 7, dt = 0.005, every = 0.02, stim = { start: 0.8, duration: 0.4, amplitude: 40 } } = {}) {
  let v = HH.rest;
  let { m, h, n } = steadyState(v);
  const out = [];
  const steps = Math.round(total / dt);
  const keep = Math.round(every / dt);
  for (let i = 0; i <= steps; i += 1) {
    const t = i * dt;
    const gNa = HH.gNaMax * m ** 3 * h;
    const gK = HH.gKMax * n ** 4;
    const iNa = gNa * (v - HH.ENa);
    const iK = gK * (v - HH.EK);
    const iL = HH.gL * (v - HH.EL);
    if (i % keep === 0) out.push({ t, v, m, h, n, gNa, gK, iNa, iK });
    const iStim = t >= stim.start && t < stim.start + stim.duration ? stim.amplitude : 0;
    const r = rates(v);
    const dv = (-(iNa + iK + iL) + iStim) / HH.C;
    m += dt * HH.phi * (r.am * (1 - m) - r.bm * m);
    h += dt * HH.phi * (r.ah * (1 - h) - r.bh * h);
    n += dt * HH.phi * (r.an * (1 - n) - r.bn * n);
    v += dt * dv;
  }
  return out;
}

// Voltage clamp: hold at `hold`, step to `command` at t = start for
// `duration` ms. Gating variables relax exponentially at the clamped
// voltage, so the currents can be written down directly.
export function simulateVoltageClamp({ hold = -65, command = 0, start = 1, duration = 6, total = 8, every = 0.02 } = {}) {
  const s0 = steadyState(hold);
  const s1 = steadyState(command);
  const out = [];
  for (let t = 0; t <= total + 1e-9; t += every) {
    let v = hold;
    let m = s0.m;
    let h = s0.h;
    let n = s0.n;
    if (t >= start && t < start + duration) {
      v = command;
      const dtc = t - start;
      m = s1.m + (s0.m - s1.m) * Math.exp(-dtc / s1.tm);
      h = s1.h + (s0.h - s1.h) * Math.exp(-dtc / s1.th);
      n = s1.n + (s0.n - s1.n) * Math.exp(-dtc / s1.tn);
    } else if (t >= start + duration) {
      // after the step: relax back from the end-of-step values
      const dtc = t - start - duration;
      const mEnd = s1.m + (s0.m - s1.m) * Math.exp(-duration / s1.tm);
      const hEnd = s1.h + (s0.h - s1.h) * Math.exp(-duration / s1.th);
      const nEnd = s1.n + (s0.n - s1.n) * Math.exp(-duration / s1.tn);
      m = s0.m + (mEnd - s0.m) * Math.exp(-dtc / s0.tm);
      h = s0.h + (hEnd - s0.h) * Math.exp(-dtc / s0.th);
      n = s0.n + (nEnd - s0.n) * Math.exp(-dtc / s0.tn);
    }
    const gNa = HH.gNaMax * m ** 3 * h;
    const gK = HH.gKMax * n ** 4;
    out.push({ t, v, m, h, n, gNa, gK, iNa: gNa * (v - HH.ENa), iK: gK * (v - HH.EK) });
  }
  return out;
}
