import { company } from '../data.js'

// Selo Great Place to Work pendurado no menu, no canto esquerdo, como no site oficial
// (visível apenas no desktop).
export default function GptwSeal() {
  return (
    <img
      className="gptw-seal"
      src={company.gptw}
      alt="Teaser Comunicação: empresa certificada Great Place to Work"
      width="79"
      height="135"
    />
  )
}
