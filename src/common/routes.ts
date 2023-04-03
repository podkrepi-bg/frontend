import getConfig from 'next/config'

const {
  publicRuntimeConfig: { APP_URL },
} = getConfig()

export const baseUrl = APP_URL
export const defaultOgImage = {
  src: `${baseUrl}/img/og_image.jpeg`,
  width: '1640',
  height: '624',
}

export const staticUrls = {
  github:
    'https://github.com/podkrepi-bg/frontend#--%D0%B4%D0%B0%D1%80%D0%B8%D1%82%D0%B5%D0%BB%D1%81%D0%BA%D0%B0-%D0%BF%D0%BB%D0%B0%D1%82%D1%84%D0%BE%D1%80%D0%BC%D0%B0-%D0%BF%D0%BE%D0%B4%D0%BA%D1%80%D0%B5%D0%BF%D0%B8%D0%B1%D0%B3',
  figma: 'https://www.figma.com/file/MmvFKzUv6yE5U2wrOpWtwS/Podkrepi.bg?node-id=3904%3A13406',
  projectDocs: 'https://docs.podkrepi.bg/',
  howToContribute:
    'https://docs.podkrepi.bg/general/communication/faq#kak-da-se-vkliucha-v-organizaciata',
  devDocs: 'https://docs.podkrepi.bg/development',
  hostingProvider: 'https://superhosting.bg?rel=podkrepi.bg',
  eduspace: 'https://eduspace-bg.business.site/',
  dmsBg: 'https://dmsbg.com',
  platformata: 'https://platformata.bg',
}

export const socialUrls = {
  facebook: 'https://www.facebook.com/podkrepi.bg',
  twitter: '/',
  linkedin: 'https://www.linkedin.com/company/podkrepibg',
  youtube: 'https://www.youtube.com/channel/UCt5pYR0DkOCfjlY17awY8pA',
  instagram: 'https://www.instagram.com/podkrepi.bg/',
  discord: 'https://discord.com/invite/nZAeCb9YzP',
}

export const partnerUrls = {
  superHosting: 'https://www.superhosting.bg/',
  rinkoff: 'https://www.linkedin.com/company/rinkoff/about/',
  darik: 'https://dariknews.bg/',
  techPartners: [
    'https://softuni.bg/',
    'https://mentormate.com/',
    'https://www.88studiodesign.com/',
  ],
  marketingPartners: [
    'https://www.all-channels.com/',
    'https://www.braindonors.agency/',
    'https://crossroadsbulgaria.com/',
  ],
  puls: 'https://pulsfoundation.org/bg/',
  yanika: 'https://www.yanikabg.com/',
  parakids: 'https://parakids.org/',
  trotoara: 'https://trotoara.com/',
  bear: 'https://plushenomeche.org/',
  visuallyImpairedChildren: 'http://www.suunzvarna.com/',
  gorata: 'https://gorata.bg/',
}

export const routes = {
  index: '/',
  faq: '/faq',
  faq_campaigns: '/faq/campaigns',
  about: '/about',
  login: '/login',
  logout: '/logout',
  contact: '/contact',
  partners: '/partners',
  support: '/support',
  support_us: '/support_us',
  reports: '/finance-report',
  blog: {
    index: '/blog',
    indexPaginated: (page: number) => `/blog?page=${page}`,
    postBySlug: (slug: string) => `/blog/${slug}`,
    pageBySlug: (slug: string) => `/page/${slug}`,
  },
  campaigns: {
    index: '/campaigns',
    create: '/campaigns/create',
    viewCampaignBySlug: (slug: string) => `/campaigns/${slug}`,
    viewExpenses: (slug: string) => `/campaigns/${slug}/expenses`,
    oneTimeDonation: (slug: string) => `/campaigns/donation/${slug}`,
    expenses: {
      create: (slug: string) => `/campaigns/${slug}/expenses/create`,
      edit: (slug: string, id: string) => `/campaigns/${slug}/expenses/${id}`,
      downloadFile: (id: string) => `/expenses/download-files/${id}`,
    },
  },
  donation: {
    viewCertificate: (donationId: string) => `/api/pdf/certificate/${donationId}`,
  },
  profile: {
    index: '/profile/donations',
    donations: '/profile/donations',
    personalInformation: '/profile/personal-information',
    certificates: '/profile/certificates',
    contractDonation: '/profile/contract-donation',
    myCampaigns: '/profile/my-campaigns',
  },
  register: '/register',
  aboutProject: '/about-project',
  privacyPolicy: '/privacy-policy',
  termsOfService: '/terms-of-service',
  changePassword: '/change-password',
  forgottenPassword: '/forgotten-password',
  admin: {
    index: '/admin',
    infoRequests: '/admin/info-requests',
    supporters: '/admin/supporters',
    bankaccounts: {
      index: '/admin/bankaccounts',
      add: '/admin/bankaccounts/add',
      edit: (id: string | number) => `/admin/bankaccounts/edit/${id}`,
    },
    bankTransactions: {
      index: '/admin/bank-transactions',
    },
    cities: {
      home: '/admin/cities',
      create: '/admin/cities/create',
      viewCityById: (id: string) => `/admin/cities/details/${id}`,
      editCityById: (id: string) => `/admin/cities/edit/${id}`,
    },
    campaigns: {
      index: '/admin/campaigns',
      create: '/admin/campaigns/create',
      viewCampaignBySlug: (slug: string) => `/admin/campaigns/${slug}`,
      edit: (id: string) => `/admin/campaigns/edit/${id}`,
    },
    withdrawals: {
      index: '/admin/withdrawals',
      create: '/admin/withdrawals/create',
      edit: (id: string | string) => `/admin/withdrawals/edit/${id}`,
    },
    coordinators: {
      index: '/admin/coordinators',
      add: '/admin/coordinators/add',
      edit: (id: string | number) => `/admin/coordinators/edit/${id}`,
    },
    documents: {
      index: '/admin/documents',
      create: '/admin/documents/create',
      edit: (slug: string) => `/admin/documents/${slug}/edit`,
    },
    donations: {
      index: '/admin/donations',
      create: '/admin/donations/create',
      edit: (id: string) => `/admin/donations/${id}/edit`,
      addBankTransactionsFile: '/admin/donations/add-bank-transactions-file',
    },
    beneficiary: {
      index: '/admin/beneficiary',
      create: '/admin/beneficiary/create',
      edit: (slug: string) => `/admin/beneficiary/${slug}/edit`,
    },
    campaignTypes: {
      index: '/admin/campaign-types',
      create: '/admin/campaign-types/create',
      edit: (slug: string) => `/admin/campaign-types/${slug}/edit`,
    },
    countries: {
      index: '/admin/countries',
      create: '/admin/countries/create',
      view: (id: string) => `/admin/countries/${id}`,
    },
    expenses: {
      index: '/admin/expenses',
      create: '/admin/expenses/create',
      view: (id: string) => `/admin/expenses/${id}`,
    },
    vaults: {
      index: '/admin/vaults',
      create: '/admin/vaults/create',
      edit: (slug: string) => `/admin/vaults/${slug}/edit`,
    },
    benefactor: {
      index: '/admin/benefactor',
      view: (id: string) => `/admin/benefactor/${id}`,
      add: '/admin/benefactor/add',
    },
    transfer: {
      index: '/admin/transfers',
      create: '/admin/transfers/create',
      view: (id: string) => `/admin/transfers/${id}`,
    },
    recurringDonation: {
      index: '/admin/recurring-donation',
      create: '/admin/recurring-donation/create',
      edit: (id: string) => `/admin/recurring-donation/${id}`,
    },
    irregularity: {
      index: '/admin/irregularities',
      create: '/admin/irregularities/create',
      view: (id: string) => `/admin/irregularities/${id}`,
    },
    organizers: {
      index: '/admin/organizers',
      create: '/admin/organizers/create',
      view: (id: string) => `/admin/organizers/${id}`,
    },
    person: {
      index: '/admin/persons',
      create: '/admin/persons/create',
      view: (id: string) => `/admin/persons/${id}`,
      edit: (id: string) => `/admin/persons/${id}/edit`,
    },
    company: {
      create: '/admin/companies/create',
    },
  },
  dev: {
    openData: '/open-data',
    apiDocs: '/docs',
  },
} as const
