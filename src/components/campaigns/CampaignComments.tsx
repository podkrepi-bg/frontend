import React from 'react'
import { useTranslation } from 'next-i18next'
import { Grid, Theme, Typography } from '@mui/material'
import CommentIcon from '@mui/icons-material/Comment'
import makeStyles from '@mui/styles/makeStyles'
import createStyles from '@mui/styles/createStyles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    commentsWrapper: {
      margin: theme.spacing(5, 0),
    },
    commentsTitleWrapper: {
      display: 'flex',
      gap: theme.spacing(3),
      alignItems: 'end',
      marginBottom: theme.spacing(3),
    },
  }),
)

export default function CampaignComments() {
  const classes = useStyles()
  const { t } = useTranslation()

  return (
    <Grid className={classes.commentsWrapper}>
      <Grid className={classes.commentsTitleWrapper}>
        <CommentIcon />
        <Typography>{t('campaigns:campaign.comments')}</Typography>
      </Grid>
      <Typography>
        1. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
        ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat.
      </Typography>
    </Grid>
  )
}
