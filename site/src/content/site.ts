// Todo o texto da página. Cada fato tem fonte em ../docs/FONTES.md; o que falta fica em ../BRIEFING.md.

export const BRAND = {
  name: 'Sítio Vó Edite',
  place: 'Ribeirão Pequeno, Laguna (SC)',
  whatsapp: '5548996455846',
  whatsappLabel: '(48) 99645-5846',
  instagram: 'https://www.instagram.com/sitiovoeditee/',
  maps: 'https://www.google.com/maps/search/?api=1&query=S%C3%ADtio%20V%C3%B3%20Edite%2C%20Ribeir%C3%A3o%20Pequeno%2C%20Laguna',
  route: 'https://www.google.com/maps/dir/?api=1&destination=-28.4946875,-48.8883125',
  lat: -28.4946875,
  lon: -48.8883125,
}

export const HERO = {
  title: 'Sua festa na beira da lagoa',
  lead: 'Salão rústico, cabanas e bichos soltos no Ribeirão Pequeno, em Laguna. Para a equipe da empresa ou para a família.',
}

export type ImageName =
  | 'cabanas-por-do-sol' | 'portal-entrada' | 'trapiche-cachorro' | 'trapiche-lagoa' | 'gansos-lagoa'
  | 'por-do-sol-lagoa' | 'cavalo-cabana' | 'cavalo-capela' | 'peru' | 'barraca-lagoa' | 'cabana-galinhas'
  | 'ponei-galinhas' | 'salao-forro' | 'salao-mesas' | 'salao-mesa-posta'

/** Lugares anotados no croqui. Posições em pixels do mosaico de satélite; aproximadas (a confirmar com o sítio). */
export type Spot = {
  id: string
  label: string
  x: number
  y: number
  /** lado onde a anotação manuscrita fica em relação ao ponto */
  side: 'left' | 'right' | 'top' | 'bottom'
  image: ImageName
  alt: string
  caption: string
}

export const SPOTS: Spot[] = [
  {
    id: 'salao', label: 'salão de festas', x: 838, y: 950, side: 'left', image: 'salao-forro',
    alt: 'Forro de madeira do salão com bandeirinhas coloridas penduradas',
    caption: 'Salão de madeira, entregue decorado. Tem cozinha industrial, cervejeira, geladeira e churrasqueira.',
  },
  {
    id: 'cabanas', label: 'cabanas', x: 880, y: 954, side: 'top', image: 'cabanas-por-do-sol',
    alt: 'Cabanas de madeira sobre palafitas no gramado, com o céu laranja do fim de tarde',
    caption: 'Cabanas de madeira sobre palafitas. O sítio também recebe hóspedes.',
  },
  {
    id: 'trapiche', label: 'trapiche', x: 893, y: 990, side: 'right', image: 'trapiche-cachorro',
    alt: 'Trapiche de madeira entrando na lagoa, com um cachorro branco parado sobre as tábuas',
    caption: 'Trapiche na lagoa, para foto, pescaria e fim de tarde.',
  },
  {
    id: 'bichos', label: 'pasto dos bichos', x: 800, y: 960, side: 'bottom', image: 'cavalo-cabana',
    alt: 'Cavalo marrom pastando na grama em frente a uma cabana de madeira',
    caption: 'Cavalos, pôneis, gansos, galinhas e perus andam soltos pelo gramado.',
  },
  {
    id: 'entrada', label: 'entrada', x: 857, y: 932, side: 'top', image: 'portal-entrada',
    alt: 'Portal de troncos com a placa do Sítio Vó Edite e a lagoa ao fundo',
    caption: 'O portal do sítio, com a lagoa logo atrás.',
  },
]

export const EVENT_TYPES = [
  { id: 'empresa', label: 'Confraternização de empresa', message: 'uma confraternização de empresa' },
  { id: 'aniversario', label: 'Aniversário', message: 'um aniversário' },
  { id: 'familia', label: 'Encontro de família', message: 'um encontro de família' },
  { id: 'outra', label: 'Outra festa', message: 'uma festa' },
] as const

export const PERIODS = [
  { id: 'dia', label: 'Dia' },
  { id: 'noite', label: 'Noite' },
  { id: 'dia-e-noite', label: 'Dia e noite' },
] as const

/** Post do sítio de 01/07/2026: "Incluso". */
export const INCLUDED = [
  { icon: 'flag', title: 'Salão decorado', text: 'O espaço chega pronto, com a decoração do sítio.' },
  { icon: 'cooking', title: 'Cozinha industrial', text: 'Para quem traz o próprio buffet ou cozinha no local.' },
  { icon: 'fire', title: 'Churrasqueira', text: 'O churrasco da confraternização fica do lado do salão.' },
  { icon: 'beer', title: 'Cervejeira e geladeira', text: 'Bebida gelada sem depender de caixa de isopor.' },
  { icon: 'broom', title: 'Sem taxa de limpeza', text: 'A limpeza depois da festa não entra na conta.' },
  { icon: 'chat', title: 'Assessoria para o evento', text: 'O sítio ajuda a organizar, do pedido ao dia da festa.' },
] as const

export const AUDIENCES = [
  {
    id: 'empresa',
    title: 'Para a empresa',
    subtitle: 'Confraternização de fim de ano',
    text: 'Leve a equipe para longe do escritório: salão coberto, churrasqueira, cervejeira e a lagoa do lado. Com privacidade total, de dia ou à noite.',
    image: 'salao-mesas' as ImageName,
    alt: 'Mesas e cadeiras de madeira no salão do sítio, à noite',
  },
  {
    id: 'familia',
    title: 'Para a família',
    subtitle: 'Aniversário, encontro, festa junina',
    text: 'Espaço amplo para juntar todo mundo, os bichos soltos para as crianças conhecerem e o salão decorado para a festa.',
    image: 'ponei-galinhas' as ImageName,
    alt: 'Pônei malhado andando no gramado entre galinhas, com a lagoa ao fundo',
  },
] as const

export const GALLERY: { image: ImageName; alt: string; caption: string }[] = [
  { image: 'gansos-lagoa', alt: 'Dois gansos nadando na lagoa calma, com morros verdes do outro lado', caption: 'A lagoa de manhã' },
  { image: 'trapiche-lagoa', alt: 'Trapiche estreito avançando na lagoa azul entre árvores', caption: 'O trapiche' },
  { image: 'salao-mesa-posta', alt: 'Mesa posta no salão com toalha de girassóis e bandeja de salgados', caption: 'Mesa posta no salão' },
  { image: 'cavalo-capela', alt: 'Cavalo pastando perto de uma pequena capela branca no gramado', caption: 'A capelinha e o gramado' },
  { image: 'por-do-sol-lagoa', alt: 'Sol se pondo e refletindo na água, entre nuvens alaranjadas', caption: 'Fim de tarde na água' },
  { image: 'cabana-galinhas', alt: 'Cabana de madeira sobre palafitas com galinhas e uma ovelha no gramado', caption: 'Cabana e vizinhança' },
  { image: 'barraca-lagoa', alt: 'Barraca azul montada no gramado à beira da lagoa', caption: 'Gramado na margem' },
  { image: 'peru', alt: 'Peru caminhando perto de uma árvore no chão de terra', caption: 'Um dos moradores' },
]

export const ARRIVAL = {
  title: 'Como chegar',
  text: 'O sítio fica no Ribeirão Pequeno, interior de Laguna, na margem da lagoa. O último trecho é estrada de chão.',
  address: 'Ribeirão Pequeno, Laguna (SC), 88790-000',
}

export const DEMO_NOTE =
  'Demonstração preparada por Bruno Luque para apresentar ao Sítio Vó Edite. Fotos do Instagram e do Google Maps do sítio, usadas só nesta prévia. O croqui traça a margem a partir de imagem de satélite (Esri); as posições do salão, das cabanas e do trapiche são aproximadas.'
