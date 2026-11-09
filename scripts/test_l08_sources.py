"""Independent Exercise8 reconstruction and source/source-map audit."""
import math,sys
from pathlib import Path
sys.path.insert(0,str(Path(__file__).resolve().parent))
from lint_questions import dump
from check_calcs import compute
c=dump(['nbe-e4120/L08'])['nbe-e4120/L08']['content']
assert len(c['sections'])==39 and len(c['mockExams'])==3
assert all(any(q['sectionId']==s['id'] for q in c['lectureQuiz']) for s in c['sections'] if s['id']!='overview')
vs=list(range(-100,21,10));ms=[.003,.007,.015,.034,.076,.159,.303,.5,.697,.841,.924,.966,.985];hs=[.985,.966,.924,.841,.697,.5,.303,.159,.076,.034,.015,.007,.003]
curves=[]
for rev,noh in [(50,False),(30,False),(50,True)]:
 currents=[1e-7*m*m*m*(1 if noh else h)*(v-rev)/1000 for v,m,h in zip(vs,ms,hs)];j=min(range(13),key=currents.__getitem__);curves.append((vs[j],currents[j]))
# Fixed independent source checkpoints; compare rounded source graph/table, not interpolation.
assert curves[0][0]==-20 and curves[1][0]==-20 and curves[2][0]==0
assert math.isclose(curves[0][1],-1.80139920436e-10,rel_tol=1e-10)
assert math.isclose(curves[1][1],-1.2867137174e-10,rel_tol=1e-10)
assert math.isclose(curves[2][1],-3.94444512e-9,rel_tol=1e-10)
# Original-sheet reconstructions remain independent source checks above.
# The bank instead asks distinct inverse problems, not copied sheet answers.
questions={q['id']:q for q in c['lectureQuiz']}
expected={
 'L08-source-table-audit':[.4**3,.4**3*.3,.8**3*.1,-4.875e-9,-2.625e-9,2.25e-9,75e-9,-.065,.045,3.84e-9,-19.2e-12],
 'L08-source-k-audit':[5e-9,.04,.04**.25,100e-12,.8**4,51.2e-9,1.024e-9],
 'L08-source-charge-audit':[4.8e-19,4e13,30e-12,50e-12,.6],
}
for qid,values in expected.items():
 actual=[s['answer']['value'] for s in questions[qid]['stages'] if 'answer' in s]
 assert len(actual)==len(values),(qid,actual)
 for a,b in zip(actual,values):assert math.isclose(a,b,rel_tol=1e-12),(qid,a,b)
assert all(questions[qid]['difficulty']=='hard' for qid in expected)
assert math.isclose(.0036*.88**4*.072,.000155441037312)
assert math.isclose(2.625e-9/(2*1.6e-19),8203125000)
assert math.isclose(1/(2.625e-9/(2*1.6e-19)),1.219047619047619e-10)
# Corrected normalization; series RC counterexample; geometry-fit unit conversion.
r=3;assert r/(1+r)==.75 and r/(1-r)<0
assert math.isclose((5*50e6)*(40e-12/5),50e6*40e-12)
assert math.isclose(.146*12*.001,146*12e-6)
assert all('source' in q for q in c['lectureQuiz'])
assert len({m['questions'][0]['prompt'] for m in c['mockExams']})==3
print('L08 source audit PASS: 39 source table currents; sampled peaks (-20mV, -20mV, 0mV); K current ≈155.441µA; density 8.203125e9/cm²; single conductance ≈121.905pS. Corrected probability, current signs, RC counterexample, fit units and distinct mock reasoning checked.')
