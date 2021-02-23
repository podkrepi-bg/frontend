import { Grid, Typography, Box } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { makeStyles, createStyles } from '@material-ui/core/styles'

import CommissionsIcon from '../../icons/problems-to-solve-icons/CommissionsIcon'
import TransparencyIcon from '../../icons/problems-to-solve-icons/TransparencyIcon'
import TimelinessIcon from '../../icons/problems-to-solve-icons/TimelinessIcon'

const useStyles = makeStyles((theme) =>
  createStyles({
    icon: {
      fontSize: theme.spacing(10),
    },
  }),
)

export default function SupportUsSection() {
  const classes = useStyles()
  const { t } = useTranslation()

  return (
    <Box component="section" mb={10} textAlign="center">
      <Typography variant="h5" paragraph>
        {t('index:problems-to-solve-section.heading')}
      </Typography>
      <Grid container direction="row">
        <Box display="flex" justifyContent="space-between" flexWrap="wrap" width="100%">
          <Box display="flex" alignItems="center" flexBasis="25%">
            <CommissionsIcon className={classes.icon} />
            <Typography variant="subtitle1" paragraph>
              {t('index:problems-to-solve-section.high-commissions')}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" flexBasis="25%">
            <TransparencyIcon className={classes.icon} />
            <Typography variant="subtitle1" paragraph>
              {t('index:problems-to-solve-section.low-transparency')}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" flexBasis="25%">
            <TimelinessIcon className={classes.icon} />
            <Typography variant="subtitle1" paragraph>
              {t('index:problems-to-solve-section.timeliness')}
            </Typography>
          </Box>
        </Box>
      </Grid>
    </Box>
  )
}
