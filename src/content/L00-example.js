// Dummy lecture that exercises every section and question type so the
// renderer can be tested. Not course content. Shown only in dev.

import { exampleCell } from './figures/example-cell.js';

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
    'See every question type render: multiple choice, true or false (single and several statements), fill in the blank (typed and word bank), classify, clinical case, interpret, essay, label (with and without a word bank), order, calculation.',
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
      id: 'q05',
      difficulty: 'hard',
      type: 'calc',
      prompt: 'For the toy curve with $g = 2$ and $\\tau = 3\\,\\text{ms}$, calculate the height of the peak. Give the answer to two decimals.',
      given: [
        { symbol: 'gain', value: 2, unit: '' },
        { symbol: '$\tau$', value: 3, unit: 'ms' },
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
        '$y_{\text{peak}} = g\,\tau / e = 2 \times 3 / 2.718 = 2.21$.',
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
  ],
};
