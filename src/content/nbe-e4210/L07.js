const fig = name => new URL(`../../assets/figures/nbe-e4210/L07/${name}.webp`, import.meta.url).href;
const region = (id, label, x, y, body) => ({ id, label, x, y, w: 7, h: 7, shape: 'ellipse', body });
const images = {
  anatomy: { aspect: 297/190, alt: 'Medial temporal structures in a sagittal brain view.', regions: [
    region('a','Amygdala',35,82,'The amygdala lies anterior to the hippocampus in the medial temporal lobe.'),
    region('h','Hippocampus',48,87,'The hippocampus curves through the medial temporal lobe and belongs to the historical limbic circuit.'),
  ] },
  control: { aspect: 540/837, alt: 'Four communication patterns, from a specific synapse to blood-borne and divergent neural signals.', regions: [
    region('p','Point-to-point transmission',77,10,'A restricted synaptic target receives a brief signal.'),
    region('s','Secretory hypothalamus',65,35,'Neurosecretory neurons release hormones into blood, reaching distant targets.'),
    region('a','Autonomic nervous system',64,63,'Interconnected peripheral neurons coordinate visceral targets.'),
    region('d','Diffuse modulatory systems',76,88,'Highly divergent CNS projections influence many neurons.'),
  ] },
  modulators: { aspect: 1509/351, alt: 'Three sagittal brain maps show green, red and blue projection systems.', regions: [
    region('n','Locus coeruleus',17,61,'This pontine origin sends norepinephrine widely through the CNS.'),
    region('r','Raphe nuclei',48,61,'These midline brain-stem nuclei send serotonin to widespread targets.'),
    region('s','Substantia nigra',87,54,'This midbrain dopamine source projects to the striatum for movement initiation.'),
    region('v','Ventral tegmental area',84,63,'This midbrain dopamine source projects to limbic and frontal regions for reinforcement.'),
  ] },
  cholinergic: { aspect: 453/384, alt: 'Orange cholinergic projections from basal forebrain and brain stem.', regions: [
    region('s','Medial septal nuclei',34,65,'Medial septal neurons supply acetylcholine to the hippocampus.'),
    region('b','Basal nucleus of Meynert',40,72,'This basal forebrain group supplies much of the neocortex with acetylcholine.'),
    region('p','Pontomesencephalotegmental complex',53,78,'This pons/midbrain group projects mainly to dorsal thalamus and also forebrain.'),
  ] },
  hypothalamus: { aspect: 132/141, alt: 'Coronal hypothalamic zones beside the third ventricle.', regions: [
    region('l','Lateral zone',72,38,'The lateral zone lies farthest from the ventricular wall.'),
    region('m','Medial zone',61,48,'The medial zone lies between lateral and periventricular zones.'),
    region('p','Periventricular zone',51,59,'This thin zone beside the third ventricle contains autonomic and neurosecretory cells.'),
    region('t','Third ventricle',42,35,'The hypothalamus forms part of the walls of the third ventricle.'),
  ] },
  posterior: { aspect: 501/528, alt: 'Hypothalamic axons descend to a posterior pituitary capillary bed.', regions: [
    region('m','Magnocellular neurosecretory cells',74,27,'These hypothalamic neurons synthesize oxytocin and vasopressin.'),
    region('p','Posterior pituitary',75,81,'Hypothalamic axon terminals release neurohormones into capillaries here.'),
    region('a','Anterior pituitary',52,78,'The anterior lobe is glandular and is controlled through portal blood.'),
  ] },
  anterior: { aspect: 426/597, alt: 'Small hypothalamic neurosecretory cells release into portal capillaries above the anterior pituitary.', regions: [
    region('p','Parvocellular neurosecretory cells',68,31,'These cells release hypophysiotropic hormones into the portal circulation.'),
    region('v','Portal circulation',45,55,'Blood links the hypothalamic capillary bed to the anterior pituitary.'),
    region('a','Anterior pituitary',56,75,'Gland cells respond by releasing or withholding their own hormones.'),
  ] },
  ans: { aspect: 546/483, alt: 'Three output pathways: a direct somatic axon and two autonomic ganglionic chains.', regions: [
    region('s','Somatic motor pathway',13,45,'One CNS motor neuron innervates skeletal muscle.'),
    region('y','Sympathetic ganglion',49,36,'The typical sympathetic ganglion is close to the CNS.'),
    region('p','Parasympathetic ganglion',86,66,'The typical parasympathetic ganglion lies near or in the target.'),
  ] },
  'ans-organs': { aspect:336/405,alt:'Sympathetic and parasympathetic projections surround a central column of visceral organs.',regions:[
    region('s','Sympathetic division',12,45,'Thoracolumbar outflow recruits widespread acute-action responses.'),
    region('p','Parasympathetic division',89,45,'Craniosacral outflow reaches ganglia near visceral targets and supports maintenance functions.'),
  ] },
  emotions: { aspect: 1605/600, alt: 'Six body maps and a neutral comparison use warm and cool colours for reported activity.', regions: [
    region('a','Anger',5,47,'Anger is one of the six basic categories shown on the slide.'),
    region('f','Fear',20,47,'Fear is a basic category; the maps depict reported sensations, not direct nerve recordings.'),
    region('d','Disgust',35,47,'Disgust is distinct from fear in the six-category scheme.'),
    region('h','Happiness',50,47,'Happiness shows widespread reported activation in this slide figure.'),
    region('s','Sadness',65,47,'Sadness shows relatively reduced reported limb activity in this slide figure.'),
    region('u','Surprise',80,47,'Surprise is the sixth basic emotion; neutral is a comparison, not a seventh emotion.'),
  ] },
  masking: { aspect: 316/190, alt: 'Conditioning with faces and a sound, then a briefly angry face followed by a neutral face.', regions: [
    region('a','Angry face',73,28,'The conditioned threatening cue can be masked from conscious perception.'),
    region('n','Neutral mask',92,28,'The following expressionless face is the face the participant reports seeing.'),
    region('b','Amygdala activity',80,91,'Conditioned masked cues can evoke amygdala activity despite absent conscious recognition.'),
  ] },
  elicitation: { aspect: 307/220, alt: 'Emotion elicitation schematic links appraisal to expression, interoception and subjective experience.', regions: [
    region('a','Appraisal',50,7,'The event is evaluated, here as doom or disease after seeing blood/injury.'),
    region('e','Emotional expression',85,45,'Facial, vocal, motor and autonomic changes are observable outputs.'),
    region('i','Interoception',85,88,'Bodily signals contribute to the perception of internal state.'),
    region('s','Subjective experience',49,88,'Feeling disgusted is an experience, distinct from measured expression.'),
  ] },
  papez: { aspect: 546/549, alt: 'Papez circuit: cortical boxes above a loop through hippocampus, hypothalamus and anterior thalamus.', regions: [
    region('n','Neocortex',51,6,'Papez proposed emotional coloring of other cortical activity.'),
    region('c','Cingulate cortex',51,39,'Papez linked this cortex to emotional experience.'),
    region('h','Hippocampus',82,63,'The cingulate pathway continues through hippocampus and fornix.'),
    region('y','Hypothalamus',52,94,'Papez assigned emotional expression to this autonomic controller.'),
    region('t','Anterior thalamic nuclei',19,65,'These relay hypothalamic influences back toward cingulate cortex.'),
  ] },
  dimensions: { aspect: 247/244, alt: 'A two-dimensional graph places example situations at different pleasantness and arousal levels.', regions: [
    region('v','Valence',8,44,'The vertical dimension ranges from unpleasant to pleasant.'),
    region('a','Arousal',56,93,'The horizontal dimension ranges from low to high activation.'),
  ] },
  amygdala: { aspect: 339/357, alt: 'Amygdala cross-section: a purple outer group, red lower group and small green lateral nucleus.', regions: [
    region('c','Corticomedial nuclei',40,15,'These nuclei receive olfactory inputs.'),
    region('b','Basolateral nuclei',46,69,'These nuclei receive visual, auditory, gustatory and tactile inputs.'),
    region('n','Central nucleus',83,40,'This nucleus provides major outputs coordinating fear responses.'),
  ] },
  conditioning: { aspect: 918/486, alt: 'Four experimental panels show tone/shock acquisition, tone testing, repeated tone alone and a final test.', regions: [
    region('a','Acquisition',13,37,'Pairing CS and US builds a conditioned response.'),
    region('e','Expression test',38,37,'The CS alone evokes fear-related behavior after conditioning.'),
    region('x','Extinction training',64,37,'Repeated CS without US decreases the conditioned response.'),
    region('t','Extinction test',89,37,'A later CS-only test assesses the response after extinction training.'),
  ] },
  fear: { aspect: 1200/495, alt: 'Tone and shock pathways converge on basolateral amygdala, with output toward hypothalamus, PAG and cortex.', regions: [
    region('a','Auditory cortex',29,78,'The CS tone reaches the amygdala by this cortical route in the taught diagram.'),
    region('s','Somatosensory cortex',27,45,'The US shock reaches the amygdala by this cortical route.'),
    region('b','Basolateral nuclei',47,28,'CS and US inputs converge and synaptic strength changes here.'),
    region('c','Central nucleus',58,26,'Amygdala output is relayed toward response systems.'),
    region('h','Hypothalamus',76,6,'This route coordinates the autonomic response.'),
    region('p','Periaqueductal gray',76,33,'This brain-stem route organizes behavioral reactions.'),
    region('x','Cerebral cortex',76,59,'Cortical activity contributes to emotional experience.'),
  ] },
  plasticity: { aspect: 999/441, alt: 'Three cellular panels show the same lateral-amygdala neuron before, during and after conditioning.', regions: [
    region('b','Before conditioning',25,55,'CS synapses evoke initially weak EPSPs.'),
    region('d','During conditioning',58,55,'CS and US coactivity allows calcium-dependent synaptic change.'),
    region('a','After conditioning',91,55,'The CS input has strengthened and can evoke a larger response.'),
  ] },
  aggression: { aspect: 414/426, alt: 'Cortex projects to amygdala, then toward hypothalamus and midbrain output regions.', regions: [
    region('c','Cerebral cortex',50,7,'Cortical influences contribute to the aggression network.'),
    region('a','Amygdala',50,30,'The amygdala influences hypothalamic and midbrain responses.'),
    region('h','Hypothalamus',19,69,'Medial and lateral sites can recruit different aggressive patterns.'),
    region('p','PAG and ventral tegmental area',79,70,'These midbrain regions contribute to affective and predatory output.'),
  ] },
};
const hot = name => ({ src: fig(name), ...images[name], layout: 'stack', gutter: 'auto' });
const extraDistractors = {
  anatomy:     ['Hypothalamus','Thalamus'],
  control:     ['Somatic motor system','Sympathetic ganglion'],
  modulators:  ['Basal forebrain complex','Medial septal nuclei'],
  cholinergic: ['Locus coeruleus','Substantia nigra'],
  hypothalamus:['Corpus callosum','Thalamus'],
  posterior:   ['Subfornical organ','Median eminence'],
  anterior:    ['Posterior pituitary','Magnocellular neurons'],
  ans:         ['Adrenal medulla','Peripheral ganglia'],
  'ans-organs':['Enteric division','Sympathetic ganglion'],
  emotions:    ['Neutral','Anxiety'],
  masking:     ['Skin conductance','Facial expression'],
  elicitation: ['Bodily feedback','Sensory detection'],
  papez:       ['Basal ganglia','Amygdala'],
  dimensions:  ['Intensity','Sadness'],
  amygdala:    ['Stria terminalis','Hippocampus'],
  conditioning:['Conditioned response','Fear conditioning'],
  fear:        ['Locus coeruleus','Substantia nigra'],
  plasticity:  ['Extinction training','Conditioned stimulus'],
  aggression:  ['Locus coeruleus','Raphe nuclei'],
};
const label = (name,id,prompt) => ({ id, type: 'label', difficulty: 'easy', points: 1, prompt,
  hotspots: hot(name), wordBank: [...[...images[name].regions].reverse().map(r=>r.label),...(extraDistractors[name]||[])],
  modelAnswer: images[name].regions.map((r,i)=>`${i+1}. ${r.label}. ${r.body}`) });

// Entries carry the teaching feedback, including the near-miss alternatives.
let conceptIndex=0;
function q(id,prompt,entries) {
  const correct=conceptIndex++ % entries.length;
  const options=entries.map(([text,feedback])=>({text,feedback}));
  const first=options.shift(); options.splice(correct,0,first);
  return {id,prompt,correct,options};
}
function section(id,title,figure,questions) {
  return { id,title,mode:'questions-only', ...(figure ? {figure:label(figure,`${id}-label`,'Identify the marked parts or stages using the word bank.')} : {}), conceptQuiz:questions.map((x,i)=>q(`${id}-${i+1}`,...x)) };
}

export default {
  meta: { id:'L07',number:7,title:'Chemical control and brain mechanisms of emotion',chapters:[15,18],
    pages:[{chapter:15,from:525,to:530},{chapter:15,from:532,to:545},{chapter:18,from:616,to:625},{chapter:18,from:630,to:641}],
    lectureDate:'2026-10-21',examDate:'2026-11-06' },
  objectives:[
    'Distinguish hormonal, autonomic and diffuse modulatory control.',
    'Trace pituitary and stress pathways and compare autonomic divisions.',
    'Separate emotional experience, expression and recognition when interpreting evidence.',
    'Identify learned-fear mechanisms and the networks that regulate aggression.',
  ],
  prerequisites:[{text:'Neurotransmitters and metabotropic signaling',lectureId:'L03'}],
  sections:[
    section('orientation','Emotion: anatomy, experience and expression','anatomy',[
      ['What does affective neuroscience investigate?',[
        ['Neural bases of emotion and mood','Affective neuroscience studies how brain activity relates to emotion and mood.'],
        ['Neural bases of sensation alone','Sensory neuroscience studies input processing; affective neuroscience concerns emotion and mood.'],
        ['Neural bases of movement alone','Motor neuroscience studies movement; emotion also involves visceral and subjective components.']]],
      ['Which is emotional experience rather than expression?',[
        ['Reporting a conscious feeling of fear','Experience means subjective feelings; a verbal report gives access to that experience.'],
        ['Showing a defensive facial expression','Facial movement is expression, an observable output that does not directly reveal the feeling.'],
        ['Developing a measurable racing heart','Heart-rate change is autonomic expression; it is not itself a report of conscious fear.']]],
      ['Where are the amygdala and hippocampus in this anatomy reminder?',[
        ['Within the medial temporal region','The amygdala lies near the temporal pole, anterior to the curved hippocampus.'],
        ['Within the dorsal parietal region','The dorsal parietal cortex is not the medial temporal location shown here.'],
        ['Within the posterior occipital region','Occipital cortex is posterior; amygdala and hippocampus lie in the medial temporal region.']]],
      ['What can an animal freezing tell an observer directly?',[
        ['It shows a behavioral expression','Freezing is measurable expression. The animal cannot directly report its subjective feeling.'],
        ['It reports a conscious experience','Behavior supports inference about emotion but does not directly report conscious experience.'],
        ['It identifies one dedicated center','A behavior does not establish a single brain center; expression depends on interacting circuits.']]],
    ]),
    section('control','Three widespread control systems','control',[
      ['How does the secretory hypothalamus reach distant targets?',[
        ['By releasing hormones into the bloodstream','Blood carries neurohormones to distant brain and body targets. HW4 distinguishes this from neural heart control.'],
        ['By sending motor axons to skeletal fibers','Direct lower motor axons control skeletal muscle; this is somatic output.'],
        ['By releasing transmitter at one local cleft','Point-to-point synapses restrict signaling in space and time rather than distributing hormones in blood.']]],
      ['Which route is the ANS route to a racing heart?',[
        ['Hypothalamus, preganglionic neuron, ganglion, postganglionic neuron, heart','The hypothalamus coordinates the two-neuron peripheral output chain; the signal to the heart is neural.'],
        ['Hypothalamus, portal blood, pituitary, adrenal cortex, heart','This resembles the endocrine stress route; it does not describe direct sympathetic neural control of heart rate.'],
        ['Hypothalamus, preganglionic neuron, adrenal medulla, bloodstream, heart','This is the sympathetic adrenal-medullary hormonal route, rather than the postganglionic neural route to the heart.']]],
      ['What distinguishes diffuse modulatory systems?',[
        ['Divergent CNS axons and prolonged receptor effects','Small cell groups project widely within the CNS; metabotropic actions extend their effects in time and influence arousal and mood.'],
        ['Restricted CNS axons and only brief receptor effects','Restricted, rapid signaling describes the point-to-point contrast, not the diffuse system.'],
        ['Peripheral ganglia and circulating glandular hormones','Peripheral ganglia belong to ANS routes; circulating hormones belong to endocrine signaling.']]],
      ['Why can cortisol-related effects outlast a brief neural alarm?',[
        ['Blood-borne hormones persist until cleared and their cellular effects can last','Hormonal distribution and clearance are slower than termination of a brief synaptic signal; HW4 asks this comparison.'],
        ['Endocrine axons conduct impulses longer than all autonomic axons','The distinguishing route is hormone transport in blood, not exceptionally long action potentials.'],
        ['Autonomic neurons cannot stop releasing transmitter after an alarm','Neural activity and transmitter action can decline rapidly; endocrine persistence does not require ongoing autonomic discharge.']]],
    ]),
    section('monoamines','Diffuse modulation: norepinephrine, serotonin and dopamine','modulators',[
      ['Which pairing identifies the central norepinephrine source?',[
        ['Locus coeruleus in the pons','Locus coeruleus projects to cortex, thalamus, cerebellum and spinal cord; novel salient events activate it.'],
        ['Raphe nuclei along the midline','Raphe nuclei use serotonin; caudal groups also modulate spinal pain signals.'],
        ['Substantia nigra in the midbrain','Substantia nigra uses dopamine and projects strongly to the striatum.']]],
      ['When is locus coeruleus activity particularly strong?',[
        ['During novel, unexpected sensory events','Norepinephrine can increase cortical responsiveness to salient events, supporting alertness and efficient processing.'],
        ['During quiet, nonvigilant resting periods','Locus coeruleus activity is comparatively low when the animal is not vigilant.'],
        ['Only during voluntary skeletal contractions','Locus coeruleus is a broad arousal/modulatory system, not a direct skeletal motor output.']]],
      ['Which transmitter and distribution characterize raphe nuclei?',[
        ['Serotonin, with projections across levels of the CNS','Rostral raphe innervate much of the brain; caudal raphe innervate spinal cord and modulate pain.'],
        ['Dopamine, with projections confined to the striatum','The substantia nigra-to-striatum route is dopaminergic; raphe projections are serotonergic and widespread.'],
        ['Acetylcholine, with projections confined to the pituitary','Raphe nuclei use serotonin. Pituitary secretion is not a diffuse cholinergic projection system.']]],
      ['Which statement links raphe function to brain state?',[
        ['Raphe firing is greater in active wakefulness than in sleep','Raphe activity participates in arousal, mood and emotional behavior; sleep stages themselves are outside L07 scope.'],
        ['Raphe firing occurs only during the secretion of cortisol','Raphe neurons are not simply the HPA hormone route; serotonin modulates several CNS functions.'],
        ['Raphe firing directly contracts every skeletal muscle','Somatic motor neurons contract muscle. Raphe neurons modulate circuits, including pain-related spinal processing.']]],
      ['Which dopamine projection helps initiate voluntary movement?',[
        ['Substantia nigra to caudate and putamen','The striatum receives nigral dopamine; degeneration of these neurons produces Parkinsonian motor problems.'],
        ['Ventral tegmental area to frontal and limbic regions','The mesocorticolimbic route is linked to reinforcement and assigning value to behavior.'],
        ['Locus coeruleus to the cortex and cerebellum','This is a norepinephrine route involved in responsiveness and arousal, not nigrostriatal dopamine.']]],
      ['Which pairing describes the reinforcement-related dopamine system?',[
        ['Ventral tegmental area, frontal and limbic targets','The mesocorticolimbic dopamine projection supports reinforcement; it is distinct from the nigrostriatal motor route.'],
        ['Substantia nigra, caudate and putamen targets','This dopaminergic projection facilitates movement initiation rather than defining the reinforcement-related route.'],
        ['Raphe nuclei, spinal and broad cortical targets','This system uses serotonin and participates in mood, arousal and pain modulation.']]],
    ]),
    section('acetylcholine','Diffuse modulation: acetylcholine','cholinergic',[
      ['Which basal forebrain source supplies the hippocampus?',[
        ['The medial septal nuclei','Medial septal cholinergic neurons innervate the hippocampus and are implicated in learning and memory.'],
        ['The basal nucleus of Meynert','Meynert supplies much of the neocortex; the medial septal nuclei supply the hippocampus.'],
        ['The pontine locus coeruleus','Locus coeruleus supplies norepinephrine, not the basal forebrain cholinergic projection.']]],
      ['Which source supplies much of the neocortical acetylcholine?',[
        ['Basal nucleus of Meynert','This basal forebrain group provides much of the neocortical cholinergic innervation.'],
        ['Midline serotonergic raphe','Raphe nuclei use serotonin, not acetylcholine.'],
        ['Midbrain substantia nigra','Substantia nigra uses dopamine and projects to striatum.']]],
      ['Where does the brain-stem cholinergic complex mainly act?',[
        ['On dorsal thalamic relay excitability','The pontomesencephalotegmental complex lies in pons/midbrain tegmentum and also links to forebrain.'],
        ['On adrenal cortical cortisol secretion','ACTH from anterior pituitary stimulates cortisol secretion; this is not the brain-stem cholinergic relay route.'],
        ['On posterior pituitary oxytocin secretion','Magnocellular hypothalamic axons release oxytocin; the brain-stem complex modulates thalamic and forebrain circuits.']]],
      ['What is a careful statement about basal forebrain cholinergic cells?',[
        ['They contribute to arousal and memory and can degenerate in Alzheimer disease','These cells are affected early, but widespread neuronal loss prevents attributing the whole disorder solely to acetylcholine.'],
        ['They alone produce memory and their loss fully explains Alzheimer disease','The text links these cells to memory but explicitly does not establish a unique cholinergic explanation of the disorder.'],
        ['They only control muscle and have no role in cortical excitability','Acetylcholine also acts at neuromuscular and autonomic synapses, but these diffuse CNS groups modulate cortical state.']]],
    ]),
    section('hypothalamus','Hypothalamic organization','hypothalamus',[
      ['Where is the hypothalamus?',[
        ['Below the thalamus beside the third ventricle','A stalk links it to the pituitary. It coordinates widespread bodily regulation rather than a single sensory map.'],
        ['Above the thalamus beside the lateral ventricle','The hypothalamus lies below the thalamus and forms walls of the third ventricle.'],
        ['Behind the cerebellum beside the fourth ventricle','The hypothalamus is in the diencephalon, not posterior to cerebellum.']]],
      ['Which zones surround the third ventricle?',[
        ['Periventricular, medial and lateral zones','Periventricular cells are closest to the ventricle; medial and lateral zones supply important inputs.'],
        ['Basolateral, corticomedial and central zones','These are groups of amygdala nuclei, not the three hypothalamic zones.'],
        ['Anterior, posterior and lateral zones','Anterior and posterior are useful regional directions, but this slide divides the hypothalamus by distance from the third ventricle.']]],
      ['What are the three periventricular functions named on slide 12?',[
        ['SCN timing, autonomic regulation and neurosecretion','SCN receives retinal input and aligns daily timing to light; other cells regulate ANS or project toward pituitary.'],
        ['Visual relaying, movement initiation and sound localization','These functions do not describe the periventricular trio shown on the slide.'],
        ['Fear recognition, taste perception and voluntary contraction','These are not the named SCN, autonomic and neurosecretory groups.']]],
      ['What does homeostatic hypothalamic control accomplish?',[
        ['It coordinates somatic and visceral responses to internal needs','Temperature and blood composition are kept within physiological ranges; endocrine, autonomic and behavioral responses can cooperate.'],
        ['It relays each sensory input to one restricted cortical location','Precise sensory relay is the dorsal thalamus contrast; hypothalamic effects can be widespread.'],
        ['It maintains all organs solely by conscious voluntary commands','Hypothalamic homeostatic control usually operates without deliberate conscious commands.']]],
    ]),
    section('posterior','Posterior pituitary and kidney–brain feedback','posterior',[
      ['How does the hypothalamus control the posterior pituitary?',[
        ['Magnocellular axons release neurohormones into its capillaries','Oxytocin and vasopressin are synthesized in hypothalamic neurons and transported down their axons.'],
        ['Parvocellular blood signals induce its gland cells to make ACTH','This combines anterior-pituitary control and ACTH with the wrong lobe.'],
        ['Parvocellular releasing hormones arrive through portal capillaries','This is anterior-pituitary control. Posterior release uses magnocellular axon terminals.']]],
      ['Which function belongs to oxytocin?',[
        ['Uterine contraction and milk ejection','Oxytocin promotes birth contractions and the milk letdown reflex; it also participates in social bonding.'],
        ['Kidney water retention and reduced urine','Vasopressin, also called ADH, produces this kidney effect.'],
        ['Adrenal cortisol release and immune suppression','ACTH drives adrenal cortisol; cortisol mobilizes energy and suppresses immune activity.']]],
      ['What stimulates and regulates milk letdown?',[
        ['Suckling or infant sensory cues can recruit hypothalamic oxytocin','Cortical sensory pathways can influence the hypothalamus; anxiety can suppress letdown. Ejection differs from prolactin-supported production.'],
        ['Only direct infant contact can recruit anterior pituitary ACTH','Visual or auditory cues can trigger letdown; ACTH is the cortisol pathway, not oxytocin-mediated ejection.'],
        ['Anterior pituitary prolactin is the immediate milk-ejection signal','Prolactin supports milk production; oxytocin triggers ejection. The two lactation functions should be distinguished.']]],
      ['What is vasopressin also called, and what does it do?',[
        ['ADH, which promotes water retention by the kidneys','Low volume or high salt concentration can promote vasopressin release, reducing urine output.'],
        ['ACTH, which promotes cortisol release by adrenal cortex','ACTH is a different peptide, secreted by anterior pituitary rather than magnocellular terminals.'],
        ['CRH, which promotes ACTH release by anterior pituitary','CRH is the hypothalamic releasing hormone for the HPA pathway, not vasopressin.']]],
      ['What initiates the kidney feedback pathway when blood pressure falls?',[
        ['Renin promotes conversion of liver angiotensinogen toward angiotensin II','Renin generates angiotensin I, then angiotensin II forms; this supports kidney and vessel responses that raise pressure.'],
        ['Kidney vasopressin promotes conversion of liver angiotensinogen to renin','This swaps the signaling substances: kidney renin acts on liver angiotensinogen, while hypothalamic vasopressin is released downstream.'],
        ['Liver renin promotes conversion of kidney angiotensinogen toward ADH','This swaps the sources and end product: kidney renin acts on liver angiotensinogen to generate angiotensin peptides, not ADH.']]],
      ['How does circulating angiotensin II signal the brain?',[
        ['Through the subfornical organ, promoting ADH release and thirst','The subfornical organ lacks a blood-brain barrier and projects to hypothalamic neurosecretory and lateral regions.'],
        ['Through the auditory cortex, suppressing all drinking behavior','Auditory cortex is not the blood-sensing route; this pathway promotes thirst, not its suppression.'],
        ['Through the central amygdala, stopping kidney water retention','The taught renal loop uses the subfornical organ and hypothalamus to increase retention and drinking.']]],
    ]),
    section('anterior','Anterior pituitary and the HPA stress pathway','anterior',[
      ['How are anterior pituitary secretory cells controlled?',[
        ['Parvocellular hormones travel through the portal circulation','Hypophysiotropic hormones enter specialized hypothalamic capillaries and reach anterior pituitary receptors to stimulate or inhibit secretion.'],
        ['Magnocellular axons terminate directly on every glandular cell','Magnocellular axons release into posterior pituitary capillaries; anterior control is via portal blood.'],
        ['Magnocellular hormones arrive through the general circulation','Anterior control uses parvocellular releasing hormones in a specialized portal route; magnocellular terminals release posterior hormones.']]],
      ['Which sequence names the HPA hormone chain?',[
        ['Hypothalamic CRH, pituitary ACTH, adrenal cortisol','CRH enters portal blood; ACTH enters general blood; adrenal cortex produces cortisol.'],
        ['Hypothalamic ACTH, pituitary cortisol, adrenal CRH','This swaps the sources. CRH is hypothalamic, ACTH pituitary and cortisol adrenal.'],
        ['Hypothalamic cortisol, pituitary CRH, adrenal ACTH','Cortisol is the adrenal output; it is not the initiating hypothalamic releasing hormone.']]],
      ['Which adrenal region produces cortisol and with what broad effects?',[
        ['Adrenal cortex, mobilizing energy and suppressing immune activity','The cortex is the outer shell. The medulla is the sympathetic catecholamine output.'],
        ['Adrenal medulla, mobilizing energy and suppressing immune activity','The named cortisol effects are correct, but cortisol is made by the cortex, not medulla.'],
        ['Adrenal cortex, storing all energy and enhancing immune activity','Cortisol mobilizes energy reserves and suppresses immune activity rather than reversing those effects.']]],
      ['How does cortisol help limit its own release?',[
        ['It crosses the blood-brain barrier and inhibits CRH signaling','Cortisol is lipid-soluble. Feedback to hypothalamic receptors limits further HPA drive, while receptors elsewhere support brain effects.'],
        ['It cannot enter the brain and therefore cannot alter CRH signaling','The steroid readily crosses lipid membranes and the blood-brain barrier.'],
        ['It enters the brain and further stimulates hypothalamic CRH','The feedback is negative: cortisol reduces further CRH drive rather than reinforcing the stress chain.']]],
      ['Which timing comparison fits the taught stress pathway?',[
        ['ACTH release follows CRH quickly; cortisol follows over minutes','The text describes pituitary ACTH within about fifteen seconds and adrenal cortisol within minutes. Blood and cellular effects can persist.'],
        ['Cortisol always rises before hypothalamic CRH is released','CRH drives ACTH and ACTH drives cortisol; cortisol is downstream, not the first hormone here.'],
        ['Every endocrine effect ends as soon as one nerve impulse stops','Hormonal clearance and downstream effects are not tied to the end of one action potential.']]],
      ['Which statement correctly compares low and excessive HPA output?',[
        ['Adrenal failure lowers cortisol; pituitary ACTH excess can elevate cortisol','The text contrasts adrenal insufficiency/Addison disease with pituitary-driven Cushing disease. Synthetic cortisol can suppress CRH by feedback.'],
        ['Adrenal failure raises cortisol; pituitary ACTH excess lowers cortisol','This reverses the taught effects of adrenal failure and excess pituitary drive.'],
        ['Adrenal failure removes ADH; pituitary ACTH excess removes oxytocin','ADH and oxytocin are posterior-pituitary outputs, not the cortex/pituitary cortisol contrast.']]],
    ]),
    section('ans-circuits','Autonomic circuits and transmitters','ans',[
      ['What is the basic autonomic output chain?',[
        ['CNS preganglionic neuron, peripheral ganglion, target','The postganglionic soma lies outside the CNS; somatic skeletal output instead uses one lower motor neuron from CNS to muscle.'],
        ['Peripheral preganglionic neuron, central ganglion, target','This reverses the locations: preganglionic somata are central and autonomic ganglia peripheral.'],
        ['CNS motor neuron directly to every smooth muscle cell','A direct CNS-to-skeletal-muscle route is the somatic contrast; ANS output normally has a ganglionic relay.']]],
      ['Which origins and ganglia describe the sympathetic division?',[
        ['Thoracolumbar origin, chain or abdominal collateral ganglia','Preganglionic somata lie in intermediolateral spinal gray and axons exit ventral roots; typically short preganglionic and long postganglionic fibers.'],
        ['Craniosacral origin, ganglia near or within target organs','This is the parasympathetic arrangement, with longer preganglionic and shorter postganglionic fibers.'],
        ['Occipital cortical origin, ganglia entirely within the brain','Neither autonomic division uses this arrangement; output ganglia lie in the peripheral nervous system.']]],
      ['Which transmitter acts at autonomic ganglia in both divisions?',[
        ['Acetylcholine at nicotinic receptors','Preganglionic ACh excites ganglionic neurons; nicotinic channels mediate the fast response and metabotropic effects can modulate it.'],
        ['Norepinephrine at muscarinic receptors','Norepinephrine usually acts at sympathetic target adrenergic receptors, not at ganglionic muscarinic receptors.'],
        ['Acetylcholine at muscarinic receptors alone','Muscarinic ganglionic effects can be slower and modulatory, but the fast excitatory relay is nicotinic.']]],
      ['Which transmitters characterize the usual postganglionic targets?',[
        ['Sympathetic norepinephrine; parasympathetic acetylcholine','Sympathetic targets usually use adrenergic receptors; parasympathetic ACh acts at muscarinic receptors. Target receptors determine excitation or inhibition.'],
        ['Sympathetic acetylcholine; parasympathetic norepinephrine','This reverses the usual arrangement. Some sympathetic targets are exceptions, so the word usually matters.'],
        ['Sympathetic dopamine; parasympathetic serotonin','These are important central modulators but not the usual peripheral postganglionic pair.']]],
      ['How is adrenal-medullary epinephrine released?',[
        ['Preganglionic sympathetic ACh activates medullary cells','The medulla is a modified sympathetic ganglion; catecholamines including epinephrine enter blood, making the overall route neural plus hormonal.'],
        ['Anterior pituitary ACTH directly releases medullary cortisol','ACTH releases cortisol from cortex. The medulla uses sympathetic neural activation.'],
        ['Parasympathetic postganglionic serotonin enters medullary cells','The taught medullary route is preganglionic sympathetic ACh, not parasympathetic serotonin.']]],
      ['What is the enteric division?',[
        ['Gut-wall circuits that coordinate digestion with autonomic modulation','Sensory neurons, interneurons and motor neurons regulate gut motility and secretions; sympathetic/parasympathetic inputs modulate this network.'],
        ['A cortical motor tract that independently contracts skeletal muscle','The enteric network lies within the digestive system, not in a corticospinal skeletal pathway.'],
        ['A gut-wall network entirely independent of all central autonomic signals','Enteric circuits have considerable independence, but sympathetic and parasympathetic inputs modulate and can override them.']]],
    ]),
    section('ans-organs','Autonomic effects across organs','ans-organs',[
      ['Which pattern fits sympathetic activation?',[
        ['Faster heart, wider pupils and relaxed bronchi','These help acute action. Glucose availability rises and digestion is inhibited; parasympathetic effects generally oppose them.'],
        ['Slower heart, narrower pupils and relaxed bronchi','The first two are parasympathetic effects; bronchi relaxation belongs to the sympathetic pattern.'],
        ['Faster heart, narrower pupils and contracted bronchi','This mixes sympathetic acceleration with parasympathetic pupil and airway effects.']]],
      ['Which pattern fits recovery and parasympathetic activity?',[
        ['More salivation, digestion and pancreatic secretion','Parasympathetic activity promotes digestive motility, insulin/enzyme release and gut blood flow while slowing heart rate.'],
        ['Less salivation, digestion and pancreatic secretion','Suppressed digestive function is the sympathetic acute-action pattern.'],
        ['More salivation but less digestion and pancreatic secretion','Parasympathetic activation generally promotes these digestive functions together.']]],
      ['How do the divisions affect urinary bladder and sexual responses?',[
        ['Parasympathetic bladder contraction and erection; sympathetic ejaculation','The slide contrasts bladder emptying/sexual arousal with sympathetic bladder relaxation and orgasm.'],
        ['Sympathetic bladder contraction and erection; parasympathetic ejaculation','This reverses the taught bladder and sexual response pairings.'],
        ['Parasympathetic bladder relaxation and ejaculation; sympathetic erection','Parasympathetic activity contracts the bladder and supports erection, rather than this reversal.']]],
      ['Must every organ have both autonomic divisions with opposite effects?',[
        ['No, sweat glands and skin vessels are chiefly sympathetic examples','Lacrimal glands are a parasympathetic example. Not every target has dual innervation, and neither division is universally excitatory.'],
        ['Yes, all glands and vessels require equal opposite inputs','The text names exceptions to dual innervation; sympathetic sweat-gland axons also use acetylcholine.'],
        ['No, all glands and vessels instead lack autonomic input','Glands and vessels are major ANS targets; absence of dual innervation does not mean absence of innervation.']]],
      ['Which target set matches slide 15?',[
        ['Glands, cardiac muscle and smooth muscle','ANS targets include salivary/sweat/tear/mucus glands, heart/vessels, lung, liver, gut/pancreas, kidney/bladder/bowel and reproductive organs; it also interacts with immunity.'],
        ['Skeletal muscle, bone and articular cartilage','Skeletal muscle is somatic output; this list does not describe the major visceral targets on the slide.'],
        ['Retinal receptors, cochlear hairs and cortical axons','These are sensory or CNS elements, not the gland/cardiac/smooth-muscle target grouping.']]],
    ]),
    section('basic-emotion','Basic emotions and early theories','emotions',[
      ['Which list gives all six basic emotions on slide 16?',[
        ['Anger, fear, disgust, happiness, sadness and surprise','Neutral is a comparison condition, not a seventh basic emotion. The maps reflect reported body sensations, not direct ANS recordings.'],
        ['Anger, fear, disgust, happiness, sadness and neutrality','Surprise is the sixth basic emotion; the neutral condition is a comparison standard for the body-map colours, not an emotion in the six-category scheme.'],
        ['Anger, fear, disgust, happiness, arousal and valence','Arousal and valence are dimensions; sadness and surprise are missing from this category list.']]],
      ['What is the key James–Lange proposal?',[
        ['Perceived bodily responses contribute to the feeling of emotion','The threatening stimulus first evokes somatic/visceral responses, and sensing those changes produces the experience.'],
        ['The feeling of emotion must cause every bodily response first','This reverses the James–Lange causal proposal tested in HW4.'],
        ['Conscious emotion occurs without any possible bodily contribution','James–Lange gives bodily feedback a central role rather than excluding it.']]],
      ['What is the key Cannon–Bard contrast?',[
        ['Experience need not depend on sensing the bodily expression','Central processing can generate feeling and expression without a mandatory body-feedback chain; HW4 permits parallel branches.'],
        ['Experience must wait until all visceral feedback reaches the cortex','That mandatory dependence is the James–Lange contrast, not Cannon–Bard.'],
        ['Experience is identical to each measured change in skin conductance','The theory distinguishes experience from bodily expression rather than treating measurements as identical.']]],
      ['Which observation motivated Cannon’s criticism?',[
        ['Emotional responses could remain after loss of much bodily feedback','Spinal transection observations challenged a necessary feedback chain; similar bodily states across different emotions were another objection.'],
        ['Every emotion always had a unique isolated glandular response','Cannon argued that similar bodily changes could accompany different emotions, not that each had a unique gland signature.'],
        ['No central brain activity ever accompanied an emotional response','Cannon proposed central generation, historically emphasizing thalamus, rather than denying brain involvement.']]],
      ['What does interoceptive awareness mean?',[
        ['Awareness of the internal state of the body','Heartbeat judgments are an example. Later findings support a bodily contribution without proving the original theory in full.'],
        ['Awareness only of objects outside the body','That describes external perception, not interoception.'],
        ['Absence of any conscious emotional feeling','Interoception concerns sensed internal bodily signals; it is not defined as unconscious emotion.']]],
      ['What is the balanced conclusion about the early theories?',[
        ['Both captured useful ideas but neither is a complete modern account','Later studies found distinguishable physiology and variable effects of spinal injury; no simple ordering settles all emotion mechanisms.'],
        ['Cannon–Bard proved all emotional physiology is identical','Later work distinguishes physiological patterns even when both involve sympathetic activity.'],
        ['James–Lange proved every feeling needs an obvious visible reaction','The text does not require every emotion to have obvious outward signs, and evidence does not prove that universal rule.']]],
    ]),
    section('unconscious','Unconscious emotion and masked faces','masking',[
      ['What is the masking stimulus in the slide experiment?',[
        ['A neutral face immediately following a brief angry face','Participants report the neutral face; the preceding angry cue can influence autonomic and brain responses.'],
        ['A painful shock immediately following a clearly visible face','Shock or unpleasant sound is the aversive conditioning event, not the neutral visual mask.'],
        ['An angry face continuously shown without a following image','A continuously visible face does not implement the brief-cue/neutral-mask manipulation.']]],
      ['What was paired with the angry face during conditioning?',[
        ['An unpleasant sound in the pictured experiment','The learned cue subsequently increased skin conductance even when masked. The text also describes a shock-conditioning variant.'],
        ['A pleasant sound that caused only conscious happiness','The depicted pairing is aversive, not a reward induction.'],
        ['A neutral face that itself produced a painful injury','The neutral face is the masking stimulus; it is not the aversive US.']]],
      ['Which combination was found after a conditioned angry face was masked?',[
        ['Neutral-face report, increased conductance and amygdala activity','Expression and brain response can occur without conscious recognition of the triggering face; the textbook experiment used PET.'],
        ['Angry-face report, increased conductance and no brain response','Participants reported the neutral mask; amygdala activity was present for the masked aversive cue.'],
        ['Neutral-face report, no conductance change and no brain response','The crucial result is preserved autonomic and amygdala responses despite the neutral report.']]],
      ['What follows directly from increased skin conductance without cue awareness?',[
        ['Conscious recognition is unnecessary for this autonomic response','It supports unconscious processing of emotional significance. It does not prove a conscious fear feeling or a single emotion center.'],
        ['Conscious fear must have been fully reported by every participant','Conductance is expression; it cannot establish a subjective feeling that was not reported.'],
        ['The amygdala independently produces every emotional component','Coactivation and autonomic response do not show that one structure acts alone or handles every emotion.']]],
    ]),
    section('measurement','Emotion elicitation and measurement','elicitation',[
      ['Which sequence describes the slide 19 elicitation schematic?',[
        ['Event, appraisal, emotional responses and bodily perception','The example links blood/injury, appraisal as doom/disease, disgust expression and interoceptive feedback into experience.'],
        ['Event, identical experience and expression with no feedback','The schematic separates observable responses, internal perception and subjective experience.'],
        ['Event, cortical silence and purely voluntary gland secretion','Emotion engages neural and autonomic systems; the schematic does not posit cortical silence.']]],
      ['What do SCL and HR measure?',[
        ['Skin-conductance level and cardiac heart rate','Both index physiological responses; the Face trace indexes facial disgust expression. Neither alone equals conscious feeling.'],
        ['Sensory cortical location and hippocampal recall','SCL is skin conductance level and HR is cardiac heart rate, both physiological expression indices; they are not brain-imaging or memory measures.'],
        ['Subjective confidence level and happiness rating','SCL and HR are objective physiological measures; subjective confidence or happiness ratings are verbal-report measures, a different component of the schematic.']]],
      ['Which are distinct modes of expression in the schematic?',[
        ['Facial, vocal, motor and autonomic responses','Nose wrinkling, vocal sounds, withdrawal and salivation/motility are different outputs that should be measured separately.'],
        ['Facial, vocal, motor and identical conscious feelings','Conscious experience is a separate component, not interchangeable with observable expression.'],
        ['Facial, cortical, thalamic and identical conscious feelings','Cortical/thalamic are anatomical labels, not the displayed expression categories.']]],
      ['How should the claim that emotion roads lead to the ANS be used?',[
        ['As emphasis on a critical contributor, not proof of a single cause','Autonomic expression, subjective report and behavioral action provide different evidence, as HW4 requires.'],
        ['As proof that every ANS change uniquely identifies one emotion','Heart rate or conductance can change for several reasons, including states that are not emotional.'],
        ['As proof that self-report can always replace physiological recording','The measurements access different components; one cannot universally substitute for another.']]],
    ]),
    section('limbic','From limbic lobe to limbic-system concepts','papez',[
      ['What did Broca’s limbic lobe originally describe?',[
        ['A medial cortical rim around the brain stem and corpus callosum','Cingulate cortex, medial temporal cortex and hippocampus form the anatomical grouping. It was not originally a demonstrated single emotion system.'],
        ['A dedicated fear nucleus confined to the temporal pole','That description resembles an oversimplification of amygdala function, not the cortical rim.'],
        ['A motor relay entirely outside the cerebral hemispheres','The limbic lobe is medial cerebral cortex and hippocampus, not a peripheral motor relay.']]],
      ['What roles did Papez assign to cingulate cortex and hypothalamus?',[
        ['Cingulate experience; hypothalamic expression','The cingulate influences other neocortex for emotional coloring, while hypothalamus coordinates visceral/behavioral outputs.'],
        ['Cingulate expression; hypothalamic experience','This reverses the principal assignments in the historical proposal.'],
        ['Cingulate hearing; hypothalamic visual recognition','These are not the proposed roles in Papez’s emotion circuit.']]],
      ['Which route closes the Papez loop?',[
        ['Cingulate, hippocampus, fornix, hypothalamus, anterior thalamus, cingulate','The fornix carries hippocampal output; the anterior thalamic relay returns hypothalamic influence to cortex. Bidirectionality allows both central and bodily influences.'],
        ['Cingulate, anterior thalamus, fornix, retina, hippocampus, cingulate','The retina is not a component of the pictured Papez loop, and the fornix leaves hippocampus.'],
        ['Cingulate, pituitary, adrenal medulla, striatum, hippocampus, cingulate','This mixes endocrine and motor structures with the historical emotion loop.']]],
      ['Which network did Yakovlev propose?',[
        ['Orbitofrontal cortex, insula, amygdala and anterior temporal lobe','Slide 23 presents this emotion/motivation network before MacLean’s integrated limbic-system model.'],
        ['Primary visual cortex, retina, geniculate nucleus and optic nerve','These are visual pathway structures, not Yakovlev’s listed network.'],
        ['Motor cortex, spinal cord, skeletal muscle and peripheral ganglia','This is not the orbitofrontal/insular/amygdala/anterior-temporal grouping.']]],
      ['What did MacLean’s formulation emphasize?',[
        ['An interconnected cortical and subcortical limbic system','The slide describes functional integration by short- and long-range fiber bundles. This is a historical model, not proof of exclusive emotion function.'],
        ['An emotion system without any cortical or subcortical connections','MacLean proposed an interconnected system linked by long-range fiber bundles; connections between cortical and subcortical structures were central to the proposal, not absent from it.'],
        ['An isolated hypothalamic gland with no cerebral contributions','MacLean’s model combined limbic cortical and subcortical structures, not just a gland.']]],
      ['Why is the limbic system not a single exclusive emotion system?',[
        ['Its regions serve other functions and emotions use distributed networks','Anatomical connections and modern functional connectivity do not establish one necessary-and-sufficient emotion module; hippocampus is not simply an emotion-expression center.'],
        ['Its regions have no connections and never participate in emotion','Connected limbic structures can participate in emotion; the problem is exclusivity and a one-to-one structure/function claim.'],
        ['Its network boundaries are identical in every imaging definition','Slide 24 introduces connectivity-based parcellation; a parcellation is not proof of a universal unique emotion boundary.']]],
    ]),
    section('representations','Localizing emotion, categories and dimensions','dimensions',[
      ['What can amygdala activation while viewing fearful faces demonstrate?',[
        ['An association between the task and activity in that region','fMRI is correlational. Activity can support involvement but does not show that amygdala alone generates fear or responds only to fear.'],
        ['A proof that this region alone generates all conscious fear','Coactivation cannot establish sufficiency, necessity or exclusive function.'],
        ['A proof that this region responds only to fear and nothing else','Other studies report activation for other emotional stimuli; selectivity depends on the experiment.']]],
      ['What do basic emotion theories propose?',[
        ['Some emotions are innate, universal and indivisible categories','This extends Darwin’s observations; the theory differs from combining fundamental dimensions in varying amounts.'],
        ['Every emotion is merely a different amount on one arousal axis','That is a dimensional simplification rather than the unique-category proposal.'],
        ['All emotions are identical learned labels with no biology','The slide’s basic theories emphasize innate universal experiences, not absence of biological contribution.']]],
      ['What are the two dimensions on slide 27?',[
        ['Arousal level and pleasantness valence','Arousal measures activation; valence describes pleasantness versus unpleasantness. High arousal need not mean pleasantness.'],
        ['Cortical volume and pituitary mass','The two-dimensional framework uses pleasantness (valence) and activation level (arousal) as psychological axes, not anatomical measurements.'],
        ['Consciousness and sympathetic neuron number','The model uses pleasantness and arousal as psychological state axes, not consciousness level or neuron counts.']]],
      ['What does a dimensional account allow?',[
        ['Different emotions can combine shared components in different amounts','Two states can share arousal but differ in valence. Slide 28 contrasts this possibility with unique dissociable circuits, without settling the debate.'],
        ['Every named emotion must use one unique disconnected neural circuit','Unique indivisible circuits are the alternative being questioned, not a requirement of dimensional reduction.'],
        ['Every named emotion must be reduced to a single organ response','The two-dimensional illustration does not identify an emotion with one autonomic output or prove a complete neural reduction.']]],
    ]),
    section('amygdala','Amygdala inputs, lesions and fear recognition','amygdala',[
      ['Which input assignment is correct?',[
        ['Basolateral: visual, auditory, gustatory and tactile; corticomedial: olfactory','Different sensory inputs follow distinct projection patterns; interconnections permit multisensory integration.'],
        ['Basolateral: olfactory alone; corticomedial: all other sensory systems','This reverses the figure’s principal input assignments.'],
        ['Central: all sensory inputs; basolateral: only autonomic output','The central nucleus is a major output route; sensory convergence and plasticity are emphasized in basolateral nuclei.']]],
      ['What is the characteristic emotional change in Klüver–Bucy syndrome?',[
        ['Reduced fear and aggression after bilateral temporal damage','The broader syndrome can include visual recognition problems, oral exploration and hypersexuality; temporal lobectomy is larger than selective amygdala damage.'],
        ['Increased fear and aggression after bilateral temporal damage','The classic lesion effect is marked taming/reduced fear and aggression, not a universal increase.'],
        ['Reduced fear with no possible recognition or behavioral changes','The broad temporal lesion causes additional abnormalities; it should not be described as a pure isolated loss of fear.']]],
      ['Which facial-recognition pattern fits the Urbach–Wiethe case?',[
        ['Poor fear, limited anger, preserved happiness, sadness and disgust','Bilateral amygdala destruction was associated with a selective visual fear-recognition problem despite intact identity recognition and intelligence.'],
        ['Poor happiness, preserved fear, and uniformly absent identity recognition','The taught case preserved identity recognition and happiness, with the strongest deficit for fearful faces.'],
        ['Poor disgust, normal fear, and uniformly absent auditory recognition','Fearful-face recognition was most affected; fear in tone of voice could be recognized.']]],
      ['What improved S.M.’s fearful-face recognition in follow-up testing?',[
        ['Instruction to look directly at the eyes in the displayed face','She usually inspected the mouth. Eye-directed instruction improved recognition, supporting amygdala–visual-system interactions rather than simple destruction of all fear knowledge.'],
        ['Instruction to ignore the eyes and inspect only the mouth','Mouth-directed inspection was the usual pattern associated with poor fear recognition.'],
        ['Instruction to identify a person without viewing the face','The intervention concerned visual exploration of emotional facial features, not removal of the face.']]],
      ['Which conclusion follows from human amygdala stimulation reports?',[
        ['Stimulation can evoke fear or anxiety, depending on location','Effects vary by site and can include vigilance or aggression in animal work; a structure can contribute to several states.'],
        ['Stimulation must evoke fear identically at every possible location','Variable effects and multiple nuclear groups argue against a uniform all-sites response.'],
        ['Stimulation proves emotional recognition never involves other regions','Stimulation effects do not exclude visual cortex, hypothalamus, brain stem or other network contributors.']]],
      ['Which pathways connect amygdala and hypothalamus?',[
        ['Stria terminalis and ventral amygdalofugal pathway','These provide major anatomical routes for amygdala influence on hypothalamic responses.'],
        ['Optic radiation and dorsal column pathway','These carry visual or somatosensory information, not the named amygdala–hypothalamic connections.'],
        ['Corticospinal tract and posterior pituitary stalk','These are motor/endocrine routes rather than the two named amygdala output pathways.']]],
    ]),
    section('conditioning','Learning, expressing and extinguishing fear','conditioning',[
      ['What are CS and US in tone–shock fear conditioning?',[
        ['Tone is the conditioned stimulus; shock is the unconditioned stimulus','The initially benign tone gains predictive significance through pairing with the naturally aversive shock.'],
        ['Shock is the conditioned stimulus; tone is the unconditioned stimulus','The tone is initially neutral and becomes the learned cue; shock is aversive without prior pairing.'],
        ['Freezing is the conditioned stimulus; tone is the unconditioned stimulus','Freezing is a response, not a stimulus. CS and US label the tone and shock events.']]],
      ['What demonstrates acquisition and later fear expression?',[
        ['Tone–shock pairings are followed by a response to the tone alone','The conditioned response can include freezing, heart-rate change or human skin-conductance response. Fear learning can sometimes occur after one event.'],
        ['Tone–shock pairings are followed only by a response to shock','A shock response alone does not demonstrate that the tone acquired predictive significance.'],
        ['An unpaired tone is followed only by unchanged baseline activity','Without a learned change to the cue, the observation does not demonstrate the conditioning effect.']]],
      ['What happens during extinction training in the displayed panels?',[
        ['Repeated CS alone is accompanied by decreasing conditioned responding','The US is omitted. A later test assesses the response after this training.'],
        ['Repeated US alone is accompanied by stronger tone–shock pairings','Extinction omits the shock rather than strengthening the original pairing.'],
        ['Repeated CS–US pairs are used to establish the first response','That is acquisition; extinction presents the cue without its expected aversive outcome.']]],
      ['What does the recall/renewal illustration warn against concluding?',[
        ['A reduced response does not prove the original association was erased','Later response return can depend on test conditions; the slide illustrates recall and renewal without teaching additional extinction circuitry.'],
        ['A reduced response proves the animal permanently lost hearing','The experiment concerns learned responses, not necessarily impaired sensory detection.'],
        ['A reduced response proves no association had ever been acquired','The earlier acquisition data already show learning; later extinction does not negate that observation.']]],
    ]),
    section('fear-circuit','The learned-fear circuit','fear',[
      ['Where do tone and shock information converge in the taught circuit?',[
        ['Basolateral amygdala after sensory cortical processing','Auditory cortex supplies tone information; somatosensory cortex supplies shock information. Pairing changes synaptic strength in this region.'],
        ['Posterior pituitary after direct skeletal muscle processing','The posterior pituitary secretes hormones and is not the illustrated sensory convergence site.'],
        ['Adrenal medulla after portal blood carries cortical signals','The medulla is a sympathetic endocrine target, not the illustrated locus of tone–shock synaptic association.']]],
      ['Which output pairing is correct?',[
        ['Hypothalamus: autonomic; PAG: behavioral; cortex: experience','The central amygdala relays toward these distinct output/contribution routes. Emotion is not a single interchangeable measurement.'],
        ['Hypothalamus: experience; PAG: autonomic; cortex: behavioral','This swaps the main roles assigned by the taught diagram.'],
        ['Hypothalamus: behavioral; PAG: experience; cortex: autonomic','This also reverses the diagram’s autonomic, behavioral and experiential assignments.']]],
      ['What changed in central-amygdala recordings after conditioning?',[
        ['Neurons responded to the shock-predicting tone rather than the benign tone','The learned differential response parallels the learned visceral response and is linked to basolateral synaptic changes.'],
        ['Neurons responded equally to every tone before any conditioning','The key finding was acquired, selective responding to the paired tone rather than an unchanging indiscriminate response.'],
        ['Neurons stopped responding to every stimulus including the paired tone','The learned change was increased relevant cue responsiveness, not universal silence.']]],
      ['What does loss of conditioned visceral responses after amygdala lesions support?',[
        ['Amygdala circuits contribute to learned fear-related expression','Preserved hearing rules out a simple deafness explanation. The lesion does not prove one isolated site generates every feeling.'],
        ['Amygdala circuits are the only place any memory can be stored','Amygdala plasticity supports emotional learning, not an exclusive account of all memory storage.'],
        ['Amygdala circuits are required only for auditory receptor transduction','The animal can still hear; the deficit concerns learned significance and response coordination.']]],
    ]),
    section('plasticity','Lateral-amygdala synaptic plasticity','plasticity',[
      ['What does the CS initially evoke at lateral-amygdala sensory synapses?',[
        ['Excitatory postsynaptic potentials in LA pyramidal neurons','The CS activates sensory inputs; the US strongly depolarizes the same neurons during pairing.'],
        ['Cortisol release directly from LA pyramidal neurons','LA neurons are not adrenal cortex; the slide concerns synaptic EPSPs and cellular calcium.'],
        ['Only peripheral ganglionic potentials outside the CNS','Lateral amygdala is in the CNS, and the taught plasticity occurs at sensory input synapses there.']]],
      ['What does strong US depolarization enable in the slide mechanism?',[
        ['NMDA-receptor calcium entry and LA action potentials','Depolarization permits NMDA current and firing; the arriving CS EPSPs are paired with this strong postsynaptic activity.'],
        ['NMDA-receptor closure and permanent loss of LA firing','The slide states calcium influx and firing, not channel closure and universal silence.'],
        ['Pituitary hormone entry and direct contraction of the LA dendrite','The mechanism is electrical/synaptic plasticity, not pituitary delivery or muscle-like dendritic contraction.']]],
      ['What do the LA action potentials do in the taught sequence?',[
        ['Back-propagate into dendrites and meet CS-evoked EPSPs','The interaction promotes calcium entry through voltage-gated calcium channels, adding a second calcium source.'],
        ['Leave the brain and become portal-circulation neurohormones','Action potentials are electrical signals; they do not become blood-borne hormones.'],
        ['Prevent every voltage-gated calcium channel from opening','The slide attributes additional calcium entry to voltage-gated channels, rather than their universal closure.']]],
      ['Which calcium requirement distinguishes short- and long-term changes here?',[
        ['NMDA entry can support short-term change; NMDA plus VGCC supports consolidation','Slide 36 explicitly distinguishes short-term fear-memory support from molecular processes consolidating long-term synaptic changes.'],
        ['VGCC entry alone is the sole requirement for every short-term change','This omits the stated NMDA contribution and reverses the taught distinction.'],
        ['Neither NMDA nor VGCC entry contributes to long-term consolidation','The proposed long-term mechanism requires calcium entry through both sources.']]],
      ['What is strengthened after this associative pairing?',[
        ['The postsynaptic response to sensory CS input at the LA synapse','The once-benign cue now evokes a stronger response; this is a cellular hypothesis, not a complete theory of all memory.'],
        ['The portal blood flow specifically between kidney and pituitary','Portal pituitary circulation is a separate endocrine topic, not the conditioned sensory synapse.'],
        ['The direct somatic innervation from adrenal cortex to skeletal muscle','There is no such direct somatic chain; the diagram concerns central amygdala neurons.']]],
    ]),
    section('aggression','Anger and aggression networks','aggression',[
      ['Which pattern defines predatory aggression?',[
        ['Quiet killing attack directed toward prey head or neck','Predatory attacks show few vocalizations and less overt sympathetic display than affective threat attacks.'],
        ['Loud defensive display with hissing and threatening posture','These are affective-aggression features, often a display rather than a killing attack.'],
        ['Quiet recovery behavior dominated by digestion and sleep','Predatory behavior is an attack, despite its relative lack of vocal display.']]],
      ['Which pattern defines affective aggression?',[
        ['Threatening posture and vocalization with strong autonomic activation','Affective aggression is defensive or for show, contrasting with quiet prey killing.'],
        ['Silent prey-neck biting with little threatening display','That is the predatory pattern.'],
        ['Absence of posture and autonomic change during every attack','The affective pattern prominently includes coordinated display and visceral changes.']]],
      ['Which hypothalamic stimulation mapping is correct?',[
        ['Medial sites: affective; lateral sites: predatory aggression','The experiments distinguish threat attack from silent-biting attack; stimulation results concern expression, not direct reports of feeling.'],
        ['Medial sites: predatory; lateral sites: affective aggression','This reverses the taught medial/lateral mapping.'],
        ['Both sites: identical behavior without any autonomic difference','Different sites recruited distinct coordinated behavioral patterns.']]],
      ['Which route links lateral hypothalamus to predatory output?',[
        ['Medial forebrain bundle toward ventral tegmental area','Medial hypothalamus projects by dorsal longitudinal fasciculus toward PAG for affective output. Cutting a route can block stimulation-evoked aggression without abolishing all aggression.'],
        ['Dorsal longitudinal fasciculus toward periaqueductal gray','This is the medial-hypothalamic affective route, not the lateral predatory route.'],
        ['Hypothalamo-pituitary portal blood toward adrenal cortex','This is an endocrine pathway, not the named midbrain axonal aggression route.']]],
      ['What did the Pribram monkey and historical lesion observations indicate?',[
        ['Amygdala effects depend on social context and interacting networks','A dominant monkey could lose its position after amygdala damage; isolated testing and group behavior need not give identical results. Human amygdalectomy reports are historical, not a simple treatment rule.'],
        ['Amygdala removal always eliminates aggression in every social setting','The social-context findings make this universal taming claim too strong.'],
        ['Amygdala removal leaves dominance and every emotional behavior intact','The historical work reported important changes; absence of any effect is not supported.']]],
      ['What is the inference from sham-rage lesion experiments?',[
        ['Posterior hypothalamic regions can support expression after cortical removal','Extending large lesions into posterior hypothalamus abolished sham rage; the result suggests a contribution and cortical inhibition, not proof that one nucleus alone causes anger.'],
        ['Posterior hypothalamic removal is necessary to create sham rage','Rage persisted with hypothalamus spared and was lost when posterior damage was added.'],
        ['Cortical removal proves the animal reports full conscious rage','Expression in an animal without cortex does not provide a subjective report; this is why the term sham rage was used.']]],
    ]),
    section('serotonin','Serotonin and aggression: interpreting the evidence',null,[
      ['What does the serotonin-deficiency hypothesis propose?',[
        ['Aggression tends to vary inversely with serotonergic activity','The hypothesis concerns activity/turnover, not a claim that one serotonin concentration determines every aggressive act. Raphe projections reach hypothalamic and limbic targets.'],
        ['Aggression always increases with greater serotonergic activity','This reverses the usual association described here and overstates its universality.'],
        ['Aggression is unrelated to any raphe or receptor activity','Raphe serotonin and receptor experiments support modulation, although the relationship is complex.']]],
      ['What happened in the isolation-induced aggressive male mice?',[
        ['Serotonin turnover fell without a required fall in total serotonin','The change appeared in animals that became aggressive; turnover is synthesis/release/resynthesis, not simply tissue content. Blocking synthesis or release can increase attacks.'],
        ['Total serotonin rose and turnover necessarily remained unchanged','The text emphasizes reduced turnover without reduced tissue level, not this reversed pattern.'],
        ['Every isolated male and female mouse became equally aggressive','The effect was not universal, and the described females did not show the same aggression/turnover change.']]],
      ['Which receptor result fits the described mouse evidence?',[
        ['5-HT1B agonists reduced attacks; antagonists increased them','Some knockout findings show greater aggression or impulsivity. Widely distributed receptors and inhibitory autoreceptors complicate a simple interpretation.'],
        ['5-HT1B agonists increased attacks; antagonists reduced them','This reverses the pharmacological results described in the text.'],
        ['5-HT1B receptors occur only on adrenal gland cortisol cells','These receptors have broad CNS distributions, including autoreceptor locations that can reduce serotonin release.']]],
      ['What is the careful interpretation of primate and human findings?',[
        ['Lower serotonergic activity can correlate with aggression, not dominance','Vervet dominance could favor less aggressive high-serotonin animals; low CSF 5-HIAA correlated with aggression in a studied human group, not all people or all contexts.'],
        ['Lower CSF 5-HIAA proves a person will be violent in every setting','5-HIAA is a serotonin metabolite and an indirect index. A correlation does not establish an inevitable individual outcome.'],
        ['More aggression always means higher social rank in primate groups','The vervet example dissociated aggression from dominance and emphasized social support.']]],
    ]),
  ],
  lectureQuiz: [
    {id:'q01',type:'mc',difficulty:'easy',points:1,
      prompt:'Which source releases cortisol in the HPA stress response?',
      options:[
        {text:'Posterior pituitary',feedback:'Posterior terminals release oxytocin and vasopressin, not cortisol.'},
        {text:'Adrenal cortex',feedback:'ACTH stimulates the adrenal cortex to release cortisol.'},
        {text:'Adrenal medulla',feedback:'Sympathetic preganglionic input drives medullary catecholamine release, not cortisol.'},
        {text:'Anterior pituitary',feedback:'Anterior pituitary releases ACTH, the upstream signal that drives adrenal cortisol.'},
      ],correct:1,modelAnswer:['Identify the steroid cortisol as the final HPA hormone.','Its source is adrenal cortex; ACTH comes from anterior pituitary.']},
    {id:'q02',type:'inlineChoice',difficulty:'easy',points:1,
      prompt:'Circle the right alternative in each bracket.',sentences:[
        {text:'The sympathetic division is ___ and usually has ___ preganglionic fibers. The parasympathetic division is ___.',choices:[
          {options:['thoracolumbar','craniosacral'],answer:0},{options:['long','short'],answer:1},{options:['thoracolumbar','craniosacral'],answer:1}],
          explanation:'Sympathetic ganglia are usually near the spinal cord; parasympathetic ganglia are near or within organs.'},
        {text:'Both autonomic divisions release ___ at ganglia. Most sympathetic targets receive ___, while parasympathetic targets receive ___.',choices:[
          {options:['acetylcholine','norepinephrine'],answer:0},{options:['acetylcholine','norepinephrine'],answer:1},{options:['acetylcholine','norepinephrine'],answer:0}],
          explanation:'Ganglionic ACh acts at nicotinic receptors; typical sympathetic targets use adrenergic and parasympathetic targets muscarinic receptors.'},
        {text:'Oxytocin is released from the ___ pituitary by ___ axon terminals. The anterior lobe receives releasing hormones through ___ and releases ___.',choices:[
          {options:['anterior','posterior'],answer:1},{options:['magnocellular','parvocellular'],answer:0},{options:['portal blood','direct axon terminals'],answer:0},{options:['vasopressin','ACTH'],answer:1}],
          explanation:'Magnocellular neurons project to posterior lobe; parvocellular releasing hormones control the glandular anterior lobe through portal blood.'},
      ],modelAnswer:['Sympathetic: thoracolumbar, typically short preganglionic fibers. Parasympathetic: craniosacral.','Both ganglia use ACh; usual target transmitters are sympathetic NE and parasympathetic ACh.','Posterior release uses magnocellular terminals; anterior control uses portal blood and includes ACTH secretion.']},
    {...label('amygdala','q03','Identify the three amygdala nuclear groups using the word bank.')},
    {id:'q04',type:'classify',difficulty:'medium',points:1,
      prompt:'Classify each response by its principal control system. Categories may be reused.',
      categories:['Autonomic nervous system','Secretory hypothalamus','Diffuse modulatory systems'],items:[
        {text:'Two peripheral neurons relay a central command to accelerate the heart.',answer:'Autonomic nervous system',explanation:'The preganglionic–ganglionic–postganglionic chain is neural visceral output.'},
        {text:'Portal-blood signals recruit pituitary and then adrenal cortical hormone release.',answer:'Secretory hypothalamus',explanation:'CRH drives ACTH and cortisol through blood-borne signals.'},
        {text:'Highly divergent pontine axons release norepinephrine across cortical regions.',answer:'Diffuse modulatory systems',explanation:'Locus coeruleus modulates CNS responsiveness.'},
        {text:'Preganglionic axons recruit a modified ganglion to release epinephrine into blood.',answer:'Autonomic nervous system',explanation:'Sympathetic input to adrenal medulla is neural, followed by a hormonal output.'},
      ],modelAnswer:['Heart: ANS neural output.','Cortisol: secretory hypothalamus/HPA route.','Alertness: diffuse norepinephrine system.','Epinephrine: ANS recruitment of adrenal medulla, then blood-borne action.']},
    {id:'q05',type:'classify',difficulty:'medium',points:1,
      prompt:'Classify the principal component represented by each observation. Categories may be reused.',
      categories:['Emotional stimulus','Conscious experience','Autonomic/endocrine expression','Behavioral expression'],items:[
        {text:'An approaching aggressive dog is detected.',answer:'Emotional stimulus',explanation:'The dog is the event initiating appraisal, not the feeling itself.'},
        {text:'A participant says, "I feel afraid."',answer:'Conscious experience',explanation:'This is a subjective report of feeling.'},
        {text:'The experiment records increased heart rate and stress hormones.',answer:'Autonomic/endocrine expression',explanation:'These measure physiological outputs, not directly the subjective experience.'},
        {text:'The participant runs away from the dog.',answer:'Behavioral expression',explanation:'Running is an observable action.'},
      ],modelAnswer:['Separate the event from the response.','Feeling afraid is experience; heart/hormone changes are physiological expression.','Running is behavioral expression. Measuring all components avoids equating one output with the entire emotion.']},
    {id:'q06',type:'trueFalse',difficulty:'medium',points:1,
      prompt:'Mark each statement true or false. Correct every false statement in one line.',statements:[
        {text:'The anterior pituitary is controlled by parvocellular hormones carried in portal blood.',answer:true,justification:'Hypophysiotropic hormones reach gland-cell receptors by the portal vessels.'},
        {text:'The posterior pituitary synthesizes ACTH in its own endocrine gland cells.',answer:false,correction:'Posterior terminals release hypothalamic oxytocin and vasopressin; anterior gland cells release ACTH.'},
        {text:'Cortisol feeds back to reduce hypothalamic CRH release.',answer:true,justification:'The lipid-soluble steroid enters the brain and acts through receptors.'},
        {text:'ACTH stimulates cortisol secretion from the adrenal medulla.',answer:false,correction:'ACTH stimulates adrenal cortex; medulla releases catecholamines through sympathetic input.'},
      ],modelAnswer:['True: portal blood controls anterior secretion.','False: ACTH is anterior; posterior release uses hypothalamic axon terminals.','True: cortisol limits upstream CRH drive.','False: cortisol comes from cortex, not medulla.']},
    {id:'q07',type:'trueFalse',difficulty:'medium',points:1,
      prompt:'Mark each statement true or false. Correct every false statement in one line.',statements:[
        {text:'All autonomic output reaches organs through a direct CNS-to-target axon without a ganglion.',answer:false,correction:'The usual ANS output uses a CNS preganglionic neuron and a peripheral postganglionic neuron.'},
        {text:'The usual sympathetic postganglionic transmitter is norepinephrine.',answer:true,justification:'Norepinephrine acts at adrenergic target receptors; there are exceptions such as sweat glands.'},
        {text:'A masked conditioned angry face can increase skin conductance without conscious recognition.',answer:true,justification:'The masked-face experiment separates physiological expression from cue awareness.'},
        {text:'A normal happy-face response after amygdala damage proves that fear recognition must also be normal.',answer:false,correction:'The taught bilateral-damage case preserved happiness recognition but impaired fearful-face recognition.'},
      ],modelAnswer:['False: use the two-neuron autonomic chain.','True: typical sympathetic targets receive NE.','True: the masked cue still evokes physiological expression.','False: emotion recognition can be selectively affected.']},
    {id:'q08',type:'multiSelect',difficulty:'medium',points:1,
      prompt:'Which statements about James–Lange and Cannon–Bard theories are correct?',options:[
        {text:'James–Lange makes sensing bodily responses central to emotional experience.',correct:true,feedback:'Perceived visceral and somatic changes contribute to the feeling in this proposal.'},
        {text:'Cannon–Bard makes bodily feedback a necessary step before every feeling.',correct:false,feedback:'Cannon–Bard proposes the opposite: central processing can produce experience without a mandatory body-feedback chain.'},
        {text:'Preserved emotion after sensory loss challenged a mandatory feedback chain.',correct:true,feedback:'Cannon used spinal transection observations to criticize the strict bodily-feedback requirement.'},
        {text:'The two theories both prove that experience and expression are identical.',correct:false,feedback:'They propose different relationships between those separable components; neither proves identity.'},
      ],modelAnswer:['James–Lange: stimulus, bodily change, sensed change, feeling.','Cannon–Bard: central processing can produce experience independently of bodily feedback.','Preserved responses after spinal injury challenged a strict feedback requirement; later evidence gives both theories merits and limits.']},
    {id:'q09',type:'multiSelect',difficulty:'medium',points:1,
      prompt:'Which statements about the limbic-system concept are correct?',options:[
        {text:'Broca’s limbic lobe began as an anatomical grouping around medial cortex.',correct:true,feedback:'The rim included cingulate and medial temporal cortex and hippocampus; its original definition was anatomical.'},
        {text:'Papez linked cingulate experience to hypothalamic expression through a loop.',correct:true,feedback:'Hippocampus/fornix and anterior thalamus link cortical and hypothalamic influences.'},
        {text:'Modern evidence establishes one discrete system exclusively serving every emotion.',correct:false,feedback:'Emotions involve distributed networks, and implicated structures also serve other functions.'},
        {text:'A connectivity-defined limbic network need not be an exclusive emotion module.',correct:true,feedback:'Functional connectivity partitions correlated activity; it does not prove exclusive function or sufficiency.'},
      ],modelAnswer:['Distinguish Broca’s anatomical rim, Papez’s functional proposal and modern network definitions.','Connections can be real while the single exclusive emotion-system claim remains unsupported.','No one-to-one structure/function rule follows from a network label.']},
    {id:'q10',type:'order',difficulty:'medium',points:1,
      prompt:'Rank the forward HPA stress pathway. Negative feedback occurs after the cortisol output.',
      items:['Anterior pituitary releases ACTH into general blood','Adrenal cortex releases cortisol','Parvocellular hypothalamic neurons release CRH into portal blood','ACTH reaches the adrenal cortex'],correctOrder:[2,0,3,1],
      modelAnswer:['Hypothalamic CRH enters portal circulation.','CRH stimulates anterior pituitary ACTH release.','ACTH travels in general blood to adrenal cortex.','The cortex releases cortisol; cortisol subsequently limits upstream CRH drive.']},
    {id:'q12',type:'matchPairs',difficulty:'medium',points:1,
      prompt:'Match each diffuse modulatory origin to its transmitter, main target and function.',
      right:[
        {id:'vta',text:'Dopamine → frontal/limbic regions → reinforcement'},
        {id:'ach',text:'Acetylcholine → cortex/hippocampus → arousal and memory'},
        {id:'raphe',text:'Serotonin → broad CNS/spinal targets → mood, arousal and pain modulation'},
        {id:'lc',text:'Norepinephrine → broad CNS targets → salient-event responsiveness'},
        {id:'sn',text:'Dopamine → striatum → movement initiation'},
        {id:'pmt',text:'Acetylcholine → dorsal thalamus → relay excitability'},
        {id:'spare',text:'Dopamine → median eminence → pituitary prolactin inhibition'},
      ],left:[
        {text:'Pontine locus coeruleus',answer:'lc',explanation:'NE projections are highly divergent and respond to novelty.'},
        {text:'Brain-stem raphe nuclei',answer:'raphe',explanation:'Rostral and caudal raphe send serotonin to different CNS levels.'},
        {text:'Midbrain substantia nigra',answer:'sn',explanation:'Nigrostriatal dopamine supports movement initiation.'},
        {text:'Midbrain ventral tegmental area',answer:'vta',explanation:'Mesocorticolimbic dopamine contributes to reinforcement.'},
        {text:'Basal forebrain complex',answer:'ach',explanation:'Medial septal nuclei supply hippocampus; Meynert supplies neocortex.'},
        {text:'Pontomesencephalotegmental complex',answer:'pmt',explanation:'The brain-stem cholinergic group modulates thalamic relays.'},
      ],modelAnswer:['LC: NE and salient-event responsiveness. Raphe: serotonin, arousal/mood and spinal pain modulation.','Substantia nigra: dopamine to striatum; VTA: dopamine to limbic/frontal targets.','Basal forebrain: ACh to cortex/hippocampus; brain-stem cholinergic complex: mainly thalamus.']},
    {id:'q13',type:'groupItems',difficulty:'medium',points:1,
      prompt:'Sort the features into predatory or affective aggression.',groups:['Predatory aggression','Affective aggression'],items:[
        {text:'Few vocalizations',group:'Predatory aggression',explanation:'The prey-killing attack is relatively quiet.'},
        {text:'Threatening defensive posture',group:'Affective aggression',explanation:'Display is prominent in a threat attack.'},
        {text:'Biting prey head or neck',group:'Predatory aggression',explanation:'The target is killing prey rather than warning an adversary.'},
        {text:'Hissing and growling',group:'Affective aggression',explanation:'Vocal threat accompanies the affective pattern.'},
        {text:'Lateral hypothalamic stimulation',group:'Predatory aggression',explanation:'The taught experiment elicited silent-biting attack.'},
        {text:'Medial hypothalamic stimulation',group:'Affective aggression',explanation:'The taught experiment elicited threat attack.'},
      ],modelAnswer:['Predatory: quiet, aimed at prey head/neck, linked to lateral hypothalamic stimulation.','Affective: vocal and defensive display, linked to medial hypothalamic stimulation.','These are expression patterns; they do not directly measure subjective anger.']},
    {id:'q11',type:'fillBlank',difficulty:'hard',points:1,
      prompt:'Complete the taught fear pathway without a word bank. Use the nuclear groups, not just “amygdala”.',
      text:'Tone via auditory cortex and shock via somatosensory cortex converge in ___. Output is relayed through the ___ toward hypothalamus for autonomic responses and ___ for behavioral reactions. Emotional experience involves ___.',
      blanks:[
        {accept:['basolateral nuclei','basolateral amygdala','basolateral nuclei of the amygdala','basolateral region of the amygdala']},
        {accept:['central nucleus','central amygdala','central nucleus of the amygdala','amygdala central nucleus']},
        {accept:['periaqueductal gray','periaqueductal grey','periaqueductal gray matter','periaqueductal grey matter','PAG']},
        {accept:['cerebral cortex','cortex','the cerebral cortex']},
      ],modelAnswer:['Sensory cortical inputs converge on basolateral amygdala and pairing strengthens cue responses.','The central nucleus relays output toward response systems.','Hypothalamus coordinates ANS; PAG coordinates behavioral output; cortical activity contributes to experience.']},
    {id:'q14',type:'clinicalCase',difficulty:'hard',points:1,
      scenario:'A rat has learned that a tone (CS) predicts a mild shock (US). A selective lesion then destroys the basolateral nuclei while leaving the central nucleus and all sensory cortices intact. The rat retains full hearing and motor ability.',
      prompt:'Which outcome most directly follows from what the taught fear circuit predicts?',
      options:[
        {text:'The learned tone–fear association is abolished: the tone no longer evokes conditioned freezing.',feedback:'BLA is where CS and US inputs converge and plasticity occurs. Without the BLA the central nucleus loses its learned input, so the conditioned tone cannot activate the output system even though the central nucleus is intact.'},
        {text:'The conditioned response is fully preserved, because the intact central nucleus substitutes for basolateral plasticity.',feedback:'The central nucleus provides output pathways, not the plasticity site. It cannot generate the learned association that was stored in the basolateral complex.'},
        {text:'The rat loses all emotional responses including reactions to the unconditioned shock.',feedback:'Unconditioned aversive responses can reach the central nucleus through pathways that do not require basolateral plasticity; selective BLA damage is not equivalent to removing all fear-relevant input.'},
        {text:'The tone evokes autonomic responses but not behavioral freezing, because those outputs use different central-nucleus targets.',feedback:'Both autonomic and behavioral outputs are routed through the central nucleus after learning. Without the learned BLA input, neither should be specifically conditioned to the tone.'},
      ],correct:0,
      modelAnswer:['BLA is the site where CS and US inputs converge and plasticity occurs.','Destroying BLA removes the learned association; the central nucleus output system is intact but loses its learned input.','Therefore the conditioned tone should no longer drive freezing, while unconditioned responses to the shock US may survive through other routes.']},
    {id:'q15',type:'interpret',difficulty:'hard',points:1,
      prompt:'Panel C shows decreasing freezing over CS-alone presentations. After that training ends, the animal is returned to the original conditioning context three weeks later. Based on the recall and renewal concepts shown on the same slides, which prediction is most consistent with the taught evidence?',
      figure:{type:'widget',name:'image-hotspots',props:{...hot('conditioning'),quiz:false,regions:[]},
        caption:'Experimental panels from slide 32. Each panel shows a stimulus protocol above and a freezing curve below.',fallbackAlt:'Four panels A to D show stimulus protocols with corresponding freezing curves below.'},
      options:[
        {text:'Responding has returned toward acquisition levels, because extinction is context-dependent and the original context acts as a renewal cue.',feedback:'Recall and renewal on the slide illustrate that extinction learning is context-dependent: the conditioned response can return when the animal is re-exposed to the original context, showing the original association was not erased.'},
        {text:'Responding stays at extinction-level zero, because the original association was permanently erased by extinction training.',feedback:'The slides explicitly show recall and renewal as evidence that extinction is not permanent erasure; the original association remains and can be retrieved with the right conditions.'},
        {text:'Responding exceeds the acquisition peak because extinction training rebound-amplifies the original CS–US link.',feedback:'No rebound amplification is proposed; renewal refers to a return toward the original response level, not a strengthening beyond it.'},
        {text:'Responding returns only if the rat receives additional US-alone exposures in the original context.',feedback:'Renewal does not require additional US exposures; it is the return of the conditioned response based on context alone, without reinstating the aversive US.'},
      ],correct:0,
      modelAnswer:['Panel C (extinction training) repeatedly presents the CS without the US and the response decreases.','Testing in the original context after extinction can produce recall or renewal, illustrated on slides 32–33.','The conditioned response is expected to return because extinction is context-dependent, not permanent erasure.','This shows the original CS–US association was not erased but rather suppressed in the extinction context.']},
    {id:'q16',type:'clinicalCase',difficulty:'hard',points:1,
      scenario:'In a simplified experiment based on slide 36, CS–US pairing still depolarizes lateral-amygdala neurons and permits NMDA-receptor calcium entry. A manipulation selectively removes the additional calcium entry through voltage-gated calcium channels, while leaving sensory input and motor output intact.',
      prompt:'Which prediction best follows from the proposed mechanism?',options:[
        {text:'Short-term change may remain, but long-term consolidation is impaired.',feedback:'NMDA calcium can support short-term change; the taught long-term mechanism requires both sources.'},
        {text:'Short-term change must vanish, but long-term consolidation is preserved.',feedback:'This reverses the different calcium requirements on the slide.'},
        {text:'All tone detection must vanish, while both memory stages are preserved.',feedback:'Sensory input is intact by assumption; the manipulation targets plasticity-related calcium.'},
        {text:'All motor output must vanish, while both memory stages are enhanced.',feedback:'Motor output is intact by assumption, and removing a required consolidation signal does not predict enhancement.'},
      ],correct:0,modelAnswer:['CS evokes EPSPs; the US strongly depolarizes the same LA neurons.','Depolarization permits NMDA calcium entry and spikes; back-propagating spikes interact with CS EPSPs to recruit VGCC calcium.','The manipulation removes the second source while sparing the first.','Therefore short-term support can remain, but the proposed long-term consolidation process is compromised.']},
  ],
};
