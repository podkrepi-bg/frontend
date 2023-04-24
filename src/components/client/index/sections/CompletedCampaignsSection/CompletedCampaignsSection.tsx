import { useTranslation, i18n } from 'next-i18next'
import { CampaignResponse } from 'gql/campaigns'

import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'
import { Grid } from '@mui/material'

import { useCampaignList } from 'common/hooks/campaigns'
import { campaignListPictureUrl } from 'common/util/campaignImageUrls'
import theme from 'common/theme'
import { CampaignState } from 'components/client/campaigns/helpers/campaign.enums'
import { routes } from 'common/routes'
import { settings } from './helpers/CompletedCampaignsCaroucelSettings'
import { moneyPublic } from 'common/util/money'

import { Heading } from '../../IndexPage.styled'
import {
  Root,
  CarouselWrapper,
  MoneyUnit,
  MoneyFraction,
  MoneyWrapper,
  MoneyText,
  CampaignTitle,
  CompletedCampaignLink,
  MoneyWrapperFlex,
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
    <Root>
      <Heading variant="h4" px={3}>
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
                background: `linear-gradient(180deg, rgba(81, 81, 81, 0) 50%, rgba(0, 0, 0, 0.78) 80%, #000000 100%), url(${campaignListPictureUrl(
                  campaign,
                )})`,
              }}>
              <MoneyWrapper>
                <MoneyWrapperFlex>
                  <MoneyUnit>
                    {i18n.language === 'bg'
                      ? moneyPublic(campaign.summary.reachedAmount).split(',')[0]
                      : moneyPublic(campaign.summary.reachedAmount).split('.')[0]}
                  </MoneyUnit>
                  <MoneyFraction>
                    {i18n.language === 'bg'
                      ? moneyPublic(campaign.summary.reachedAmount).split(',')[1].substring(0, 2)
                      : moneyPublic(campaign.summary.reachedAmount).split('.')[1]}
                  </MoneyFraction>
                </MoneyWrapperFlex>
                <MoneyText>{t('campaign.reached')}</MoneyText>
              </MoneyWrapper>
              <CampaignTitle>{campaign.title}</CampaignTitle>
            </CompletedCampaignLink>
          </Grid>
        ))}
      </CarouselWrapper>
    </Root>
  )
}
