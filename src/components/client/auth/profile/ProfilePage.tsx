import { Box, LinearProgress, useMediaQuery } from '@mui/material'
import { styled } from '@mui/material/styles'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import React, { useMemo } from 'react'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import {
  VolunteerActivism as DonationIcon,
  AccountBox as AccountBoxIcon,
  Assignment as CertificateIcon,
  AccountBalance as CampaignIcon,
  EventRepeat as RecurringDonationIcon,
  AddBusiness as AffiliateProgramIcon,
} from '@mui/icons-material'
import { useSession } from 'next-auth/react'

import theme from 'common/theme'
import { routes } from 'common/routes'
import Layout from 'components/client/layout/Layout'

import { ProfileTabs, ProfileTab, tabs } from './tabs'
import { getCurrentPerson } from 'common/util/useCurrentPerson'

const PREFIX = 'ProfilePage'

const classes = {
  h1: `${PREFIX}-h1`,
  tabMobile: `${PREFIX}-tabMobile`,
}

const StyledLayout = styled(Layout)({
  [`& .${classes.h1}`]: {
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: theme.typography.pxToRem(45),
    lineHeight: '112px',
    letterSpacing: '-1.5px',
    color: theme.palette.common.black,
    margin: '0',
    marginLeft: '10px',
  },
  [`& .${classes.tabMobile}`]: {
    flex: 1,
  },
})

export default function ProfilePage() {
  const { t } = useTranslation()
  const { status } = useSession()

  const router = useRouter()
  const matches = useMediaQuery(theme.breakpoints.down('sm'))
  const currentTab = router.query.slug ?? ProfileTabs.donations

  const { data: person, error: userError, isError } = getCurrentPerson(!!router.query?.register)

  const tab = useMemo<ProfileTab>(() => {
    return tabs.find((tab) => tab.slug === currentTab) ?? tabs[0]
  }, [currentTab])

  if (status === 'loading') {
    return <LinearProgress />
  }

  if (status !== 'authenticated') {
    return <StyledLayout title={t('nav.profile')}>{t('profile:notAuthenticated')}</StyledLayout>
  }

  if (isError && userError.response && userError.response.status === 401) {
    return (
      <StyledLayout title={t('nav.profile')}>
        The user session has expired. Redirecting to login page
      </StyledLayout>
    )
  }

  const { Component: SelectedTab } = tab

  return (
    <Layout profilePage>
      <Box sx={{ width: '100%' }}>
        <Box
          sx={{
            backgroundColor: theme.palette.common.white,
            borderRadius: '25px 25px 0px 0px',
            padding: '10px 10px',
            boxShadow: 3,
          }}>
          <h1 className={classes.h1} style={{ marginLeft: '20px' }}>
            {!person?.user.company ? t('profile:header') : t('profile:corporate-header')}
          </h1>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={tab.slug} variant="scrollable" scrollButtons allowScrollButtonsMobile>
              <Tab
                className={matches ? classes.tabMobile : ''}
                value={ProfileTabs.donations}
                label={matches ? undefined : t('profile:donations.index')}
                aria-label={matches ? t('profile:donations.index') : undefined}
                onClick={() => router.push(routes.profile.donations)}
                icon={matches ? <DonationIcon /> : undefined}
              />
              <Tab
                className={matches ? classes.tabMobile : ''}
                value={ProfileTabs.personalInformation}
                label={matches ? undefined : t('profile:personalInfo.index')}
                aria-label={matches ? t('profile:personalInformation') : undefined}
                onClick={() => router.push(routes.profile.personalInformation)}
                icon={matches ? <AccountBoxIcon /> : undefined}
              />
              <Tab
                className={matches ? classes.tabMobile : ''}
                value={ProfileTabs.certificates}
                label={matches ? undefined : t('profile:certificates')}
                aria-label={matches ? t('profile:certificates') : undefined}
                onClick={() => router.push(routes.profile.certificates)}
                icon={matches ? <CertificateIcon /> : undefined}
              />
              <Tab
                className={matches ? classes.tabMobile : ''}
                value={ProfileTabs.myCampaigns}
                label={matches ? undefined : t('profile:myCampaigns.index')}
                aria-label={matches ? t('profile:myCampaigns.index') : undefined}
                onClick={() => router.push(routes.profile.myCampaigns)}
                icon={matches ? <CampaignIcon /> : undefined}
              />
              <Tab
                className={matches ? classes.tabMobile : ''}
                value={ProfileTabs.recurringDonations}
                label={matches ? undefined : t('profile:donations.recurringDonations')}
                aria-label={matches ? t('profile:donations.recurringDonations') : undefined}
                onClick={() => router.push(routes.profile.recurringDonations)}
                icon={matches ? <RecurringDonationIcon /> : undefined}
              />
              <Tab
                className={matches ? classes.tabMobile : ''}
                value={ProfileTabs.myNotifications}
                label={matches ? undefined : t('profile:myNotifications.index')}
                aria-label={matches ? t('profile:myNotifications.index') : undefined}
                onClick={() => router.push(routes.profile.myNotifications)}
                icon={matches ? <AccountBoxIcon /> : undefined}
              />
              {person?.user.company && (
                <Tab
                  className={matches ? classes.tabMobile : ''}
                  value={ProfileTabs.affiliateProgram}
                  label={matches ? undefined : t('profile:affiliate.index')}
                  aria-label={t('profile:affiliate.index')}
                  onClick={() => router.push(routes.profile.affiliateProgram)}
                  icon={matches ? <AffiliateProgramIcon /> : undefined}
                />
              )}
              {/* Currently we don't generate donation contract, when such document is generated we can either combine it with the certificate or unhide the contracts section. */}
              {/* <Tab
                className={matches ? classes.tabMobile : ''}
                value={ProfileTabs.contractDonation}
                label={matches ? undefined : t('profile:donationsContract')}
                aria-label={matches ? t('profile:donationsContract') : undefined}
                onClick={() => router.push(routes.profile.contractDonation)}
                icon={matches ? <ContractIcon /> : undefined}
              /> */}
            </Tabs>
          </Box>
        </Box>
        {SelectedTab && <SelectedTab />}
      </Box>
    </Layout>
  )
}
