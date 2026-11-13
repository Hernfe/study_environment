"""Mutation tests: MCQ clue guards must reject severe cues and position bias."""
from lint_questions import check_lengths, position_test, dump, mc_questions, seeded_order
import json
from pathlib import Path
balanced={'correct':1,'options':[{'text':'A passive current'},{'text':'An active current'},{'text':'A steady current'}]}
assert not check_lengths('fixture',balanced)
for text in ['Yes','A much longer and unusually precise description that gives away the intended correct answer']:
 q={**balanced,'options':[dict(o) for o in balanced['options']]};q['options'][1]['text']=text
 assert check_lengths('fixture',q),text
assert position_test([(0,4)]*60)[0]<0.001
assert position_test([(i%4,4) for i in range(60)])[0]>0.99
results={}
for key,item in dump(['nbe-e4120']).items():
 content=item['content']; questions=list(mc_questions(content))
 findings=[f for where,q in questions for f in check_lengths(where,q)]
 shown=[(seeded_order(len(q['options']),f"{key.split('/')[-1]}:{q['id']}").index(q['correct']),len(q['options'])) for _,q in questions]
 authored=[(q['correct'],len(q['options'])) for _,q in questions]
 pa,oa,ea=position_test(authored)
 assert pa>=0.05,(key,pa,oa,ea)
 p,observed,expected=position_test(shown)
 assert not findings,(key,findings)
 assert p>=0.05,(key,p,observed,expected)
 results[key]={'questions':len(questions),'lengthFindings':findings,'authoredCorrectPositions':oa,'authoredP':pa,'displayedCorrectPositions':observed,'expected':expected,'p':p}
Path('.codex-progression/framework/mcq-audit.json').write_text(json.dumps(results,indent=2))
print('PASS: length and excessive-position-bias mutation guards, all existing E4120 MCQs clean.')
