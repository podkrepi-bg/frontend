import { useMemo } from 'react'

import { useTranslation } from 'next-i18next'

import { DonationWishPaginatedResponse } from 'gql/donationWish'

import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { Grid2, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

import theme from 'common/theme'
import { bg, enUS } from 'date-fns/locale'
import { getExactDate } from 'common/util/date'

const PREFIX = 'DonationsWishesInline'

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
    alignItems: 'start',
    marginBottom: theme.spacing(1.7),
    maxHeight: 'fit-content',

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
    fontWeight: 500,
  },

  [`& .${classes.donatorAvatar}`]: {
    width: theme.spacing(5.25),
    height: theme.spacing(5.25),
  },
}))

export default function DonationsWishesInline({
  wishList,
  pageSize = 3,
}: {
  wishList: DonationWishPaginatedResponse
  pageSize?: number
}) {
  const { t, i18n } = useTranslation()

  const wishListToShow = useMemo(() => {
    if (wishList?.items?.length <= pageSize) {
      return wishList?.items
    }

    const wishListSortByMsgLengthAndCreateDate = wishList?.items
      ?.sort((a, b) => b?.message?.length - a?.message?.length)
      ?.slice(0, 5)
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value)
      ?.slice(0, pageSize)
      ?.sort((c, d) => (c.createdAt > d.createdAt ? -1 : 1))

    return wishListSortByMsgLengthAndCreateDate
  }, [wishList?.items])

  return (
    <Root>
      <Grid2 className={classes.donationsWrapper} data-testid="summary-wishes-wrapper">
        {wishListToShow && wishListToShow.length !== 0 ? (
          wishListToShow.map(({ person, createdAt, message }, key) => (
            <Grid2 key={key} className={classes.donationItemWrapper}>
              <AccountCircleIcon color="disabled" className={classes.donatorAvatar} />
              <Grid2>
                <Grid2 className={classes.donationQuantityAndTimeWrapper}>
                  <Typography className={classes.donatorName}>
                    {person
                      ? `${person?.firstName} ${person?.lastName}`
                      : t('campaigns:donations.anonymous')}
                  </Typography>
                  <span className={classes.separatorIcon}>|</span>
                  <Typography className={classes.donatorName}>
                    {getExactDate(createdAt, i18n.language == 'bg' ? bg : enUS)}
                  </Typography>
                </Grid2>
                <Typography
                  component="blockquote"
                  sx={{
                    fontSize: theme.typography.pxToRem(12),
                    lineHeight: '160%',
                    '&:before': { content: 'open-quote' },
                    '&:after': { content: 'close-quote' },
                  }}>
                  {message}
                </Typography>
              </Grid2>
            </Grid2>
          ))
        ) : (
          <Typography sx={{ textAlign: 'center', marginBottom: theme.spacing(4) }}>
            {t('campaigns:campaign.nowishes')}
          </Typography>
        )}
      </Grid2>
    </Root>
  )
}
