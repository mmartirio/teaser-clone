import { useEffect, useState } from 'react'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import { company, nav, waLink } from '../data.js'
import GptwSeal from './GptwSeal.jsx'

export default function Header({ page = 'home' }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Destaca no menu a seção visível
  useEffect(() => {
    const sections = nav.map((n) => document.getElementById(n.id)).filter(Boolean)
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    )
    sections.forEach((s) => io.observe(s))
    if (page === 'compliance') setActive('compliance')
    if (page === 'project') setActive('portfolio')
    return () => io.disconnect()
  }, [page])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className={`header ${scrolled ? 'header--solid' : ''}`}>
      <GptwSeal />
      <div className="container header__inner">
        <a href="#topo" className="brand" aria-label="Teaser Comunicação, início">
          <img src={company.logo} alt="Teaser" width="120" height="36" />
        </a>

        <nav className="nav" aria-label="Principal">
          {nav.map((n) => (
            <a key={n.id} href={`#${n.id}`} className={active === n.id ? 'is-active' : ''}>
              {n.label}
            </a>
          ))}
          <a href="#compliance" className={active === 'compliance' ? 'is-active' : ''}>Compliance</a>
        </nav>

        <a className="btn btn--accent btn--sm header__cta" href="#contato">
          Fale conosco <ArrowUpRight size={16} />
        </a>

        <button
          className="menu-btn"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      <nav
        className={`mobile-nav ${open ? 'is-open' : ''}`}
        aria-label="Menu mobile"
        aria-hidden={!open}
      >
        {nav.map((n) => (
          <a
            key={n.id}
            href={`#${n.id}`}
            className={active === n.id ? 'is-active' : ''}
            onClick={() => setOpen(false)}
          >
            {n.label}
          </a>
        ))}
        <a
          href="#compliance"
          className={active === 'compliance' ? 'is-active' : ''}
          onClick={() => setOpen(false)}
        >
          Compliance
        </a>
        <div className="mobile-nav__ctas">
          <a className="btn btn--accent btn--block" href="#contato" onClick={() => setOpen(false)}>
            Fale conosco
          </a>
          <a className="btn btn--ghost btn--block" href={waLink()} target="_blank" rel="noreferrer">
            Chamar no WhatsApp
          </a>
        </div>
      </nav>
    </header>
  )
}
