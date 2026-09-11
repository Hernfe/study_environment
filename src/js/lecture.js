// Entry for every lecture shell. Reads the lecture id from
// <body data-lecture="L0X">, loads src/content/<id>.js and renders it.
// Shells contain no lecture-specific text.

import '../styles/index.css';
import { renderLecture, renderMissing } from './render.js';
import { loadLectureContent } from './content.js';

const lectureId = document.body.dataset.lecture;
const root = document.getElementById('app');

loadLectureContent(lectureId)
  .then((content) => {
    if (content) renderLecture(content, root);
    else renderMissing(lectureId, root);
  })
  .catch((error) => {
    console.error(error);
    renderMissing(lectureId, root);
  });
