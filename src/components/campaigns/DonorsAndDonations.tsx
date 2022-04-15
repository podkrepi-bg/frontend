import React, { useState } from 'react'
import { Button, Grid, Theme, Typography } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'
import makeStyles from '@mui/styles/makeStyles'
import createStyles from '@mui/styles/createStyles'
import { useTranslation } from 'next-i18next'
import { CampaignDonation } from 'gql/campaigns'
import { parseISO } from 'date-fns'
import { getDurationUntilNow, formatDuration } from 'common/util/date'
import theme from 'common/theme'

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

export default function DonorsAndDonations({
  donations,
}: {
  donations: CampaignDonation[] | undefined
}) {
  const classes = useStyles()
  const { t } = useTranslation()
  const [donationsToShow, setDonationsToShow] = useState<CampaignDonation[] | undefined>(
    donations?.slice(0, 1),
  )
  return (
    <Grid item className={classes.donationsWrapper}>
      {donationsToShow && donationsToShow.length !== 0 ? (
        donationsToShow.map(({ person, amount, createdAt }, key) => (
          <Grid key={key} className={classes.donationItemWrapper}>
            <AccountCircleIcon fontSize="large" color="disabled" />
            <Grid>
              <Typography>
                {t('campaigns:cta.donor')} {key + 1}.{' '}
                {person
                  ? person.firstName + ' ' + person.lastName
                  : t('campaigns:donations.anonymous')}
              </Typography>
              <Grid className={classes.donationQuantityAndTimeWrapper}>
                <Typography>
                  {Math.round(amount / 100) + ' ' + t('campaigns:donations.lv')}
                </Typography>
                <FiberManualRecordIcon className={classes.separatorIcon} />
                <Typography>{formatDuration(getDurationUntilNow(parseISO(createdAt)))}</Typography>
              </Grid>
            </Grid>
          </Grid>
        ))
      ) : (
        <Typography sx={{ textAlign: 'center', marginBottom: theme.spacing(4) }}>
          {t('campaigns:donations.none')}
        </Typography>
      )}
      <Button onClick={() => setDonationsToShow(donations)} className={classes.seeAllButton}>
        {t('campaigns:cta.see-all')}
      </Button>
    </Grid>
  )
}
