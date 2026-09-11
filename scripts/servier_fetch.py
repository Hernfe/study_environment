#!/usr/bin/env python3
"""Download Servier Medical Art (smart.servier.com) PNGs and PPTX kits.

SMART is CC BY 4.0. The site offers one full-size PNG per illustration
(wp-content/uploads/...) and one PPTX per image set; the PPTX holds the
editable vector shapes. There is no SVG download on the site. Bioicons
carries SVG conversions of many Servier images under cc-by-3.0.

The manifest below lists the nervous-system items relevant to NBE-E4210:
slug -> (detail page under /smart_image/, full PNG URL, English title).
Rerun any time; existing files are skipped.

Usage:
    python scripts/servier_fetch.py                  # PNGs + PPTX kits
    python scripts/servier_fetch.py --no-pptx
"""

import argparse
import json
import sys
import urllib.request
from pathlib import Path

BASE = "https://smart.servier.com"
UP = BASE + "/wp-content/uploads/2016/10/"
UA = {"User-Agent": "Mozilla/5.0 (study-site asset fetch)"}

MANIFEST = {
    # Brain category
    "brain-area": ("brain-area", UP + "cerveau_zones2.png", "Brain, lateral view with functional areas"),
    "whole-brain": ("whole-brain", UP + "cerveau_zones.png", "Brain, lateral view with areas"),
    "brain-tronc": ("smart-brain", UP + "cerveau_tronc.png", "Brain with brainstem"),
    "brain-beau": ("smart-brain", UP + "Cerveau_beau.png", "Brain, lateral view"),
    "brain-sagittal": ("brain-sagittal", UP + "cerveau_06.png", "Brain, sagittal (medial) view"),
    "brain-05": ("brain-overview", UP + "cerveau_05.png", "Brain overview"),
    "brain-04": ("regular-brain-overview", UP + "cerveau_04.png", "Brain overview"),
    "brain-02": ("brain-overview-smart", UP + "Cerveau_02.png", "Brain overview"),
    "brain-01": ("brain", UP + "Cerveau_01.png", "Brain"),
    "brain-03": ("regular-overview-brain", UP + "cerveau_03.png", "Brain overview"),
    "hippocampus": ("hippocampus", UP + "hypocampe.png", "Brain, hippocampus"),
    "brain-section-09": ("smart-section-brain", UP + "cerveau_09.png", "Brain section"),
    "brain-coronal": ("brain-coronal", UP + "cerveau_08.png", "Brain, coronal section"),
    "brain-sagittal-overview": ("brain-sagittal-overview", UP + "cerveau_07.png", "Brain, sagittal section"),
    "brain-sections": ("smart-brain-sections", UP + "Coupe_cerveau_01.png", "Brain sections"),
    "brainstem": ("brainstem", UP + "cerveau_10.png", "Brainstem"),
    "cerebellum-1": ("brain-17", UP + "Cervelet1.png", "Cerebellum"),
    "cerebellum-2": ("brain-18", UP + "Cervelet2.png", "Cerebellum"),
    "cerebrospinal-fluid": ("cerebrospinal-fluid", UP + "Fluide_cerebrospinal.png", "Cerebrospinal fluid"),
    "brain-functional-areas": ("brain-section", UP + "Cerveau_zones_fonctionnelles.png", "Brain functional areas"),
    "meninges": ("meninges", UP + "Meninges.png", "Meninges"),
    "nervous-system": ("nervous-system", UP + "Systeme_nerveux.png", "Nervous system"),
    "nervous-system-2": ("smart-nervous-system-ov", UP + "Systeme_nerveux2.png", "Nervous system"),
    # Neural cells
    "astrocyte-01": ("astrocyte", UP + "Astrocyte01.png", "Astrocyte"),
    "astrocyte-02": ("astrocyte-cell", UP + "Astrocyte02.png", "Astrocyte"),
    "astrocyte-03": ("astrocyte-cell-overview", UP + "Astrocyte03.png", "Astrocyte"),
    "astrocyte-04": ("cell-astrocyte-overview", UP + "Astrocyte04.png", "Astrocyte"),
    "oligodendrocyte-01": ("oligodendrocyte-ov", UP + "Oligodendrocyte01.png", "Oligodendrocyte"),
    "oligodendrocyte-02": ("oligodendrocyte-purple", UP + "Oligodendrocyte02.png", "Oligodendrocyte"),
    "oligodendrocyte-03": ("purple-oligodendrocyte", UP + "Oligodendrocyte03.png", "Oligodendrocyte"),
    "oligodendrocyte-04": ("oligodendrocyte-overview", UP + "Oligodendrocyte04.png", "Oligodendrocyte"),
    "oligodendrocyte-05": ("oligodendrocyte-cell", UP + "Oligodendrocyte05.png", "Oligodendrocyte"),
    "oligodendrocyte-1": ("smart-oligodendrocyte", UP + "Oligodendrocyte1.png", "Oligodendrocyte"),
    "ependymal-01": ("ependymal-cell", UP + "Cell_ependymaire01.png", "Ependymal cell"),
    "ependymal-02": ("ependymal-cell-ov", UP + "Cell_ependymaire02.png", "Ependymal cell"),
    "microglia-01": ("microglia", UP + "Microglie01.png", "Microglia"),
    "microglia-02": ("microglia-overview", UP + "Microglie02.png", "Microglia"),
    "microglia-03": ("smart-microglia", UP + "Microglie03.png", "Microglia"),
    "neuron-01": ("neuron", UP + "neurone01.png", "Neuron"),
    "neuron-02": ("smart-neuron", UP + "neurone02.png", "Neuron"),
    "neuron-03": ("smart-neuron-ov", UP + "neurone03.png", "Neuron"),
    "neuron-04": ("neuron-view", UP + "neurone04.png", "Neuron"),
    "neuron-05": ("smart-neuron-overview", UP + "neurone05.png", "Neuron"),
    "neuron-012": ("neuron-ov", UP + "Neurone012.png", "Neuron"),
    "neuron-u01": ("smart-neuron-view", UP + "neurone_01.png", "Neuron"),
    "neuron-u02": ("neuron-smart-overview", UP + "neurone_02.png", "Neuron"),
    "neuron-u03": ("neuron-smart", UP + "neurone_03.png", "Neuron"),
    "neuron-u04": ("green-neuron", UP + "neurone_04.png", "Neuron"),
    "neuron-u05": ("neuron-green", UP + "neurone_05.png", "Neuron"),
    "neuron-u06": ("neuron-green-ov", UP + "neurone_06.png", "Neuron"),
    "neuron-u07": ("green-smart-neuron", UP + "neurone_07.png", "Neuron"),
    "neuron-u08": ("neuron-cell", UP + "neurone_08.png", "Neuron"),
    "spinal-cord-c5": ("spinal-cord", UP + "moelle_C5.png", "Spinal cord, C5"),
    "spinal-cord": ("spinal-cord-ov", UP + "Moelle_epiniere.png", "Spinal cord"),
    "spinal-cord-t8": ("smart-spinal-cord-view", UP + "moelle_T8.png", "Spinal cord, T8"),
    # Synapses
    "synapse-01": ("synapse-ov", UP + "synapse_01.png", "Synapse"),
    "synapse-02": ("synapse-view", UP + "synapse_02.png", "Synapse"),
    "synapse-03": ("synapse-overview", UP + "synapse_03.png", "Synapse"),
    "synapse-04": ("smart-synapse", UP + "synapse_04.png", "Synapse"),
    "synapse-05": ("smart-synapse-ov", UP + "synapse_05.png", "Synapse"),
    "synapse-06": ("smart-synapse-view", UP + "synapse_06.png", "Synapse"),
    "synapse-vesicles-1": ("synapse", UP + "syn_bomb_vacu_1.png", "Synapse with vesicles"),
    "synapse-vesicles-2": ("synapse-yellow-blue", UP + "syn_bomb_vacu_2.png", "Synapse with vesicles"),
    "synapse-vesicles-3": ("synapse-red-orange", UP + "syn_bomb_vacu_3.png", "Synapse with vesicles"),
    "synapse-bombee-1": ("synapse-smart-overview", UP + "synapse_bombee_1.png", "Synapse"),
    "synapse-bombee-2": ("smart-overview-synapse", UP + "synapse_bombee_2.png", "Synapse"),
    "synapse-bombee-3": ("synapse-red-green", UP + "synapse_bombee_3.png", "Synapse"),
    "neuromuscular-synapse": ("neuromuscular-synapse", UP + "synapse_07.png", "Neuromuscular synapse"),
    "neuromuscular-synapse-sagittal": ("neuromuscular-synapse-sagittal", UP + "synapse_08.png", "Neuromuscular synapse, sagittal"),
    "neurotransmitter-01": ("neuromediator", UP + "neuromed_01.png", "Neurotransmitter"),
    "neurotransmitter-02": ("smart-neuromediator", UP + "neuromed_02.png", "Neurotransmitter"),
    # Other nervous system
    "nerve": ("nerve", UP + "Nerf.png", "Nerve"),
}

PPTX = {
    "SMART-Nervous-system.pptx": UP + "SMART-Nervous-system.pptx",
    "SMART-Neural-cells.pptx": UP + "SMART-Neural-cells.pptx",
    "SMART-Synapses.pptx": UP + "SMART-Synapses.pptx",
}


def fetch(url):
    req = urllib.request.Request(url, headers=UA)
    with urllib.request.urlopen(req, timeout=120) as r:
        return r.read()


def save(url, path):
    if path.exists():
        return True
    try:
        data = fetch(url)
    except Exception as e:  # noqa: BLE001
        print(f"FAILED {url}: {e}", file=sys.stderr)
        return False
    path.write_bytes(data)
    print(f"saved {path} ({len(data) // 1024} KB)")
    return True


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--out", default="assets/incoming/servier")
    ap.add_argument("--no-pptx", action="store_true")
    args = ap.parse_args()
    out = Path(args.out)
    out.mkdir(parents=True, exist_ok=True)
    index = {}
    for slug, (page, url, title) in MANIFEST.items():
        path = out / f"servier-{slug}.png"
        if save(url, path):
            index[path.name] = {
                "title": title,
                "page": f"{BASE}/smart_image/{page}/",
                "url": url,
                "license": "CC BY 4.0",
                "license_url": "https://creativecommons.org/licenses/by/4.0/",
                "attribution": "Servier Medical Art, https://smart.servier.com",
            }
    if not args.no_pptx:
        for name, url in PPTX.items():
            save(url, out / name)
    (out / "servier-index.json").write_text(json.dumps(index, indent=1), encoding="utf-8")


if __name__ == "__main__":
    main()
