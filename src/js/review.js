// Cumulative review: questions from every built lecture, missed ones
// first, then never seen, then interleaved retrieval of the rest.
// See docs/PEDAGOGY.md section 5.

import { el, shuffle } from './dom.js';
import { getLectureProgress } from './progress.js';
import { renderQuestion } from './lectureQuiz.js';
import { loadLectureContent } from './content.js';

const SLICE = 15;

// lectures: [{ id, number, title, questions }]
// getProgress: (lectureId) => progress object (injectable for tests)
export function buildReviewQueue(lectures, getProgress = getLectureProgress) {
  const missed = [];
  const unseen = [];
  const seen = [];

  for (const lecture of lectures) {
    const progress = getProgress(lecture.id);
    for (const question of lecture.questions || []) {
      const record = progress.questions[question.id];
      const entry = { lectureId: lecture.id, lectureNumber: lecture.number, lectureTitle: lecture.title, question, record };
      if (!record) unseen.push(entry);
      else if (record.lastResult === 'missed') missed.push(entry);
      else seen.push(entry);
    }
  }

  // Missed: most recently missed first, so the freshest gap is closed first.
  missed.sort((a, b) => (b.record.lastAt || 0) - (a.record.lastAt || 0));

  return [...missed, ...interleave(unseen), ...interleave(seen)];
}

// Shuffle within each lecture, then deal round-robin across lectures so
// consecutive questions come from different lectures whenever possible.
export function interleave(entries) {
  const byLecture = new Map();
  for (const entry of shuffle(entries)) {
    if (!byLecture.has(entry.lectureId)) byLecture.set(entry.lectureId, []);
    byLecture.get(entry.lectureId).push(entry);
  }
  const stacks = shuffle([...byLecture.values()]);
  const out = [];
  while (stacks.some((s) => s.length)) {
    for (const stack of stacks) {
      if (stack.length) out.push(stack.shift());
    }
  }
  return out;
}

export async function loadBuiltLectures(registry) {
  const built = registry.filter((entry) => entry.built);
  const loaded = await Promise.all(
    built.map(async (entry) => {
      const content = await loadLectureContent(entry.id);
      if (!content) return null;
      return { id: entry.id, number: entry.number, title: entry.title, questions: content.lectureQuiz || [] };
    })
  );
  return loaded.filter(Boolean);
}

// Mounts the review mode into container. registry entries with built: true are used.
export function renderReview(container, registry) {
  const status = el('p', { class: 'review-progress' });
  const list = el('div', { class: 'review-list' });
  const startButton = el('button', { type: 'button', class: 'btn btn-primary', onClick: start }, 'Start review');
  const moreButton = el('button', { type: 'button', class: 'btn', hidden: true, onClick: next }, 'Next 15');
  const controls = el('div', { class: 'review-controls' }, [startButton, status]);

  let queue = [];
  let cursor = 0;
  let lectures = null;

  async function start() {
    startButton.disabled = true;
    status.textContent = 'Loading questions...';
    try {
      lectures = lectures || (await loadBuiltLectures(registry));
    } catch (error) {
      console.error(error);
      status.textContent = 'Could not load lecture content.';
      startButton.disabled = false;
      return;
    }
    if (!lectures.length) {
      status.textContent = 'No lectures are built yet, so there is nothing to review.';
      startButton.disabled = false;
      return;
    }
    queue = buildReviewQueue(lectures);
    cursor = 0;
    list.replaceChildren();
    const missedCount = queue.filter((e) => e.record?.lastResult === 'missed').length;
    status.textContent = `${queue.length} questions from ${lectures.length} lecture${lectures.length === 1 ? '' : 's'}. ${missedCount} missed come first.`;
    startButton.textContent = 'Restart review';
    startButton.disabled = false;
    next();
  }

  function next() {
    const slice = queue.slice(cursor, cursor + SLICE);
    slice.forEach((entry, i) => {
      list.appendChild(
        renderQuestion(entry.question, {
          lectureId: entry.lectureId,
          index: cursor + i,
          total: queue.length,
          source: `Lecture ${entry.lectureNumber}`,
        })
      );
    });
    cursor += slice.length;
    moreButton.hidden = cursor >= queue.length;
    if (slice.length) list.children[list.children.length - slice.length]?.scrollIntoView({ block: 'start' });
  }

  container.replaceChildren(
    el('h2', { id: 'review-title' }, 'Cumulative review'),
    el('p', {}, 'Questions from every built lecture. Ones you missed come first, then ones you have not seen, then the rest mixed across lectures.'),
    controls,
    list,
    el('div', { class: 'btn-row' }, [moreButton])
  );
}
