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
      <Typography variant="h5" className={classes.heading}>
        {t('index:team-section.heading')}
      </Typography>
      <Grid item>
        <Typography variant="body2">{t('index:team-section.content')}</Typography>
      </Grid>

      {/* Team picture will be implemented here */}
    </Grid>
  )
}
