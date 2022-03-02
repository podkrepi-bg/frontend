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
  campaigns: {
    index: '/campaigns',
    create: '/campaigns/create',
    viewCampaignBySlug: (slug: string) => `/campaigns/${slug}`,
  },
  profile: '/profile',
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
    countries: {
      index: '/admin/countries',
      create: '/admin/countries/create',
      view: (id: string) => `/admin/countries/${id}`,
    },
  },
  dev: {
    openData: '/open-data',
    apiDocs: '/docs',
  },
}
