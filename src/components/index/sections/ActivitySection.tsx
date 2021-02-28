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

export default function ActivitySection() {
  const classes = useStyles()
  const { t } = useTranslation()

  return (
    <Grid container direction="column" component="section" className={classes.container}>
      <Typography variant="h5" component="h2" className={classes.heading}>
        {t('index:activity-section.heading')}
      </Typography>
      <Grid item>
        <Typography variant="body2">{t('index:activity-section.content')}</Typography>
      </Grid>

      {/* The graphic will be implemented here */}
    </Grid>
  )
}
