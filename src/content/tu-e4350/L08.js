import { card, mc, week } from './week.js';

export default week(8, [
  card('Follow value from invention to diffusion', '5–15',
    'An invention becomes an innovation when it creates economic value. Much of that value comes as use spreads. Creative destruction is the displacement of existing products, firms and habits by innovation.',
    'A general purpose technology (GPT) spreads across sectors, keeps improving and enables follow-on innovations. Its productivity payoff depends on complementary investments such as training, integration and process redesign. The productivity J-curve describes an initial measured decline while firms make those investments, followed by gains as the changes pay off.'),
  card('Make the case for why now', '11–15',
    'Check four conditions. Can the technology now perform? Are necessary complements available? Is the customer ready to adopt and pay? What trigger makes this the moment to act? A missing condition can make a technically strong venture early. Data is non-rival because one use leaves it available for another. It is excludable because access can be restricted. Check who can actually use the data.'),
  card('Distinguish cost scale from network effects', '17–23, 27',
    'Digital products can have high fixed development costs and near-zero marginal cost per extra copy. A direct network effect increases value as more users join the same group. An indirect effect connects different groups. The possible links heuristic counts each distinct pair of users once. It gives potential connections, while actual value depends on participation.',
    'Network effects can create demand-side scale, lock-in and winner-take-most outcomes. A platform can attract the side most sensitive to price with a subsidy and earn from the other side.'),
  card('Find the bottleneck and anticipate the response', '22–27',
    'An incumbent’s installed base can protect it against a higher-quality entrant. Ask what scarce input, interface or point of access controls value capture. The incumbent may copy, block or acquire. A killer acquisition shuts the target down. Check who interacts and whether more participation raises value. A standalone product can scale through low incremental costs or differentiation without platform effects.'),
], card('Recap', '15, 27',
  'Test timing and access to complements. Separate low replication cost from value created by participation, and identify who controls the bottleneck.'),
card('Counting possible direct links', '19, 27',
  'For $n$ participants the deck uses $n(n-1)/2$. Starting from pairs counts each connection in both directions, so divide by two. The heuristic says little about how many links people actually use.'),
[
  mc('w08-diffusion', 'easy', '5–8, 15', 'A new process works in a lab. What would make it an innovation in the lecture’s economic sense?', 2, [
    ['A more precise technical description', 'Better documentation can help later adoption. It does not establish economic value.'],
    ['A longer period of laboratory study', 'Further research can improve the invention before it generates value.'],
    ['Adoption that creates economic value', 'Useful adoption turns the invention into an innovation, and diffusion spreads its value.'],
  ]),
  mc('w08-complement', 'easy', '10–15', 'The technology and buyer are ready, but compatible installation tools are missing. Which why-now test fails?', 0, [
    ['Availability of complements', 'Installation tools are investments or inputs needed to put the technology to work.'],
    ['Readiness of the technology', 'The scenario says the core technology is ready.'],
    ['Readiness of the customer', 'The customer is ready. Installation is the unresolved dependency.'],
  ]),
  mc('w08-data', 'easy', '14–15', 'Two teams can use the same dataset at once, but the owner can close access. What properties does it have?', 1, [
    ['Rival and excludable', 'Simultaneous use does not deplete the dataset.'],
    ['Non-rival and excludable', 'Use leaves the data available for another user, and access can still be blocked.'],
    ['Non-rival and non-excludable', 'Access controls make exclusion possible.'],
  ]),
  mc('w08-direct', 'easy', '19–21, 27', 'A messaging tool becomes more useful to users as more of their peers join. What drives the gain?', 2, [
    ['Lower marginal replication cost', 'This affects producer cost, while the prompt describes user value.'],
    ['An indirect network effect', 'An indirect effect involves participation by a different group.'],
    ['A direct network effect', 'More people in the same group increase the value of joining.'],
  ]),
  mc('w08-acquire', 'easy', '26–27', 'An incumbent buys a rival and shelves the product to remove the threat. What response is this?', 0, [
    ['A killer acquisition', 'The acquisition ends development of the competing product.'],
    ['A copying response', 'Copying would reproduce the entrant’s offer or features.'],
    ['A blocking response', 'Blocking limits access or distribution without the purchase described here.'],
  ]),
  mc('w08-jcurve', 'medium', '9–15', 'A broadly useful tool improves each year. Users spend months redesigning workflows, and measured productivity drops. Which account fits?', 1, [
    ['Lower productivity means the invention cannot diffuse', 'Early measured performance alone cannot tell you that.'],
    ['Complementary investment can precede a productivity gain', 'The J-curve describes the lag between investing in complements and seeing the gain.'],
    ['More users will lower the up-front cost of redesign', 'A larger installed base does not by itself redesign a firm’s workflow.'],
  ]),
  mc('w08-subsidy', 'medium', '20, 27', 'Buyers leave a marketplace when charged, while sellers pay for access to buyers. Which pricing experiment fits?', 2, [
    ['Charge buyers and subsidise seller listings', 'This charges the group most likely to leave and weakens the marketplace for sellers.'],
    ['Charge buyers and sellers the same fee', 'A common price ignores the groups’ different sensitivities.'],
    ['Lower the buyer fee and charge sellers', 'Attracting the price-sensitive buyers makes seller access more valuable.'],
  ]),
  mc('w08-standalone', 'hard', '17–27', 'A specialist app is cheap to copy. Customers work separately and gain nothing from more users. An incumbent controls a required data interface. What should the entrant prioritise?', 0, [
    ['Secure interface access and compete on standalone value', 'Access is the bottleneck. Low copying cost can support scale even without network effects.'],
    ['Subsidise new users to form a cross-side network', 'The use case has no second participating side or rising value from participation.'],
    ['Subsidise sharing so the installed base protects the app', 'A larger customer base does not make separate workflows more valuable or secure access.'],
  ]),
]);
