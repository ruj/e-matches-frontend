const { API_URL } = process.env

const createApiRoute = (path: string) =>
  API_URL + `/api${!path.startsWith('/') ? '/' + path : path}`

const Countries = {
  US: 'Estados Unidos',
  EU: 'Europa',
  RU: 'Rússia',
  UA: 'Ucrânia',
  BR: 'Brasil',
  SE: 'Suécia',
  BE: 'Bélgica',
  PE: 'Peru',
  JP: 'Japão',
  KR: 'Coreia do Sul',
  TW: 'Taiwan',
  FJ: 'Fiji',
  AO: 'Angola',
  ES: 'Espanha',
  MM: 'Burma',
  IM: 'Ilha de Man',
  MK: 'Macedónia',
  UZ: 'Uzbequistão',
  FR: 'França',
  CO: 'Colombia'
}

const MatchStatus = {
  P: 'Pendente',
  S: 'Em andamento',
  F: 'Finalizada',
  C: 'Cancelada'
}

const Menu = [
  { path: '/matches', title: 'Partidas' },
  { path: '/arenas', title: 'Arenas' },
  { path: '/teams', title: 'Equipes' }
]

export { createApiRoute, Countries, MatchStatus, Menu }
