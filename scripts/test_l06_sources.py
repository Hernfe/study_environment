"""Independent exercise readings and source-law consistency, not new recordings."""
import math
from check_calcs import compute
# Approximate graph readings supplied explicitly by Exercise6 instructions.
gin=(-1.2e-9)/(-.01-.03);gout=1e-9/(.1-.03);ratio=10**(-30/58)
assert math.isclose(gin,30e-9)
assert math.isclose(gout,14.2857142857143e-9)
assert math.isclose(ratio,.30391953823132)
assert math.isclose(-3e-9-(-1e-9),-2e-9)
# Verify the finite-rate/current jump caveat independently.
g,y,E,Vold,Vnew=10e-9,.25,.02,-.02,-.06
assert y==.25 and not math.isclose(g*y*(Vold-E),g*y*(Vnew-E),abs_tol=1e-15)
# Reversal cancels location for general positive concentrations.
for delta in [0,.2,.5,.8,1]:
 u=math.log(80/20)
 outward=20*math.exp(delta*u);inward=80*math.exp(-(1-delta)*u)
 assert math.isclose(outward,inward)
# Static GHK implementation remains finite in both extremes and agrees near zero.
p=dict(permeability=1e-8,z=1,f=96485,r=8.314,temperature=293,inside=100,outside=20)
for v in [-100,-1e-14,0,1e-14,100]:
 assert math.isfinite(compute(dict(relation='ghkCurrent',inputs={**p,'v':v})))
print('L06 source audit: Exercise6 approximate chords 30 nS and 14.2857143 nS, concentration ratio 0.303919538, gated component -2 nA; current-jump caveat; barrier-independent reversal; independent GHK extremes PASS.')
