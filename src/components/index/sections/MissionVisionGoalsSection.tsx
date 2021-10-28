import { Grid, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import makeStyles from '@mui/styles/makeStyles'
import createStyles from '@mui/styles/createStyles'
import Image from 'next/image'

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      color: '#ccc',
    },
    wrapper: {
      width: '100%',
      minHeight: theme.spacing(45),
      padding: theme.spacing(8, 9),
      [theme.breakpoints.up('lg')]: {
        padding: theme.spacing(8, 14),
      },
      [theme.breakpoints.up(800)]: {
        width: 'calc(100%/3)',
      },
      position: 'relative',
    },
    image: {
      zIndex: -1,
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
    <Grid container justifyContent="center" component="section" className={classes.container}>
      <Grid item className={classes.wrapper}>
        <Image
          src="/img/mission-background.jpg"
          alt="Podkrepi.bg mission"
          layout="fill"
          objectFit="cover"
          objectPosition="top"
          className={classes.image}
        />
        <Typography variant="h5" component="h2" className={classes.title}>
          {t('index:mission-vision-goals-section.mission-title')}
        </Typography>
        <Typography>{t('index:mission-vision-goals-section.mission-text')}</Typography>
      </Grid>
      <Grid item className={classes.wrapper}>
        <Image
          src="/img/vision-background.jpg"
          alt="Podkrepi.bg vision"
          layout="fill"
          objectFit="cover"
          objectPosition="top"
          className={classes.image}
        />
        <Typography variant="h5" component="h2" className={classes.title}>
          {t('index:mission-vision-goals-section.vision-title')}
        </Typography>
        <Typography>{t('index:mission-vision-goals-section.vision-text')}</Typography>
      </Grid>
      <Grid item className={classes.wrapper}>
        <Image
          src="/img/goals-background.jpg"
          alt="Podkrepi.bg goals"
          layout="fill"
          objectFit="cover"
          objectPosition="top"
          className={classes.image}
        />
        <Typography variant="h5" component="h2" className={classes.title}>
          {t('index:mission-vision-goals-section.goals-title')}
        </Typography>
        <Typography>{t('index:mission-vision-goals-section.goals-text-trust')}</Typography>
        <Typography>{t('index:mission-vision-goals-section.goals-text-open-source')}</Typography>
      </Grid>
    </Grid>
  )
}
