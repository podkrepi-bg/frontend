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

export default function TeamSection() {
  const classes = useStyles()
  const { t } = useTranslation()

  return (
    <Box component="section" mb={10} textAlign="center">
      <Grid container direction="column" alignItems="center" justify="center">
        <Grid item>
          <Typography variant="h5" className={classes.heading}>
            {t('index:team-section.heading')}
          </Typography>
          <Typography variant="subtitle1" paragraph>
            {t('index:team-section.content')}
          </Typography>
        </Grid>
      </Grid>

      {/* Team picture will be implemented here */}
    </Box>
  )
}
