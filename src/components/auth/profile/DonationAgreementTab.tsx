import ProfileTab from './ProfileTab'
import { ProfileTabs } from './tabs'
import { styled } from '@mui/material/styles'
import { Typography, Box } from '@mui/material'

const PREFIX = 'CertificatesTab'

const classes = {
  h3: `${PREFIX}-h3`,
  boxTitle: `${PREFIX}-boxTitle`,
}

const Root = styled('div')(({ theme }) => ({
  [`& .${classes.h3}`]: {
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '25px',
    lineHeight: '116.7%',
    margin: '0',
  },
  [`& .${classes.boxTitle}`]: {
    backgroundColor: 'white',
    padding: theme.spacing(3, 7),
    paddingBottom: theme.spacing(3),
    marginTop: theme.spacing(3),
    boxShadow: theme.shadows[3],
  },
}))
export default function DonationAgreementTab() {
  return (
    <Root>
      <Box className={classes.boxTitle}>
        <Typography className={classes.h3}>Договор за дарение</Typography>
      </Box>
      <ProfileTab name={ProfileTabs.contractDonation}> </ProfileTab>
    </Root>
  )
}
