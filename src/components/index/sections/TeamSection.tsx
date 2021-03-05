import { Grid, Typography } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { makeStyles, createStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) =>
  createStyles({
    heading: {
      marginBottom: theme.spacing(5),
      color: theme.palette.primary.dark,
    },
    container: {
      marginBottom: theme.spacing(12),
      textAlign: 'center',
    },
    teamImage: {
      maxWidth: '100%',
      marginTop: theme.spacing(3),
      padding: theme.spacing(0, 2),
    },
  }),
)

export default function TeamSection() {
  const classes = useStyles()
  const { t } = useTranslation()

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justify="center"
      component="section"
      className={classes.container}>
      <Typography variant="h5" component="h2" className={classes.heading}>
        {t('index:team-section.heading')}
      </Typography>
      <Grid container>
        <Grid item>
          <Typography variant="body2">{t('index:team-section.content')}</Typography>
        </Grid>
        <Grid item>
          <img src="/img/discord-team-image.png" className={classes.teamImage} />
        </Grid>
      </Grid>
    </Grid>
  )
}
