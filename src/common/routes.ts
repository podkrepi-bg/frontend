import getConfig from 'next/config'

const {
  publicRuntimeConfig: { APP_URL },
} = getConfig()

export const baseUrl = APP_URL
export const defaultOgImage = `${baseUrl}/img/og-image.jpg`

export const staticUrls = {
  github: 'https://github.com/podkrepi-bg/frontend',
  docs: 'https://docs.podkrepi.bg/',
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
    bootcampIntern: {
      index: '/admin/bootcamp-interns',
      view: (id: string) => `/admin/bootcamp-interns/${id}`,
    },
  },
}
