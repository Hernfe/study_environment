import { card, mc, week } from './week.js';

export default week(10, [
  card('Map capabilities for the next twelve months', '6–12',
    'A venture team combines complementary capabilities with a common goal and mutual accountability. Score science, build, sell, and money and legal. Give 3 for proven capability in a similar venture, 2 for credible but unproven capability, and 1 for a gap. Tag interview evidence I, desk evidence D and assumptions A. For each critical gap choose hire, advise, partner or learn, and specify an owner, cost and date.'),
  card('Negotiate contributions, equity and control', '15–21',
    'Rich or King is the trade-off between building company value and retaining control. Sharing equity can attract talent and capital, while founders may give up influence over who runs the company. Negotiate equity for contributions such as IP, time, credibility and access to capital. Vesting earns ownership over time or through milestones. Four years with a twelve-month cliff is a typical schedule.',
    'Check the institutional IP licence in a spinout and treat unconfirmed terms as assumptions. Write down ownership, equity and vesting, roles and decision rights, time and money commitments, and what happens when someone leaves.'),
  card('Give decisions a home', '26–31',
    'Organisational design covers leadership, talent, culture and structure. As the venture grows, organise into small cross-functional teams. Set a communication rhythm and a hiring bar. Assign one decision owner for recurring decisions. RAPID separates Recommend, Agree, Perform, Input and Decide.',
    'An advisor offers judgement and contacts. An advisory board has no fiduciary duty in the course framework. The legally constituted board of directors has fiduciary duties and oversees the CEO. Giving someone a seat affects control. In a network map, record a route to each contact.'),
  card('Scale what the team can prove', '38–45',
    'The stages are start-up, take-off, growth, slowing growth and maturity. Fast growth can require repeated staged financing. To grow through a new product, customer segment or geography, set a measurable trigger. Combining all three moves raises risk.',
    'Check where scaling will break first: manufacturing, supply chain, talent, cash, partnerships or organisation. Prove that capability at smaller scale. Keep activities that create value, are rare, are hard to imitate and fit the venture. Test platform logic by naming the sides, how participation raises value and what creates lock-in. If platform logic fails, consider levers such as licensing, standards or manufacturing partners.'),
], card('Recap', '12, 21, 31, 45',
  'Staff the critical gaps, write down decision rights, and gate the next growth move on evidence from the most fragile part of the operation.'),
card('Illustrative growth benchmarks', '12, 31, 45',
  'The deck describes about two to six people in a venture team and later cross-functional units of about five to ten. It illustrates fast growth at about 40% annually, slow growth at about 10%, and a management crunch around year three or four. Use the figures as context for capital and coordination decisions.'),
[
  mc('w10-gap', 'easy', '9–12', 'A founder has credible sales experience but has never sold in a similar venture. How should the capability be scored?', 0, [
    ['2, credible but unproven', 'Credible evidence without similar venture performance earns 2.'],
    ['3, proven in a similar venture', 'This requires proof in a comparable setting.'],
    ['1, a capability gap', 'The prompt supplies credible, if unproven, capability.'],
  ]),
  mc('w10-vesting', 'easy', '17–21', 'Which term makes an equity grant accrue as a founder continues contributing over time?', 1, [
    ['An agreed initial split', 'A split sets the allocation without specifying how it is earned.'],
    ['An agreed vesting schedule', 'Vesting ties ownership to time or milestones.'],
    ['An agreed licensing field', 'Field of use concerns rights to the licensed technology.'],
  ]),
  mc('w10-decision', 'easy', '27, 31', 'Several people provide input on spending, but approvals keep stalling. What should the team clarify first?', 2, [
    ['Who can provide technical input', 'Additional input does not identify who makes the decision.'],
    ['Who records the meeting notes', 'Documentation preserves the outcome once someone can decide.'],
    ['Who owns the final decision', 'RAPID assigns a clear Decide role for the recurring choice.'],
  ]),
  mc('w10-directors', 'easy', '28–31', 'Which body has fiduciary duties and oversees the CEO?', 0, [
    ['The venture’s board of directors', 'Directors oversee the CEO in a legally constituted governing body.'],
    ['The venture’s advisory board', 'An advisory board provides advice without those director duties.'],
    ['The founder’s expert network', 'A network supplies knowledge and contacts without formal oversight.'],
  ]),
  mc('w10-contacts', 'easy', '30–31', 'A network map names a promising distribution partner. What should the team add to make the map actionable?', 1, [
    ['A new name for the partner category', 'A category label does not give the team a way to reach the partner.'],
    ['A credible path to an introduction', 'A route to the contact makes the network usable.'],
    ['An extra list of unrelated partners', 'A longer list does not improve access to the named contact.'],
  ]),
  mc('w10-control', 'medium', '15–17, 21', 'A founder wants a larger company and insists on keeping every important decision. What should the team discuss?', 2, [
    ['How retaining every decision can replace capital and talent', 'Control by itself does not supply the resources the company needs to grow.'],
    ['How a vesting cliff can remove trade-offs over control', 'Vesting governs when equity is earned and leaves the governance choice open.'],
    ['How attracting partners and capital may require sharing control', 'The Rich or King trade-off puts the resources gained alongside the control surrendered.'],
  ]),
  mc('w10-make', 'medium', '42–45', 'A proprietary calibration process is valuable, rare, hard to imitate and central to the venture. Standard packaging is widely available. Which plan fits?', 0, [
    ['Keep calibration in-house and outsource standard packaging', 'The distinguishing capability fits the venture, while standard packaging can be bought.'],
    ['Outsource calibration and keep standard packaging in-house', 'This moves the distinguishing capability outside while keeping the commodity task.'],
    ['Keep both in-house to protect packaging expertise', 'The prompt gives no strategic reason to use scarce resources on ordinary packaging.'],
  ]),
  mc('w10-scale', 'hard', '38–45', 'A device sells in one region, but suppliers miss deadlines and more installations do not improve value for existing users. What should gate a second region?', 1, [
    ['Enough new sign-ups to produce a local network effect', 'The stated use case gives no reason for that effect and leaves supply unresolved.'],
    ['Demonstrated supplier reliability at the current rollout scale', 'Supply is the fragile point. Prove it first, then expand delivery without relying on a network effect.'],
    ['Simultaneous launch of a new product and a new channel', 'Changing several dimensions increases risk while supplier reliability remains unproven.'],
  ]),
]);
