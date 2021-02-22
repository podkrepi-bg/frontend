import { Grid, Typography, Box } from '@material-ui/core'
import { useTranslation } from 'react-i18next'

export default function ActivitySection() {
  const { t } = useTranslation()

  return (
    <Box component="section" mb={10} textAlign="center">
      <Grid container direction="column">
        <Grid item>
          <Typography variant="h5" paragraph>
            {t('index:activity-section.heading')}
          </Typography>
          <Typography variant="subtitle1" paragraph>
            {t('index:activity-section.content')}
          </Typography>
        </Grid>
      </Grid>

      {/* The graphic will be implemented here */}
    </Box>
  )
}
