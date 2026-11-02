import { ArrowUpRight, Coffee } from 'lucide-react'
import { team, waLink } from '../data.js'

// Fotos como no site oficial: quadradas, em preto e branco, com nome e cargo sobre a foto.
export default function Team() {
  return (
    <section className="section theme-dark" id="equipe">
      <div className="container">
        <div className="section__head" data-reveal>
          <p className="eyebrow">Equipe de atendimento</p>
          <h2 className="h2">Quem vai cuidar da sua marca.</h2>
        </div>
        <ul className="team">
          {team.map((p, i) => (
            <li key={p.name} className="person" data-reveal style={{ '--d': `${i * 80}ms` }}>
              <figure className="person__card">
                <img src={p.photo} alt={p.name} loading="lazy" width="640" height="640" />
                <figcaption>
                  <h3>{p.name}</h3>
                  <p>{p.role}</p>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>

        {/* Convite do café, como no site oficial */}
        <div className="coffee" data-reveal>
          <span className="coffee__icon" aria-hidden="true"><Coffee size={26} /></span>
          <div className="coffee__text">
            <h3>Venha tomar um café com a gente.</h3>
            <p>Conheça a agência e converse pessoalmente com o time que vai cuidar da sua marca.</p>
          </div>
          <a
            className="btn btn--accent"
            href={waLink('Olá, Teaser! Quero marcar um café com a equipe de atendimento.')}
            target="_blank"
            rel="noreferrer"
          >
            Marcar um café <ArrowUpRight size={18} />
          </a>
        </div>
      </div>
    </section>
  )
}
