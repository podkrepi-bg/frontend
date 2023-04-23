import { useMemo } from 'react'

import { useTranslation } from 'next-i18next'

import { CampaignDonation } from 'gql/campaigns'

import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { Grid, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

import theme from 'common/theme'
import { moneyPublic } from 'common/util/money'
import { formatDistanceStrict, parseISO } from 'date-fns'
import { bg, enUS } from 'date-fns/locale'

const PREFIX = 'DonorsAndDonations'

const classes = {
  donationsWrapper: `${PREFIX}-donationsWrapper`,
  donationItemWrapper: `${PREFIX}-donationItemWrapper`,
  donationQuantityAndTimeWrapper: `${PREFIX}-donationQuantityAndTimeWrapper`,
  separatorIcon: `${PREFIX}-separatorIcon`,
  donatorName: `${PREFIX}-donatorName`,
  donatorAvatar: `${PREFIX}-donatorAvatar`,
}

const Root = styled('div')(({ theme }) => ({
  [`& .${classes.donationsWrapper}`]: {
    maxHeight: 400,
  },

  [`& .${classes.donationItemWrapper}`]: {
    display: 'flex',
    gap: theme.spacing(1),
    alignItems: 'center',
    marginBottom: theme.spacing(1.7),
    maxHeight: theme.spacing(4.5),

    '&:last-of-type': {
      marginBottom: 0,
    },
  },

  [`& .${classes.donationQuantityAndTimeWrapper}`]: {
    display: 'flex',
    gap: theme.spacing(1),
    color: '#909090',
    alignItems: 'center',
    lineHeight: '145%',

    '& p': {
      fontSize: theme.typography.pxToRem(12),
    },
  },

  [`& .${classes.separatorIcon}`]: {
    fontSize: theme.typography.pxToRem(21),
    fontWeight: 200,
  },

  [`& .${classes.donatorName}`]: {
    color: theme.palette.common.black,
  },

  [`& .${classes.donatorAvatar}`]: {
    width: theme.spacing(5.25),
    height: theme.spacing(5.25),
  },
}))

export default function DonorsAndDonations({
  donations,
}: {
  donations: CampaignDonation[] | undefined
}) {
  const { t, i18n } = useTranslation()
  const all = false
  const shownDonationsNumber = 5
  const donationsToShow = useMemo(() => {
    if (all) {
      return donations
    }
    return donations?.slice(0, shownDonationsNumber)
  }, [donations, all])

  return (
    <Root>
      <Grid item className={classes.donationsWrapper}>
        {donationsToShow && donationsToShow.length !== 0 ? (
          donationsToShow.map(({ person, amount, createdAt, currency }, key) => (
            <Grid key={key} className={classes.donationItemWrapper}>
              <AccountCircleIcon color="disabled" className={classes.donatorAvatar} />
              <Grid>
                <Typography className={classes.donatorName}>
                  {person
                    ? `${person.firstName} ${person.lastName}`
                    : t('campaigns:donations.anonymous')}
                </Typography>
                <Grid className={classes.donationQuantityAndTimeWrapper}>
                  <Typography>{moneyPublic(amount, currency)}</Typography>
                  <span className={classes.separatorIcon}>|</span>
                  <Typography>
                    {formatDistanceStrict(parseISO(createdAt), new Date(), {
                      locale: i18n.language == 'bg' ? bg : enUS,
                      addSuffix: true,
                    })}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          ))
        ) : (
          <Typography sx={{ textAlign: 'center', marginBottom: theme.spacing(4) }}>
            {t('campaigns:donations.none')}
          </Typography>
        )}
      </Grid>
    </Root>
  )
}
