"""Reproduce L04 source panels. All printed labels/axes retained, quiz off."""
from pathlib import Path
import pymupdf as fitz
from PIL import Image, ImageDraw
import io,json
ROOT=Path(__file__).resolve().parent.parent
OUT=ROOT/'src/assets/figures/nbe-e4120/L04'
SOURCE=ROOT/'source/nbe-e4120/lectures/Ephys-Lectures-4_2026_Cable (1).pdf'
# Fractions exclude surrounding prose; embedded panels preferred where available.
CROPS={'wave':(2,(.16,.14,.90,.43)), 'speed':(3,(.54,.15,.995,.61)), 'boundaries':(4,(.63,.46,.97,.81)), 'normalized':(5,(.65,.49,.98,.94)), 'infinite':(6,(.55,.52,.97,.86)), 'input':(7,(.65,.01,.999,.51)), 'profiles':(8,(.52,.17,.98,.70)), 'ends':(9,(.61,.18,.99,.72)), 'hyperbolic':(10,(.75,.54,.95,.71)), 'loads':(11,(.16,.45,.51,.95)), 'neuron':(13,(.08,.17,.94,.79)), 'synapses':(14,(.54,.30,.985,.86)), 'summation':(15,(.04,.14,.77,.95)), 'superposition':(16,(.56,.19,.99,.71)), 'temporal':(17,(.46,.12,.99,.94)), 'spatial':(18,(.39,.17,.98,.98)), 'distance':(19,(.46,.14,.98,.95))}
EMBEDDED={'infinite':[0],'input':[1,0],'profiles':[1],'synapses':[0],'temporal':[0],'distance':[0]}
def main():
 OUT.mkdir(parents=True,exist_ok=True);d=fitz.open(SOURCE)
 for name,(n,box) in CROPS.items():
  p=d[n-1];w,h=p.rect.width,p.rect.height;pix=p.get_pixmap(matrix=fitz.Matrix(2.5,2.5),clip=fitz.Rect(box[0]*w,box[1]*h,box[2]*w,box[3]*h),alpha=False);im=Image.frombytes('RGB',(pix.width,pix.height),pix.samples)
  if name in EMBEDDED:
   panels=[Image.open(io.BytesIO(d.extract_image(p.get_images(full=True)[i][0])['image'])).convert('RGB') for i in EMBEDDED[name]]
   if len(panels)==1:im=panels[0]
   else:
    im=Image.new('RGB',(max(a.width for a in panels),sum(a.height for a in panels)+20),'white');y=0
    for a in panels:im.paste(a,((im.width-a.width)//2,y));y+=a.height+20
  if name=='summation':
   ImageDraw.Draw(im).rectangle((int((.745-box[0])*w*2.5),int((.37-box[1])*h*2.5),im.width,int((.81-box[1])*h*2.5)),fill='white')
  im.save(OUT/f'{name}.webp',quality=90)
  (OUT/f'{name}.json').write_text(json.dumps(dict(source=str(SOURCE.relative_to(ROOT)),page=n,printedSlide=n+1,cropFractions=box,embeddedImageIndices=EMBEDDED.get(name),width=im.width,height=im.height,labels='retained; quiz off'),indent=2))
 # Exercise cross-section is source-grounded, never generated experimental data.
 src=ROOT/'source/nbe-e4120/exercises/Exercise4 Cable (3).pdf';ed=fitz.open(src);p=ed[0]
 panels=[Image.open(io.BytesIO(ed.extract_image(p.get_images(full=True)[3][0])['image'])).convert('RGB')]
 # Rendering the annulus preserves its PDF transparency mask and white labels.
 px=p.get_pixmap(matrix=fitz.Matrix(3,3),clip=fitz.Rect(402,646,530,770),alpha=False)
 panels.append(Image.frombytes('RGB',(px.width,px.height),px.samples))
 im=Image.new('RGB',(sum(a.width for a in panels)+30,max(a.height for a in panels)),'white');x=0
 for panel in panels:im.paste(panel,(x,(im.height-panel.height)//2));x+=panel.width+30
 im.save(OUT/'return.webp',quality=90)
 (OUT/'return.json').write_text(json.dumps(dict(source=str(src.relative_to(ROOT)),page=1,width=im.width,height=im.height,embeddedImageIndices=[3],annulusRasterRect=[402,646,530,770],labels='retained; quiz off'),indent=2))
 print('Regenerated 18 L04 source panels')
if __name__=='__main__':main()
