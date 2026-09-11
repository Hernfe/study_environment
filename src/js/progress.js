// Progress storage. One localStorage key per lecture, all prefixed
// nbe4210:. Every access is wrapped in try/catch so the site keeps
// working when storage is blocked; it just remembers nothing.

const PREFIX = 'nbe4210:';
const VERSION = 1;

function read(key) {
  try {
    const raw = window.localStorage.getItem(PREFIX + key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function write(key, value) {
  try {
    window.localStorage.setItem(PREFIX + key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

function remove(key) {
  try {
    window.localStorage.removeItem(PREFIX + key);
  } catch {
    // ignore
  }
}

export function storageAvailable() {
  try {
    const probe = PREFIX + 'probe';
    window.localStorage.setItem(probe, '1');
    window.localStorage.removeItem(probe);
    return true;
  } catch {
    return false;
  }
}

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
