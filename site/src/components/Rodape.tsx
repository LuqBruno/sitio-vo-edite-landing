import { BRAND, DEMO_NOTE } from '@/content/site'

export function Rodape() {
  return (
    <footer className="bg-nanquim px-4 py-12 text-capim sm:px-6">
      <div className="mx-auto grid max-w-[1400px] gap-8 md:grid-cols-[1fr_1.4fr]">
        <div>
          <p className="display text-[2rem] font-extrabold">{BRAND.name}</p>
          <p className="mt-2 opacity-80">{BRAND.place}</p>
          <p className="mt-1 opacity-80">
            WhatsApp{' '}
            <a href={`https://wa.me/${BRAND.whatsapp}`} target="_blank" rel="noopener noreferrer" className="underline">
              {BRAND.whatsappLabel}
            </a>
          </p>
        </div>
        <p className="max-w-[70ch] text-[0.9rem] leading-relaxed opacity-75">{DEMO_NOTE}</p>
      </div>
    </footer>
  )
}
