import { useState } from 'react'
import { Mail, MapPin, MessageCircle, Navigation, Phone, Send } from 'lucide-react'
import { company, waLink } from '../data.js'

const INTERESTS = ['Campanha', 'Digital', 'Estratégia', 'Mídia', 'Outro']

export default function Contact() {
  const [form, setForm] = useState({ name: '', company: '', interest: 'Campanha', message: '' })
  const [error, setError] = useState('')
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  // Sem back-end: o formulário monta a mensagem e abre o WhatsApp da agência.
  const submit = (e) => {
    e.preventDefault()
    if (!form.name.trim() || !form.message.trim()) {
      setError('Preencha seu nome e conte um pouco sobre o projeto.')
      return
    }
    setError('')
    const msg = [
      `Olá, Teaser! Sou ${form.name.trim()}${form.company ? ` (${form.company.trim()})` : ''}.`,
      `Interesse: ${form.interest}.`,
      form.message.trim(),
    ].join('\n')
    window.open(waLink(msg), '_blank', 'noopener')
  }

  return (
    <section className="section theme-light section--alt" id="contato">
      <div className="container contact">
        <div className="contact__info" data-reveal>
          <p className="eyebrow">Contato</p>
          <h2 className="h2">Vamos conversar sobre a sua marca?</h2>
          <p className="contact__lead">
            Conte o desafio da sua marca. A gente responde rápido e marca uma conversa, aqui na
            agência ou online.
          </p>
          <ul className="contact__list">
            <li>
              <Phone size={20} />
              <a href={company.phoneHref}>{company.phone}</a>
            </li>
            <li>
              <Mail size={20} />
              <a href={`mailto:${company.email}`}>{company.email}</a>
            </li>
            <li>
              <MapPin size={20} />
              <a href={company.mapsHref} target="_blank" rel="noreferrer">
                {company.address}<br />{company.city}
              </a>
            </li>
          </ul>
          <a
            className="btn btn--ghost"
            href={waLink('Olá, Teaser! Gostaria de conversar sobre um projeto.')}
            target="_blank"
            rel="noreferrer"
          >
            <MessageCircle size={18} /> Chamar no WhatsApp
          </a>
        </div>

        <form className="form" onSubmit={submit} noValidate data-reveal>
          <div className="form__row">
            <label>
              <span>Seu nome *</span>
              <input value={form.name} onChange={set('name')} autoComplete="name" required />
            </label>
            <label>
              <span>Empresa</span>
              <input value={form.company} onChange={set('company')} autoComplete="organization" />
            </label>
          </div>
          <fieldset>
            <legend>Interesse</legend>
            <div className="chips">
              {INTERESTS.map((it) => (
                <label key={it} className={`chip ${form.interest === it ? 'is-active' : ''}`}>
                  <input
                    type="radio"
                    name="interest"
                    value={it}
                    checked={form.interest === it}
                    onChange={set('interest')}
                  />
                  {it}
                </label>
              ))}
            </div>
          </fieldset>
          <label>
            <span>Conte sobre o projeto *</span>
            <textarea rows={4} value={form.message} onChange={set('message')} required />
          </label>
          {error && <p className="form__error" role="alert">{error}</p>}
          <button className="btn btn--accent btn--block" type="submit">
            Enviar pelo WhatsApp <Send size={18} />
          </button>
          <p className="form__note">
            Prefere e-mail? Escreva para <a href={`mailto:${company.email}`}>{company.email}</a>.
          </p>
        </form>
      </div>

      <div className="container">
        <div className="map" data-reveal>
          <iframe
            title="Mapa: Teaser Comunicação, Rua Antônio Andrade 1246, Aracaju"
            src={company.mapEmbed}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
          <div className="map__card">
            <MapPin size={22} />
            <div>
              <strong>Teaser Comunicação</strong>
              <span>{company.address}</span>
              <span>{company.city}</span>
            </div>
            <a className="btn btn--accent btn--sm" href={company.directionsHref} target="_blank" rel="noreferrer">
              Como chegar <Navigation size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
