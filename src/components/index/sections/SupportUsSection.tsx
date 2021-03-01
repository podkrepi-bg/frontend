import { Grid, Typography } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { makeStyles, createStyles } from '@material-ui/core/styles'

import FinancesIcon from '../icons/support-us-icons/FinancesIcon'
import LabourIcon from '../icons/support-us-icons/LabourIcon'
import MediaIcon from '../icons/support-us-icons/MediaIcon'
import PartnershipIcon from '../icons/support-us-icons/PartnershipIcon'

const useStyles = makeStyles((theme) =>
  createStyles({
    heading: {
      marginBottom: theme.spacing(5),
      color: theme.palette.primary.dark,
    },
    container: {
      marginBottom: theme.spacing(12),
      textAlign: 'center',
    },
    supportOptionsWrapper: {
      padding: theme.spacing(2),
    },
    supportOption: {
      border: '1px solid #284E84',
      padding: theme.spacing(2),
      borderRadius: 3,
      '&:hover': {
        backgroundColor: theme.palette.primary.dark,
        cursor: 'pointer',
      },
    },
    icon: {
      fontSize: theme.spacing(10),
      fill: 'none',
      marginBottom: theme.spacing(1),
      padding: theme.spacing(1),
    },
    supportOptionLabel: {
      color: theme.palette.primary.main,
    },
  }),
)

export default function SupportUsSection() {
  const classes = useStyles()
  const { t } = useTranslation()

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justify="center"
      component="section"
      className={classes.container}>
      <Typography variant="h5" component="h2" className={classes.heading}>
        {t('index:support-us-section.heading')}
      </Typography>
      <Grid container spacing={2} className={classes.supportOptionsWrapper}>
        <Grid item xs={12} sm={6} md={3}>
          <div className={classes.supportOption}>
            <FinancesIcon className={classes.icon} />
            <Typography variant="body2" className={classes.supportOptionLabel}>
              {t('index:support-us-section.financial-support')}
            </Typography>
          </div>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <div className={classes.supportOption}>
            <LabourIcon className={classes.icon} />
            <Typography variant="body2" className={classes.supportOptionLabel}>
              {t('index:support-us-section.labour-support')}
            </Typography>
          </div>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <div className={classes.supportOption}>
            <MediaIcon className={classes.icon} />
            <Typography variant="body2" className={classes.supportOptionLabel}>
              {t('index:support-us-section.media-support')}
            </Typography>
          </div>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <div className={classes.supportOption}>
            <PartnershipIcon className={classes.icon} />
            <Typography variant="body2" className={classes.supportOptionLabel}>
              {t('index:support-us-section.become-a-partner')}
            </Typography>
          </div>
        </Grid>
      </Grid>
    </Grid>
  )
}
