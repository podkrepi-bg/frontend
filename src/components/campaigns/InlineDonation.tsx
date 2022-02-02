import { useTranslation } from 'next-i18next'
import { CampaignResponse } from 'gql/campaigns'
import { money } from 'common/util/money'
import { Grid, Theme, Typography } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import createStyles from '@mui/styles/createStyles'

import CampaignProgress from './CampaignProgress'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    inlineDonationWrapper: {
      backgroundColor: theme.palette.common.white,
      borderRadius: theme.spacing(1),
      padding: theme.spacing(3),
      marginTop: theme.spacing(5),
    },
    reachedMoney: {
      fontSize: theme.spacing(5),
      fontWeight: 500,
    },
    targetMoney: {
      fontSize: theme.spacing(3),
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
    <Grid container className={classes.inlineDonationWrapper}>
      <Typography variant="h4" component="h4" gutterBottom>
        <span className={classes.reachedMoney}>{money(reached)}</span>{' '}
        {t('campaigns:campaign.from')} <span className={classes.targetMoney}>{money(target)}</span>
      </Typography>
      <CampaignProgress raised={reached} target={target} />
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
