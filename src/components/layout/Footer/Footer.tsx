import { useTranslation } from 'next-i18next'
import { Grid } from '@mui/material'

import { FooterWrapper, Root } from './Footer.styled'
import { InfoGrid } from './InfoGrid'
import { FooterLinks } from './FooterLinks'

export default function Footer() {
  const { t } = useTranslation()

  return (
    <Root maxWidth={false} disableGutters>
      <FooterWrapper container maxWidth="lg">
        <Grid item xs={12} sm={8} md={5}>
          <InfoGrid />
        </Grid>
        <Grid item xs={12} sm={4} md={7}>
          <FooterLinks />
        </Grid>
        <Grid item>{t('components.footer.copyrights')}</Grid>
      </FooterWrapper>
    </Root>
  )
}
