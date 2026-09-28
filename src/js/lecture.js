// Entry for every lecture shell. Reads the course and lecture id from
// <body data-course="<slug>" data-lecture="L0X">, loads
// src/content/<slug>/<id>.js and renders it.
// Shells contain no lecture-specific text.

import '../styles/index.css';
import { renderLecture, renderMissing } from './render.js';
import { loadLectureContent } from './content.js';
import { pruneLectureProgress } from './progress.js';

const lectureId = document.body.dataset.lecture;
const root = document.getElementById('app');

loadLectureContent(lectureId)
  .then((content) => {
    if (content) {
      pruneLectureProgress(content.meta.id, content);
      renderLecture(content, root);
    }
    else renderMissing(lectureId, root);
  })
  .catch((error) => {
    console.error(error);
    renderMissing(lectureId, root);
  });
