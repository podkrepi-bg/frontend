import { routes, staticUrls } from 'common/routes'

type FooterLink = {
  label: string
  href: string
  external?: boolean
}

export const footerItems: FooterLink[][] = [
  [
    { label: 'nav.campaigns.all-campaigns', href: routes.campaigns.index },
    { label: 'nav.campaigns.create', href: routes.faq_campaigns },
  ],
  [
    { label: 'nav.about.who-are-we', href: routes.about },
    { label: 'components.footer.about-project', href: routes.aboutProject },
    { label: 'nav.about.support_us', href: routes.support_us },
    { label: 'components.footer.support', href: routes.support },
    { label: 'nav.about.reports', href: routes.reports },
  ],
  [
    { external: true, label: 'nav.blog', href: staticUrls.blog },
    { label: 'components.footer.contact', href: routes.contact },
    { label: 'nav.campaigns.faq', href: routes.faq },
  ],
  [
    { label: 'components.footer.privacy-policy', href: routes.privacyPolicy },
    { label: 'components.footer.terms-of-service', href: routes.termsOfService },
    { external: true, label: 'GitHub', href: staticUrls.github },
  ],
]
