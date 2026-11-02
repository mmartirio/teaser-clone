import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'

// Modal com o player do vídeo. Começa do ponto em que o vídeo do card estava
// e, ao fechar, devolve esse ponto para o card (onClose recebe o tempo atual).
export default function VideoModal({ src, title, startAt = 0, onClose }) {
  const ref = useRef(null)

  const close = () => {
    const v = ref.current
    const t = v ? v.currentTime : startAt
    v?.pause()
    onClose(t)
  }

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && close()
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  })

  const onLoaded = () => {
    const v = ref.current
    if (!v) return
    if (startAt > 0 && startAt < v.duration) v.currentTime = startAt
    v.play().catch(() => {}) // se o navegador bloquear o play automático, o usuário aperta play
  }

  return (
    <div className="vmodal" role="dialog" aria-modal="true" aria-label={title} onClick={close}>
      <div className="vmodal__box" onClick={(e) => e.stopPropagation()}>
        <div className="vmodal__top">
          <span>{title}</span>
          <button className="icon-btn vmodal__close" onClick={close} aria-label="Fechar vídeo" autoFocus>
            <X />
          </button>
        </div>
        <video ref={ref} controls playsInline onLoadedMetadata={onLoaded}>
          <source src={src} type={src.endsWith('.mov') ? 'video/quicktime' : 'video/mp4'} />
          <source src={src} />
        </video>
      </div>
    </div>
  )
}
