"""Reproduce L02 source figures, retaining original axes and printed labels."""
from pathlib import Path
import json
import pymupdf as fitz
from PIL import Image
ROOT=Path(__file__).resolve().parent.parent
SOURCE=ROOT/'source/nbe-e4120/lectures/Ephys-Lectures-2-2026_Potentials_11-9-26 (1).pdf'
OUT=ROOT/'src/assets/figures/nbe-e4120/L02'
CROPS={
'equilibrium':(2,(.70,.16,.96,.94)), 'chloride':(4,(.59,.23,.97,.875)),
'permeability':(5,(.32,.48,.60,.90)), 'rectification':(7,(.52,.36,.96,.945)),
'rectifier-recordings':(8,(.06,.13,.49,.96)), 'potassium':(9,(.63,.16,.995,.985)),
'resting':(10,(.65,.25,.98,.87)), 'terminology':(11,(.635,.12,.999,.54)),
'cell-potentials':(12,(.65,.13,.95,.96)), 'neuron':(14,(.01,.30,.405,.95)),
'signalling':(15,(.64,.12,.97,.95)), 'action-potential':(16,(.76,.47,.98,.85)),
'clamp':(18,(.66,.20,.97,.94)), 'blockers':(19,(.64,.18,.96,.94)),
'circuit':(22,(.05,.54,.53,.90)), 'conductance':(24,(.535,.65,.90,.96)),
'slope':(25,(.60,.20,.97,.93)), 'parallel':(26,(.63,.13,.95,.43)),
'iv':(27,(.575,.48,.98,.89)), 'calcium':(28,(.46,.54,.998,.92)),
'activation':(28,(.085,.61,.375,.90))}
def main():
 OUT.mkdir(parents=True,exist_ok=True);doc=fitz.open(SOURCE)
 for name,(n,frac) in CROPS.items():
  p=doc[n-1];w,h=p.rect.width,p.rect.height
  pix=p.get_pixmap(matrix=fitz.Matrix(3,3),clip=fitz.Rect(frac[0]*w,frac[1]*h,frac[2]*w,frac[3]*h),alpha=False)
  im=Image.frombytes('RGB',(pix.width,pix.height),pix.samples)
  if name=='calcium':
   panels=[]
   for box in [(660,55,925,280),(440,290,959,496)]:
    px=p.get_pixmap(matrix=fitz.Matrix(2,2),clip=fitz.Rect(box),alpha=False);panels.append(Image.frombytes('RGB',(px.width,px.height),px.samples))
   im=Image.new('RGB',(max(x.width for x in panels),sum(x.height for x in panels)+30),'white');y=0
   for panel in panels:im.paste(panel,((im.width-panel.width)//2,y));y+=panel.height+30
  im.save(OUT/f'{name}.webp',quality=88)
  (OUT/f'{name}.json').write_text(json.dumps(dict(source=str(SOURCE.relative_to(ROOT)),page=n,cropFractions=frac,width=im.width,height=im.height,labels='retained; quiz off',panelsPoints=[(660,55,925,280),(440,290,959,496)] if name=='calcium' else None),indent=2))
 print(f'Regenerated {len(CROPS)} slide figures')
if __name__=='__main__':main()
