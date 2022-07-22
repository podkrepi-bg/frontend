import getConfig from 'next/config'

const {
  publicRuntimeConfig: { APP_URL },
} = getConfig()

export const baseUrl = APP_URL
export const defaultOgImage = `${baseUrl}/img/og-image.jpg`

export const staticUrls = {
  github:
    'https://github.com/podkrepi-bg/frontend#--%D0%B4%D0%B0%D1%80%D0%B8%D1%82%D0%B5%D0%BB%D1%81%D0%BA%D0%B0-%D0%BF%D0%BB%D0%B0%D1%82%D1%84%D0%BE%D1%80%D0%BC%D0%B0-%D0%BF%D0%BE%D0%B4%D0%BA%D1%80%D0%B5%D0%BF%D0%B8%D0%B1%D0%B3',
  figma: 'https://www.figma.com/file/MmvFKzUv6yE5U2wrOpWtwS/Podkrepi.bg?node-id=3904%3A13406',
  projectDocs: 'https://docs.podkrepi.bg/',
  howToContribute:
    'https://docs.podkrepi.bg/general/communication/faq#kak-da-se-vkliucha-v-organizaciata',
  devDocs: 'https://docs.podkrepi.bg/development',
  blog: 'https://blog.podkrepi.bg/',
  hostingProvider: 'https://superhosting.bg?rel=podkrepi.bg',
  eduspace: 'https://eduspace-bg.business.site/',
}

export const socialUrls = {
  facebook: 'https://www.facebook.com/podkrepi.bg',
  twitter: '/',
  linkedin: 'https://www.linkedin.com/company/podkrepibg',
  youtube: 'https://www.youtube.com/channel/UCt5pYR0DkOCfjlY17awY8pA',
  instagram: 'https://www.instagram.com/podkrepi.bg/',
  discord: 'https://discord.com/invite/nZAeCb9YzP',
}

export const routes = {
  index: '/',
  faq: '/faq',
  about: '/about',
  login: '/login',
  logout: '/logout',
  contact: '/contact',
  support: '/support',
  reports: '/npo/reports',
  campaigns: {
    index: '/campaigns',
    create: '/campaigns/create',
    viewCampaignBySlug: (slug: string) => `/campaigns/${slug}`,
    oneTimeDonation: (slug: string) => `/campaigns/donation/${slug}`,
  },
  donation: {
    viewCertificate: (donationId: string) => `/api/pdf/certificate/${donationId}`,
  },
  profile: {
    index: '/profile',
    donations: '/profile/donations',
    personalInformation: '/profile/personal-information',
    certificates: '/profile/certificates',
    contractDonation: '/profile/contract-donation',
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
      view: (id: string) => `/admin/recurring-donation/${id}`,
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
      create: '/admin/persons/create',
    },
    company: {
      create: '/admin/companies/create',
    },
  },
  dev: {
    openData: '/open-data',
    apiDocs: '/docs',
  },
}
