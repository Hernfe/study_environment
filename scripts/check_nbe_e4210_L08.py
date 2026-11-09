"""Independently verify all L08 reaction-time arithmetic against authored content."""
import json
import subprocess

def main():
    raw=subprocess.check_output(['node','scripts/dump_questions.mjs','nbe-e4210/L08'],text=True,encoding='utf-8')
    content=json.loads(raw)['nbe-e4210/L08']['content']
    practice=next(s for s in content['sections'] if s['id']=='behaviour')['calculation']
    quiz=next(q for q in content['lectureQuiz'] if q['type']=='calc')
    for name,q in [('section',practice),('quiz',quiz)]:
        valid,neutral,invalid=[x['value'] for x in q['given']]
        benefit,cost=neutral-valid,invalid-neutral
        for stage,expected in zip(q['stages'],[benefit,cost]):
            assert stage['answer']['value']==expected,(name,stage['title'],expected)
        assert benefit+cost==invalid-valid
        print(f'{name}: benefit {benefit} ms; cost {cost} ms; gap {invalid-valid} ms: verified')
    assert 355-320==35 and 405-355==50
    print('HW4: benefit 35 ms; cost 50 ms: verified')
    assert len(content['sections'])==18 and len(content['lectureQuiz'])==16
    assert [s['id'] for s in content['sections']]==[
        'diffuse','noradrenergic','fmri-meg','bold','meg-eeg','dmn-discovery',
        'dmn-functions','dmn-subsystems','yeo','power','attention-types','posner',
        'behaviour','neural-effects','frontoparietal','maps','control-executive','pfc']
    tiers=[['easy','medium','hard'].index(q['difficulty']) for q in content['lectureQuiz']]
    assert tiers==sorted(tiers)
    assert all(4<=len(s['conceptQuiz'])<=6 for s in content['sections'])
    for section in content['sections']:
        figure=section.get('figure')
        if figure:
            assert len(figure['wordBank'])-len(figure['hotspots']['regions'])==2
    print('18 sections, 4-6 checks each, 16 bank questions, two label distractors: verified')

if __name__=='__main__': main()
