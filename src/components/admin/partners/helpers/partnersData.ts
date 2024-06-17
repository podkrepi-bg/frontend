import { partnerUrls } from 'common/routes'

type Partners = {
  title: string
  name: string
  image: string
  website: string
}

type MainPartners = {
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
    title: 'partners:sections.UXAndDesign',
    name: 'lucrat',
    image: '/img/partners/lucrat.svg',
    website: partnerUrls.lucrat,
  },
]

export const mainPartners: MainPartners[] = [
  {
    title: 'partners:sections.media',
    items: ['darik', 'tv1', 'ideaComm'],
    websites: partnerUrls.mediaPartners,
  },
  {
    title: 'partners:sections.tech',
    items: ['softuni', 'mentormate', 'eightyEight', 'irisSolutions'],
    websites: partnerUrls.techPartners,
  },
  {
    title: 'partners:sections.marketing',
    items: ['crossRoads'],
    websites: partnerUrls.marketingPartners,
  },
  {
    title: 'partners:sections.video',
    items: ['kotaOne', 'estProduction'],
    websites: partnerUrls.videoPartners,
  },
  // {
  //   title: 'partners:sections.UXAndDesign',
  //   items: ['lucrat'],
  //   websites: partnerUrls.lucrat,
  // },
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

export const allPartners = [
  {
    name: 'superhosting',
    image: '/img/partners/superhosting.svg',
    website: partnerUrls.superHosting,
  },
  {
    name: 'kotaOne',
    image: '/img/partners/kotaOne.svg',
    website: partnerUrls.kotaOne,
  },
  {
    name: 'darik',
    image: '/img/partners/darik.svg',
    website: partnerUrls.darik,
  },
  {
    name: 'softuni',
    image: '/img/partners/softuni.svg',
    website: partnerUrls.softuni,
  },
  {
    name: 'mentormate',
    image: '/img/partners/mentormate.svg',
    website: partnerUrls.mentormate,
  },
  {
    name: '88studiodesign',
    image: '/img/partners/eightyEight.svg',
    website: partnerUrls.eightyEight,
  },
  {
    name: 'crossroadsBulgaria',
    image: '/img/partners/crossRoads.svg',
    website: partnerUrls.crossroadsBulgaria,
  },
  {
    name: 'estProduction',
    image: '/img/partners/estProduction.svg',
    website: partnerUrls.estProduction,
  },
  {
    name: 'tv1',
    image: '/img/partners/tv1.svg',
    website: partnerUrls.tv1,
  },
  {
    name: 'ideaComm',
    image: '/img/partners/ideaComm.svg',
    website: partnerUrls.ideaComm,
  },
  {
    name: 'irisSolutions',
    image: '/img/partners/irisSolutions.svg',
    website: partnerUrls.irisSolutions,
  },
  {
    name: 'lucrat',
    image: '/img/partners/lucrat.svg',
    website: partnerUrls.lucrat,
  },
]
