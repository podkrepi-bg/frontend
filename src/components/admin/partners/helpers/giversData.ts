type GiversConfig = {
  title: string
  subtitle: string
  givers: Givers[]
}

type Givers = {
  image: string
  name: string
}

export const givers: GiversConfig[] = [
  {
    title: 'partners:guarants.megaGivers',
    subtitle: 'partners:guarants.megaGiversSubtitle',
    givers: [
      { image: 'VasilTerziev', name: 'Васил Терзиев' },
      { image: 'ElisavetaGrobler', name: 'Елисавета Грьоблер' },
    ],
  },
  {
    title: 'partners:guarants.superGivers',
    subtitle: 'partners:guarants.superGiversSubtitle',
    givers: [
      { image: 'SvetlinNakov', name: 'Светлин Наков' },
      { image: 'GenchoKerezov', name: 'Генчо Керезов' },
    ],
  },
]
