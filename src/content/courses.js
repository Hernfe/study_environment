// Course registry. Drives the hub (src/index.html) and the header of
// each course home. One entry per course; lectures live in
// src/content/<slug>/registry.js, and the hub counts built lectures
// from there, so nothing here needs updating when a lecture is built.
// status: active | upcoming | archived

import { equationSheet } from './nbe-e4120/equation-sheet.js';

export const courses = [
  {
    slug: 'nbe-e4120', code: 'NBE-E4120', title: 'Cellular Electrophysiology',
    term: 'Autumn 2026', status: 'active', examLabel: 'Final exam',
    equationSheet,
    equationSheetNote: 'Transcribed from the official exam information, page 4. This reference covers the full course, including lectures not yet built.',
    finalExam: { date: '2026-11-30', detail: '30 November 2026, 13:00–16:00, F239a. Equations provided; bring a calculator. Open-book status is not established by the supplied instructions.' },
    summary: 'Question-led preparation for the final written exam: concepts, explanations, calculations and electrophysiological methods. Lecture material is being added in teaching order.',
  },
  {
    slug: 'nbe-e4210',
    code: 'NBE-E4210',
    title: 'Structure and Operation of the Human Brain',
    term: 'Autumn 2026',
    status: 'active',
    summary: 'One study guide per lecture, with concept checks and a graded lecture quiz. Weekly one-hour paper mini-exams: multiple choice, classification, matching, labelling and true or false, one handwritten A4 cheat sheet allowed.',
  },
  {
    slug: 'nbe-e4070', code: 'NBE-E4070', title: 'Basics of Biomedical Data Analysis',
    term: 'Autumn 2026', status: 'active', examLabel: 'Oral exam',
    learningMode: 'topic-study',
    summary: 'Methods, interpretation and own-code explanation. Study L01–L07 or choose an interim 15-minute oral practice session.',
  },
];
