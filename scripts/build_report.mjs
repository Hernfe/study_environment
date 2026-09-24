// Build report and gate, run by npm after every `vite build` (the
// postbuild script). Runs scripts/lint_questions.py --strict with
// whichever Python is on PATH. Findings in a lecture not marked legacy
// (LEGACY in lint_questions.py) fail the build; legacy lectures (L01, L02)
// and advisory notes are reported only. Without Python the lint is
// skipped with a warning (for example on a deploy image). LINT_GATE=0
// turns the gate back into a report for one run.

import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const script = fileURLToPath(new URL('./lint_questions.py', import.meta.url));
const gate = process.env.LINT_GATE !== '0';

const python = ['python3', 'python', 'py'].find((cmd) => {
  const probe = spawnSync(cmd, ['--version'], { encoding: 'utf8' });
  return probe.status === 0 && /Python 3/.test(`${probe.stdout}${probe.stderr}`);
});

if (!python) {
  console.log('\nBuild report: WARNING, question lint skipped, no Python 3 on PATH. The lint gate did not run.');
  process.exit(0);
}

console.log('\nBuild report');
const run = spawnSync(python, [script, '--strict'], { cwd: root, stdio: 'inherit' });
if (run.status !== 0) {
  console.log(gate
    ? '\nBuild failed: question lint findings in a lecture not marked legacy (see above). LINT_GATE=0 reports without failing.'
    : '\nQuestion lint findings in a lecture not marked legacy (gate off, LINT_GATE=0).');
  process.exit(gate ? 1 : 0);
}
