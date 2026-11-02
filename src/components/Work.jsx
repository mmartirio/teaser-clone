import { useState } from 'react'
import { ArrowUpRight, Images, Play, Plus } from 'lucide-react'
import { projects } from '../projects.js'

const FIRST = 9
const STEP = 6

export default function Work() {
  const [visible, setVisible] = useState(FIRST)
  const list = projects.slice(0, visible)
  const rest = projects.length - visible

  return (
    <section className="section theme-light" id="portfolio">
      <div className="container">
        <div className="section__head section__head--row" data-reveal>
          <div>
            <p className="eyebrow">Portfólio</p>
            <h2 className="h2">Campanhas que fizeram barulho.</h2>
          </div>
          <p className="work__count">
            <strong>{projects.length}</strong> campanhas · clique para ver o projeto completo
          </p>
        </div>

        <ul className="works">
          {list.map((w, i) => (
            <li key={w.slug} className={`work ${i === 0 ? 'work--wide' : ''}`}>
              <a className="work__btn" href={w.href} aria-label={`Ver projeto ${w.title}`}>
                <img src={w.images[0]} alt="" loading="lazy" />
                <span className="work__badges" aria-hidden="true">
                  <span><Images size={14} /> {w.images.length}</span>
                  {w.videos.length > 0 && <span><Play size={14} /> Vídeo</span>}
                </span>
                <span className="work__meta">
                  <span className="work__tag">{w.category}</span>
                  <span className="work__title">{w.title}</span>
                  {w.client && <span className="work__client">{w.client}</span>}
                </span>
                <span className="work__arrow" aria-hidden="true"><ArrowUpRight /></span>
              </a>
            </li>
          ))}
        </ul>

        {rest > 0 && (
          <div className="center">
            <button className="btn btn--ghost" onClick={() => setVisible((v) => v + STEP)}>
              <Plus size={18} /> Mostrar mais campanhas ({rest})
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
