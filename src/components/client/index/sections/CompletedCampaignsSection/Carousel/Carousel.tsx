import { useTranslation } from 'next-i18next'
import { CampaignResponse } from 'gql/campaigns'

import { Grid, Typography } from '@mui/material'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'

import theme from 'common/theme'

import { CampaignTitle } from './Carousel.styled'
// import { campaignListPictureUrl } from 'common/util/campaignImageUrls'

type Props = { campaign: CampaignResponse; index: number }

export default function CompletedCampaignsCarousel({ campaign, index }: Props) {
  const { t } = useTranslation('campaigns')

  const testImg = 'img/team-photos/AlbenaGeleva.png'
  // const campaignImagesUrl = campaignListPictureUrl(campaign)

  return (
    <Grid key={index} data-testid={`campaign-card-${index}`}>
      <Grid
        sx={{
          background: `url(${testImg})`,
          height: theme.spacing(37.5),
          backgroundSize: 'cover',
          margin: theme.spacing(0, 1.25),
        }}>
        <Typography>{campaign.summary.reachedAmount}</Typography>
        <CampaignTitle>{campaign.title}</CampaignTitle>
      </Grid>
    </Grid>
  )
}
