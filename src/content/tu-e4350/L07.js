import { card, mc, week } from './week.js';

export default week(7, [
  card('Choose a beachhead you can win', '5–9',
    'TAM is the total market. SAM is the part you can serve and reach. Check that a segment is measurable, accessible, substantial, differentiable and actionable. Choose one beachhead with expensive pain you can quantify in customer terms. Win a reference there before pursuing the next segment.',
    'The chasm separates visionary early adopters from the pragmatic early majority. The majority needs credible references and a complete solution it can use.'),
  card('Sell an outcome and complete the product', '11–14',
    'Identify users, recommenders, the economic buyer who controls the budget, technical evaluators who can veto adoption, and contract negotiators. The sales cycle runs from first contact to completed sale and belongs in the business model. Position the offer by naming the target customer, need, category, outcome and the alternative they use today.',
    'The generic product is the core function. The expected layer meets normal buyer expectations. The augmented layer adds what makes the whole offer work for pragmatists, such as integration or support. Assign each gap to your team, a partner or the customer.'),
  card('Pick a route and design the pilot to lead to a sale', '16–20',
    'Direct sales preserve control and margin but require sales capacity. A channel trades margin and control for reach. Design-in embeds your component in another product. Licensing can extend reach quickly while giving the partner control over selling. Pilot-led selling uses a trial to convert an account. Joint development shares work with a partner. Compare each route on control, margin, speed and reach.',
    'In-house salespeople know the product and cost more. Independent reps serve multiple firms and cost less. Expand the sales team as sales accelerate. A credible pilot charges a fee and sets written success criteria in the customer’s metrics, an end date, follow-up and ownership of data and IP.'),
  card('Make the first deal concrete', '22–25',
    'Name one account, an offer, price logic and a timeline that includes certification or regulatory lead times. Explain why the chosen route beats a credible rejected route. Tag evidence I for interview, D for desk evidence, A for assumption and T for unproven technology. Track qualified conversations, conversion to pilot and purchase, cycle length, acquisition cost and willingness to serve as a reference.'),
], card('Recap', '9, 14, 20, 25',
  'Choose a reachable beachhead, map the buying roles, fill the whole-product gaps and specify how the first paid pilot can turn into a reference sale.'),
card('Adopter categories', '9',
  'The slide gives innovators at 2.5%, early adopters at 13.5%, early majority at 34%, late majority at 34% and laggards at 16%. The chasm comes before the early majority.'),
[
  mc('w07-sam', 'easy', '5, 9', 'A team estimates the market it can serve through its current channels. What is it sizing?', 1, [
    ['Total available market', 'TAM includes the broader demand beyond what the venture can serve.'],
    ['Served available market', 'SAM focuses on the market this venture can reach and serve.'],
    ['First beachhead account', 'One named account is narrower than the reachable market.'],
  ]),
  mc('w07-chasm', 'easy', '8–9, 14', 'Visionary buyers took a chance on an early device. Which group does the venture need to reach to cross the chasm?', 2, [
    ['The late majority', 'The late majority follows the pragmatic early majority.'],
    ['The early adopters', 'The venture has already reached those visionary buyers.'],
    ['The early majority', 'The chasm separates early adopters from pragmatic mainstream buyers.'],
  ]),
  mc('w07-role', 'easy', '11, 14', 'An engineer recommends a trial. Who should the team also involve to agree the commercial terms?', 0, [
    ['The contract negotiator', 'This role handles the terms needed to complete the purchase.'],
    ['The equipment user', 'The user informs requirements and use, which is a different role.'],
    ['The technical recommender', 'The recommender can advocate for the trial without negotiating terms.'],
  ]),
  mc('w07-route', 'easy', '16–20', 'An equipment maker will embed the startup’s component in its next machine. Which route is this?', 1, [
    ['Independent sales representation', 'An independent rep sells on behalf of several firms.'],
    ['Design-in with the manufacturer', 'The component becomes part of the equipment maker’s own design.'],
    ['Direct sales to equipment users', 'The startup is supplying the maker rather than selling to end users.'],
  ]),
  mc('w07-pilot', 'easy', '20', 'A paid pilot has written metrics and data terms, but runs indefinitely. Which addition makes it more useful for a sale?', 2, [
    ['A broader list of trial participants', 'A larger trial can still go on without a decision point.'],
    ['A longer list of optional features', 'More features do not set a decision date.'],
    ['An end date and agreed purchase follow-up', 'These turn the trial result into a scheduled commercial decision.'],
  ]),
  mc('w07-position', 'medium', '12–14', 'Which positioning statement gives a plant manager a reason to switch from manual checks?', 0, [
    ['For plant managers, our monitoring service cuts inspection downtime compared with manual rounds', 'This identifies buyer, need, category, outcome and the current alternative.'],
    ['For plant managers, our monitoring service combines high-rate sensors with a reporting interface', 'This describes the offer but leaves out the buyer outcome and comparison.'],
    ['For plant managers, our monitoring service uses analytics tested by the development team', 'Testing supports a claim but does not state the buyer outcome or alternative.'],
  ]),
  mc('w07-conversion', 'medium', '20, 25', 'Qualified accounts regularly start paid pilots, but few go on to buy. What should the team investigate first?', 1, [
    ['The cost of starting more qualified conversations', 'The visible loss occurs after accounts have already entered the pilot.'],
    ['The pilot-to-purchase step and follow-up terms', 'This conversion exposes the stage where interested accounts are dropping out.'],
    ['The number of unqualified accounts in the wider market', 'Wider market size is separate from conversion after pilots.'],
  ]),
  mc('w07-first-deal', 'hard', '9, 14, 20, 25', 'One plant has measured costly downtime. Its buyer needs local support and certification before purchase. Which first-deal plan fits?', 2, [
    ['Offer that plant a direct trial, then arrange support and certification after the order', 'The plan defers two buying requirements until after the buyer needs them.'],
    ['Choose a distributor for reach and market to every plant before pricing a pilot', 'Wider reach leaves the proven beachhead and the first commercial offer unspecified.'],
    ['Name that plant, line up support, budget for certification and specify paid conversion terms', 'This combines a credible beachhead, whole-product support, a gating dependency and a path to purchase.'],
  ]),
]);
