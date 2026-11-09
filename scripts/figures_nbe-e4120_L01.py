"""Reproduce source slide crops. Retain printed labels and axes; no fabricated data."""
from pathlib import Path
import json
import pymupdf as fitz
ROOT=Path(__file__).resolve().parent.parent
SOURCE=ROOT/'source/nbe-e4120/lectures/Ephys-Lecture-1-2026_Intro_4-9-26 (3).pdf'
OUT=ROOT/'src/assets/figures/nbe-e4120/L01'
OUT.mkdir(parents=True,exist_ok=True)
# Fractions exclude decoration and unrelated slide prose where practical.
CROPS={'neurons':(8,(.62,.04,.99,.81)), 'applications':(10,(.065,.18,.92,.96)),
'signals':(13,(.50,.17,.95,.93)), 'recordings':(14,(.64,.12,.96,.94)),
'apparatus':(15,(.43,.22,.89,.93)), 'patch':(17,(.32,.20,.97,.95)),
'membrane':(18,(.46,.52,.64,.88)), 'current':(19,(.12,.43,.80,.86)),
'resistors':(20,(.64,.35,.94,.79)), 'ohm':(21,(.47,.54,.90,.85)),
'divider':(22,(.03,.20,.25,.73)), 'capacitor':(23,(.25,.17,.50,.43)),
'rc':(24,(.01,.16,.34,.98)), 'filters':(25,(.02,.25,.56,.96)),
'lowpass':(26,(.61,.17,.985,.475)), 'circuits':(27,(.02,.23,.94,.94)),
'diffusion':(29,(.04,.70,.37,.94)), 'nernst':(30,(.51,.19,.76,.90)),
'ions':(32,(.07,.23,.61,.96)), 'transport':(35,(.55,.47,.98,.93)),
'neutrality':(36,(.325,.295,.572,.433)), 'donnan':(38,(.045,.175,.665,.48))}
def main():
 from PIL import Image
 doc=fitz.open(SOURCE)
 for name,(number,frac) in CROPS.items():
  page=doc[number-1]; w,h=page.rect.width,page.rect.height
  rect=fitz.Rect(frac[0]*w,frac[1]*h,frac[2]*w,frac[3]*h)
  pix=page.get_pixmap(matrix=fitz.Matrix(2.5,2.5),clip=rect,alpha=False)
  im=Image.frombytes('RGB',(pix.width,pix.height),pix.samples)
  if name == 'rc':
   # Compose the complete circuit, source current recording, and voltage-step response.
   panels=[]
   for coords in [(25,90,190,310),(178,294,320,440),(20,425,190,530)]:
    part=page.get_pixmap(matrix=fitz.Matrix(2.5,2.5),clip=fitz.Rect(coords),alpha=False)
    panels.append(Image.frombytes('RGB',(part.width,part.height),part.samples))
   im=Image.new('RGB',(sum(i.width for i in panels)+80,max(i.height for i in panels)), 'white')
   offset=0
   for panel in panels:
    im.paste(panel,(offset,0));offset+=panel.width+40
  im.save(OUT/f'{name}.webp',quality=88)
  (OUT/f'{name}.json').write_text(json.dumps({'source':str(SOURCE.relative_to(ROOT)),'page':number,'cropFractions':frac,'width':im.width,'height':im.height,'panelsPoints':[(25,90,190,310),(178,294,320,440),(20,425,190,530)] if name=='rc' else None,'labels':'retained; quiz off'},indent=2))
 print(f'Regenerated {len(CROPS)} slide crops: {OUT}')
if __name__=='__main__': main()
