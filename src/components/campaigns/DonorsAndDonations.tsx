import { East } from '@mui/icons-material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { Button, Grid, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import theme from 'common/theme'
import { moneyPublic } from 'common/util/money'
import { formatDistanceStrict, parseISO } from 'date-fns'
import { bg, enUS } from 'date-fns/locale'
import { CampaignDonation } from 'gql/campaigns'
import { useTranslation } from 'next-i18next'
import { useMemo, useState } from 'react'

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
                    ? `${person.firstName} ${person.lastName}`
                    : t('campaigns:donations.anonymous')}
                </Typography>
                <Grid className={classes.donationQuantityAndTimeWrapper}>
                  <Typography>{moneyPublic(amount, currency)}</Typography>|
                  <Typography>
                    {formatDistanceStrict(parseISO(createdAt), new Date(), {
                      locale: i18n.language == 'bg' ? bg : enUS,
                      addSuffix: true,
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
      <Button variant="text" onClick={() => setAll((prev) => !prev)}>
        {all ? t('campaigns:cta.see-less') : t('campaigns:cta.see-all')}{' '}
        <East fontSize="small" sx={{ ml: theme.spacing(1) }} />
      </Button>
    </Root>
  )
}
