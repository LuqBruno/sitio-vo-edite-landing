import { HERO } from '@/content/site'
import { Croqui } from './Croqui'
import { Pedido } from './Pedido'

/**
 * Primeira dobra: o croqui é o fundo e a composição.
 * Celular: título na terra, croqui, pedido na água logo abaixo.
 * Desktop: croqui ocupa a tela, título na terra (canto superior esquerdo), pedido sobre a água à direita.
 */
export function Hero() {
  return (
    <section id="inicio" aria-labelledby="titulo" className="relative lg:min-h-[max(680px,calc(100dvh-4rem))]">
      <div className="relative z-[2] px-4 pb-5 pt-7 sm:px-6 lg:pointer-events-none lg:absolute lg:left-0 lg:top-0 lg:w-[46%] lg:max-w-[640px] lg:pl-[max(1.5rem,calc((100vw-1400px)/2+1.5rem))] lg:pt-[clamp(1.5rem,5vh,3.5rem)]">
        <h1 id="titulo" className="display max-w-[11ch] text-[clamp(2.9rem,11vw,4rem)] font-extrabold lg:text-[clamp(3.6rem,5.4vw,5.6rem)]">
          {HERO.title}
        </h1>
        <p className="mt-4 max-w-[38ch] text-[1.08rem] leading-snug text-nanquim-2 lg:text-[1.15rem]">{HERO.lead}</p>
        <p className="mt-3 font-hand text-[0.98rem] text-nanquim">Toque nos lugares do croqui para ver as fotos.</p>
      </div>

      <div className="relative h-[clamp(380px,62svh,560px)] lg:absolute lg:inset-0 lg:h-auto">
        <Croqui />
      </div>

      <div className="hachura relative z-[2] px-4 py-9 sm:px-6 lg:absolute lg:bottom-auto lg:right-[max(1.5rem,calc((100vw-1400px)/2+1.5rem))] lg:top-[clamp(1.25rem,4vh,2.5rem)] lg:w-[min(440px,36vw)] lg:rounded-[28px] lg:bg-lagoa-funda/95 lg:bg-none lg:p-7 lg:shadow-[0_30px_60px_-30px_rgb(var(--sombra)/0.8)]">
        <Pedido />
      </div>
    </section>
  )
}
