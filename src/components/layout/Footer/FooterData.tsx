import { routes, staticUrls } from 'common/routes'

type FooterLink = {
  label: string
  href: string
  external?: boolean
}

export const footerItems: FooterLink[][] = [
  [
    { label: 'components.footer.about-us', href: routes.about },
    { label: 'components.footer.about-project', href: routes.aboutProject },
    { label: 'components.footer.support', href: routes.support },
    { label: 'components.footer.contact', href: routes.contact },
    { external: true, label: 'nav.blog', href: staticUrls.blog },
  ],
  [
    { external: true, label: 'GitHub', href: staticUrls.github },
    { external: true, label: 'components.footer.docs', href: staticUrls.projectDocs },
    { external: true, label: 'components.footer.dev-docs', href: staticUrls.devDocs },
  ],
  [
    { label: 'components.footer.privacy-policy', href: routes.privacyPolicy },
    { label: 'components.footer.terms-of-service', href: routes.termsOfService },
  ],
]
