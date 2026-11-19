import { card, mc, week } from './week.js';

export default week(9, [
  card('Choose protection for the copying threat', '6–10',
    'Ask what a competitor would copy, whether you could detect it, what remedy you could pursue and at what cost. A trade secret lasts while it stays secret and can be lost through disclosure or reverse engineering. Patents require a novel, non-obvious and useful invention. They typically last for 20 years from filing, and apply only in covered territories. The owner enforces them. If enforcing is impractical, a patent may mainly help with signalling or bargaining.',
    'Trademarks identify source. Copyright protects expression, including code, while leaving the underlying idea or function open. Public disclosure can destroy patent novelty. The lecture’s sequence is file before publishing, then use the deck’s twelve-month priority window to decide where else to file.'),
  card('Establish ownership and negotiate rights', '12–15',
    'For a Finnish university employee invention, the deck distinguishes disclosure to the university, the institution’s right to acquire rights and inventor compensation. Confirm ownership and arrange a licence or assignment for a spinout. A licence can vary by exclusivity, field and geography. Money may include fees, royalties or equity. Check scope, money, diligence, improvements, enforcement and termination. Tag institution-specific terms as interview evidence or assumptions.'),
  card('Check freedom to operate before freezing the design', '17–20',
    'An improvement patent can coexist with claims covering the underlying technology. Freedom to operate (FTO) asks whether a specific product can be sold in a specific market without infringing. Search keywords, CPC classifications, players and claims. Record number, applicant, priority date and legal status as desk evidence. Read status, claim 1, dependent claims, cited prior art and country family. Take relevant results to counsel for an opinion.'),
  card('Put regulatory gates and IP actions in order', '22–26, 28–31',
    'For each rule record the trigger, enforcer, proof and lead time. The slowest applicable requirement gates the sale. Compare complying early, shaping a standard and choosing a market outside the rule. Tag interview evidence I, desk evidence D and assumptions A, including unconfirmed lead times.',
    'Disclose and file before publication. Search trademarks and obtain contributor assignments early. Do the first FTO pass before design freeze, classify before the first pilot, and review chain of title before fundraising. Assign owners and dates.'),
], card('Recap', '10, 15, 20, 26, 31',
  'Start from the threat, establish who owns what, check the relevant claims and territories, then put each proof requirement on the timeline.'),
card('Regulatory examples from the November 2026 slides', '26',
  'The deck lists the AI Act, Data Act, Cyber Resilience Act, GDPR, medical-device rules and CE-marking product rules. Treat the slide dates as historical context. For a case, identify the trigger, enforcer, required proof and expected lead time for the product and market.'),
[
  mc('w09-secret', 'easy', '7–10', 'A factory recipe is hidden and hard to reverse engineer. Which approach relies on keeping access controlled?', 0, [
    ['Protect it as a trade secret', 'Secrecy can protect a recipe as long as it stays secret.'],
    ['Register it as a trademark', 'A trademark identifies source rather than protecting a manufacturing method.'],
    ['Protect the recipe’s function with copyright', 'Copyright protects the written expression rather than the function.'],
  ]),
  mc('w09-file', 'easy', '10, 31', 'A team wants a patent and plans to publish a description. Which order protects novelty under the lecture framework?', 1, [
    ['Publish the description, then file', 'Public disclosure can defeat novelty.'],
    ['File the application, then publish', 'Filing first protects the priority claim against the team’s later disclosure.'],
    ['Publish the description and skip filing', 'Publication alone cannot obtain patent rights.'],
  ]),
  mc('w09-field', 'easy', '14–15', 'A spinout wants exclusive rights for one industry. Which licence term defines that industry?', 2, [
    ['Its diligence milestones', 'Diligence describes what the licensee must do to retain rights.'],
    ['Its royalty schedule', 'Royalties define part of the price of the rights.'],
    ['Its field of use', 'This delimits the application covered by the licence.'],
  ]),
  mc('w09-patent', 'easy', '19–20', 'Which part of a patent should a team check first when assessing a record’s relevance to launch?', 0, [
    ['The legal status', 'Check legal status before reading the claims, then check territorial coverage.'],
    ['The cited prior art', 'Review cited art after status, claim 1 and dependent claims.'],
    ['The dependent claims', 'First check status, then read the independent claim before its dependent claims.'],
  ]),
  mc('w09-rule', 'easy', '22–26', 'A launch plan names the rule, its trigger, the authority and the evidence to submit. Which planning input is missing?', 1, [
    ['The owner of the source code', 'Code ownership can matter for IP. It is separate from the four regulatory questions.'],
    ['The lead time for approval', 'Lead time determines when the evidence and approval can be ready.'],
    ['The identifier of a rival patent', 'Patent records belong in the FTO analysis.'],
  ]),
  mc('w09-fto', 'medium', '17–20', 'The team patents an improvement. Launch requires a base method covered by a competitor’s live claim in the target market. What follows?', 2, [
    ['Proceed because an improvement patent authorises the base method', 'The improvement patent grants no right to use the underlying invention.'],
    ['Proceed because the new application has a different priority date', 'A later priority date does not remove the existing claim.'],
    ['Ask counsel to assess the claim and consider a licence or design-around', 'Valid territorial claims can restrict use, even with a patent of your own.'],
  ]),
  mc('w09-diligence', 'medium', '14–15', 'Two exclusive licences have the same royalty. One can end if the startup misses an early commercial launch. What should the startup compare?', 0, [
    ['Diligence deadlines against a realistic timeline', 'The launch condition can put continuing rights at risk even at the same royalty.'],
    ['Applicant names against the royalty percentages', 'Names and equal royalties do not explain the different obligation.'],
    ['Patent family size against the upfront payment', 'Territories and payment matter, but do not resolve the stated launch condition.'],
  ]),
  mc('w09-sequence', 'hard', '10, 15, 20, 26, 31', 'A university prototype is heading for a paper, a tooling freeze and a regulated pilot. What should the team schedule?', 1, [
    ['Publish the paper, freeze the tooling design, then check IP ownership and approvals', 'Publication threatens novelty and tooling may lock in a design before the first FTO pass.'],
    ['Disclose and file before publication, screen FTO before freeze, and classify before the pilot', 'The plan preserves filing options, leaves room to change the design and maps pilot obligations early.'],
    ['Run the pilot, file on its results after publication and defer FTO to fundraising', 'The pilot and tooling commitments would precede relevant IP and regulatory checks.'],
  ]),
]);
