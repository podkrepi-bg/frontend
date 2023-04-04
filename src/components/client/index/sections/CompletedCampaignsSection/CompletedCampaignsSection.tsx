import { useTranslation } from 'next-i18next'
import { CampaignResponse } from 'gql/campaigns'

import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'
import { Grid, Link } from '@mui/material'

import { useCampaignList } from 'common/hooks/campaigns'
import { campaignListPictureUrl } from 'common/util/campaignImageUrls'
import theme from 'common/theme'
import { CampaignState } from 'components/client/campaigns/helpers/campaign.enums'
import { routes } from 'common/routes'
import { settings } from './CaroucelSettings'

import { Heading } from '../../IndexPage.styled'
import {
  CarouselWrapper,
  ReachedMoney,
  ReachedText,
  CampaignTitle,
  ReachedMoneyWrapper,
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

  const onLinkMouseDown = (e) => {
    e.preventDefault()
  }

  return (
    <Grid component="section" marginTop="48px">
      <Heading variant="h4" px={3} pt={6}>
        {t('completed-campaigns')}
      </Heading>
      <CarouselWrapper {...settings}>
        {completedCampaigns?.map((campaign) => (
          <Grid
            key={index}
            data-testid={`campaign-card-${index}`}
            margin={theme.spacing(0, 2.25)}
            paddingRight={theme.spacing(2.5)}>
            <Link
              onMouseDown={onLinkMouseDown}
              href={routes.campaigns.viewCampaignBySlug(campaign.slug)}
              sx={{
                background: `url(${testImg})`,
                height: theme.spacing(37.5),
                backgroundSize: 'cover',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',

                '&:hover': {
                  opacity: 0.9,
                },
              }}>
              <ReachedMoneyWrapper>
                <ReachedMoney>
                  {campaign.summary.reachedAmount} {t('donations.lv')}
                </ReachedMoney>
                <ReachedText>{t('campaign.reached')}</ReachedText>
              </ReachedMoneyWrapper>
              <CampaignTitle>{campaign.title}</CampaignTitle>
            </Link>
          </Grid>
        ))}
      </CarouselWrapper>
    </Grid>
  )
}
