import { useTranslation } from 'next-i18next'

import { Grid } from '@mui/material'

import { LogoSocialIcons } from './LogoSocialIcons'
import { FooterLinks } from './FooterLinks'
import { staticUrls } from 'common/routes'
import ExternalLink from 'components/common/ExternalLink'

import { Copyright, FooterWrapper, Root } from './Footer.styled'

export default function Footer() {
  const { t } = useTranslation()

  return (
    <Root>
      <FooterWrapper container maxWidth="xl">
        <LogoSocialIcons />
        <FooterLinks />
        <Copyright item xs={12}>
          {t('components.footer.copyrights')}
        </Copyright>
        <Grid item>
          {t('components.footer.hosting-partner')}{' '}
          <ExternalLink href={staticUrls.hostingProvider}>
            <strong>SuperHosting.BG</strong>
          </ExternalLink>
        </Grid>
      </FooterWrapper>
    </Root>
  )
}
