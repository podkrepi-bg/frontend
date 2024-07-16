import { useTranslation } from 'next-i18next'

import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

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
  const { data } = useCampaignList(true)
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
            <ActiveCampaignCard index={index} key={campaign.id} campaign={campaign} />
          ))}
        </ActiveCampaignsWrapper>
        <SeeAllButtonWrapper>
          <SeeAllButton
            href={routes.campaigns.index}
            variant="contained"
            endIcon={<ArrowForwardIcon />}>
            {t('campaign.see-more')}
          </SeeAllButton>
        </SeeAllButtonWrapper>
      </Root>
    )
  }
}
