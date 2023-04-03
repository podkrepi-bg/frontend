import { useTranslation } from 'next-i18next'
import { CampaignResponse } from 'gql/campaigns'
import { Settings } from 'react-slick'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'

import { Grid } from '@mui/material'

import { useCampaignList } from 'common/hooks/campaigns'
import { campaignListPictureUrl } from 'common/util/campaignImageUrls'
import theme from 'common/theme'
import { CampaignState } from 'components/client/campaigns/helpers/campaign.enums'

import { Heading } from '../../IndexPage.styled'
import {
  CarouselWrapper,
  ReachedMoney,
  ReachedText,
  CampaignTitle,
} from './CompletedCampaignsSection.styled'

type Props = { campaign: CampaignResponse; index: number }

export default function CompletedCampaignsSection({ campaign, index }: Props) {
  const { t } = useTranslation('campaigns')
  const { data } = useCampaignList()

  const completedCampaigns = data?.filter(
    (campaign: CampaignResponse) => campaign.state === CampaignState.complete,
  )
  const campaignImagesUrl = campaignListPictureUrl(campaign)
  const testImg = 'img/team-photos/AlbenaGeleva.png'

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
        {completedCampaigns?.map((campaign) => (
          <Grid key={index}>
            <Grid
              data-testid={`campaign-card-${index}`}
              sx={{
                background: `url(${testImg})`,
                height: theme.spacing(37.5),
                backgroundSize: 'cover',
                margin: theme.spacing(0, 1.25),
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',

                '&:hover': {
                  opacity: 0.9,
                },
              }}>
              <ReachedMoney>
                {campaign.summary.reachedAmount}
                <ReachedText>{t('campaign.reached')}</ReachedText>
              </ReachedMoney>
              <CampaignTitle>{campaign.title}</CampaignTitle>
            </Grid>
          </Grid>
        ))}
      </CarouselWrapper>
    </Grid>
  )
}
