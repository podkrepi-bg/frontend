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
        {activeCampaigns?.map((campaign, index) => (
          <ActiveCampaignCard index={index} key={index} campaign={campaign} />
        ))}
      </Root>
    )
  }
}
