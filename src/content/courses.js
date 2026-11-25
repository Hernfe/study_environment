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
    summary: 'Study L01–L10 and practise concepts, explanations, calculations and recording methods in lecture and cumulative mock exams. L11–L12 materials are pending.',
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
    summary: 'Methods, interpretation and own-code explanation. Study L01–L07 or practise the official oral format in the L08 simulator.',
  },
  {
    slug: 'tu-e4350', code: 'TU-E4350', title: 'Technology Entrepreneurship',
    term: 'Autumn 2026', status: 'active', unitPlural: 'weeks',
    summary: 'Concise weekly reading and practical decisions for the final course quiz.',
  },
];
