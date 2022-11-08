import { Facebook, LinkedIn, YouTube, Instagram } from '@mui/icons-material'
import { Grid } from '@mui/material'

import { socialUrls } from 'common/routes'
import ExternalLink from 'components/common/ExternalLink'

export const SocialIcons = () => {
  return (
    <Grid direction="row" container spacing={2}>
      <Grid item>
        <ExternalLink href={socialUrls.facebook}>
          <Facebook />
        </ExternalLink>
      </Grid>
      <Grid item>
        <ExternalLink href={socialUrls.linkedin}>
          <LinkedIn />
        </ExternalLink>
      </Grid>
      <Grid item>
        <ExternalLink href={socialUrls.youtube}>
          <YouTube />
        </ExternalLink>
      </Grid>
      <Grid item>
        <ExternalLink href={socialUrls.instagram}>
          <Instagram />
        </ExternalLink>
      </Grid>
    </Grid>
  )
}
