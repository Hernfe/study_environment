"""Reproduce lecture 3 figures from slide panels, retaining axes and labels."""
from pathlib import Path
import json, io
import pymupdf as fitz
from PIL import Image, ImageDraw
ROOT=Path(__file__).resolve().parent.parent
SOURCE=ROOT/'source/nbe-e4120/lectures/Ephys-Lectures-3_2026_Cable (1).pdf'
OUT=ROOT/'src/assets/figures/nbe-e4120/L03'
CROPS={'functions':(2,(.63,.12,.98,.96)), 'responses':(3,(.36,.22,.98,.81)), 'analogy':(4,(.105,.60,.57,.865)), 'filter':(6,(.77,.12,1,.73)), 'cylinders':(7,(.035,.31,.61,.97)), 'sphere':(8,(.52,.13,.995,.52)), 'distributed':(9,(.54,.19,.98,.80)), 'assumptions':(10,(.42,.62,.97,.94)), 'compartments':(11,(.46,.19,.97,.82)), 'geometry':(12,(.51,.39,.98,.66)), 'conservation':(13,(.63,.19,.999,.49)), 'equation':(14,(.72,.018,.994,.39)), 'pulse':(15,(.55,.14,.972,.76)), 'decay':(16,(.50,.19,.97,.715)), 'scaling':(17,(.59,.035,.975,.95)), 'distance':(18,(.54,.49,.97,.91)), 'time':(19,(.04,.20,.45,.75)), 'myelin':(20,(.59,.24,.98,.77)), 'boundaries':(21,(.75,.10,.99,.51)), 'normalization':(22,(.62,.22,.98,.51))}
# Prefer clean original embedded panels where slide text overlaps their bounds.
EMBEDDED={'functions':[0],'responses':[0],'analogy':[6],'cylinders':[3],'sphere':[0],'distributed':[1,0],'assumptions':[0],'compartments':[0],'geometry':[0],'conservation':[0],'equation':[1],'pulse':[0],'decay':[0],'scaling':[0],'distance':[0],'time':[0],'myelin':[0],'normalization':[1]}
def main():
 OUT.mkdir(parents=True,exist_ok=True);doc=fitz.open(SOURCE)
 for name,(n,box) in CROPS.items():
  p=doc[n-1];w,h=p.rect.width,p.rect.height
  px=p.get_pixmap(matrix=fitz.Matrix(3,3),clip=fitz.Rect(box[0]*w,box[1]*h,box[2]*w,box[3]*h),alpha=False)
  im=Image.frombytes('RGB',(px.width,px.height),px.samples)
  if name in EMBEDDED:
   panels=[Image.open(io.BytesIO(doc.extract_image(p.get_images(full=True)[i][0])['image'])).convert('RGB') for i in EMBEDDED[name]]
   if len(panels)==1: im=panels[0]
   else:
    im=Image.new('RGB',(max(q.width for q in panels),sum(q.height for q in panels)+20),'white');y=0
    for panel in panels:im.paste(panel,((im.width-panel.width)//2,y));y+=panel.height+20
  if name=='filter':
   # Remove fragments of surrounding slide prose/brackets, outside both plots.
   draw=ImageDraw.Draw(im);draw.rectangle((0,330,35,480),fill='white')
  im.save(OUT/f'{name}.webp',quality=88)
  (OUT/f'{name}.json').write_text(json.dumps(dict(source=str(SOURCE.relative_to(ROOT)),page=n,cropFractions=box,width=im.width,height=im.height,labels='retained; quiz off',embeddedImageIndices=EMBEDDED.get(name)),indent=2))
 print(f'Regenerated {len(CROPS)} source figures')
if __name__=='__main__':main()
