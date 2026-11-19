import { card, mc, week } from './week.js';

export default week(6, [
  card('Frame the problem and iterate the design', '3, 5–6, 10, 15–16',
    'Frame a customer problem, give ideas time to incubate, generate alternatives before judging them, and evaluate the strongest candidates. In brainstorming, set a clear challenge, invite diverse participants, focus on users and defer judgement. Capture ideas so the team can evaluate them afterwards. Prototype to learn and reframe the problem when the evidence changes what you think users need.',
    'Development moves through research and development, design, prototyping and testing. If performance is unsatisfactory, revise and retest. Finalise when the evidence supports the design. Keep the goal stable, share test results across functions and budget for iterations. Hardware tooling and supplier lead times make late changes expensive.'),
  card('Build the cheapest prototype that answers the question', '22–25',
    'Use a sketch or storyboard to agree on the concept, a looks-like model to explore form and interface, and a works-like rig to test a critical mechanism. An integrated prototype tests whether subsystems work together. A pilot unit tests the product where the customer works. Simulation can test the physics before you build. Choose the evidence you need before choosing the artefact.'),
  card('Observe what users actually do', '23, 26',
    'Measure ease of learning, efficiency once trained, memorability after a gap, frequency and severity of errors, and satisfaction. Watch users complete representative tasks and ask why at surprising moments. A lead user already has a workaround. A design partner stays involved during development and has agreed obligations alongside the venture.'),
  card('Make the roadmap conditional', '29–32',
    'Compare plausible futures. Do work that pays off across them now and give scenario-specific work a measurable trigger. Use Now for work with an owner and resources, Next for work contingent on evidence, Later for direction, and Not yet for explicit exclusions. Tie milestones to technology readiness and account for supplier, certification and trial dependencies. Decide in advance where to stop, pivot or commit further.'),
], card('Recap', '10, 22–26, 29–32',
  'Name the uncertainty, choose the test and record what happened. Use the result to revise the design or unlock the next milestone.'),
card('Planning across scenarios', '29–30',
  'A useful pair of scenarios can differ on a single external dependency. If timing hinges on approval, reserve work that requires it for a milestone with an explicit approval trigger.'),
[
  mc('w06-loop', 'easy', '10, 15', 'A prototype fails the agreed performance test. What should the team do next?', 0, [
    ['Revise the design and repeat the test', 'A failed test sends development back into the iteration loop.'],
    ['Finalise the design and plan a rollout', 'Finalising follows satisfactory evidence.'],
    ['Freeze the design and document the result', 'Record the result, then use it to guide a revision.'],
  ]),
  mc('w06-rig', 'easy', '22, 24', 'An industrial latch looks right. Its critical mechanism has never operated under load. Which prototype fits?', 1, [
    ['A looks-like model of the housing', 'This tests form or interface rather than load performance.'],
    ['A works-like rig for the latch', 'This isolates the mechanism under the required conditions.'],
    ['An integrated pilot at a customer site', 'A pilot adds site variables before the mechanism is proven.'],
  ]),
  mc('w06-observe', 'easy', '26', 'Operators describe an easy setup, but field logs show repeated restarts. How should the team investigate?', 2, [
    ['Survey operators about preferred setup wording', 'Preferences may miss the moment where setup breaks.'],
    ['Ask supervisors to estimate setup difficulty', 'A second-hand estimate misses the steps operators take.'],
    ['Observe setup and ask about each restart', 'Contextual inquiry uses actual behaviour to uncover the cause.'],
  ]),
  mc('w06-memory', 'easy', '23', 'After a month away, trained operators struggle to remember the controls. Which usability factor is weak?', 0, [
    ['Memorability after a gap', 'Memorability is how well users resume after time away.'],
    ['Ease of initial learning', 'Initial learning concerns new users acquiring the skill.'],
    ['Efficiency after repeated use', 'Efficiency concerns how quickly practised users complete the task.'],
  ]),
  mc('w06-next', 'easy', '30–31', 'A second site is planned only if the first pilot meets its uptime target. Where should it go?', 1, [
    ['Now, with procurement starting immediately', 'Now covers work already being built or tested.'],
    ['Next, with the uptime threshold attached', 'Next names follow-on work and the evidence that unlocks it.'],
    ['Later, with a fixed launch date', 'Later conveys direction without a dated commitment.'],
  ]),
  mc('w06-ideation', 'medium', '5–6, 10', 'A test shows a redesign solves a task that operators rarely need. Which response best addresses the result?', 2, [
    ['Retest the redesign against the original brief', 'Another test against the old brief cannot repair a framing error.'],
    ['Optimise the original design for faster use', 'Speed matters only if the underlying task is important.'],
    ['Reframe the problem around observed work', 'New evidence can change the problem that the team should solve.'],
  ]),
  mc('w06-integration', 'medium', '22, 24', 'The motor and controller pass separately. The team needs evidence that they work together before involving a customer. What fits?', 0, [
    ['Build an integrated prototype and test both together', 'The uncertainty is system integration, which this prototype isolates.'],
    ['Make a looks-like model and test its controls', 'An interface test cannot establish subsystem compatibility.'],
    ['Build a pilot and test during customer operations', 'A site trial adds complexity before joint operation is shown.'],
  ]),
  mc('w06-gates', 'hard', '24, 29–32', 'A critical mechanism is unproven. A field pilot also depends on a supplier with variable lead time. What should the roadmap show?', 1, [
    ['Start pilot installation now and test the mechanism on site', 'This commits to the expensive experiment before isolating the risk.'],
    ['Test a rig now and gate the pilot on performance and supply', 'Prove the mechanism first and make the downstream dependency explicit.'],
    ['Wait for the supplier and finalise the mechanism on its arrival', 'Mechanism testing can reduce risk now, and supplier arrival is not performance evidence.'],
  ]),
]);
