export function textLocalized() {
  const campaign = {
    bg: async () => (await import(`../../public/locales/bg/campaign-application.json`, { with: { type: 'json' } })).default,
    en: async () => (await import(`../../public/locales/en/campaign-application.json`, { with: { type: 'json' } })).default,
  }
  return {
    campaign,
  }
}
