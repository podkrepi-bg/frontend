import { Grid, Typography } from '@material-ui/core'
import { useTranslation } from 'next-i18next'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import classNames from 'classnames'

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      color: '#ccc',
    },
    wrapper: {
      width: '100%',
      minHeight: theme.spacing(45),
      padding: theme.spacing(8, 9),
      backgroundSize: 'cover',
      [theme.breakpoints.up('lg')]: {
        padding: theme.spacing(8, 14),
      },
      [theme.breakpoints.up(800)]: {
        width: 'calc(100%/3)',
      },
    },
    mission: {
      backgroundImage: 'url(/img/mission-background.jpg)',
    },
    vision: {
      backgroundImage: 'url(/img/vision-background.jpg)',
    },
    goals: {
      backgroundImage: 'url(/img/goals-background.jpg)',
    },
    title: {
      color: theme.palette.common.white,
      marginBottom: theme.spacing(3),
    },
  }),
)

export default function MissionVisionGoalsSection() {
  const classes = useStyles()
  const { t } = useTranslation()

  return (
    <Grid container justify="center" component="section" className={classes.container}>
      <Grid item className={classNames(classes.mission, classes.wrapper)}>
        <Typography variant="h5" component="h2" className={classes.title}>
          {t('index:mission-vision-goals-section.mission-title')}
        </Typography>
        <Typography>{t('index:mission-vision-goals-section.mission-text')}</Typography>
      </Grid>
      <Grid item className={classNames(classes.vision, classes.wrapper)}>
        <Typography variant="h5" component="h2" className={classes.title}>
          {t('index:mission-vision-goals-section.vision-title')}
        </Typography>
        <Typography>{t('index:mission-vision-goals-section.vision-text')}</Typography>
      </Grid>
      <Grid item className={classNames(classes.goals, classes.wrapper)}>
        <Typography variant="h5" component="h2" className={classes.title}>
          {t('index:mission-vision-goals-section.goals-title')}
        </Typography>
        <Typography>{t('index:mission-vision-goals-section.goals-text-trust')}</Typography>
        <Typography>{t('index:mission-vision-goals-section.goals-text-open-source')}</Typography>
      </Grid>
    </Grid>
  )
}
