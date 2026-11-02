import {
  Compass,
  Gem,
  Landmark,
  Megaphone,
  MonitorSmartphone,
  Newspaper,
  Radio,
  Signpost,
  Smartphone,
  Target,
  Tv,
} from 'lucide-react'
import { services } from '../data.js'

// Ícone de cada serviço (mesma ordem de services em data.js)
const ICONS = [Megaphone, MonitorSmartphone, Compass, Target, Landmark, Gem]

// Meios em que as campanhas acontecem
const MEDIA = [
  { icon: Tv, label: 'TV' },
  { icon: Radio, label: 'Rádio' },
  { icon: Smartphone, label: 'Redes sociais' },
  { icon: MonitorSmartphone, label: 'Digital' },
  { icon: Signpost, label: 'OOH e mobiliário urbano' },
  { icon: Newspaper, label: 'Impresso' },
]

// Cards no mesmo padrão do resto do site (pilares, depoimentos, Compliance):
// cantos arredondados, superfície própria, ícone em círculo turquesa.
export default function Services() {
  return (
    <section className="section theme-dark services-sec" id="servicos">
      <div className="container">
        <div className="section__head" data-reveal>
          <p className="eyebrow">O que fazemos</p>
          <h2 className="h2">Da estratégia à última peça, tudo sob o mesmo teto.</h2>
        </div>

        <ul className="services">
          {services.map((s, i) => {
            const Icon = ICONS[i] || Megaphone
            return (
              <li key={s.title} className="service" data-reveal style={{ '--d': `${i * 70}ms` }}>
                <span className="service__icon" aria-hidden="true"><Icon size={24} strokeWidth={1.75} /></span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </li>
            )
          })}
        </ul>

        <div className="services__media" data-reveal>
          <span className="services__media-label">Presentes em todos os meios</span>
          <ul>
            {MEDIA.map(({ icon: Icon, label }) => (
              <li key={label}><Icon size={16} strokeWidth={1.75} aria-hidden="true" /> {label}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
