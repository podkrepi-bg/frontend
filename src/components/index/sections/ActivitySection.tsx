import { Grid, Typography, Box } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { makeStyles, createStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() =>
  createStyles({
    heading: {
      marginBottom: '40px',
    },
  }),
)

export default function ActivitySection() {
  const classes = useStyles()
  const { t } = useTranslation()

  return (
    <Box component="section" mb={10} textAlign="center">
      <Grid container direction="column">
        <Grid item>
          <Typography variant="h5" className={classes.heading}>
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
