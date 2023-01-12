import React, { useRef, useState } from 'react'
import { useTranslation } from 'next-i18next'
import { Unstable_Grid2 as Grid2, Stack, Typography } from '@mui/material'
import RateReviewIcon from '@mui/icons-material/RateReview'
import { useDonationWishesList } from 'common/hooks/donationWish'
import { getExactDate } from 'common/util/date'
import { bg, enUS } from 'date-fns/locale'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import Pagination from '@mui/material/Pagination'

type Props = {
  campaignId: string
  pageSize?: number
}

export default function DonationWishes({ campaignId, pageSize = 12 }: Props) {
  const { t, i18n } = useTranslation()
  const titleRef = useRef<HTMLElement>(null)
  const locale = i18n.language == 'bg' ? bg : enUS

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
    <Grid2 container direction="column" rowGap={2}>
      <Grid2>
        <Stack direction="row" alignItems="center" spacing={2}>
          <RateReviewIcon color="action" />
          <Typography variant="h6" ref={titleRef}>
            {t('campaigns:campaign.messages')}
          </Typography>
        </Stack>
      </Grid2>
      <Grid2 container direction="column" rowGap={3}>
        {isSuccess &&
          data &&
          data.items.map((wish) => (
            <Grid2
              gap={2}
              container
              key={wish.id}
              direction="row"
              sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 5 }}>
              <Grid2 xs={12}>
                <Stack direction="row" spacing={2}>
                  <Stack>
                    <AccountCircleIcon color="disabled" sx={{ fontSize: '2.3rem' }} />
                  </Stack>
                  <Stack direction="column" spacing={1}>
                    <Stack direction="column">
                      <Typography variant="caption" fontWeight={600}>
                        {wish.person
                          ? wish.person.firstName + ' ' + wish.person.lastName
                          : t('campaigns:donations.anonymous')}
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'gray' }}>
                        {getExactDate(wish.createdAt, locale)}
                      </Typography>
                    </Stack>
                    <Typography component="blockquote">{wish.message}</Typography>
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
