import { useEffect, useState } from 'react'
import { ArrowUpRight, Pause, Play } from 'lucide-react'
import { featured as works } from '../projects.js'

const DURATION = 5000 // tempo de cada campanha (ms)

// Vitrine em formato "stories": passa pelas campanhas do portfólio com barras de progresso.
export default function HeroShowcase() {
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)
  const n = works.length

  useEffect(() => {
    if (paused) return
    const t = setTimeout(() => setI((v) => (v + 1) % n), DURATION)
    return () => clearTimeout(t)
  }, [i, paused, n])

  const w = works[i]

  return (
    <div
      className={`showcase ${paused ? 'is-paused' : ''}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="showcase__shape" aria-hidden="true" />

      <div className="showcase__frame">
        {works.map((item, k) => (
          <img
            key={item.title}
            src={item.images[0]}
            alt={k === i ? `Campanha ${item.title}` : ''}
            className={k === i ? 'is-active' : ''}
            loading={k === 0 ? 'eager' : 'lazy'}
          />
        ))}

        <div className="showcase__bars">
          {works.map((item, k) => (
            <button
              key={item.title}
              onClick={() => setI(k)}
              aria-label={`Ver ${item.title}`}
              className={k < i ? 'is-done' : k === i ? 'is-current' : ''}
            >
              <span style={k === i ? { animationDuration: `${DURATION}ms` } : undefined} key={k === i ? `a${i}` : k} />
            </button>
          ))}
        </div>

        <button
          className="showcase__toggle"
          onClick={() => setPaused((p) => !p)}
          aria-label={paused ? 'Continuar' : 'Pausar'}
        >
          {paused ? <Play size={16} /> : <Pause size={16} />}
        </button>

        <div className="showcase__caption" key={w.title}>
          <span className="showcase__tag">{w.category}{w.client ? ` · ${w.client}` : ''}</span>
          <strong>{w.title}</strong>
          <a href={w.href}>
            Ver projeto <ArrowUpRight size={16} />
          </a>
        </div>
      </div>

      <div className="showcase__counter" aria-hidden="true">
        <strong>{String(i + 1).padStart(2, '0')}</strong>
        <span>/ {String(n).padStart(2, '0')}</span>
      </div>
    </div>
  )
}
