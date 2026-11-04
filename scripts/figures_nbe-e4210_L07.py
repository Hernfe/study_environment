"""Rebuild L07 slide crops. Coordinates use the 768 x 432 slide preview.

Run with PyMuPDF and Pillow installed. Printed names and leader stubs outside
the artwork are removed by cropping/painting; coloured circuit boxes keep
their original fill. No generative assets are used.
"""
from pathlib import Path
import json
import fitz
from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / 'source/nbe-e4210/slides/NBE-E4210 LECTURE 07 - 2026.pdf'
OUT = ROOT / 'src/assets/figures/nbe-e4210/L07'
# name, slide, crop in preview coordinates, masks (rectangle, colour)
RECIPES = [
 ('anatomy',5,(18,106,315,296),[]),
 ('control',8,(14,145,194,424),[]),
 ('modulators',11,(226,157,729,274),[((226,236,284,274),'white'),((321,263,373,274),'white'),((408,240,460,274),'white'),((504,251,553,274),'white'),((581,242,640,274),'white'),((680,165,729,187),'white')]),
 ('cholinergic',11,(581,300,732,428),[((581,375,618,404),'white'),((591,417,655,428),'white'),((640,400,671,417),'white'),((706,302,732,321),'white')]),
 ('hypothalamus',12,(479,200,611,341),[]),
 ('posterior',13,(28,200,195,376),[((77,289,120,310),'#f4e7d8'),((151,271,193,300),'#f3e4ce'),((162,304,193,332),'#f0e0c8'),((78,358,126,376),'#f2e6ce'),((138,361,180,376),'#f1e1c5')]),
 ('anterior',13,(403,180,545,379),[((405,251,442,265),'#e8e0d0'),((406,270,440,285),'#e8ded0'),((511,228,544,251),'#eee4d6'),((510,263,545,285),'#eee3d4'),((410,342,443,365),'#eadbc7')]),
 ('ans',14,(514,248,696,409),[((514,248,696,274),'#e4c49d'),((514,377,696,409),'#d7b2b0'),((548,333,584,365),'white')]),
 ('ans-organs',15,(3,5,339,410),[((3,5,161,14),'#1683b9'),((180,5,339,14),'#669947'),((4,354,40,376),'#d5e5ec')]),
 ('emotions',16,(55,138,590,338),[]),
 ('masking',17,(128,119,444,309),[((227,149,326,176),'white'),((227,230,330,260),'white'),((336,211,444,228),'white'),((128,295,181,309),'white')]),
 ('elicitation',19,(25,115,332,335),[((143,122,214,140),'#ccc'),((139,298,210,321),'#ccc'),((243,299,326,322),'#ccc'),((251,166,319,262),'#ccc')]),
 ('papez',22,(325,140,510,326),[((397,148,442,161),'#eed7b6'),((396,202,443,225),'#c6d9ed'),((330,248,388,274),'#c6d9ed'),((449,249,505,264),'#c6d9ed'),((393,306,449,322),'#c6d9ed'),((456,281,510,303),'white'),((471,147,510,161),'white'),((472,202,510,218),'white'),((473,307,510,324),'white')]),
 ('dimensions',27,(249,121,496,365),[((250,208,264,251),'white'),((367,352,411,365),'white')]),
 ('amygdala',30,(260,210,373,329),[]),
 ('conditioning',32,(15,118,321,280),[((15,211,321,230),'white')]),
 ('fear',34,(340,135,740,300),[((407,195,474,220),'#e9e5c8'),((435,253,474,274),'#e4e8cf'),((615,139,669,151),'#e7ecd2'),((616,176,668,200),'#e7ecd2'),((626,226,657,242),'#e7ecd2'),((408,155,467,176),'white')]),
 ('plasticity',36,(418,150,751,297),[((476,271,751,297),'white')]),
 ('aggression',37,(623,218,761,360),[((649,223,738,233),'#e8d6c1'),((651,256,733,265),'#eab8b3'),((628,311,674,323),'#d8c7e0'),((703,310,758,327),'#ead1b3')]),
]

def main():
    OUT.mkdir(parents=True, exist_ok=True)
    doc=fitz.open(SOURCE)
    for name,slide,crop,masks in RECIPES:
        box=fitz.Rect(*(v/0.8 for v in crop))
        pix=doc[slide-1].get_pixmap(matrix=fitz.Matrix(2.4,2.4),clip=box,alpha=False)
        im=Image.frombytes('RGB',(pix.width,pix.height),pix.samples)
        draw=ImageDraw.Draw(im)
        sx=im.width/(crop[2]-crop[0]); sy=im.height/(crop[3]-crop[1])
        for rect,color in masks:
            draw.rectangle(((rect[0]-crop[0])*sx,(rect[1]-crop[1])*sy,(rect[2]-crop[0])*sx,(rect[3]-crop[1])*sy),fill=color)
        im.save(OUT/f'{name}.webp',quality=88)
        (OUT/f'{name}.json').write_text(json.dumps(dict(source=str(SOURCE.relative_to(ROOT)),page=slide,crop=list(box),masks=masks,size=[im.width,im.height]),indent=2)+'\n')
        print(name,im.size)

if __name__=='__main__': main()
