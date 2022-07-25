import React from 'react'
import { styled } from '@mui/material/styles'
import { useTranslation } from 'next-i18next'
import { Grid, Typography } from '@mui/material'
import RateReviewIcon from '@mui/icons-material/RateReview'
import { useDonationWishesList } from 'common/hooks/donationWish'
import { getExactDate } from 'common/util/date'
import { bg, enUS } from 'date-fns/locale'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'

const PREFIX = 'CampaignMessages'

const classes = {
  messagesWrapper: `${PREFIX}-messagesWrapper`,
  messagesTitleWrapper: `${PREFIX}-messagesTitleWrapper`,
  wishWrapper: `${PREFIX}-wishWrapper`,
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
}))

export default function CampaignMessages({ campaignId }: { campaignId: string }) {
  const { t, i18n } = useTranslation()
  const locale = i18n.language == 'bg' ? bg : enUS
  const { data: list } = useDonationWishesList(campaignId)

  return (
    <StyledGrid className={classes.messagesWrapper}>
      <Grid className={classes.messagesTitleWrapper}>
        <RateReviewIcon color="action" />
        <Typography variant="h6">{t('campaigns:campaign.messages')}</Typography>
      </Grid>
      {list?.map((wish) => (
        <Grid container key={wish.id} className={classes.wishWrapper}>
          <Grid item width={'40px'}>
            <AccountCircleIcon fontSize="large" color="disabled" />
          </Grid>
          <Grid item>
            <Typography>
              {wish.person
                ? wish.person.firstName + ' ' + wish.person.lastName
                : t('campaigns:donations.anonymous')}
            </Typography>
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
