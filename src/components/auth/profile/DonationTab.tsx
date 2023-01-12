import { Box, Card, Typography, CircularProgress } from '@mui/material'
import { styled } from '@mui/material/styles'
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism'
import React from 'react'
import { useTranslation } from 'next-i18next'

import { moneyPublic } from 'common/util/money'
import { useUserDonations } from 'common/hooks/donation'
import { getCurrentPerson } from 'common/util/useCurrentPerson'
import { useGetUserRecurringDonations } from 'common/hooks/recurringDonation'
import { useRouter } from 'next/router'

import { ProfileTabs } from './tabs'
import ProfileTab from './ProfileTab'
import DonationTable from './DonationTable'
import { DonationStatus, PaymentProvider } from 'gql/donations.enums'
import { RecurringDonationStatus } from 'gql/recurring-donation-status.d'
import { RecurringDonationResponse } from 'gql/recurring-donation'
import MyRecurringCampaignsTable from './MyRecurringCampaignsTable'

const PREFIX = 'DonationTab'

const classes = {
  donationsBox: `${PREFIX}-donationsBox`,
  campaignBox: `${PREFIX}-campaignBox`,
  donationsBoxRow: `${PREFIX}-donationsBoxRow`,
  h1: `${PREFIX}-h1`,
  h3: `${PREFIX}-h3`,
  h2: `${PREFIX}-h2`,
  boxTitle: `${PREFIX}-boxTitle`,
}

const Root = styled('div')(({ theme }) => ({
  [`& .${classes.donationsBox}`]: {
    padding: theme.spacing(5),
    boxShadow: theme.shadows[3],
    marginTop: theme.spacing(0.5),
  },
  [`& .${classes.campaignBox}`]: {
    boxShadow: theme.shadows[3],
  },
  [`& .${classes.donationsBoxRow}`]: {
    '&:first-of-type': {
      borderBottom: `1px solid ${theme.palette.divider}`,
      marginBottom: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
    marginBottom: theme.spacing(1),
    display: 'flex',
    justifyContent: 'space-between',
  },
  [`& .${classes.h1}`]: {
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '30px',
    lineHeight: '65px',
    paddingLeft: 2,
  },
  [`& .${classes.h3}`]: {
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '25px',
    lineHeight: '116.7%',
    margin: '0',
  },
  [`& .${classes.h2}`]: {
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '23px',
    lineHeight: '116.7%',
    marginBottom: theme.spacing(3),
  },
  [`& .${classes.boxTitle}`]: {
    backgroundColor: 'white',
    padding: theme.spacing(3, 9),
    paddingBottom: theme.spacing(3),
    marginTop: theme.spacing(3),
    boxShadow: theme.shadows[3],
  },
}))

//Sum the active donations
function recurringDonationsSum(donations: RecurringDonationResponse[] | undefined) {
  if (!donations) {
    return 0.0
  }

  return donations
    .filter((donation) => donation.status === RecurringDonationStatus.active)
    .reduce((sum, donation) => sum + donation.amount, 0.0)
}

export default function DonationTab() {
  const router = useRouter()
  const { t } = useTranslation()

  const { data: user } = getCurrentPerson(!!router.query?.register)

  if (router.query?.register) {
    delete router.query.register
    router.replace({ pathname: router.pathname, query: router.query }, undefined, { shallow: true })
  }
  const { data: userDonations, isLoading: isUserDonationLoading } = useUserDonations()
  const { data: recurringDonations } = useGetUserRecurringDonations()

  return (
    <Root>
      <Box className={classes.boxTitle}>
        <Typography className={classes.h3}>
          {user?.user ? user.user.firstName + ' ' + user.user.lastName + ',' : ''}{' '}
          {t('profile:donations.helpThanks')}{' '}
          <VolunteerActivismIcon fontSize="inherit" color="primary" />
        </Typography>
      </Box>
      {!isUserDonationLoading && userDonations ? (
        <Card className={classes.donationsBox}>
          <Box className={classes.donationsBoxRow}>
            <Typography fontWeight="medium" variant="h6">
              {t('profile:donations.totalDonations')}
            </Typography>
            <Typography fontWeight="medium" variant="h6">
              {moneyPublic(userDonations.total)}
            </Typography>
          </Box>
          <Box className={classes.donationsBoxRow}>
            <Box>
              <Typography variant="h6">{t('profile:donations.recurringDonations')}</Typography>
              {/* TODO: Use date-fns to format and localize the months,
                     that the user has recurring donations when that is possible */}
              {/* <Typography>Я, Ф, М, А 2022</Typography> */}
            </Box>
            <Typography fontWeight="medium" variant="h6">
              {moneyPublic(recurringDonationsSum(recurringDonations))}
            </Typography>
          </Box>
          <Box className={classes.donationsBoxRow}>
            <Typography variant="h6">{t('profile:campaigns')}</Typography>
            <Typography fontWeight="medium" variant="h6">
              {
                new Set(
                  userDonations.donations?.map((donation) => donation.targetVault.campaign.slug),
                ).size
              }
            </Typography>
          </Box>
          <Box className={classes.donationsBoxRow}>
            <Typography variant="h6">{t('profile:donations.cardDonations')}</Typography>
            <Typography fontWeight="medium" variant="h6">
              {moneyPublic(
                userDonations.donations
                  .filter(
                    (a) =>
                      a.provider === PaymentProvider.stripe &&
                      a.status === DonationStatus.succeeded,
                  )
                  .reduce((a, b) => a + b.amount, 0),
              )}
            </Typography>
          </Box>
          <Box className={classes.donationsBoxRow}>
            <Typography variant="h6">{t('profile:donations.bankDonations')}</Typography>
            <Typography fontWeight="medium" variant="h6">
              {moneyPublic(
                userDonations.donations
                  .filter(
                    (a) =>
                      a.provider === PaymentProvider.bank && a.status === DonationStatus.succeeded,
                  )
                  .reduce((a, b) => a + b.amount, 0),
              )}
            </Typography>
          </Box>
        </Card>
      ) : (
        <CircularProgress />
      )}
      <Box className={classes.boxTitle}>
        <Typography className={classes.h3}>{t('profile:donations.historyDonations')}</Typography>
      </Box>
      <ProfileTab name={ProfileTabs.donations}>
        <DonationTable donations={userDonations?.donations} />
      </ProfileTab>
      <Box className={classes.boxTitle}>
        <Typography className={classes.h3}>{t('profile:donations.recurringDonations')}</Typography>
      </Box>
      <ProfileTab name={ProfileTabs.myCampaigns}>
        <MyRecurringCampaignsTable />
      </ProfileTab>
    </Root>
  )
}
