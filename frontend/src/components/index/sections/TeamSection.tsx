import { useTranslation } from 'next-i18next'
import { Grid, Typography } from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/core/styles'

import DiscordImage from 'components/about/DiscordImage'

const useStyles = makeStyles((theme) =>
  createStyles({
    heading: {
      marginBottom: theme.spacing(5),
      color: theme.palette.primary.dark,
      fontWeight: 500,
    },
    container: {
      marginBottom: theme.spacing(12),
      textAlign: 'center',
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
          <DiscordImage />
        </Grid>
      </Grid>
    </Grid>
  )
}
