import { InstagramLogo, MapPin } from '@phosphor-icons/react'
import { ARRIVAL, BRAND } from '@/content/site'
import { Photo } from './Photo'

export function Chegada() {
  return (
    <section id="chegar" aria-labelledby="chegar-titulo" className="relative isolate overflow-hidden bg-lagoa-funda">
      <Photo
        name="portal-entrada"
        alt="Portal de troncos com a placa do Sítio Vó Edite, a cerca de madeira e a lagoa ao fundo"
        sizes="100vw"
        className="absolute inset-0 -z-10 h-full w-full object-cover object-[60%_center]"
      />
      <div className="mx-auto flex min-h-[620px] max-w-[1400px] items-end px-4 py-10 sm:px-6 lg:min-h-[720px] lg:py-16">
        <div className="w-full max-w-[520px] rounded-[28px] bg-capim/95 p-7 text-nanquim shadow-[0_30px_60px_-30px_rgb(0_0_0/0.6)] sm:p-9">
          <h2 id="chegar-titulo" className="display text-[clamp(2.4rem,5vw,3.6rem)] font-extrabold">
            {ARRIVAL.title}
          </h2>
          <p className="mt-3 text-[1.08rem] text-nanquim-2">{ARRIVAL.text}</p>
          <p className="mt-4 flex items-start gap-2 font-semibold">
            <MapPin size={22} weight="duotone" aria-hidden="true" className="mt-0.5 shrink-0" />
            {ARRIVAL.address}
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-4">
            <a href="#pedido" className="btn-sinal">
              Pedir data
            </a>
            <a href={BRAND.route} target="_blank" rel="noopener noreferrer" className="font-semibold underline">
              Abrir rota no Google Maps
            </a>
            <a href={BRAND.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-semibold underline">
              <InstagramLogo size={20} weight="duotone" aria-hidden="true" />
              @sitiovoeditee
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
