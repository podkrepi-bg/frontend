import { useTranslation } from 'next-i18next'

import { Grid } from '@mui/material'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'

import { useCampaignList } from 'common/hooks/campaigns'
import { routes } from 'common/routes'
import { CampaignState } from 'components/client/campaigns/helpers/campaign.enums'
import ActiveCampaignCard from './ActiveCampaignCard/ActiveCampaignCard'

import { OutlinedButton } from '../../IndexPage.styled'
import { Root, SeeAllButton } from './ActiveCampaignsSection.styled'

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
      <Grid component="section">
        <Root>
          {activeCampaigns?.map((campaign, index) => (
            <ActiveCampaignCard index={index} key={index} campaign={campaign} />
          ))}
        </Root>
        <SeeAllButton>
          <OutlinedButton
            href={routes.campaigns.index}
            variant="outlined"
            endIcon={<ChevronRightIcon />}>
            {t('campaign.see-all')}
          </OutlinedButton>
        </SeeAllButton>
      </Grid>
    )
  }
}
