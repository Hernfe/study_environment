// Finds content modules by course and lecture id. Vite turns the glob
// into a map of lazy imports, so only the requested lecture is
// downloaded. A file matches an id when its basename is `<id>.js` or
// `<id>-<anything>.js`, which lets L00-example.js serve as L00.
// Course registries are small and loaded eagerly.

import { currentCourse } from './course.js';

const modules = import.meta.glob('../content/*/L*.js');
const registries = import.meta.glob('../content/*/registry.js', { eager: true });

export function contentPathFor(lectureId, course = currentCourse()) {
  const pattern = new RegExp('/content/' + course + '/' + lectureId + '(?:-[^/]*)?[.]js$');
  return Object.keys(modules).find((path) => pattern.test(path)) || null;
}

export function hasContent(lectureId, course = currentCourse()) {
  return contentPathFor(lectureId, course) !== null;
}

export async function loadLectureContent(lectureId, course = currentCourse()) {
  const path = contentPathFor(lectureId, course);
  if (!path) return null;
  const module = await modules[path]();
  return module.default;
}

// The registry module of a course: { registry, exampleLecture, course }.
export function courseRegistry(course = currentCourse()) {
  return registries[`../content/${course}/registry.js`] || null;
}
