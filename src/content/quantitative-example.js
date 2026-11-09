// Renderer fixtures only, not course questions or an official practice exam.
const verified = (value, unit, relation, inputs, displayScale = 1, tolerance = 1e-6) => ({ value, unit, tolerance, verification: { relation, inputs, displayScale } });
export const exampleFormula = {
  interactiveTex: '\\htmlClass{formula-term-0}{V}=\\htmlClass{formula-term-1}{I}\\htmlClass{formula-term-2}{R}',
  id: 'example-ohm', name: 'Ohm law explorer fixture', tex: 'V=IR',
  tokens: [{ symbol: 0 }, { tex: '=' }, { symbol: 1 }, { symbol: 2 }],
  symbols: [
    { tex: 'V', name: 'Voltage difference', unit: 'V', meaning: 'Potential difference across the resistor.' },
    { tex: 'I', name: 'Current', unit: 'A', meaning: 'Charge passing per time.' },
    { tex: 'R', name: 'Resistance', unit: 'ohm', meaning: 'Voltage divided by current.' },
  ],
  reads: 'At a fixed resistance the voltage drop grows with current.', assumes: 'A linear resistor with a consistent direction convention.',
  variants: [{ tex: 'I=V/R', note: 'Rearrange to find current.' }],
  interactive: { relation: 'product', substitution: 'V=({{a}}\\,\\text{A})({{b}}\\,\\Omega)', inputs: [{ key: 'a', label: 'Current', unit: 'A', min: 1, max: 5, step: 1, value: 2 }, { key: 'b', label: 'Resistance', unit: 'ohm', min: 1, max: 10, step: 1, value: 3 }], outputLabel: 'Voltage', unit: 'V' },
  drill: { prompt: 'A resistor carries $2\\,\\text{nA}$ and has resistance $3\\,\\text{M}\\Omega$. Find the voltage drop.',
    answer: verified(6, 'mV', 'product', { a: 2e-9, b: 3e6 }, 1e-3), tex: 'V=(2\\,\\text{nA})(3\\,\\text{M}\\Omega)=6\\,\\text{mV}',
    error: 'Check the prefix conversion from current times resistance to voltage.', modelAnswer: ['Multiply current by resistance, keeping units consistent.'] },
};
export const exampleCalculation = {
  id: 'quantitative-stages', type: 'multiStepCalc', difficulty: 'medium',
  prompt: 'Renderer fixture: a linear resistor carries $2\\,\\text{nA}$ and has resistance $3\\,\\text{M}\\Omega$. Select the relation, enter SI operands and calculate the voltage.',
  hints: [{ body: 'This is a linear-resistor problem. Use $V=IR$.' }, { body: 'Start with $I=2\\times10^{-9}\\,\\text{A}$. Convert the resistance, then multiply and express the voltage in the requested unit.' }],
  stages: [
    { title: 'Select the relation', choices: [{ label: 'V = I R' }, { label: 'V = I / R' }], correct: 0, modelAnswer: ['Ohm law gives voltage as current times resistance.'] },
    { title: 'Substitute in SI', tex: 'V=I\\times R', fields: [
      { label: 'Current', answer: verified(2e-9, 'A', 'ratio', { a: 2, b: 1e9 }, 1, 1e-12) },
      { label: 'Resistance', answer: verified(3e6, 'ohm', 'product', { a: 3, b: 1e6 }, 1, 1) },
    ], modelAnswer: ['$I=2\\times10^{-9}\\,\\text{A}$ and $R=3\\times10^6\\,\\Omega$.'] },
    { title: 'Evaluate', answer: verified(6, 'mV', 'product', { a: 2e-9, b: 3e6 }, 1e-3),
      commonErrors: [{ wrongValue: -6, why: 'The chosen voltage-drop direction has positive current through positive resistance.', verification: { relation: 'product', inputs: { a: -2e-9, b: 3e6 }, displayScale: 1e-3 } }],
      modelAnswer: ['$V=0.006\\,\\text{V}=6\\,\\text{mV}$.'] },
  ], modelAnswer: ['Use Ohm law, convert prefixes, multiply, and check the voltage-drop sign.'],
};
export const exampleWritten = {
  id: 'quantitative-written', type: 'written', difficulty: 'medium', prompt: 'Renderer fixture: explain what doubling resistance does to voltage when current is held constant.',
  hints: [{ body: 'Use the proportionality in Ohm law.' }, { body: 'Compare $V_1=IR$ with $V_2=I(2R)$.' }],
  markScheme: [{ text: 'States that current is fixed.' }, { text: 'Concludes that the voltage drop doubles.' }],
  modelAnswer: ['With current held fixed, voltage is proportional to resistance. Doubling resistance doubles the voltage drop.'],
};
export const exampleMocks = [{ id: 'fixture-mock', title: 'Five-question infrastructure fixture', coverage: 'Dummy component checks only. This is not an NBE-E4120 mock exam.', questions: [
  { ...exampleWritten, id: 'short', prompt: 'Define resistance. State what current measures.' },
  { ...exampleWritten, id: 'explain' },
  { ...exampleCalculation, id: 'calculation-a' },
  { ...exampleCalculation, id: 'calculation-b' },
  { ...exampleWritten, id: 'methods', prompt: 'Which electrical quantity does an ideal voltmeter measure?' },
] }];
