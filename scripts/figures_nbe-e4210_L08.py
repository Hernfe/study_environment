"""Reproduce L08 quiz crops from the private slide deck, no generated artwork.

Coordinates are in the 768 x 432 preview. Masks remove answer text; diagram
lines, traces and original colours are retained. Run with PyMuPDF and Pillow.
"""
from pathlib import Path
import json
import fitz
from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / 'source/nbe-e4210/slides/NBE-E4210 LECTURE 08 - 2026.pdf'
OUT = ROOT / 'src/assets/figures/nbe-e4210/L08'
# name, slide, preview crop, white text masks
RECIPES = [
 ('modulators',4,(202,137,743,429),[(205,140,300,153),(207,247,265,290),(417,140,475,154),(415,270,475,282),(586,140,651,155),(697,164,743,184),(584,246,649,269),(581,286,669,298),(578,376,630,429),(636,408,693,429)]),
 ('noradrenergic',5,(146,163,390,342),[(146,163,244,178),(147,285,220,329)]),
 ('methods',11,(48,215,720,423),[(194,222,390,261),(416,220,612,261)]),
 ('bold',12,(17,179,222,344),[(119,179,156,192),(184,238,222,252),(100,179,151,193),(197,246,222,264)]),
 ('currents',13,(253,125,535,423),[(356,222,388,235),(401,222,427,235)]),
 ('discovery',17,(243,124,518,419),[]),
 ('dmn-functions',18,(56,207,332,312),[]),
 ('subsystems',24,(0,118,154,309),[]),
 ('yeo',25,(65,82,318,420),[]),
 ('power',28,(35,137,746,393),[]),
 ('search',33,(315,140,627,378),[(315,365,627,378)]),
 ('posner',34,(16,5,321,428),[(66,5,204,31),(104,147,161,171),(40,300,117,324),(192,301,271,324)]),
 ('behaviour',36,(298,132,714,264),[(344,230,467,246),(584,230,714,246)]),
 ('spotlight',37,(0,0,248,421),[(85,28,130,56)]),
 ('v4',38,(18,98,474,355),[(20,207,243,220),(18,340,263,355)]),
 ('frontoparietal',39,(7,6,322,425),[(51,6,167,24),(78,25,104,40),(224,6,250,21),(258,24,282,39),(7,75,49,109),(281,84,322,101),(211,184,302,214),(49,220,159,237),(80,240,104,253),(223,222,251,239),(258,240,283,253),(7,290,51,321),(282,299,322,318),(210,402,311,425)]),
 ('executive',42,(15,12,401,426),[]),
 ('pfc',45,(394,109,753,370),[(512,187,551,217),(445,235,487,265),(490,212,530,233)]),
]

def main():
    OUT.mkdir(parents=True, exist_ok=True)
    doc = fitz.open(SOURCE)
    for name, slide, crop, masks in RECIPES:
        box = fitz.Rect(*(v / .8 for v in crop))
        pix = doc[slide-1].get_pixmap(matrix=fitz.Matrix(2,2), clip=box, alpha=False)
        im = Image.frombytes('RGB', (pix.width,pix.height),pix.samples)
        draw = ImageDraw.Draw(im)
        sx,sy = im.width/(crop[2]-crop[0]),im.height/(crop[3]-crop[1])
        for a,b,c,d in masks:
            draw.rectangle(((a-crop[0])*sx,(b-crop[1])*sy,(c-crop[0])*sx,(d-crop[1])*sy),fill='white')
        if name == 'executive':
            # Clip text masks to each original coloured wedge, preserving its
            # silhouette and the icons above the wording.
            sectors = [
                ([(81,115),(194,69),(194,175),(154,187)],(92,106,192,161),(140,95)),
                ([(211,69),(326,114),(253,184),(211,173)],(213,104,316,160),(251,92)),
                ([(21,242),(35,180),(64,130),(139,200),(121,242)],(28,182,125,225),(61,171)),
                ([(268,197),(330,130),(384,242),(283,242)],(277,181,378,234),(325,169)),
                ([(22,260),(120,260),(139,304),(65,374),(21,290)],(32,288,125,326),(63,279)),
                ([(285,259),(384,259),(370,317),(332,374),(267,306)],(286,287,364,338),(324,277)),
                ([(81,359),(154,313),(194,326),(194,425),(143,425)],(95,351,193,411),(140,342)),
                ([(211,325),(253,313),(326,359),(293,404),(211,425)],(213,349,310,402),(251,342)),
            ]
            for polygon, rect, sample in sectors:
                shape=Image.new('L',im.size); sd=ImageDraw.Draw(shape)
                sd.polygon([((x-crop[0])*sx,(y-crop[1])*sy) for x,y in polygon],fill=255)
                a,b,c,d=rect
                boxmask=Image.new('L',im.size);ImageDraw.Draw(boxmask).rectangle(((a-crop[0])*sx,(b-crop[1])*sy,(c-crop[0])*sx,(d-crop[1])*sy),fill=255)
                from PIL import ImageChops
                mask=ImageChops.multiply(shape,boxmask)
                color=im.getpixel((int((sample[0]-crop[0])*sx),int((sample[1]-crop[1])*sy)))
                im.paste(color,(0,0,im.width,im.height),mask)
        im.save(OUT/f'{name}.webp',quality=86)
        (OUT/f'{name}.json').write_text(json.dumps(dict(source=str(SOURCE.relative_to(ROOT)),page=slide,crop=list(box),masks=masks,size=list(im.size)),indent=2)+'\n')
        print(name,im.size)

if __name__ == '__main__':
    main()
