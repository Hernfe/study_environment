import { card, mc, week } from './week.js';

export default week(4, [
  card('Connect vision, mission and strategy', '6–10',
    'Vision describes the venture’s intended future. Mission explains what it does, for whom and why. Strategy makes choices about where and how to compete, including what to leave out. The business model shows how these choices fit into a venture that creates, delivers and captures value.',
    'When these disagree, identify the choice that needs to change. For example, a strategy for tightly regulated buyers may require a longer sales cycle and more service than a self-serve model can support.'),
  card('Match the offer to a specific customer', '12–17',
    'In the Value Proposition Canvas, the customer profile records the segment’s jobs, pains and gains. The value map records products and services, pain relievers and gain creators. Link each important part of the offer to an observed customer priority.',
    'Use a concrete measure of improvement the customer recognises, such as time saved per batch. Record which beliefs come from interviews or desk research and which are assumptions.'),
  card('Check all nine Business Model Canvas blocks', '27–35',
    'Map customer segments, value propositions, channels, customer relationships and revenue streams. Then identify key resources, activities, partners and the cost structure. Check if the pieces reinforce one another. For example, a highly customised offer needs a channel that can support a complex sale and revenue that covers delivery.',
    'Choose a revenue model suited to the customer’s buying process and the way value is delivered. A subscription needs recurring value and retention. Usage-based pricing needs measurable usage. Check price, direct cost to serve, acquisition cost and customer lifetime. The contribution earned over that lifetime needs to justify the cost of acquisition.'),
  card('Test what makes the advantage durable', '55–71',
    'Industry structure shapes how much value a venture can keep. An asset can help, but a distinctive capability comes from repeatable work the team can do. Look for a capability that matters to customers and is hard for rivals to copy. Build the ability to learn as the basis of competition changes.'),
], card('Recap', '6–17, 27–35, 64–70',
  'Link an observed customer priority to the offer, delivery and revenue. Identify which unproven assumption would break that chain.'),
card('Pricing anchors', '33',
  'Try the customer’s benefit, current spending on an alternative or the budget line that pays for the offer. These are starting points for testing, not verified prices.'),
[
  mc('w04-vision', 'easy', '6–10', 'What kind of statement describes the future the venture wants to bring about?', 0, [
    ['A vision statement', 'Vision describes the intended long-term future.'],
    ['A mission statement', 'Mission focuses on what the venture does, for whom and why.'],
    ['A pricing strategy', 'Pricing is a choice about how to compete and capture value.'],
  ]),
  mc('w04-pain', 'easy', '14–17', 'Production staff say manual inspection delays every batch. Where does this observation belong?', 1, [
    ['A pain reliever in the value map', 'A pain reliever describes what your design does about the delay.'],
    ['A customer pain in the profile', 'The delay is an obstacle the customer already experiences.'],
    ['A gain creator in the value map', 'A gain creator describes what your design does to deliver a desired outcome.'],
  ]),
  mc('w04-channel', 'easy', '28', 'A venture will reach customers through specialist distributors. Which canvas block captures how it reaches them?', 2, [
    ['Customer segments', 'Segments identify whom the venture serves.'],
    ['Customer relationships', 'Relationships describe how the venture gets, retains and grows customers.'],
    ['Distribution channels', 'Channels describe how the offering reaches the segment.'],
  ]),
  mc('w04-capability', 'easy', '64–67', 'A firm owns test equipment and can use it to repeatably meet a tolerance. What is its capability?', 1, [
    ['Its ownership of the equipment', 'Equipment is an asset that supports the capability.'],
    ['Its ability to meet tolerance', 'A capability is what the people and processes can reliably do.'],
    ['Its wish to enter other markets', 'That describes an intention rather than a demonstrated ability.'],
  ]),
  mc('w04-usage', 'easy', '31', 'Customers want their bill to reflect how many batches they process. Each batch can be metered. Which model fits?', 0, [
    ['Charge per batch processed', 'Usage-based pricing fits a measurable quantity tied to use.'],
    ['Charge a flat annual subscription', 'A flat fee does not vary with processing volume.'],
    ['Charge a fixed installation fee', 'An installation fee does not follow ongoing use.'],
  ]),
  mc('w04-coherence', 'medium', '27–35', 'Customers require on-site configuration before use, but the canvas assumes self-service and minimal support costs. What should the team do?', 2, [
    ['Keep self-service and increase promotion', 'More reach leaves installation and its cost unresolved.'],
    ['Keep support costs low and target similar customers', 'More customers with the same requirements repeat the same mismatch.'],
    ['Align delivery and pricing with installation needs', 'The service requirement affects both how customers are served and the economics.'],
  ]),
  mc('w04-advantage', 'medium', '64–71', 'Rivals can buy the same equipment. What would best support a claim of durable advantage?', 0, [
    ['Repeatable work that buyers value and rivals find hard to copy', 'Test durability through customer benefit and difficulty of imitation.'],
    ['More equipment purchases available on the same terms to rivals', 'Buying the same assets does not show a distinctive capability.'],
    ['A long-term vision rivals are unlikely to state in the same words', 'A distinctive statement does not establish an advantage in delivery.'],
  ]),
  mc('w04-unit', 'hard', '31–33', 'A service charges €100 a month, costs €60 a month to deliver and loses the average customer after six months. Acquisition costs €300. What does this imply before fixed costs?', 1, [
    ['The model works because lifetime revenue exceeds acquisition cost', 'Lifetime revenue is €600, but direct costs and acquisition both matter.'],
    ['The model falls short because lifetime contribution is below acquisition cost', 'Six months at €40 contribution gives €240, which falls €60 short of acquisition cost.'],
    ['The model breaks even because delivery cost is below price', 'A positive monthly contribution can still be too small to recover acquisition cost.'],
  ]),
]);
