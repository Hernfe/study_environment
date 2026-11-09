"""Rebuild L08 source crops with axes and original labels; no generated recordings."""
from pathlib import Path
import json, io
import pymupdf as fitz
from PIL import Image
ROOT=Path(__file__).resolve().parent.parent
A='source/nbe-e4120/lectures/Ephys-Lecture-8-1-2026_HHmodel2 (1).pdf'
B='source/nbe-e4120/lectures/Ephys-Lecture-8-2-2026_Saltatory_v4 (1).pdf'
E='source/nbe-e4120/exercises/Exercise8HH.pdf'
PANELS={
'circuit':(A,2,(.04,.16,.41,.87)), 'agreement':(A,3,(.06,.43,.89,.87)),
'space':(A,4,(.63,.25,.96,.51)), 'nonpropagating':(A,5,(.69,.18,.93,.86)),
'propagation':(A,6,(.04,.25,.53,.97)), 'propagating':(A,7,(.04,.20,.49,.90)),
'noble':(A,8,(.53,.12,.98,.73)), 'moving-iv':(A,9,(.58,.21,.98,.82)),
 'threshold':(A,10,(.035,.37,.45,.92)), 'feedback':(A,11,(.02,.22,.98,.90)),
'phases':(A,12,(.73,.18,.98,.91)), 'accommodation':(A,13,(.44,.14,.98,.60)),
'refractory':(A,14,(.76,.14,.99,.91)), 'sensor':(A,15,(.44,.12,.98,.60)),
'energy':(A,16,(.76,.10,.99,.58)), 'slope':(A,17,(.46,.12,.98,.68)),
'gating':(A,18,(.77,.13,.99,.96)), 'capacitance':(A,19,(.025,.22,.45,.66)),
'charge':(A,20,(.66,.14,.97,.58)), 'ais':(B,2,(.69,.10,.98,.92)),
'diameter':(B,3,(.75,.13,.98,.86)), 'speed':(B,4,(.61,.16,.97,.54)),
'glia':(B,5,(.61,.11,.99,.74)), 'myelin':(B,6,(.69,.10,.99,.80)),
'node':(B,7,(.48,.62,.98,.94)), 'dimensions':(B,8,(.02,.14,.54,.44)),
'continuous':(B,10,(.02,.17,.48,.86)), 'saltatory':(B,10,(.53,.20,.98,.84)),
'channels':(B,11,(.54,.27,.98,.91)), 'anesthetic':(B,12,(.05,.17,.35,.95)),
'twitch':(B,13,(.06,.33,.43,.88)), 'extracellular':(B,14,(.56,.15,.99,.86)),
'voltage-current':(B,15,(.08,.16,.62,.59)), 'double':(B,16,(.035,.47,.49,.82)),
'continuity':(B,17,(.74,.15,.99,.96)), 'ex-table':(E,2,(.09,.11,.54,.36)),
'ex-potassium':(E,2,(.10,.57,.90,.91)), 'ex-gating':(E,3,(.09,.15,.59,.40))}
EMBED={'circuit':1,'agreement':1,'space':1,'nonpropagating':1,'propagation':1,'propagating':1,'noble':1,'moving-iv':2,'threshold':1,'phases':1,'accommodation':5,'refractory':1,'sensor':1,'energy':1,'slope':1,'gating':1,'capacitance':1,'charge':2,'ais':1,'diameter':1,'speed':3,'glia':3,'myelin':2,'node':4,'dimensions':3,'saltatory':2,'channels':1,'anesthetic':2,'twitch':1,'extracellular':1,'voltage-current':1,'double':3,'continuity':1}
def main():
 out=ROOT/'src/assets/figures/nbe-e4120/L08';out.mkdir(parents=True,exist_ok=True)
 for name,(source,page,box) in PANELS.items():
  d=fitz.open(ROOT/source);p=d[page-1];w,h=p.rect.width,p.rect.height
  pix=p.get_pixmap(matrix=fitz.Matrix(2.5,2.5),clip=fitz.Rect(box[0]*w,box[1]*h,box[2]*w,box[3]*h),alpha=False)
  im=Image.frombytes('RGB',(pix.width,pix.height),pix.samples)
  if name in EMBED: im=Image.open(io.BytesIO(d.extract_image(p.get_images(full=True)[EMBED[name]-1][0])['image'])).convert('RGB')
  if name=='speed': im=im.rotate(180,expand=True)
  if name=='continuous':
   d=fitz.open(ROOT/B);p=d[9];im=Image.open(io.BytesIO(d.extract_image(p.get_images(full=True)[0][0])['image'])).convert('RGB')
  im.save(out/f'{name}.webp',quality=90)
  (out/f'{name}.json').write_text(json.dumps(dict(source=source,page=page,cropFractions=None if name in EMBED else box,embeddedImage=EMBED.get(name),width=im.width,height=im.height,rotationDegrees=180 if name=='speed' else 0,labels='Original source labels and axes retained; quiz disabled.'),indent=2))
 print(f'Regenerated {len(PANELS)} source panels')
if __name__=='__main__': main()
