import GiversAndGuarants from '../GiversAndGuarants'
import MediaContent from '../MediaContent'
import PartnersContent from '../PartnersContent'

export enum PartnersTabs {
  partners = 'partners',
  giversAndGuarants = 'givers-and-guarants',
  theMediasAboutUs = 'the-medias-about-us',
}

export type PartnersTab = {
  slug: PartnersTabs
  label: string
  Component: () => React.ReactElement
}

export const tabs: PartnersTab[] = [
  {
    slug: PartnersTabs.partners,
    label: 'partners:tabs.partners',
    Component: PartnersContent,
  },
  {
    slug: PartnersTabs.giversAndGuarants,
    label: 'Лична информация',
    Component: GiversAndGuarants,
  },
  {
    slug: PartnersTabs.theMediasAboutUs,
    label: 'Сертификати',
    Component: MediaContent,
  },
]
