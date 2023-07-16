import { useTranslation } from 'next-i18next'

import { useCampaignList } from 'common/hooks/campaigns'
import { routes } from 'common/routes'
import { CampaignState } from 'components/client/campaigns/helpers/campaign.enums'
import ActiveCampaignCard from './ActiveCampaignCard/ActiveCampaignCard'

import {
  Root,
  ActiveCampaignsWrapper,
  SeeAllButton,
  SeeAllButtonWrapper,
} from './ActiveCampaignsSection.styled'

export default function ActiveCampaignsSection() {
  const { t } = useTranslation('index')
  const { data } = useCampaignList()
  const activeCampaigns = data
    ?.filter((campaign) => campaign.state === CampaignState.active)
    .slice(0, 5)

  if (activeCampaigns === undefined) {
    return null
  } else {
    return (
      <Root>
        <ActiveCampaignsWrapper>
          {activeCampaigns?.map((campaign, index) => (
            <ActiveCampaignCard index={index} key={index} campaign={campaign} />
          ))}
        </ActiveCampaignsWrapper>{' '}
        <SeeAllButtonWrapper>
          <SeeAllButton href={routes.campaigns.index}>{t('campaign.see-all')}</SeeAllButton>
        </SeeAllButtonWrapper>
      </Root>
    )
  }
}
