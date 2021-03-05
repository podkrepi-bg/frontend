import { useTranslation } from 'next-i18next'
import { Grid, Typography } from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/core/styles'

import { routes } from 'common/routes'
import Link from 'components/common/Link'

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
      display: 'block',
      textDecoration: 'none',
      border: '1px solid #284E84',
      padding: theme.spacing(2),
      borderRadius: 3,
      '&:hover': {
        backgroundColor: theme.palette.primary.dark,
        cursor: 'pointer',
      },
    },
    icon: {
      fontSize: theme.typography.pxToRem(80),
      fill: 'none',
      padding: theme.spacing(1),
    },
    supportOptionLabel: {
      color: theme.palette.primary.main,
    },
  }),
)

const items = [
  { Icon: FinancesIcon, label: 'index:support-us-section.financial-support' },
  { Icon: LabourIcon, label: 'index:support-us-section.labour-support' },
  { Icon: MediaIcon, label: 'index:support-us-section.media-support' },
  { Icon: PartnershipIcon, label: 'index:support-us-section.become-a-partner' },
]

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
        {items.map(({ label, Icon }, key) => (
          <Grid key={key} item xs={12} sm={6} md={3}>
            <Link href={routes.support}>
              <a className={classes.supportOption}>
                <Icon className={classes.icon} />
                <Typography variant="body2" className={classes.supportOptionLabel}>
                  {t(label)}
                </Typography>
              </a>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Grid>
  )
}
