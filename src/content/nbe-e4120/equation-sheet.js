// Faithful TeX transcription of Exam info Ephys_Oct_2026.pdf, p4.
// These are full-course reference equations, not a claim of L01 scope.
export const equationSheet = [
  'E_{eq}=\\frac{RT}{zF}\\ln\\frac{C_{out}}{C_{in}}',
  '20\\,^{\\circ}\\mathrm C:\\quad E_{eq}=\\frac{58\\,\\mathrm{mV}}{z}\\log_{10}\\frac{C_{out}}{C_{in}}',
  '37\\,^{\\circ}\\mathrm C:\\quad E_{eq}=\\frac{61.5\\,\\mathrm{mV}}{z}\\log_{10}\\frac{C_{out}}{C_{in}}',
  'V_m=\\frac{RT}{F}\\ln\\left(\\frac{P_K[K^+]_{out}+P_{Na}[Na^+]_{out}+P_{Cl}[Cl^-]_{in}}{P_K[K^+]_{in}+P_{Na}[Na^+]_{in}+P_{Cl}[Cl^-]_{out}}\\right)',
  'I_m=C_m\\frac{dV_m}{dt}+\\sum_i g_i(V_m-E_i)',
  'V_m=\\frac{g_{Na}E_{Na}+g_KE_K+g_{Cl}E_{Cl}}{g_{Na}+g_K+g_{Cl}}',
  '\\frac{1}{r_i}\\frac{\\partial^2V_m}{\\partial x^2}=c_m\\frac{\\partial V_m}{\\partial t}+\\frac{V_m}{r_m}',
  '\\lambda^2\\frac{\\partial^2V_m}{\\partial x^2}=\\tau_m\\frac{\\partial V_m}{\\partial t}+V_m',
  'V_m(x)=V_0e^{-|x|/\\lambda}',
  '\\lambda=\\sqrt{\\frac{r_m}{r_i}}=\\sqrt{\\frac{R_m}{R_i}\\cdot\\frac{a}{2}};\\qquad\\tau_m=r_mc_m',
  'd_P^{3/2}=\\sum d_D^{3/2}',
  '\\theta=\\frac{2\\lambda}{\\tau_m}',
  'I_m(V_m,t)=C_m\\frac{dV_m}{dt}+g_K(V_m-E_K)+g_{Na}(V_m-E_{Na})+g_L(V_m-E_L)',
  'g_{Na}(V,t)=m^3h\\overline{g}_{Na};\\qquad g_K(V,t)=n^4\\overline{g}_K',
  'Q=\\int I_g(t)dt=zeD;\\qquad\\gamma=\\frac{\\overline g}{D}',
  'P_n(k)=\\frac{n!}{k!(n-k)!}p^k(1-p)^{n-k};\\qquad P(k)=\\frac{m^ke^{-m}}{k!}',
];
