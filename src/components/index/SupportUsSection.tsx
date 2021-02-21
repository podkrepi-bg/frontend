import { Grid, Typography, Box } from '@material-ui/core'
import { useTranslation } from 'react-i18next'

export default function SupportUsSection() {
  const { t } = useTranslation()

  return (
    <Box component="section" mb={7}>
      <Grid container spacing={5} direction="column" justify="center" alignContent="center">
        <Grid item>
          <Typography variant="h5" paragraph align="center">
            {t('index:text-fields.support-us-section-title')}
          </Typography>
        </Grid>
      </Grid>
      <Grid container direction="row" alignItems="center">
        <Grid item></Grid>
        <Grid item></Grid>
      </Grid>
    </Box>
  )
}
