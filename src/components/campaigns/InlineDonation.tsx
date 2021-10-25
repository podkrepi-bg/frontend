import { useMemo, useCallback } from 'react'
import { List, ListItem, ListItemText, Typography } from '@material-ui/core'

import { CampaignResponse } from 'gql/campaigns'
import { useDonationSession, useSinglePriceList } from 'common/hooks/donations'
import { routes } from 'common/routes'

type Props = {
  campaign: CampaignResponse
}
export default function InlineDonation({ campaign }: Props) {
  const { data: prices } = useSinglePriceList()
  const mutation = useDonationSession()

  const donate = useCallback(
    async (priceId: string) => {
      const { data } = await mutation.mutateAsync({
        mode: 'payment',
        priceId,
        campaignId: campaign.id,
        successUrl: routes.campaigns.viewCampaignBySlug(campaign.slug),
      })
      console.log(data)
      console.log(data.session.url)
      if (data.session.url) {
        window.location.href = data.session.url
      }
    },
    [mutation],
  )

  const sortedPrices = useMemo(() => {
    if (!prices) return []
    return prices?.sort((a, b) => {
      if (a.unit_amount === null || b.unit_amount === null) return 0
      return a.unit_amount - b.unit_amount
    })
  }, [prices])

  return (
    <div>
      <Typography variant="button" component="h5">
        Подкрепете кампанията:
      </Typography>
      <List>
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
      </List>
      {/* <pre>{JSON.stringify(prices, null, 2)}</pre> */}
    </div>
  )
}
