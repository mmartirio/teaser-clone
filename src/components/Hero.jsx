import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { stats } from '../data.js'
import HeroShowcase from './HeroShowcase.jsx'

export default function Hero() {
  return (
    <section className="hero theme-light" id="topo">
      <div className="hero__glow" aria-hidden="true" />
      <div className="container hero__grid">
        <div className="hero__copy">
          <p className="eyebrow">Agência de propaganda · Aracaju/SE</p>
          <h1 className="hero__title">
            Acreditamos no <em>poder</em> das ideias.
          </h1>
          <p className="hero__lead">
            Combinamos a inquietude criativa com foco no negócio de cada cliente, para marcas
            públicas e privadas que querem ir mais longe.
          </p>
          <div className="hero__actions">
            <a className="btn btn--accent" href="#contato">
              Começar um projeto <ArrowUpRight size={18} />
            </a>
            <a className="btn btn--ghost" href="#portfolio">Ver portfólio</a>
          </div>
          <dl className="stats">
            {stats.map((s) => (
              <div key={s.label}>
                <dt>{s.value}</dt>
                <dd>{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <HeroShowcase />
      </div>
      <a href="#servicos" className="hero__scroll" aria-label="Rolar para serviços">
        <ArrowDown size={18} />
      </a>
    </section>
  )
}
