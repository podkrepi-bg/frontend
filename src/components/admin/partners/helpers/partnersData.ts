type Partners = {
  title: string
  name: string
  image: string
  website: string
}

type TechAndMarketingPartners = {
  title: string
  items: string[]
  websites: string[]
}

type Organizations = {
  name: string
  website: string
}

export const partners: Partners[] = [
  {
    title: 'partners:sections.hosting',
    name: 'superhosting',
    image: '/img/partners/superhosting.svg',
    website: 'https://www.superhosting.bg/',
  },
  {
    title: 'partners:sections.video',
    name: 'rinkoff',
    image: '/img/partners/rinkoff.svg',
    website: 'https://www.linkedin.com/company/rinkoff/about/',
  },
  {
    title: 'partners:sections.media',
    name: 'darik',
    image: '/img/partners/darik.svg',
    website: 'https://dariknews.bg/',
  },
]

export const techAndMarketingPartners: TechAndMarketingPartners[] = [
  {
    title: 'partners:sections.tech',
    items: ['softuni', 'mentormate', 'eightyEight'],
    websites: ['https://softuni.bg/', 'https://mentormate.com/', 'https://www.88studiodesign.com/'],
  },
  {
    title: 'partners:sections.marketing',
    items: ['allChannels', 'brainDonors', 'crossRoads'],
    websites: [
      'https://www.all-channels.com/',
      'https://www.braindonors.agency/',
      'https://crossroadsbulgaria.com/',
    ],
  },
]

export const organizations: Organizations[] = [
  {
    name: 'pulsFoundation',
    website: 'https://pulsfoundation.org/bg/',
  },
  {
    name: 'yanika',
    website: 'https://www.yanikabg.com/',
  },
  {
    name: 'parakids',
    website: 'https://parakids.org/',
  },
  {
    name: 'trotoara',
    website: 'https://trotoara.com/',
  },
  {
    name: 'bear',
    website: 'https://plushenomeche.org/',
  },
  {
    name: 'visuallyImpairedChildren',
    website: 'http://www.suunzvarna.com/',
  },
  {
    name: 'gorata',
    website: 'https://gorata.bg/',
  },
]
