"""Independent SI recomputation of explicitly verified quantitative content."""
import json
import math
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

def compute(spec):
    p = spec['inputs']
    relation = spec['relation']
    if relation == 'product': result = p['a'] * p['b']
    elif relation == 'ratio': result = p['a'] / p['b']
    elif relation == 'sum': result = p['a'] + p['b']
    elif relation == 'parallel': result = p['a'] * p['b'] / (p['a'] + p['b'])
    elif relation == 'divider': result = p['v'] / (p['r1'] + p['r2']) * p['r2']
    elif relation == 'charging': result = p['i'] * p['r'] * -math.expm1(-p['t'] / (p['r'] * p['c']))
    elif relation == 'corner': result = 0.5 / math.pi / p['tau']
    elif relation == 'nernst': result = p['shortcut'] * math.log(p['outside'] / p['inside']) / math.log(10) / p['z']
    else: raise ValueError(f'Unknown relation {relation}')
    return result / spec.get('displayScale', 1)

def walk(value, path=''):
    if isinstance(value, dict):
        if ('/stages/' in path or '/formulas/' in path) and ('value' in value and 'tolerance' in value or 'wrongValue' in value) and 'verification' not in value:
            yield path, {**value, 'verification': {'relation': 'MISSING', 'inputs': {}}}
        if 'verification' in value:
            yield path, value
        for key, child in value.items():
            if key != 'verification': yield from walk(child, path + '/' + key)
    elif isinstance(value, list):
        for i, child in enumerate(value): yield from walk(child, path + '/' + str(i))

def main():
    run = subprocess.run(['node', 'scripts/dump_questions.mjs'], cwd=ROOT, capture_output=True, text=True, encoding='utf-8')
    if run.returncode: print(run.stderr); return 1
    data = json.loads(run.stdout)
    count = errors = 0
    for name, entry in data.items():
        if entry.get('error'): print(entry['error']); errors += 1; continue
        for path, obj in walk(entry.get('content', {}), name):
            count += 1
            try:
                actual = compute(obj['verification'])
                expected = obj.get('value', obj.get('wrongValue'))
                tolerance = obj.get('tolerance', 1e-9)
                passed = expected is not None and math.isfinite(actual) and abs(actual-expected) <= tolerance + 1e-12
                print(f'{path}: expected={expected}, computed={actual:.12g}, tolerance={tolerance}: {"PASS" if passed else "FAIL"}')
                errors += not passed
            except (KeyError, ValueError, ZeroDivisionError, OverflowError) as exc:
                print(f'{path}: FAIL {exc}'); errors += 1
    print(f'Calculation check: {count} verified values, {errors} failures.')
    return int(errors > 0)

if __name__ == '__main__': sys.exit(main())
