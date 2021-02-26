import { Grid, Typography, Box } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import TeamPie from 'components/chart/TeamPie'

const TeamChartSection = () => {
  const { t } = useTranslation()

  return (
    <Box component="section" mb={10} textAlign="center">
      <Grid container direction="column" alignItems="center" justify="center">
        <Grid item>
          <Typography variant="h5" paragraph>
            {t('index:team-chart-section.heading')}
          </Typography>
          <Typography variant="subtitle1" paragraph>
            {t('index:team-chart-section.content')}
          </Typography>
          <TeamPie />
        </Grid>
      </Grid>
    </Box>
  )
}

export default TeamChartSection
