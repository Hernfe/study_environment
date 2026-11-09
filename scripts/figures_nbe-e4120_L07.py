"""Reproduce lecture 7 source panels, retaining source axes and labels."""
from pathlib import Path
import json,io
import pymupdf as fitz
from PIL import Image
ROOT=Path(__file__).resolve().parent.parent
DECK='source/nbe-e4120/lectures/Ephys-Lecture-7-2026_HHmodel1_full.pdf'
# One-based embedded images. None means a vector crop in page fractions.
PANELS={'recording':(2,None,(.735,.085,.99,.96)),'prediction':(3,1,None),'ions':(6,1,None),'potassium':(6,2,None),'clamp':(7,1,None),'currents':(8,3,None),'reversal':(9,1,None),'subtraction':(10,1,None),'choline':(11,1,None),'blockers':(12,None,(.60,.15,.96,.89)),'protocol':(14,None,(.75,.26,.97,.73)),'sodium':(15,1,None),'k-instant':(17,3,None),'conductances':(18,3,None),'sensor':(19,1,None),'gates':(20,2,None),'states':(21,3,None),'inactivation':(22,4,None),'powers':(23,1,None),'transitions':(25,1,None),'time':(27,1,None),'fitting':(28,1,None),'steady':(29,2,None),'rates':(31,2,None),'group':(32,2,None)}
def main():
 d=fitz.open(ROOT/DECK);out=ROOT/'src/assets/figures/nbe-e4120/L07';out.mkdir(parents=True,exist_ok=True)
 for name,(page,index,box) in PANELS.items():
  p=d[page-1]
  if index:im=Image.open(io.BytesIO(d.extract_image(p.get_images(full=True)[index-1][0])['image'])).convert('RGB')
  else:
   w,h=p.rect.width,p.rect.height;pix=p.get_pixmap(matrix=fitz.Matrix(3,3),clip=fitz.Rect(box[0]*w,box[1]*h,box[2]*w,box[3]*h),alpha=False);im=Image.frombytes('RGB',(pix.width,pix.height),pix.samples)
  im.save(out/f'{name}.webp',quality=92)
  (out/f'{name}.json').write_text(json.dumps(dict(source=DECK,page=page,embeddedImage=index,cropFractions=box,width=im.width,height=im.height,labels='retained; quiz disabled'),indent=2))
 print(f'Regenerated {len(PANELS)} source panels')
if __name__=='__main__':main()
