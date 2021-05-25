import getConfig from 'next/config'

const {
  publicRuntimeConfig: { APP_URL },
} = getConfig()

export const baseUrl = APP_URL

export const staticUrls = {
  github: 'https://github.com/daritelska-platforma/frontend',
  docs: 'https://docs.podkrepi.bg/',
  devDocs: 'https://docs.podkrepi.bg/development',
}

export const socialUrls = {
  facebook: 'https://www.facebook.com/podkrepi.bg',
  twitter: '/',
  linkedin: 'https://www.linkedin.com/company/podkrepibg',
  youtube: 'https://www.youtube.com/channel/UCt5pYR0DkOCfjlY17awY8pA',
  instagram: '/',
  discord: 'https://discord.com/invite/nZAeCb9YzP',
}

export const routes = {
  index: '/',
  about: '/about',
  login: '/login',
  logout: '/logout',
  contact: '/contact',
  support: '/support',
  profile: '/profile',
  register: '/register',
  aboutProject: '/about-project',
  privacyPolicy: '/privacy-policy',
  changePassword: '/change-password',
  forgottenPassword: '/forgotten-password',
}
