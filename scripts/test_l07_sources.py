"""Independent checks of supplied HH group-work and source caveats."""
import math,sys
from pathlib import Path
sys.path.insert(0,str(Path(__file__).resolve().parent))
from check_calcs import compute
from lint_questions import dump
c=dump(['nbe-e4120/L07'])['nbe-e4120/L07']['content']
assert len(c['sections'])==30 and len(c['mockExams'])==3
for s in c['sections']:assert any(q['sectionId']==s['id'] for q in c['lectureQuiz']) or s['id']=='overview'
# Supplied group answers p33, independent of new idealized practice values.
assert math.isclose(.2/(.2+.05),.8)
assert math.isclose(.8**4,.4096)
assert math.isclose(.8**3*.1,.0512)
for gate,v,expected in [('an',.01,100),('am',.025,1000),('bn',0,125),('bm',0,4000),('ah',0,70)]:
 assert math.isclose(compute({'relation':'hhRate','inputs':{'gate':gate,'voltage':v}}),expected)
for y0,yi in [(.1,.8),(.8,.1)]:
 assert math.isclose(yi+(y0-yi)*math.exp(0),y0)
 assert math.isclose(yi+(y0-yi)*math.exp(-1000),yi)
 assert not math.isclose(yi-(yi-y0)*(1-math.exp(0)),y0)
assert math.isclose((-.055)-(-.065),.010)
assert math.isclose((-2e-9)+25e-9*(.02-(-.02)),25e-9*(.02-.06))
assert not (Path('source/nbe-e4120/exercises')/'Exercise7.pdf').exists()
print('L07 source audit: p33 n∞=0.8, K fraction=0.4096, Na fraction=0.0512; corrected relaxation endpoints; rest-relative origin; instantaneous-current identity; source limitations PASS.')
