import { useEffect, useState } from 'react'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Services from './components/Services.jsx'
import Work from './components/Work.jsx'
import About from './components/About.jsx'
import Testimonials from './components/Testimonials.jsx'
import Clients from './components/Clients.jsx'
import Team from './components/Team.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import WhatsAppFab from './components/WhatsAppFab.jsx'
import CompliancePage from './components/CompliancePage.jsx'
import ProjectPage from './components/ProjectPage.jsx'
import { findProject } from './projects.js'
import useReveal from './hooks/useReveal.js'
import { scrollToSection } from './hooks/scrollToSection.js'

// Páginas por hash (extensões da landing page):
//   #compliance        → Programa de integridade corporativa
//   #projeto/<slug>    → página de um projeto do portfólio
//   qualquer outro     → home (rolando até a seção, ex.: #servicos)
const routeFromHash = () => {
  const h = window.location.hash
  if (h === '#compliance') return { page: 'compliance', slug: '' }
  if (h.startsWith('#projeto/')) return { page: 'project', slug: decodeURIComponent(h.slice(9)) }
  return { page: 'home', slug: '' }
}

export default function App() {
  const [route, setRoute] = useState(routeFromHash)
  const { page, slug } = route

  useEffect(() => {
    const onHash = () => setRoute(routeFromHash())
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  // Ao trocar de página: vai ao topo, ou à seção pedida no hash
  useEffect(() => {
    const project = page === 'project' ? findProject(slug) : null
    document.title =
      page === 'compliance'
        ? 'Programa de integridade corporativa | Teaser Comunicação'
        : project
          ? `${project.title} | Portfólio Teaser Comunicação`
          : 'Teaser Comunicação | Agência de propaganda em Aracaju desde 2008'
    const id = window.location.hash.slice(1)
    const target = page === 'home' && id ? document.getElementById(id) : null
    if (target) scrollToSection(target, false)
    else window.scrollTo({ top: 0, behavior: 'instant' })
  }, [page, slug])

  // Links para seções da página atual (menu, rodapé, botões): centraliza a seção na tela.
  // Se a seção está em outra página, o hash muda e o efeito acima cuida da rolagem.
  useEffect(() => {
    const onClick = (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const a = e.target.closest('a[href^="#"]')
      if (!a) return
      const id = a.getAttribute('href').slice(1)
      if (!id || id === 'compliance' || id.startsWith('projeto/')) return
      const target = document.getElementById(id)
      if (!target) return
      e.preventDefault()
      if (window.location.hash !== `#${id}`) history.pushState(null, '', `#${id}`)
      setTimeout(() => scrollToSection(target), 0) // depois de fechar o menu do celular
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  useReveal(page + slug)

  return (
    <>
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <Header page={page} />
      <main id="conteudo">
        {page === 'compliance' ? (
          <CompliancePage />
        ) : page === 'project' ? (
          <ProjectPage key={slug} slug={slug} />
        ) : (
          <>
            <Hero />
            <Services />
            <Work />
            <About />
            <Testimonials />
            <Clients />
            <Team />
            <Contact />
          </>
        )}
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  )
}
