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
import { Typography } from '@mui/material'

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
      <Root aria-labelledby="active-campaigns--heading">
        <Typography variant="hidden" id={'active-campaigns--heading'}>
          Кампании на фокус
        </Typography>
        <ActiveCampaignsWrapper>
          {activeCampaigns?.map((campaign, index) => (
            <ActiveCampaignCard index={index} key={campaign.id} campaign={campaign} />
          ))}
        </ActiveCampaignsWrapper>{' '}
        <SeeAllButtonWrapper>
          <SeeAllButton href={routes.campaigns.index}>{t('campaign.see-all')}</SeeAllButton>
        </SeeAllButtonWrapper>
      </Root>
    )
  }
}
