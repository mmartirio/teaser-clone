// Posição de rolagem que deixa a seção centralizada na área visível (abaixo do menu fixo).
// Se a seção for mais alta que a tela, ela fica alinhada pelo topo, logo abaixo do menu.
export function sectionScrollTop(el) {
  const header = document.querySelector('.header')?.offsetHeight || 0
  const free = window.innerHeight - header
  const max = document.documentElement.scrollHeight - window.innerHeight
  let y = 0
  for (let n = el; n; n = n.offsetParent) y += n.offsetTop // ignora animações (transform)
  const h = el.offsetHeight
  const top = h <= free ? y - header - (free - h) / 2 : y - header
  return Math.min(Math.max(0, Math.round(top)), max)
}

export function scrollToSection(el, smooth = true) {
  if (!el) return
  window.scrollTo({ top: sectionScrollTop(el), behavior: smooth ? 'smooth' : 'instant' })
}
