import { styled } from '@mui/material/styles'
import Image from 'next/image'

import { socialUrls } from 'common/routes'
import ExternalLink from 'components/common/ExternalLink'

const PREFIX = 'DiscordImage'

const classes = {
  teamImage: `${PREFIX}-teamImage`,
}

const StyledExternalLink = styled(ExternalLink)(({ theme }) => ({
  [`& .${classes.teamImage}`]: {
    maxWidth: '100%',
    marginTop: theme.spacing(3),
    padding: theme.spacing(0, 2),
  },
}))

export default function DiscordImage() {
  return (
    <StyledExternalLink href={socialUrls.discord} textAlign="center" display="block">
      <div className={classes.teamImage}>
        <Image
          src="/img/discord-team-image.png"
          alt="Podkrepi.bg team in Discord voice conference call"
          width={880}
          height={475.475}
          objectFit="contain"
        />
      </div>
    </StyledExternalLink>
  )
}
