import {
  Box,
  Button,
  Grid,
  Card,
  Typography,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
  CircularProgress,
  useMediaQuery,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import React from 'react'
import { sumBy, truncate } from 'lodash'
import { useTranslation } from 'next-i18next'

import theme from 'common/theme'
import { money } from 'common/util/money'
import { useUserDonations } from 'common/hooks/donation'
import { useCampaignList } from 'common/hooks/campaigns'
import { getCurrentPerson } from 'common/util/useCurrentPerson'
import { campaignListPictureUrl } from 'common/util/campaignImageUrls'
import { useRouter } from 'next/router'

import { ProfileTabs } from './tabs'
import ProfileTab from './ProfileTab'
import DonationTable from './DonationTable'

const PREFIX = 'DonationTab'

const classes = {
  donationsBox: `${PREFIX}-donationsBox`,
  donationsBoxRow: `${PREFIX}-donationsBoxRow`,
  h1: `${PREFIX}-h1`,
}

const StyledProfileTab = styled(ProfileTab)({
  [`& .${classes.donationsBox}`]: {
    padding: theme.spacing(5),
  },
  [`& .${classes.donationsBoxRow}`]: {
    '&:first-child': {
      borderBottom: `1px solid ${theme.palette.divider}`,
      marginBottom: theme.spacing(5),
      paddingBottom: theme.spacing(3),
    },
    marginBottom: theme.spacing(5),
    display: 'flex',
    justifyContent: 'space-between',
  },
  [`& .${classes.h1}`]: {
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '45px',
    lineHeight: '65px',
    margin: '0',
  },
})

export default function DonationTab() {
  const router = useRouter()
  const { t } = useTranslation()
  const matches = useMediaQuery(theme.breakpoints.down('md'))

  const { data: user } = getCurrentPerson(!!router.query?.register)
  if (router.query?.register) {
    delete router.query.register
    router.replace({ pathname: router.pathname, query: router.query }, undefined, { shallow: true })
  }
  const { data: userDonations, isLoading: isUserDonationLoading } = useUserDonations()
  const { data: campaigns, isLoading: isCampaignLoading } = useCampaignList()
  return (
    <StyledProfileTab name={ProfileTabs.donations}>
      <Typography className={classes.h1}>{user?.user ? user.user.firstName + ',' : ''}</Typography>
      <Typography variant="h5" fontWeight={'medium'}>
        {t('profile:donations.helpThanks')} ❤️
      </Typography>
      <Grid
        container
        spacing={theme.spacing(2)}
        marginTop={theme.spacing(1)}
        alignItems={'flex-end'}>
        <Grid order={matches ? 3 : 1} item xs={12} md={4}>
          <Card>
            {!isCampaignLoading && campaigns ? (
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="193"
                  image={campaignListPictureUrl(campaigns[0])}
                  alt={campaigns[0].title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {campaigns[0].title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {truncate(campaigns[0].description, { length: 120 })}
                  </Typography>
                </CardContent>
              </CardActionArea>
            ) : (
              <CircularProgress />
            )}
            <CardActions>
              <Button variant="contained" size="medium" color="secondary">
                {t('profile:donations.donateNow')} ❤️
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid order={matches ? 1 : 2} item xs={12} md={8}>
          {!isUserDonationLoading && userDonations ? (
            <Card className={classes.donationsBox}>
              <Box className={classes.donationsBoxRow}>
                <Typography fontWeight="medium" variant="h5">
                  {t('profile:donations.totalDonations')}
                </Typography>
                <Typography fontWeight="medium" variant="h5">
                  {money(userDonations.total)}
                </Typography>
              </Box>
              <Box className={classes.donationsBoxRow}>
                <Box>
                  <Typography variant="h5">{t('profile:donations.recurringDonations')}</Typography>
                  {/* TODO: Use date-fns to format and localize the months,
                   that the user has recurring donations when that is possible */}
                  {/* <Typography>Я, Ф, М, А 2022</Typography> */}
                </Box>
                <Typography fontWeight="medium" variant="h5">
                  {money(sumBy(userDonations.donations, 'amount'))}
                </Typography>
              </Box>
              <Box className={classes.donationsBoxRow}>
                <Typography variant="h5">{t('profile:donations.cardDonations')}</Typography>
                <Typography fontWeight="medium" variant="h5">
                  {money(userDonations.total)}
                </Typography>
              </Box>
              <Box className={classes.donationsBoxRow}>
                <Typography variant="h5">{t('profile:donations.bankDonations')}</Typography>
                <Typography fontWeight="medium" variant="h5">
                  {money(userDonations.total)}
                </Typography>
              </Box>
            </Card>
          ) : (
            <CircularProgress />
          )}
        </Grid>
        <Grid order={matches ? 2 : 3} item xs={12}>
          <DonationTable donations={userDonations?.donations} />
        </Grid>
      </Grid>
    </StyledProfileTab>
  )
}
