import { Grid, Typography, Box } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { makeStyles, createStyles } from '@material-ui/core/styles'

import TeamPie from 'components/chart/TeamPie'

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
      <Grid container direction="column" alignItems="center" justify="center">
        <Grid item>
          <Typography variant="h5" paragraph className={classes.heading}>
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
