import Image from 'next/image'
import { useTranslation } from 'next-i18next'
import { Grid, Theme, Typography } from '@mui/material'
import Heading from 'components/common/Heading'
import { createStyles, makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    AboutTheTeamHeading: {
      fontWeight: 500,
      margin: theme.spacing(15, 0, 8, 0),
    },
    DiscordTeamImage: {
      marginTop: theme.spacing(8),
      display: 'flex',
      justifyContent: 'center',
    },
  }),
)

export default function AboutTheTeamSection() {
  const { t } = useTranslation('about')
  const classes = useStyles()
  const discordTeamImagePath = '/img/team-photos/discord-team-image.jpg'

  return (
    <Grid component="section">
      <Heading
        variant="h4"
        component="h2"
        textAlign="center"
        className={classes.AboutTheTeamHeading}>
        {t('about.about-the-team')}
      </Heading>
      <Typography variant="body2">{t('about.team-description')}</Typography>
      <Grid className={classes.DiscordTeamImage}>
        <Image alt="Discord team image" src={discordTeamImagePath} width="1189px" height="789px" />
      </Grid>
    </Grid>
  )
}
