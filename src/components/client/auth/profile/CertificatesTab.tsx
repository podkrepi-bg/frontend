import ProfileTab from './ProfileTab'
import { styled } from '@mui/material/styles'
import { Box, Typography } from '@mui/material'
import React from 'react'
import { useUserDonations } from 'common/hooks/donation'
import { ProfileTabs } from './tabs'
import DonationTable from './DonationTable'
import { useTranslation } from 'next-i18next'
const PREFIX = 'CertificatesTab'

const classes = {
  h3: `${PREFIX}-h3`,
  thinFont: `${PREFIX}-thinFont`,
  smallText: `${PREFIX}-smallText`,
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
  [`& .${classes.thinFont}`]: {
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '24px',
    lineHeight: '123.5%',
    letterSpacing: '0.25px',
    color: '#000000',
    margin: 0,
  },
  [`& .${classes.smallText}`]: {
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '15px',
    lineHeight: '160%',
    letterSpacing: '0.15px',
  },
  [`& .${classes.boxTitle}`]: {
    backgroundColor: 'white',
    padding: theme.spacing(3, 7),
    paddingBottom: theme.spacing(3),
    marginTop: theme.spacing(3),
    boxShadow: theme.shadows[3],
  },
}))

export default function CertificatesTab() {
  const { data = { donations: [], total: 0 } } = useUserDonations()
  const { t } = useTranslation()
  return (
    <Root>
      <Box className={classes.boxTitle}>
        <Typography className={classes.h3}>{t('profile:certificates-history.index')}</Typography>
      </Box>
      <ProfileTab name={ProfileTabs.certificates}>
        <Box>
          <Box sx={{ mt: 4 }}>
            <h3 className={classes.thinFont}>{t('profile:certificates-history.title')}</h3>
            <DonationTable donations={data.donations} />
          </Box>
        </Box>
      </ProfileTab>
    </Root>
  )
}
