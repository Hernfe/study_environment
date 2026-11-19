const weeks = [
  ['Technology entrepreneurship', true],
  ['Technology and entrepreneurship', true],
  ['Opportunity recognition and idea validation', true],
  ['Strategy and business models', true],
  ['Lean startup and technology validation', true],
  ['Technology development and product design', true],
  ['Go-to-market for technology startups', true],
  ['Innovation economics and the digital economy', true],
  ['Intellectual property and regulation', true],
  ['Building teams, organisations and networks', true],
  ['Financial planning and fundraising', false],
  ['Final synthesis and course wrap-up', false],
];

export const registry = weeks.map(([title, built], index) => ({
  id: `L${String(index + 1).padStart(2, '0')}`,
  number: index + 1,
  title,
  built,
  sourceAvailable: index < 10,
}));

export const quizContract = {
  sittings: [
    '26 November 2026 · Weeks 1–11 · Second half of the lecture in the usual hall, maximum 45 minutes.',
    '3 December 2026 · Weeks 1–12 · Alternate for students unable to attend on 26 November. Same structure, different questions. No lecture that day.',
  ],
  conditions: 'Attend once. The quiz is individual, in person, closed book and device-free. It counts for 10% of the course grade.',
  format: 'Provisional plan for 30 points. 16 multiple-choice items (16 points), four scenarios answered in 3–4 sentences each (12 points), and one question on your own team’s evidence (2 points). The first sitting plans at least one MCQ per week. Counts and points may change.',
  scope: 'The designated Exam essentials slides define scope. Backup slides are excluded. Use your Client Engagement Log and interview notes to revise for the team-evidence question.',
  source: 'Week 10 PDF, pp. 56–57',
};
