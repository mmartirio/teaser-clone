// Conteúdo extraído de https://teasercomunicacao.com.br/
// As imagens apontam para o site atual. Para não depender dele,
// baixe-as para /public/img e troque as URLs abaixo.
const U = 'https://teasercomunicacao.com.br/wp-content/uploads'

export const company = {
  name: 'Teaser Comunicação',
  logo: `${U}/2025/07/logo-teaser-azul.png`, // logo azul (fundos claros)
  icon: `${U}/2025/07/icone-branco-teaser.png`, // ícone branco (fundos escuros)
  gptw: `${U}/2025/10/greatplacetowork-teaser.png`,
  phone: '+55 79 3255-1487',
  phoneHref: 'tel:+557932551487',
  whatsapp: '557932551487',
  email: 'contato@teasercomunicacao.com',
  careers: 'trabalhenateaser@teasercomunicacao.com',
  address: 'Rua Antônio Andrade, 1246 · Coroa do Meio',
  city: 'Aracaju / SE · CEP 49035-050',
  mapsHref:
    'https://www.google.com/maps/search/?api=1&query=Rua+Ant%C3%B4nio+Andrade+1246+Coroa+do+Meio+Aracaju',
  // Mesmo mapa do Google usado no site atual (zoom aproximado para a rua)
  mapEmbed:
    'https://maps.google.com/maps?q=Rua%20Ant%C3%B4nio%20Andrade%2C%20N%C2%BA%201246%2C%20Coroa%20do%20Meio%2C%20CEP%3A%2049035-050%20-%20Aracaju%2C%20Sergipe&t=m&z=16&output=embed&iwloc=near',
  directionsHref:
    'https://www.google.com/maps/dir/?api=1&destination=Rua+Ant%C3%B4nio+Andrade+1246+Coroa+do+Meio+Aracaju+SE',
  social: [
    { label: 'Instagram', href: 'https://www.instagram.com/agencia.teaser/' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/company/teasercomunicacao/' },
    { label: 'YouTube', href: 'https://www.youtube.com/@agencia.teaser' },
    { label: 'SoundCloud', href: 'https://soundcloud.com/teasercomunicacao' },
  ],
}

// Programa de Integridade Corporativa (textos e documentos do site oficial)
export const compliance = {
  title: 'Programa de integridade corporativa',
  intro:
    'Compliance consiste em uma série de processos ligados às regulamentações e normas internas, que se traduzem em princípios éticos, morais e transparentes durante a execução das nossas operações. A finalidade é harmonizar as atividades da empresa com as políticas e orientações predefinidas, bem como com os requisitos dos órgãos reguladores, garantindo, assim, um caminho sólido e de alta qualidade.',
  channel:
    'Este canal é um meio seguro e eficaz de fazer uma denúncia à Teaser Comunicação. O Canal de Denúncias deve ser utilizado para informar qualquer caso de fraude, corrupção (conforme Lei Anticorrupção n. 12.846/2013 – brasileira e outras leis relacionadas), lavagem de dinheiro, uso indevido da marca, desvios éticos e de conduta, entre outras práticas criminosas, e permite o anonimato do denunciante. Além de ter a identidade preservada, bem como toda a condução do caso ser tratada com sigilo, a Teaser não admite que o denunciante de boa-fé sofra qualquer tipo de retaliação.',
  ethics: {
    title: 'Código de Ética',
    href: `${U}/2025/10/CA%C2%B3digo-de-A_tica.-Teaser.pdf`,
  },
  contracts: [
    {
      title: 'Governo de Sergipe – Contrato Centralizado N. 04/2025',
      href: `${U}/2025/10/2025-SECOM_Contrato-Centralizado-n.-042025-SECOM.pdf`,
    },
    {
      title: 'Prefeitura de Estância – Termo de Contrato nº 10/2025',
      href: `${U}/2025/10/2025-Contrato-Teaser_PME_.pdf`,
    },
  ],
  agilizaHref: 'https://www.agiliza.se.gov.br',
  // Endereço que recebe as denúncias (POST com JSON). Ex.: uma API própria ou um serviço como Formspree.
  // Enquanto estiver vazio, o formulário abre o e-mail do denunciante (sem anonimato).
  formEndpoint: '',
  fallbackEmail: 'contato@teasercomunicacao.com',
}

export const waLink = (msg = 'Olá, Teaser! Gostaria de conversar sobre um projeto.') =>
  `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(msg)}`

export const nav = [
  { id: 'topo', label: 'Início' },
  { id: 'servicos', label: 'Serviços' },
  { id: 'portfolio', label: 'Portfólio' },
  { id: 'sobre', label: 'A Teaser' },
  { id: 'clientes', label: 'Clientes' },
  { id: 'equipe', label: 'Equipe' },
]

export const stats = [
  { value: '2008', label: 'no mercado sergipano' },
  { value: '20+', label: 'campanhas no portfólio' },
  { value: 'GPTW', label: 'certificada Great Place to Work' },
]

export const services = [
  {
    title: 'Campanhas',
    text: 'Conceito criativo, roteiro e peças para todos os meios, do outdoor ao feed, com uma ideia central forte.',
  },
  {
    title: 'Comunicação digital',
    text: 'Conteúdo, redes sociais e performance para marcas que precisam conversar com gente de verdade, todo dia.',
  },
  {
    title: 'Planejamento estratégico',
    text: 'Pesquisa, análise de mercado e posicionamento antes da primeira peça. Criatividade com foco no negócio.',
  },
  {
    title: 'Planejamento de mídia',
    text: 'Distribuição inteligente da verba entre TV, rádio, OOH e digital para chegar a quem importa.',
  },
  {
    title: 'Comunicação pública',
    text: 'Experiência com governo e instituições: campanhas de utilidade pública, grandes eventos e prestação de contas.',
  },
  {
    title: 'Marca e institucional',
    text: 'Identidade, reposicionamento e campanhas institucionais que traduzem a história e o propósito da empresa.',
  },
]


// Logos de clientes (mesmos arquivos e ordem do site oficial)
export const clientLogos = [
  [86, 'Governo do Estado de Sergipe'],
  [85, 'Sebrae'],
  [69, 'Prefeitura de Estância'],
  [74, 'CDL Aracaju'],
  [73, 'Colégio do Salvador'],
  [70, 'Grupo Mor'],
  [77, 'JFilhos Construtora'],
  [79, 'Santa Maria Construção e Incorporação'],
  [78, 'Jotanunes Construtora'],
  [80, 'Impacto Construções'],
  [81, 'Urbane Incorporadora'],
  [84, 'Primasa Camel'],
  [82, 'HECA Construtora'],
  [83, 'Icon Engenharia'],
  [75, 'Next Casa Construtora'],
  [72, 'Colégio Uni+'],
].map(([n, name]) => ({ name, src: `${U}/2025/07/Asset-${n}@2x-2-1.png` }))

// Depoimentos (texto completo do site oficial). "highlight" é um trecho do próprio depoimento.
export const testimonials = [
  {
    highlight: 'Além de cuidar da nossa marca, entrega inteligência criativa.',
    quote:
      'A Teaser é uma parceira de longa data, que além de cuidar da nossa marca, entrega inteligência criativa. Juntos colecionamos cases e sucessos de vendas dos nossos empreendimentos.',
    name: 'Sérgio Smith Jr.',
    role: 'Diretor da Primasa Camel',
    logo: `${U}/2025/07/Asset-84@2x-2-1.png`,
    company: 'Primasa Camel',
  },
  {
    highlight: 'Hoje, para mim, a Teaser é a agência de referência no Nordeste.',
    quote:
      'Hoje, para mim, a Teaser é a agência de referência no Nordeste. Acredito que grande parte do crescimento e da evolução do Colégio do Salvador no mercado de Aracaju também se deve a essa parceria. A agência está junto com a gente em todo o processo e isso vem contribuindo demais para o posicionamento do colégio.',
    name: 'Fabiana Lemos',
    role: 'Coordenadora de Marketing Nordeste do Grupo Salta',
    logo: `${U}/2025/07/Asset-73@2x-2-1.png`,
    company: 'Colégio do Salvador',
  },
  {
    highlight: 'Criatividade, comprometimento e qualidade nas entregas.',
    quote:
      'Trabalhar com a Teaser Propaganda tem sido uma experiência extremamente positiva. Como diretora de marketing do Governo de Sergipe, reconheço o quanto é essencial ter uma agência parceira que compreenda a responsabilidade e os desafios da comunicação pública. A Teaser demonstra, em cada projeto, criatividade, comprometimento e qualidade nas entregas. Destaco também o cuidado e a precisão no planejamento de mídia, que garantem eficiência na aplicação dos recursos e alcance efetivo das campanhas. É uma equipe que trabalha com seriedade, escuta atenta e olhar estratégico, contribuindo para fortalecer a imagem e a presença do Governo de Sergipe.',
    name: 'Laisa Sobral',
    role: 'Diretora de Marketing, Governo de Sergipe',
    logo: `${U}/2025/07/Asset-86@2x-2-1.png`,
    company: 'Governo de Sergipe',
  },
]

export const team = [
  { name: 'Rodrigo de Freitas', role: 'Diretor de Atendimento', photo: `${U}/2025/07/1-Rodrigo-de-Freitas-Diretor-de-Atendimento_.jpg` },
  { name: 'Hugo Giovani', role: 'Diretor de Atendimento', photo: `${U}/2025/09/IMG_3331-scaled-e1758573848234.jpg` },
  { name: 'Ingrid Freitas', role: 'Executiva de Contas', photo: `${U}/2025/07/3-Ingrid-Freitas-Executiva-de-contas.jpg` },
  { name: 'Marcelo Pinheiro', role: 'Executivo de Contas', photo: `${U}/2025/07/7-Marcelo-Pinheiro-Diretor-de-Criacao.jpg` },
]
