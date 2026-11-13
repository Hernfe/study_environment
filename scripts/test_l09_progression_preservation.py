"""Check against the current dirty-tree snapshot, never Git HEAD."""
from pathlib import Path
import hashlib,json
r=Path('/work');o=r/'.codex-progression/L09'
old=json.loads((o/'files-before.json').read_text());changed=[]
for name,digest in old.items():
 p=r/name
 assert p.is_file(),f'Removed: {name}'
 if hashlib.sha256(p.read_bytes()).hexdigest()!=digest:changed.append(name)
assert set(changed)=={'src/content/nbe-e4120/L09.js','docs/coverage-nbe-e4120-L09.md'},changed
result={'pass':True,'baselineFiles':len(old),'unchanged':len(old)-len(changed),'changed':sorted(changed),'E4210Unchanged':True,'sharedSourceUnchanged':True}
(o/'preservation.json').write_text(json.dumps(result,indent=2));print(json.dumps(result))
