import { useTranslation } from 'next-i18next'
import Link from 'next/link'

import { Grid } from '@mui/material'

import ExternalLink from 'components/common/ExternalLink'

import { footerItems } from './helpers/FooterData'
import { FooterLinksWrapper } from './Footer.styled'

export const FooterLinks = () => {
  const { t } = useTranslation()

  return (
    <FooterLinksWrapper container spacing={3}>
      {footerItems.map((links, column) => (
        <Grid container key={column} item xs={12} md={3} direction="column" spacing={1}>
          {links.map(({ label, href, external }, row) => (
            <Grid key={`${column}-${row}`} item>
              {external ? (
                <ExternalLink href={href}>{t(label)}</ExternalLink>
              ) : (
                <Link href={href}>
                  <a>{t(label)}</a>
                </Link>
              )}
            </Grid>
          ))}
        </Grid>
      ))}
    </FooterLinksWrapper>
  )
}
