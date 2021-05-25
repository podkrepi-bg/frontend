import { makeStyles, createStyles, Theme } from '@material-ui/core'
import { socialUrls } from 'common/routes'

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
    <a href={socialUrls.discord} target="_blank" rel="noreferrer noopener">
      <img
        src="/img/discord-team-image.png"
        className={classes.teamImage}
        alt="Podkrepi.bg team in Discord voice conference call"
      />
    </a>
  )
}
