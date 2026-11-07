// Explicit units and dimensions. No eval, guessed units or string-equality algebra.
const groups = {
  voltage: { V: 1, mV: 1e-3, uV: 1e-6 },
  current: { A: 1, mA: 1e-3, uA: 1e-6, nA: 1e-9, pA: 1e-12 },
  resistance: { ohm: 1, kohm: 1e3, Mohm: 1e6, Gohm: 1e9 },
  conductance: { S: 1, mS: 1e-3, uS: 1e-6, nS: 1e-9, pS: 1e-12 },
  capacitance: { F: 1, uF: 1e-6, nF: 1e-9, pF: 1e-12, fF: 1e-15 },
  charge: { C: 1, nC: 1e-9, pC: 1e-12, fC: 1e-15 },
  time: { s: 1, ms: 1e-3, us: 1e-6 },
  frequency: { Hz: 1, kHz: 1e3 },
  concentration: { M: 1e3, mM: 1, uM: 1e-3 },
  area: { m2: 1, cm2: 1e-4, um2: 1e-12 },
  scalar: { '': 1 },
};
const normalise = (s) => String(s).trim().replace(/[µμ]/g, 'u').replace(/Ω/g, 'ohm').replace(/²/g, '2');
const units = new Map(Object.entries(groups).flatMap(([dimension, entries]) => Object.entries(entries).map(([name, scale]) => [name, { dimension, scale }])));
export function parseQuantity(text, targetUnit = '') {
  const match = normalise(text).match(/^([+-]?(?:\d+(?:[.,]\d*)?|[.,]\d+)(?:e[+-]?\d+)?)\s*(.*)$/i);
  if (!match) return { error: 'Enter a finite number, optionally followed by a unit.' };
  const value = Number(match[1].replace(',', '.'));
  const target = units.get(normalise(targetUnit));
  const entered = units.get(match[2] || normalise(targetUnit));
  if (!Number.isFinite(value)) return { error: 'Enter a finite number.' };
  if (!target || !entered || target.dimension !== entered.dimension) return { error: `Use ${targetUnit || 'a dimensionless number'} or an equivalent unit.` };
  return { value: value * entered.scale / target.scale };
}
export function checkQuantity(text, answer) {
  const result = parseQuantity(text, answer.unit);
  if (result.error) return result;
  return { ...result, correct: Math.abs(result.value - answer.value) <= (answer.tolerance ?? 0) + Number.EPSILON * Math.max(1, Math.abs(answer.value)) * 8 };
}

// Declarative calculations shared by sliders and content metadata. Independent
// Python recomputation must use its own implementations, never these results.
export function evaluateRelation(relation, p) {
  switch (relation) {
    case 'product': return p.a * p.b;
    case 'ratio': return p.a / p.b;
    case 'sum': return p.a + p.b;
    case 'parallel': return 1 / (1 / p.a + 1 / p.b);
    case 'divider': return p.v * p.r2 / (p.r1 + p.r2);
    case 'charging': return p.i * p.r * (1 - Math.exp(-p.t / (p.r * p.c)));
    case 'corner': return 1 / (2 * Math.PI * p.tau);
    case 'nernst': return p.shortcut / p.z * Math.log10(p.outside / p.inside);
    default: throw new Error(`Unknown calculation relation: ${relation}`);
  }
}
