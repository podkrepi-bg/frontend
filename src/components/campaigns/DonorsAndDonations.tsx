import React, { useMemo, useState } from 'react'
import { styled } from '@mui/material/styles'
import { Button, Grid, Typography } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'
import { useTranslation } from 'next-i18next'
import { CampaignDonation } from 'gql/campaigns'
import { formatRelative, parseISO } from 'date-fns'
import { bg, enUS } from 'date-fns/locale'
import theme from 'common/theme'
import { money } from 'common/util/money'

const PREFIX = 'DonorsAndDonations'

const classes = {
  donationsWrapper: `${PREFIX}-donationsWrapper`,
  donationItemWrapper: `${PREFIX}-donationItemWrapper`,
  donationQuantityAndTimeWrapper: `${PREFIX}-donationQuantityAndTimeWrapper`,
  separatorIcon: `${PREFIX}-separatorIcon`,
}

const Root = styled('div')(({ theme }) => ({
  [`& .${classes.donationsWrapper}`]: {
    marginTop: theme.spacing(5),
    maxHeight: 400,
    overflowY: 'scroll',
  },

  [`& .${classes.donationItemWrapper}`]: {
    display: 'flex',
    gap: theme.spacing(1),
    alignItems: 'center',
    marginBottom: theme.spacing(2),
  },

  [`& .${classes.donationQuantityAndTimeWrapper}`]: {
    display: 'flex',
    gap: theme.spacing(1),
    color: theme.palette.grey[500],
  },

  [`& .${classes.separatorIcon}`]: {
    fontSize: theme.spacing(1),
    alignSelf: 'center',
  },
}))

export default function DonorsAndDonations({
  donations,
}: {
  donations: CampaignDonation[] | undefined
}) {
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
    <Root>
      <Grid item className={classes.donationsWrapper}>
        {donationsToShow && donationsToShow.length !== 0 ? (
          donationsToShow.map(({ person, amount, createdAt, currency }, key) => (
            <Grid key={key} className={classes.donationItemWrapper}>
              <AccountCircleIcon fontSize="large" color="disabled" />
              <Grid>
                <Typography>
                  {person
                    ? person.firstName + ' ' + person.lastName
                    : t('campaigns:donations.anonymous')}
                </Typography>
                <Grid className={classes.donationQuantityAndTimeWrapper}>
                  <Typography>{money(amount, currency)}</Typography>
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
          <Button onClick={() => setAll((prev) => !prev)} variant="outlined">
            {all ? t('campaigns:cta.see-less') : t('campaigns:cta.see-all')}
          </Button>
        )}
      </Grid>
    </Root>
  )
}
