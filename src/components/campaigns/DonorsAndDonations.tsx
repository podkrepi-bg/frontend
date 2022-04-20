import React, { useState } from 'react'
import { useTranslation } from 'next-i18next'

import makeStyles from '@mui/styles/makeStyles'
import createStyles from '@mui/styles/createStyles'
import { Button, Grid, Theme, Typography } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'

import { RecentDonationResult } from 'gql/donations'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    donationsWrapper: {
      marginTop: theme.spacing(5),
    },
    donationItemWrapper: {
      display: 'flex',
      gap: theme.spacing(1),
      alignItems: 'center',
      marginBottom: theme.spacing(2),
    },
    donationQuantityAndTimeWrapper: {
      display: 'flex',
      gap: theme.spacing(1),
      color: theme.palette.grey[500],
    },
    separatorIcon: {
      fontSize: theme.spacing(1),
      alignSelf: 'center',
    },
    seeAllButton: {
      border: `1px solid ${theme.palette.primary.main}`,
    },
  }),
)

const timeDifference = (date1: Date, date2: Date) => {
  const diff = date2.getTime() - new Date(date1).getTime()
  const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 30 * 12))
  const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30))
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const minutes = Math.floor(diff / (1000 * 60))
  const seconds = Math.floor(diff / 1000)
  if (years > 0) {
    return years > 1 ? `${years} years ago` : `${years} year ago`
  } else if (months > 0) {
    return months > 1 ? `${months} months ago` : `${months} month ago`
  } else if (days > 0) {
    return days > 1 ? `${days} days ago` : `${days} day ago`
  } else if (hours > 0) {
    return hours > 1 ? `${hours} hours ago` : `${hours} hour ago`
  } else if (minutes > 0) {
    return minutes > 1 ? `${minutes} minutes ago` : `${minutes} minute ago`
  } else {
    return `${seconds} seconds ago`
  }
}

const formatDonations = (donations: RecentDonationResult[], date: Date) => {
  return donations.map((donation) => {
    return {
      donorName: `${donation.person.firstName} ${donation.person.lastName}`,
      donatedMoney:
        donation.provider.toString() === 'stripe'
          ? `${donation.amount / 100}lv`
          : `${donation.amount}lv`,
      donationTime: timeDifference(donation.createdAt, date),
    }
  })
}

type Props = {
  donations: RecentDonationResult[]
}

export default function DonorsAndDonations({ donations }: Props) {
  const classes = useStyles()
  const { t } = useTranslation()

  const [visible, setVisible] = useState(false)

  const formatted = formatDonations(donations, new Date())

  return (
    <Grid item className={classes.donationsWrapper}>
      {formatted?.slice(0, 3).map(({ donorName, donatedMoney, donationTime }, key) => (
        <Grid key={key} className={classes.donationItemWrapper}>
          <AccountCircleIcon fontSize="large" color="disabled" />
          <Grid>
            <Typography>
              {t('campaigns:cta.donor')} {key + 1}. {donorName}
            </Typography>
            <Grid className={classes.donationQuantityAndTimeWrapper}>
              <Typography>{donatedMoney}</Typography>
              <FiberManualRecordIcon className={classes.separatorIcon} />
              <Typography>{donationTime}</Typography>
            </Grid>
          </Grid>
        </Grid>
      ))}
      {visible &&
        formatted?.slice(3, 10).map(({ donorName, donatedMoney, donationTime }, key) => (
          <Grid key={key} className={classes.donationItemWrapper}>
            <AccountCircleIcon fontSize="large" color="disabled" />
            <Grid>
              <Typography>
                {t('campaigns:cta.donor')} {key + 4}. {donorName}
              </Typography>
              <Grid className={classes.donationQuantityAndTimeWrapper}>
                <Typography>{donatedMoney}</Typography>
                <FiberManualRecordIcon className={classes.separatorIcon} />
                <Typography>{donationTime}</Typography>
              </Grid>
            </Grid>
          </Grid>
        ))}
      <Button onClick={() => setVisible(!visible)} className={classes.seeAllButton}>
        {visible ? t('campaigns:cta.see-less') : t('campaigns:cta.see-all')}
      </Button>
    </Grid>
  )
}
