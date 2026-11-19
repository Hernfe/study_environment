// Dates: L01 schedule. Titles: actual available deck title pages.
const titles = [
  'Bioelectricity, electrical circuits and ion movements',
  'Membrane potential and action potential',
  'Cable properties of dendrites',
  'Linear cable theory continued',
  'Cellular models, dendritic integration and the Rall model',
  'Membrane nonlinearities',
  'Hodgkin-Huxley model',
  'Hodgkin-Huxley continued and saltatory propagation',
  'Ion channels, channelopathy and applications',
  'Sensory receptors and synaptic transmission',
  'Recording of electrophysiological signals (materials pending)',
  'Recapitulation (materials pending)',
];
const dates = ['09-04', '09-11', '09-18', '09-25', '10-02', '10-09', '10-23', '10-30', '11-06', '11-13', '11-20', '11-27'];
export const registry = titles.map((title, i) => ({
  id: `L${String(i + 1).padStart(2, '0')}`, number: i + 1, title,
  chapters: [], lectureDate: `2026-${dates[i]}`, examDate: '2026-11-30', built: i < 10,
}));
export const exampleLecture = null;

export { fullCourseMocks } from './final-mocks.js';

export const fullCourseMockOptions = {
  // This value namespaces saved attempts and stays stable as coverage grows.
  lectureId: 'FULL-L01-L09',
  intro: 'Five separate cumulative papers for the available L01–L10 material. L11–L12 materials are pending. Lecture-specific mocks remain on their lecture pages.',
};
