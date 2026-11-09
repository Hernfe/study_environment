"""Reproduce local L09 source panels, preserving labels and recording axes."""
from pathlib import Path
import json,io
import pymupdf as fitz
from PIL import Image
ROOT=Path(__file__).resolve().parent.parent
SOURCES={'ions':'Ephys-Lecture-9_1_2026-Ion_channels.pdf','applications':'Ephys-Lecture-9_2-2026_Channelopathy_v2.pdf'}
# Fractions selected after visual page inspection. Text-only taxonomy is retained as source reference.
BOXES={'ions':{2:(.52,.48,.96,.94),3:(.55,.34,.98,.94),4:(.76,.06,.94,.91),5:(.05,.52,.30,.92),6:(.75,.14,.98,.94),7:(.61,.06,.98,.94),8:(.05,.57,.5,.89),9:(.06,.17,.47,.74),10:(.06,.26,.60,.98),11:(.62,.21,.98,.91),12:(.31,.12,.98,.96),13:(.24,.12,.98,.94),14:(.03,.13,.98,.95),15:(.51,.33,.98,.93),16:(.65,.18,.97,.93),17:(.05,.20,.55,.79),18:(.06,.42,.63,.94),19:(.57,.49,.98,.93),20:(.64,.10,.97,.92),21:(.08,.17,.96,.55),22:(.49,.40,.99,.76)},'applications':{2:(.62,.28,.98,.76),3:(.57,.04,.98,.99),4:(.73,.15,.98,.91),5:(.61,.05,.98,.92),6:(.64,.26,.98,.80),7:(.67,.09,.98,.96),8:(.52,.24,.98,.73),9:(.49,.15,.98,.95),10:(.55,.42,.98,.93),11:(.035,.63,.70,.96),12:(.02,.66,.70,.96),13:(.11,.50,.99,.88)}}
# Exact embedded panels avoid clipping labels at crop boundaries. P5 uses the complete source panel D.
EMBED={'ions-02':1,'ions-03':1,'ions-05':1,'ions-08':4,'ions-09':2,'ions-10':3,'ions-11':1,'ions-12':1,'ions-17':1,'ions-18':2,'ions-20':1,'ions-21':1,'ions-22':4,'applications-02':1,'applications-03':1,'applications-05':1,'applications-06':1,'applications-07':1,'applications-08':1,'applications-09':1,'applications-10':1,'applications-11':2,'applications-12':1}
BOXES['ions'].update({4:(.72,0,.95,.90),6:(.71,.10,.995,.99),7:(.60,.56,.96,.94),13:(.26,.16,.97,.94),15:(.51,.20,.995,.97),16:(.56,.15,.995,.97),19:(.525,.50,.99,.95)})
EMBED.pop('applications-07') # PDF vector labels over an image mask must be rendered together.
BOXES['applications'].update({7:(.655,.15,.94,.845),4:(.63,.17,.995,.92),13:(.145,.555,.99,.91)})
def main():
 out=ROOT/'src/assets/figures/nbe-e4120/L09';out.mkdir(parents=True,exist_ok=True)
 for tag,boxes in BOXES.items():
  source=Path('source/nbe-e4120/lectures')/SOURCES[tag];d=fitz.open(ROOT/source)
  for page,b in boxes.items():
   p=d[page-1];w,h=p.rect.width,p.rect.height;pix=p.get_pixmap(matrix=fitz.Matrix(2.5,2.5),clip=fitz.Rect(b[0]*w,b[1]*h,b[2]*w,b[3]*h),alpha=False)
   im=Image.frombytes('RGB',(pix.width,pix.height),pix.samples);name=f'{tag}-{page:02}'
   if name in EMBED:
    entry=p.get_images(full=True)[EMBED[name]-1];pix=fitz.Pixmap(d,entry[0])
    if entry[1] and not pix.alpha:pix=fitz.Pixmap(pix,fitz.Pixmap(d,entry[1]))
    rgba=Image.open(io.BytesIO(pix.tobytes('png'))).convert('RGBA');im=Image.new('RGB',rgba.size,'white');im.paste(rgba,mask=rgba.getchannel('A'))
   if name=='applications-04':
    panels=[]
    for rect in [(606.4,332.4,945.5,491.8),(735.8,95.1,950.2,315.9)]:
     pix=p.get_pixmap(matrix=fitz.Matrix(2,2),clip=fitz.Rect(rect),alpha=False);panels.append(Image.open(io.BytesIO(pix.tobytes('png'))).convert('RGB'))
    top,bottom=panels[1],panels[0];top=top.resize((bottom.width,round(top.height*bottom.width/top.width)));im=Image.new('RGB',(bottom.width,top.height+bottom.height+12),'white');im.paste(top,(0,0));im.paste(bottom,(0,top.height+12))
   if name=='ions-05':im=im.crop((785,25,1043,417))
   im.save(out/(name+'.webp'),quality=88)
   (out/(name+'.json')).write_text(json.dumps(dict(source=str(source),page=page,cropFractions=None if name in EMBED or name=='applications-04' else b,embeddedImage=EMBED.get(name),embeddedCrop=[785,25,1043,417] if name=='ions-05' else None,composedRenderedRects=[[735.8,95.1,950.2,315.9],[606.4,332.4,945.5,491.8]] if name=='applications-04' else None,alphaComposite='white',width=im.width,height=im.height,labels='Original source labels retained; quiz disabled.'),indent=2))
 print('Rebuilt 33 slide panels with source JSON.')
if __name__=='__main__':main()
