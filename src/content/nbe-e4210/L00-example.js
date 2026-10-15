// Dummy lecture that exercises every section and question type so the
// renderer can be tested. Not course content. Shown only in dev.

import { exampleCell } from './figures/example-cell.js';

// Pictures for the question types added after Mini Exams 3 and 4. The
// pathway picture is the L04 slide crop (Figure 10.3), reused here only
// to test the renderer.
const hemifieldsUrl = new URL('../../assets/figures/nbe-e4210/L04/hemifields.webp', import.meta.url).href;

// Candidate lesion sites on Figure 10.3, unlabelled in the question.
// Authored out of pathway order so the numbers give nothing away.
const LESION_SITES = [
  { id: 'chiasm', label: 'Optic chiasm', x: 72, y: 84, w: 6, h: 6, side: 'right' },
  { id: 'tract-l', label: 'Left optic tract', x: 66, y: 93, w: 5, h: 6, side: 'left' },
  { id: 'nerve-r', label: 'Right optic nerve', x: 76.5, y: 75, w: 4, h: 7, side: 'right' },
  { id: 'nerve-l', label: 'Left optic nerve', x: 57, y: 80, w: 6, h: 5, side: 'left' },
  { id: 'tract-r', label: 'Right optic tract', x: 84, y: 86.5, w: 6, h: 5, side: 'right' },
];

const lesionSite = {
  src: hemifieldsUrl,
  alt: 'The two visual hemifields above two eyes; the optic nerves meet at the chiasm and leave as two optic tracts. Five numbered markers sit on the nerves, the chiasm and the tracts.',
  aspect: 959 / 751,
  regions: LESION_SITES,
};

// The visual field of each eye, split at the vertical meridian. Each
// half is a region the student can shade.
const FIELD_SVG = `<svg viewBox="0 0 400 190" xmlns="http://www.w3.org/2000/svg">
  <style>.vf-half { fill: var(--c-surface); stroke: currentColor; stroke-width: 1.5; } .vf-text { fill: currentColor; font: 17px sans-serif; }</style>
  <path class="vf-half" data-region="le-left" d="M100 20 A70 70 0 0 0 100 160 Z"/>
  <path class="vf-half" data-region="le-right" d="M100 20 A70 70 0 0 1 100 160 Z"/>
  <path class="vf-half" data-region="re-left" d="M300 20 A70 70 0 0 0 300 160 Z"/>
  <path class="vf-half" data-region="re-right" d="M300 20 A70 70 0 0 1 300 160 Z"/>
  <text class="vf-text" x="100" y="182" text-anchor="middle">Left eye</text>
  <text class="vf-text" x="300" y="182" text-anchor="middle">Right eye</text>
</svg>`;

const fieldHalves = {
  svg: FIELD_SVG,
  alt: 'Two circles, the visual field of the left eye and of the right eye, each split by a vertical line into a left and a right half.',
  aspect: 400 / 190,
  showShapes: false,
  regions: [
    { id: 'le-left', label: 'Left eye, left half of the field', shape: 'rect', x: 16.25, y: 47.4, w: 17.5, h: 73.7, side: 'left' },
    { id: 'le-right', label: 'Left eye, right half of the field', shape: 'rect', x: 33.75, y: 47.4, w: 17.5, h: 73.7, side: 'left' },
    { id: 're-left', label: 'Right eye, left half of the field', shape: 'rect', x: 66.25, y: 47.4, w: 17.5, h: 73.7, side: 'right' },
    { id: 're-right', label: 'Right eye, right half of the field', shape: 'rect', x: 83.75, y: 47.4, w: 17.5, h: 73.7, side: 'right' },
  ],
};

// A patch of retina with a center-surround field; `lit` says which part
// is lit (Mini Exam 4, Problem 7).
function fieldPatch(lit) {
  const on = '#f2d43c';
  const off = '#c9d8e6';
  const ground = lit === 'surround' || lit === 'all' ? on : off;
  const centre = lit === 'center' || lit === 'all' ? on : off;
  return `<svg viewBox="0 0 160 90" xmlns="http://www.w3.org/2000/svg">
  <rect x="4" y="4" width="152" height="82" rx="4" fill="${ground}" stroke="currentColor"/>
  <ellipse cx="80" cy="45" rx="58" ry="32" fill="none" stroke="currentColor"/>
  <ellipse cx="80" cy="45" rx="22" ry="12" fill="${centre}" stroke="currentColor"/>
</svg>`;
}

// A spike train: one tick per spike over a fixed window.
function spikeTrain(times) {
  const ticks = times.map((t) => `<line x1="${t}" y1="8" x2="${t}" y2="30" stroke="currentColor" stroke-width="1.5"/>`).join('');
  return `<svg viewBox="0 0 160 36" xmlns="http://www.w3.org/2000/svg">
  <line x1="4" y1="30" x2="156" y2="30" stroke="currentColor"/>${ticks}
</svg>`;
}

const range = (from, to, step) => Array.from({ length: Math.floor((to - from) / step) + 1 }, (_, i) => from + i * step);
const svgFigure = (markup, fallbackAlt) => ({ type: 'svg', markup, fallbackAlt });

export default {
  meta: {
    id: 'L00',
    number: 0,
    title: 'Renderer test lecture',
    chapters: [],
    pages: [{ chapter: 0, from: 1, to: 2 }],
    lectureDate: '2026-09-01',
    examDate: '2026-12-31',
  },

  objectives: [
    'See every section type render: paragraph array, HTML string, static SVG, interactive widget.',
    'See every question type render: multiple choice, true or false (single and several statements), fill in the blank (typed and word bank), classify, clinical case, interpret, essay, label (with and without a word bank), order, calculation, match pairs (text and figures), group items, diagram annotate, and weighted sub-items.',
    'See maths render through KaTeX, inline and as a block.',
    'Confirm progress is stored and that review pulls missed questions first.',
  ],

  prerequisites: [
    { text: 'Nothing. This is a test page.' },
    { text: 'A link to another lecture section renders like this.', lectureId: 'L01', sectionId: 'intro' },
  ],

  sections: [
    {
      id: 'toy-cell',
      title: 'A toy cell (static figure, paragraph array)',
      body: [
        'This block tests a body given as an array of plain paragraphs. The toy cell has a membrane, a channel and a pump. The channel lets one kind of particle move down its gradient.',
        'The pump moves particles against their gradient and uses energy to do it. Key terms in this text are marked automatically from the keyTerms list, first occurrence only.',
        'A third paragraph checks spacing between paragraphs and that a term like pump is not marked twice.',
      ],
      keyTerms: ['membrane', 'channel', 'pump', 'gradient'],
      visual: {
        type: 'svg',
        name: 'example-cell',
        props: { labels: true },
        caption: 'The toy cell. The channel (top) lets particles flow in; the pump (right) moves them out.',
        fallbackAlt: 'Schematic cell: a rounded rectangle with a nucleus, a channel in the top membrane with an arrow pointing in, and a pump in the right membrane with arrows both ways.',
      },
      conceptQuiz: [
        {
          id: 'toy-cell-1',
          prompt: 'Which structure moves particles against their gradient?',
          options: [
            { text: 'The ion channel', feedback: 'Channels only allow movement down a gradient.' },
            { text: 'The active pump', feedback: 'Correct. Pumps use energy to move particles uphill.' },
            { text: 'The lipid bilayer', feedback: 'The membrane is the barrier, not the transporter.' },
          ],
          correct: 1,
        },
        {
          id: 'toy-cell-2',
          prompt: 'What does the channel need in order to move particles?',
          options: [
            { text: 'A concentration gradient', feedback: 'Correct. Flow through a channel is passive.' },
            { text: 'Energy from ATP hydrolysis', feedback: 'That is the pump. Channels are passive.' },
            { text: 'A signal from the nucleus', feedback: 'The nucleus has nothing to do with transport across the membrane.' },
          ],
          correct: 0,
        },
      ],
    },
    {
      id: 'toy-curve',
      title: 'A toy curve (widget, HTML string body)',
      body:
        '<p>This block tests a body given as one HTML string, and an interactive widget. Move the slider to change the <dfn>gain</dfn> and watch the curve change. A hand-written dfn like the one just used is left alone by the auto-marker.</p><p>The equation plotted is $y = g\\,x\\,e^{-x/\\tau}$. It has no meaning here; it just shows a peak that moves.</p>',
      keyTerms: ['gain', 'tau'],
      visual: {
        type: 'widget',
        name: 'slider-plot',
        props: {
          xLabel: 'x (ms)',
          yLabel: 'y',
          xMin: 0,
          xMax: 20,
          yMin: -2,
          yMax: 10,
          params: [
            { key: 'gain', label: 'gain', min: 0, max: 5, step: 0.1, value: 2, unit: '' },
            { key: 'tau', label: 'tau', min: 1, max: 10, step: 0.5, value: 3, unit: 'ms' },
          ],
          compute: (x, p) => p.gain * x * Math.exp(-x / p.tau),
          readout: (p) => `Peak at x = ${p.tau} ms, height ${(p.gain * p.tau * Math.exp(-1)).toFixed(2)}.`,
        },
        caption: '$y = g\\,x\\,e^{-x/\\tau}$. The peak sits at $x = \\tau$.',
        fallbackAlt: 'A curve that rises quickly from zero to a peak and then decays slowly back toward zero.',
      },
      conceptQuiz: [
        {
          id: 'toy-curve-1',
          prompt: 'If tau doubles, where does the peak move?',
          options: [
            { text: 'To twice the x value', feedback: 'Correct. The peak is at x = tau.' },
            { text: 'It does not move, only the height changes', feedback: 'Height changes too, but the position is set by tau.' },
            { text: 'To half the x value', feedback: 'Larger tau means a slower decay, so the peak moves right, not left.' },
          ],
          correct: 0,
        },
      ],
    },
    {
      id: 'toy-maths',
      title: 'Maths (math block, inline maths)',
      keyTerms: ['time constant'],
      blocks: [
        { type: 'text', body: 'Inline maths sits between dollar signs: the peak of the toy curve is at $x = \\tau$, and its height is $y_{\\text{peak}} = g\\,\\tau / e$. Units go through KaTeX too, so a potential is written $-65\\,\\text{mV}$ and a small one $50\\,\\mu\\text{V}$. A literal dollar sign is written \\$5.' },
        { type: 'math', title: 'Toy curve', items: [
          { tex: 'y = g\\,x\\,e^{-x/\\tau}', label: 'The toy curve. $g$ is the gain, $\\tau$ the time constant.' },
          { tex: 'y_{\\text{peak}} = \\frac{g\\,\\tau}{e}', label: 'Height of the peak, reached at $x = \\tau$.' },
        ] },
      ],
      conceptQuiz: [
        {
          id: 'toy-maths-1',
          prompt: 'Where is the peak of $y = g\\,x\\,e^{-x/\\tau}$?',
          options: [
            { text: 'At $x = \\tau$', feedback: 'Correct. The derivative is zero there.' },
            { text: 'At $x = g$', feedback: 'The gain scales the height, not the position.' },
            { text: 'At $x = g\\,\\tau$', feedback: 'The gain does not enter the position of the peak.' },
          ],
          correct: 0,
        },
      ],
    },
    {
      id: 'no-visual',
      title: 'A block with no visual',
      body: ['This block has visual set to null and no concept quiz. It checks that both are optional in the renderer.'],
      keyTerms: [],
      visual: null,
      conceptQuiz: [],
    },
  ],

  recap: {
    terms: [
      { term: 'Membrane', definition: 'The barrier around the toy cell.' },
      { term: 'Channel', definition: 'Passive pore. Particles move down their gradient.' },
      { term: 'Pump', definition: 'Active transporter. Uses energy to move particles up their gradient.' },
      { term: 'Gain', definition: 'Scales the height of the toy curve.' },
      { term: 'Tau', definition: 'Sets the position of the peak of the toy curve.' },
    ],
    equations: [
      {
        name: 'Toy curve',
        tex: 'y = g\\,x\\,e^{-x/\\tau}, \\qquad y_{\\text{peak}} = g\\,\\tau / e \\text{ at } x = \\tau',
        note: 'Peak position is set by $\\tau$ alone; $g$ only scales the height.',
      },
    ],
  },

  lectureQuiz: [
    {
      id: 'q01',
      difficulty: 'easy',
      type: 'mc',
      prompt: 'Which structure lets particles move passively down their gradient?',
      options: [
        { text: 'Pump', feedback: 'Pumps are active and move particles uphill.' },
        { text: 'Channel', feedback: 'Correct. Channels are passive pores.' },
        { text: 'Nucleus', feedback: 'The nucleus is inside the cell and does not transport particles.' },
        { text: 'Membrane', feedback: 'The membrane is the barrier itself.' },
      ],
      correct: 1,
      modelAnswer: [
        'The channel is a pore through the membrane.',
        'Particles move through it from high to low concentration with no energy input.',
      ],
    },
    {
      id: 'q02',
      difficulty: 'easy',
      type: 'label',
      prompt: 'Label the numbered parts of the toy cell.',
      figure: {
        type: 'svg',
        name: 'example-cell',
        props: { labels: false },
        fallbackAlt: 'The toy cell with three numbered markers on the channel, the nucleus and the pump.',
      },
      regions: [
        { id: 'r1', x: 34, y: 13, label: 'Channel', explanation: 'The two bars in the top membrane with an arrow through them.' },
        { id: 'r2', x: 50, y: 50, label: 'Nucleus', explanation: 'The circle in the middle of the cell.' },
        { id: 'r3', x: 85, y: 50, label: 'Pump', explanation: 'The box in the right membrane with arrows both ways.' },
      ],
      labels: ['Channel', 'Nucleus', 'Pump', 'Ribosome', 'Vesicle'],
      wordBank: ['Channel', 'Pump', 'Membrane', 'Nucleus'],
      modelAnswer: [
        '1 is the channel in the top membrane.',
        '2 is the nucleus.',
        '3 is the pump in the right membrane.',
      ],
    },
    {
      id: 'q07',
      difficulty: 'easy',
      type: 'trueFalse',
      prompt: 'True or false: the channel in the toy cell needs energy to move particles.',
      answer: false,
      justification: 'A channel is passive; particles move through it down their gradient. Only the pump uses energy.',
      modelAnswer: ['False. Channels are passive pores, so flow through them needs a gradient, not energy.'],
    },
    {
      id: 'q08',
      difficulty: 'easy',
      type: 'fillBlank',
      prompt: 'Fill in the blanks.',
      text: 'The structure that moves particles against their gradient is the ___, and it takes its energy from ___.',
      blanks: [
        { accept: ['pump', 'the pump', 'ion pump'] },
        { accept: ['ATP', 'ATP hydrolysis', 'adenosine triphosphate'] },
      ],
      modelAnswer: ['The pump moves particles uphill.', 'It uses energy from ATP hydrolysis.'],
    },
    {
      id: 'q12',
      difficulty: 'easy',
      type: 'classify',
      prompt: 'For each statement, classify it as describing primarily the Channel / Pump / Nucleus / Membrane.',
      categories: ['Channel', 'Pump', 'Nucleus', 'Membrane'],
      items: [
        { text: 'A structure lets particles cross passively, always down their gradient.', answer: 'Channel', explanation: 'Passive crossing is the job of the channel.' },
        { text: 'Blocking a structure leaves the membrane intact, but the gradient slowly runs down to zero.', answer: 'Pump', explanation: 'Only the pump rebuilds the gradient.' },
        { text: 'A structure uses energy to move particles against their gradient.', answer: 'Pump', explanation: 'Uphill transport needs the pump and ATP.' },
        { text: 'A structure separates inside from outside and holds the other transport structures.', answer: 'Membrane', explanation: 'The channel and pump sit in the membrane.' },
      ],
      modelAnswer: ['a) Channel, passive.', 'b) Pump, since without it nothing restores the gradient.', 'c) Pump, active transport.', 'd) Membrane, the barrier.'],
    },
    {
      id: 'q13',
      difficulty: 'easy',
      type: 'classify',
      prompt: 'Complete each statement with the correct direction in the toy cell figure.',
      categories: ['above', 'below', 'left of', 'right of'],
      categoriesTitle: 'Choices',
      items: [
        { text: 'The channel is ___ the nucleus.', answer: 'above' },
        { text: 'The pump is ___ the nucleus.', answer: 'right of' },
        { text: 'The nucleus is ___ the channel.', answer: 'below' },
        { text: 'The channel is ___ the pump.', answer: 'left of' },
      ],
      modelAnswer: ['The channel sits in the top membrane, the pump in the right membrane, the nucleus in the middle.'],
    },
    {
      id: 'q14',
      difficulty: 'easy',
      type: 'fillBlank',
      prompt: 'Complete the sentence from the word bank.',
      text: 'Particles move through the ___ without energy; the ___ moves them back using ___.',
      blanks: [{ accept: ['channel'] }, { accept: ['pump'] }, { accept: ['ATP'] }],
      wordBank: ['channel', 'pump', 'nucleus', { text: 'ATP', reusable: true }],
      modelAnswer: ['Channel, passive. Pump, active, powered by ATP.'],
    },
    {
      id: 'q17',
      difficulty: 'easy',
      type: 'inlineChoice',
      prompt: 'Circle the right answer in each bracket.',
      sentences: [
        {
          text: 'Particles cross the toy membrane passively through the ___, which moves them ___ their gradient.',
          choices: [
            { options: ['pump', 'channel', 'nucleus'], answer: 1 },
            { options: ['down', 'up'], answer: 0 },
          ],
          explanation: 'A channel is a passive pore, so flow runs downhill.',
        },
        {
          text: 'The pump takes its energy from ___ and moves particles ___ the cell.',
          choices: [
            { options: ['the gradient', 'ATP', 'the channel'], answer: 1 },
            { options: ['into', 'out of'], answer: 1 },
          ],
          explanation: 'The pump uses ATP to push particles back out against the gradient.',
        },
        {
          text: 'The pump moves ___ particles per cycle at a rate of about ___ per second.',
          choices: [
            { options: ['$2$', '$3$', '$4$'], answer: 2 },
            { options: ['$10$', '$100$', '$1000$'], answer: 1 },
          ],
          explanation: 'Toy numbers: four particles per cycle, about a hundred cycles a second.',
        },
      ],
      modelAnswer: ['a) channel, down.', 'b) ATP, out of.', 'c) $4$, $100$.'],
    },
    {
      id: 'q03',
      difficulty: 'medium',
      type: 'order',
      prompt: 'Put the steps of filling the toy cell in order.',
      items: [
        'Particles move in through the channel',
        'The pump removes particles again',
        'A gradient exists across the membrane',
        'The inside concentration rises',
      ],
      correctOrder: [2, 0, 3, 1],
      modelAnswer: [
        'A gradient must exist first, otherwise nothing moves.',
        'The channel lets particles move in down that gradient.',
        'The inside concentration therefore rises.',
        'The pump then moves particles back out, using energy.',
      ],
    },
    {
      id: 'q15',
      difficulty: 'medium',
      type: 'label',
      prompt: 'Identify the three structures indicated in the figure.',
      hotspots: {
        svg: exampleCell({ labels: false }),
        alt: 'The toy cell with three numbered markers.',
        aspect: 400 / 240,
        gutter: 'sides',
        regions: [
          { id: 'ch', label: 'Channel', body: 'Two bars in the top membrane with an arrow through them.', x: 34, y: 13, w: 10, h: 14 },
          { id: 'nu', label: 'Nucleus', body: 'The circle in the middle of the cell.', x: 50, y: 50, w: 18, h: 28 },
          { id: 'pu', label: 'Pump', body: 'The box in the right membrane with arrows both ways.', x: 85, y: 50, w: 10, h: 18 },
        ],
      },
      wordBank: ['Nucleus', 'Channel', 'Membrane', 'Pump'],
      modelAnswer: ['1 channel, 2 nucleus, 3 pump. Membrane is the distractor.'],
    },
    {
      id: 'q16',
      difficulty: 'medium',
      type: 'trueFalse',
      prompt: 'Determine whether each statement is true or false. Correct every false statement in one line.',
      statements: [
        { text: 'The channel moves particles down their gradient because it is a passive pore.', answer: true, justification: 'Passive pores only allow downhill flow.' },
        { text: 'The pump and the channel both need ATP to move particles.', answer: false, correction: 'Only the pump needs ATP; the channel is passive.' },
        { text: 'With the pump blocked, the gradient stays constant because the membrane is intact.', answer: false, correction: 'The gradient runs down, because the channel keeps letting particles through.' },
      ],
      modelAnswer: ['a) True.', 'b) False: only the pump uses ATP.', 'c) False: without the pump the gradient runs down.'],
    },
    {
      id: 'q18',
      difficulty: 'medium',
      type: 'multiSelect',
      prompt: 'Which statements about the channel of the toy cell are correct?',
      options: [
        { text: 'It lets particles cross the membrane without using energy.', correct: true, feedback: 'A channel is a passive pore.' },
        { text: 'It moves particles in the direction set by their gradient.', correct: true, feedback: 'Passive flow always runs downhill.' },
        { text: 'It can move particles against their gradient when needed.', correct: false, feedback: 'Only the pump moves particles uphill.' },
        { text: 'Its flow stops once both sides reach the same level.', correct: true, feedback: 'No gradient, no net passive flow.' },
      ],
      modelAnswer: ['a) Correct, passive.', 'b) Correct, downhill.', 'c) Incorrect, that is the pump.', 'd) Correct, net flow needs a gradient.'],
    },
    {
      id: 'q19',
      difficulty: 'medium',
      type: 'multiSelect',
      prompt: 'Suppose the outside concentration of the toy cell is raised four-fold, while the pump keeps working. Mark the correct statements.',
      options: [
        { text: 'Inflow through the channel becomes larger than before.', correct: true, feedback: 'A steeper gradient drives more passive inflow.' },
        { text: 'Inflow through the channel becomes smaller than before.', correct: false, feedback: 'The gradient got steeper, not shallower.' },
        { text: 'The pump now moves particles into the cell as well.', correct: false, feedback: 'The pump always moves particles out.' },
        { text: 'The channel starts to use ATP to cope with the load.', correct: false, feedback: 'A channel never uses energy.' },
      ],
      modelAnswer: ['Raising the outside concentration steepens the gradient.', 'So passive inflow through the channel rises; the pump and channel keep their jobs.'],
    },
    {
      id: 'q20',
      difficulty: 'medium',
      type: 'classify',
      prompt: 'For each phase of filling and emptying the toy cell, give the direction of the dominant particle movement through each structure. Use None where there is little or no movement.',
      categories: ['Into the cell', 'Out of the cell', 'None'],
      categoriesTitle: 'Choices',
      rowHeader: 'Phase',
      columns: ['Channel', 'Pump'],
      items: [
        { text: 'Channel closed, pump off', answers: ['None', 'None'], explanation: 'Nothing is open or running, so nothing moves.' },
        { text: 'Channel open, pump off', answers: ['Into the cell', 'None'], explanation: 'Only passive inflow down the gradient.' },
        { text: 'Channel closed, pump on', answers: ['None', 'Out of the cell'], explanation: 'Only the pump works, pushing particles out.' },
        { text: 'Channel open, pump on', answers: ['Into the cell', 'Out of the cell'], explanation: 'Inflow and pumped outflow run together.' },
      ],
      modelAnswer: ['The channel only ever carries particles in, down the gradient, and only when open.', 'The pump only ever moves them out, and only when running.'],
    },
    {
      id: 'q05',
      difficulty: 'hard',
      type: 'calc',
      prompt: 'For the toy curve with $g = 2$ and $\\tau = 3\\,\\text{ms}$, calculate the height of the peak. Give the answer to two decimals.',
      given: [
        { symbol: 'gain', value: 2, unit: '' },
        { symbol: '$\\tau$', value: 3, unit: 'ms' },
        { symbol: 'e', value: 2.718, unit: '', note: 'base of the natural logarithm' },
      ],
      answer: { value: 2.21, tolerance: 0.02, unit: '' },
      steps: [
        { text: 'The peak of the toy curve is at $x = \\tau$.', tex: 'x_{\\text{peak}} = \\tau = 3\\,\\text{ms}' },
        { text: 'Substitute $x = \\tau$ into the curve.', tex: 'y_{\\text{peak}} = g\\,\\tau\\,e^{-1}' },
        { text: 'Evaluate.', tex: 'y_{\\text{peak}} = 2 \\times 3 \\times 0.3679 = 2.21' },
      ],
      modelAnswer: [
        'Set x = tau because that is where the derivative is zero.',
        '$y_{\\text{peak}} = g\\,\\tau / e = 2 \\times 3 / 2.718 = 2.21$.',
      ],
    },
    {
      id: 'q06',
      difficulty: 'hard',
      type: 'essay',
      beyondExam: true,
      prompt: 'The pump in the toy cell stops working. Explain what happens to the inside concentration over time and why.',
      points: 6,
      markScheme: [
        { points: 1, text: 'Names the pump as the only structure that moves particles out.' },
        { points: 1, text: 'States that the channel keeps letting particles in as long as a gradient exists.' },
        { points: 1, text: 'Explains that without the pump, inflow is no longer balanced by outflow.' },
        { points: 1, text: 'Predicts that the inside concentration rises.' },
        { points: 1, text: 'Explains that the rise slows as the gradient shrinks.' },
        { points: 1, text: 'Applies to the scenario: the inside ends at the same concentration as the outside, so the gradient is gone.' },
      ],
      modelAnswer: [
        'The pump is the only thing moving particles out against the gradient.',
        'The channel is passive, so particles keep entering as long as the outside concentration is higher.',
        'With the pump stopped, inflow through the channel is no longer matched by outflow.',
        'So the inside concentration rises.',
        'As it rises, the gradient shrinks and inflow slows down.',
        'Eventually inside equals outside, the gradient is zero, and net flow stops.',
      ],
    },
    {
      id: 'q09',
      difficulty: 'hard',
      type: 'clinicalCase',
      scenario: 'A toy cell is placed in a solution with a poison. After an hour its inside concentration equals the outside concentration, although its membrane and channel look normal.',
      prompt: 'Which structure did the poison most likely block?',
      options: [
        { text: 'The pump, so nothing moved particles back out against the gradient', feedback: 'Correct. Without the pump the channel runs the gradient down to zero.' },
        { text: 'The channel, so particles could no longer cross the membrane at all', feedback: 'A blocked channel stops the inflow, so the gradient would stay, not vanish.' },
        { text: 'The membrane, so particles leaked across it wherever they could', feedback: 'The case says the membrane looks normal, and a leak alone needs no poison.' },
        { text: 'The nucleus, so the cell stopped making new copies of its channel', feedback: 'Fewer channels would slow the inflow, not equalise the two sides.' },
      ],
      correct: 0,
      modelAnswer: [
        'The finding is a lost gradient: inside equals outside.',
        'A gradient is kept only by the pump, which moves particles back out using energy.',
        'The channel keeps letting particles in as long as there is a gradient.',
        'So if the pump stops, inflow is unopposed and the gradient runs down to zero.',
        'The lesion is the pump.',
      ],
    },
    {
      id: 'q10',
      difficulty: 'hard',
      type: 'clinicalCase',
      scenario: 'A second toy cell keeps a normal gradient, but when the outside concentration is raised no particles enter.',
      prompt: 'Name the structure that is not working.',
      accept: ['channel', 'the channel', 'ion channel'],
      answerLabel: 'Structure:',
      modelAnswer: [
        'Raising the outside concentration steepens the gradient, so passive inflow should rise.',
        'Passive inflow goes through the channel.',
        'No inflow despite a steeper gradient means the channel is closed or blocked.',
        'The pump still works, which is why the gradient is kept.',
      ],
    },
    {
      id: 'q11',
      difficulty: 'hard',
      type: 'interpret',
      prompt: 'The figure shows the toy cell. If the arrow at the top pointed outward instead, which statement would be true?',
      figure: {
        type: 'svg',
        name: 'example-cell',
        props: { labels: true },
        caption: 'The toy cell.',
        fallbackAlt: 'Schematic cell with a channel at the top and a pump on the right.',
      },
      options: [
        { text: 'The inside concentration would now be higher than the outside one', feedback: 'Correct. Passive flow runs down the gradient, so it points to the lower side.' },
        { text: 'The pump would now be pushing the particles into the cell instead', feedback: 'The arrow at the top is the channel, not the pump.' },
        { text: 'The channel would now be using energy to move the particles out', feedback: 'A channel never uses energy, whichever way the flow runs.' },
      ],
      correct: 0,
      modelAnswer: ['Flow through a channel always runs down the gradient.', 'An outward arrow means the inside is now the higher concentration.'],
    },

    // Question types and weights added after Mini Exams 3 and 4.
    {
      id: 'q30',
      difficulty: 'easy',
      type: 'inlineChoice',
      prompt: 'Rods or cones? Circle the photoreceptor that contributes most, and in the last sentence the number of photopigment types. (Weighted as Mini Exam 4, Problem 1: 0.2 per function, 0.1 per number.)',
      itemPoints: [0.2, 0.2, 0.2, 0.2, 0.1, 0.1],
      sentences: [
        { text: 'Detecting very dim light: ___', choices: [{ options: ['Rods', 'Cones'], answer: 0 }] },
        { text: 'Supporting colour vision: ___', choices: [{ options: ['Rods', 'Cones'], answer: 1 }] },
        { text: 'Fine spatial detail in the fovea: ___', choices: [{ options: ['Rods', 'Cones'], answer: 1 }] },
        { text: 'Pooling signals from many photoreceptors for sensitivity: ___', choices: [{ options: ['Rods', 'Cones'], answer: 0 }] },
        {
          text: 'Human rods have ___ type of photopigment, and cones have ___ types.',
          choices: [{ options: ['1', '3'], answer: 0 }, { options: ['1', '3'], answer: 1 }],
          explanation: 'All rods contain the same photopigment; there are three types of cones, each with a different pigment.',
        },
      ],
      modelAnswer: ['Rods: dim light and pooling.', 'Cones: colour and foveal detail.', 'Rods 1 photopigment, cones 3.'],
    },
    {
      id: 'q31',
      difficulty: 'easy',
      type: 'matchPairs',
      prompt: 'Match each part of a gap junction to its description. (Mini Exam 3, Problem 1.)',
      rightTitle: 'Descriptions',
      right: [
        { id: 'connexon', text: 'A hemichannel built from six subunits' },
        { id: 'channel', text: 'Two hemichannels docked, one from each cell' },
        { id: 'connexin', text: 'A single protein subunit' },
        { id: 'cleft', text: 'A gap of about $20$ to $50\\,\\text{nm}$ between two cells' },
      ],
      left: [
        { text: 'Connexin', answer: 'connexin' },
        { text: 'Connexon', answer: 'connexon', explanation: 'Six connexins make one connexon.' },
        { text: 'Gap junction channel', answer: 'channel', explanation: 'One connexon from each cell, docked across the narrow gap.' },
      ],
      modelAnswer: ['A connexin is one subunit.', 'Six connexins form a connexon, a hemichannel.', 'Two connexons, one per cell, form the gap junction channel.', 'The wide cleft belongs to the chemical synapse, so D answers nothing.'],
    },
    {
      id: 'q32',
      difficulty: 'medium',
      type: 'matchPairs',
      prompt: 'Consider an ON-center ganglion cell. Match each spike-response pattern to the stimulation condition that evokes it. (Mini Exam 4, Problem 7.)',
      rightTitle: 'Stimulation conditions',
      leftTitle: 'Spike-response patterns',
      right: [
        { id: 'center', figure: svgFigure(fieldPatch('center'), 'Patch of retina: only the center of the receptive field is lit.') },
        { id: 'surround', figure: svgFigure(fieldPatch('surround'), 'Patch of retina: the surround is lit, the center is dark.') },
        { id: 'all', figure: svgFigure(fieldPatch('all'), 'Patch of retina: center and surround are both lit.') },
        { id: 'none', figure: svgFigure(fieldPatch('none'), 'Patch of retina: no light on the field.') },
      ],
      left: [
        { figure: svgFigure(spikeTrain(range(14, 146, 22)), 'Six evenly spaced spikes.'), answer: 'all', explanation: 'Uniform light: center and surround nearly cancel, a weak response.' },
        { figure: svgFigure(spikeTrain(range(10, 150, 6)), 'A dense barrage of spikes.'), answer: 'center', explanation: 'Light on the center alone is the best stimulus.' },
        { figure: svgFigure(spikeTrain([]), 'No spikes.'), answer: 'surround', explanation: 'Light on the surround alone inhibits the cell.' },
        { figure: svgFigure(spikeTrain([30, 80, 130]), 'Three sparse spikes.'), answer: 'none', explanation: 'In the dark the cell fires only spontaneously.' },
      ],
      modelAnswer: ['Center alone lit: the strongest response, a barrage.', 'Surround alone lit: firing stops below spontaneous.', 'Whole field lit: center and surround cancel; a weak response.', 'No light: the sparse spontaneous rate.'],
    },
    {
      id: 'q33',
      difficulty: 'medium',
      type: 'groupItems',
      prompt: 'Classify the neurotransmitters according to their usual effect. (Mini Exam 3, Problem 7: glutamate and GABA 0.2 each, the rest 0.1.)',
      groups: [
        { label: 'Inhibitory' },
        { label: 'Excitatory' },
        { label: 'Both', description: 'Depending on the receptor and target cell' },
      ],
      items: [
        { text: 'Acetylcholine', group: 'Both', points: 0.1, explanation: 'Nicotinic receptors excite; cardiac muscarinic receptors inhibit.' },
        { text: 'Glutamate', group: 'Excitatory', points: 0.2 },
        { text: 'GABA', group: 'Inhibitory', points: 0.2 },
        { text: 'Glycine', group: 'Inhibitory', points: 0.1 },
        { text: 'Histamine', group: 'Both', points: 0.1 },
        { text: 'Dopamine', group: 'Both', points: 0.1 },
        { text: 'Endocannabinoids', group: 'Inhibitory', points: 0.1, explanation: 'Retrograde messengers that reduce transmitter release.' },
        { text: 'Serotonin', group: 'Both', points: 0.1 },
      ],
      modelAnswer: ['Inhibitory: GABA, glycine, endocannabinoids.', 'Excitatory: glutamate.', 'Both: acetylcholine, dopamine, serotonin, histamine.'],
    },
    {
      id: 'q34',
      difficulty: 'medium',
      type: 'fillBlank',
      prompt: 'A point lies in the right visual hemifield. Trace it to V1. (Weighted as Mini Exam 4, Problem 9: 0.3, 0.3, 0.4.)',
      text: 'In the right eye its image falls on the ___ retina, in the left eye on the ___ retina, and it is represented in the ___ hemisphere of V1.',
      blanks: [
        { accept: ['nasal'], points: 0.3 },
        { accept: ['temporal'], points: 0.3 },
        { accept: ['left'], points: 0.4 },
      ],
      modelAnswer: ['The right hemifield falls on the right nasal and the left temporal hemiretina.', 'Right nasal fibres cross at the chiasm; left temporal fibres stay.', 'Both reach the left LGN and so the left V1.'],
    },
    {
      id: 'q35',
      difficulty: 'medium',
      type: 'diagramAnnotate',
      prompt: 'For each lesion, mark its location on the visual pathway and shade the part of the visual field that is lost. (Mini Exam 4, Problem 2.)',
      site: lesionSite,
      affected: { figure: fieldHalves },
      siteLabel: '1. Mark the lesion',
      affectedLabel: '2. Shade the lost visual field',
      parts: [
        { text: 'The right optic nerve', site: 'nerve-r', affected: ['re-left', 're-right'], points: 0.33, explanation: 'Right monocular blindness: the right eye loses its whole field.' },
        { text: 'The optic tract on the right side', site: 'tract-r', affected: ['le-left', 're-left'], points: 0.33, explanation: 'Left homonymous hemianopia: the right tract carries the left hemifield of both eyes.' },
        { text: 'The optic chiasm', site: 'chiasm', affected: ['le-left', 're-right'], points: 0.34, explanation: 'Bitemporal hemianopia: the crossing nasal fibres carry the temporal half-fields.' },
      ],
      modelAnswer: ['An optic nerve carries one eye only, so its whole field is lost.', 'Each tract carries the opposite hemifield from both eyes.', 'At the chiasm only the crossing nasal fibres are cut, so each eye loses its temporal half-field.'],
    },
    {
      id: 'q36',
      difficulty: 'hard',
      type: 'diagramAnnotate',
      prompt: 'For each lesion, mark its location and name the defect it causes.',
      site: lesionSite,
      affected: {
        options: [
          { id: 'mono-r', text: 'Right monocular blindness' },
          { id: 'hh-l', text: 'Left homonymous hemianopia' },
          { id: 'bitemporal', text: 'Bitemporal hemianopia' },
          { id: 'hh-r', text: 'Right homonymous hemianopia' },
        ],
      },
      siteLabel: '1. Mark the lesion',
      affectedLabel: '2. Name the defect',
      parts: [
        { text: 'The optic tract on the left side', site: 'tract-l', affected: ['hh-r'] },
        { text: 'The right optic nerve', site: 'nerve-r', affected: ['mono-r'] },
      ],
      modelAnswer: ['The left tract carries the right hemifield of both eyes: right homonymous hemianopia.', 'The right nerve carries the right eye only: right monocular blindness.'],
    },
    {
      id: 'q37',
      difficulty: 'medium',
      type: 'trueFalse',
      prompt: 'Mark each statement true or false. If false, replace the incorrect terms. (Two statements, so 0.5 each, as Mini Exam 3, Problem 3.)',
      points: 1,
      statements: [
        { text: 'Gray type I synapses are usually symmetric and inhibitory.', answer: false, correction: 'Gray type I synapses are usually asymmetric and excitatory.' },
        { text: 'Electrical synapses are useful when neighbouring cells must be synchronized.', answer: true, justification: 'Current passes directly and fast, in both directions.' },
      ],
      modelAnswer: ['a) False: asymmetric and excitatory.', 'b) True.'],
    },
  ],
};
