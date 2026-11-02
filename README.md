# Landing page · Teaser Comunicação

Nova versão em React (Vite) do site https://teasercomunicacao.com.br/.

## Como rodar

Requer Node.js 18 ou superior e Yarn (`npm install -g yarn`, ou `corepack enable`).

```bash
cd D:\Projetos\landingPage_Teaser
yarn             # instala as dependências (usa o yarn.lock)
yarn dev         # abre em http://localhost:5173
yarn build       # gera a versão de produção em /dist
yarn preview     # testa o build localmente
```

Para adicionar pacotes: `yarn add nome-do-pacote` (ou `yarn add -D` para dev).

## Estrutura

```
src/
  data.js          ← todo o conteúdo (textos, contatos, trabalhos, equipe, imagens)
  styles.css       ← paleta, tipografia e layout (variáveis no topo)
  App.jsx          ← ordem das seções
  hooks/useReveal.js
  components/      ← Header, Hero, Services, Work (com galeria), About,
                     Testimonials, Clients, Team, Contact, Footer, WhatsAppFab
```

## O que mudou em relação ao site atual

- Seção de **Serviços** explícita (o site atual não dizia o que a agência faz).
- **Hero** com proposta de valor, CTAs claros e números (desde 2008, 20+ campanhas, GPTW).
- **Portfólio** com filtro por setor e galeria em tela cheia (teclado: ← → Esc), sem sair da página.
- **Formulário de contato** que monta a mensagem e abre o WhatsApp da agência (não precisa de servidor).
- Botão flutuante de WhatsApp, menu fixo com destaque da seção atual, menu mobile.
- Acessibilidade: link "pular para o conteúdo", foco visível, textos alternativos, respeito a `prefers-reduced-motion`.
- SEO básico: título, descrição e Open Graph no `index.html`.

## Antes de publicar

1. **Imagens:** hoje apontam para o WordPress atual. Baixe-as para `public/img/` e troque as URLs em `src/data.js`.
2. **Depoimentos:** os textos em `data.js` são resumos. Cole as falas originais dos clientes.
3. **Logos de clientes:** recebem filtro branco via CSS. Se algum ficar ruim, ajuste em `.logos img`.
4. **Cargo do Marcelo Pinheiro:** o site mostra "Executivo de Contas", mas o arquivo da foto diz "Diretor de Criação". Confirme.
5. **Paleta:** é a mesma do site atual: turquesa `#009AA7` (marca), `#111013` (fundo), `#272727` (superfícies) e branco. Fica tudo nas variáveis do topo de `styles.css`.
6. **Fonte:** o site atual usa a **Gilroy**, que é paga. O CSS chama Gilroy primeiro e usa a Urbanist (Google Fonts, muito parecida) como alternativa. Se tiverem a licença, coloquem os arquivos em `public/fonts/` e declarem com `@font-face`.

## Página de Compliance (`#compliance`)

A página "Programa de integridade corporativa" é uma extensão da landing page: abre pelo item **Compliance** do menu (ou pelo endereço `…/#compliance`) e usa o mesmo cabeçalho e rodapé. Textos, PDFs e links ficam em `compliance` no `src/data.js`.

**Formulário do Canal de Denúncia:** para receber denúncias de forma anônima, configure `formEndpoint` em `src/data.js` com um endereço que aceite `POST` em JSON (uma API própria ou um serviço como o Formspree). Enquanto `formEndpoint` estiver vazio, o botão **Enviar** abre o e-mail do denunciante com a mensagem pronta para `contato@teasercomunicacao.com`, o que **não** é anônimo.

## Páginas de projeto (`#projeto/<slug>`)

Cada um dos 20 projetos do portfólio tem sua própria página, extensão da landing page (ex.: `…/#projeto/sebrae-empretec`). O "Ver projeto" da vitrine do topo e os cards do portfólio levam até elas. A página mostra os filmes, a galeria de peças (com ampliação em tela cheia, teclado ← → Esc) e os links para o projeto anterior e o próximo.

Os dados ficam em `src/projects.js`:
- `client`: o site oficial não informa o cliente de todos os projetos. Preencha os que estão vazios para aparecerem nos cards e na página.
- Ordem: os 7 primeiros aparecem na vitrine do topo; a ordem do arquivo é a ordem do portfólio e da navegação anterior/próximo.
- Imagens e vídeos ainda vêm do WordPress atual (`U`). Ao migrar, copie os arquivos para `public/` e troque `U`.
- O filme de "São João Gov 2024" está em `.mov`, formato que alguns navegadores não tocam; o ideal é convertê-lo para `.mp4`.

