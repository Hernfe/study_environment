// Course map. Scheduling and status only; no lecture text.
// Lecture dates and chapters come from the schedule slide in the most
// recent deck (L06, slide 3). L03 moved L3 to 11.9; the L01 deck had
// 16.9. The L05 deck's schedule (slide 2) lists chapter 11 on 9.10, a
// typo: the later L06 deck has 30.9 for chapter 11 and 7.10 for
// chapters 12 to 14, as below.
// Mini-exam dates: L1 on 18.9, L2 on 25.9 and L4 on 9.10 are on the
// slides (L04 deck: "Exam on Sep 25th on Lecture 2"; L06 deck: "Exam on
// Oct 9th on Lecture 4"). L3 on 2.10 and the rest are assumed weekly on
// Fridays with the same two-week lag. Check MyCourses and correct here.
// Titles are the textbook chapter titles, shortened.

export const registry = [
  {
    id: 'L01',
    number: 1,
    title: 'Neuroscience, neurons and glia, structure of the nervous system',
    chapters: [1, 2, 7],
    lectureDate: '2026-09-02',
    examDate: '2026-09-18',
    built: true,
  },
  {
    id: 'L02',
    number: 2,
    title: 'The neuronal membrane at rest and the action potential',
    chapters: [3, 4],
    lectureDate: '2026-09-09',
    examDate: '2026-09-25',
    built: true,
  },
  {
    id: 'L03',
    number: 3,
    title: 'Synaptic transmission and neurotransmitter systems',
    chapters: [5, 6],
    lectureDate: '2026-09-11',
    examDate: '2026-10-02',
    built: true,
  },
  {
    id: 'L04',
    number: 4,
    title: 'The eye and the central visual system',
    chapters: [9, 10],
    lectureDate: '2026-09-23',
    examDate: '2026-10-09',
    built: true,
  },
  {
    id: 'L05',
    number: 5,
    title: 'The auditory system',
    chapters: [11],
    lectureDate: '2026-09-30',
    examDate: '2026-10-16',
    built: true,
  },
  {
    id: 'L06',
    number: 6,
    title: 'Somatic sensation, spinal and brain control of movement',
    chapters: [12, 13, 14],
    lectureDate: '2026-10-07',
    examDate: '2026-10-23',
    built: true,
  },
  {
    id: 'L07',
    number: 7,
    title: 'Chemical control of the brain and behaviour, brain mechanisms of emotion',
    chapters: [15, 18],
    lectureDate: '2026-10-21',
    examDate: '2026-10-30',
    built: false,
  },
  {
    id: 'L08',
    number: 8,
    title: 'The resting brain, attention and consciousness',
    chapters: [21],
    lectureDate: '2026-10-28',
    examDate: '2026-11-06',
    built: false,
  },
  {
    id: 'L09',
    number: 9,
    title: 'Mental illness',
    chapters: [22],
    lectureDate: '2026-11-04',
    examDate: '2026-11-13',
    built: false,
  },
  {
    id: 'L10',
    number: 10,
    title: 'Wiring the brain',
    chapters: [23],
    lectureDate: '2026-11-11',
    examDate: '2026-11-20',
    built: false,
  },
  {
    id: 'L11',
    number: 11,
    title: 'Memory systems and molecular mechanisms of learning and memory',
    chapters: [24, 25],
    lectureDate: '2026-11-18',
    examDate: '2026-11-27',
    built: false,
  },
];

// Dummy lecture that exercises every renderer feature. Shown on the
// home page and included in review only during `npm run dev`.
export const exampleLecture = {
  id: 'L00',
  number: 0,
  title: 'Renderer test lecture (example content)',
  chapters: [],
  lectureDate: null,
  examDate: null,
  built: true,
};
