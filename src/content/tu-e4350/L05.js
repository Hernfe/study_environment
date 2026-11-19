import { card, mc, week } from './week.js';

export default week(5, [
  card('Name the level and the source of uncertainty', '6–10',
    'The four levels describe how well you can bound outcomes. You may face a clear single outcome, a limited set, a wide range, or a range you cannot yet bound. The source is a separate question. It may be the market, organisation and management, product and process, or the broader context.',
    'Name the assumption that could break the venture and whose evidence is weak. If buyers are known but the physics is unproven, test the critical function. If the technology works and demand is unclear, test customer behaviour. Where both risks are high, run cheap parallel tests or narrow the problem.'),
  card('Work backwards from the decision', '12–16',
    'Build–measure–learn starts with a falsifiable hypothesis. Specify who will do what observable thing, the threshold for evidence, and by when. Build the smallest artefact that can test that claim. Decide how to measure before collecting results. Then decide whether to persevere, pivot or stop, and record what changed.',
    'For a demand test, count an action such as committing to a trial. An expression of interest tells you less about commitment. In deep tech, long development cycles make the order of tests particularly important.'),
  card('Choose the minimum viable test', '16, 21–24',
    'Match the minimum viable product (MVP) to the doubt. A validated simulation or bench prototype can probe the physics. A concept test can probe demand. An operational pilot can test performance at a named customer’s site. Accredited testing can address a claim that needs independent verification.',
    'Before a pilot, agree what is measured, who measures it, what passes and what follows. Agree data and IP ownership. A paid pilot adds evidence of willingness to pay.'),
  card('Predeclare when to stop', '10, 12, 37–40',
    'Write a success threshold and a stop or pivot criterion before the test. State what you will do if the result is in between. Stage large commitments so you can act on the result before spending more.'),
], card('Recap', '9–16, 21–24, 38',
  'Name the riskiest assumption. Write a claim that can fail, choose a test that can change your mind, and decide what each result means before running it.'),
card('Technical maturity context', '24',
  'A component in a realistic rig can test the move from laboratory validation to a relevant environment. An operational pilot asks whether a system works where the customer actually uses it.'),
[
  mc('w05-level', 'easy', '7–8', 'A team can list a small set of possible outcomes for a test. Which uncertainty level fits?', 0, [
    ['A limited set of outcomes', 'This is the second level, with a bounded set of possibilities.'],
    ['A wide range of outcomes', 'This is broader than the small set described.'],
    ['An unbounded range of outcomes', 'The team can specify the possibilities in this case.'],
  ]),
  mc('w05-source', 'easy', '8', 'A device performs well, but the team is unsure which industry standard will apply. Which source of uncertainty is this?', 1, [
    ['Market uncertainty', 'Market uncertainty concerns buyers, competition and channels.'],
    ['Context uncertainty', 'Standards and regulation belong to the external context.'],
    ['Management uncertainty', 'This concerns the team’s capabilities, talent and organisation.'],
  ]),
  mc('w05-bench', 'easy', '9, 16, 21–22', 'A buyer is ready to trial a device, but its core function is unproven. Which first test fits?', 2, [
    ['Interview users about buying preferences', 'This is a market test. It does not verify the function.'],
    ['Open a waitlist for an early trial', 'A waitlist measures interest, which is already present.'],
    ['Bench-test the critical device function', 'The bench test tackles the unresolved technical risk directly.'],
  ]),
  mc('w05-threshold', 'easy', '10, 12, 38', 'When should a team decide how many commitments count as success?', 1, [
    ['After it has received the first responses', 'Early responses can already bias the threshold.'],
    ['Before it starts collecting customer responses', 'Fix the threshold before seeing the evidence so the test can fail.'],
    ['After it has reviewed all the responses', 'Picking a threshold after seeing results lets the team move the goalposts.'],
  ]),
  mc('w05-site', 'easy', '21–24', 'Lab tests pass. The remaining question is whether the system works in the buyer’s actual workflow. What fits?', 0, [
    ['A small pilot at the buyer’s site', 'An operational pilot tests use in the real workflow.'],
    ['A specification sheet shown to buyers', 'This can test interest in a concept but does not observe operation.'],
    ['A repeat of the original lab test', 'It adds lab evidence without changing the operating environment.'],
  ]),
  mc('w05-claim', 'medium', '12–16, 38', 'Which is a falsifiable hypothesis for a demand test?', 2, [
    ['By June most plant managers will understand the proposed service', 'Understanding is hard to observe and “most” leaves the sample undefined here.'],
    ['In a trial email several plant managers will express strong interest', 'There is no clear decision threshold or deadline.'],
    ['By June three of eight named plants will commit to a paid trial', 'The population, behaviour, threshold and deadline can all be checked.'],
  ]),
  mc('w05-stop', 'medium', '10, 12, 38–40', 'A team predeclared that at most one commitment means reconsider the segment. It gets one commitment and six compliments. What follows?', 0, [
    ['Reconsider the segment based on the commitment count', 'The outcome meets the stop criterion. Compliments are different from commitments.'],
    ['Continue by counting compliments as commitments', 'That changes the measured behaviour after seeing the result.'],
    ['Keep the segment by lowering the stop threshold', 'Changing the threshold after the test erases the decision boundary.'],
  ]),
  mc('w05-paired', 'hard', '9–10, 16, 21–24', 'A new process has uncertain performance and no buyer commitments. A full facility would be expensive. Which plan reduces both risks before committing?', 1, [
    ['Install the facility and then seek a paid operational pilot', 'This spends before testing either assumption cheaply.'],
    ['Bench-test the critical function and separately test buyer commitment', 'Parallel, small tests can address both risks before funding capacity.'],
    ['Run more simulations and use the results as demand evidence', 'Simulation addresses feasibility but cannot establish customer behaviour.'],
  ]),
]);
