type Partners = {
  title: string
  name: string
  image: string
}

type TechAndMarketingPartners = {
  title: string
  items: string[]
}

export const partners: Partners[] = [
  {
    title: 'partners:sections.hosting',
    name: 'superhosting',
    image: '/img/partners/superhosting.svg',
  },
  { title: 'partners:sections.video', name: 'rinkoff', image: '/img/partners/rinkoff.svg' },
  { title: 'partners:sections.media', name: 'darik', image: '/img/partners/darik.svg' },
]

export const techAndMarketingPartners: TechAndMarketingPartners[] = [
  {
    title: 'partners:sections.tech',
    items: ['softuni', 'mentormate', 'eightyEight'],
  },
  {
    title: 'partners:sections.marketing',
    items: ['allChannels', 'brainDonors', 'crossRoads'],
  },
]

export const organizationLogos: string[] = [
  'pulsFoundation',
  'yanika',
  'parakids',
  'trotoara',
  'bear',
  'visuallyImpairedChildren',
  'gorata',
]
