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
      minHeight: theme.spacing(56),
      padding: theme.spacing(8, 5),
      backgroundSize: 'cover',
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
    missionTextWrapper: {
      float: 'right',
    },
    visionTextWrapper: {
      margin: '0 auto',
    },
    goalsTextWrapper: {
      float: 'left',
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
    <Grid
      container
      alignItems="center"
      justify="center"
      component="section"
      className={classes.container}>
      <Grid item xs={12} md={4} className={classNames(classes.mission, classes.wrapper)}>
        <Grid item xs={10} sm={8} className={classes.missionTextWrapper}>
          <Typography variant="h5" component="h2" className={classes.title}>
            {t('index:mission-vision-goals-section.mission-title')}
          </Typography>
          <Typography>{t('index:mission-vision-goals-section.mission-text')}</Typography>
        </Grid>
      </Grid>
      <Grid item xs={12} md={4} className={classNames(classes.vision, classes.wrapper)}>
        <Grid item xs={10} sm={8} className={classes.visionTextWrapper}>
          <Typography variant="h5" component="h2" className={classes.title}>
            {t('index:mission-vision-goals-section.vision-title')}
          </Typography>
          <Typography>{t('index:mission-vision-goals-section.vision-text')}</Typography>
        </Grid>
      </Grid>
      <Grid item xs={12} md={4} className={classNames(classes.goals, classes.wrapper)}>
        <Grid item xs={10} sm={8} className={classes.goalsTextWrapper}>
          <Typography variant="h5" component="h2" className={classes.title}>
            {t('index:mission-vision-goals-section.goals-title')}
          </Typography>
          <Typography>{t('index:mission-vision-goals-section.goals-text-trust')}</Typography>
          <Typography>{t('index:mission-vision-goals-section.goals-text-open-source')}</Typography>
        </Grid>
      </Grid>
    </Grid>
  )
}
