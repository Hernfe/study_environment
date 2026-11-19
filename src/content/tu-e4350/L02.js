import { card, mc, week } from './week.js';

export default week(2, [
  card('Separate invention from innovation', '6–9, 18–22',
    'An invention is a novel device, process or method. In this course, it becomes an innovation when it produces economic value. Ask who gains and what changes in their work. A technically impressive demonstration may leave the commercial question open.',
    'Compare the components and architecture to classify a change. Incremental innovation improves an existing design. Modular innovation replaces a component. Architectural innovation changes how components connect. Radical innovation changes both.'),
  card('Distinguish the curves and choose when to enter', '8–16',
    'The technology S-curve tracks performance improvement. Progress is slow early, accelerates as the technology improves, then slows as it approaches its limits. Diffusion tracks who adopts the innovation over time. Fast technical progress and fast adoption can happen at different times.',
    'Industries move through emergence, growth, maturation and decline. Before a dominant design, competing approaches leave room to shape the standard but demand is unclear. Afterwards, improving cost and process typically matters more. Lead if shaping the market is valuable and you can bear the cost. Follow fast if others can reveal demand and you can execute better.'),
  card('Choose a venture form and use the ecosystem', '31–42, 46–52',
    'A startup searches for a workable model. A university research team may still be testing whether a firm should exist. An independent spinout gains autonomy but must assemble its own resources. A corporate venture can draw on a parent’s assets and channels, with less freedom over priorities.',
    'Licensing uses a partner’s capacity to commercialise the technology. Joint development shares effort and requires agreement on decisions. Look around the ecosystem for the missing capability, such as a pilot site, test facility, investor, integrator or technology transfer office.'),
], card('Recap', '7–10, 15–16, 41–42, 51–52',
  'Invention creates a new means. Innovation creates economic value. Performance describes what the technology can do. Diffusion describes its adoption. Choose entry and venture form around the evidence and capabilities you have.'),
card('Market entry alternatives', '15, 46–47',
  'The slides also discuss legal imitation around existing IP. A partner can complement the team’s technology with capabilities such as distribution or integration.'),
[
  mc('w02-innovation', 'easy', '7, 18', 'Which result shows a new process has moved from invention to innovation?', 0, [
    ['A customer uses it to reduce scrap costs', 'Economic value comes from a measurable improvement in the customer’s work.'],
    ['A team demonstrates it on a test bench', 'This shows a technical capability under test conditions.'],
    ['An engineer documents it in a patent', 'Recording novelty alone does not show economic value.'],
  ]),
  mc('w02-modular', 'easy', '21', 'A manufacturer replaces the sensor module and keeps the interfaces and overall design. What type of innovation is this?', 1, [
    ['Architectural innovation', 'Architectural change reconfigures how the components link together.'],
    ['Modular innovation', 'A module changes while the overall architecture stays the same.'],
    ['Radical innovation', 'Radical change replaces both modules and architecture.'],
  ]),
  mc('w02-curve', 'easy', '8–11', 'A team measures energy density per generation. Which concept describes the trend they are measuring?', 2, [
    ['Industry life cycle', 'An industry life cycle describes changes in the competitive landscape.'],
    ['Innovation diffusion', 'Diffusion tracks adoption by users over time.'],
    ['Performance S-curve', 'Performance measurements track the technology’s trajectory.'],
  ]),
  mc('w02-cost', 'easy', '10, 16', 'After one design becomes the industry reference, where does competition usually shift?', 1, [
    ['Towards proving which design works', 'Competing designs are the earlier stage.'],
    ['Towards improving process and cost', 'A shared design makes manufacturing and cost differences more important.'],
    ['Towards shaping the first standard', 'Shaping the standard is more feasible before a dominant design emerges.'],
  ]),
  mc('w02-network', 'easy', '51–52', 'A lab team needs a place to trial a process on production equipment. Which connection fills that gap?', 0, [
    ['A pilot line or industrial testbed', 'A pilot line or testbed provides the needed trial infrastructure.'],
    ['An investor or grant agency', 'These can fund trials but are not places to run them.'],
    ['A recruiter or talent network', 'These help address staffing and expertise gaps.'],
  ]),
  mc('w02-follow', 'medium', '13–16', 'A young firm can improve manufacturing quickly but cannot fund market education. Another firm is testing competing designs. Which entry strategy fits best?', 2, [
    ['Lead and fund the first standard', 'Leading carries market education and technology uncertainty.'],
    ['Lead with several competing designs', 'This spreads limited resources across unproven designs.'],
    ['Follow fast once demand becomes clearer', 'Following uses market evidence from earlier entrants and exploits manufacturing strength.'],
  ]),
  mc('w02-route', 'medium', '41–42, 46', 'A lab wants a manufacturer to commercialise its technology without setting up a company. Which route matches?', 0, [
    ['License use rights to the manufacturer', 'Licensing lets a partner commercialise while the lab avoids building a company.'],
    ['Build an independent spinout around it', 'A spinout requires forming the new company.'],
    ['Create a jointly owned venture around it', 'A joint venture still adds a shared venture and governance work.'],
  ]),
  mc('w02-entry-fit', 'hard', '13–16, 41–42, 46', 'A standard is starting to settle. A research team has demonstrated a cheaper compatible component but lacks a factory and sales channel. It wants adoption without running its own operation. Which plan fits all three constraints?', 1, [
    ['Lead with a new interface and build a factory', 'This requires capital and asks the market to switch away from the emerging reference.'],
    ['License the compatible component to an incumbent', 'Compatibility supports entry after design convergence, and the incumbent supplies manufacturing and distribution.'],
    ['Launch the compatible component through a spinout', 'A spinout still has to assemble production and a channel.'],
  ]),
]);
