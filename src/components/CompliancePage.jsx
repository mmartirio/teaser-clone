import { useState } from 'react'
import {
  ChevronRight,
  Download,
  ExternalLink,
  EyeOff,
  FileText,
  Lock,
  Send,
  ShieldCheck,
  ShieldOff,
} from 'lucide-react'
import { compliance } from '../data.js'

// Página "Programa de integridade corporativa" (abre em #compliance).
export default function CompliancePage() {
  return (
    <>
      <section className="cp-hero theme-dark">
        <div className="container">
          <nav className="breadcrumb" aria-label="Você está em">
            <ol>
              <li><a href="#topo">Início</a></li>
              <li aria-hidden="true"><ChevronRight size={14} /></li>
              <li aria-current="page">{compliance.title}</li>
            </ol>
          </nav>
          <div className="cp-hero__title">
            <span className="cp-hero__icon" aria-hidden="true"><ShieldCheck size={30} /></span>
            <div>
              <p className="eyebrow">Compliance</p>
              <h1 className="h2">{compliance.title}</h1>
            </div>
          </div>
        </div>
      </section>

      <section className="section theme-light cp">
        <div className="container cp__grid">
          <div className="cp__content">
            <p className="cp__intro">{compliance.intro}</p>

            <div className="cp__block cp__block--channel" id="canal-de-denuncia">
              <h2>Canal de denúncia</h2>
              <p>{compliance.channel}</p>
              <ul className="cp__pills">
                <li><EyeOff size={16} /> Anonimato permitido</li>
                <li><Lock size={16} /> Condução com sigilo</li>
                <li><ShieldOff size={16} /> Sem retaliação ao denunciante de boa-fé</li>
              </ul>
            </div>

            <div className="cp__block">
              <h2>Arquivos para download</h2>
              <ul className="cp__docs">
                <DocLink title={compliance.ethics.title} tag="Institucional" href={compliance.ethics.href} />
              </ul>
              <h3>Contratos públicos</h3>
              <ul className="cp__docs">
                {compliance.contracts.map((c) => (
                  <DocLink key={c.href} title={c.title} tag="Contrato público" href={c.href} />
                ))}
              </ul>
            </div>

            <div className="cp__block">
              <h2>Link</h2>
              <p>
                Acesse Atos Consultivos em:{' '}
                <a className="cp__link" href={compliance.agilizaHref} target="_blank" rel="noreferrer">
                  www.agiliza.se.gov.br <ExternalLink size={14} />
                </a>
              </p>
            </div>
          </div>

          <ReportForm />
        </div>
      </section>
    </>
  )
}

function DocLink({ title, tag, href }) {
  return (
    <li>
      <a href={href} target="_blank" rel="noreferrer">
        <FileText size={22} />
        <span>
          <strong>{title}</strong>
          <em>{tag} · PDF</em>
        </span>
        <Download size={18} />
      </a>
    </li>
  )
}

const EMPTY = { firstName: '', lastName: '', phone: '', email: '', message: '' }

function ReportForm() {
  const [form, setForm] = useState(EMPTY)
  const [anonymous, setAnonymous] = useState(false)
  const [status, setStatus] = useState({ type: '', text: '' })
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  const submit = async (e) => {
    e.preventDefault()
    if (!form.message.trim()) {
      setStatus({ type: 'error', text: 'Descreva a ocorrência no campo "Comentário ou Mensagem".' })
      return
    }
    if (!anonymous && form.email && !/^\S+@\S+\.\S+$/.test(form.email)) {
      setStatus({ type: 'error', text: 'Confira o e-mail informado.' })
      return
    }

    const payload = anonymous ? { anonimo: true, mensagem: form.message.trim() } : { anonimo: false, ...form }

    // Com endpoint configurado em data.js, envia direto (permite anonimato de verdade).
    if (compliance.formEndpoint) {
      setStatus({ type: 'sending', text: 'Enviando…' })
      try {
        const res = await fetch(compliance.formEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(payload),
        })
        if (!res.ok) throw new Error()
        setForm(EMPTY)
        setStatus({ type: 'ok', text: 'Denúncia enviada. Obrigado por contribuir com a integridade da Teaser.' })
      } catch {
        setStatus({ type: 'error', text: 'Não foi possível enviar agora. Tente novamente em instantes.' })
      }
      return
    }

    // Sem endpoint: abre o e-mail com a mensagem pronta.
    const lines = anonymous
      ? ['Denúncia anônima', '', form.message.trim()]
      : [
          `Nome: ${form.firstName} ${form.lastName}`.trim(),
          `Telefone: ${form.phone}`,
          `E-mail: ${form.email}`,
          '',
          form.message.trim(),
        ]
    window.location.href = `mailto:${compliance.fallbackEmail}?subject=${encodeURIComponent(
      'Canal de Denúncia'
    )}&body=${encodeURIComponent(lines.join('\n'))}`
    setStatus({ type: 'ok', text: 'Abrimos o seu e-mail com a mensagem pronta. É só enviar.' })
  }

  return (
    <aside className="cp__form-wrap">
      <form className="form cp__form" onSubmit={submit} noValidate>
        <div>
          <h2 className="cp__form-title">Faça sua denúncia</h2>
          <p className="cp__form-sub">Os campos de identificação são opcionais.</p>
        </div>

        <label className="cp__anon">
          <input type="checkbox" checked={anonymous} onChange={(e) => setAnonymous(e.target.checked)} />
          <span>Quero permanecer anônimo</span>
        </label>

        <fieldset className="cp__ident" disabled={anonymous}>
          <legend className="sr-only">Identificação</legend>
          <div className="form__row">
            <label>
              <span>Nome</span>
              <input value={form.firstName} onChange={set('firstName')} autoComplete="given-name" />
            </label>
            <label>
              <span>Sobrenome</span>
              <input value={form.lastName} onChange={set('lastName')} autoComplete="family-name" />
            </label>
          </div>
          <div className="form__row">
            <label>
              <span>DDD + Telefone</span>
              <input value={form.phone} onChange={set('phone')} inputMode="tel" autoComplete="tel" placeholder="(79) 99999-9999" />
            </label>
            <label>
              <span>E-mail</span>
              <input type="email" value={form.email} onChange={set('email')} autoComplete="email" />
            </label>
          </div>
        </fieldset>

        <label>
          <span>Comentário ou Mensagem *</span>
          <textarea rows={6} value={form.message} onChange={set('message')} required />
        </label>

        {status.text && (
          <p className={`cp__status cp__status--${status.type}`} role={status.type === 'error' ? 'alert' : 'status'}>
            {status.text}
          </p>
        )}

        <button className="btn btn--accent btn--block" type="submit" disabled={status.type === 'sending'}>
          Enviar <Send size={18} />
        </button>
        <p className="form__note">Todas as denúncias são tratadas com sigilo.</p>
      </form>
    </aside>
  )
}
