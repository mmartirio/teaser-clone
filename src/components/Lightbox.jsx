import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

// Visualizador em tela cheia: setas, teclado (← → Esc) e contador.
export default function Lightbox({ images, start = 0, title, onClose }) {
  const [i, setI] = useState(start)
  const n = images.length
  const prev = () => setI((v) => (v - 1 + n) % n)
  const next = () => setI((v) => (v + 1) % n)

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  })

  return (
    <div className="viewer" role="dialog" aria-modal="true" aria-label={title} onClick={onClose}>
      <div className="viewer__top" onClick={(e) => e.stopPropagation()}>
        <span className="viewer__title">{title}</span>
        <span className="viewer__count">{i + 1} / {n}</span>
        <button className="icon-btn viewer__close" onClick={onClose} aria-label="Fechar" autoFocus>
          <X />
        </button>
      </div>
      <figure className="viewer__stage" onClick={(e) => e.stopPropagation()}>
        <img key={i} src={images[i]} alt={`${title}, peça ${i + 1} de ${n}`} />
      </figure>
      {n > 1 && (
        <>
          <button className="icon-btn viewer__nav viewer__nav--prev" onClick={(e) => { e.stopPropagation(); prev() }} aria-label="Anterior">
            <ChevronLeft />
          </button>
          <button className="icon-btn viewer__nav viewer__nav--next" onClick={(e) => { e.stopPropagation(); next() }} aria-label="Próxima">
            <ChevronRight />
          </button>
        </>
      )}
    </div>
  )
}
