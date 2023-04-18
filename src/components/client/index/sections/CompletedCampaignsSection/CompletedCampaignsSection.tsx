import { useTranslation } from 'next-i18next'
import { CampaignResponse } from 'gql/campaigns'

import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'
import { Grid } from '@mui/material'

import { useCampaignList } from 'common/hooks/campaigns'
import { campaignListPictureUrl } from 'common/util/campaignImageUrls'
import theme from 'common/theme'
import { CampaignState } from 'components/client/campaigns/helpers/campaign.enums'
import { routes } from 'common/routes'
import { settings } from './helpers/CaroucelSettings'
import { moneyPublic } from 'common/util/money'

import { Heading } from '../../IndexPage.styled'
import {
  CarouselWrapper,
  ReachedMoney,
  ReachedText,
  CampaignTitle,
  ReachedMoneyWrapper,
  CompletedCampaignLink,
} from './CompletedCampaignsSection.styled'

export default function CompletedCampaignsSection() {
  const { t } = useTranslation('campaigns')
  const { data } = useCampaignList()

  const completedCampaigns = data?.filter(
    (campaign: CampaignResponse) => campaign.state === CampaignState.complete,
  )

  const onLinkMouseDown = (e: React.ChangeEvent<unknown>) => {
    e.preventDefault()
  }

  return (
    <Grid component="section" marginTop="48px">
      <Heading variant="h4" px={3} pt={6}>
        {t('completed-campaigns')}
      </Heading>
      <CarouselWrapper {...settings}>
        {completedCampaigns?.map((campaign, index) => (
          <Grid
            key={index}
            data-testid={`campaign-card-${index}`}
            margin={theme.spacing(0, 2.25)}
            paddingRight={theme.spacing(2.5)}>
            <CompletedCampaignLink
              onMouseDown={onLinkMouseDown}
              href={routes.campaigns.viewCampaignBySlug(campaign.slug)}
              sx={{
                background: `url(${campaignListPictureUrl(campaign)})`,
              }}>
              <ReachedMoneyWrapper>
                <ReachedMoney>
                  {moneyPublic(campaign.summary.reachedAmount, campaign.currency)}{' '}
                </ReachedMoney>
                <ReachedText>{t('campaign.reached')}</ReachedText>
              </ReachedMoneyWrapper>
              <CampaignTitle>{campaign.title}</CampaignTitle>
            </CompletedCampaignLink>
          </Grid>
        ))}
      </CarouselWrapper>
    </Grid>
  )
}
