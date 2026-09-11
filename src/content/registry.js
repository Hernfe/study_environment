// Course map. Scheduling and status only; no lecture text.
// Lecture dates and chapters come from the schedule slide in L01.
// Mini-exam dates: L1 on 18.9 and L2 on 25.9 are on the slides; the
// rest are assumed weekly on Fridays. Check MyCourses and correct here.
// Titles are the textbook chapter titles, shortened.

export const registry = [
  {
    id: 'L01',
    number: 1,
    title: 'Neuroscience, neurons and glia, structure of the nervous system',
    chapters: [1, 2, 7],
    lectureDate: '2026-09-02',
    examDate: '2026-09-18',
    built: false,
  },
  {
    id: 'L02',
    number: 2,
    title: 'The neuronal membrane at rest and the action potential',
    chapters: [3, 4],
    lectureDate: '2026-09-09',
    examDate: '2026-09-25',
    built: false,
  },
  {
    id: 'L03',
    number: 3,
    title: 'Synaptic transmission and neurotransmitter systems',
    chapters: [5, 6],
    lectureDate: '2026-09-16',
    examDate: '2026-10-02',
    built: false,
  },
  {
    id: 'L04',
    number: 4,
    title: 'The eye and the central visual system',
    chapters: [9, 10],
    lectureDate: '2026-09-23',
    examDate: '2026-10-09',
    built: false,
  },
  {
    id: 'L05',
    number: 5,
    title: 'The auditory and vestibular systems',
    chapters: [11],
    lectureDate: '2026-09-30',
    examDate: '2026-10-16',
    built: false,
  },
  {
    id: 'L06',
    number: 6,
    title: 'Somatic sensation, spinal and brain control of movement',
    chapters: [12, 13, 14],
    lectureDate: '2026-10-07',
    examDate: '2026-10-23',
    built: false,
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
