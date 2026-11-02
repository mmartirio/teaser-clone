import { useState } from 'react'
import { Check, Plus } from 'lucide-react'

// Pilares do trabalho da Teaser. Ao clicar, o card se expande com o texto completo.
const pillars = [
  {
    k: 'Pesquisa',
    v: 'Dados e escuta antes de qualquer ideia.',
    more:
      'Antes de qualquer ideia, a gente escuta. Mergulhamos no negócio do cliente, no comportamento do público e no cenário da concorrência, cruzando dados de mercado, pesquisas e conversas com quem vive a marca no dia a dia. É esse diagnóstico que mostra onde estão as oportunidades e evita apostas no escuro.',
    items: ['Análise de mercado e concorrência', 'Estudo de público e comportamento', 'Diagnóstico de marca'],
  },
  {
    k: 'Estratégia',
    v: 'Posicionamento claro para mercados exigentes.',
    more:
      'Com o diagnóstico em mãos, definimos onde a marca quer chegar e o caminho até lá: posicionamento, mensagem central, públicos prioritários e o papel de cada canal. Um planejamento claro, pensado para mercados exigentes e para clientes públicos e privados.',
    items: ['Posicionamento e mensagem', 'Planejamento de comunicação', 'Plano de mídia integrado'],
  },
  {
    k: 'Criação',
    v: 'Ideias inquietas, executadas com capricho.',
    more:
      'É aqui que a inquietude criativa entra em cena. Transformamos a estratégia em ideias que chamam atenção e se conectam com as pessoas, e cuidamos de cada detalhe da execução: do filme ao post, do outdoor ao material de ponto de venda.',
    items: ['Conceito e campanha', 'Produção para todos os meios', 'Conteúdo para o digital'],
  },
  {
    k: 'Resultado',
    v: 'Comunicação medida pelo impacto no negócio.',
    more:
      'Comunicação boa é a que move o negócio. Acompanhamos cada campanha com indicadores claros, medimos o impacto e usamos o que aprendemos para ajustar a rota e fazer a próxima ainda melhor.',
    items: ['Indicadores e metas definidos', 'Acompanhamento das campanhas', 'Relatórios e otimização contínua'],
  },
]

export default function About() {
  const [open, setOpen] = useState(null)

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

        {/* Cards em 2 colunas. Ao clicar, o card fica destacado e o texto completo abre
            num painel logo abaixo da linha dele, na largura toda (a ordem dos cards não muda). */}
        <ul className="pillars">
          {pillars.map((p, i) => {
            const isOpen = open === i
            // data-open (e não a classe) marca o card aberto, preservando a classe "is-visible" da animação de entrada
            return (
              <li key={p.k} className="pillar" data-open={isOpen} data-reveal style={{ '--d': `${i * 80}ms`, order: i * 10 }}>
                <button
                  className="pillar__btn"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls="pilar-detalhe"
                >
                  <span className="pillar__icon" aria-hidden="true"><Plus size={18} /></span>
                  <strong>{p.k}</strong>
                  <span className="pillar__short">{p.v}</span>
                </button>
              </li>
            )
          })}
          {open !== null && (
            <li
              className="pillar-panel"
              id="pilar-detalhe"
              key={open}
              // logo depois da linha do card aberto (2 cards por linha)
              style={{ order: (Math.floor(open / 2) * 2 + 1) * 10 + 5 }}
            >
              <h3>{pillars[open].k}</h3>
              <p>{pillars[open].more}</p>
              <ul>
                {pillars[open].items.map((it) => (
                  <li key={it}><Check size={16} aria-hidden="true" /> {it}</li>
                ))}
              </ul>
            </li>
          )}
        </ul>
      </div>
    </section>
  )
}
