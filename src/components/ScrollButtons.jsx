import { useEffect, useRef, useState } from 'react'
import { ArrowDown, ArrowUp } from 'lucide-react'
import { sectionScrollTop } from '../hooks/scrollToSection.js'

// Botões de rolagem: ↑ no canto esquerdo e ↓ no direito, pulando de seção em seção.
// Cada um só aparece quando dá para rolar naquela direção
// e muda de cor conforme o fundo que está atrás dele (claro ou escuro).
export default function ScrollButtons() {
  const [canUp, setCanUp] = useState(false)
  const [canDown, setCanDown] = useState(false)
  const [dark, setDark] = useState({ up: true, down: true })
  const upRef = useRef(null)
  const downRef = useRef(null)

  useEffect(() => {
    // fundo atrás do botão: procura a seção (theme-dark / theme-light) sob o centro dele
    const isDarkBehind = (btn) => {
      if (!btn) return false
      const r = btn.getBoundingClientRect()
      const x = r.left + r.width / 2
      const y = r.top + r.height / 2
      const el = document
        .elementsFromPoint(x, y)
        .find((e) => !e.closest('.scroll-btn, .fab, .header'))
      return !!el?.closest('.theme-dark')
    }

    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setCanUp(window.scrollY > 80)
      setCanDown(window.scrollY < max - 80)
      const up = isDarkBehind(upRef.current)
      const down = isDarkBehind(downRef.current)
      setDark((prev) => (prev.up === up && prev.down === down ? prev : { up, down }))
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    // a altura da página muda quando imagens e vídeos carregam
    const ro = new ResizeObserver(update)
    ro.observe(document.body)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
      ro.disconnect()
    }
  }, [])

  // Pula para a seção anterior/próxima e a deixa centralizada na tela.
  const step = (dir) => {
    const max = document.documentElement.scrollHeight - window.innerHeight
    const sections = [...document.querySelectorAll('main > section, body footer.footer')]
    const stops = [...new Set(sections.map(sectionScrollTop))].sort((a, b) => a - b)
    const y = window.scrollY
    const next = dir > 0 ? stops.find((t) => t > y + 4) : [...stops].reverse().find((t) => t < y - 4)
    window.scrollTo({ top: next ?? (dir > 0 ? max : 0), behavior: 'smooth' })
  }

  return (
    <>
      <button
        ref={upRef}
        className={`scroll-btn scroll-btn--up ${canUp ? 'is-visible' : ''} ${dark.up ? 'on-dark' : 'on-light'}`}
        onClick={() => step(-1)}
        aria-label="Rolar para cima"
        tabIndex={canUp ? 0 : -1}
      >
        <ArrowUp size={19} strokeWidth={1.75} />
      </button>
      <button
        ref={downRef}
        className={`scroll-btn scroll-btn--down ${canDown ? 'is-visible' : ''} ${dark.down ? 'on-dark' : 'on-light'}`}
        onClick={() => step(1)}
        aria-label="Rolar para baixo"
        tabIndex={canDown ? 0 : -1}
      >
        <ArrowDown size={19} strokeWidth={1.75} />
      </button>
    </>
  )
}
