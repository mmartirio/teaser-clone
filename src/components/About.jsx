const pillars = [
  { k: 'Pesquisa', v: 'Dados e escuta antes de qualquer ideia.' },
  { k: 'Estratégia', v: 'Posicionamento claro para mercados exigentes.' },
  { k: 'Criação', v: 'Ideias inquietas, executadas com capricho.' },
  { k: 'Resultado', v: 'Comunicação medida pelo impacto no negócio.' },
]

export default function About() {
  return (
    <section className="section theme-light section--alt" id="sobre">
      <div className="container about">
        <div className="about__text" data-reveal>
          <p className="eyebrow">A Teaser</p>
          <h2 className="h2">Desde 2008 criando diálogos autênticos entre pessoas e marcas.</h2>
          <p>
            Atuamos no mercado sergipano com foco em inovação e resultados. Vamos além da
            propaganda tradicional, com uma visão conectada ao digital, e ajudamos clientes
            públicos e privados a conquistar mercados cada vez mais exigentes.
          </p>
          <p>
            Todo trabalho começa em pesquisa, análise de mercado e planejamento estratégico.
            É assim que a criatividade vira resultado.
          </p>
        </div>
        <ul className="pillars">
          {pillars.map((p, i) => (
            <li key={p.k} data-reveal style={{ '--d': `${i * 80}ms` }}>
              <strong>{p.k}</strong>
              <span>{p.v}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
