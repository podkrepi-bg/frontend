import React, { useRef, useState } from 'react'

import { useTranslation } from 'next-i18next'

import { Unstable_Grid2 as Grid2, Stack, Typography, Grid } from '@mui/material'
import RateReviewIcon from '@mui/icons-material/RateReview'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import Pagination from '@mui/material/Pagination'

import { bg, enUS } from 'date-fns/locale'
import { useDonationWishesList } from 'common/hooks/donationWish'
import { getExactDate } from 'common/util/date'
import theme from 'common/theme'

type Props = {
  campaignId: string
  pageSize?: number
}

export default function DonationWishes({ campaignId, pageSize = 12 }: Props) {
  const { t, i18n } = useTranslation('campaigns')
  const locale = i18n.language == 'bg' ? bg : enUS
  const titleRef = useRef<HTMLElement>(null)
  const [pageIndex, setPageIndex] = useState<number>(0)
  const { data, isSuccess } = useDonationWishesList(campaignId, pageIndex, pageSize)
  const numOfPages = isSuccess && data ? Math.ceil(data.totalCount / pageSize) : 0

  const handlePageChange = (_e: React.ChangeEvent<unknown>, page: number) => {
    // <Pagination /> 's impl is 1 index based
    // Our pagination apis are 0 index based
    setPageIndex(page - 1)
    if (titleRef.current) {
      titleRef.current.scrollIntoView({
        block: 'center',
        behavior: 'smooth',
      })
    }
  }

  return (
    <Grid2 container direction="column" rowGap={4}>
      <Grid2>
        <Stack direction="row" alignItems="center">
          <RateReviewIcon
            color="action"
            sx={{
              width: theme.spacing(1.75),
              height: theme.spacing(1.75),
              marginRight: theme.spacing(1),
            }}
          />
          <Typography
            ref={titleRef}
            sx={{
              color: theme.palette.grey[800],
              fontSize: theme.typography.pxToRem(16),
              fontWeight: 500,
            }}>
            {t('campaign.messages')}
          </Typography>
        </Stack>
      </Grid2>
      <Grid2 container direction="column" rowGap={3}>
        {isSuccess &&
          data &&
          data.items &&
          data.items.map((wish) => (
            <Grid2
              container
              key={wish.id}
              direction="row"
              sx={{ p: 2, bgcolor: 'grey.100', borderRadius: theme.spacing(2) }}>
              <Grid2 xs={12}>
                <Stack direction="row" spacing={2}>
                  <Grid pt={0.7}>
                    <AccountCircleIcon
                      color="disabled"
                      sx={{ fontSize: theme.typography.pxToRem(37) }}
                    />
                  </Grid>
                  <Stack direction="column">
                    <Typography
                      variant="caption"
                      sx={{
                        fontWeight: 700,
                        fontSize: theme.typography.pxToRem(16),
                        color: theme.palette.grey[800],
                      }}>
                      {wish.person
                        ? wish.person.firstName + ' ' + wish.person.lastName
                        : t('donations.anonymous')}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        fontSize: theme.typography.pxToRem(14),
                        color: 'rgba(0, 0, 0, 0.54)',
                      }}>
                      {getExactDate(wish.createdAt, locale)}
                    </Typography>
                    <Typography
                      component="blockquote"
                      sx={{
                        mt: 1,
                        fontSize: theme.typography.pxToRem(16),
                        lineHeight: '160%',
                        '&:before': { content: 'open-quote', verticalAlign: theme.spacing(1.25) },
                        '&:after': { content: 'close-quote' },
                      }}>
                      {wish.message}
                    </Typography>
                  </Stack>
                </Stack>
              </Grid2>
            </Grid2>
          ))}
        <Grid2 xs={12}>
          {numOfPages > 1 && (
            <Pagination
              count={numOfPages}
              onChange={handlePageChange}
              sx={{ ul: { justifyContent: 'center' } }}
            />
          )}
        </Grid2>
      </Grid2>
    </Grid2>
  )
}
