import { Theme } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import createStyles from '@mui/styles/createStyles'
import Image from 'next/image'

import { socialUrls } from 'common/routes'
import ExternalLink from 'components/common/ExternalLink'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    teamImage: {
      maxWidth: '100%',
      marginTop: theme.spacing(3),
      padding: theme.spacing(0, 2),
    },
  }),
)

export default function DiscordImage() {
  const classes = useStyles()
  return (
    <ExternalLink href={socialUrls.discord}>
      <div className={classes.teamImage}>
        <Image
          src="/img/discord-team-image.png"
          alt="Podkrepi.bg team in Discord voice conference call"
          width={880}
          height={475.475}
          objectFit="contain"
        />
      </div>
    </ExternalLink>
  )
}
