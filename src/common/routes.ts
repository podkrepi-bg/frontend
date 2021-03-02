import getConfig from 'next/config'

const {
  publicRuntimeConfig: { APP_URL },
} = getConfig()

export const baseUrl = APP_URL

export const routes = {
  index: '/',
  about: '/about',
  login: '/login',
  logout: '/logout',
  contact: '/contact',
  support: '/support',
  profile: '/profile',
  register: '/register',
  changePassword: '/change-password',
  forgottenPassword: '/forgotten-password',
}
