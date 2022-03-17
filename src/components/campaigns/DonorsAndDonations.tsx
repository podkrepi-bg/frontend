import React from 'react'
import { Button, Grid, Theme, Typography } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'
import makeStyles from '@mui/styles/makeStyles'
import createStyles from '@mui/styles/createStyles'
import { useTranslation } from 'next-i18next'

type DonationItem = {
  donorName: string
  donatedMoney: string
  donationTime?: string
}

const allDonationItem: DonationItem[] = [
  {
    donorName: 'Donor 1',
    donatedMoney: '10lv',
    donationTime: '1 hour ago',
  },
  {
    donorName: 'Donor 2',
    donatedMoney: '100lv',
    donationTime: '20 hours ago',
  },
  {
    donorName: 'Donor 3',
    donatedMoney: '1000lv',
    donationTime: '21 hours ago',
  },
]

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

export default function DonorsAndDonations() {
  const classes = useStyles()
  const { t } = useTranslation()

  return (
    <Grid item className={classes.donationsWrapper}>
      {allDonationItem.map(({ donorName, donatedMoney, donationTime }, key) => (
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
      <Button className={classes.seeAllButton}>{t('campaigns:cta.see-all')}</Button>
    </Grid>
  )
}
