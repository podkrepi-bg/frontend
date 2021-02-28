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
      paddingLeft: theme.spacing(8),
      paddingRight: theme.spacing(8),
    },
    supportOption: {
      display: 'flex',
      border: '1px solid #284E84',
      borderRadius: theme.spacing(1),
      width: '180px',
      height: '200px',
      '&:hover': {
        backgroundColor: theme.palette.primary.dark,
        cursor: 'pointer',
      },
    },
    icon: {
      fontSize: theme.spacing(10),
      fill: 'none',
      marginBottom: theme.spacing(1),
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
      <Typography variant="h5" className={classes.heading}>
        {t('index:support-us-section.heading')}
      </Typography>
      <Grid
        container
        direction="row"
        justify="space-between"
        className={classes.supportOptionsWrapper}>
        <Grid
          container
          direction="column"
          alignItems="center"
          justify="center"
          className={classes.supportOption}>
          <FinancesIcon className={classes.icon} />
          <Typography variant="body2" className={classes.supportOptionLabel}>
            {t('index:support-us-section.financial-support')}
          </Typography>
        </Grid>
        <Grid
          container
          direction="column"
          alignItems="center"
          justify="center"
          className={classes.supportOption}>
          <LabourIcon className={classes.icon} />
          <Typography variant="body2" className={classes.supportOptionLabel}>
            {t('index:support-us-section.labour-support')}
          </Typography>
        </Grid>
        <Grid
          container
          direction="column"
          alignItems="center"
          justify="center"
          className={classes.supportOption}>
          <MediaIcon className={classes.icon} />
          <Typography variant="body2" className={classes.supportOptionLabel}>
            {t('index:support-us-section.media-support')}
          </Typography>
        </Grid>
        <Grid
          container
          direction="column"
          alignItems="center"
          justify="center"
          className={classes.supportOption}>
          <PartnershipIcon className={classes.icon} />
          <Typography variant="body2" className={classes.supportOptionLabel}>
            {t('index:support-us-section.become-a-partner')}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  )
}
