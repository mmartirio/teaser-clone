import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { testimonials } from '../data.js'

const DURATION = 9000 // tempo de cada depoimento (ms)

const initials = (name) =>
  name
    .split(' ')
    .filter((w) => w.length > 2)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')

export default function Testimonials() {
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)
  const n = testimonials.length

  useEffect(() => {
    if (paused) return
    const id = setTimeout(() => setI((v) => (v + 1) % n), DURATION)
    return () => clearTimeout(id)
  }, [i, paused, n])

  const go = (k) => setI((k + n) % n)

  return (
    <section
      className={`section theme-dark section--surface testi ${paused ? 'is-paused' : ''}`}
      id="depoimentos"
      aria-label="Depoimentos"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="container testi__grid">
        {/* Coluna esquerda: título + clientes */}
        <div className="testi__side" data-reveal>
          <p className="eyebrow">Depoimentos</p>
          <h2 className="h2">O que dizem sobre a Teaser.</h2>
          <p className="testi__lead">
            Depoimentos de clientes que confiam suas marcas à Teaser. Escolha um nome para ler.
          </p>

          <ul className="testi__tabs" role="tablist" aria-label="Escolher depoimento">
            {testimonials.map((item, k) => (
              <li key={item.name}>
                <button
                  role="tab"
                  aria-selected={k === i}
                  className={`testi__tab ${k === i ? 'is-active' : ''}`}
                  onClick={() => go(k)}
                >
                  <span className="testi__avatar" aria-hidden="true">{initials(item.name)}</span>
                  <span className="testi__who">
                    <strong>{item.name}</strong>
                    <span>{item.company}</span>
                  </span>
                  <span className="testi__progress" aria-hidden="true">
                    {k === i && <i key={i} style={{ animationDuration: `${DURATION}ms` }} />}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Coluna direita.
            A seção tem altura fixa: uma cópia invisível do cartão com o maior depoimento reserva o espaço.
            O cartão visível tem a altura do depoimento atual. */}
        <div className="testi__slot" data-reveal>
          <div className="testi__card testi__card--sizer" aria-hidden="true">
            <Quote className="testi__mark" size={56} />
            <div className="testi__stack">
              {testimonials.map((item) => (
                <Pane key={item.name} item={item} />
              ))}
            </div>
            <div className="testi__nav"><span className="icon-btn" /></div>
          </div>

          <article className="testi__card testi__card--live">
            <Quote className="testi__mark" size={56} aria-hidden="true" />
            <Pane key={i} item={testimonials[i]} animate />
            <div className="testi__nav">
              <button className="icon-btn" onClick={() => go(i - 1)} aria-label="Depoimento anterior">
                <ChevronLeft />
              </button>
              <span className="testi__count">
                <strong>{String(i + 1).padStart(2, '0')}</strong> / {String(n).padStart(2, '0')}
              </span>
              <button className="icon-btn" onClick={() => go(i + 1)} aria-label="Próximo depoimento">
                <ChevronRight />
              </button>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}

function Pane({ item, animate }) {
  return (
    <div className={`testi__pane ${animate ? 'is-animated' : ''}`}>
      <div className="testi__content">
        <p className="testi__highlight">“{item.highlight}”</p>
        <blockquote className="testi__quote">{item.quote}</blockquote>
      </div>
      <footer className="testi__footer">
        <div className="testi__author">
          <span className="testi__avatar testi__avatar--lg" aria-hidden="true">{initials(item.name)}</span>
          <span>
            <strong>{item.name}</strong>
            <span>{item.role}</span>
          </span>
        </div>
        <img className="testi__logo" src={item.logo} alt={item.company} loading="lazy" />
      </footer>
    </div>
  )
}
