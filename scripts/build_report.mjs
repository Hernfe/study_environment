// Build report, run by npm after every `vite build` (the postbuild
// script). Runs scripts/lint_questions.py with whichever Python is on
// PATH. A report, not a gate: it never fails the build, and it skips
// with a note when Python is missing (for example on a deploy image).
// Set LINT_STRICT=1 to make lint findings in non-legacy lectures fail.

import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const script = fileURLToPath(new URL('./lint_questions.py', import.meta.url));
const strict = process.env.LINT_STRICT === '1';

const python = ['python3', 'python', 'py'].find((cmd) => {
  const probe = spawnSync(cmd, ['--version'], { encoding: 'utf8' });
  return probe.status === 0 && /Python 3/.test(`${probe.stdout}${probe.stderr}`);
});

if (!python) {
  console.log('\nBuild report: question lint skipped, no Python 3 on PATH.');
  process.exit(0);
}

console.log('\nBuild report');
const run = spawnSync(python, [script, ...(strict ? ['--strict'] : [])], { cwd: root, stdio: 'inherit' });
process.exit(strict ? run.status ?? 1 : 0);
