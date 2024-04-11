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
    fontSize: theme.typography.pxToRem(25),
    lineHeight: '116.7%',
    margin: '0',
  },
  [`& .${classes.thinFont}`]: {
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: theme.typography.pxToRem(24),
    lineHeight: '123.5%',
    letterSpacing: '0.25px',
    color: theme.palette.common.black,
    margin: 0,
  },
  [`& .${classes.smallText}`]: {
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: theme.typography.pxToRem(15),
    lineHeight: '160%',
    letterSpacing: '0.15px',
  },
  [`& .${classes.boxTitle}`]: {
    backgroundColor: theme.palette.common.white,
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
