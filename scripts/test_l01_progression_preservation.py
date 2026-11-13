"""Preserve the captured dirty tree, including every pre-existing E4210 edit."""
from pathlib import Path
import hashlib,json
root=Path('/work');out=root/'.codex-progression/L01'
old=json.loads((out/'files-before.json').read_text());changed=[]
for name,digest in old.items():
 p=root/name
 assert p.is_file(),f'Removed pre-existing file: {name}'
 if hashlib.sha256(p.read_bytes()).hexdigest()!=digest:changed.append(name)
assert set(changed)=={'src/content/nbe-e4120/L01.js','docs/coverage-nbe-e4120-L01.md'},changed
result={'pass':True,'baselineFiles':len(old),'unchanged':len(old)-len(changed),'changed':sorted(changed),'missing':[]}
(out/'preservation.json').write_text(json.dumps(result,indent=2));print(json.dumps(result))
