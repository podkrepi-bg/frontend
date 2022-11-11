import { useTranslation } from 'next-i18next'
import Link from 'next/link'

import { Grid } from '@mui/material'

import ExternalLink from 'components/common/ExternalLink'
import { footerLinks } from './helpers/FooterData'

import { FooterLink, FooterLinksWrapper, FooterLinkTitle } from './Footer.styled'

export const FooterLinks = () => {
  const { t } = useTranslation()

  return (
    <FooterLinksWrapper container spacing={3}>
      {footerLinks.map((data, index) => (
        <Grid container key={index} item xs={12} md={3} direction="column" spacing={1}>
          <FooterLinkTitle>{t(data.title)}</FooterLinkTitle>
          {data.links.map(({ label, href, external }, linkIndex) => (
            <FooterLink key={linkIndex}>
              {external ? (
                <ExternalLink href={href}>{t(label)}</ExternalLink>
              ) : (
                <Link href={href}>
                  <a>{t(label)}</a>
                </Link>
              )}
            </FooterLink>
          ))}
        </Grid>
      ))}
    </FooterLinksWrapper>
  )
}
