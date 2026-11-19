// Source map: docs/scope/nbe-e4120/L10.md
import { equationSheet } from './equation-sheet.js';
import { quantalMocks } from './quantal-mocks.js';

const tex = String.raw;
const text = (...body) => ({ type: 'text', body });
const formula = (tex, label) => ({ type: 'math', tex, label });
const mc = (id, prompt, correct, wrong, why, whyWrong, hint, next, difficulty = 'easy', reverse = false) => {
  const options = [{ text: correct, feedback: why }, { text: wrong, feedback: whyWrong }];
  if (reverse) options.reverse();
  return {
    id: `L10-${id}`, type: 'mc', difficulty, prompt, options, correct: Number(reverse),
    hints: [{ body: hint }, { body: next }], modelAnswer: [why],
  };
};
const section = (id, title, source, blocks, conceptQuiz) => ({ id, title, source, keyTerms: [], blocks, conceptQuiz });
const sections = [
  section('transduction', 'Sensory transduction', 'L10 pp2–8', [
    text('Transduction converts a stimulus into a graded receptor potential. Receptors can be free nerve endings, specialized endings or separate receptor cells. Match the stimulus to the receptor: chemicals to chemoreceptors, force to mechanoreceptors, temperature to thermoreceptors, light to photoreceptors, and potentially damaging stimuli to nociceptors.',
      'Stimuli can control channels directly or through second messengers. A primary sensory neuron can convert its graded voltage to spikes. A separate receptor cell can send a graded signal through a chemical synapse to a downstream neuron that spikes.',
      'In rods, light activates rhodopsin, transducin and PDE6. Falling cGMP closes cation channels while potassium efflux continues. The rod hyperpolarizes and releases less glutamate.'),
  ], [mc('light', 'What is the rod’s initial voltage response to light?', 'Graded hyperpolarization', 'Graded depolarization',
    'Light reduces inward cation current, so the rod hyperpolarizes.', 'Closing cation channels reduces the inward dark current.',
    'Recall how light affects cGMP.', 'Track the current through cGMP-gated channels.')]),
  section('synapses', 'Electrical and chemical synapses', 'L10 pp9–16', [
    text('At an electrical synapse, paired connexons form a gap junction. Current flows passively between cells with minimal delay and can synchronize activity. Coupling is usually bidirectional, though some junctions rectify.',
      'At a chemical synapse, transmitter carries the signal across the cleft from the releasing terminal to postsynaptic receptors. Release and receptor activation introduce delay. Ribbon synapses sustain release and can encode graded voltages, as in photoreceptors.'),
  ], [mc('junction', 'What carries the fast signal at a gap junction?', 'Direct ionic current between cells', 'Transmitter diffusion between cells',
    'Gap-junction pores connect the two cytoplasms.', 'Diffusion across a cleft is the chemical mechanism.',
    'Identify what the junction connects.', 'Ask whether the signal needs a released messenger.', 'easy', true)]),
  section('vesicles', 'Calcium, fusion and recycling', 'L10 pp15–21', [
    text(tex`Terminal depolarization opens voltage-gated $\mathrm{Ca}^{2+}$ channels. Local calcium binds synaptotagmin and triggers fusion of docked vesicles brought close by SNARE proteins. The transmitter diffuses to its receptors. A transmitter is present presynaptically, released in a calcium-dependent manner upon depolarization, and recognized by specific receptors.`,
      'Endocytosis retrieves vesicle membrane. A proton gradient powers transmitter uptake into vesicles. Diffusion, reuptake or enzymatic breakdown clears transmitter from the cleft.'),
  ], [mc('fusion', 'What directly triggers fusion of a docked vesicle?', 'Calcium binding to synaptotagmin', 'Transmitter binding to its receptor', 'Synaptotagmin senses local calcium at the terminal.', 'Postsynaptic receptor binding follows fusion.', 'Locate the calcium sensor.', 'Follow the sequence from calcium entry to fusion.')]),
  section('receptors', 'Synaptic receptors and current', 'L10 pp22–27', [
    text('Ionotropic receptors are ligand-gated channels and act rapidly. Metabotropic receptors act through intracellular signaling and tend to respond more slowly. NMDA channels require glutamate binding and depolarization to relieve magnesium block, producing a nonlinear current–voltage relation.'),
    formula(tex`I_{\mathrm{syn}}=g_{\mathrm{syn}}(V_m-E_{\mathrm{syn}}),\qquad g_{\mathrm{syn}}=NP_{\mathrm{open}}\gamma`,
      'N is the channel count, P is opening probability and gamma is unitary conductance. Positive current is outward.'),
    text(tex`Opening channels drives voltage toward $E_{\mathrm{syn}}$. Compare reversal with the spike threshold to reason about excitation and inhibition. A reversal between rest and threshold can yield a depolarizing but inhibitory response. Increased conductance can shunt other inputs, including at reversal where net synaptic current is zero.`),
  ], [mc('ionotropic', 'Which receptor directly forms an ion channel?', 'An ionotropic receptor', 'A metabotropic receptor', 'Ligand binding gates the channel directly.', 'Metabotropic receptors use an intracellular signaling pathway.', 'Recall the two receptor classes.', 'Identify the receptor with a pore.', 'easy', true)]),
  section('clamp', 'Measure a synaptic I–V curve', 'L10 pp25–29; Exercise 10 group 3', [
    text('For each holding voltage, subtract baseline holding current from the synaptic peak. Fit current against holding voltage. In a linear, adequately clamped preparation, the synaptic slope is conductance and the zero crossing is reversal. Fit the baseline separately and invert its slope for input resistance. If the voltage axis is relative to rest, its zero-current intercept is also relative to rest.',
      tex`Somatic clamp can misestimate distal voltage and reversal. Sum segment lengths as $L=\sum_i l_i/\lambda_i$, with $\lambda_i=\sqrt{d_i\tau_m/(4R_iC_m)}$. For a uniform semi-infinite cable use $A=e^{-L}$ at that distance. The worked exercise assumes a uniform equivalent cable with a sealed tip and a synapse at the tip, giving $A=1/\cosh L$. With uniform rest and the appropriate passive transfer model, $E_{\mathrm{syn}}-V_{\mathrm{rest}}\approx A(V_{\mathrm{rev,soma}}-V_{\mathrm{rest}})$.`),
  ], [mc('subtract', 'Which current isolates a synaptic response at a fixed hold?', 'Peak minus holding baseline', 'Holding baseline minus peak',
    'Subtracting baseline removes the holding contribution while preserving the response sign.', 'Baseline minus peak reverses the response sign.',
    'Write peak as baseline plus response.', 'Rearrange for the response.')]),
  section('quanta', 'Katz’s quantal experiment', 'L10 pp24,30–32', [
    { type: 'relevantVideo', videoId: 'nHLTI_39Yjg', title: 'Endplate Potentials (EPPs) And Quantal Release Explained (Bernard Katz Experiments) | Clip',
      topic: 'Spontaneous miniature responses and the evidence for quantal release', channel: 'Science With Tal' },
    text('At the neuromuscular junction, acetylcholine opens nicotinic cation channels. At normal resting voltage the net current is inward and depolarizes the muscle. A spontaneous miniature end-plate potential (mEPP) is the muscle voltage response to one vesicle’s worth of acetylcholine. An evoked end-plate potential (EPP) can combine many quanta. Under voltage clamp the corresponding measurements are currents (mEPC and EPC).',
      'Low extracellular calcium and high magnesium suppress release. Following repeated nerve stimulation, failures and peaks near integer multiples of the mean mEPP reveal discrete packets. Miniature amplitudes still vary. Katz’s simplest model assumes approximately equal quantal amplitudes and near-simultaneous, linear summation.'),
    { type: 'figure', visual: { type: 'widget', name: 'image-hotspots',
      caption: 'Lecture 10, slide 31. Left: evoked responses with a time and voltage scale. Right: EPP amplitude histogram in mV and spontaneous mEPP inset.',
      fallbackAlt: 'Repeated stimuli yield failures and evoked responses that cluster near multiples of the spontaneous miniature amplitude.',
      props: { src: new URL('../../assets/figures/nbe-e4120/L10/katz-release.webp', import.meta.url).href,
        alt: 'Evoked traces and amplitude distributions from the frog neuromuscular junction.', aspect: 528 / 271, quiz: false, layout: 'stack', regions: [] },
    } },
  ], [mc('miniature', 'What is one quantum in the Katz model?', 'The contents of one vesicle', 'The contents of one terminal',
    'One vesicle supplies the elementary transmitter packet.', 'A terminal can release multiple vesicles during a stimulus.',
    'Think about the unit behind an mEPP.', 'Identify the smallest transmitter packet.', 'easy', true)]),
  section('distributions', 'Binomial and Poisson release', 'L10 pp32–35; Exercise 10 groups 1–2', [
    text(tex`Let $K$ be the count released on one stimulus. The binomial model assumes $n$ independent sites with a common stationary release probability $p$ and at most one quantum per site. Its mean is $m=np$ and its variance is $m(1-p)$. Large $n$ and small $p$ at a given $m$ favor the Poisson approximation, whose variance equals $m$.`),
    formula(tex`P_{\mathrm{bin}}(K=k)=\binom nk p^k(1-p)^{n-k},\qquad P_{\mathrm{Pois}}(K=k)=\frac{m^ke^{-m}}{k!}`, 'The supplied exam sheet gives both distributions.'),
    text(tex`For failures use $k=0$: $(1-p)^n$ or $e^{-m}$. Multiply any probability by the trial count to get an expected count. For example, 100 Poisson trials with $m=2$ give about 13.5 expected failures.`),
  ], [mc('independence', 'Which observation contradicts independent release at two otherwise identical sites?',
    'One site is more likely to release when the other releases', 'One site can release on a trial when the other releases',
    'A conditional release probability that changes with the other site’s outcome violates independence.', 'Independent sites can both release on the same trial.',
    'Distinguish simultaneous events from linked events.', 'Compare conditional and marginal probabilities.')]),
  section('estimates', 'Estimate mean quantal content', 'L10 pp36–37; Exercise 10 groups 1–2', [
    formula(tex`m_d=\bar V/q,\qquad m_{f\,\mathrm{Pois}}=-\ln f_0,\qquad m_{\mathrm{CV,Pois}}=1/\mathrm{CV}^2`, 'Use mean EPP amplitude including failures, mean miniature amplitude q, observed failure fraction and EPP amplitude CV.'),
    formula(tex`m_{f\,\mathrm{bin}}=\frac{p\ln f_0}{\ln(1-p)},\qquad m_{\mathrm{CV,bin}}=\frac{1-p}{\mathrm{CV}^2},\qquad \mathrm{CV}=\frac{\sigma_V}{\bar V}`, 'Binomial corrections require known p. Both CV estimates assume fluctuations mainly reflect release counts.'),
    text('The direct estimate needs linear summation and representative minis. Failure estimates require reliably distinguishing zero release from small responses. With zero observed failures, the Poisson plug-in estimate diverges. For failure and CV estimates, keep release conditions stable across trials and check the count model against observed frequencies.'),
  ], [mc('mean', 'Which trials contribute to the mean EPP for the direct method?', 'All trials including failed releases', 'Only trials with detectable releases',
    'An average per stimulus includes zero responses from failures.', 'Dropping zeros inflates the average per stimulus.',
    'Recall what mean quantal content averages over.', 'A failure contributes zero quanta.', 'easy', true)]),
];

export default {
  meta: { id: 'L10', number: 10, title: 'Sensory receptors and synaptic transmission', chapters: [], pages: [],
    lectureDate: '2026-11-13', examDate: '2026-11-30', examLabel: 'Final exam' },
  objectives: [
    'Trace a stimulus to a graded voltage and then to a spike or synaptic signal.',
    'Contrast electrical and chemical transmission and explain calcium-triggered fusion.',
    'Use synaptic reversal to predict current direction and interpret clamp measurements.',
    'Explain miniature events and choose a quantal model or estimator.',
  ],
  overview: {
    estimate: "Core route: read the main sections and answer 13 core questions. Formula explorers, videos, extra practice and mocks are optional.",
    equations: tex`$I_{\mathrm{syn}}=g_{\mathrm{syn}}(V_m-E_{\mathrm{syn}})$, $m=np$, $P_0=(1-p)^n$ or $e^{-m}$, $m_d=\bar V/q$.`,
    pitfalls: 'Use the local voltage to predict synaptic current. Include failed releases in the mean response per stimulus.',
  },
  segmentedPractice: true, standardPractice: 'mc-only', sections,
  recap: { takeaways: ["Trace stimulus transduction or presynaptic release through to the postsynaptic current.", "Use synaptic reversal and conductance to predict polarity and shunting.", "Check independence, stationarity and failure detection before choosing a quantal-count model."] },
  lectureQuiz: [
    { ...mc('ribbon', 'Which function suits a ribbon synapse?', 'Sustained release encoding a graded voltage', 'Synchronous voltage transfer through a gap junction',
      'Ribbon synapses support sustained transmitter release.', 'Direct voltage coupling is a feature of electrical synapses.',
      'Recall the role of the ribbon.', 'Consider the graded output of a photoreceptor.'), sectionId: 'synapses' },
    { ...mc('shunt', 'Reversal equals rest and lies below threshold. How does opening these channels affect a simultaneous excitatory input?',
      'It reduces the voltage response by increasing conductance', 'It enlarges the voltage response by adding driving force',
      'At rest the synaptic driving force is zero, but additional conductance reduces the voltage gain for the excitatory input.',
      'The conductance tends to hold the membrane near its own reversal, below threshold.',
      'First evaluate the initial driving force.', 'Then ask how a higher total conductance affects voltage gain.', 'medium', true), sectionId: 'receptors' },
    { ...mc('calcium', 'A presynaptic calcium-channel blocker leaves the arriving spike intact. Which change is expected first?',
    'A drop in evoked vesicle fusion', 'A drop in miniature response size',
    'Less calcium enters the terminal, reducing the chance of fusion during the spike.', 'A miniature response measures the effect of a vesicle after it fuses.',
    'Locate the blocked channel.', 'Follow calcium entry to the release step.', 'medium'), sectionId: 'vesicles' },
    { ...mc('direction', tex`At $V_m=+10\,\mathrm{mV}$ and $E_{\mathrm{syn}}=0\,\mathrm{mV}$, how does a positive synaptic conductance affect net current?`,
    'It adds outward current', 'It adds inward current',
    'The driving force is positive, so the added current is outward.', 'Inward current would require voltage below reversal.',
    'Subtract reversal from membrane voltage.', 'Use the outward-positive sign convention.', 'medium', true), sectionId: 'receptors' },
    { ...mc('model-test', tex`Lowering calcium raises failures without changing mean miniature size. Release counts still have variance below their mean. Which interpretation fits if site number is fixed?`,
      'Release probability fell, but Poisson still overstates count variance', 'Quantal amplitude fell, but Poisson still overstates count variance',
      tex`More failures with stable minis support lower release probability. Sub-Poisson count variance is consistent with $m(1-p)<m$.`,
      'A smaller quantum should reduce the miniature amplitude. The observed change is in release counts.',
      'Separate vesicle count from the size of one vesicle response.', 'Compare the two models’ count variances at the same mean.', 'hard'), sectionId: 'estimates' },
  ],
  mockExams: quantalMocks,
  formulaReference: equationSheet,
};
