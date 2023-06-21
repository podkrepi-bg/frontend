import { useTranslation, i18n } from 'next-i18next'
import { CampaignResponse } from 'gql/campaigns'

import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'

import { useCampaignList } from 'common/hooks/campaigns'
import { campaignListPictureUrl } from 'common/util/campaignImageUrls'
import { CampaignState } from 'components/client/campaigns/helpers/campaign.enums'
import { routes } from 'common/routes'
import { settings } from './helpers/CompletedCampaignsCarouselSettings'
import { moneyPublic } from 'common/util/money'

import { Heading } from '../../IndexPage.styled'
import {
  Root,
  CarouselWrapper,
  Sum,
  CampaignTitle,
  CompletedCampaignLink,
  CardWrapper,
  SuccessfulCampaignLabel,
  CompletedSumWrapper,
  SuccessfullCampaignIcon,
  CampaignProgressWrapper,
  SuccessfullCampiagnText,
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
          <CardWrapper key={index}>
            <CompletedCampaignLink
              onMouseDown={onLinkMouseDown}
              href={routes.campaigns.viewCampaignBySlug(campaign.slug)}
              sx={{
                background: `url(${campaignListPictureUrl(campaign)})`,
              }}
            />
            <CompletedSumWrapper>
              <Sum>
                {i18n.language === 'bg'
                  ? moneyPublic(campaign.summary.reachedAmount).split(',')[0] + ' лв.'
                  : moneyPublic(campaign.summary.reachedAmount).split('.')[0]}
              </Sum>
              <SuccessfulCampaignLabel>
                <SuccessfullCampaignIcon />
                <SuccessfullCampiagnText>{t('successfull-label')}</SuccessfullCampiagnText>
              </SuccessfulCampaignLabel>
            </CompletedSumWrapper>
            <CampaignProgressWrapper width={1} />
            <CampaignTitle>{campaign.title}</CampaignTitle>
          </CardWrapper>
        ))}
      </CarouselWrapper>
    </Root>
  )
}
