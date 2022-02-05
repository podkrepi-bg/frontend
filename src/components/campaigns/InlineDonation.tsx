import { useTranslation } from 'next-i18next'
import { CampaignResponse } from 'gql/campaigns'
import { money } from 'common/util/money'
import LinkButton from 'components/common/LinkButton'
import CampaignProgress from './CampaignProgress'
import { Grid, Theme, Typography } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import createStyles from '@mui/styles/createStyles'
import ShareIcon from '@mui/icons-material/Share'
import { Favorite } from '@mui/icons-material'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    inlineDonationWrapper: {
      backgroundColor: theme.palette.common.white,
      borderRadius: theme.spacing(1),
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

  // const { data: prices } = useSinglePriceList()
  // const mutation = useDonationSession()

  // const donate = useCallback(
  //   async (priceId: string) => {
  //     const { data } = await mutation.mutateAsync({
  //       mode: 'payment',
  //       priceId,
  //       campaignId: campaign.id,
  //       successUrl: `${baseUrl}${routes.campaigns.viewCampaignBySlug(campaign.slug)}`,
  //       cancelUrl: `${baseUrl}${routes.campaigns.viewCampaignBySlug(campaign.slug)}`,
  //     })
  //     console.log(data)
  //     console.log(data.session.url)
  //     if (data.session.url) {
  //       window.location.href = data.session.url
  //     }
  //   },
  //   [mutation],
  // )

  // const sortedPrices = useMemo(() => {
  //   if (!prices) return []
  //   return prices?.sort((a, b) => {
  //     if (a.unit_amount === null || b.unit_amount === null) return 0
  //     return a.unit_amount - b.unit_amount
  //   })
  // }, [prices])

  return (
    <Grid container mt={5} p={3} className={classes.inlineDonationWrapper}>
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
      <Grid display="block" m={3} ml={0}>
        <Typography className={classes.donorsSharesCount}>{0}</Typography>
        <Typography>{t('campaigns:campaign.donors')}</Typography>
      </Grid>
      <Grid display="block" m={3} ml={0}>
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
        <LinkButton
          fullWidth
          href="#"
          variant="contained"
          color="secondary"
          startIcon={<Favorite color="action" />}>
          {t('common:support')}
        </LinkButton>
      </Grid>
      {/* <List>
        {sortedPrices.map((price, index) => {
          if (!price) return null
          return (
            <ListItem button key={index}>
              <ListItemText
                onClick={() => donate(price.id)}
                primary={`${(price.unit_amount ?? 100) / 100} лв.`}
                secondary={price.metadata.title}
              />
            </ListItem>
          )
        })}
      </List> */}
      {/* <pre>{JSON.stringify(prices, null, 2)}</pre> */}
    </Grid>
  )
}
