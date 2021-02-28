import { Grid, Typography } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { makeStyles, createStyles } from '@material-ui/core/styles'

import CommissionsIcon from '../icons/problems-to-solve-icons/CommissionsIcon'
import TransparencyIcon from '../icons/problems-to-solve-icons/TransparencyIcon'
import TimelinessIcon from '../icons/problems-to-solve-icons/TimelinessIcon'

const useStyles = makeStyles((theme) =>
  createStyles({
    heading: {
      margin: 'auto',
      marginBottom: theme.spacing(5),
      textAlign: 'center',
      maxWidth: '50%',
      color: theme.palette.primary.dark,
    },
    problem: {
      display: 'flex',
      alignItems: 'center',
      flexBasis: '23%',
    },
    icon: {
      fontSize: theme.spacing(10),
      marginRight: theme.spacing(1),
    },
    problemLabel: {
      color: theme.palette.primary.dark,
    },
  }),
)

export default function SupportUsSection() {
  const classes = useStyles()
  const { t } = useTranslation()

  return (
    <Grid container component="section">
      <Typography variant="h5" className={classes.heading}>
        {t('index:problems-to-solve-section.heading')}
      </Typography>
      <Grid container direction="row" justify="space-between" alignItems="center">
        <Grid item className={classes.problem}>
          <CommissionsIcon className={classes.icon} />
          <Typography variant="body2" className={classes.problemLabel}>
            {t('index:problems-to-solve-section.high-commissions')}
          </Typography>
        </Grid>
        <Grid item className={classes.problem}>
          <TransparencyIcon className={classes.icon} />
          <Typography variant="body2" className={classes.problemLabel}>
            {t('index:problems-to-solve-section.low-transparency')}
          </Typography>
        </Grid>
        <Grid item className={classes.problem}>
          <TimelinessIcon className={classes.icon} />
          <Typography variant="body2" className={classes.problemLabel}>
            {t('index:problems-to-solve-section.timeliness')}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  )
}
