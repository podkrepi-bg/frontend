import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import { NextRouter } from 'next/router'

export const i18nextInit = (router: NextRouter, namespaces = ['common']) => {
  if (!i18next.isInitialized) {
    i18next.use(initReactI18next).init({
      lng: router.locale,

      supportedLngs: router.locales,

      fallbackLng: router.defaultLocale,

      react: {
        useSuspense: false,
      },

      resources: {},
    })
  }

  if (router.locale && i18next.language !== router.locale) {
    i18next.changeLanguage(router.locale)
  }

  for (const ns of namespaces) {
    if (router.locale && !i18next.hasResourceBundle(router.locale, ns)) {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const data = require(`../public/locales/${router.locale}/${ns}.json`)
      i18next.addResourceBundle(router.locale, ns, data)
    }
  }

  i18next.setDefaultNamespace(namespaces[0])
}
