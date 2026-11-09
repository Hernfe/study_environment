// Explicit units and dimensions. No eval, guessed units or string-equality algebra.
const groups = {
  voltage: { V: 1, mV: 1e-3, uV: 1e-6 },
  current: { A: 1, mA: 1e-3, uA: 1e-6, nA: 1e-9, pA: 1e-12 },
  resistance: { ohm: 1, kohm: 1e3, Mohm: 1e6, Gohm: 1e9 },
  conductance: { S: 1, mS: 1e-3, uS: 1e-6, nS: 1e-9, pS: 1e-12 },
  capacitance: { F: 1, uF: 1e-6, nF: 1e-9, pF: 1e-12, fF: 1e-15 },
  charge: { C: 1, nC: 1e-9, pC: 1e-12, fC: 1e-15 },
  energy: { J: 1, aJ: 1e-18, zJ: 1e-21 },
  chargeDensity: { 'C/m2': 1, 'nC/cm2': 1e-5, 'uC/cm2': .01 },
  channelDensity: { '1/m2': 1, '1/cm2': 1e4, '1/um2': 1e12 },
  specificConductance: { 'S/m2': 1, 'S/cm2': 1e4, 'pS/um2': 1 },
  time: { s: 1, ms: 1e-3, us: 1e-6 },
  frequency: { Hz: 1, kHz: 1e3 },
  rate: { '1/s': 1, 's^-1': 1, '1/ms': 1e3, 'ms^-1': 1e3 },
  concentration: { M: 1e3, mM: 1, uM: 1e-3, 'mol/m3': 1 },
  temperature: { K: 1 },
  gasConstant: { 'J/mol/K': 1 },
  faraday: { 'C/mol': 1 },
  voltageSlope: { 'V/s': 1, 'mV/ms': 1, 'A/F': 1, 'pA/pF': 1 },
  area: { m2: 1, cm2: 1e-4, um2: 1e-12 },
  flux: { 'mol/m2/s': 1 },
  gradient: { 'mol/m4': 1 },
  field: { 'V/m': 1 },
  diffusion: { 'm2/s': 1 },
  mobility: { 'm2/V/s': 1 },
  permittivity: { 'F/m': 1 },
  specificCapacitance: { 'F/m2': 1, 'uF/cm2': 0.01 },
  currentDensity: { 'A/m2': 1 },
  length: { m: 1, cm: 0.01, mm: 1e-3, um: 1e-6, nm: 1e-9 },
  axialResistance: { 'ohm/m': 1, 'ohm/cm': 100 },
  specificResistance: { 'ohm*m2': 1, 'ohm*cm2': 1e-4, 'kohm*cm2': 0.1 },
  resistivity: { 'ohm*m': 1, 'ohm*cm': 0.01 },
  lineCurrent: { 'A/m': 1, 'nA/mm': 1e-6 },
  voltageGradient: { 'V/m': 1, 'mV/mm': 1 },
  curvature: { 'V/m2': 1 },
  permeability: { 'm/s': 1, 'cm/s': 0.01, 'um/ms': 1e-3, 'mm/ms': 1, 'm/ms': 1e3 },
  scalar: { '': 1 },
};
const normalise = (s) => String(s).trim().replace(/[µμ]/g, 'u').replace(/Ω/g, 'ohm').replace(/²/g, '2').replace(/[·⋅]/g, '*');
const units = new Map(Object.entries(groups).flatMap(([dimension, entries]) => Object.entries(entries).map(([name, scale]) => [name, { dimension, scale }])));
export function parseQuantity(text, targetUnit = '') {
  const match = normalise(text).match(/^([+-]?(?:\d+(?:[.,]\d*)?|[.,]\d+)(?:e[+-]?\d+)?)\s*(.*)$/i);
  if (!match) return { error: 'Enter a finite number, optionally followed by a unit.' };
  const value = Number(match[1].replace(',', '.'));
  const target = units.get(normalise(targetUnit));
  const entered = units.get(match[2] || normalise(targetUnit));
  if (!Number.isFinite(value)) return { error: 'Enter a finite number.' };
  if (!target || !entered || target.dimension !== entered.dimension) return { error: `Use ${targetUnit || 'a dimensionless number'} or an equivalent unit.` };
  const converted = value * (entered.scale / target.scale);
  if (!Number.isFinite(converted)) return { error: 'The converted value must be finite.' };
  return { value: converted };
}
export function checkQuantity(text, answer) {
  const result = parseQuantity(text, answer.unit);
  if (result.error) return result;
  return { ...result, correct: Math.abs(result.value - answer.value) <= (answer.tolerance ?? 0) + Number.EPSILON * Math.max(Math.abs(result.value), Math.abs(answer.value), Number.MIN_VALUE) * 8 };
}

// Declarative calculations shared by sliders and content metadata. Independent
// Python recomputation must use its own implementations, never these results.
export function evaluateRelation(relation, p) {
  switch (relation) {
    case 'hhBalance': {
      if (!(p.capacitance>0) || ![p.im,p.ionic,p.capacitance].every(Number.isFinite)) throw new Error('Finite currents and positive capacitance required.');
      return (p.im-p.ionic)/p.capacitance;
    }
    case 'axialSource': {
      if (!(p.radius>0 && p.rho>0) || ![p.radius,p.rho,p.curvature].every(Number.isFinite)) throw new Error('Positive radius/resistivity and finite curvature required.');
      return p.radius*p.curvature/(2*p.rho);
    }
    case 'boltzmann': {
      if (!(p.thermal>0) || ![p.bias,p.z,p.voltage,p.thermal].every(Number.isFinite)) throw new Error('Finite energy arguments and positive thermal voltage required.');
      const x=p.bias+p.z*p.voltage/p.thermal;
      return x>=0 ? 1/(1+Math.exp(-x)) : Math.exp(x)/(1+Math.exp(x));
    }
    case 'expCharge': {
      if (!(p.tau>0 && p.time>=0) || ![p.current,p.tau,p.time].every(Number.isFinite)) throw new Error('Finite current, positive tau and nonnegative time required.');
      return p.current*p.tau*(-Math.expm1(-p.time/p.tau));
    }
    case 'hhRate': {
      if (!Number.isFinite(p.voltage)) throw new Error('Finite rest-relative voltage required.');
      const u=p.voltage*1000; // SI volts to source rest-relative millivolts.
      const trap=(x)=>Math.abs(x)<1e-7 ? 1-x/2+x*x/12 : x/Math.expm1(x);
      const rates={an:()=>100*trap((10-u)/10),bn:()=>125*Math.exp(-u/80),
        am:()=>1000*trap((25-u)/10),bm:()=>4000*Math.exp(-u/18),
        ah:()=>70*Math.exp(-u/20),bh:()=>1000/(1+Math.exp((30-u)/10))};
      if (!rates[p.gate]) throw new Error('Unknown HH rate.');
      return rates[p.gate](); // per second, source squid fit, no temperature scaling.
    }
    case 'exponentialRate': {
      if (!(p.base>=0 && Number.isFinite(p.exponent))) throw new Error('Nonnegative baseline and finite exponent required.');
      return p.base*Math.exp(p.exponent);
    }
    case 'gateDerivative': {
      if (!(p.alpha>=0 && p.beta>=0 && p.y>=0 && p.y<=1)) throw new Error('Nonnegative rates and a probability in [0,1] required.');
      return p.alpha*(1-p.y)-p.beta*p.y;
    }
    case 'gateSteady': {
      if (!(p.alpha>=0 && p.beta>=0 && p.alpha+p.beta>0)) throw new Error('Nonnegative rates with a positive sum required.');
      return p.alpha/(p.alpha+p.beta);
    }
    case 'gateRelax': {
      if (!(p.y0>=0 && p.y0<=1 && p.steady>=0 && p.steady<=1 && p.time>=0 && p.tau>0)) throw new Error('Valid probabilities, nonnegative time and positive time constant required.');
      return p.y0+(p.steady-p.y0)*(-Math.expm1(-p.time/p.tau));
    }
    case 'gatePower': {
      if (!(p.y>=0 && p.y<=1 && Number.isInteger(p.count) && p.count>0)) throw new Error('Valid probability and positive integer particle count required.');
      return p.y**p.count;
    }
    case 'rallDiameter': {
      if (!p.diameters?.length || p.diameters.some(d=>!(d>0))) throw new Error('Positive stem diameters required.');
      return Math.pow(p.diameters.reduce((s,d)=>s+Math.pow(d,1.5),0),2/3);
    }
    case 'rallConductance': {
      if (!(p.diameter>0 && p.rm>0 && p.ri>0) || (p.length!==undefined && !(p.length>0))) throw new Error('Positive cable parameters required.');
      return Math.PI*Math.pow(p.diameter,1.5)/(2*Math.sqrt(p.ri*p.rm))*(p.length===undefined ? 1 : Math.tanh(p.length));
    }
    case 'sealedLength': {
      if (!(p.fraction>0 && p.fraction<=1)) throw new Error('Remaining fraction must be in (0,1].');
      return Math.acosh(1/p.fraction);
    }
    case 'pathLength': {
      if (!p.segments?.length || p.segments.some(s=>!(s.length>=0 && s.lambda>0))) throw new Error('Nonnegative lengths and positive scales required.');
      return p.segments.reduce((v,s)=>v+s.length/s.lambda,0);
    }
    case 'resistanceRetune': {
      if (!(p.resistance>0 && p.old>0 && p.new>0)) throw new Error('Positive resistance and speeds required.');
      return p.resistance*(p.old/p.new)**2;
    }
    case 'sealedResistance': {
      if (!(p.resistance>0 && p.length>0)) throw new Error('Positive resistance and length required.');
      return p.resistance/Math.tanh(p.length);
    }
    case 'passiveDecay': {
      if (!(p.time>=0 && p.tau>0)) throw new Error('Nonnegative time and positive time constant required.');
      return p.v*Math.exp(-p.time/p.tau);
    }
    case 'infiniteCable': return p.current*p.ri*p.lambda/2*Math.exp(-Math.abs(p.x)/p.lambda);
    case 'annulus': return Math.PI*p.shell*(2*p.radius+p.shell);
    case 'powerRatio': return (p.a/p.b)**p.power;
    case 'passiveSpeed': return 2*p.lambda/p.tau;
    case 'passivePosition': return 2*p.lambda/p.tau*p.time-p.lambda/2;
    case 'cableInput': return p.ri*p.lambda/(p.sides ?? 2);
    case 'finiteCable': {
      if (!(p.length>0) || p.x<0 || p.x>p.length || !(p.load>=0)) throw new Error('Finite cable requires positive length, a position within the cable and nonnegative terminal load.');
      if (p.mode==='open') return p.v*Math.exp(-p.x)*(-Math.expm1(-2*(p.length-p.x)))/(-Math.expm1(-2*p.length));
      const q=(1-p.load)/(1+p.load);
      return p.v*Math.exp(-p.x)*((1+q)+q*Math.expm1(-2*(p.length-p.x)))/((1+q)+q*Math.expm1(-2*p.length));
    }
    case 'endpointCable': {
      if (!(p.length>0) || p.x<0 || p.x>p.length) throw new Error('Endpoint cable requires positive length and an interior position.');
      const ratio=(y)=>Math.exp(y-p.length)*(-Math.expm1(-2*y))/(-Math.expm1(-2*p.length));
      return p.v0*ratio(p.length-p.x)+p.ve*ratio(p.x);
    }
    case 'cableAxial': return p.rho / (Math.PI*p.radius**2);
    case 'cableMembrane': return p.specific / (2*Math.PI*p.radius);
    case 'cableCapacitance': return p.specific * 2*Math.PI*p.radius;
    case 'cableLength': return Math.sqrt(p.rm/(p.ri+(p.ro||0)));
    case 'cableDecay': return p.v*Math.exp(-Math.abs(p.x)/p.lambda);
    case 'cableInverse': return -Math.abs(p.x)/Math.log(p.fraction);
    case 'cableEvolution': return (p.lambda**2*p.curvature-p.v+(p.rm||0)*(p.injection||0))/p.tau;
    case 'ghkVoltage': return p.shortcut * Math.log10((p.pk*p.ko+p.pna*p.nao+p.pcl*p.cli)/(p.pk*p.ki+p.pna*p.nai+p.pcl*p.clo));
    case 'weightedVoltage': return (p.gk*p.ek+p.gna*p.ena+p.gcl*p.ecl)/(p.gk+p.gna+p.gcl);
    case 'nernstRatio': return 10 ** (p.delta/p.shortcut);
    case 'sphereArea': return 4*Math.PI*p.radius**2;
    case 'ghkCurrent': {
      const x=p.z*p.f*p.v/(p.r*p.temperature);
      if (x===0) return p.permeability*p.z*p.f*(p.inside-p.outside);
      // Reverse the exponential for negative x to avoid Infinity/Infinity.
      const flux=x>0 ? x*(p.inside-p.outside*Math.exp(-x))/(-Math.expm1(-x)) : x*(p.inside*Math.exp(x)-p.outside)/Math.expm1(x);
      return p.permeability*p.z*p.f*flux;
    }
    case 'product': return p.a * p.b;
    case 'ratio': return p.a / p.b;
    case 'sum': return p.a + p.b;
    case 'parallel': return 1 / (1 / p.a + 1 / p.b);
    case 'divider': return p.v * p.r2 / (p.r1 + p.r2);
    case 'charging': return p.i * p.r * (1 - Math.exp(-p.t / (p.r * p.c)));
    case 'corner': return 1 / (2 * Math.PI * p.tau);
    case 'geometry': return p.epsilon * p.area / p.distance;
    case 'diffusion': return -p.d * p.gradient;
    case 'drift': return -p.mobility * p.z * p.concentration * p.field;
    case 'einstein': return p.mobility * p.r * p.temperature / p.f;
    case 'electrodiffusion': return -p.mobility * (p.r * p.temperature / p.f * p.gradient + p.z * p.concentration * p.field);
    case 'fluxCurrent': return p.flux * p.z * p.f;
    case 'donnan': return p.fixed * p.salt / (4 * p.salt + p.fixed);
    case 'nernst': return p.shortcut / p.z * Math.log10(p.outside / p.inside);
    default: throw new Error(`Unknown calculation relation: ${relation}`);
  }
}
