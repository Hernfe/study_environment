"""Regression of the official five-group mock contract, not a type quota."""
from copy import deepcopy
from lint_questions import dump, lint, corpus_of
x=dump(['nbe-e4120']);corpus=corpus_of(x,'nbe-e4120')
for name,entry in x.items():
 content=entry['content'];findings,hits,*_=lint(name,content,corpus)
 assert not findings and not hits,(name,findings,hits)
 assert len({q['id'] for q in content['lectureQuiz']})==len(content['lectureQuiz'])
 assert all(q['sectionId'] in {s['id'] for s in content['sections']} for q in content['lectureQuiz'])
 # A distinct scenario in Q2 does not excuse identical Q1 practice in all mocks.
 for position in range(5):
  prompts=[m['questions'][position]['prompt'].strip() for m in content['mockExams']]
  assert len(set(prompts))==3,(name,'duplicate mock prompt',position+1)
name='nbe-e4120/L02';content=x[name]['content']
findings,hits,*_=lint(name,content,corpus)
assert not findings and not hits,(findings,hits)
assert len({q['id'] for q in content['lectureQuiz']})==len(content['lectureQuiz'])
assert all(q['sectionId'] in {s['id'] for s in content['sections']} for q in content['lectureQuiz'])
for mutation,expected in [('missing','exactly three'),('swapped','preserve'),('hint','two progressive')]:
 c=deepcopy(content)
 if mutation=='missing':c['mockExams'].pop()
 if mutation=='swapped':c['mockExams'][0]['questions'][1],c['mockExams'][0]['questions'][2]=c['mockExams'][0]['questions'][2],c['mockExams'][0]['questions'][1]
 if mutation=='hint':c['lectureQuiz'][0]['hints'].pop()
 fs,*_=lint(name,c,corpus)
 assert any(expected in f[2] for f in fs),(mutation,fs)
print('E4120 contract: complete content, unique IDs, section membership, missing mock, wrong exam order and missing hints PASS.')

c=deepcopy(content)
c['lectureQuiz'][0]['practice']='optional-typo'
fs,*_=lint(name,c,corpus)
assert any('practice must be extra' in f[2] for f in fs),fs
print('E4120 extra-practice metadata validation PASS.')
