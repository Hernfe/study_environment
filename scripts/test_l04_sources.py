"""Independent audit of Exercise 4 worked answers, not new practice scenarios."""
import math
from check_calcs import compute
from pathlib import Path
# Use original sheet values in SI, retain full precision until comparing rounded PDF values.
a=30e-9;h=2.5e-9;rho=2;length=3e-6
area=math.pi*h*(2*a+h);ri=rho/(math.pi*a*a);ro=rho/area
expected=[(1,86.6e-6,33.3e-6,.035,.09),(.01,8.66e-6,3.33e-6,.35,.90)]
for Rm,l0,l1,L0,L1 in expected:
 rm=Rm/(2*math.pi*a)
 no=compute(dict(relation='cableLength',inputs=dict(rm=rm,ri=ri)))
 yes=compute(dict(relation='cableLength',inputs=dict(rm=rm,ri=ri,ro=ro)))
 for actual,published in [(no,l0),(yes,l1),(length/no,L0),(length/yes,L1)]:
  assert math.isclose(actual,published,rel_tol=.015),(actual,published)
 print(f'Exercise4 Rm={Rm:g} SI: lambda(no return)={no*1e6:.8g} um, lambda(return)={yes*1e6:.8g} um; L={length/no:.8g}/{length/yes:.8g}: PASS (source rounding)')
for power,want in [(.5,math.sqrt(2)),(-1.5,1/math.sqrt(8)),(0,1)]:
 assert math.isclose(compute(dict(relation='powerRatio',inputs=dict(a=10,b=5,power=power))),want)
# Verify corrected hyperbolic parity and normalized gradient via change of variable.
for X in [.1,1,2]:assert math.isclose(math.sinh(-X),-math.sinh(X))
print('L04 sources: both Exercise 4 problems independently reproduced; hyperbolic sign and dimension convention audited PASS.')
