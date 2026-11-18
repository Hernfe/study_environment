import { registry } from './registry.js';

const definition = (term, body) => ({ type: 'definition', term, body });
const text = body => ({ type: 'text', body });
const steps = (title, ...items) => ({ type: 'steps', title, steps: items });
const detail = (title, body) => ({ type: 'detail', title, body });
const caution = (title, body) => ({ type: 'whyItMatters', title, body });
const compare = (title, rowLabel, columns, rows) => ({
  type: 'compare', title, rowLabel, columns,
  rows: rows.map(([label, ...cells]) => ({ label, cells })),
});
const options = entries => entries.map(([text, feedback]) => ({ text, feedback }));
const check = (id, prompt, correct, entries) => ({ id: `l09-c-${id}`, prompt, correct, options: options(entries) });
const section = (id, title, blocks, ...conceptQuiz) => ({ id, title, blocks, conceptQuiz });

// Original schematic tiles, arranged for readable labels on narrow screens.
const node = (x, y, label, width = 144) => {
  const lines = label.split('|');
  return `<rect x="${x - width / 2}" y="${y - 25}" width="${width}" height="50" rx="8" fill="#e9f2f6" stroke="#638292"/>
    <text x="${x}" y="${y + 6 - (lines.length - 1) * 9}" text-anchor="middle">${lines.map((line, i) =>
    `<tspan x="${x}" dy="${i ? 18 : 0}">${line}</tspan>`).join('')}</text>`;
};
const note = (x, y, label) => `<text x="${x}" y="${y}" text-anchor="middle" font-size="14">${label}</text>`;
const link = (path, { inhibit = false, feedback = false } = {}) => {
  const end = inhibit ? 'bar' : 'arrow';
  return `<path d="${path}" fill="none" stroke="#365767" stroke-width="2" ${feedback ? 'stroke-dasharray="5 4"' : ''} marker-end="url(#${end})"/>`;
};
function schematic(id, height, ...parts) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 ${height}" width="400" height="${height}" style="display:block;width:100%;max-width:400px;height:auto;margin-inline:auto" font-family="system-ui,sans-serif" font-size="16" fill="#193545">
    <defs>
      <marker id="${id}-arrow" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0 0L7 3.5L0 7Z" fill="#365767"/></marker>
      <marker id="${id}-bar" markerWidth="7" markerHeight="10" refX="6" refY="5" orient="auto"><path d="M6 0V10" stroke="#365767" stroke-width="2"/></marker>
    </defs>
    <rect width="400" height="${height}" rx="10" fill="#f7fafb"/>
    ${parts.join('\n').replaceAll('url(#', `url(#${id}-`)}
  </svg>`;
}
const image = svg => `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
function visual(svg, height, caption, fallbackAlt, regions) {
  if (!regions) return { type: 'svg', markup: svg, caption, fallbackAlt };
  return {
    type: 'widget', name: 'image-hotspots', caption, fallbackAlt,
    props: { src: image(svg), aspect: 400 / height, alt: fallbackAlt, regions, quiz: false, layout: 'stack' },
  };
}
const figure = visual => ({ type: 'figure', visual });
const region = (id, label, y, body) => ({
  id, label, x: 50, y: y / 326 * 100, w: 51, h: 15, shape: 'rect', body,
});
const hpaRegions = [
  region('hypothalamus', 'Hypothalamus', 40, 'Parvocellular neurosecretory neurons release CRH.'),
  region('pituitary', 'Anterior pituitary', 145, 'CRH stimulates this gland to release ACTH into the bloodstream.'),
  region('adrenal', 'Adrenal cortex', 250, 'ACTH stimulates cortisol release here.'),
];
function hpaDrawing(labels) {
  return schematic(labels ? 'hpa-study' : 'hpa-label', 326,
    node(200, 40, labels ? 'Hypothalamus' : '', 205),
    link('M200 66 V118'), note(255, 97, 'CRH'),
    node(200, 145, labels ? 'Anterior pituitary' : '', 205),
    link('M200 171 V223'), note(260, 202, 'ACTH in blood'),
    node(200, 250, labels ? 'Adrenal cortex' : '', 205),
    link('M200 276 V294'), note(200, 314, 'Cortisol in blood'));
}
const hpa = visual(hpaDrawing(true), 326, 'Hormonal route from stress signalling to circulating cortisol.',
  'Hypothalamus releases CRH to anterior pituitary. Its ACTH travels in blood to adrenal cortex, which releases cortisol.', hpaRegions);

const amygdala = visual(schematic('amygdala', 390,
  node(100, 35, 'Sensory thalamus'), node(300, 35, 'Neocortex'),
  link('M100 61 V78 H200 V97'), link('M300 61 V78 H200 V97'),
  node(200, 124, 'Basolateral nuclei', 190), link('M200 150 V177'),
  node(200, 204, 'Central nucleus', 190),
  link('M200 230 V254 H70 V279'), link('M200 230 V279'), link('M200 230 V254 H330 V279'),
  node(70, 306, 'Hypothalamus', 124), node(200, 306, 'PAG', 106), node(330, 306, 'Diffuse|modulators', 124),
  note(70, 352, 'HPA and'), note(70, 369, 'sympathetic'), note(200, 352, 'Avoidance'), note(330, 352, 'Vigilance')),
  390, 'Amygdala inputs and branches of the stress response.',
  'Sensory thalamus and neocortex converge on basolateral nuclei, then the central nucleus. Hypothalamus controls HPA and sympathetic outputs, PAG supports avoidance, and diffuse modulators support vigilance.');

const feedback = visual(schematic('feedback', 315,
  node(94, 40, 'Amygdala'), node(300, 40, 'Hippocampus|with GRs', 158),
  link('M94 66 V130 H123'), note(62, 108, 'Stimulates'),
  link('M300 66 V130 H277', { inhibit: true }), note(333, 108, 'Suppresses'),
  node(200, 130, 'HPA axis', 150), link('M200 156 V211'),
  node(200, 238, 'Cortisol', 150),
  link('M276 238 H389 V40 H380', { feedback: true }),
  note(199, 292, 'Dashed arrow: cortisol feedback')),
  315, 'Push–pull control of the stress response.',
  'Amygdala stimulates the HPA axis. Hippocampus suppresses it. Cortisol feeds back onto hippocampal glucocorticoid receptors.');

const gaba = visual(schematic('gaba', 235,
  node(103, 42, 'GABA'), node(293, 42, 'Benzodiazepine'),
  link('M103 68 V123 H144'), link('M293 68 V123 H257'),
  note(87, 103, 'GABA site'), note(301, 103, 'Separate site'),
  node(200, 124, 'GABA-A', 110), note(70, 178, 'Ethanol site'),
  link('M113 173 L145 139'), link('M200 150 V174'),
  node(200, 201, 'Chloride channel', 170)),
  235, 'GABA gates the receptor-channel. Benzodiazepines modulate its response. The slide also depicts a separate ethanol site.',
  'GABA and benzodiazepines bind at separate sites on a GABA-A chloride channel. GABA gates it and the drug enhances the GABA-dependent response.');

const synapses = visual(schematic('synapses', 465,
  node(102, 43, 'NE terminal', 168), node(298, 43, 'Serotonin terminal', 168),
  link('M102 69 V136'), link('M298 69 V136'), note(200, 109, 'Release'),
  node(102, 163, 'NE in cleft', 168), node(298, 163, 'Serotonin in cleft', 168),
  link('M102 189 V227'), link('M298 189 V227'),
  node(102, 254, 'NE transporter', 168), node(298, 254, 'Serotonin|transporter', 168),
  note(200, 218, 'Uptake'),
  link('M102 280 V302 H169 V323'), link('M298 280 V302 H231 V323'),
  node(200, 350, 'MAO breakdown', 180),
  note(200, 394, 'MAO inhibitors block breakdown'),
  note(200, 422, 'Tricyclics block both uptake routes'),
  note(200, 447, 'SSRIs block the serotonin uptake route')),
  465, 'Two transmitter cycles. Transporters return transmitter to terminals. MAO breaks down intracellular monoamines.',
  'NE and serotonin each enter the cleft and can return through their own transporter. MAO acts inside the terminal. Tricyclics inhibit uptake, SSRIs target the serotonin transporter, and MAO inhibitors block breakdown.');

const care = visual(schematic('care', 308,
  node(200, 36, 'Early tactile care', 238), link('M200 62 V84'),
  node(200, 111, 'Hippocampal serotonin', 238), link('M200 137 V159'),
  node(200, 186, 'More hippocampal GRs', 238), link('M200 212 V234'),
  node(200, 261, 'Lower hypothalamic CRH|and less adult anxiety', 270)),
  308, 'Relationship observed in the early-care rat studies.',
  'Early tactile care engages serotonergic input to hippocampus and increases glucocorticoid receptor expression. Greater early care is associated with lower hypothalamic CRH and less adult anxiety-like behaviour.');

// The experimental diagram encodes the manipulated branch without listing a prediction.
const blockedPAG = visual(schematic('pag-experiment', 230,
  node(200, 40, 'Central nucleus', 180),
  link('M200 66 V100 H73 V151'), link('M200 66 V151', { inhibit: true }), link('M200 66 V100 H327 V151'),
  node(73, 178, 'Hypothalamus', 126), node(200, 178, 'PAG', 106), node(327, 178, 'Diffuse|modulators', 126)),
  230, 'Simplified experiment. A blunt end marks the selectively blocked branch.',
  'Central amygdala sends signals to three targets. The middle connection ends in a blunt bar at PAG. Other connections have arrowheads.');

const sections = [
  section('burden', 'Brain disorders and their cost', [
    text('Neurology and psychiatry approach disorders of brain function from different clinical traditions. Behaviour arises from brain activity shaped by interacting hereditary and environmental influences. Health and illness can be viewed along a continuum of function.'),
    compare('Costs in the slide studies', 'Cost category', ['What it counts'], [
      ['Direct health care', 'Clinical services and treatment'],
      ['Direct non-medical', 'Services outside health care, such as social care'],
      ['Indirect', 'Losses such as reduced productivity'],
    ]),
    detail('Historical cost estimates', 'The slides put Finnish brain-disorder costs for 2007 at roughly 5% of tax income. Mental disorders account for the largest grouped share. Indirect costs exceed either direct category individually in the overall table. The 2010 European chart uses purchasing-power-adjusted costs.'),
    detail('Digital phenotyping', 'Research uses patterns in phone-derived behaviour, such as mobility or speech, as candidate markers of mental state.'),
  ], check('burden', 'Which cost category includes lost productivity?', 1, [
    ['Direct health care costs', 'This category counts treatment and other clinical services.'],
    ['Indirect economic loss', 'Lost productivity is an indirect economic cost.'],
    ['Direct non-medical costs', 'This category includes services such as social care.'],
  ])),
  section('psychosocial', 'Psychosocial approaches and psychotherapy', [
    compare('Two historical approaches', 'Question', ['Freud', 'Skinner'], [
      ['Focus', 'Unconscious mental life and formative childhood experience', 'Observable behaviour and its environmental consequences'],
      ['Account of illness', 'Conflict between conscious and unconscious elements', 'Learned maladaptive behaviour'],
      ['Treatment', 'Bring unconscious material to awareness and resolve conflict', 'Modify behaviour through new reinforcement and learning'],
    ]),
    text('Learning can change brain structure and synaptic function, as illustrated by long-term potentiation. Psychotherapy can therefore change behavioural responses through biological learning mechanisms.'),
    detail('Historical context', 'The slides link the emergence of psychiatry to secularisation. In 1920 Freud anticipated that physiological or chemical terms might eventually explain what psychoanalysis could only describe psychologically.'),
  ], check('psychosocial', 'What is the proposed biological basis of psychotherapy?', 2, [
    ['Inherited traits alone fix behaviour', 'The slide emphasises that experience and learning can change responses.'],
    ['Verbal reports directly reveal causes', 'Talk can support learning, while a report alone does not establish a cause.'],
    ['Learning modifies brain circuits', 'Plasticity gives experience a route to change later responding.'],
  ])),
  section('fear', 'From adaptive fear to anxiety disorders', [
    definition('Fear', 'An adaptive response to threat. Fear can be innate or learned and can recruit sympathetic fight-or-flight responses.'),
    text('Anxiety disorders involve fear or anxiety that is excessive or inappropriate for the situation. The lecture describes them as common and ranks them fourth in its brain-disorder cost comparison.'),
    definition('Panic attack', 'An abrupt surge of intense fear that may involve palpitations, sweating, trembling, breathlessness, chest pain, nausea, dizziness, tingling, chills or flushing.'),
    compare('Historical grouping on slide 19', 'Entry', ['Characteristic clue'], [
      ['Panic disorder', 'Recurrent panic attacks'],
      ['Agoraphobia', 'Fear of situations where escape or help may be difficult'],
      ['OCD', 'Intrusive obsessions and repetitive compulsions'],
      ['Generalised anxiety', 'Persistent excessive worry across situations'],
      ['Specific phobia', 'Fear of a specific object or situation'],
      ['Social phobia', 'Fear of social scrutiny or embarrassment'],
      ['PTSD', 'Re-experiencing trauma with avoidance or heightened arousal'],
    ]),
    caution('Classification differs by source', 'Slide 19 places obsessive-compulsive disorder (OCD) and post-traumatic stress disorder (PTSD) in its historical anxiety table. The fourth-edition table and current classification place them in separate categories. Anxiety can be prominent in both.'),
  ], check('fear', 'Which clue best fits agoraphobia in the slide table?', 0, [
    ['Fear that escape may be difficult', 'Difficulty escaping or getting help is the characteristic clue.'],
    ['Fear of being judged by others', 'Fear of scrutiny is characteristic of social phobia.'],
    ['Fear centred on a specific animal', 'A narrowly defined animal trigger suggests a specific phobia.'],
  ])),
  section('diagnosis', 'Biological basis, diagnosis and stress', [
    definition('Psychiatric diagnosis', 'A clinical grouping based on signs and symptoms. People with the same diagnosis can have different underlying causes and can respond differently to the same treatment.'),
    steps('From genetic association to a candidate therapy',
      'Find candidate genetic associations in people and use behavioural tests in animal models.',
      'Compare and test candidate genes to investigate biological pathways that connect genetic variation to behaviour.',
      'Use the implicated mechanisms to identify and test possible therapeutic targets.'),
    steps('Four components of the stress response',
      'Avoidance behaviour.', 'Increased vigilance and arousal.', 'Sympathetic activation.', 'Adrenal cortisol release.'),
    text('Experience can strengthen or weaken the response to a stressor. The lecture describes dysregulation as a stress response when the threat is absent or poses little immediate danger.'),
  ], check('diagnosis', 'What primarily defines a psychiatric diagnosis in the assigned reading?', 1, [
    ['A single inherited variant', 'Genetic factors can affect risk without defining the diagnosis.'],
    ['A pattern of signs and symptoms', 'The symptom pattern defines the clinical grouping.'],
    ['A single endocrine measurement', 'Hormone measures can inform research without replacing symptom-based diagnosis.'],
  ])),
  section('hpa', 'Secretory hypothalamus and the HPA axis', [
    text('The periventricular hypothalamus includes the suprachiasmatic nucleus and cells involved in autonomic and neurosecretory control. Parvus means small and magnus means large. Parvocellular CRH neurons initiate the endocrine stress pathway.'),
    steps('From hypothalamus to cortisol',
      'Hypothalamic neurons release corticotropin-releasing hormone (CRH) to the anterior pituitary.',
      'The anterior pituitary releases adrenocorticotropic hormone (ACTH) into the bloodstream.',
      'ACTH stimulates the adrenal cortex above the kidney to release cortisol.'),
    figure(hpa),
    detail('CRH animal evidence', 'The book describes reduced anxiety-like behaviour in mice lacking a CRH receptor and heightened anxiety-like behaviour with excess CRH signalling.'),
  ], check('hpa', 'Where is ACTH released in the stress pathway?', 2, [
    ['Adrenal cortex', 'The adrenal cortex responds to ACTH by releasing cortisol.'],
    ['Secretory hypothalamus', 'Hypothalamic neurons send CRH to the pituitary.'],
    ['Anterior pituitary', 'The anterior pituitary releases ACTH into blood.'],
  ])),
  section('amygdala', 'Amygdala pathways drive the stress response', [
    figure(amygdala),
    text('The basolateral nuclei integrate sensory input. The central nucleus relays signals to the hypothalamus, periaqueductal gray (PAG) and diffuse modulatory systems. Some anxiety disorders have been associated with inappropriate amygdala activation.'),
    detail('Learned fear and an additional relay', 'In conditioning, a previously neutral conditioned stimulus (CS) predicts an unconditioned stimulus (US) that naturally evokes fear. Real-life learning can occur after one pairing. The book also names the bed nucleus of the stria terminalis downstream of the amygdala in HPA activation.'),
  ], check('amygdala', 'Which output supports avoidance in the taught pathway?', 0, [
    ['Periaqueductal gray', 'The PAG branch supports avoidance behaviour.'],
    ['Diffuse modulatory systems', 'The modulatory branch supports vigilance and arousal.'],
    ['Secretory hypothalamus', 'The hypothalamic branch helps recruit endocrine and sympathetic responses.'],
  ])),
  section('hippocampus', 'Hippocampal feedback and chronic stress', [
    figure(feedback),
    definition('Glucocorticoid receptors (GRs)', 'In the hippocampus, circulating cortisol activates these receptors. Hippocampal feedback suppresses hypothalamic CRH release and limits the duration of the hormonal response. Amygdala activation pushes CRH release upward.'),
    steps('How chronic stress can reinforce itself',
      'Repeated or sustained stress keeps cortisol elevated.',
      'Prolonged elevation can damage hippocampal neurons and compromise feedback.',
      'Weaker feedback allows cortisol to remain elevated longer, which can further impair regulation and aggravate anxiety.'),
    detail('Clinical association', 'The deck gives reduced hippocampal volume in PTSD as an example. Volume differences alone cannot establish which event came first.'),
  ], check('feedback', 'What happens to CRH when hippocampal feedback strengthens?', 1, [
    ['CRH release increases', 'Amygdala drive increases CRH release. Stronger hippocampal feedback has the opposite effect.'],
    ['CRH release decreases', 'Hippocampal feedback inhibits hypothalamic CRH release.'],
    ['CRH release stays constant', 'CRH is a regulated output of the feedback loop.'],
  ])),
  section('treating-anxiety', 'Treating anxiety', [
    definition('Anxiolytic', 'A drug that reduces anxiety. Psychotherapy can also use gradual exposure to help someone learn safer responses to a feared stimulus.'),
    compare('Two ways to modify released transmitter signalling', 'Feature', ['Benzodiazepines', 'SSRIs'], [
      ['Target', 'An allosteric site on GABA-A receptors', 'Serotonin transporter'],
      ['Action', 'Enhance the GABA-dependent channel response', 'Inhibit serotonin reuptake'],
      ['Effect', 'Stronger inhibitory action of released GABA', 'Released serotonin acts for longer'],
      ['Onset', 'Synaptic modulation can produce relatively rapid effects', 'Transporter action is rapid, while therapeutic effects typically take weeks'],
      ['Adaptation', 'Acute GABA-A modulation accounts for the action shown here', 'See the hippocampal GR adaptation in the final section'],
    ]),
    figure(gaba),
    caution('Binding sites', 'Benzodiazepines bind away from the GABA site. SSRIs act at the transporter. In these mechanisms both alter signalling by transmitter that the neuron has released.'),
    detail('Supporting illustrations', 'Slide 32 illustrates lower frontal benzodiazepine-site binding in a panic-disorder PET example. Slide 33 compares receptor time courses. GABA-A and AMPA responses are faster than GABA-B and NMDA responses, respectively.'),
  ], check('treatment', 'Where does a benzodiazepine act in the slide model?', 2, [
    ['The serotonin uptake transporter', 'This is the target of SSRIs.'],
    ['The GABA transmitter binding site', 'Released GABA gates the channel through this site.'],
    ['An allosteric site on GABA-A', 'Allosteric binding enhances the channel response to GABA.'],
  ])),
  section('mdd', 'Affective disorders and major depression', [
    definition('Affect', 'Emotional state or mood. Affective disorders are disorders of mood. The lecture describes depression as prolonged and accompanied by a feeling of losing control over one’s emotional state.'),
    compare('Major depressive disorder symptom domains', 'Domain', ['Slide examples'], [
      ['Mood and reward', 'Depressed mood and loss of pleasure (anhedonia)'],
      ['Energy and movement', 'Fatigue, psychomotor slowing or agitation'],
      ['Self-evaluation', 'Reduced confidence or self-esteem, excessive guilt or self-criticism'],
      ['Thought content', 'Recurrent thoughts of death or self-destruction, or self-destructive behaviour'],
      ['Cognition', 'Indecision, poor concentration or broader cognitive decline'],
      ['Sleep', 'Disturbed sleep'],
      ['Appetite/weight', 'Changes in appetite or body weight'],
    ]),
    caution('Historical estimates differ by source', 'Slide 35 gives annual mood-disorder prevalence above 7%. Bear p. 763 gives above 9%. Slide 36 presents historical WHO depression figures of 5% annually and 20% lifetime. Bear p. 763 gives 6% annually for major depression. Keep the source, category and time window attached.'),
    detail('Burden and lived experience', 'The historical WHO slide highlights depression’s global disability burden and the availability of psychological and pharmacological treatment. The deck uses the “black dog” metaphor to illustrate lived experience.'),
  ], check('mdd', 'What term describes reduced pleasure in previously enjoyable activities?', 0, [
    ['Anhedonia (loss of pleasure)', 'Anhedonia is a reduction or loss of pleasure.'],
    ['Psychomotor slowing (low activity)', 'This describes slowed movement or activity.'],
    ['Reduced concentration (poor focus)', 'This describes trouble sustaining attention or focus.'],
  ])),
  section('monoamines', 'Monoamine hypothesis and antidepressant mechanisms', [
    definition('Monoamine hypothesis', 'Depression can arise from deficient activity in diffuse modulatory systems, particularly norepinephrine from the locus coeruleus or serotonin from the raphe nuclei.'),
    steps('The observations behind the hypothesis',
      'Reserpine depleted central catecholamines and serotonin. Depression was reported in some treated patients.',
      'A tuberculosis drug elevated mood and inhibited monoamine oxidase (MAO), an enzyme that breaks down monoamines.',
      'Imipramine inhibited uptake of released norepinephrine and serotonin.'),
    figure(synapses),
    compare('Drug classes in the transmitter cycle', 'Class', ['Target', 'Effect'], [
      ['MAO inhibitors', 'Monoamine oxidase', 'Reduce enzymatic breakdown of monoamines'],
      ['Tricyclics', 'Norepinephrine and serotonin transporters in the slide model', 'Reduce uptake, sustaining transmitter action'],
      ['SSRIs', 'Serotonin transporter only', 'See the anxiety treatment comparison'],
    ]),
    detail('Terminology', 'Serotonin–norepinephrine reuptake inhibitors (SNRIs) also target reuptake of both transmitters. Slide 41 names MAO inhibitors, tricyclics and SSRIs.'),
  ], check('monoamines', 'What process is directly inhibited by an MAO inhibitor?', 1, [
    ['Transporter-mediated reuptake', 'Tricyclics and SSRIs act at transporters in the slide model.'],
    ['Enzymatic monoamine breakdown', 'Monoamine oxidase metabolises transmitters inside terminals.'],
    ['Receptor-mediated neurotransmission', 'Inhibiting MAO helps sustain monoamine signalling.'],
  ])),
  section('limits', 'Limits of the monoamine hypothesis', [
    steps('Two observations motivate a broader account',
      'Monoamine transmission changes rapidly. Therapeutic effects of the drugs discussed can be delayed by weeks.',
      'Cocaine can elevate synaptic norepinephrine without acting as an effective antidepressant.',
      'The lecture proposes longer-term changes in gene expression and circuit function. HPA regulation is one candidate adaptation.'),
    detail('Assigned book context', 'Pages 767–769 discuss anterior cingulate activity, electroconvulsive therapy (ECT), rapid effects reported with ketamine, hippocampal neurogenesis research and psychotherapy that addresses negative self-views. These examples supplement the slide argument.'),
  ], check('limits', 'Which comparison challenges a simple immediate monoamine account?', 2, [
    ['Both effects appear after weeks', 'Synaptic transmission changes much sooner than the clinical benefit.'],
    ['Clinical change precedes synaptic change', 'The lecture describes synaptic modulation occurring first.'],
    ['Synaptic change precedes clinical change', 'The delay motivates an account involving longer-term adaptation.'],
  ])),
  section('diathesis', 'Diathesis–stress and depression', [
    compare('Two factors in vulnerability', 'Factor', ['Role in the account'], [
      ['Diathesis', 'Inherited susceptibility can raise risk'],
      ['Environmental stress', 'Early adversity or other stressful experiences can also raise risk'],
    ]),
    text('The diathesis–stress hypothesis proposes that genetic susceptibility and stressful experience converge on HPA regulation. Inherited susceptibility changes probability. Outcomes depend on the interaction of these factors. Anxiety and depression often occur together (comorbidity).'),
    compare('HPA observations in the lecture', 'Setting', ['Observation'], [
      ['Severe depression', 'Elevated blood cortisol and cerebrospinal fluid CRH'],
      ['Major depression', 'Reduced hippocampal GR numbers reported'],
      ['Brain CRH injection in animals', 'Insomnia, reduced appetite and sexual interest, and increased anxiety-like behaviour'],
    ]),
    text('Human group differences support a role for HPA dysregulation. The animal manipulation tests one route by which CRH can affect behaviour.'),
  ], check('diathesis', 'What does diathesis mean in this account?', 0, [
    ['Predisposition to a disorder', 'Diathesis describes vulnerability to a condition.'],
    ['Exposure to a stressful event', 'This is the environmental stress component.'],
    ['Presence of two disorders', 'Co-occurrence of conditions is comorbidity.'],
  ])),
  section('maternal-care', 'Early experience and hippocampal GR expression', [
    text('Genes, monoamines and early experience can regulate hippocampal GR abundance. The deck lists increased GR expression as a possible adaptation to sustained SSRI treatment.'),
    figure(care),
    text('In rats, the persistent effect of tactile care was observed in an early postnatal critical period. Later stimulation did not have the same effect. In humans, childhood abuse and neglect are associated with increased risk of mood and anxiety disorders.'),
    detail('Research context', 'The assigned reading discusses CRH receptor antagonists as a research direction.'),
  ], check('care', 'When did tactile stimulation produce the lasting change described in rats?', 1, [
    ['During an adult stress response', 'Adult stimulation did not reproduce the lasting early-life effect.'],
    ['During early postnatal life', 'The rat studies identify an early postnatal critical period.'],
    ['During prenatal cortical migration', 'The experiment concerned tactile stimulation of pups after birth.'],
  ])),
];

const question = (id, type, difficulty, prompt, fields, ...modelAnswer) => ({
  id: `l09-q-${id}`, type, difficulty, points: 1, prompt, ...fields, modelAnswer,
});
const items = rows => rows.map(([text, answer, explanation]) => ({ text, answer, explanation }));
const statements = rows => rows.map(([statement, answer, justification]) => ({ statement, answer, [answer ? 'justification' : 'correction']: justification }));
const select = rows => rows.map(([text, correct, feedback]) => ({ text, correct, feedback }));
const lectureQuiz = [
  question('label', 'label', 'easy', 'Identify the three sources in the endocrine stress pathway.', {
    hotspots: { ...hpa.props, src: image(hpaDrawing(false)), alt: 'Three numbered boxes linked by CRH and ACTH, with cortisol leaving the last box.' },
    wordBank: ['Adrenal cortex', 'Posterior pituitary', 'Hypothalamus', 'Anterior pituitary'],
  }, 'Marker 1 is the hypothalamus, which releases CRH.', 'Marker 2 is the anterior pituitary, which releases ACTH.', 'Marker 3 is the adrenal cortex, which releases cortisol.'),
  question('stressor', 'mc', 'easy', 'Which division mediates the autonomic fight-or-flight response?', {
    correct: 1, options: options([
      ['Parasympathetic division', 'Parasympathetic activity supports a different set of autonomic responses.'],
      ['Sympathetic division', 'The sympathetic division mediates autonomic fight-or-flight responses.'],
      ['Enteric nervous system', 'The enteric system regulates the gastrointestinal tract.'],
    ]),
  }, 'Threat can recruit several outputs. Sympathetic activation is the rapid autonomic component.'),
  question('symptoms', 'fillBlank', 'easy', 'Name the three symptom domains illustrated by these observations.', {
    text: 'A favourite hobby gives no pleasure ___. Sleep is persistently disrupted ___. The person cannot stay focused while reading ___.',
    blanks: [
      { accept: ['anhedonia', 'loss of pleasure', 'reduced pleasure', 'loss of interest or pleasure'] },
      { accept: ['sleep disturbance', 'sleep disorder', 'sleep disruption', 'insomnia', 'sleep'] },
      { accept: ['poor concentration', 'difficulty concentrating', 'concentration difficulty', 'impaired concentration', 'concentration', 'cognition'] },
    ],
  }, 'Loss of pleasure is anhedonia.', 'Persistent difficulty sleeping belongs to the sleep domain.', 'Trouble focusing is a concentration difficulty in the cognitive domain.'),
  question('phobias', 'classify', 'medium', 'Match each pattern to the best entry in the slide’s historical table.', {
    categories: ['Agoraphobia', 'Generalised anxiety disorder', 'Panic disorder', 'Specific phobia', 'Social phobia'],
    items: items([
      ['A ferry is feared because leaving or getting help would be difficult.', 'Agoraphobia', 'The concern is about escape or access to help.'],
      ['Worry persists across health, work and family even on uneventful days.', 'Generalised anxiety disorder', 'Persistent worry spans several areas of life.'],
      ['Intense fear and palpitations recur abruptly without a predictable trigger.', 'Panic disorder', 'The defining pattern is recurrent panic attacks.'],
      ['Fear is reliably triggered by seeing a spider.', 'Specific phobia', 'The feared object is specific.'],
      ['Fear centres on being judged while eating with other people.', 'Social phobia', 'The concern is scrutiny by others.'],
    ]),
  }, 'Identify what drives the fear in each case. Escape suggests agoraphobia, broad persistent worry signals generalised anxiety, and recurring abrupt attacks indicate panic. A specific object points to specific phobia and scrutiny to social phobia.'),
  question('hpa-order', 'order', 'medium', 'Put the hormone release events in order after stress recruits the HPA axis.', {
    items: ['Hypothalamic CRH reaches the anterior pituitary', 'Pituitary ACTH enters the bloodstream', 'Adrenal cortex releases cortisol'],
  }, 'CRH acts first on the anterior pituitary.', 'ACTH travels from the anterior pituitary to the adrenal cortex.', 'Adrenal cortisol enters the circulation.'),
  question('drug-comparison', 'inlineChoice', 'medium', 'Complete the benzodiazepine–SSRI comparison for released transmitter.', {
    sentences: [
      { text: 'Benzodiazepines bind ___ and ___ the response to released GABA.',
        choices: [{ options: ['at an allosteric GABA-A site', 'at the transmitter GABA-A site'], answer: 0 },
          { options: ['weaken', 'enhance'], answer: 1 }], explanation: 'Allosteric binding enhances the GABA-dependent receptor response.' },
      { text: 'SSRIs target ___ and ___ released serotonin signalling.',
        choices: [{ options: ['the serotonin receptor', 'the serotonin transporter'], answer: 1 },
          { options: ['prolong', 'shorten'], answer: 0 }], explanation: 'Transporter inhibition slows removal of released serotonin.' },
      { text: '___ directly activates its transmitter’s binding site in these mechanisms.',
        choices: [{ options: ['Neither class', 'The benzodiazepine', 'The SSRI'], answer: 0 }],
        explanation: 'One acts at an allosteric site and the other acts at a transporter.' },
    ],
  }, 'Benzodiazepines enhance GABA signalling through a separate site on GABA-A.', 'SSRIs inhibit serotonin reuptake at the transporter and prolong serotonin signalling.', 'Neither class replaces its transmitter at the transmitter’s binding site.'),
  question('diagnostic-reasoning', 'trueFalse', 'medium', 'Decide whether each claim follows from a shared symptom-based diagnosis. Correct the false claims.', {
    statements: statements([
      ['Two people assigned the same diagnosis can have different biological causes.', true, 'A shared clinical pattern can arise by several routes.'],
      ['A shared diagnosis implies an identical response to a drug that targets one pathway.', false, 'People with the same diagnosis can respond differently because the targeted mechanism can differ.'],
    ]),
  }, 'Diagnosis describes a pattern of signs and symptoms. Etiology explains how the pattern arose, so different causal mechanisms can yield different responses to the same treatment.'),
  question('stress-feedback', 'classify', 'medium', 'Give the direction of each change in the simplified HPA feedback model.', {
    categories: ['Increase', 'Decrease'],
    items: items([
      ['Hypothalamic CRH release when the amygdala becomes more active.', 'Increase', 'Amygdala drive increases hypothalamic CRH release.'],
      ['Hypothalamic CRH release when hippocampal feedback strengthens.', 'Decrease', 'Hippocampal feedback inhibits CRH release.'],
      ['Time cortisol stays elevated after a stressor when hippocampal feedback is impaired.', 'Increase', 'Weaker feedback lets cortisol stay elevated longer.'],
    ]),
  }, 'Amygdala activation increases CRH. Hippocampal feedback decreases CRH. With impaired hippocampal feedback, the cortisol rise lasts longer.'),
  question('drug-targets', 'matchPairs', 'medium', 'Match each intervention to the process it directly changes in the slide model.', {
    right: [
      { id: 'sert', text: 'Uptake of released serotonin selectively' },
      { id: 'mao', text: 'Enzymatic breakdown of monoamines' },
      { id: 'gaba', text: 'GABA-dependent receptor response' },
      { id: 'both', text: 'Uptake of both norepinephrine and serotonin' },
      { id: 'agonist', text: 'Direct activation at the GABA binding site' },
    ],
    left: items([
      ['Benzodiazepines', 'gaba', 'Enhance the response to GABA.'],
      ['Tricyclics such as imipramine', 'both', 'Block both transporters in the slide model.'],
      ['MAO inhibitors', 'mao', 'Inhibit enzymatic destruction of monoamines.'],
      ['SSRIs', 'sert', 'Selectively inhibit the serotonin transporter.'],
    ]),
  }, 'Separate receptor modulation from transmitter removal. Transporter blockers slow reuptake. MAO inhibitors reduce intracellular breakdown.'),
  question('care-results', 'groupItems', 'medium', 'Sort the rat findings by direction after greater early maternal care.', {
    groups: ['Higher', 'Lower'],
    items: [
      { text: 'Hypothalamic CRH expression', group: 'Lower', explanation: 'Greater care was associated with less hypothalamic CRH.' },
      { text: 'Hippocampal GR expression', group: 'Higher', explanation: 'Early tactile care increased GR expression.' },
      { text: 'Adult anxiety-like behaviour', group: 'Lower', explanation: 'Adult rats showed less anxiety-like behaviour.' },
    ],
  }, 'The rat studies reported higher hippocampal GR expression, lower hypothalamic CRH and less anxiety-like behaviour in adulthood.'),
  question('vulnerability', 'trueFalse', 'medium', 'Evaluate the claims about genetic susceptibility and experience. Correct the false claims.', {
    statements: statements([
      ['A person can inherit greater vulnerability and still remain free of the disorder.', true, 'Susceptibility is probabilistic and interacts with life experience.'],
      ['Early adversity is part of the inherited diathesis in this comparison.', false, 'Early adversity is an environmental exposure.'],
    ]),
  }, 'Genetic susceptibility raises baseline risk. Environmental stress is experienced exposure that can interact with inherited risk. Inherited vulnerability alone does not fix the outcome.'),
  question('critical-period', 'multiSelect', 'medium', 'Which statements follow from the lecture’s maternal-care evidence?', {
    options: select([
      ['Early tactile stimulation can recruit hippocampal serotonergic input.', true, 'This input links tactile stimulation to greater GR expression.'],
      ['Adult tactile stimulation reproduced the same lasting pup effect.', false, 'The lasting effect was observed in the early postnatal period.'],
      ['Childhood adversity in humans is associated with greater later risk.', true, 'The link is a risk association supported by the reading.'],
      ['The rat results identify a single proven causal route in humans.', false, 'Rat experiments suggest a route. Human risk associations alone cannot prove it.'],
    ]),
  }, 'Separate the manipulated rat mechanism from the human association.', 'The timing in the rat experiments matters, and the human data support a risk link.'),
  question('blocked-branch', 'interpret', 'hard', 'Read the diagram. With intact parallel outputs and the shown interruption, which outcome should follow?', {
    figure: blockedPAG, correct: 0, options: options([
      ['Weaker avoidance with retained cortisol recruitment', 'The interrupted PAG branch supports avoidance. The hypothalamic branch remains intact.'],
      ['Weaker cortisol recruitment with retained avoidance', 'The interrupted branch reaches PAG. Cortisol recruitment follows the hypothalamic branch.'],
      ['Weaker vigilance with retained avoidance behaviour', 'Diffuse modulators remain connected. The interrupted PAG branch supports avoidance.'],
    ]),
  }, 'Locate the blunt bar on the middle branch, which leads to PAG.', 'PAG contributes to avoidance, so selectively blocking that branch blunts avoidance.', 'The hypothalamic route remains available for cortisol recruitment.'),
  question('feedback-rescue', 'clinicalCase', 'hard', 'Which pattern should follow in the simplified model?', {
    scenario: 'Two stressed groups have equally prolonged cortisol responses and reduced hippocampal GR expression. A manipulation restores GR expression in one group. Amygdala input and adrenal responsiveness are held constant.',
    correct: 2, options: options([
      ['Stronger CRH drive and longer cortisol elevation', 'Restored hippocampal feedback restrains CRH drive.'],
      ['Unchanged CRH drive and longer cortisol elevation', 'The manipulation restores responsiveness to cortisol upstream of CRH release.'],
      ['Weaker CRH drive and shorter cortisol elevation', 'Stronger hippocampal feedback limits hypothalamic drive during recovery.'],
    ]),
  }, 'More hippocampal GRs restore sensitivity to circulating cortisol.', 'That strengthens inhibitory feedback to hypothalamic CRH neurons.', 'Reduced CRH drive limits downstream ACTH and cortisol, shortening recovery.'),
  question('drug-combination', 'clinicalCase', 'hard', 'Which immediate result should the investigator expect in the taught synaptic model?', {
    scenario: 'A preparation releases serotonin normally, but an investigator has already fully blocked the serotonin transporter. In a separate circuit the investigator evokes normal GABA release, then adds both an SSRI and a benzodiazepine.',
    correct: 1, options: options([
      ['Further slowing of serotonin uptake only', 'The transporter is already blocked. Released GABA can still be modulated.'],
      ['Further enhancement of GABA signalling only', 'Transporter blockade occludes the uptake effect. Benzodiazepines can still enhance the response to released GABA.'],
      ['Further changes in both transmitter pathways', 'The benzodiazepine has a target, but the fully blocked transporter has no remaining uptake to inhibit.'],
    ]),
  }, 'The SSRI normally reduces serotonin removal through a transporter that is already fully blocked.', 'The separate GABA circuit supplies released GABA to GABA-A receptors.', 'The benzodiazepine can still bind its allosteric site and increase the response.'),
  question('adaptation', 'multiSelect', 'hard', 'Which conclusions are supported by the experimental pattern?', {
    scenario: 'Two experimental compounds elevate synaptic norepinephrine equally on day one. Only the compound that later increases hippocampal GR expression improves prolonged cortisol recovery in the study.',
    options: select([
      ['The early norepinephrine increase alone fails to explain the difference in recovery.', true, 'Both drugs share that early change but differ in recovery.'],
      ['More hippocampal GRs could shorten recovery by strengthening feedback on CRH.', true, 'Cortisol sensitivity can reinforce inhibitory HPA feedback.'],
      ['The findings establish hippocampal GR increases as necessary for every antidepressant response.', false, 'This comparison suggests a mechanism and does not test necessity across treatments.'],
      ['A direct manipulation of GR expression would help test the proposed feedback mechanism.', true, 'This would help distinguish a causal role from a correlated change.'],
    ]),
  }, 'Compare the shared early synaptic effect with the different later outcomes.', 'More hippocampal GRs could increase cortisol sensitivity and strengthen CRH inhibition, shortening cortisol recovery.', 'The comparison offers a candidate pathway. Establishing causality would require a direct test of the GR change.'),
];

const entry = registry.find(({ id }) => id === 'L09');
export default {
  meta: { ...entry, examLabel: 'Expected mini-exam',
    pages: [{ chapter: 22, from: 753, to: 763 }, { chapter: 22, from: 766, to: 769 }],
  },
  objectives: [
    'Distinguish adaptive fear, anxiety, clinical symptom patterns and biological explanations.',
    'Trace the HPA axis and predict the effects of amygdala drive, hippocampal feedback and early care.',
    'Compare benzodiazepines, SSRIs and the antidepressant mechanisms shown in the lecture.',
    'Explain how stress, environmental experience and inherited vulnerability can interact in mood disorders.',
  ],
  prerequisites: [
    { lectureId: 'L03', text: 'Synaptic signalling and receptor action' },
    { lectureId: 'L07', text: 'Hypothalamus, neuromodulation and learned fear' },
  ],
  sections,
  recap: {
    intro: 'Key comparisons for a handwritten study sheet.',
    terms: [
      ['Diagnosis and etiology', 'Signs and symptoms define a diagnosis. Etiology explains its causes.'],
      ['Fear and anxiety', 'Adaptive fear responds to threat. Inappropriate fear can occur without immediate danger.'],
      ['HPA axis', 'Hypothalamic CRH, pituitary ACTH, adrenal cortisol.'],
      ['Push–pull', 'Amygdala increases CRH release. Hippocampal GR-mediated feedback lowers it.'],
      ['Chronic stress', 'Weak feedback can prolong cortisol elevation and reinforce dysregulation.'],
      ['Benzodiazepines', 'Allosteric GABA-A modulators that enhance the response to GABA.'],
      ['SSRIs', 'Inhibit serotonin uptake. Synaptic effects precede therapeutic effects.'],
      ['MDD domains', 'Anhedonia is loss of pleasure. Sleep disturbance and concentration difficulty are separate symptom domains.'],
      ['Monoamine hypothesis', 'Deficient modulatory signalling is proposed. Timing and the cocaine counterexample motivate a wider account.'],
      ['Diathesis–stress', 'Inherited risk can interact with environmental stress.'],
      ['Early care in rats', 'Higher hippocampal GRs, lower hypothalamic CRH, and less adult anxiety-like behaviour.'],
    ].map(([term, definition]) => ({ term, definition })),
  },
  lectureQuiz,
};
