"""Вырезает фон у фруктов, созданных в Gemini.

fruits/raw/week-NN.png -> fruits/week-NN.webp (прозрачный фон, до 512 px).

Фон заливается от краёв картинки; белая обводка-стикер его останавливает.
Запуск: python tools/remove_bg.py  (нужен Pillow). Уже обработанные файлы пропускаются.
"""
from pathlib import Path

from PIL import Image, ImageChops, ImageDraw, ImageFilter

ROOT = Path(__file__).resolve().parent.parent
RAW = ROOT / "fruits" / "raw"
OUT = ROOT / "fruits"
SIZE = 512
THRESH = 30  # допуск по цвету фона; белая обводка дальше (~58)
MARK = (255, 0, 255)


def cut(src: Path, dst: Path) -> None:
    img = Image.open(src).convert("RGB")
    w, h = img.size
    flood = img.copy()
    for seed in [(0, 0), (w - 1, 0), (0, h - 1), (w - 1, h - 1), (w // 2, 0), (w // 2, h - 1), (0, h // 2), (w - 1, h // 2)]:
        if flood.getpixel(seed) != MARK:
            ImageDraw.floodfill(flood, seed, MARK, thresh=THRESH)

    r, g, b = flood.split()
    is_bg = ImageChops.multiply(ImageChops.multiply(r.point(lambda v: 255 if v == 255 else 0), g.point(lambda v: 255 if v == 0 else 0)), b.point(lambda v: 255 if v == 255 else 0))
    # фон -> 0, фрукт -> 255, чуть смягчаем край
    alpha = is_bg.point(lambda v: 255 - v).filter(ImageFilter.GaussianBlur(1.2))
    alpha = alpha.point(lambda v: 0 if v < 40 else 255 if v > 215 else v)

    out = img.convert("RGBA")
    out.putalpha(alpha)
    out = out.crop(out.getbbox())
    side = max(out.size)
    canvas = Image.new("RGBA", (side, side), (0, 0, 0, 0))
    canvas.paste(out, ((side - out.width) // 2, (side - out.height) // 2))
    canvas = canvas.resize((SIZE, SIZE), Image.LANCZOS)
    canvas.save(dst, "WEBP", quality=90, method=6)
    print(f"{src.name} -> {dst.name}")


if __name__ == "__main__":
    for src in sorted(RAW.glob("week-*.png")):
        dst = OUT / f"{src.stem}.webp"
        if dst.exists() and dst.stat().st_mtime >= src.stat().st_mtime:
            continue  # уже обработано
        cut(src, dst)
