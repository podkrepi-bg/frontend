import React, { useMemo, useState } from 'react'
import { Button, Grid, Theme, Typography } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'
import makeStyles from '@mui/styles/makeStyles'
import createStyles from '@mui/styles/createStyles'
import { useTranslation } from 'next-i18next'
import { CampaignDonation } from 'gql/campaigns'
import { formatRelative, parseISO } from 'date-fns'
import { bg, enUS } from 'date-fns/locale'
import theme from 'common/theme'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    donationsWrapper: {
      marginTop: theme.spacing(5),
      maxHeight: 400,
      overflowY: 'scroll',
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
  const { t, i18n } = useTranslation()
  const [all, setAll] = useState<boolean>(false)
  const shownDonationsNumber = 5
  const donationsToShow = useMemo(() => {
    if (all) {
      return donations
    }
    return donations?.slice(0, shownDonationsNumber)
  }, [donations, all])
  return (
    <>
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
                    {(amount / 100).toFixed(2) + ' ' + t('campaigns:donations.lv')}
                  </Typography>
                  <FiberManualRecordIcon className={classes.separatorIcon} />
                  <Typography>
                    {formatRelative(parseISO(createdAt), new Date(), {
                      locale: i18n.language == 'bg' ? bg : enUS,
                    })}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          ))
        ) : (
          <Typography sx={{ textAlign: 'center', marginBottom: theme.spacing(4) }}>
            {t('campaigns:donations.none')}
          </Typography>
        )}
      </Grid>
      <Grid>
        {donations && donations.length > shownDonationsNumber && (
          <Button onClick={() => setAll((prev) => !prev)} className={classes.seeAllButton}>
            {all ? t('campaigns:cta.see-less') : t('campaigns:cta.see-all')}
          </Button>
        )}
      </Grid>
    </>
  )
}
