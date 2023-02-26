import { partnerUrls } from 'common/routes'

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
    website: partnerUrls.superHosting,
  },
  {
    title: 'partners:sections.video',
    name: 'rinkoff',
    image: '/img/partners/rinkoff.svg',
    website: partnerUrls.rinkoff,
  },
  {
    title: 'partners:sections.media',
    name: 'darik',
    image: '/img/partners/darik.svg',
    website: partnerUrls.darik,
  },
]

export const techAndMarketingPartners: TechAndMarketingPartners[] = [
  {
    title: 'partners:sections.tech',
    items: ['softuni', 'mentormate', 'eightyEight'],
    websites: partnerUrls.techPartners,
  },
  {
    title: 'partners:sections.marketing',
    items: ['allChannels', 'brainDonors', 'crossRoads'],
    websites: partnerUrls.marketingPartners,
  },
]

export const organizations: Organizations[] = [
  {
    name: 'pulsFoundation',
    website: partnerUrls.puls,
  },
  {
    name: 'yanika',
    website: partnerUrls.yanika,
  },
  {
    name: 'parakids',
    website: partnerUrls.parakids,
  },
  {
    name: 'trotoara',
    website: partnerUrls.trotoara,
  },
  {
    name: 'bear',
    website: partnerUrls.bear,
  },
  {
    name: 'visuallyImpairedChildren',
    website: partnerUrls.visuallyImpairedChildren,
  },
  {
    name: 'gorata',
    website: partnerUrls.gorata,
  },
]
