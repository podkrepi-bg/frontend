import { useTranslation } from 'next-i18next'
import { Grid, Typography } from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/core/styles'

import { routes } from 'common/routes'
import LinkButton from 'components/common/LinkButton'

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
      textAlign: 'center',
    },
    supportOptionsWrapper: {
      padding: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
    supportOption: {
      display: 'block',
      padding: theme.spacing(2),
    },
    icon: {
      fontSize: theme.typography.pxToRem(80),
      fill: theme.palette.primary.main,
      padding: theme.spacing(1),
    },
    supportOptionLabel: {
      color: theme.palette.primary.main,
    },
    podkrepiButton: {
      color: theme.palette.primary.dark,
      borderColor: theme.palette.primary.dark,
      padding: theme.spacing(1.5, 5),
      fontSize: theme.typography.pxToRem(15),
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
      <Grid container spacing={2} justify="center" className={classes.supportOptionsWrapper}>
        {items.map(({ label, Icon }, key) => (
          <Grid key={key} item xs={12} sm={6} md={2}>
            <Grid className={classes.supportOption}>
              <Icon className={classes.icon} />
              <Typography variant="body2" className={classes.supportOptionLabel}>
                {t(label)}
              </Typography>
            </Grid>
          </Grid>
        ))}
      </Grid>
      <Grid item>
        <LinkButton href={routes.support} variant="outlined" className={classes.podkrepiButton}>
          {t('index:jumbotron.support-us-button')}
        </LinkButton>
      </Grid>
    </Grid>
  )
}
