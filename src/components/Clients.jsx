import { useState } from 'react'
import { Pause, Play } from 'lucide-react'
import { clientLogos } from '../data.js'

// Carrossel contínuo de logos de clientes (como no site oficial).
// Pausa ao passar o mouse e tem botão de pausar para acessibilidade.
export default function Clients() {
  const [paused, setPaused] = useState(false)
  const row = [...clientLogos, ...clientLogos] // duplicado para o loop infinito

  return (
    <section className="section theme-light clients" id="clientes">
      <div className="container clients__head" data-reveal>
        <div>
          <p className="eyebrow">Clientes</p>
          <h2 className="h2">Marcas que confiam nas nossas ideias.</h2>
        </div>
        <button
          className="icon-btn"
          onClick={() => setPaused((p) => !p)}
          aria-label={paused ? 'Continuar carrossel' : 'Pausar carrossel'}
        >
          {paused ? <Play size={18} /> : <Pause size={18} />}
        </button>
      </div>

      <div className={`logo-carousel ${paused ? 'is-paused' : ''}`} data-reveal>
        <ul className="logo-carousel__track">
          {row.map((c, i) => (
            <li key={i} aria-hidden={i >= clientLogos.length}>
              <img
                src={c.src}
                alt={i < clientLogos.length ? c.name : ''}
                title={c.name}
                loading="lazy"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
