import { useCallback } from 'react'
import { useTranslation } from 'next-i18next'
import { CampaignResponse } from 'gql/campaigns'
import { baseUrl, routes } from 'common/routes'
import { money } from 'common/util/money'
import { useDonationSession } from 'common/hooks/donation'
import LinkButton from 'components/common/LinkButton'
import CampaignProgress from './CampaignProgress'
import DonorsAndDonations from './DonorsAndDonations'
import { CircularProgress, Grid, Theme, Typography } from '@mui/material'
import ShareIcon from '@mui/icons-material/Share'
import makeStyles from '@mui/styles/makeStyles'
import createStyles from '@mui/styles/createStyles'
import { useCampaignDonationHistory } from 'common/hooks/campaigns'
import theme from 'common/theme'
import DonationsChoice from './DonationsChoice'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    inlineDonationWrapper: {
      backgroundColor: theme.palette.common.white,
      borderRadius: theme.spacing(1),
      height: 'fit-content',
      boxShadow: '1px 2px 8px #8888888c',
    },
    reachedMoney: {
      fontSize: theme.spacing(5),
      fontWeight: 500,
    },
    targetMoney: {
      fontSize: theme.spacing(3),
    },
    donorsSharesCount: {
      fontWeight: 'bold',
      fontSize: theme.spacing(2),
    },
    shareButton: {
      padding: theme.spacing(0.75, 0),
      borderColor: theme.palette.warning.main,
      color: 'black',
    },
    donationPriceList: {
      display: 'contents',
      textAlignLast: 'center',
    },
    supportButton: {
      background: theme.palette.warning.light,
    },
  }),
)

type Props = {
  campaign: CampaignResponse
}

export default function InlineDonation({ campaign }: Props) {
  const classes = useStyles()
  const { t } = useTranslation()

  const target = campaign.targetAmount
  const summary = campaign.summary.find(() => true)
  const reached = summary ? summary.reachedAmount : 0
  const {
    data: donations,
    error: donationHistoryError,
    isLoading: isDonationHistoryLoading,
  } = useCampaignDonationHistory(campaign.id)
  const mutation = useDonationSession()

  const donate = useCallback(
    async (priceId: string) => {
      const { data } = await mutation.mutateAsync({
        mode: 'payment',
        priceId,
        campaignId: campaign.id,
        successUrl: `${baseUrl}${routes.campaigns.viewCampaignBySlug(campaign.slug)}`,
        cancelUrl: `${baseUrl}${routes.campaigns.viewCampaignBySlug(campaign.slug)}`,
      })
      console.log(data)
      console.log(data.session.url)
      if (data.session.url) {
        window.location.href = data.session.url
      }
    },
    [mutation],
  )
  return (
    <Grid item xs={12} md={4} mt={5} p={3} className={classes.inlineDonationWrapper}>
      <Grid mb={2}>
        <Typography component="span" className={classes.reachedMoney}>
          {money(reached)}
        </Typography>{' '}
        {t('campaigns:campaign.from')}{' '}
        <Typography component="span" className={classes.targetMoney}>
          {money(target)}
        </Typography>
      </Grid>
      <CampaignProgress raised={reached} target={target} />
      <Grid display="inline-block" m={3} ml={0}>
        <Typography className={classes.donorsSharesCount}>{0}</Typography>
        <Typography>{t('campaigns:campaign.donors')}</Typography>
      </Grid>
      <Grid display="inline-block" m={3} ml={0}>
        <Typography className={classes.donorsSharesCount}>{0}</Typography>
        <Typography>{t('campaigns:campaign.shares')}</Typography>
      </Grid>
      <Grid container gap={2}>
        <LinkButton
          fullWidth
          href="#"
          variant="outlined"
          size="small"
          startIcon={<ShareIcon />}
          color="secondary"
          className={classes.shareButton}>
          {t('campaigns:cta.share')}
        </LinkButton>
        <DonationsChoice
          onSingleClick={(priceId) => {
            donate(priceId)
          }}
          onRecurringClick={(priceId) => {
            donate(priceId)
          }}
        />
      </Grid>
      {donationHistoryError ? (
        'Error fetching donation history'
      ) : isDonationHistoryLoading ? (
        <CircularProgress sx={{ display: 'block', margin: `${theme.spacing(3)} auto` }} />
      ) : (
        <DonorsAndDonations donations={donations} />
      )}
    </Grid>
  )
}
