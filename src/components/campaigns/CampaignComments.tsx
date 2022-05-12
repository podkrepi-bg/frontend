import React from 'react'
import { styled } from '@mui/material/styles'
import { useTranslation } from 'next-i18next'
import { Grid, Typography } from '@mui/material'
import CommentIcon from '@mui/icons-material/Comment'
const PREFIX = 'CampaignComments'

const classes = {
  commentsWrapper: `${PREFIX}-commentsWrapper`,
  commentsTitleWrapper: `${PREFIX}-commentsTitleWrapper`,
}

const StyledGrid = styled(Grid)(({ theme }) => ({
  [`&.${classes.commentsWrapper}`]: {
    margin: theme.spacing(5, 0),
  },

  [`& .${classes.commentsTitleWrapper}`]: {
    display: 'flex',
    gap: theme.spacing(3),
    alignItems: 'end',
    marginBottom: theme.spacing(3),
  },
}))

export default function CampaignComments() {
  const { t } = useTranslation()

  return (
    <StyledGrid className={classes.commentsWrapper}>
      <Grid className={classes.commentsTitleWrapper}>
        <CommentIcon />
        <Typography>{t('campaigns:campaign.comments')}</Typography>
      </Grid>
      <Typography>
        1. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
        ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat.
      </Typography>
    </StyledGrid>
  )
}
