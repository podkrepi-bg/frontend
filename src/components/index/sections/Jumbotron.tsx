import { Grid, Typography, Box } from '@material-ui/core'
import { useTranslation } from 'react-i18next'

import SubmitButton from 'components/common/form/SubmitButton'

export default function Index() {
  const { t } = useTranslation()

  return (
    <Box component="section" mb={10} textAlign="center">
      <Grid container spacing={5} direction="column">
        <Grid item>
          <Typography variant="h5" paragraph>
            {t('index:jumbotron.heading')}
          </Typography>
          <Typography variant="h4" paragraph>
            {t('index:jumbotron.heading-bold')}
          </Typography>
        </Grid>
        <Grid item>
          <SubmitButton variant="outlined" label="index:jumbotron.support-us-button" />
        </Grid>
      </Grid>
    </Box>
  )
}
