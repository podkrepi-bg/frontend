import i18next from 'i18next'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { initReactI18next } from 'react-i18next'

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

type LocaleSetupProps = {
  i18nResources: I18nResources
  fallback?: string
}

export default function useNextLocale({
  i18nResources = { translations: {}, namespaces: ['common'] },
}: LocaleSetupProps) {
  const router = useRouter()
  const { translations, namespaces } = i18nResources
  const locale = router.locale || router.defaultLocale
  if (!i18next.isInitialized) {
    i18next.use(initReactI18next).init({
      lng: locale,
      preload: locale ? [locale] : [],
      ns: namespaces,
      supportedLngs: router.locales,
      fallbackLng: router.defaultLocale,
      react: { useSuspense: false },
    })
  }

  i18next.setDefaultNamespace(namespaces[0])

  if (locale) {
    // Initialize language
    if (!i18next.language) {
      i18next.changeLanguage(locale)
    }

    for (const ns of namespaces) {
      if (!i18next.hasResourceBundle(locale, ns)) {
        i18next.addResourceBundle(locale, ns, translations[ns])
      }
    }
  }

  useEffect(() => {
    if (!i18next.language) return
    if (!router.locale) return

    // Handle router locale updates
    if (i18next.language !== router.locale) {
      i18next.changeLanguage(router.locale)
    }
  }, [i18next.language, router.locale])

  return { locale }
}

export async function getTranslations(locale: string | undefined, namespaces: string[]) {
  const translations: Translations = {}

  for (const ns of namespaces) {
    const { default: data = {} }: { default: Translation } = await import(
      `../../public/locales/${locale}/${ns}.json`
    )
    translations[ns] = data
  }

  return { translations, namespaces }
}
