// Finds content modules by lecture id. Vite turns the glob into a map
// of lazy imports, so only the requested lecture is downloaded.
// A file matches an id when its basename is `<id>.js` or `<id>-<anything>.js`,
// which lets L00-example.js serve as L00.

const modules = import.meta.glob('../content/L*.js');

export function contentPathFor(lectureId) {
  const pattern = new RegExp('/' + lectureId + '(?:-[^/]*)?[.]js$');
  return Object.keys(modules).find((path) => pattern.test(path)) || null;
}

export function hasContent(lectureId) {
  return contentPathFor(lectureId) !== null;
}

export async function loadLectureContent(lectureId) {
  const path = contentPathFor(lectureId);
  if (!path) return null;
  const module = await modules[path]();
  return module.default;
}
