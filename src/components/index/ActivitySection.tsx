import { Grid, Typography, Box } from '@material-ui/core'
import { useTranslation } from 'react-i18next'

export default function ActivitySection() {
  const { t } = useTranslation()

  return (
    <Box component="section" mb={7}>
      <Grid container spacing={5} direction="column" justify="center" alignContent="center">
        <Grid item>
          <Typography variant="h5" paragraph align="center">
            {t('index:text-fields.activity-section-title')}
          </Typography>
          <Typography variant="subtitle1" paragraph align="center">
            {t('index:text-fields.activity-section-text')}
          </Typography>
        </Grid>
      </Grid>

      {/* The graphic will be implemented here */}
    </Box>
  )
}
