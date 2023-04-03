import { useTranslation } from 'next-i18next'

import Carousel from 'react-material-ui-carousel'

import { Grid, Paper } from '@mui/material'

import { useCampaignList } from 'common/hooks/campaigns'
import { campaignListPictureUrl } from 'common/util/campaignImageUrls'
import { CampaignState } from 'components/client/campaigns/helpers/campaign.enums'

import { Heading } from '../../IndexPage.styled'
import { CampaignResponse } from 'gql/campaigns'

type Props = { campaign: CampaignResponse; index: number }

export default function CompletedCampaignsSectiom({ campaign, index }: Props) {
  const { t } = useTranslation('campaigns')
  const { data } = useCampaignList()
  const completedCampaigns = data?.filter(
    (campaign: CampaignResponse) => campaign.state === CampaignState.complete,
  )
  const campaignImagesUrl = campaignListPictureUrl(campaign)

  return (
    <Grid>
      <Heading variant="h4" px={3} pt={6}>
        {t('completed-campaigns')}
      </Heading>
      <Carousel>
        {completedCampaigns?.map((campaign) => (
          <Paper key={index} data-testid={`campaign-card-${index}`}>
            <Grid
              sx={{
                background: `url(${campaignImagesUrl})`,
                height: '300px',
                backgroundSize: 'cover',
              }}>
              {campaign.title}
            </Grid>
          </Paper>
        ))}
      </Carousel>
    </Grid>
  )
}
