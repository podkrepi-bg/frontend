import { Grid } from '@mui/material'

import { useCampaignList } from 'common/hooks/campaigns'
import { CampaignState } from 'components/client/campaigns/helpers/campaign.enums'
import ActiveCampaignCard from '../../components/ActiveCampaignCard/ActiveCampaignCard'

import { Root } from './CampaignsSection.styled'

export default function CampaignsSection() {
  const { data } = useCampaignList()
  const activeCampaigns = data
    ?.filter((campaign) => campaign.state === CampaignState.active)
    .slice(0, 5)

  if (activeCampaigns === undefined) {
    return null
  } else {
    return (
      <Root>
        <Grid container justifyContent="center" spacing={4}>
          {' '}
          {activeCampaigns?.map((campaign, index) => (
            <Grid key={index} item xs={12} sm={6} lg={3}>
              <ActiveCampaignCard index={index} campaign={campaign} />{' '}
            </Grid>
          ))}
        </Grid>
      </Root>
    )
  }
}
