import images from '@/content/images.json'
import type { ImageName } from '@/content/site'

type Props = {
  name: ImageName
  alt: string
  sizes: string
  className?: string
  priority?: boolean
}

const manifest = images as Record<string, { w: number; h: number; widths: number[] }>

/** Foto responsiva (AVIF com WebP de reserva) com dimensões reservadas para não deslocar o layout. */
export function Photo({ name, alt, sizes, className, priority }: Props) {
  const meta = manifest[name]
  const set = (ext: string) => meta.widths.map((w) => `./img/${name}-${w}.${ext} ${w}w`).join(', ')
  const fallback = meta.widths[Math.min(1, meta.widths.length - 1)]
  return (
    <picture>
      <source type="image/avif" srcSet={set('avif')} sizes={sizes} />
      <img
        src={`./img/${name}-${fallback}.webp`}
        srcSet={set('webp')}
        sizes={sizes}
        alt={alt}
        width={meta.w}
        height={meta.h}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        className={className}
      />
    </picture>
  )
}
