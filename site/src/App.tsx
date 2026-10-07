import { MotionConfig } from 'motion/react'
import { Chegada } from './components/Chegada'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Incluso } from './components/Incluso'
import { Lugar } from './components/Lugar'
import { ParaQuem } from './components/ParaQuem'
import { Rodape } from './components/Rodape'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#pedido"
        className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:rounded-full focus:bg-sinal focus:px-4 focus:py-2 focus:text-[#13222b]"
      >
        Ir para o pedido de data
      </a>
      <Header />
      <main>
        <Hero />
        <Incluso />
        <ParaQuem />
        <Lugar />
        <Chegada />
      </main>
      <Rodape />
    </MotionConfig>
  )
}
