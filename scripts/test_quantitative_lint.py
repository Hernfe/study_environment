"""Ensure new L00 quantitative fixtures pass independently of its legacy waiver."""
from lint_questions import dump, check_fields, check_sections, symbol_hits, texts

content = next(iter(dump(['nbe-e4210/L00']).values()))['content']
fixtures = [q for q in content['lectureQuiz'] if q['id'].startswith('quantitative-')]
section = next(s for s in content['sections'] if s['id'] == 'quantitative-fixtures')
findings = check_sections({'sections': [section]}, [], 'nbe-e4210/L00')
for question in fixtures:
    findings += check_fields(question)
for exam in content['mockExams']:
    assert len(exam['questions']) == 5
    for question in exam['questions']: findings += check_fields(question)
hits = [hit for text in texts({'sections': [section], 'lectureQuiz': fixtures, 'mockExams': content['mockExams']}) for hit in symbol_hits(text)]
assert not findings, findings
assert not hits, hits
print('Quantitative fixtures: 0 field, section or plain-maths findings (no legacy waiver).')
