"""Local-only source extraction and visual reading sheets; never copies textbooks."""
from pathlib import Path
import hashlib
import json
import fitz

ROOT = Path(__file__).resolve().parent.parent
SOURCE = ROOT / 'source/nbe-e4120'
OUT = ROOT / 'shots/nbe-e4120/audit'
OUT.mkdir(parents=True, exist_ok=True)
inventory = []
for path in sorted(SOURCE.rglob('*.pdf')):
    if 'axon' in path.name.lower():
        continue
    doc = fitz.open(path)
    pages = [page.get_text() for page in doc]
    (OUT / (path.stem + '.txt')).write_text('\n'.join(f'PDF PAGE {i+1}\n{t}' for i, t in enumerate(pages)), encoding='utf-8')
    inventory.append(dict(file=path.relative_to(ROOT).as_posix(), pages=len(doc), sha256=hashlib.sha256(path.read_bytes()).hexdigest(), headings=[next((s for s in t.splitlines() if s.strip()), '') for t in pages]))
    if path.name.startswith('Exam info'):
        doc[3].get_pixmap(matrix=fitz.Matrix(2, 2)).save(OUT / 'equation-sheet.png')
    if 'Intro_' in path.name or path.name.startswith('Exam info') or path.name.startswith('Exercise1'):
        for first in range(0, len(doc), 6):
            sheet = fitz.open()
            page = sheet.new_page(width=1200, height=1350)
            for j in range(first, min(first+6, len(doc))):
                k = j-first
                cell = fitz.Rect((k%2)*600, (k//2)*450, (k%2+1)*600, (k//2+1)*450)
                page.show_pdf_page(cell + (5, 25, -5, -5), doc, j)
                page.insert_text((cell.x0+10, cell.y0+18), f'PDF page {j+1}', fontsize=14)
            page.get_pixmap().save(OUT / f'{path.stem}-{first+1:02d}.png')
    doc.close()
(OUT / 'inventory.json').write_text(json.dumps(inventory, indent=2, ensure_ascii=False), encoding='utf-8')
print(f'Audited {len(inventory)} PDFs. Text, inventory and reading sheets: {OUT}')
