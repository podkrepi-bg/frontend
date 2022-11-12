import { useTranslation } from 'next-i18next'

import { LogoSocialIcons } from './LogoSocialIcons'
import { FooterLinks } from './FooterLinks'

import { Copyright, FooterWrapper, Root } from './Footer.styled'

export default function Footer() {
  const { t } = useTranslation()

  return (
    <Root maxWidth={false} disableGutters>
      <FooterWrapper container maxWidth="xl">
        <LogoSocialIcons />
        <FooterLinks />
        <Copyright item xs={12}>
          {t('components.footer.copyrights')}
        </Copyright>
      </FooterWrapper>
    </Root>
  )
}
