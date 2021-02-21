import { Grid, Typography, Box } from '@material-ui/core'
import { useTranslation } from 'react-i18next'

import SubmitButton from 'components/common/form/SubmitButton'

export default function Index() {
  const { t } = useTranslation()

  return (
    <Box component="section" mb={7}>
      <Grid container spacing={5} direction="column" alignItems="center" justify="center">
        <Grid item>
          <Typography variant="h5" paragraph align="center">
            {t('index:text-fields.heading')}
          </Typography>
          <Typography variant="h4" paragraph align="center">
            {t('index:text-fields.heading-bold')}
          </Typography>
        </Grid>
        <Grid item>
          <SubmitButton variant="outlined" label="index:cta.support-us" />
        </Grid>
      </Grid>
    </Box>
  )
}
