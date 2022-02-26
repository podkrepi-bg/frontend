import React from 'react'
import { useTranslation } from 'next-i18next'
import { Grid, Theme, Typography } from '@mui/material'
import FeedIcon from '@mui/icons-material/Feed'
import makeStyles from '@mui/styles/makeStyles'
import createStyles from '@mui/styles/createStyles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    latestNewsWrapper: {
      margin: theme.spacing(20, 0, 5, 0),
    },
    latestNewsTitleWrapper: {
      display: 'flex',
      gap: theme.spacing(3),
      alignItems: 'end',
      marginBottom: theme.spacing(3),
    },
  }),
)

export default function LatestNews() {
  const classes = useStyles()
  const { t } = useTranslation()

  return (
    <Grid className={classes.latestNewsWrapper}>
      <Grid className={classes.latestNewsTitleWrapper}>
        <FeedIcon />
        <Typography>{t('campaigns:campaign.latest-news')}</Typography>
      </Grid>
      <Typography>25 Януари 2022</Typography>
      <Typography>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat.
      </Typography>
    </Grid>
  )
}
