import { AUDIENCES } from '@/content/site'
import { PRESET_EVENT } from './Pedido'
import { Photo } from './Photo'

function pedirPara(tipo: string) {
  window.dispatchEvent(new CustomEvent(PRESET_EVENT, { detail: tipo }))
}

export function ParaQuem() {
  return (
    <section id="para-quem" aria-labelledby="para-quem-titulo" className="hachura px-4 py-20 text-lagoa-texto sm:px-6 lg:py-28">
      <div className="mx-auto max-w-[1400px]">
        <h2 id="para-quem-titulo" className="display max-w-[16ch] text-[clamp(2.5rem,6vw,4.25rem)] font-extrabold">
          Empresa ou família, o lugar é o mesmo
        </h2>
        <div className="mt-12 grid gap-12 md:grid-cols-2 md:gap-10 lg:gap-16">
          {AUDIENCES.map((a, i) => (
            <article key={a.id} className={i === 1 ? 'md:mt-24' : ''}>
              <div className="overflow-hidden rounded-[22px] bg-lagoa-funda">
                <Photo name={a.image} alt={a.alt} sizes="(min-width: 768px) 46vw, 92vw" className="aspect-[4/3] w-full object-cover" />
              </div>
              <h3 className="display mt-6 text-[2.1rem] font-extrabold">{a.title}</h3>
              <p className="mt-1 font-hand text-[1.05rem] text-sinal">{a.subtitle}</p>
              <p className="mt-3 max-w-[46ch] text-[1.08rem] text-lagoa-texto-2">{a.text}</p>
              <a href="#pedido" onClick={() => pedirPara(a.id)} className="btn-sinal mt-6">
                Pedir data
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
