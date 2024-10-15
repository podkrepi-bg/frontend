export function textLocalized() {
  const campaign = {
    bg: async () => await import(`../../public/locales/bg/campaign-application.json`),
    en: async () => await import(`../../public/locales/bg/campaign-application.json`),
  }
  return {
    campaign,
  }
}
