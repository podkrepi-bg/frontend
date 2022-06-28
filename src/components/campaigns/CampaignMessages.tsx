import React from 'react'
import { styled } from '@mui/material/styles'
import { useTranslation } from 'next-i18next'
import { Grid, Typography } from '@mui/material'
import RateReviewIcon from '@mui/icons-material/RateReview'

const PREFIX = 'CampaignMessages'

const classes = {
  messagesWrapper: `${PREFIX}-messagesWrapper`,
  messagesTitleWrapper: `${PREFIX}-messagesTitleWrapper`,
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
}))

export default function CampaignMessages() {
  const { t } = useTranslation()

  return (
    <StyledGrid className={classes.messagesWrapper}>
      <Grid className={classes.messagesTitleWrapper}>
        <RateReviewIcon color="action" />
        <Typography variant="h6">{t('campaigns:campaign.messages')}</Typography>
      </Grid>
      <Typography>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat.
      </Typography>
    </StyledGrid>
  )
}
