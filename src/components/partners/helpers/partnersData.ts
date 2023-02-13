type Partners = {
  title: string
  name: string
}

type TechAndMarketingPartners = {
  title: string
  items: string[]
}

export const partners: Partners[] = [
  { title: 'partners:sections.hosting', name: 'superhosting' },
  { title: 'partners:sections.video', name: 'rinkoff' },
  { title: 'partners:sections.media', name: 'darik' },
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
