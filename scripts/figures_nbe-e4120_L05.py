"""Reproduce L05 teaching panels, retaining printed labels, axes and scales."""
from pathlib import Path
import json,io
import pymupdf as fitz
ROOT=Path(__file__).resolve().parent.parent
SOURCE=ROOT/'source/nbe-e4120/lectures/Ephys-Lectures-5_2026_Rall.pdf'
# Deliberate figure regions rather than entire slides; labels remain, quiz off.
CROPS={'models':(3,(.73,.15,.99,.93)), 'lumped':(4,(.025,.18,.49,.91)), 'distributed':(5,(.035,.36,.56,.87)), 'one':(6,(.03,.32,.61,.89)), 'two':(7,(.035,.18,.67,.65)), 'transmission':(9,(.05,.19,.52,.92)), 'receptors':(10,(.70,.14,.94,.93)), 'graded':(11,(.06,.15,.69,.48)), 'active':(12,(.66,.19,.99,.78)), 'local':(13,(.64,.22,.95,.92)), 'backprop':(14,(.54,.37,.99,.9)), 'echo':(15,(.70,.17,.99,.91)), 'trees':(16,(.50,.15,.99,.91)), 'compartments':(19,(.65,.17,.96,.94)), 'equivalent':(18,(.78,.13,.99,.38)), 'branch':(20,(.025,.15,.35,.43)), 'rall-tree':(21,(.68,.10,.995,.50)), 'replace':(24,(.08,.69,.95,.94)), 'stems':(26,(.69,.15,.99,.48)), 'profiles':(27,(.64,.18,.98,.76)), 'finite':(28,(.10,.29,.99,.91)), 'path':(29,(.73,.17,.99,.61)), 'example':(30,(.35,.005,.90,.985)), 'soma':(31,(.03,.38,.54,.95)), 'step':(32,(.04,.13,.51,.91)), 'alpha':(33,(.035,.27,.96,.95))}
EMBEDDED={'models':[0,1,2,3], 'distributed':[0], 'one':[0], 'two':[0], 'transmission':[0], 'receptors':[3,2], 'graded':[0], 'active':[0], 'local':[0], 'backprop':[1], 'echo':[0], 'trees':[0], 'compartments':[0], 'equivalent':[1], 'rall-tree':[0], 'replace':[1,0], 'stems':[0], 'profiles':[0], 'path':[0], 'soma':[1], 'step':[0], 'alpha':[0]}
def main():
 out=ROOT/'src/assets/figures/nbe-e4120/L05';out.mkdir(parents=True,exist_ok=True);d=fitz.open(SOURCE)
 for name,(n,box) in CROPS.items():
  p=d[n-1];w,h=p.rect.width,p.rect.height
  pix=p.get_pixmap(matrix=fitz.Matrix(3,3),clip=fitz.Rect(box[0]*w,box[1]*h,box[2]*w,box[3]*h),alpha=False)
  from PIL import Image
  im=Image.frombytes('RGB',(pix.width,pix.height),pix.samples)
  if name in EMBEDDED:
   panels=[Image.open(io.BytesIO(d.extract_image(p.get_images(full=True)[i][0])['image'])).convert('RGB') for i in EMBEDDED[name]]
   if len(panels)==1:im=panels[0]
   else:
    # Align panels on a common width, preserving aspect and labels.
    width=max(a.width for a in panels);panels=[a.resize((width,round(a.height*width/a.width))) for a in panels]
    im=Image.new('RGB',(width,sum(a.height for a in panels)+20*(len(panels)-1)),'white');y=0
    for a in panels:im.paste(a,(0,y));y+=a.height+20
  im.save(out/f'{name}.webp',quality=92)
  (out/f'{name}.json').write_text(json.dumps(dict(source=str(SOURCE.relative_to(ROOT)),page=n,printedSlide=n if n<8 else n+1,cropFractions=box,embeddedImageIndices=EMBEDDED.get(name),width=im.width,height=im.height,labels='retained; quiz off'),indent=2))
 print(f'Regenerated {len(CROPS)} L05 source panels')
if __name__=='__main__':main()
