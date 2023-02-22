import { routes, staticUrls } from 'common/routes'

export type FooterLink = {
  label: string
  href: string
  external?: boolean
}

type FooterSection = {
  title: string
  links: FooterLink[]
}

export const footerLinks: FooterSection[] = [
  {
    title: 'components.footer.donatе',
    links: [
      { label: 'components.footer.all-campaigns', href: routes.campaigns.index },
      { label: 'components.footer.suggest-campaign', href: routes.campaigns.create },
    ],
  },
  {
    title: 'components.footer.about-us',
    links: [
      { label: 'components.footer.who-are-we', href: routes.about },
      { label: 'components.footer.about-project', href: routes.aboutProject },
      { label: 'components.footer.support-us', href: routes.support_us },
      { label: 'components.footer.become-a-volunteer', href: routes.support },
      { label: 'components.footer.reports', href: routes.reports },
    ],
  },
  {
    title: 'components.footer.resources',
    links: [
      { label: 'nav.blog', href: routes.blog.index },
      { label: 'components.footer.contact', href: routes.contact },
      { label: 'components.footer.partners', href: routes.partners },
      { label: 'components.footer.faq', href: routes.faq },
    ],
  },
  {
    title: 'components.footer.others',
    links: [
      { label: 'components.footer.privacy-policy', href: routes.privacyPolicy },
      { label: 'components.footer.terms-of-service', href: routes.termsOfService },
      { external: true, label: 'GitHub', href: staticUrls.github },
    ],
  },
]
