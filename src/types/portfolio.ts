export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'campaign' | 'series' | 'convention';
  categoryLabel: string;
  year?: string;
  client: string;
  role: string;
  summary: string;
  description: string;
  coverImage: string;
  mediaType: 'video' | 'image' | 'interactive';
  /** Link de partilha do vídeo (Box ou Google Drive). É reproduzido dentro do site. */
  videoUrl?: string;
  /** Canais / entregas do projeto */
  tools: string[];
  duration?: string;
  featured?: boolean;
  externalLink?: string;
  highlights?: string[];
  /** Imagens extra (ex.: várias temporadas); aparecem como miniaturas clicáveis */
  gallery?: { src: string; label: string }[];
}

export interface ThemeConfig {
  id: string;
  name: string;
  description: string;
  bgBase: string;
  bgSurface: string;
  bgGlass: string;
  border: string;
  borderHover: string;
  accent: string;
  accentSoft: string;
  accentGlow: string;
  textMain: string;
  textMuted: string;
  waterHighlight: string;
  isLight?: boolean;
}

export interface ProfileData {
  name: string;
  title: string;
  bioHeadline: string;
  bioParagraph1: string;
  bioParagraph2: string;
  email: string;
  location: string;
  availability: string;
  socials: {
    vimeo: string;
    behance: string;
    linkedin: string;
    instagram: string;
    github: string;
  };
}

export const THEMES: ThemeConfig[] = [
  {
    id: 'sage-jade',
    name: 'Sálvia & Jade',
    description: 'Verde orgânico sereno com reflexos de água cristalina',
    bgBase: '#0a120e',
    bgSurface: '#111d17',
    bgGlass: 'rgba(17, 29, 23, 0.78)',
    border: 'rgba(94, 150, 126, 0.22)',
    borderHover: 'rgba(120, 195, 160, 0.45)',
    accent: '#52b788',
    accentSoft: 'rgba(82, 183, 136, 0.16)',
    accentGlow: 'rgba(82, 183, 136, 0.35)',
    textMain: '#edf5f0',
    textMuted: '#94aba0',
    waterHighlight: '#74c69d',
  },
  {
    id: 'deep-forest',
    name: 'Floresta Profunda',
    description: 'Tons densos de pinheiro silvestre e esmeralda escuro',
    bgBase: '#060d09',
    bgSurface: '#0b1710',
    bgGlass: 'rgba(11, 23, 16, 0.8)',
    border: 'rgba(45, 106, 79, 0.3)',
    borderHover: 'rgba(82, 183, 136, 0.5)',
    accent: '#40916c',
    accentSoft: 'rgba(64, 145, 108, 0.2)',
    accentGlow: 'rgba(64, 145, 108, 0.4)',
    textMain: '#f0fdf4',
    textMuted: '#89a896',
    waterHighlight: '#52b788',
  },
  {
    id: 'river-slate',
    name: 'Rio & Ardósia',
    description: 'Ciano e musgo aquático, inspirado no leito dos rios rochosos',
    bgBase: '#081112',
    bgSurface: '#0f1d1f',
    bgGlass: 'rgba(15, 29, 31, 0.78)',
    border: 'rgba(56, 139, 136, 0.25)',
    borderHover: 'rgba(87, 184, 178, 0.45)',
    accent: '#38a3a5',
    accentSoft: 'rgba(56, 163, 165, 0.18)',
    accentGlow: 'rgba(56, 163, 165, 0.35)',
    textMain: '#ebf6f6',
    textMuted: '#8eaab0',
    waterHighlight: '#57cc99',
  },
  {
    id: 'moss-minimal',
    name: 'Musgo & Terra',
    description: 'Verde oliva terroso, estética wabi-sabi contemplativa',
    bgBase: '#0e110c',
    bgSurface: '#161c14',
    bgGlass: 'rgba(22, 28, 20, 0.8)',
    border: 'rgba(120, 135, 95, 0.25)',
    borderHover: 'rgba(155, 175, 120, 0.45)',
    accent: '#9ba17b',
    accentSoft: 'rgba(155, 161, 123, 0.2)',
    accentGlow: 'rgba(155, 161, 123, 0.35)',
    textMain: '#f4f5f0',
    textMuted: '#a3a897',
    waterHighlight: '#b5be90',
  },
  {
    id: 'morning-mist',
    name: 'Névoa Menta (Dia)',
    description: 'Canvas translúcido luminoso e arejado com notas de menta suave',
    bgBase: '#f4f7f4',
    bgSurface: '#ffffff',
    bgGlass: 'rgba(255, 255, 255, 0.88)',
    border: 'rgba(60, 120, 90, 0.16)',
    borderHover: 'rgba(40, 110, 80, 0.35)',
    accent: '#2d6a4f',
    accentSoft: 'rgba(45, 106, 79, 0.12)',
    accentGlow: 'rgba(45, 106, 79, 0.25)',
    textMain: '#132a1e',
    textMuted: '#526e60',
    waterHighlight: '#40916c',
    isLight: true,
  },
  {
    id: 'daylight-sage',
    name: 'Sálvia Solar (Dia)',
    description: 'Luminosidade natural e orgânica com tons de folha verde e água cristalina',
    bgBase: '#f7faf7',
    bgSurface: '#ffffff',
    bgGlass: 'rgba(255, 255, 255, 0.92)',
    border: 'rgba(82, 145, 112, 0.2)',
    borderHover: 'rgba(60, 130, 95, 0.4)',
    accent: '#1e5f41',
    accentSoft: 'rgba(30, 95, 65, 0.12)',
    accentGlow: 'rgba(30, 95, 65, 0.25)',
    textMain: '#0f241a',
    textMuted: '#4f6c5e',
    waterHighlight: '#38a3a5',
    isLight: true,
  },
];

export const INITIAL_PROFILE: ProfileData = {
  name: 'Carmen Fernandes',
  title: 'Produção Publicitária · Atendimento · Multimédia (em formação)',
  bioHeadline:
    'Profissional com experiência em atendimento e produção de campanhas publicitárias, atuando na organização de projetos, gestão de cronogramas e comunicação entre clientes e equipas criativas.',
  bioParagraph1:
    'Atualmente frequento o Curso Técnico de Desenvolvimento de Produtos Multimédia, ampliando as minhas competências em design, produção audiovisual, desenvolvimento web e conteúdos digitais.',
  bioParagraph2:
    'Áreas de atuação: Atendimento, Produção Publicitária e Desenvolvimento de Produtos Multimédia (em formação).',
  email: 'minhafernandes03@gmail.com',
  location: 'Viana do Castelo, Portugal',
  availability: 'Em formação: Curso Técnico de Desenvolvimento de Produtos Multimédia.',
  // Preenche os links que quiseres mostrar; os vazios não aparecem no site.
  socials: {
    vimeo: '',
    behance: '',
    linkedin: '',
    instagram: '',
    github: '',
  },
};

const ATUACAO =
  'Atuação: produção, atendimento e coordenação do projeto. As peças gráficas e audiovisuais foram desenvolvidas pela equipa criativa da agência.';

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'campanha-360',
    title: 'Campanha 360: do Conceito aos Resultados',
    subtitle: 'Conceito criativo, produção e análise de resultados',
    category: 'campaign',
    categoryLabel: 'Campanha 360',
    client: 'Agência de publicidade',
    role: 'Produção, atendimento e coordenação',
    summary:
      'Vídeo que explica o conceito criativo e a produção de uma campanha 360, como foi feita e a análise dos resultados.',
    description:
      'Vídeo que explica o conceito criativo e a produção de uma campanha 360, como foi feita e a análise dos resultados da campanha, mostrando as peças entregues: digitais, OOH e redes sociais.',
    coverImage: '/images/campanha-360.jpg',
    mediaType: 'video',
    videoUrl: 'https://drive.google.com/file/d/12QNqs4kOhyCxHgBjFVwFOCQDtJnl2hSJ/view?usp=drive_link',
    tools: ['Peças digitais', 'OOH', 'Redes sociais'],
    featured: true,
    externalLink: 'https://drive.google.com/file/d/12QNqs4kOhyCxHgBjFVwFOCQDtJnl2hSJ/view?usp=drive_link',
    highlights: [ATUACAO],
  },
  {
    id: 'the-boys',
    title: 'The Boys · Temporadas 2, 3 e 4',
    subtitle: 'Campanhas Prime Video',
    category: 'series',
    categoryLabel: 'Séries & Streaming',
    client: 'Amazon Prime Video',
    role: 'Produção, atendimento e coordenação',
    summary: 'Campanhas de divulgação das temporadas 2, 3 e 4 de The Boys no Prime Video.',
    description:
      'Campanhas de divulgação das temporadas 2, 3 e 4 de The Boys no Prime Video. Fui responsável pela produção, atendimento e coordenação do projeto, em colaboração com a equipa criativa da agência. Nas miniaturas podes ver as peças de cada temporada.',
    coverImage: '/images/the-boys-s4.jpg',
    mediaType: 'video',
    videoUrl: 'https://drive.google.com/file/d/1CuQnNz-naU-dNczYBp7aRRTQr_7fC9D7/view?usp=drive_link',
    tools: ['Peça gráfica', 'Vídeo'],
    externalLink: 'https://drive.google.com/file/d/1CuQnNz-naU-dNczYBp7aRRTQr_7fC9D7/view?usp=drive_link',
    highlights: [ATUACAO],
    gallery: [
      { src: '/images/the-boys-s2.jpg', label: 'Temporada 2' },
      { src: '/images/the-boys-s3.jpg', label: 'Temporada 3' },
      { src: '/images/the-boys-s3-horizontal.jpg', label: 'Temporada 3 · horizontal' },
      { src: '/images/the-boys-s4.jpg', label: 'Temporada 4' },
    ],
  },
  {
    id: 'reacher-s2',
    title: 'Reacher · Temporada 2',
    subtitle: 'Campanha Prime Video',
    category: 'series',
    categoryLabel: 'Séries & Streaming',
    client: 'Amazon Prime Video',
    role: 'Produção, atendimento e coordenação',
    summary: 'Campanha de divulgação da 2.ª temporada de Reacher no Prime Video.',
    description:
      'Campanha de divulgação da 2.ª temporada de Reacher no Prime Video. Fui responsável pela produção, atendimento e coordenação do projeto, em colaboração com a equipa criativa da agência.',
    coverImage: '/images/reacher-s2.jpg',
    mediaType: 'video',
    videoUrl: 'https://drive.google.com/file/d/1IA7khEgLCWC3N4PqykUW18u73dvvaeem/view?usp=drive_link',
    tools: ['Peça gráfica', 'Vídeo'],
    externalLink: 'https://drive.google.com/file/d/1IA7khEgLCWC3N4PqykUW18u73dvvaeem/view?usp=drive_link',
    highlights: [ATUACAO],
  },
  {
    id: 'multititle-its-on-prime',
    title: 'Multititle · It’s On Prime',
    subtitle: 'Campanha Prime Video',
    category: 'campaign',
    categoryLabel: 'Campanha Multititle',
    client: 'Amazon Prime Video',
    role: 'Produção, atendimento e coordenação',
    summary: 'Campanha multititle It’s On Prime, que reúne vários títulos do Prime Video numa só comunicação.',
    description:
      'Campanha multititle It’s On Prime, que reúne vários títulos do Prime Video numa só comunicação. Fui responsável pela produção, atendimento e coordenação do projeto, em colaboração com a equipa criativa da agência.',
    coverImage: '/images/multititle-its-on-prime.jpg',
    mediaType: 'video',
    videoUrl: 'https://drive.google.com/file/d/1dr_CwlSCIbU30yJt-Z3rQCw4w_TOCQkt/view?usp=drive_link',
    tools: ['Peça gráfica', 'Vídeo'],
    externalLink: 'https://drive.google.com/file/d/1dr_CwlSCIbU30yJt-Z3rQCw4w_TOCQkt/view?usp=drive_link',
    highlights: [ATUACAO],
  },
  {
    id: 'hub-find-your-happy-place',
    title: 'HUB · Find Your Happy Place',
    subtitle: 'Campanha Prime Video',
    category: 'campaign',
    categoryLabel: 'Campanha HUB',
    client: 'Amazon Prime Video',
    role: 'Produção, atendimento e coordenação',
    summary: 'Campanha HUB Find Your Happy Place do Prime Video, com vários conteúdos num só aplicativo.',
    description:
      'Campanha HUB Find Your Happy Place do Prime Video, com vários conteúdos num só aplicativo. Fui responsável pela produção, atendimento e coordenação do projeto, em colaboração com a equipa criativa da agência.',
    coverImage: '/images/hub-find-your-happy-place.jpg',
    mediaType: 'video',
    videoUrl: 'https://drive.google.com/file/d/1masbYpQNIMucKR1VZxPRNzPIeUmxPLLQ/view?usp=drive_link',
    tools: ['Peça gráfica', 'Vídeo'],
    externalLink: 'https://drive.google.com/file/d/1masbYpQNIMucKR1VZxPRNzPIeUmxPLLQ/view?usp=drive_link',
    highlights: [ATUACAO],
  },
  {
    id: 'fallout-s2',
    title: 'Fallout · Temporada 2',
    subtitle: 'Campanha Prime Video',
    category: 'series',
    categoryLabel: 'Séries & Streaming',
    client: 'Amazon Prime Video',
    role: 'Produção, atendimento e coordenação',
    summary: 'Campanha de divulgação da 2.ª temporada de Fallout no Prime Video.',
    description:
      'Campanha de divulgação da 2.ª temporada de Fallout no Prime Video. Fui responsável pela produção, atendimento e coordenação do projeto, em colaboração com a equipa criativa da agência.',
    coverImage: '/images/fallout.jpg',
    mediaType: 'video',
    videoUrl: 'https://app.box.com/s/rmvfdtgwtp9ceailehuojfiofr6pls4e',
    tools: ['Peça gráfica', 'Vídeo'],
    externalLink: 'https://app.box.com/s/rmvfdtgwtp9ceailehuojfiofr6pls4e',
    highlights: [ATUACAO],
  },
  {
    id: 'daisy-jones',
    title: 'Daisy Jones & The Six',
    subtitle: 'Campanha Prime Video',
    category: 'series',
    categoryLabel: 'Séries & Streaming',
    client: 'Amazon Prime Video',
    role: 'Produção, atendimento e coordenação',
    summary: 'Campanha de divulgação da série Daisy Jones & The Six no Prime Video.',
    description:
      'Campanha de divulgação da série Daisy Jones & The Six no Prime Video. Fui responsável pela produção, atendimento e coordenação do projeto, em colaboração com a equipa criativa da agência.',
    coverImage: '/images/daisy-jones.jpg',
    mediaType: 'video',
    videoUrl: 'https://app.box.com/s/rd3s90cg9ohxqgdpss2l0fvzxgcwty7z',
    tools: ['Peça gráfica', 'Vídeo'],
    externalLink: 'https://app.box.com/s/rd3s90cg9ohxqgdpss2l0fvzxgcwty7z',
    highlights: [ATUACAO],
  },
  {
    id: 'aneis-de-poder-s2',
    title: 'O Senhor dos Anéis: Os Anéis de Poder · Temporada 2',
    subtitle: 'Campanha Prime Video',
    category: 'series',
    categoryLabel: 'Séries & Streaming',
    client: 'Amazon Prime Video',
    role: 'Produção, atendimento e coordenação',
    summary: 'Campanha de divulgação da 2.ª temporada de O Senhor dos Anéis: Os Anéis de Poder.',
    description:
      'Campanha de divulgação da 2.ª temporada de O Senhor dos Anéis: Os Anéis de Poder no Prime Video. Fui responsável pela produção, atendimento e coordenação do projeto, em colaboração com a equipa criativa da agência.',
    coverImage: '/images/aneis-de-poder.jpg',
    mediaType: 'video',
    videoUrl: 'https://app.box.com/s/bj5zq2i1tv5wvlsuu0sh1p3v6xgrou4q',
    tools: ['Peça gráfica', 'Vídeo'],
    externalLink: 'https://app.box.com/s/bj5zq2i1tv5wvlsuu0sh1p3v6xgrou4q',
    highlights: [ATUACAO],
  },
  {
    id: 'summer-i-turned-pretty-s2',
    title: 'The Summer I Turned Pretty · Temporada 2',
    subtitle: 'Campanha Prime Video',
    category: 'series',
    categoryLabel: 'Séries & Streaming',
    client: 'Amazon Prime Video',
    role: 'Produção, atendimento e coordenação',
    summary: 'Campanha de divulgação da 2.ª temporada de The Summer I Turned Pretty.',
    description:
      'Campanha de divulgação da 2.ª temporada de The Summer I Turned Pretty (O Verão que Mudou Minha Vida) no Prime Video. Fui responsável pela produção, atendimento e coordenação do projeto, em colaboração com a equipa criativa da agência.',
    coverImage: '/images/verao-que-mudou-minha-vida.jpg',
    mediaType: 'video',
    videoUrl: 'https://app.box.com/s/pht4dxtugyup62icwpkpz1uhwp855t2n',
    tools: ['Peça gráfica', 'Vídeo'],
    externalLink: 'https://app.box.com/s/pht4dxtugyup62icwpkpz1uhwp855t2n',
    highlights: [ATUACAO],
  },
  {
    id: 'amazon-fuse-convencao',
    title: 'Amazon Fuse · Vídeo Convenção DTV-SKY',
    subtitle: 'Vídeo de convenção',
    category: 'convention',
    categoryLabel: 'Vídeo Convenção',
    client: 'Amazon Fuse · DTV-SKY',
    role: 'Produção, atendimento e coordenação',
    summary: 'Vídeo desenvolvido para a convenção DTV-SKY do Amazon Fuse.',
    description:
      'Vídeo desenvolvido para a convenção DTV-SKY do Amazon Fuse. Fui responsável pela produção, atendimento e coordenação do projeto, em colaboração com a equipa criativa da agência.',
    coverImage: '/images/amazon-fuse-convencao.jpg',
    mediaType: 'video',
    videoUrl: 'https://app.box.com/s/3nij7gvkbc1jfjt05uwmln3srmkrui2a',
    tools: ['Vídeo'],
    externalLink: 'https://app.box.com/s/3nij7gvkbc1jfjt05uwmln3srmkrui2a',
    highlights: [ATUACAO],
  },
];
