import { clientLogos } from '../data.js'

export default function Clients() {
  const row = [...clientLogos, ...clientLogos]

  return (
    <section className="section theme-light clients" id="clientes">
      <div className="container section__head" data-reveal>
        <p className="eyebrow">Clientes</p>
        <h2 className="h2">Marcas que confiam nas nossas ideias.</h2>
      </div>

      <div className="logo-carousel" data-reveal>
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
