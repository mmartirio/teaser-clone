import {
  AudioLines,
  Briefcase,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Navigation,
  Phone,
  Youtube,
} from 'lucide-react'
import { company, nav } from '../data.js'

const socialIcons = {
  Instagram: Instagram,
  LinkedIn: Linkedin,
  YouTube: Youtube,
  SoundCloud: AudioLines,
}

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer theme-dark">
      <div className="container">
        <div className="footer__grid">
          {/* Marca */}
          <div className="footer__brand">
            <a href="#topo" className="footer__logo" aria-label="Teaser Comunicação, voltar ao início">
              <img src={company.logo} alt="Teaser" width="144" height="43" />
            </a>
            <p className="footer__tagline">
              Acreditamos no poder das ideias. Agência de propaganda em Aracaju desde 2008.
            </p>
            <ul className="footer__social" aria-label="Redes sociais">
              {company.social.map((s) => {
                const Icon = socialIcons[s.label]
                return (
                  <li key={s.label}>
                    <a href={s.href} target="_blank" rel="noreferrer" aria-label={s.label} title={s.label}>
                      {Icon ? <Icon size={18} /> : s.label}
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Navegação */}
          <nav aria-label="Rodapé">
            <h4>Navegação</h4>
            <ul className="footer__links">
              {nav.map((n) => (
                <li key={n.id}><a href={`#${n.id}`}>{n.label}</a></li>
              ))}
              <li><a href="#compliance">Compliance</a></li>
              <li><a href="#contato">Contato</a></li>
            </ul>
          </nav>

          {/* Contato */}
          <div>
            <h4>Contato</h4>
            <ul className="footer__contact">
              <li>
                <Phone size={16} />
                <a href={company.phoneHref}>{company.phone}</a>
              </li>
              <li>
                <Mail size={16} />
                <a href={`mailto:${company.email}`}>{company.email}</a>
              </li>
              <li>
                <MapPin size={16} />
                <span>{company.address}<br />{company.city}</span>
              </li>
              <li>
                <Navigation size={16} />
                <a href={company.directionsHref} target="_blank" rel="noreferrer">Como chegar</a>
              </li>
            </ul>
          </div>

          {/* Carreira */}
          <div>
            <h4>Trabalhe na Teaser</h4>
            <div className="footer__careers">
              <Briefcase size={20} />
              <p>
                Envie seu portfólio indicando a área de atuação no assunto:
                <a href={`mailto:${company.careers}?subject=Área de atuação: `}>{company.careers}</a>
              </p>
            </div>
            <img className="footer__gptw" src={company.gptw} alt="Certificada Great Place to Work" width="56" height="96" loading="lazy" />
          </div>
        </div>

        <div className="footer__bottom">
          <span>© {year} Teaser Comunicação. Todos os direitos reservados.</span>
        </div>
      </div>

    </footer>
  )
}
