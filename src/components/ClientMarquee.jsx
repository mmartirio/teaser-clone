import { services } from '../data.js'

const items = services.map(s => s.title)

export default function ClientMarquee() {
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {[...items, ...items].map((label, i) => (
          <span key={i}>
            {label}
            <i>✦</i>
          </span>
        ))}
      </div>
    </div>
  )
}
