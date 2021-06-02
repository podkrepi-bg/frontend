import { makeStyles, createStyles, Theme } from '@material-ui/core'

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
      <img
        src="/img/discord-team-image.png"
        className={classes.teamImage}
        alt="Podkrepi.bg team in Discord voice conference call"
      />
    </ExternalLink>
  )
}
