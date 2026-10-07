import { useRef } from 'react'
import { CaretLeft, CaretRight } from '@phosphor-icons/react'
import { GALLERY } from '@/content/site'
import { Photo } from './Photo'

/** Faixa de fotos com rolagem nativa (toque, trackpad, teclado) e botões para quem usa mouse. */
export function Lugar() {
  const track = useRef<HTMLUListElement>(null)
  const go = (dir: 1 | -1) => {
    const el = track.current
    if (!el) return
    const item = el.querySelector('li')
    const step = item ? item.getBoundingClientRect().width + 16 : el.clientWidth * 0.8
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    el.scrollBy({ left: dir * step, behavior: reduce ? 'auto' : 'smooth' })
  }
  const btn =
    'grid size-12 place-items-center rounded-full border-[1.5px] border-nanquim bg-capim-claro text-nanquim transition-transform duration-150 active:scale-95'
  return (
    <section id="lugar" aria-labelledby="lugar-titulo" className="bg-capim py-20 lg:py-28">
      <div className="mx-auto flex max-w-[1400px] items-end justify-between gap-6 px-4 sm:px-6">
        <h2 id="lugar-titulo" className="display text-[clamp(2.5rem,6vw,4.25rem)] font-extrabold">
          Como é por lá
        </h2>
        <div className="hidden gap-2 sm:flex">
          <button type="button" className={btn} onClick={() => go(-1)} aria-label="Fotos anteriores">
            <CaretLeft size={20} weight="bold" aria-hidden="true" />
          </button>
          <button type="button" className={btn} onClick={() => go(1)} aria-label="Próximas fotos">
            <CaretRight size={20} weight="bold" aria-hidden="true" />
          </button>
        </div>
      </div>
      <ul
        ref={track}
        tabIndex={0}
        aria-label="Fotos do sítio"
        className="faixa mt-10 flex gap-4 overflow-x-auto px-4 pb-5 sm:px-6 lg:px-[max(1.5rem,calc((100vw-1400px)/2+1.5rem))]"
      >
        {GALLERY.map((g, i) => (
          <li key={g.image} className={`w-[78vw] shrink-0 sm:w-[44vw] lg:w-[25vw] lg:max-w-[380px] ${i % 2 ? 'lg:pt-12' : ''}`}>
            <figure>
              <div className="overflow-hidden rounded-[20px] bg-pasto/40">
                <Photo name={g.image} alt={g.alt} sizes="(min-width: 1024px) 25vw, (min-width: 640px) 44vw, 78vw" className="aspect-[4/5] w-full object-cover" />
              </div>
              <figcaption className="mt-3 font-hand text-[1rem]">{g.caption}</figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  )
}
