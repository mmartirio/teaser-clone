import { useState } from 'react'
import { ArrowLeft, ArrowRight, ArrowUpRight, ChevronRight, Expand, Images, Play } from 'lucide-react'
import { projects } from '../projects.js'
import Lightbox from './Lightbox.jsx'
import ScrollButtons from './ScrollButtons.jsx'
import VideoModal from './VideoModal.jsx'

// Página de um projeto do portfólio (abre em #projeto/<slug>).
export default function ProjectPage({ slug }) {
  const index = projects.findIndex((p) => p.slug === slug)
  const [viewer, setViewer] = useState(null)
  const [film, setFilm] = useState(null) // { src, title, startAt, video } do vídeo aberto no modal

  if (index === -1) return <NotFound />

  const p = projects[index]

  // Rola até o player e o deixa no centro da tela (abaixo do menu fixo).
  // Se os filmes não cabem juntos na tela, centraliza o primeiro.
  const showFilms = (e) => {
    e.preventDefault()
    const grid = document.querySelector('.pj-films__grid')
    if (!grid) return
    const header = document.querySelector('.header')?.offsetHeight || 0
    const free = window.innerHeight - header
    const target = grid.offsetHeight <= free ? grid : grid.querySelector('.pj-film')
    // posição na página sem considerar a animação de entrada (transform)
    let y = 0
    for (let el = target; el; el = el.offsetParent) y += el.offsetTop
    const top = y - header - Math.max(0, (free - target.offsetHeight) / 2)
    window.scrollTo({ top, behavior: 'smooth' })
    grid.querySelectorAll('[data-reveal]').forEach((el) => el.classList.add('is-visible'))
    target.querySelector('video')?.focus({ preventScroll: true })
  }
  const prev = projects[(index - 1 + projects.length) % projects.length]
  const next = projects[(index + 1) % projects.length]

  return (
    <>
      {/* Topo */}
      <section className="pj-hero theme-dark">
        <div className="container">
          <nav className="breadcrumb" aria-label="Você está em">
            <ol>
              <li><a href="#topo">Início</a></li>
              <li aria-hidden="true"><ChevronRight size={14} /></li>
              <li><a href="#portfolio">Portfólio</a></li>
              <li aria-hidden="true"><ChevronRight size={14} /></li>
              <li aria-current="page">{p.title}</li>
            </ol>
          </nav>

          <div className="pj-hero__grid">
            <div>
              <p className="eyebrow">{p.category}</p>
              <h1 className="pj-hero__title">{p.title}</h1>
              <dl className="pj-meta">
                {p.client && (
                  <div><dt>Cliente</dt><dd>{p.client}</dd></div>
                )}
                <div><dt>Categoria</dt><dd>{p.category}</dd></div>
                <div><dt>Peças</dt><dd>{p.images.length}</dd></div>
                {p.videos.length > 0 && (
                  <div><dt>{p.videos.length > 1 ? 'Filmes' : 'Filme'}</dt><dd>{p.videos.length}</dd></div>
                )}
              </dl>
              <div className="pj-hero__actions">
                {p.videos.length > 0 && (
                  <a className="btn btn--accent" href="#pj-filmes" onClick={showFilms}>
                    <Play size={18} /> Assistir {p.videos.length > 1 ? 'aos filmes' : 'ao filme'}
                  </a>
                )}
                <button className="btn btn--ghost" onClick={() => setViewer(0)}>
                  <Expand size={18} /> Ver peças em tela cheia
                </button>
              </div>
            </div>
            <button className="pj-hero__cover" onClick={() => setViewer(0)} aria-label="Abrir a primeira peça em tela cheia">
              <img src={p.images[0]} alt={`Peça principal da campanha ${p.title}`} />
            </button>
          </div>
        </div>
      </section>

      {/* Filmes */}
      {p.videos.length > 0 && (
        <section className="section theme-light pj-films" id="pj-filmes">
          <div className="container">
            <div className="section__head" data-reveal>
              <p className="eyebrow">{p.videos.length > 1 ? 'Filmes' : 'Filme'}</p>
              <h2 className="h2">A campanha em movimento.</h2>
            </div>
            <div className={`pj-films__grid ${p.videos.length > 1 ? 'is-multi' : ''}`}>
              {p.videos.map((src, k) => (
                <figure key={src} className="pj-film" data-reveal>
                  {/* sem poster: o player mostra o 1º quadro do vídeo e já fica na proporção dele */}
                  <video controls playsInline preload="metadata">
                    <source src={`${src}#t=0.1`} type={src.endsWith('.mov') ? 'video/quicktime' : 'video/mp4'} />
                    <source src={`${src}#t=0.1`} />
                  </video>
                  <figcaption>
                    {p.videos.length > 1 ? `Filme ${k + 1}` : p.title}
                    <button
                      type="button"
                      className="pj-film__open"
                      // pausa o vídeo do card e abre o modal a partir do mesmo ponto
                      onClick={(e) => {
                        const video = e.currentTarget.closest('figure')?.querySelector('video')
                        video?.pause()
                        setFilm({
                          src,
                          title: p.videos.length > 1 ? `${p.title} · Filme ${k + 1}` : p.title,
                          startAt: video?.currentTime || 0,
                          video,
                        })
                      }}
                    >
                      Abrir vídeo <Expand size={14} />
                    </button>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Peças */}
      <section className="section theme-light pj-gallery">
        <div className="container">
          <div className="section__head section__head--row" data-reveal>
            <div>
              <p className="eyebrow">Peças</p>
              <h2 className="h2">Do conceito às aplicações.</h2>
            </div>
            <p className="work__count"><Images size={16} /> {p.images.length} {p.images.length > 1 ? 'peças' : 'peça'} · clique para ampliar</p>
          </div>
          {/* Grid de imagens: cada peça preenche a sua célula; a principal ocupa 2×2.
              Clique abre a peça inteira em tela cheia. */}
          <ul className={`frames ${p.images.length === 1 ? 'frames--single' : ''}`}>
            {p.images.map((src, k) => (
              <li key={src} className={frameClass(k, p.images.length)}>
                <button onClick={() => setViewer(k)} aria-label={`Ampliar peça ${k + 1}`}>
                  <img src={src} alt={`${p.title}, peça ${k + 1}`} loading={k < 4 ? 'eager' : 'lazy'} />
                  <span className="frames__zoom" aria-hidden="true"><Expand size={18} /></span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Anterior / próximo */}
      <section className="section theme-dark pj-next">
        <div className="container">
          <div className="pj-next__grid">
            <ProjectLink project={prev} label="Projeto anterior" dir="prev" />
            <ProjectLink project={next} label="Próximo projeto" dir="next" />
          </div>
          <div className="pj-next__cta">
            <p>Quer uma campanha assim para a sua marca?</p>
            <div>
              <a className="btn btn--accent" href="#contato">Fale com a Teaser <ArrowUpRight size={18} /></a>
              <a className="btn btn--ghost" href="#portfolio">Ver todo o portfólio</a>
            </div>
          </div>
        </div>
      </section>

      <ScrollButtons />

      {film && (
        <VideoModal
          src={film.src}
          title={film.title}
          startAt={film.startAt}
          onClose={(t) => {
            if (film.video && t) film.video.currentTime = t // o card continua de onde parou
            setFilm(null)
          }}
        />
      )}

      {viewer !== null && (
        <Lightbox images={p.images} start={viewer} title={p.title} onClose={() => setViewer(null)} />
      )}
    </>
  )
}

function ProjectLink({ project, label, dir }) {
  return (
    <a className={`pj-link pj-link--${dir}`} href={project.href}>
      <img src={project.images[0]} alt="" loading="lazy" />
      <span className="pj-link__text">
        <span className="pj-link__label">
          {dir === 'prev' && <ArrowLeft size={16} />} {label} {dir === 'next' && <ArrowRight size={16} />}
        </span>
        <strong>{project.title}</strong>
      </span>
    </a>
  )
}

function NotFound() {
  return (
    <section className="section theme-light" style={{ paddingTop: 'calc(var(--header-h) + 5rem)' }}>
      <div className="container">
        <p className="eyebrow">Portfólio</p>
        <h1 className="h2">Projeto não encontrado.</h1>
        <p style={{ margin: '1rem 0 2rem', color: 'var(--muted)' }}>O endereço pode ter mudado.</p>
        <a className="btn btn--accent" href="#portfolio">Ver o portfólio</a>
      </div>
    </section>
  )
}

// Classes da moldura de cada peça. A principal ocupa 2×2; quando a última linha ficaria
// incompleta, as últimas peças viram molduras largas (2 colunas) para fechar a linha.
// Calculado para cada grid: computador (4 colunas) e tablet/celular (2).
function frameClass(k, n) {
  const cls = ['frames__item']
  const isMain = n === 2 || k === 0
  if (isMain) {
    cls.push('frames__item--main')
    return cls.join(' ')
  }
  if (n === 2) return cls.join(' ')
  for (const [cols, tag] of [[4, 'w-d'], [2, 'w-m']]) {
    const used = 4 + (n - 1) // principal (4 células) + as demais
    const empty = (cols - (used % cols)) % cols
    if (empty > 0 && k >= n - empty) cls.push(tag)
  }
  return cls.join(' ')
}

