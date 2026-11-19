const tex = String.raw;
const hints = (first, second) => [{ body: first }, { body: second }];
const written = (sectionId, prompt, criteria, first, second, source) => ({
  sectionId, type: 'written', difficulty: 'medium', prompt, source,
  markScheme: criteria.map((text) => ({ text })), modelAnswer: criteria,
  hints: hints(first, second),
});
const stage = (title, value, tolerance, unit, relation, inputs, line) => ({
  title, answer: { value, tolerance, unit, verification: { relation, inputs } }, modelAnswer: [line],
});
const calculation = (sectionId, prompt, source, first, second, ...stages) => ({
  sectionId, type: 'multiStepCalc', difficulty: 'hard', prompt, source, stages,
  hints: hints(first, second), modelAnswer: stages.flatMap((step) => step.modelAnswer),
});
const roles = ['concepts', 'explanation', 'calculation', 'calculation', 'methods'];
const exam = (letter, title, questions) => ({
  id: `L10-mock-${letter}`, title, coverage: 'L10, with passive cable and recording methods from earlier lectures where indicated.',
  questions: questions.map((question, index) => ({ ...question, role: roles[index], id: `L10-${letter}${index + 1}` })),
});

export const quantalMocks = [
  exam('a', 'Mock A · Identifying a quantum', [
    written('quanta', 'In one to three sentences each, define an mEPP, distinguish EPP from EPC, and explain why Katz reduced calcium and raised magnesium.', [
      'An mEPP is the spontaneous muscle voltage response to one vesicle’s contents.',
      'An EPP is an evoked end-plate voltage. An EPC is the evoked current under voltage clamp.',
      'Lower release probability makes failures and small integer multiples of the mean miniature response easier to resolve.',
    ], 'Distinguish voltage from current.', 'Describe what the manipulation does to vesicle release.', 'L10 pp24,30–32'),
    written('synapses', 'Explain electrical and chemical transmission. Sketch both and show why one is especially suited to synchrony and the other can encode continuous sensory output.', [
      'Draw connected cytoplasms and a gap-junction current arrow. Direct current has minimal delay and can synchronize cells.',
      'Draw a presynaptic calcium channel, vesicle, cleft and postsynaptic receptor. Release and receptor binding take time and give the pathway direction.',
      'Ribbon synapses sustain transmitter release so a graded receptor potential can regulate downstream input continuously.',
    ], 'Identify the carrier of the signal across each junction.', 'Use a photoreceptor as the graded-output example.', 'L10 pp9–16'),
    calculation('estimates', tex`A preparation has mean evoked EPP $0.84\,\mathrm{mV}$ across all trials and mean mEPP $0.40\,\mathrm{mV}$. Assume linear summation and Poisson release. Estimate mean quantal content, then expected trials with exactly two quanta out of 300.`,
      'L10 pp35–36; Exercise 10 group 1', 'Use the direct estimator first.', 'Compute the probability at exactly two and scale by the trial count.',
      stage('Mean quantal content', 2.1, 0.005, '', 'ratio', { a: 0.84, b: 0.4 }, tex`$m_d=0.84/0.40=2.10$.`),
      stage('Expected trials with two quanta', 81.004927289, 0.1, '', 'quantalExpected', { trials: 300, m: 2.1, k: 2 }, tex`$300e^{-2.1}2.1^2/2!\approx81.0$.`)),
    calculation('clamp', tex`At holding voltages of $-60$ and $-20\,\mathrm{mV}$, the baseline currents are $-100$ and $100\,\mathrm{pA}$ and peak currents are $-220$ and $60\,\mathrm{pA}$ respectively. Assume a linear, adequately clamped cell. Find the synaptic conductance, reversal voltage and input resistance.`,
      'L10 pp25–29; Exercise 10 group 3', 'Subtract the appropriate baseline at each hold.', 'Find the slopes separately and locate the synaptic zero crossing.',
      stage('Synaptic conductance', 2, 0.01, 'nS', 'ratio', { a: 80, b: 40 }, tex`Synaptic currents are $-120$ and $-40\,\mathrm{pA}$. The slope is $80/40=2\,\mathrm{nS}$.`),
      stage('Synaptic reversal', 0, 0.05, 'mV', 'sum', { a: -20, b: 20 }, tex`At the second hold the current needs to rise $40\,\mathrm{pA}$ to cross zero, so $E_{\mathrm{syn}}=-20+40/2=0\,\mathrm{mV}$.`),
      stage('Input resistance', 200, 0.5, 'MΩ', 'ratio', { a: 1000, b: 5 }, tex`The baseline slope is $200/40=5\,\mathrm{nS}$, giving $R_{\mathrm{in}}=200\,\mathrm{M}\Omega$.`)),
    written('clamp', 'Design a whole-cell voltage-clamp protocol to measure the I–V curve of an evoked synaptic input. Explain how electrode access and synapse location can affect interpretation. Would a perforated-patch configuration change how you assess access error?', [
      'Make a seal, obtain whole-cell access and evoke the same input at several held voltages.',
      'Monitor access resistance and reject runs with substantial drift. Series resistance causes a current-dependent voltage error.',
      'Subtract baseline at each hold. A remote synapse may sit at a different voltage than the soma, shifting apparent reversal.',
      "The perforated configuration limits washout, but monitor access independently. Higher series resistance can increase current-dependent voltage error.",
    ], 'Identify the command variable and readout.', 'Distinguish access error from spatial voltage variation.', 'L01 patch methods; L10 pp28–29'),
  ]),
  exam('b', 'Mock B · Testing release statistics', [
    written('distributions', 'Define n, p and m in the Katz model. Give one observation that suggests dependence between release sites on a stimulus and one that suggests drift across repeated stimuli.', [
      'n is the number of available release sites with at most one release per site. p is the common release probability and m=np is mean released count.',
      'If a site releases more often when a neighboring site also releases, their outcomes are dependent.',
      'If the fraction of successes at the same site changes systematically over repeated stimuli, the release probability is drifting.',
    ], 'Distinguish release sites within a trial from repeated trials.', 'Compare conditional probabilities within a stimulus and compare early trials with late trials.', 'L10 pp32–35'),
    written('receptors', 'Sketch a linear synaptic I–V relation. Compare receptor activation below, at and above reversal. Explain how a synapse that reverses near rest can inhibit.', [
      'Label membrane voltage and outward-positive current. The positive slope is conductance. The x intercept is reversal.',
      'Below reversal current is inward. At reversal it is zero. Above reversal it is outward.',
      'Adding conductance reduces the voltage response to another input. Reversal near rest can therefore inhibit by shunting.',
    ], 'Use local driving force.', 'Consider the effect on total conductance at reversal.', 'L10 pp25–27'),
    calculation('distributions', tex`Eight independent sites release with probability $0.25$ per stimulus. Find the exact failure probability, the Poisson approximation, and the exact count variance.`,
      'L10 pp32–35; Exercise 10 group 2; Exam sheet p4', 'Set the release count to zero.', 'For the approximation use the same mean as the binomial.',
      stage('Binomial failure probability', 0.100112915, 0.0003, '', 'binomialProb', { n: 8, p: 0.25, k: 0 }, tex`$(1-0.25)^8\approx0.1001$.`),
      stage('Poisson failure probability', 0.135335283, 0.0003, '', 'poissonProb', { m: 2, k: 0 }, tex`$m=8(0.25)=2$, so $P(0)=e^{-2}\approx0.1353$.`),
      stage('Binomial variance of release count', 1.5, 0.01, '', 'product', { a: 2, b: 0.75 }, tex`$m(1-p)=2(0.75)=1.50$.`)),
    calculation('clamp', tex`Earlier lecture application (L03–L04). A distal synapse lies beyond two segments of electrotonic length $0.30$ and $0.50$. Use a passive exponential approximation. The somatic apparent reversal is $60\,\mathrm{mV}$ above rest. Find total electrotonic length, attenuation and the estimated local reversal above rest.`,
      'L03–L04 passive cable; L10 p29; Exercise 10 group 3', 'Sum the segment lengths in electrotonic units.', 'Scale the somatic voltage excursion by the transfer factor.',
      stage('Total electrotonic length', 0.8, 0.005, '', 'sum', { a: 0.3, b: 0.5 }, tex`$L=0.30+0.50=0.80$.`),
      stage('Attenuation factor', 0.449328964, 0.001, '', 'cableDecay', { v: 1, x: 0.8, lambda: 1 }, tex`$A=e^{-0.8}\approx0.4493$.`),
      stage('Local reversal above rest', 26.959738, 0.06, 'mV', 'cableDecay', { v: 60, x: 0.8, lambda: 1 }, tex`$E_{\mathrm{syn}}-V_{\mathrm{rest}}\approx60e^{-0.8}\,\mathrm{mV}\approx26.96\,\mathrm{mV}$.`)),
    written('clamp', 'A treatment shifts the apparent somatic reversal of a distal input and raises input resistance. Explain an alternative to a change in receptor selectivity and suggest a control. What changes in the passive correction if the synapse is at the end of a uniform finite sealed cable?', [
      'Higher input resistance can accompany reduced membrane leak and change dendritic voltage transfer. The same local reversal may then yield a different somatic reversal.',
      'Check access resistance and obtain a more local measurement or compare with a similarly activated proximal input.',
      'Use baseline I–V and synaptic I–V separately. A somatic zero crossing alone cannot establish a selectivity change.',
      "Use the sealed-tip transfer factor $1/\\cosh L$ under that model. Apply it to the somatic reversal excursion relative to rest.",
    ], 'Separate the clamped voltage from the local voltage.', 'Think about changing leak along the dendrite.', 'L10 pp28–29; Exercise 10 group 3'),
  ]),
  exam('c', 'Mock C · From stimulus to measurements', [
    written('transduction', 'Define sensory transduction. Give an example of direct channel control and an example of a receptor that hyperpolarizes to its stimulus.', [
      'Transduction converts stimulus energy into a graded electrical response.',
      'Mechanical force can directly gate mechanosensitive channels.',
      'Light activates the rod signaling cascade and closes cGMP-gated cation channels, hyperpolarizing the rod.',
    ], 'Start with the receptor potential.', 'For rods compare the light response with the dark current.', 'L10 pp2–8'),
    written('vesicles', 'Explain how a nerve impulse produces and terminates a chemical synaptic signal. Include fusion, receptor activation and what must be recycled.', [
      'Terminal depolarization opens calcium channels. Calcium-bound synaptotagmin triggers fusion at a site with assembled SNARE proteins.',
      'Transmitter binds postsynaptic receptors. Ionotropic receptors directly gate current and metabotropic receptors signal indirectly.',
      'Transmitter clears by diffusion, uptake or breakdown. Endocytosed membrane can form vesicles that are refilled using a proton gradient.',
    ], 'Start at the presynaptic terminal.', 'Distinguish membrane retrieval from transmitter clearance.', 'L10 pp15–22'),
    calculation('estimates', tex`Of 150 stimuli, 30 are failures. Mean EPP is $0.75\,\mathrm{mV}$ and mean mEPP is $0.50\,\mathrm{mV}$. Compute Poisson failure and direct estimates of mean quantal content and compare them.`,
      'L10 pp36–37; Exercise 10 groups 1–2', 'Divide failures by trials.', 'Compare the negative log estimate with the amplitude ratio.',
      stage('Poisson failure estimate', 1.609437912, 0.005, '', 'quantalFailure', { failures: 30, trials: 150 }, tex`$m_f=-\ln(30/150)\approx1.609$.`),
      stage('Direct estimate', 1.5, 0.005, '', 'ratio', { a: 0.75, b: 0.50 }, tex`$m_d=0.75/0.50=1.50$. The estimates differ modestly. Agreement alone cannot establish a Poisson model.`)),
    calculation('estimates', tex`Mean EPP and standard deviation are $1.2$ and $0.6\,\mathrm{mV}$. Assume fixed quantum size and fluctuations driven by release count. Find CV, Poisson mean quantal content and binomial mean quantal content if $p=0.25$.`,
      'L10 p37', 'Normalize the standard deviation by the mean.', 'Square the CV and apply the appropriate variance-to-mean relation.',
      stage('CV', 0.5, 0.005, '', 'ratio', { a: 0.6, b: 1.2 }, tex`$\mathrm{CV}=0.6/1.2=0.50$.`),
      stage('Poisson CV estimate', 4, 0.02, '', 'ratio', { a: 1, b: 0.25 }, tex`$1/0.50^2=4$.`),
      stage('Binomial CV estimate', 3, 0.02, '', 'ratio', { a: 0.75, b: 0.25 }, tex`$(1-0.25)/0.50^2=3$.`)),
    written('quanta', 'Choose recording modes for miniature potentials and miniature currents. Explain how to check whether small events are being missed and why that matters for the failure estimator. How could you estimate false detections when lowering the event threshold?', [
      'Current clamp records miniature voltages. Voltage clamp records miniature currents.',
      'Check baseline noise and event detection threshold against the distribution of resolved minis. Look for missed small events.',
      'Missed releases inflate the apparent failure fraction and bias the Poisson mean estimate downward.',
      'Apply the same detection rule to unstimulated baseline windows of the same duration. Compare how often it labels baseline activity as an evoked event when you lower the threshold.',
    ], 'Identify the measured quantity in each clamp.', 'Follow an inflated failure fraction through the negative logarithm.', 'L10 pp24,30,37'),
  ]),
];
