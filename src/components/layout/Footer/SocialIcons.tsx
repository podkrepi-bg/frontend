import { Facebook, LinkedIn, YouTube, Instagram } from '@mui/icons-material'

import { socialUrls } from 'common/routes'
import ExternalLink from 'components/common/ExternalLink'

import { SocialIconsWrapper } from './Footer.styled'

export const SocialIcons = () => {
  return (
    <SocialIconsWrapper container direction="row">
      <ExternalLink href={socialUrls.facebook}>
        <Facebook />
      </ExternalLink>
      <ExternalLink href={socialUrls.linkedin}>
        <LinkedIn />
      </ExternalLink>
      <ExternalLink href={socialUrls.youtube}>
        <YouTube />
      </ExternalLink>
      <ExternalLink href={socialUrls.instagram}>
        <Instagram />
      </ExternalLink>
    </SocialIconsWrapper>
  )
}
