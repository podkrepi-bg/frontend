import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import { NextRouter } from 'next/router'

interface Translation {
  [key: string]: string
}
interface Translations {
  [namespace: string]: Translation
}
interface I18nResources {
  translations: Translations
  namespaces: string[]
}

export const i18nextInit = async (router: NextRouter, i18nResources: I18nResources) => {
  if (!i18nResources || !router.locale) {
    return
  }

  const { translations, namespaces } = i18nResources

  if (!i18next.isInitialized) {
    i18next.use(initReactI18next).init({
      lng: router.locale,

      supportedLngs: router.locales,

      fallbackLng: router.defaultLocale,

      ns: namespaces,

      react: {
        useSuspense: false,
      },
    })
  }

  i18next.setDefaultNamespace(namespaces[0])

  if (i18next.language !== router.locale) {
    i18next.changeLanguage(router.locale)
  }

  for (const ns of namespaces) {
    if (!i18next.hasResourceBundle(router.locale, ns)) {
      i18next.addResourceBundle(router.locale, ns, translations[ns])
    }
  }
}

export async function getTranslations(locale: string | undefined, namespaces: string[]) {
  const translations: Translations = {}

  for (const ns of namespaces) {
    const { default: data = {} }: { default: Translation } = await import(
      `../public/locales/${locale}/${ns}.json`
    )
    translations[ns] = data
  }

  return { translations, namespaces }
}
