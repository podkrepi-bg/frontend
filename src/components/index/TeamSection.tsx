import { Grid, Typography, Box } from '@material-ui/core'
import { useTranslation } from 'react-i18next'

export default function TeamSection() {
  const { t } = useTranslation()

  return (
    <Box component="section" mb={7}>
      <Grid container spacing={5} direction="column" alignItems="center" justify="center">
        <Grid item>
          <Typography variant="h5" paragraph align="center">
            {t('index:text-fields.team-section-title')}
          </Typography>
          <Typography variant="subtitle1" paragraph align="center">
            {t('index:text-fields.team-section-text')}
          </Typography>
        </Grid>
      </Grid>

      {/* Team picture will be implemented here */}
    </Box>
  )
}
