"""Recompute original source examples, not new practice, independently in SI."""
import math
from check_calcs import compute
D=[1.2e-6,1.5e-6,2.15e-6];ell=[75e-6,50e-6,100e-6]
lam=[math.sqrt(d*2/4) for d in D];tau=2*.01
length=[x/y for x,y in zip(ell,lam)];theta=[2*x/tau for x in lam]
for a,b in zip(lam,[774.6e-6,866e-6,1036.8e-6]):assert math.isclose(a,b,rel_tol=.0001)
assert length[0]>length[2]>length[1]
powerMismatch=D[2]**1.5-sum(d**1.5 for d in D[:2]);assert powerMismatch>0
assert not math.isclose(length[2]+length[0],length[2]+length[1],rel_tol=.01)
target=ell[0]/(ell[1]/theta[1]);new=2*(theta[0]/target)**2
assert math.isclose(new,7111.111111e-4,rel_tol=1e-9)
print('Exercise5 1: lambda(um)='+str([round(x*1e6,6) for x in lam])+'; tau(ms)='+str(tau*1e3))
print('Exercise5 1: paths='+str([length[2]+x for x in length[:2]])+'; rounded node nearly matches; endpoint paths fail PASS')
print(f'Exercise5 1c: estimated retuned Rm={new/1e-4:.9g} ohm cm2; estimate is not exact EPSP latency PASS')
ds=[1e-6,2e-6,3e-6,5e-6];deq=sum(d**1.5 for d in ds)**(2/3)
assert math.isclose(deq,compute(dict(relation='rallDiameter',inputs=dict(diameters=ds))),rel_tol=1e-12)
wrong=sum(d**1.5 for d in ds[:3]+[4e-6])**(2/3)
print(f'Exercise5 2a: sheet d4=5 um -> deq={deq*1e6:.9g} um; answer substitutes 4 um -> {wrong*1e6:.9g} um. Source discrepancy confirmed.')
L=math.acosh(1/.7);assert math.isclose(1/math.cosh(L),.7)
print(f'Exercise5 2b: remaining fraction 0.7 -> L={L:.9g} PASS')
# Source PDF30 rounded matching nodes are approximate.
assert math.isclose(2.08**1.5,3,rel_tol=.001)
assert math.isclose(3.3**1.5,6,rel_tol=.001)
# One arm consistency via material and per-length derivations.
for d in [1e-6,4e-6]:
 ri=1/(math.pi*(d/2)**2);rm=2/(math.pi*d);R=math.sqrt(ri*rm)
 g=compute(dict(relation='rallConductance',inputs=dict(diameter=d,ri=1,rm=2)))
 assert math.isclose(g*R,1,rel_tol=1e-12)
print('L05 sources: one-arm prefactor, rounded source tree, both Exercise5 problems and documented corrections verified PASS.')

assert compute(dict(relation='passiveDecay',inputs=dict(v=-.004,time=1000,tau=.01)))==0
assert math.isclose(compute(dict(relation='sealedLength',inputs=dict(fraction=1e-200))),math.log(2)-math.log(1e-200))
print('L05 numerical extremes: long decay avoids exponential overflow; tiny remaining fraction avoids squared underflow PASS.')
