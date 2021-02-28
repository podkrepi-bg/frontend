import { Grid, Typography } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { makeStyles, createStyles } from '@material-ui/core/styles'

import CommissionsIcon from '../icons/problems-to-solve-icons/CommissionsIcon'
import TransparencyIcon from '../icons/problems-to-solve-icons/TransparencyIcon'
import TimelinessIcon from '../icons/problems-to-solve-icons/TimelinessIcon'

const useStyles = makeStyles((theme) =>
  createStyles({
    heading: {
      textAlign: 'center',
      color: theme.palette.primary.dark,
      padding: theme.spacing(0, 4),
    },
    problem: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    icon: {
      fontSize: theme.spacing(10),
      padding: theme.spacing(1),
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
    <Grid container component="section" justify="center" spacing={5}>
      <Grid item>
        <Typography variant="h5" component="h2" className={classes.heading}>
          {t('index:problems-to-solve-section.heading')}
        </Typography>
      </Grid>
      <Grid item container>
        <Grid item xs={12} sm={4}>
          <div className={classes.problem}>
            <CommissionsIcon className={classes.icon} />
            <Typography variant="body2" className={classes.problemLabel}>
              {t('index:problems-to-solve-section.high-commissions')}
            </Typography>
          </div>
        </Grid>
        <Grid item xs={12} sm={4}>
          <div className={classes.problem}>
            <TransparencyIcon className={classes.icon} />
            <Typography variant="body2" className={classes.problemLabel}>
              {t('index:problems-to-solve-section.low-transparency')}
            </Typography>
          </div>
        </Grid>
        <Grid item xs={12} sm={4}>
          <div className={classes.problem}>
            <TimelinessIcon className={classes.icon} />
            <Typography variant="body2" className={classes.problemLabel}>
              {t('index:problems-to-solve-section.timeliness')}
            </Typography>
          </div>
        </Grid>
      </Grid>
    </Grid>
  )
}
