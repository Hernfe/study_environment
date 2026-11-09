"""Reproduce labeled source panels without inventing numerical recordings."""
from pathlib import Path
import json,io
import pymupdf as fitz
from PIL import Image
ROOT=Path(__file__).resolve().parent.parent
DECK='source/nbe-e4120/lectures/Ephys-Lecture-6-2026_Nonlinearities_full (1).pdf'
EX='source/nbe-e4120/exercises/Exercise6 (2).pdf'
# Fractional regions preserve original axes, energy labels and legends.
PANELS={
 'rectification':(DECK,2,(.65,.12,.99,.81)),
 'ghk':(DECK,3,(.55,.31,.98,.96)),
 'barrier':(DECK,4,(.72,.19,.98,.89)),
 'tilt':(DECK,7,(.53,.16,.98,.71)),
 'position':(DECK,8,(.57,.12,.98,.97)),
 'concentrations':(DECK,9,(.43,.30,.99,.96)),
 'multiple':(DECK,10,(.57,.40,.98,.96)),
 'channel':(DECK,11,(.65,.20,.96,.84)),
 'gating':(DECK,13,(.61,.29,.98,.98)),
 'activation':(DECK,16,(.07,.16,.67,.94)),
 'kinetics':(DECK,17,(.59,.63,.99,.95)),
 'comparison':(DECK,21,(.05,.10,.98,.93)),
 'clamp':(EX,1,(.14,.49,.80,.76)),
 'chord':(EX,2,(.17,.17,.88,.48)),
}
EMBEDDED={'rectification':[0],'ghk':[0],'barrier':[0],'tilt':[0],'position':[0,1],'concentrations':[0],'multiple':[0],'channel':[0],'gating':[0],'activation':[1,2],'kinetics':[0],'clamp':[0],'chord':[0]}
def main():
 out=ROOT/'src/assets/figures/nbe-e4120/L06';out.mkdir(parents=True,exist_ok=True)
 for name,(source,page,box) in PANELS.items():
  d=fitz.open(ROOT/source);p=d[page-1];w,h=p.rect.width,p.rect.height
  pix=p.get_pixmap(matrix=fitz.Matrix(3,3),clip=fitz.Rect(box[0]*w,box[1]*h,box[2]*w,box[3]*h),alpha=False)
  im=Image.frombytes('RGB',(pix.width,pix.height),pix.samples)
  if name in EMBEDDED:
   ims=[Image.open(io.BytesIO(d.extract_image(p.get_images(full=True)[i][0])['image'])).convert('RGB') for i in EMBEDDED[name]]
   if len(ims)==1:im=ims[0]
   else:
    ww=max(a.width for a in ims);ims=[a.resize((ww,round(a.height*ww/a.width))) for a in ims]
    im=Image.new('RGB',(ww,sum(a.height for a in ims)+30),'white');y=0
    for a in ims:im.paste(a,(0,y));y+=a.height+30
  im.save(out/f'{name}.webp',quality=93)
  (out/f'{name}.json').write_text(json.dumps(dict(source=source,page=page,cropFractions=box,width=im.width,height=im.height,embeddedImageIndices=EMBEDDED.get(name),labels='retained; quiz disabled'),indent=2))
 print(f'Regenerated {len(PANELS)} L06 source panels')
if __name__=='__main__':main()
