import Typewriter from 'typewriter-effect'
import { useTranslation } from 'react-i18next'
import { Grid, Typography, Box } from '@material-ui/core'

import { routes } from 'common/routes'
import LinkButton from 'components/common/LinkButton'

export default function Index() {
  const { t } = useTranslation()

  return (
    <Box component="section" mb={10} textAlign="center">
      <Grid container spacing={5} direction="column">
        <Grid item>
          <Typography variant="h5" paragraph>
            {t('index:jumbotron.heading')}
          </Typography>
          <Typography variant="h4">
            <Typewriter
              onInit={(typewriter) => {
                typewriter
                  .typeString(t('index:jumbotron.maximum-transparency'))
                  .pauseFor(1000)
                  .deleteAll()
                  .typeString(t('index:jumbotron.zero-commission'))
                  .pauseFor(1000)
                  .deleteAll()
                  .typeString(t('index:jumbotron.community-for-community'))
                  .pauseFor(1000)
                  .deleteAll()
                  .typeString(t('index:jumbotron.open-source'))
                  .pauseFor(1000)
                  .deleteAll()
                  .start()
              }}
              options={{
                loop: true,
              }}
            />
          </Typography>
        </Grid>
        <Grid item>
          <LinkButton href={routes.support} variant="outlined" color="primary">
            {t('index:jumbotron.support-us-button')}
          </LinkButton>
        </Grid>
      </Grid>
    </Box>
  )
}
