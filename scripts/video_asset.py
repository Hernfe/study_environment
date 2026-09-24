#!/usr/bin/env python3
"""Lecture videos: pull clips out of a PPTX and prepare them for the site.

The slide PDFs render an embedded video as a black box
(`extract_figures.py videos` finds them). Once the student supplies the
original PPTX or the clip itself:

  pptx    List every video and audio file in a PPTX with the slide(s)
          that use it, and copy them to assets/incoming/videos/<deck>/
          (ignored by git) as slideNN-<name>.<ext>.

  add     Put one clip on the site: copy it to
          src/assets/videos/<lecture>/<name>.mp4 (transcoded to H.264 MP4
          with ffmpeg when it is not already MP4 or WebM, or when
          --transcode is given) and save a poster frame as
          src/assets/figures/<lecture>/<name>-poster.webp (under 200 KB).
          Prints the `video` block to paste into the content file.

Examples:
  python scripts/video_asset.py pptx "source/slides/NBE-E4210 LECTURE 04 - 2026.pptx"
  python scripts/video_asset.py add assets/incoming/videos/lecture-04/slide34-media1.mp4 \\
      --lecture L04 --name v1-neurons --at 2.5

Needs opencv-python-headless for the poster frame. ffmpeg (on PATH) only
for transcoding. Keep clips short and small: aim for under 10 MB each.
Record every clip and poster in CREDITS.md.
"""

import argparse
import io
import posixpath
import re
import shutil
import subprocess
import sys
import zipfile
from pathlib import Path
from xml.etree import ElementTree

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
INCOMING = ROOT / "assets" / "incoming" / "videos"
VIDEO_OUT = ROOT / "src" / "assets" / "videos"
FIG_OUT = ROOT / "src" / "assets" / "figures"
MAX_POSTER = 200 * 1024
MEDIA = {".mp4", ".m4v", ".mov", ".wmv", ".avi", ".webm", ".mkv", ".mpg", ".mpeg", ".mp3", ".wav", ".m4a", ".wma"}
REL_NS = "{http://schemas.openxmlformats.org/package/2006/relationships}"


def slug(text):
    return re.sub(r"[^a-z0-9-]+", "-", text.lower()).strip("-")


def pptx_media(path):
    """{media path in zip: sorted slide numbers that reference it}."""
    uses = {}
    with zipfile.ZipFile(path) as z:
        for name in z.namelist():
            m = re.fullmatch(r"ppt/slides/_rels/slide(\d+)\.xml\.rels", name)
            if not m:
                continue
            slide = int(m.group(1))
            tree = ElementTree.fromstring(z.read(name))
            for rel in tree.iter(f"{REL_NS}Relationship"):
                if rel.get("TargetMode") == "External":
                    continue
                target = posixpath.normpath(posixpath.join("ppt/slides", rel.get("Target", "")))
                if Path(target).suffix.lower() in MEDIA:
                    uses.setdefault(target, set()).add(slide)
    return {k: sorted(v) for k, v in sorted(uses.items())}


def cmd_pptx(args):
    src = Path(args.pptx).resolve()
    uses = pptx_media(src)
    if not uses:
        print(f"{src.name}: no embedded video or audio")
        return
    out = Path(args.out) if args.out else INCOMING / slug(src.stem)
    out.mkdir(parents=True, exist_ok=True)
    with zipfile.ZipFile(src) as z:
        for member, slides in uses.items():
            stem = Path(member).stem
            dest = out / f"slide{slides[0]:02d}-{stem}{Path(member).suffix.lower()}"
            with z.open(member) as fin, open(dest, "wb") as fout:
                shutil.copyfileobj(fin, fout)
            size = dest.stat().st_size / 1e6
            print(f"slides {', '.join(map(str, slides)):<8} {member}  ->  {dest.relative_to(ROOT) if dest.is_relative_to(ROOT) else dest}  ({size:.1f} MB)")


def poster_frame(video, at):
    try:
        import cv2
    except ImportError:
        sys.exit("poster frame needs OpenCV: python -m pip install opencv-python-headless")
    cap = cv2.VideoCapture(str(video))
    if not cap.isOpened():
        sys.exit(f"OpenCV cannot open {video}; transcode it first (--transcode)")
    fps = cap.get(cv2.CAP_PROP_FPS) or 25
    frames = cap.get(cv2.CAP_PROP_FRAME_COUNT) or 0
    duration = frames / fps if frames else 0
    cap.set(cv2.CAP_PROP_POS_MSEC, max(0.0, at) * 1000)
    ok, frame = cap.read()
    width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    cap.release()
    if not ok:
        sys.exit(f"could not read a frame at {at} s (clip is {duration:.1f} s)")
    image = Image.fromarray(cv2.cvtColor(frame, cv2.COLOR_BGR2RGB))
    return image, width, height, duration


def encode_webp(image):
    scale = 1.0
    while True:
        work = image if scale == 1.0 else image.resize((int(image.width * scale), int(image.height * scale)), Image.LANCZOS)
        for quality in (85, 80, 75, 70, 60):
            buf = io.BytesIO()
            work.save(buf, "WEBP", quality=quality, method=6)
            if buf.tell() <= MAX_POSTER:
                return buf.getvalue()
        scale *= 0.85


def cmd_add(args):
    src = Path(args.video).resolve()
    if not src.exists():
        sys.exit(f"not found: {src}")
    name = slug(args.name)
    vdir = VIDEO_OUT / args.lecture
    vdir.mkdir(parents=True, exist_ok=True)
    ext = src.suffix.lower()
    if args.transcode or ext not in (".mp4", ".webm"):
        if not shutil.which("ffmpeg"):
            sys.exit(f"{ext} needs transcoding to MP4 and ffmpeg is not on PATH (winget install ffmpeg)")
        dest = vdir / f"{name}.mp4"
        subprocess.run([
            "ffmpeg", "-y", "-loglevel", "error", "-i", str(src),
            "-c:v", "libx264", "-preset", "slow", "-crf", str(args.crf), "-pix_fmt", "yuv420p",
            "-vf", f"scale='min({args.max_width},iw)':-2", "-movflags", "+faststart",
            *(["-an"] if args.mute else ["-c:a", "aac", "-b:a", "96k"]),
            str(dest),
        ], check=True)
    else:
        dest = vdir / f"{name}{ext}"
        shutil.copyfile(src, dest)

    image, width, height, duration = poster_frame(dest, args.at)
    fdir = FIG_OUT / args.lecture
    fdir.mkdir(parents=True, exist_ok=True)
    poster = fdir / f"{name}-poster.webp"
    poster.write_bytes(encode_webp(image))

    size = dest.stat().st_size / 1e6
    print(f"video  {dest.relative_to(ROOT)}  ({size:.1f} MB, {width}x{height}, {duration:.1f} s)")
    print(f"poster {poster.relative_to(ROOT)}  ({poster.stat().st_size // 1024} KB, frame at {args.at} s)")
    if size > 10:
        print("warning: over 10 MB; consider --transcode with a higher --crf or a smaller --max-width")
    print("\nContent block (fill caption and fallbackAlt; add a question with the same video):")
    print(f"""const {re.sub(r'-(.)', lambda m: m.group(1).upper(), name)}Clip = {{
  src: new URL('../assets/videos/{args.lecture}/{dest.name}', import.meta.url).href,
  poster: new URL('../assets/figures/{args.lecture}/{poster.name}', import.meta.url).href,
  width: {width},
  height: {height},
  caption: '',
  fallbackAlt: '',
}};
{{ type: 'video', video: {re.sub(r'-(.)', lambda m: m.group(1).upper(), name)}Clip }}""")


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = ap.add_subparsers(dest="command", required=True)
    pp = sub.add_parser("pptx", help="list and extract media from a PPTX")
    pp.add_argument("pptx")
    pp.add_argument("--out", help="output folder (default assets/incoming/videos/<deck>)")
    ad = sub.add_parser("add", help="copy or transcode a clip into the site and make its poster")
    ad.add_argument("video")
    ad.add_argument("--lecture", required=True)
    ad.add_argument("--name", required=True)
    ad.add_argument("--at", type=float, default=1.0, help="poster frame time in seconds (default 1)")
    ad.add_argument("--transcode", action="store_true", help="always transcode to H.264 MP4")
    ad.add_argument("--crf", type=int, default=26)
    ad.add_argument("--max-width", type=int, default=1280)
    ad.add_argument("--mute", action="store_true", help="drop the audio track")
    args = ap.parse_args()
    {"pptx": cmd_pptx, "add": cmd_add}[args.command](args)


if __name__ == "__main__":
    main()
