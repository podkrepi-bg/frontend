import { Facebook, LinkedIn, YouTube, Instagram } from '@mui/icons-material'

import { socialUrls } from 'common/routes'
import ExternalLink from 'components/common/ExternalLink'
import DiscordIcon from 'components/common/DiscordIcon'
import { useTranslation } from 'next-i18next'

import { SocialIconsWrapper } from './Footer.styled'
import Subscription from './Subscription'

export const SocialIcons = () => {
  const { t } = useTranslation()

  return (
    <SocialIconsWrapper container direction="row">
      <ExternalLink href={socialUrls.facebook} aria-label={t('components.footer.social.facebook')}>
        <Facebook />
      </ExternalLink>
      <ExternalLink href={socialUrls.linkedin} aria-label={t('components.footer.social.linkedin')}>
        <LinkedIn />
      </ExternalLink>
      <ExternalLink href={socialUrls.youtube} aria-label={t('components.footer.social.youtube')}>
        <YouTube />
      </ExternalLink>
      <ExternalLink
        href={socialUrls.instagram}
        aria-label={t('components.footer.social.instagram')}>
        <Instagram />
      </ExternalLink>
      <ExternalLink href={socialUrls.discord} aria-label={t('components.footer.social.discord')}>
        <DiscordIcon />
      </ExternalLink>
      <Subscription />
    </SocialIconsWrapper>
  )
}
