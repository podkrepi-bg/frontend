import { Box, Typography } from '@mui/material'
import { ProfileTabs } from './tabs'
import { styled } from '@mui/material/styles'
import ProfileTab from './ProfileTab'
import MyRecurringCampaignsTable from './MyRecurringCampaignsTable'
import { t } from 'i18next'

const PREFIX = 'MyRecurringDonationsTab'

const classes = {
  boxContainer: `${PREFIX}-boxContainer`,
  boxTitle: `${PREFIX}-boxTitle`,
  h3: `${PREFIX}-h3`,
}

const Root = styled('div')(({ theme }) => ({
  [`& .${classes.boxContainer}`]: {
    padding: theme.spacing(5, 7),
    marginTop: theme.spacing(0.5),
    backgroundColor: 'white ',
    boxShadow: theme.shadows[3],
    borderRadius: '0px 0px 25px 25px',
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(5, 2),
    },
  },
}))

export default function MyRecurringDonationsTab() {
  return (
    <Root>
      <Box className={classes.boxTitle}>
        <Typography className={classes.h3}>{t('profile:donations.recurringDonations')}</Typography>
      </Box>
      <ProfileTab name={ProfileTabs.recurringDonations}>
        <MyRecurringCampaignsTable />
      </ProfileTab>
    </Root>
  )
}
