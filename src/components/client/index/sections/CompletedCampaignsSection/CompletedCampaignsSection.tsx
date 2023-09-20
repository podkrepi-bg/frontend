import { useTranslation, i18n } from 'next-i18next'
import Image from 'next/image'
import Link from 'next/link'
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
  CompletedCampaignImage,
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
    (campaign: CampaignResponse) =>
      campaign.state === CampaignState.complete &&
      (campaign.summary.reachedAmount / campaign.targetAmount) * 100 >= 100,
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
          <CardWrapper key={index} data-testid={`completed-campaign-${index}`}>
            <Link href={routes.campaigns.viewCampaignBySlug(campaign.slug)}>
              <CompletedCampaignImage
                onMouseDown={onLinkMouseDown}
                sx={{ position: 'relative', width: '100%', aspectRatio: 1 }}>
                <Image
                  fill
                  alt={campaign.title}
                  src={campaignListPictureUrl(campaign)}
                  sizes="(min-width: 2000px) 312px, (min-width: 1200px) calc(30vw - 38px), (min-width: 900px) calc(40.57vw - 29px), (min-width: 600px) calc(50vw - 28px), calc(100vw - 32px)"
                  style={{ objectFit: 'cover' }}
                />
              </CompletedCampaignImage>
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
            </Link>
          </CardWrapper>
        ))}
      </CarouselWrapper>
    </Root>
  )
}
