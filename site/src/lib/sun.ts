// Pôr do sol pelo algoritmo da NOAA (precisão de ~1 min), no fuso de Laguna (UTC-3, sem horário de verão desde 2019).

const rad = (d: number) => (d * Math.PI) / 180
const deg = (r: number) => (r * 180) / Math.PI

/** Minutos após a meia-noite local em que o sol se põe; null se não houver pôr do sol. */
export function sunsetMinutes(date: Date, lat: number, lon: number, utcOffsetHours = -3): number | null {
  const start = Date.UTC(date.getFullYear(), 0, 0)
  const day = Math.floor((Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) - start) / 86400000)
  const gamma = ((2 * Math.PI) / 365) * (day - 1 + 0.5)
  const eqTime =
    229.18 *
    (0.000075 + 0.001868 * Math.cos(gamma) - 0.032077 * Math.sin(gamma) - 0.014615 * Math.cos(2 * gamma) - 0.040849 * Math.sin(2 * gamma))
  const decl =
    0.006918 - 0.399912 * Math.cos(gamma) + 0.070257 * Math.sin(gamma) - 0.006758 * Math.cos(2 * gamma) +
    0.000907 * Math.sin(2 * gamma) - 0.002697 * Math.cos(3 * gamma) + 0.00148 * Math.sin(3 * gamma)
  const cosHa = Math.cos(rad(90.833)) / (Math.cos(rad(lat)) * Math.cos(decl)) - Math.tan(rad(lat)) * Math.tan(decl)
  if (cosHa < -1 || cosHa > 1) return null
  const ha = deg(Math.acos(cosHa))
  const utcMinutes = 720 - 4 * (lon - ha) - eqTime
  return utcMinutes + utcOffsetHours * 60
}

export function formatClock(minutes: number): string {
  const m = Math.round(minutes)
  return `${Math.floor(m / 60)}h${String(m % 60).padStart(2, '0')}`
}
