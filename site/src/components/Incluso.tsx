import { Broom, ChatsCircle, CookingPot, Fire, FlagBanner, BeerBottle } from '@phosphor-icons/react'
import type { Icon } from '@phosphor-icons/react'
import { INCLUDED } from '@/content/site'
import { Photo } from './Photo'

const ICONS: Record<(typeof INCLUDED)[number]['icon'], Icon> = {
  flag: FlagBanner,
  cooking: CookingPot,
  fire: Fire,
  beer: BeerBottle,
  broom: Broom,
  chat: ChatsCircle,
}

export function Incluso() {
  return (
    <section id="salao" aria-labelledby="salao-titulo" className="bg-capim px-4 py-20 sm:px-6 lg:py-28">
      <div className="mx-auto grid max-w-[1400px] gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
        <div>
          <h2 id="salao-titulo" className="display max-w-[12ch] text-[clamp(2.5rem,6vw,4.25rem)] font-extrabold">
            O que vem com o salão
          </h2>
          <p className="mt-5 max-w-[42ch] text-[1.1rem] text-nanquim-2">
            Salão de madeira com vista para a lagoa. Privacidade total para curtir de dia ou de noite, sem se preocupar com os detalhes.
          </p>
          <div className="relative mt-10 h-[340px] sm:h-[420px]">
            <figure className="absolute left-0 top-0 w-[72%] -rotate-[2.5deg] rounded-2xl bg-capim-claro p-2 shadow-[0_18px_40px_-20px_rgb(var(--sombra)/0.7)]">
              <Photo name="salao-forro" alt="Forro de madeira do salão com bandeirinhas coloridas penduradas" sizes="(min-width: 1024px) 28vw, 70vw" className="aspect-[5/3] w-full rounded-xl object-cover" />
            </figure>
            <figure className="absolute bottom-0 right-0 w-[48%] rotate-[3deg] rounded-2xl bg-capim-claro p-2 shadow-[0_18px_40px_-20px_rgb(var(--sombra)/0.7)]">
              <Photo name="salao-mesa-posta" alt="Mesa posta no salão com toalha de girassóis e bandeja de salgados" sizes="(min-width: 1024px) 18vw, 46vw" className="aspect-[4/5] w-full rounded-xl object-cover" />
              <figcaption className="px-1 pb-0.5 pt-2 font-hand text-[0.9rem]">mesa posta para festa junina</figcaption>
            </figure>
          </div>
        </div>
        <ul className="grid content-start gap-x-10 sm:grid-cols-2">
          {INCLUDED.map((item) => {
            const IconCmp = ICONS[item.icon]
            return (
              <li key={item.title} className="flex gap-4 border-t-[1.5px] border-dashed border-nanquim/35 py-6">
                <span className="grid size-12 shrink-0 place-items-center rounded-full bg-pasto/45 text-nanquim">
                  <IconCmp size={26} weight="duotone" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-[1.2rem] font-bold leading-tight">{item.title}</span>
                  <span className="mt-1 block text-nanquim-2">{item.text}</span>
                </span>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
