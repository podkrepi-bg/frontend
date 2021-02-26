import Typewriter from 'typewriter-effect'
import { useTranslation } from 'react-i18next'

import { Grid, Typography } from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/core/styles'

import { routes } from 'common/routes'
import LinkButton from 'components/common/LinkButton'

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      paddingTop: theme.spacing(30),
      marginBottom: theme.spacing(12),
      textAlign: 'center',
      backgroundImage: 'url(img/header-image.png)',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      height: '910px',
      color: '#ffffff',
    },
    title: {
      color: '#ffffff',
    },
    typewriter: {
      marginBottom: theme.spacing(5),
    },
    podkrepiButton: {
      color: '#ffffff',
      borderColor: '#ffffff',
    },
  }),
)

export default function Index() {
  const classes = useStyles()
  const { t } = useTranslation()

  return (
    <Grid container direction="column" component="section" className={classes.container}>
      <Grid item className={classes.title}>
        <Typography gutterBottom variant="h1">
          {t('index:title')}
        </Typography>
        <Typography variant="h5">{t('index:jumbotron.heading')}</Typography>
        <Typography variant="h4" className={classes.typewriter}>
          <Typewriter
            onInit={(typewriter) => {
              typewriter
                .typeString(t('index:jumbotron.maximum-transparency'))
                .pauseFor(1000)
                .deleteAll(20)
                .typeString(t('index:jumbotron.eliminate-misuse'))
                .pauseFor(1000)
                .deleteAll(20)
                .typeString(t('index:jumbotron.zero-commission'))
                .pauseFor(1000)
                .deleteAll(20)
                .typeString(t('index:jumbotron.improve-donation-culture'))
                .pauseFor(1000)
                .deleteAll(20)
                .typeString(t('index:jumbotron.open-source'))
                .pauseFor(1000)
                .deleteAll(20)
                .start()
            }}
            options={{
              loop: true,
              delay: 70,
            }}
          />
        </Typography>
      </Grid>
      <Grid item>
        <LinkButton href={routes.support} variant="outlined" className={classes.podkrepiButton}>
          {t('index:jumbotron.support-us-button')}
        </LinkButton>
      </Grid>
    </Grid>
  )
}
