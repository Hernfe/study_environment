// Course registry. Drives the hub (src/index.html) and the header of
// each course home. One entry per course; lectures live in
// src/content/<slug>/registry.js, and the hub counts built lectures
// from there, so nothing here needs updating when a lecture is built.
// status: active | upcoming | archived

export const courses = [
  {
    slug: 'nbe-e4210',
    code: 'NBE-E4210',
    title: 'Structure and Operation of the Human Brain',
    term: 'Autumn 2026',
    status: 'active',
    summary: 'One study guide per lecture, with concept checks and a graded lecture quiz. Weekly one-hour paper mini-exams: multiple choice, classification, matching, labelling and true or false, one handwritten A4 cheat sheet allowed.',
  },
];
