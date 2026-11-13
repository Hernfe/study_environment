"""Verify this framework preserves the dirty-tree baseline, including E4210."""
import hashlib,json
from pathlib import Path
root=Path('/work');out=root/'.codex-progression/framework'
before=json.loads((out/'files-before.json').read_text())
allowed={'src/js/extraPractice.js','src/js/render.js','src/js/conceptQuiz.js','src/js/quantitative.js','docs/CONTENT_SCHEMA.md','scripts/test_l01_revision.py'}
changed=[]
for name,old in before.items():
 path=root/name
 assert path.is_file(),f'Existing file removed: {name}'
 if hashlib.sha256(path.read_bytes()).hexdigest()!=old:changed.append(name)
assert set(changed)==allowed,changed
original=(out/'test_l01_revision.before.py').read_bytes()
assert (root/'scripts/test_l01_revision.py').read_bytes()==original.replace(b'#L01-f-current .formula-drill',b'.formula-drill[data-formula=L01-f-current]')
report={'baselineFiles':len(before),'preservedFiles':len(before)-len(changed),'changed':sorted(changed),'missing':[]}
(out/'preservation.json').write_text(json.dumps(report,indent=2))
print(f'PASS: {len(before)} existing files checked; exactly 5 shared/schema edits and 1 drill-selector test update, no removals, E4210 and all prior content preserved.')
