import { Grid, Typography, Box } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { makeStyles, createStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) =>
  createStyles({
    heading: {
      marginBottom: theme.spacing(5),
    },
  }),
)

export default function TeamSection() {
  const classes = useStyles()
  const { t } = useTranslation()

  return (
    <Box component="section" mb={12} textAlign="center">
      <Grid container direction="column" alignItems="center" justify="center">
        <Grid item>
          <Typography variant="h5" className={classes.heading}>
            {t('index:team-section.heading')}
          </Typography>
          <Typography variant="body2">{t('index:team-section.content')}</Typography>
        </Grid>
      </Grid>

      {/* Team picture will be implemented here */}
    </Box>
  )
}
