import { card, mc, week } from './week.js';

export default week(3, [
  card('Turn an idea into an opportunity claim', '6–10, 24',
    'An idea proposes a solution. An opportunity connects a solution you can deliver with a problem someone cares enough to pay to solve. Test five characteristics. The need must be timely, the problem solvable with accessible resources, the pain important to customers, the business profitable, and the industry and regulatory context favourable.',
    'Treat each characteristic as a claim. A strong result on one cannot resolve uncertainty on another. Potential customers can have a costly problem in a context that still prevents deployment.'),
  card('Ask for behaviour and map buying roles', '13–22',
    'Interview people who do the work and people involved in approving the purchase. Ask them to walk through the last incident, the workaround and its cost. Find out who owns the budget and what must happen before a purchase. Questions about past actions give you evidence you can check.',
    'Keep observations separate from your interpretation. A compliment is weak evidence. An existing workaround, time already spent or concrete next step gives you something to investigate.'),
  card('Screen market, industry and team', '24–30',
    'The seven domains look at overall market attractiveness and benefits to the target segment, industry attractiveness and sustainable advantage, plus three team questions. Check whether the opportunity fits the team’s mission and risk appetite, whether it can execute the key tasks, and whether it has useful connections along the value chain.',
    'A large market can still be a poor entry point if buyers feel little pain or rivals can copy the offer easily. Look for a specific segment with a compelling benefit.'),
  card('Track readiness on separate axes', '33–36',
    'Idea validation asks whether customers want the offer and whether it can support a business. Technology validation asks whether it can be built and will perform. Use interviews and commitment tests for demand. Use bench tests and realistic trials for technical performance.',
    'Technology Readiness Level (TRL) describes technical maturity, from basic principles through operational use. Market readiness concerns whether customers and the market are ready to adopt. Strong lab results say little about buyer demand, production economics or market timing.'),
], card('Recap', '19, 24–25, 33–36',
  'Name the buyer and their observed behaviour, screen the opportunity, and keep customer evidence separate from technical evidence.'),
card('Manufacturing readiness', '36',
  'For hardware, investigate whether you can make the product repeatedly at the target volume, cost and quality. Manufacturing readiness gives this its own measure.'),
[
  mc('w03-interview', 'easy', '19', 'Which interview opener is most likely to reveal a real workaround?', 0, [
    ['How did you handle the last failure?', 'A specific past incident surfaces observable behaviour.'],
    ['How useful does this proposal look?', 'A favourable opinion does not show the current workaround.'],
    ['How likely are you to adopt it?', 'A hypothetical intention is weaker than observed behaviour.'],
  ]),
  mc('w03-budget', 'easy', '13–19', 'Operators say they would welcome the tool. What should you ask to identify the buying process?', 1, [
    ['Which interface do operators prefer?', 'This explores usability and choices for the design.'],
    ['Who approves spending and from which budget?', 'Budget ownership and sign-off identify the buying process.'],
    ['Which tasks should operators automate first?', 'This helps identify user jobs but does not establish authority.'],
  ]),
  mc('w03-context', 'easy', '24', 'Customers report a pressing need, but rules may prohibit deployment. Which opportunity characteristic is in doubt?', 2, [
    ['Importance to the customer', 'Customers already identify the need as pressing.'],
    ['Timeliness of the need', 'The need is already present. The barrier is in the operating environment.'],
    ['Favourability of the context', 'The regulatory setting is part of the opportunity’s context.'],
  ]),
  mc('w03-execute', 'easy', '25', 'You want to know whether the team can carry out the venture’s critical work. Which domain are you assessing?', 1, [
    ['Overall market attractiveness', 'This evaluates market size, growth and trends.'],
    ['Ability to execute', 'This team domain asks whether the team can deliver the critical success factors.'],
    ['Sustainable advantage', 'This evaluates whether the venture’s edge and economics will hold up.'],
  ]),
  mc('w03-feasibility', 'easy', '33–35', 'A team doubts its device can survive realistic vibrations. What evidence should it seek?', 0, [
    ['Performance on a relevant vibration test', 'Test the technical claim under conditions that represent intended use.'],
    ['Buyer ratings of the device concept', 'Ratings explore customer interest, rather than vibration performance.'],
    ['Customer data on workaround spending', 'Spending helps assess the opportunity while leaving the technical question open.'],
  ]),
  mc('w03-segment', 'medium', '24–30', 'Analysts forecast rapid market growth, but the proposed first customers already have a cheap workaround they like. Which claim needs the most scrutiny?', 2, [
    ['How fast the overall market will grow', 'That is a macro market question. It does not resolve the mismatch for this segment.'],
    ['Whether the team has supplier connections', 'Connections help with delivery but do not establish segment benefits.'],
    ['Whether the target segment gains enough to switch', 'The weak point is the micro market benefit compared with the current workaround.'],
  ]),
  mc('w03-trl', 'medium', '33–36', 'A working pilot shows good performance on site. The operator cannot name a budget owner. What is the most defensible conclusion?', 0, [
    ['Technical evidence improved, while purchasing remains unvalidated', 'Operational performance and purchasing evidence answer separate questions.'],
    ['Market evidence improved, while technical performance remains untested', 'The trial directly observed performance, with no equivalent purchasing result.'],
    ['Both claims are supported by successful site operation', 'Operational use alone does not establish budget or willingness to pay.'],
  ]),
  mc('w03-next', 'hard', '19, 24–25, 33–36', 'A lab result is strong, but the team has only compliments from users and no data on performance under real inputs. What paired next steps test the two gaps?', 1, [
    ['Get more user ratings and rerun the original lab test', 'More opinion and the same conditions leave both gaps largely unresolved.'],
    ['Ask buyers about past purchases and test realistic inputs', 'Past purchases inform commercial feasibility, and realistic inputs probe whether the result transfers.'],
    ['Estimate total market size and file for patent protection', 'Market size and patent protection do not show buyer behaviour or working performance under realistic inputs.'],
  ]),
]);
