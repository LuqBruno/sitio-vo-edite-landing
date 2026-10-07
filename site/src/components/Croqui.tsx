import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ArrowUp, X } from '@phosphor-icons/react'
import { SPOTS, type Spot } from '@/content/site'
import { LANE, METERS_PER_PX, ROAD_MAIN, ROAD_NORTH, TREES, TUFTS, WATER } from '@/content/croqui-geo'
import { Photo } from './Photo'

/** Janela do mosaico de satélite mostrada no croqui (pixels z17). */
const VB = { x: 487, y: 705, w: 800, h: 500 }
const SCALE_UNITS = 100 / METERS_PER_PX

/** Laço desenhado à mão em volta do sítio: elipse irregular que passa um pouco do ponto inicial. */
function ringPath(cx: number, cy: number, rx: number, ry: number) {
  const pts: string[] = []
  const steps = 64
  for (let i = 0; i <= steps; i++) {
    const t = -0.35 + (i / steps) * (Math.PI * 2 + 0.6)
    const wobble = 1 + 0.035 * Math.sin(t * 3 + 1) + 0.02 * Math.cos(t * 5)
    const grow = 1 + (i / steps) * 0.06
    const x = cx + Math.cos(t) * rx * wobble * grow
    const y = cy + Math.sin(t) * ry * wobble * grow
    const rot = (-8 * Math.PI) / 180
    const rxp = cx + (x - cx) * Math.cos(rot) - (y - cy) * Math.sin(rot)
    const ryp = cy + (x - cx) * Math.sin(rot) + (y - cy) * Math.cos(rot)
    pts.push(`${rxp.toFixed(1)},${ryp.toFixed(1)}`)
  }
  return `M${pts.join(' L')}`
}
const RING = ringPath(850, 965, 82, 54)

function labelProps(s: Spot) {
  switch (s.side) {
    case 'left':
      return { x: s.x - 13, y: s.y + 4, textAnchor: 'end' as const }
    case 'right':
      return { x: s.x + 13, y: s.y + 4, textAnchor: 'start' as const }
    case 'top':
      return { x: s.x, y: s.y - 13, textAnchor: 'middle' as const }
    default:
      return { x: s.x, y: s.y + 22, textAnchor: 'middle' as const }
  }
}

type Open = { spot: Spot; left: number; top: number; origin: string; sheet: boolean }

export function Croqui() {
  const wrap = useRef<HTMLDivElement>(null)
  const closeBtn = useRef<HTMLButtonElement>(null)
  const lastTrigger = useRef<SVGGElement | null>(null)
  const [open, setOpen] = useState<Open | null>(null)
  const reduce = useReducedMotion()

  const show = useCallback((spot: Spot, el: SVGGElement) => {
    const box = wrap.current?.getBoundingClientRect()
    const dot = el.querySelector('.dot')?.getBoundingClientRect()
    if (!box || !dot) return
    lastTrigger.current = el
    const cx = dot.left + dot.width / 2 - box.left
    const cy = dot.top + dot.height / 2 - box.top
    const sheet = box.width < 640
    const cardW = 300
    const cardH = 330
    const toLeft = cx > cardW + 40
    const left = sheet ? 0 : toLeft ? cx - cardW - 28 : cx + 28
    const top = sheet ? 0 : Math.min(Math.max(cy - cardH / 2, 12), box.height - cardH - 12)
    const origin = sheet ? 'center bottom' : `${toLeft ? cardW + 28 : -28}px ${cy - top}px`
    setOpen((prev) => (prev?.spot.id === spot.id ? null : { spot, left, top, origin, sheet }))
  }, [])

  const close = useCallback(() => {
    setOpen(null)
    lastTrigger.current?.focus()
  }, [])

  useEffect(() => {
    if (!open) return
    closeBtn.current?.focus({ preventScroll: true })
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    const onDown = (e: PointerEvent) => {
      const t = e.target as Element
      if (t.closest('[data-recorte]') || t.closest('[data-spot]')) return
      setOpen(null)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onDown)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onDown)
    }
  }, [open, close])

  const onSpotKey = (spot: Spot) => (e: KeyboardEvent<SVGGElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      show(spot, e.currentTarget)
    }
  }

  return (
    <div ref={wrap} className="croqui relative h-full w-full overflow-hidden bg-capim [container-type:size]">
      <svg
        viewBox={`${VB.x} ${VB.y} ${VB.w} ${VB.h}`}
        preserveAspectRatio="xMidYMin slice"
        className="absolute inset-0 h-full w-full select-none"
        role="group"
        aria-label="Croqui do Sítio Vó Edite na margem da lagoa, com os lugares do sítio"
      >
        <defs>
          <filter id="traco" x="-5%" y="-5%" width="110%" height="110%">
            <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="2" seed="4" />
            <feDisplacementMap in="SourceGraphic" scale="3" />
          </filter>
          <pattern id="hachura" width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(-8)">
            <path d="M0 7 H9" className="stroke-lagoa-texto" strokeOpacity="0.16" strokeWidth="1" strokeLinecap="round" />
          </pattern>
          <clipPath id="agua">
            <path d={WATER} />
          </clipPath>
        </defs>

        {/* Terra */}
        <rect x={VB.x - 400} y={VB.y - 400} width={VB.w + 800} height={VB.h + 800} className="fill-capim" />
        <g aria-hidden="true">
          {TUFTS.map(([x, y], i) => (
            <path key={i} d={`M${x - 3},${y} l1.4,-4 M${x},${y} l0,-5 M${x + 3},${y} l-1.4,-4`} className="fill-none stroke-pasto-escuro" strokeWidth="1" strokeLinecap="round" />
          ))}
          {TREES.map(([x, y, r], i) => (
            <circle key={i} cx={x} cy={y} r={r * 0.55} className="fill-pasto stroke-nanquim" strokeOpacity="0.55" strokeWidth="0.8" />
          ))}
        </g>

        {/* Água: campo, hachura e faixas de margem */}
        <path d={WATER} className="fill-lagoa" />
        <path d={WATER} fill="url(#hachura)" />
        <g clipPath="url(#agua)" aria-hidden="true">
          <path d={WATER} className="fill-none stroke-lagoa-texto" strokeOpacity="0.1" strokeWidth="26" />
          <path d={WATER} className="fill-none stroke-lagoa-texto" strokeOpacity="0.16" strokeWidth="10" />
        </g>
        <path d={WATER} className="fill-none stroke-nanquim" strokeWidth="2" strokeLinejoin="round" filter="url(#traco)" />

        {/* Estradas */}
        <g aria-hidden="true" filter="url(#traco)" className="fill-none" strokeLinecap="round" strokeLinejoin="round">
          {[ROAD_MAIN, ROAD_NORTH].map((d) => (
            <g key={d}>
              <path d={d} pathLength={1} className="draw-road stroke-nanquim" strokeOpacity="0.6" strokeWidth="9" style={{ ['--len' as string]: 1 }} />
              <path d={d} pathLength={1} className="draw-road stroke-[var(--chao)]" strokeWidth="6.5" style={{ ['--len' as string]: 1 }} />
            </g>
          ))}
          <path d={LANE} className="reveal-note stroke-nanquim" strokeWidth="1.6" strokeDasharray="3 4" style={{ ['--i' as string]: 0 }} />
        </g>
        <path id="estrada-geral" d={ROAD_MAIN} fill="none" />
        <text className="reveal-note fill-nanquim-2 font-hand text-[11px]" style={{ ['--i' as string]: 1 }} dy="-9">
          <textPath href="#estrada-geral" startOffset="22%">
            estrada geral
          </textPath>
        </text>
        <text x="1120" y="905" className="reveal-note fill-lagoa-texto font-hand text-[26px] tracking-[0.35em]" fillOpacity="0.75" style={{ ['--i' as string]: 2 }}>
          lagoa
        </text>

        {/* Marca do sítio */}
        <path d={RING} pathLength={1} className="draw-ring fill-none stroke-sinal" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />

        {/* Lugares */}
        {SPOTS.map((s, i) => {
          const active = open?.spot.id === s.id
          return (
            <g
              key={s.id}
              data-spot
              role="button"
              tabIndex={0}
              aria-label={`${s.label}: ver foto`}
              aria-haspopup="dialog"
              aria-expanded={active}
              onClick={(e) => show(s, e.currentTarget)}
              onKeyDown={onSpotKey(s)}
              className="spot reveal-note cursor-pointer outline-none"
              style={{ ['--i' as string]: 3 + i }}
            >
              <circle cx={s.x} cy={s.y} r="16" fill="transparent" />
              <circle cx={s.x} cy={s.y} r="6.5" className={`dot stroke-nanquim ${active ? 'fill-sinal' : 'fill-capim-claro'}`} strokeWidth="2" />
              <circle cx={s.x} cy={s.y} r="2" className="fill-nanquim" />
              <text {...labelProps(s)} className="spot-label font-hand fill-nanquim">
                {s.label}
              </text>
            </g>
          )
        })}
      </svg>

      {/* Escala e norte verdadeiros (largura da barra acompanha o recorte "slice" do mapa) */}
      <div className="pointer-events-none absolute bottom-3 left-3 flex items-end gap-3 rounded-xl bg-capim-claro/90 px-3 py-2 text-nanquim shadow-[0_6px_16px_-10px_rgb(var(--sombra)/0.6)] lg:bottom-5 lg:left-5">
        <span className="flex flex-col items-center font-hand text-[0.8rem] leading-none">
          <ArrowUp size={16} weight="bold" aria-hidden="true" />N
        </span>
        <span className="flex flex-col gap-1 font-hand text-[0.8rem] leading-none">
          <span
            aria-hidden="true"
            className="block h-1.5 border-x-2 border-b-2 border-nanquim"
            style={{ width: `calc(${SCALE_UNITS.toFixed(1)} * max(100cqw / ${VB.w}, 100cqh / ${VB.h}))` }}
          />
          <span>100 m</span>
        </span>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            key={open.spot.id}
            data-recorte
            role="dialog"
            aria-label={open.spot.label}
            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.9, rotate: open.sheet ? 0 : -2, filter: 'blur(4px)' }}
            animate={{ opacity: 1, scale: 1, rotate: open.sheet ? 0 : -1, filter: 'blur(0px)' }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.94, filter: 'blur(3px)', transition: { duration: 0.16 } }}
            transition={{ type: 'spring', bounce: 0.12, duration: 0.42 }}
            style={{ transformOrigin: open.origin, ...(open.sheet ? {} : { left: open.left, top: open.top }) }}
            className={
              open.sheet
                ? 'absolute inset-x-2 bottom-2 z-10 flex gap-3 rounded-2xl bg-capim-claro p-2.5 pr-11 text-nanquim shadow-[0_18px_40px_-16px_rgb(var(--sombra)/0.7)]'
                : 'absolute z-10 w-[300px] rounded-2xl bg-capim-claro p-2.5 text-nanquim shadow-[0_22px_48px_-18px_rgb(var(--sombra)/0.75)]'
            }
          >
            <span aria-hidden="true" className="absolute -top-2 left-1/2 h-5 w-20 -translate-x-1/2 -rotate-2 rounded-[3px] bg-sinal/70" />
            <div className={open.sheet ? 'w-[42%] shrink-0 overflow-hidden rounded-xl' : 'overflow-hidden rounded-xl'}>
              <Photo
                name={open.spot.image}
                alt={open.spot.alt}
                sizes={open.sheet ? '42vw' : '300px'}
                className={open.sheet ? 'aspect-[4/5] h-full w-full object-cover' : 'aspect-[4/3] w-full object-cover'}
              />
            </div>
            <div className={open.sheet ? 'py-1' : 'px-1.5 pb-1.5 pt-3'}>
              <p className="font-hand text-[1.05rem] font-semibold leading-tight">{open.spot.label}</p>
              <p className="mt-1.5 text-[0.95rem] leading-snug text-nanquim-2">{open.spot.caption}</p>
            </div>
            <button
              ref={closeBtn}
              type="button"
              onClick={close}
              aria-label="Fechar foto"
              className="absolute right-2 top-2 grid size-9 place-items-center rounded-full bg-capim-claro/90 text-nanquim transition-transform duration-150 active:scale-95"
            >
              <X size={18} weight="bold" aria-hidden="true" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
