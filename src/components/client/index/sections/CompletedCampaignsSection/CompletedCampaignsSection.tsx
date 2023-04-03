import { useTranslation } from 'next-i18next'
import { CampaignResponse } from 'gql/campaigns'

import { Grid } from '@mui/material'
import { Settings } from 'react-slick'

import { useCampaignList } from 'common/hooks/campaigns'
import { CampaignState } from 'components/client/campaigns/helpers/campaign.enums'
import CompletedCampaignsCarousel from './Carousel/Carousel'

import { Heading } from '../../IndexPage.styled'
import { CarouselWrapper } from './Carousel/Carousel.styled'

type Props = { campaign: CampaignResponse; index: number }

export default function CompletedCampaignsSection() {
  const { t } = useTranslation('campaigns')
  const { data } = useCampaignList()
  const completedCampaigns = data?.filter(
    (campaign: CampaignResponse) => campaign.state === CampaignState.complete,
  )

  const settings: Settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    dots: true,
    lazyLoad: 'ondemand',
    autoplay: false,
    autoplaySpeed: 2000,

    responsive: [
      {
        breakpoint: 1230,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  }

  return (
    <Grid component="section" marginTop="48px">
      <Heading variant="h4" px={3} pt={6}>
        {t('completed-campaigns')}
      </Heading>
      <CarouselWrapper {...settings}>
        {completedCampaigns?.map((campaign, index) => (
          <CompletedCampaignsCarousel campaign={campaign} index={index} key={index} />
        ))}
      </CarouselWrapper>
    </Grid>
  )
}
