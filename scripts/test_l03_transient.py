"""Independent checks of the source erfc step-response sign and limits."""
import math

def v(x,t):
 return (math.exp(-x)*math.erfc(x/(2*math.sqrt(t))-math.sqrt(t))-math.exp(x)*math.erfc(x/(2*math.sqrt(t))+math.sqrt(t)))/2
assert abs(v(0,1e-12))<2e-6
for x in [0,.5,1,2]:
 assert math.isclose(v(x,100),math.exp(-x),rel_tol=1e-12)
 assert 0<=v(x,.1)<=v(x,1)<=math.exp(-x)
assert math.isclose(v(0,1),math.erf(1),rel_tol=1e-12)
print('L03 source transient: continuous initial response, steady spatial limit, bounded monotonic development and injection-site erf identity PASS.')
