import { card, mc, week } from './week.js';

export default week(1, [
  card('Recognise entrepreneurial work', '30–36',
    'Entrepreneurship starts with an opportunity to create value and requires action under uncertainty. An idea can be interesting while leaving the problem, the people affected and the way to reach them unknown. Start by naming the opportunity and the evidence that would make it worth pursuing.',
    'A new firm is one vehicle for the work. Judge the work by what the team learns and does with an opportunity. A polished plan alone provides little evidence about the problem or whether a solution will create value.'),
  card('Turn a technical capability into value', '72–79',
    'Technology is applied knowledge. A device, process or algorithm can be the basis for a venture. Commercialisation connects what it can do with a use someone cares about and a way of getting the solution into that market.',
    'For example, a sensor that takes readings faster has a technical advantage. The venture question is whether that speed improves a specific customer job, such as detecting defects before a production batch is lost. Start from the consequence for that customer.'),
  card('Match the next action to the venture stage', '34–36',
    'Identify a problem or opportunity. Explore customers, technology, the market and context. Develop the solution, prototype and business model. Validate their assumptions by gathering evidence.',
    'Mobilise the people, resources, partners and funding needed to proceed. Commercialise by bringing the offering to market. Then scale, adapt or pursue a new opportunity as evidence changes. Treat these stages as a way to choose the next action. A failed test can send the team back to exploration.'),
  card('Distinguish technology ventures from conventional businesses', '85–92',
    'A conventional business can often start with a known problem and solution and compete through execution, service or location. A technology venture may be uncertain about both the problem and the solution. It can need technical development, pilots and certification before sales. Deep-tech ventures are especially knowledge- and capital-intensive. Sequence commitments around evidence so technical and market risks become visible before you scale.'),
], card('Recap', '35, 72–79, 92',
  'Opportunity is the chance to create value. Validation tests a belief. Commercialisation brings the solution to market. Identify the unresolved uncertainty before choosing the next action.'),
card('Commercialisation context', '73, 89–91',
  'Technologies can combine existing components and know-how. Technical parts and connections can change how a venture competes, including through network effects.'),
[
  mc('w01-value', 'easy', '30–36, 72–79', 'What should a team investigate first if it has a faster sensor and no named application?', 0, [
    ['Which customer task benefits from speed', 'Start with a use where speed changes an outcome the customer values.'],
    ['Which prototype best showcases the speed', 'A showcase demonstrates capability. The team still needs to identify who benefits.'],
    ['Which production process raises sensor output', 'Production scale is premature when the customer and use are unknown.'],
  ]),
  mc('w01-explore', 'easy', '35', 'A team has identified a problem and wants to learn how customers handle it today. Which stage fits?', 1, [
    ['Mobilise people and funding', 'Mobilising assembles resources to carry the venture forward.'],
    ['Explore customers and context', 'Exploration investigates the problem, customer, market and technology.'],
    ['Commercialise the offering', 'Commercialisation brings a solution to market.'],
  ]),
  mc('w01-validate', 'easy', '35', 'Which action best fits validation after a prototype has been developed?', 2, [
    ['Recruit a partner to expand distribution', 'This assembles a resource for market access.'],
    ['Describe the market and its participants', 'This is broadly exploratory and does not test a specific claim.'],
    ['Test a key assumption using the prototype', 'Validation tests assumptions and collects evidence the team can act on.'],
  ]),
  mc('w01-market', 'easy', '35', 'A venture has a tested solution and an initial distribution partner. Which action counts as commercialisation?', 1, [
    ['Screen ideas for the next offering', 'This identifies opportunities for another cycle.'],
    ['Make the offering available to customers', 'Commercialisation is the step of bringing the offering to market.'],
    ['Gather more options for the prototype', 'This belongs to developing the solution.'],
  ]),
  mc('w01-tech-risk', 'easy', '85–92', 'Which cost is especially characteristic of getting a new technology venture to its first sales?', 0, [
    ['Pilots and technical qualification', 'A technology venture may need development, pilots and certification before sales.'],
    ['Rent and ordinary premises setup', 'These are ordinary setup costs for many conventional firms.'],
    ['Service staffing and local promotion', 'These can support execution in a conventional business.'],
  ]),
  mc('w01-compare', 'medium', '85–92', 'One team opens a repair shop using proven tools. Another develops a new inspection method for an untested market. Which comparison should drive their plans?', 2, [
    ['Both mainly face the same local service risk', 'The new method adds uncertainty about performance and demand.'],
    ['The shop mainly faces the higher technical risk', 'The shop is using proven tools for a known service.'],
    ['The inspection team faces technical and market risk', 'Its method and the demand for it are both uncertain.'],
  ]),
  mc('w01-adapt', 'medium', '34–36, 72–79', 'A field trial shows the device works, but the customer values reliability over the speed that the team advertised. What is the best next step?', 0, [
    ['Revisit the customer need and test reliability', 'Use the evidence to revise the offer and validate the outcome the customer cares about.'],
    ['Scale production around the demonstrated speed', 'The speed result does not establish value to this customer.'],
    ['Freeze the offer and seek wider distribution', 'Distribution expands reach without resolving the mismatch in value.'],
  ]),
  mc('w01-stage-both', 'hard', '34–36, 85–92', 'A lab technique works once, the interested partner has no buyer commitment and production equipment is costly. Which plan makes the most sense?', 1, [
    ['Buy equipment, then use capacity to attract buyers', 'This commits capital before checking repeatability or demand.'],
    ['Check repeatability and buyer value before investing', 'Check both stacked uncertainties before taking on a costly commitment.'],
    ['Secure a distributor, then validate after launch', 'A distribution agreement alone does not establish performance or buyer value.'],
  ]),
]);
