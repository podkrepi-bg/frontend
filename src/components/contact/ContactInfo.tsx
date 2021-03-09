import { Grid, Typography } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { makeStyles, createStyles } from '@material-ui/core/styles'

import DonorsIcon from './icons/DonorsIcon'
import CampaignApplicantsIcon from './icons/CampaignApplicantsIcon'
import OrganizationsIcon from './icons/OrganizationsIcon'
import VolunteersIcon from './icons/VolunteersIcon'
import AddressIcon from './icons/AddressIcon'
import PhoneIcon from './icons/PhoneIcon'
import MailIcon from './icons/MailIcon'

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
    info: {
      marginTop: theme.spacing(4),
    },
    infoIcon: {
      fontSize: theme.spacing(10),
      fill: theme.palette.primary.main,
      stroke: theme.palette.primary.main,
      padding: theme.spacing(1),
    },
    infoLabel: {
      color: theme.palette.primary.dark,
    },
    contact: {
      textAlign: 'center',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'left',
      },
    },
    contactIcon: {
      fontSize: theme.spacing(8),
      fill: theme.palette.primary.main,
      stroke: theme.palette.primary.main,
      padding: theme.spacing(1),
    },
    contactText: {
      flexBasis: '50%',
      color: theme.palette.primary.dark,
    },
  }),
)

export default function ActivitySection() {
  const classes = useStyles()
  const { t } = useTranslation()

  return (
    <Grid container component="section">
      <Grid container direction="column" className={classes.container}>
        <Typography variant="h6">{t('contact:subtitle')}</Typography>
      </Grid>
      <Grid container direction="column" className={classes.container}>
        <Grid item>
          <Typography variant="h5" component="h2" className={classes.heading}>
            {t('contact:heading')}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="body2">{t('contact:content')}</Typography>
        </Grid>
        <Grid container>
          <Grid item xs={12} sm={6} md={3} className={classes.info}>
            <DonorsIcon className={classes.infoIcon} />
            <Typography variant="body2" className={classes.infoLabel}>
              {t('contact:info-options.donors')}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3} className={classes.info}>
            <CampaignApplicantsIcon className={classes.infoIcon} />
            <Typography variant="body2" className={classes.infoLabel}>
              {t('contact:info-options.campain-applicants')}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3} className={classes.info}>
            <OrganizationsIcon className={classes.infoIcon} />
            <Typography variant="body2" className={classes.infoLabel}>
              {t('contact:info-options.organizations')}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3} className={classes.info}>
            <VolunteersIcon className={classes.infoIcon} />
            <Typography variant="body2" className={classes.infoLabel}>
              {t('contact:info-options.volunteers')}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid container justify="center" spacing={5} className={classes.container}>
        <Grid item container justify="center" spacing={4}>
          <Grid item xs={12} className={classes.contact}>
            <AddressIcon className={classes.contactIcon} />
            <Grid item className={classes.contactText}>
              <Typography variant="body2">{t('contact:contact-options.address.key')}</Typography>
              <Typography variant="body2">{t('contact:contact-options.address.value')}</Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} className={classes.contact}>
            <PhoneIcon className={classes.contactIcon} />
            <Grid item className={classes.contactText}>
              <Typography variant="body2">{t('contact:contact-options.phone.key')}</Typography>
              <Typography variant="body2">{t('contact:contact-options.phone.value')}</Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} className={classes.contact}>
            <MailIcon className={classes.contactIcon} />
            <Grid item className={classes.contactText}>
              <Typography variant="body2">{t('contact:contact-options.other.key')}</Typography>
              <Typography variant="body2">{t('contact:contact-options.other.value')}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
