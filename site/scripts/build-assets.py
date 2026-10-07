"""Gera as imagens da landing a partir de materiais/originais (fontes em docs/FONTES.md).

materiais/originais -> site/public/img (AVIF/WebP responsivos) + src/content/images.json.
Os recortes só enquadram a foto ou tiram o letreiro dos quadros do reel; cores não são alteradas.
Execute na pasta site: npm run assets
"""
import json
from pathlib import Path

from PIL import Image, ImageOps

SITE = Path(__file__).resolve().parents[1]
ORIG = SITE.parent / 'materiais' / 'originais'
OUT = SITE / 'public' / 'img'
MANIFEST = SITE / 'src' / 'content' / 'images.json'

# nome: (original, recorte em frações x0,y0,x1,y1, larguras)
PHOTOS = {
    'cabanas-por-do-sol': ('maps-12.jpg', (0.0, 0.08, 1.0, 0.92), [640, 1024, 1600]),
    'portal-entrada': ('maps-00-capa.jpg', (0.0, 0.0, 1.0, 1.0), [640, 1024, 1600]),
    'trapiche-cachorro': ('maps-06.jpg', (0.0, 0.1, 1.0, 0.9), [480, 800, 1200]),
    'trapiche-lagoa': ('maps-05.jpg', (0.0, 0.12, 1.0, 1.0), [480, 800, 1200]),
    'gansos-lagoa': ('maps-04.jpg', (0.0, 0.1, 1.0, 1.0), [480, 800, 1200]),
    'por-do-sol-lagoa': ('maps-08.jpg', (0.0, 0.12, 1.0, 0.72), [480, 800]),
    'cavalo-cabana': ('maps-11.jpg', (0.0, 0.0, 1.0, 1.0), [480, 800, 1200]),
    'cavalo-capela': ('maps-03.jpg', (0.0, 0.18, 1.0, 1.0), [480, 800, 1200]),
    'peru': ('maps-13.jpg', (0.0, 0.2, 1.0, 0.85), [480, 800]),
    'barraca-lagoa': ('maps-07.jpg', (0.0, 0.15, 1.0, 1.0), [480, 800, 1200]),
    'cabana-galinhas': ('ig-C9dRYFbRQ3-.jpg', (0.0, 0.0, 1.0, 1.0), [512]),
    'ponei-galinhas': ('ig-CyerVuTxYR8.jpg', (0.0, 0.0, 1.0, 1.0), [512]),
    'salao-forro': ('reel-saojoao-quadro-0815.jpg', (0.0, 0.035, 1.0, 0.37), [640, 1080]),
    'salao-mesas': ('reel-saojoao-quadro-0815.jpg', (0.0, 0.64, 0.86, 0.965), [640, 1080]),
    'salao-mesa-posta': ('reel-saojoao-quadro-1640.jpg', (0.0, 0.33, 1.0, 0.985), [640, 1080]),
}


def crop(img, box):
    w, h = img.size
    return img.crop((round(box[0] * w), round(box[1] * h), round(box[2] * w), round(box[3] * h)))


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    for old in OUT.glob('*'):
        old.unlink()
    manifest = {}
    for name, (src, box, widths) in PHOTOS.items():
        img = crop(ImageOps.exif_transpose(Image.open(ORIG / src)).convert('RGB'), box)
        variants = []
        for width in sorted({min(w, img.width) for w in widths}):
            height = round(img.height * width / img.width)
            resized = img.resize((width, height), Image.LANCZOS)
            resized.save(OUT / f'{name}-{width}.avif', quality=56)
            resized.save(OUT / f'{name}-{width}.webp', quality=78, method=6)
            variants.append(width)
        manifest[name] = {'w': img.width, 'h': img.height, 'widths': variants}
        print(f'{name}: {img.width}x{img.height} -> {variants}')
    MANIFEST.write_text(json.dumps(manifest, indent=2) + '\n', encoding='utf8')


if __name__ == '__main__':
    main()
