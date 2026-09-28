// Progress storage. One localStorage key per lecture, namespaced by
// course: nbe:<course-slug>:progress:<lectureId>. The course comes from
// <body data-course> (src/js/course.js). Every access is wrapped in
// try/catch so the site keeps working when storage is blocked; it just
// remembers nothing.

import { currentCourse } from './course.js';

const SITE = 'nbe:';
const VERSION = 1;

function prefix() {
  const course = currentCourse();
  return course ? `${SITE}${course}:` : null;
}

function read(key) {
  try {
    const p = prefix();
    const raw = p ? window.localStorage.getItem(p + key) : null;
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function write(key, value) {
  try {
    const p = prefix();
    if (!p) return false;
    window.localStorage.setItem(p + key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

function remove(key) {
  try {
    const p = prefix();
    if (p) window.localStorage.removeItem(p + key);
  } catch {
    // ignore
  }
}

export function storageAvailable() {
  try {
    const probe = SITE + 'probe';
    window.localStorage.setItem(probe, '1');
    window.localStorage.removeItem(probe);
    return true;
  } catch {
    return false;
  }
}

// One-time migration from the single-course site (before the hub),
// whose keys were nbe4210:<key>. Each is copied to nbe:nbe-e4210:<key>
// unless that key already exists, then a marker records that the
// migration ran. The old keys are left in place, so going back to an
// older deploy loses nothing.
const LEGACY_PREFIX = 'nbe4210:';
const LEGACY_COURSE = 'nbe-e4210';
const MIGRATED = SITE + 'migrated:nbe4210';

export function migrateLegacyKeys(storage = globalThis.localStorage) {
  try {
    if (!storage || storage.getItem(MIGRATED)) return 0;
    const keys = [];
    for (let i = 0; i < storage.length; i += 1) {
      const key = storage.key(i);
      if (key && key.startsWith(LEGACY_PREFIX) && key !== LEGACY_PREFIX + 'probe') keys.push(key);
    }
    let copied = 0;
    for (const key of keys) {
      const target = `${SITE}${LEGACY_COURSE}:${key.slice(LEGACY_PREFIX.length)}`;
      if (storage.getItem(target) === null) {
        storage.setItem(target, storage.getItem(key));
        copied += 1;
      }
    }
    storage.setItem(MIGRATED, new Date().toISOString());
    return copied;
  } catch {
    return 0;
  }
}

migrateLegacyKeys();

function emptyProgress() {
  return { version: VERSION, questions: {}, concept: {}, lastQuizAt: null };
}

export function getLectureProgress(lectureId) {
  const stored = read('progress:' + lectureId);
  if (!stored || stored.version !== VERSION) return emptyProgress();
  return {
    ...emptyProgress(),
    ...stored,
    questions: stored.questions || {},
    concept: stored.concept || {},
  };
}

function saveLectureProgress(lectureId, progress) {
  return write('progress:' + lectureId, progress);
}

// Record one check of a lecture-quiz question (also used by review).
// result: { correct: boolean, score?: number, max?: number }
export function recordQuestionResult(lectureId, questionId, result) {
  const progress = getLectureProgress(lectureId);
  const prev = progress.questions[questionId] || { attempts: 0, correct: 0 };
  progress.questions[questionId] = {
    attempts: prev.attempts + 1,
    correct: prev.correct + (result.correct ? 1 : 0),
    lastResult: result.correct ? 'correct' : 'missed',
    lastAt: Date.now(),
    score: result.score ?? (result.correct ? 1 : 0),
    max: result.max ?? 1,
  };
  progress.lastQuizAt = Date.now();
  return saveLectureProgress(lectureId, progress);
}

export function recordConceptResult(lectureId, questionId, correct) {
  const progress = getLectureProgress(lectureId);
  const prev = progress.concept[questionId] || { attempts: 0, correct: 0 };
  progress.concept[questionId] = {
    attempts: prev.attempts + 1,
    correct: prev.correct + (correct ? 1 : 0),
    lastAt: Date.now(),
  };
  return saveLectureProgress(lectureId, progress);
}

// Drop saved results whose question no longer exists in the lecture's
// content file, so home-page totals follow the current question set.
// Called on every lecture page load with the loaded content; writes
// only when something was removed. Returns the number of records dropped.
export function pruneLectureProgress(lectureId, content) {
  const stored = read('progress:' + lectureId);
  if (!stored || stored.version !== VERSION || !content) return 0;
  const quizIds = new Set((content.lectureQuiz || []).map((q) => q.id));
  const conceptIds = new Set(
    (content.sections || []).flatMap((s) => (s.conceptQuiz || []).map((q) => q.id)),
  );
  let dropped = 0;
  const keep = (records, valid) => {
    const kept = {};
    for (const [id, record] of Object.entries(records || {})) {
      if (valid.has(id)) kept[id] = record;
      else dropped += 1;
    }
    return kept;
  };
  const questions = keep(stored.questions, quizIds);
  const concept = keep(stored.concept, conceptIds);
  if (dropped) saveLectureProgress(lectureId, { ...stored, questions, concept });
  return dropped;
}

export function getQuestionRecord(lectureId, questionId) {
  return getLectureProgress(lectureId).questions[questionId] || null;
}

// Summary for the home page: how many questions have been answered,
// how many are currently in the missed bucket, and the score of the
// answered ones.
export function getLectureSummary(lectureId) {
  const progress = getLectureProgress(lectureId);
  const records = Object.values(progress.questions);
  const answered = records.length;
  const missed = records.filter((r) => r.lastResult === 'missed').length;
  const score = records.reduce((sum, r) => sum + (r.score || 0), 0);
  const max = records.reduce((sum, r) => sum + (r.max || 0), 0);
  return { answered, missed, score, max, lastQuizAt: progress.lastQuizAt };
}

export function resetLecture(lectureId) {
  remove('progress:' + lectureId);
}
