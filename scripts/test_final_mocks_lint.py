"""Strict universal field/maths checks for the course-level exams (not lecture quotas)."""
import json,subprocess
import lint_questions as lint
r=subprocess.run(['node','--input-type=module','-e',"import {fullCourseMocks} from './src/content/nbe-e4120/final-mocks.js';console.log(JSON.stringify(fullCourseMocks))"],capture_output=True,text=True,check=True)
exams=json.loads(r.stdout)
open('.codex-progression/final-mocks/exams.json','w').write(r.stdout)
findings=[];hits=[]
for exam in exams:
 for q in exam['questions']:
  findings+=lint.check_fields(q)
  for text in lint.texts(q):hits+=lint.symbol_hits(text)
print('nbe-e4120/full-course-mocks: %d findings, %d plain-text symbols'%(len(findings),len(hits)))
for finding in findings+hits:print(finding)
assert not findings and not hits
