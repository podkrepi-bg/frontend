import React, { useState } from 'react'
import { styled } from '@mui/material/styles'
import { useTranslation } from 'next-i18next'
import { Grid, Typography } from '@mui/material'
import RateReviewIcon from '@mui/icons-material/RateReview'
import { useDonationWishesList } from 'common/hooks/donationWish'
import { getExactDate } from 'common/util/date'
import { bg, enUS } from 'date-fns/locale'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import Pagination from '@mui/material/Pagination'

const PREFIX = 'CampaignMessages'

const classes = {
  messagesWrapper: `${PREFIX}-messagesWrapper`,
  messagesTitleWrapper: `${PREFIX}-messagesTitleWrapper`,
  wishWrapper: `${PREFIX}-wishWrapper`,
  pagination: `${PREFIX}-pagination`,
}

const StyledGrid = styled(Grid)(({ theme }) => ({
  [`&.${classes.messagesWrapper}`]: {
    margin: theme.spacing(5, 0),
  },

  [`& .${classes.messagesTitleWrapper}`]: {
    display: 'flex',
    gap: theme.spacing(3),
    alignItems: 'end',
    marginBottom: theme.spacing(3),
  },
  [`& .${classes.wishWrapper}`]: {
    display: 'flex',
    gap: theme.spacing(1),
    alignItems: 'flex-start',
    marginBottom: theme.spacing(2),
  },
  [`& .${classes.pagination}`]: {
    margin: theme.spacing(4, 0),
  },
}))

const pageSize = 12

export default function CampaignMessages({ campaignId }: { campaignId: string }) {
  const [pageIndex, setPageIndex] = useState<number>(0)
  const { t, i18n } = useTranslation()
  const locale = i18n.language == 'bg' ? bg : enUS
  const { data, isSuccess } = useDonationWishesList(campaignId, pageIndex, pageSize)
  const numOfPages = isSuccess ? Math.ceil(data.totalCount / pageSize) : undefined

  function handlePageChange(_e: React.ChangeEvent<unknown>, page: number) {
    // <Pagination /> 's impl is 1 index based
    // Our pagination apis are 0 index based
    setPageIndex(page - 1)
  }

  return (
    <StyledGrid className={classes.messagesWrapper}>
      <Grid className={classes.messagesTitleWrapper}>
        <RateReviewIcon color="action" />
        <Typography variant="h6">{t('campaigns:campaign.messages')}</Typography>
      </Grid>
      {isSuccess && numOfPages! > 1 && (
        <Pagination
          className={classes.pagination}
          count={numOfPages}
          color="primary"
          onChange={handlePageChange}
        />
      )}
      {isSuccess &&
        data.items.map((wish) => (
          <Grid item container key={wish.id} className={classes.wishWrapper}>
            <Grid item xs={12}>
              <AccountCircleIcon
                sx={{ fontSize: '1.8rem', mr: '6px', mb: '-11px' }}
                color="disabled"
              />
              <span>
                {wish.person
                  ? wish.person.firstName + ' ' + wish.person.lastName
                  : t('campaigns:donations.anonymous')}
              </span>
            </Grid>
            <Grid item xs={12} pl={'33px'}>
              <Typography>
                <q>{wish.message}</q>
              </Typography>
              <Typography>{getExactDate(wish.createdAt, locale)}</Typography>
            </Grid>
          </Grid>
        ))}
    </StyledGrid>
  )
}
