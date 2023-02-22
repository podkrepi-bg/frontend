import { styled } from '@mui/material/styles'
import { Box, Typography } from '@mui/material'
import React from 'react'
import { useTranslation } from 'next-i18next'

import ProfileTab from './ProfileTab'
import { ProfileTabs } from './tabs'
import MyCampaingsTable from './MyCampaignsTable'
import MyDonatedToCampaignTable from './MyDonatedToCampaignsTable'

const PREFIX = 'MyCampaignsTab'

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

export default function MyCampaignsTab() {
  const { t } = useTranslation()
  return (
    <Root>
      <MyCampaingsTable />
      <Box className={classes.boxTitle}>
        <Typography className={classes.h3}>{t('profile:myCampaigns.donatedTo')}</Typography>
      </Box>
      <ProfileTab name={ProfileTabs.myCampaigns}>
        <MyDonatedToCampaignTable />
      </ProfileTab>
    </Root>
  )
}
