import { useTranslation } from 'next-i18next'

import { Grid } from '@mui/material'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import CampaignCard from 'components/client/campaigns/CampaignCard'
import { useCampaignList } from 'common/hooks/campaigns'
import { routes } from 'common/routes'

import { OutlinedButton } from '../../IndexPage.styled'
import { Root } from './CampaignsSection.styled'
import { CampaignState } from 'components/client/campaigns/helpers/campaign.enums'

export default function CampaignsSection() {
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
        <Grid container justifyContent="center" spacing={4}>
          {activeCampaigns?.map((campaign, index) => (
            <Grid key={index} item xs={12} sm={6} lg={3}>
              <CampaignCard index={index} campaign={campaign} />
            </Grid>
          ))}
        </Grid>
        <Grid textAlign="center">
          <OutlinedButton
            href={routes.campaigns.index}
            variant="outlined"
            endIcon={<ChevronRightIcon />}>
            {t('campaign.see-all')}
          </OutlinedButton>
        </Grid>
      </Root>
    )
  }
}
