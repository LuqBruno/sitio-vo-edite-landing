import { useEffect, useId, useMemo, useState, type FormEvent } from 'react'
import { Minus, Plus, SunHorizon, WhatsappLogo } from '@phosphor-icons/react'
import { BRAND, EVENT_TYPES, PERIODS } from '@/content/site'
import { formatClock, sunsetMinutes } from '@/lib/sun'

type EventId = (typeof EVENT_TYPES)[number]['id']
type PeriodId = (typeof PERIODS)[number]['id']

/** Outros pontos da página podem pré-escolher o tipo de festa: dispatchEvent(new CustomEvent('pedido:tipo', { detail })). */
export const PRESET_EVENT = 'pedido:tipo'

function parseDate(value: string) {
  const [y, m, d] = value.split('-').map(Number)
  return y && m && d ? new Date(y, m - 1, d) : null
}

const fullDate = new Intl.DateTimeFormat('pt-BR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })

export function buildMessage(tipo: EventId, date: Date | null, flexible: boolean, people: string, period: PeriodId | null) {
  const type = EVENT_TYPES.find((t) => t.id === tipo)!
  const lines = [`Olá! Vi a página do Sítio Vó Edite e quero pedir data para ${type.message}.`]
  if (date) lines.push(`Data: ${fullDate.format(date)}${flexible ? ' (posso mudar)' : ''}`)
  else if (flexible) lines.push('Data: ainda em aberto')
  if (people) lines.push(`Pessoas: cerca de ${people}`)
  if (period) lines.push(`Período: ${PERIODS.find((p) => p.id === period)!.label.toLowerCase()}`)
  lines.push('Podem me passar a disponibilidade e o orçamento?')
  return lines.join('\n')
}

export function Pedido({ className = '' }: { className?: string }) {
  const id = useId()
  const [tipo, setTipo] = useState<EventId | null>(null)
  const [date, setDate] = useState('')
  const [flexible, setFlexible] = useState(false)
  const [people, setPeople] = useState('')
  const [period, setPeriod] = useState<PeriodId | null>(null)
  const [error, setError] = useState(false)
  const [today, setToday] = useState('')

  // Data mínima só no cliente, para o HTML pré-renderizado não fixar o dia do build.
  useEffect(() => {
    const t = new Date()
    setToday(`${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, '0')}-${String(t.getDate()).padStart(2, '0')}`)
    const onPreset = (e: Event) => {
      const value = (e as CustomEvent<EventId>).detail
      if (EVENT_TYPES.some((t) => t.id === value)) {
        setTipo(value)
        setError(false)
      }
    }
    window.addEventListener(PRESET_EVENT, onPreset)
    return () => window.removeEventListener(PRESET_EVENT, onPreset)
  }, [])

  const parsed = parseDate(date)
  const sunset = useMemo(() => (parsed ? sunsetMinutes(parsed, BRAND.lat, BRAND.lon) : null), [date])

  const stepPeople = (delta: number) => {
    const n = Math.max(0, (parseInt(people, 10) || 0) + delta)
    setPeople(n ? String(n) : '')
  }

  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (!tipo) {
      setError(true)
      document.getElementById(`${id}-tipo-0`)?.focus()
      return
    }
    const url = `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(buildMessage(tipo, parsed, flexible, people, period))}`
    const win = window.open(url, '_blank', 'noopener')
    if (!win) window.location.href = url
  }

  const groupTitle = 'mb-2.5 text-[0.95rem] font-semibold text-lagoa-texto'

  return (
    <form id="pedido" onSubmit={submit} noValidate className={`text-lagoa-texto ${className}`} aria-labelledby={`${id}-titulo`}>
      <h2 id={`${id}-titulo`} className="display text-[2.4rem] font-extrabold">
        Pedir data
      </h2>
      <p className="mt-2 max-w-[34ch] text-[0.98rem] text-lagoa-texto-2">
        Escolha o que já sabe. O pedido vai pronto para o WhatsApp do sítio.
      </p>

      <fieldset className="mt-6" aria-describedby={error ? `${id}-erro` : undefined}>
        <legend className={groupTitle}>Que festa é?</legend>
        <div className="flex flex-wrap gap-2">
          {EVENT_TYPES.map((t, i) => (
            <label key={t.id}>
              <input
                id={`${id}-tipo-${i}`}
                type="radio"
                name={`${id}-tipo`}
                value={t.id}
                checked={tipo === t.id}
                onChange={() => {
                  setTipo(t.id)
                  setError(false)
                }}
                className="peer sr-only"
              />
              <span className="chip">{t.label}</span>
            </label>
          ))}
        </div>
        {error && (
          <p id={`${id}-erro`} role="alert" className="mt-2 font-semibold text-sinal">
            Escolha o tipo de festa para o sítio saber o que preparar.
          </p>
        )}
      </fieldset>

      <div className="mt-6 grid gap-x-4 gap-y-6 sm:grid-cols-[1.25fr_1fr]">
        <div>
          <label htmlFor={`${id}-data`} className={`block ${groupTitle}`}>
            Para quando?
          </label>
          <input
            id={`${id}-data`}
            type="date"
            min={today || undefined}
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="field"
          />
          <label className="mt-2.5 inline-flex cursor-pointer items-center gap-2 text-[0.92rem] text-lagoa-texto-2">
            <input type="checkbox" checked={flexible} onChange={(e) => setFlexible(e.target.checked)} className="size-4 accent-[var(--sinal)]" />
            {date ? 'Posso mudar a data' : 'Data ainda em aberto'}
          </label>
        </div>
        <div>
          <label htmlFor={`${id}-pessoas`} className={`block ${groupTitle}`}>
            Quantas pessoas?
          </label>
          <div className="flex items-center gap-1.5">
            <button type="button" onClick={() => stepPeople(-5)} aria-label="Menos 5 pessoas" className="grid size-12 shrink-0 place-items-center rounded-full border-[1.5px] border-lagoa-texto/55 transition-transform duration-150 active:scale-95">
              <Minus size={18} weight="bold" aria-hidden="true" />
            </button>
            <input
              id={`${id}-pessoas`}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              autoComplete="off"
              placeholder="cerca de"
              value={people}
              onChange={(e) => setPeople(e.target.value.replace(/\D/g, '').slice(0, 4))}
              className="field text-center tabular-nums"
            />
            <button type="button" onClick={() => stepPeople(5)} aria-label="Mais 5 pessoas" className="grid size-12 shrink-0 place-items-center rounded-full border-[1.5px] border-lagoa-texto/55 transition-transform duration-150 active:scale-95">
              <Plus size={18} weight="bold" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      <p aria-live="polite" className="mt-3 flex min-h-6 items-center gap-2 font-hand text-[0.98rem] text-lagoa-texto">
        {sunset !== null && (
          <>
            <SunHorizon size={20} weight="duotone" aria-hidden="true" className="shrink-0 text-sinal" />
            Nesse dia o sol se põe às {formatClock(sunset)} em Laguna.
          </>
        )}
      </p>

      <fieldset className="mt-4">
        <legend className={groupTitle}>De dia ou à noite?</legend>
        <div className="flex flex-wrap gap-2">
          {PERIODS.map((p) => (
            <label key={p.id}>
              <input type="radio" name={`${id}-periodo`} value={p.id} checked={period === p.id} onChange={() => setPeriod(p.id)} className="peer sr-only" />
              <span className="chip">{p.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <button type="submit" className="btn-sinal mt-7 w-full sm:w-auto">
        <WhatsappLogo size={22} weight="bold" aria-hidden="true" />
        Pedir data no WhatsApp
      </button>
      <p className="mt-3 text-[0.88rem] text-lagoa-texto-2">
        Abre o WhatsApp do sítio, {BRAND.whatsappLabel}, com o pedido escrito. Você revisa antes de enviar.
      </p>
    </form>
  )
}
