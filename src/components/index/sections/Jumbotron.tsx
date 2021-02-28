import Typewriter from 'typewriter-effect'
import { useTranslation } from 'react-i18next'

import { Box, Grid, Typography } from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/core/styles'

import { routes } from 'common/routes'
import LinkButton from 'components/common/LinkButton'

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      paddingTop: theme.spacing(15),
      marginBottom: theme.spacing(15),
      textAlign: 'center',
      backgroundImage: 'url(img/header-image.png)',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      height: '910px',
      color: theme.palette.common.white,
    },
    title: {
      color: theme.palette.common.white,
      textShadow: '1px 2px rgba(0, 0, 0, 0.35)',
    },
    subTitle: {
      marginTop: theme.spacing(3),
    },
    typewriter: {
      marginBottom: theme.spacing(5),
      textShadow: '1px 2px rgba(0, 0, 0, 0.35)',
    },
    podkrepiButton: {
      color: theme.palette.common.white,
      borderColor: theme.palette.common.white,
      padding: theme.spacing(2, 4),
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
          <Typography variant="h5" component="p" className={classes.subTitle}>
            {t('index:jumbotron.heading')}
          </Typography>
        </Typography>
        <Typography variant="h4" component="h4" className={classes.typewriter}>
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
        <Box mt={25}>
          <LinkButton href={routes.support} variant="outlined" className={classes.podkrepiButton}>
            {t('index:jumbotron.support-us-button')}
          </LinkButton>
        </Box>
      </Grid>
    </Grid>
  )
}
