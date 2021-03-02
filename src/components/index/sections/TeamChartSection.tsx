import { Grid, Typography, Box } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { makeStyles, createStyles } from '@material-ui/core/styles'

import TeamPie from 'components/index/helpers/chart/TeamPie'

const useStyles = makeStyles((theme) =>
  createStyles({
    heading: {
      marginBottom: theme.spacing(5),
      color: theme.palette.primary.dark,
    },
  }),
)

const TeamChartSection = () => {
  const classes = useStyles()
  const { t } = useTranslation()

  return (
    <Box component="section" mb={10} textAlign="center">
      <Grid container direction="column" justify="center" spacing={3}>
        <Grid item>
          <Typography variant="h5" component="h2" className={classes.heading}>
            {t('index:team-chart-section.heading')}
          </Typography>
          <Typography variant="body2">{t('index:team-chart-section.content')}</Typography>
        </Grid>
        <Grid item>
          <Box textAlign="center" overflow="hidden">
            <TeamPie />
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default TeamChartSection
