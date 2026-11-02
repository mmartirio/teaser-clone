import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base: './' faz o site funcionar em qualquer pasta, inclusive no GitHub Pages
// (https://mmartirio.github.io/teaser-clone/). A navegação usa # (ex.: #projeto/...),
// então não precisa de configuração extra de rotas.
export default defineConfig({
  plugins: [react()],
  base: './',
})
