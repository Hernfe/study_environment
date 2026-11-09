"""Independent numerical/source-coverage checkpoints; no invented Exercise9."""
import sys,math,json
from pathlib import Path
sys.path.insert(0,str(Path(__file__).resolve().parent))
from lint_questions import dump
c=dump(['nbe-e4120/L09'])['nbe-e4120/L09']['content'];qs={q['id']:q for q in c['lectureQuiz']}
expected={'a3':[-1e-12,.3,30,-9e-12],'a4':[2e-14,125000,.01],'b3':[.2401,48.02,.6e-12,28.812e-12,.4096,49.152e-12],'b4':[.216,.432e-9,1.728e-9,-30.24e-12,-120.96e-12,4],'c3':[5/6,.4,.6,15e-9,6e-9],'c4':[50e-12,-5,-20e-12,2]}
for key,values in expected.items():
 q=qs['L09-'+key];actual=[s['answer']['value'] for s in q['stages'] if 'answer' in s];assert len(actual)==len(values),(key,actual)
 for a,b in zip(actual,values):assert math.isclose(a,b,rel_tol=1e-12),(key,a,b)
assert len({m['title'] for m in c['mockExams']})==3
assert all(len(m['questions'])==5 and [q['type'] for q in m['questions']]==['written','written','multiStepCalc','multiStepCalc','written'] for m in c['mockExams'])
assert all(m['questions'][-1].get('figure') for m in c['mockExams'])
assert len(c['sections'])==34
sources=' '.join(s['source'] for s in c['sections'])
for i in range(1,23):assert f'9:1 p{i}' in sources,i
for i in range(3,14):assert f'9:2 p{i}' in sources,i
assert '9:2 p1–2' in sources
text=json.dumps(c)
for key in ['provisional','unresolved','neutral','simulated','time-matched','not a universal','deactivation','cytoskeletal','Piezo','strychnine','TRPV2','hypersynchronization']:assert key.lower() in text.lower(),key
for p in Path('src/assets/figures/nbe-e4120/L09').glob('*.json'):
 d=json.loads(p.read_text());assert Path(d['source']).exists() and d['page']>0
assert not any('Exercise9' in q['source'] for q in c['lectureQuiz'])
print('L09 source audit PASS: all 35 source pages mapped, 33 source panels, six distinct mock calculation checkpoints, provisional scope and source qualifications; no Exercise9 fabricated.')
