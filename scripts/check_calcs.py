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
    if relation == 'hhBalance':
        if not p['capacitance']>0 or not all(math.isfinite(p[k]) for k in ['im','ionic','capacitance']): raise ValueError('Invalid currents/capacitance')
        result=math.fsum([p['im'],-p['ionic']])/p['capacitance']
    elif relation == 'axialSource':
        if not (p['radius']>0 and p['rho']>0 and all(math.isfinite(p[k]) for k in ['radius','rho','curvature'])): raise ValueError('Invalid cable source')
        result=(p['radius']/p['rho'])*p['curvature']/2
    elif relation == 'boltzmann':
        if not p['thermal']>0 or not all(math.isfinite(p[k]) for k in ['bias','z','voltage','thermal']): raise ValueError('Invalid Boltzmann inputs')
        x=p['bias']+p['z']*p['voltage']/p['thermal']
        result=(1+math.tanh(x/2))/2 if abs(x)<30 else (1/(1+math.exp(-x)) if x>0 else math.exp(x)/(1+math.exp(x)))
    elif relation == 'expCharge':
        if not (p['tau']>0 and p['time']>=0 and all(math.isfinite(p[k]) for k in ['current','tau','time'])): raise ValueError('Invalid transient')
        result=p['current']*p['tau']*(-math.expm1(-p['time']/p['tau']))
    elif relation == 'hhRate':
        u=p['voltage']*1000
        if not math.isfinite(u): raise ValueError('Finite rest-relative voltage required')
        # Independent sinh form for the removable singularities.
        def trap(x):
            if abs(x)<1e-6: return 1-x/2+x*x/12-x**4/720
            return x*math.exp(-x/2)/(2*math.sinh(x/2))
        rates={'an':lambda:100*trap((10-u)/10),'bn':lambda:125*math.exp(-u/80),
               'am':lambda:1000*trap((25-u)/10),'bm':lambda:4000*math.exp(-u/18),
               'ah':lambda:70*math.exp(-u/20),'bh':lambda:1000/(1+math.exp((30-u)/10))}
        result=rates[p['gate']]()
    elif relation == 'exponentialRate':
        if p['base']<0 or not math.isfinite(p['exponent']): raise ValueError('Invalid baseline/exponent')
        result=p['base']*math.exp(p['exponent'])
    elif relation == 'gateDerivative':
        a,b,y=p['alpha'],p['beta'],p['y']
        if min(a,b)<0 or not 0<=y<=1: raise ValueError('Invalid rate/probability')
        result=a-(a+b)*y
    elif relation == 'gateSteady':
        a,b=p['alpha'],p['beta']
        if min(a,b)<0 or a+b<=0: raise ValueError('Invalid rate sum')
        result=1/(1+b/a) if a else 0
    elif relation == 'gateRelax':
        y0,yi,t,tau=p['y0'],p['steady'],p['time'],p['tau']
        if not (0<=y0<=1 and 0<=yi<=1 and t>=0 and tau>0): raise ValueError('Invalid gating state')
        result=yi+(y0-yi)*math.exp(-t/tau)
    elif relation == 'gatePower':
        if not (0<=p['y']<=1 and isinstance(p['count'],int) and not isinstance(p['count'],bool) and p['count']>0): raise ValueError('Invalid particle probability/count')
        result=math.prod([p['y']]*p['count'])
    elif relation == 'rallDiameter':
        ds=p['diameters']
        if not ds or any(d<=0 for d in ds): raise ValueError('Positive diameters required')
        result=math.exp(math.log(math.fsum(d*math.sqrt(d) for d in ds))*2/3)
    elif relation == 'rallConductance':
        d,rm,ri=p['diameter'],p['rm'],p['ri'];L=p.get('length')
        if min(d,rm,ri)<=0 or (L is not None and L<=0): raise ValueError('Positive cable parameters required')
        radius=d/2
        axial=ri/(math.pi*radius*radius);membrane=rm/(2*math.pi*radius)
        result=1/math.sqrt(axial*membrane)
        if L is not None: result*=math.tanh(L)
    elif relation == 'sealedLength':
        f=p['fraction']
        if not 0<f<=1: raise ValueError('Remaining fraction must be in (0,1]')
        result=math.log1p(math.sqrt((1-f)*(1+f)))-math.log(f)
    elif relation == 'pathLength':
        ss=p['segments']
        if not ss or any(x['length']<0 or x['lambda']<=0 for x in ss): raise ValueError('Invalid path')
        result=math.fsum(x['length']/x['lambda'] for x in ss)
    elif relation == 'resistanceRetune':
        if min(p['resistance'],p['old'],p['new'])<=0: raise ValueError('Positive resistance and speeds required')
        result=p['resistance']*p['old']**2/p['new']**2
    elif relation == 'sealedResistance':
        if min(p['resistance'],p['length'])<=0: raise ValueError('Positive resistance and length required')
        result=p['resistance']*math.cosh(p['length'])/math.sinh(p['length']) if p['length']<300 else p['resistance']
    elif relation == 'passiveDecay':
        if p['time']<0 or p['tau']<=0: raise ValueError('Nonnegative time and positive time constant required')
        result=p['v']*math.exp(-p['time']/p['tau'])
    elif relation == 'infiniteCable': result = p['current']*(p['ri']*p['lambda']/2)*math.exp(-abs(p['x'])/p['lambda'])
    elif relation == 'annulus': result = math.pi*p['shell']*(2*p['radius']+p['shell'])
    elif relation == 'powerRatio': result = math.exp(p['power']*math.log(p['a']/p['b']))
    elif relation == 'passiveSpeed': result = p['lambda']/(p['tau']/2)
    elif relation == 'passivePosition': result = p['lambda']*(2*p['time']/p['tau']-.5)
    elif relation == 'cableInput': result = p['ri']*p['lambda']/p.get('sides',2)
    elif relation in ('finiteCable','endpointCable'):
        L,X=p['length'],p['x']
        if not (L>0 and 0<=X<=L): raise ValueError('Invalid finite cable position/length')
        if relation=='endpointCable':
            def sinh_ratio(y): return math.exp(y-L)*(-math.expm1(-2*y))/(-math.expm1(-2*L))
            result=p['v0']*sinh_ratio(L-X)+p['ve']*sinh_ratio(X)
        elif not p['load']>=0: raise ValueError('Negative load')
        elif p.get('mode')=='open': result=p['v']*math.exp(-X)*math.expm1(-2*(L-X))/math.expm1(-2*L)
        elif L<300: result=p['v']*(math.cosh(L-X)+p['load']*math.sinh(L-X))/(math.cosh(L)+p['load']*math.sinh(L))
        else:
            q=(1-p['load'])/(1+p['load'])
            result=p['v']*(math.exp(-X)+q*math.exp(X-2*L))/(1+q*math.exp(-2*L))
    elif relation == 'cableAxial': result = p['rho'] / (math.pi*p['radius']**2)
    elif relation == 'cableMembrane': result = p['specific']/(2*math.pi*p['radius'])
    elif relation == 'cableCapacitance': result = p['specific']*2*math.pi*p['radius']
    elif relation == 'cableLength': result = math.sqrt(p['rm']/(p['ri']+p.get('ro',0)))
    elif relation == 'cableDecay': result = p['v']*math.exp(-abs(p['x'])/p['lambda'])
    elif relation == 'cableInverse': result = -abs(p['x'])/math.log(p['fraction'])
    elif relation == 'cableEvolution': result = (p['lambda']**2*p['curvature']-p['v']+p.get('rm',0)*p.get('injection',0))/p['tau']
    elif relation == 'ghkVoltage': result = p['shortcut']*math.log10((p['pk']*p['ko']+p['pna']*p['nao']+p['pcl']*p['cli'])/(p['pk']*p['ki']+p['pna']*p['nai']+p['pcl']*p['clo']))
    elif relation == 'weightedVoltage': result = sum(p['g'+i]*p['e'+i] for i in ['k','na','cl'])/sum(p['g'+i] for i in ['k','na','cl'])
    elif relation == 'nernstRatio': result = math.exp(math.log(10)*p['delta']/p['shortcut'])
    elif relation == 'sphereArea': result = math.pi*(2*p['radius'])**2
    elif relation == 'ghkCurrent':
        x=p['z']*p['f']*p['v']/(p['r']*p['temperature'])
        if x==0: flux=p['inside']-p['outside']
        elif abs(x)<1e-6:
            # Independent local series for the removable zero-voltage singularity.
            flux=(p['inside']-p['outside'])*(1+x*x/12)+x*(p['inside']+p['outside'])/2
        else:
            # coth(x/2) form, no exponentially large intermediates.
            flux=x/2*((p['inside']-p['outside'])/math.tanh(x/2)+p['inside']+p['outside'])
        result=p['permeability']*p['z']*p['f']*flux
    elif relation == 'product': result = p['a'] * p['b']
    elif relation == 'ratio': result = p['a'] / p['b']
    elif relation == 'sum': result = p['a'] + p['b']
    elif relation == 'parallel': result = p['a'] * p['b'] / (p['a'] + p['b'])
    elif relation == 'divider': result = p['v'] / (p['r1'] + p['r2']) * p['r2']
    elif relation == 'charging': result = p['i'] * p['r'] * -math.expm1(-p['t'] / (p['r'] * p['c']))
    elif relation == 'corner': result = 0.5 / math.pi / p['tau']
    elif relation == 'geometry': result = p['area'] / p['distance'] * p['epsilon']
    elif relation == 'diffusion': result = -p['gradient'] * p['d']
    elif relation == 'drift': result = -p['field'] * p['concentration'] * p['z'] * p['mobility']
    elif relation == 'einstein': result = (p['r'] / p['f']) * p['temperature'] * p['mobility']
    elif relation == 'electrodiffusion':
        diff = -(p['mobility'] * p['r'] * p['temperature'] / p['f']) * p['gradient']
        drift = -(p['mobility'] * p['z'] * p['concentration']) * p['field']
        result = diff + drift
    elif relation == 'fluxCurrent': result = p['f'] * p['z'] * p['flux']
    elif relation == 'donnan':
        # Solve conservation plus electroneutrality and product equality.
        a, k = p['fixed'], p['salt']
        result = a*k/(4*k+a)
        assert math.isclose((k+a-result)*(k-result), (k+result)**2, rel_tol=1e-10)
    elif relation == 'nernst': result = p['shortcut'] * math.log(p['outside'] / p['inside']) / math.log(10) / p['z']
    elif relation == 'binomialProb':
        n, k_val, p_val = int(p['n']), int(p['k']), p['p']
        if not (0 <= p_val <= 1 and 0 <= k_val <= n): raise ValueError('Invalid binomial params')
        result = math.comb(n, k_val) * math.pow(p_val, k_val) * math.pow(1 - p_val, n - k_val)
    elif relation == 'poissonProb':
        m, k_val = p['m'], int(p['k'])
        if not (m >= 0 and k_val >= 0): raise ValueError('Invalid Poisson params')
        result = math.exp(-m) * math.pow(m, k_val) / math.factorial(k_val)
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
                passed = expected is not None and math.isfinite(actual) and abs(actual-expected) <= tolerance + 8 * math.ulp(max(abs(actual), abs(expected)))
                print(f'{path}: expected={expected}, computed={actual:.12g}, tolerance={tolerance}: {"PASS" if passed else "FAIL"}')
                errors += not passed
            except (KeyError, ValueError, ZeroDivisionError, OverflowError) as exc:
                print(f'{path}: FAIL {exc}'); errors += 1
    cumulative = subprocess.run(['node', 'scripts/check_final_mocks.mjs'], cwd=ROOT, capture_output=True, text=True)
    print(cumulative.stdout, end='')
    if cumulative.returncode:
        print(cumulative.stderr); errors += 1
    else:
        count += 45
    print(f'Calculation check: {count} verified values, {errors} failures.')
    return int(errors > 0)

if __name__ == '__main__': sys.exit(main())
