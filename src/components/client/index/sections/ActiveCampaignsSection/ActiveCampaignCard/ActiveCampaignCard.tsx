import { useTranslation } from 'next-i18next'
import Link from 'next/link'

import { CampaignResponse } from 'gql/campaigns'

import { Favorite } from '@mui/icons-material'
import { CardActionArea, Grid } from '@mui/material'

import { routes } from 'common/routes'
import theme from 'common/theme'
import { campaignListPictureUrl } from 'common/util/campaignImageUrls'
import { CampaignState } from 'components/client/campaigns/helpers/campaign.enums'

import { CampaignTitle, Content, SupportNowButton } from './ActiveCampaignCard.styled'

type Props = { campaign: CampaignResponse; index: number }

export default function ActiveCampaignCard({ campaign, index }: Props) {
  const { t } = useTranslation('campaigns')
  const { state: campaignState, allowDonationOnComplete, slug, title } = campaign
  const campaignImagesUrl = campaignListPictureUrl(campaign)

  return (
    <CardActionArea
      LinkComponent={Link}
      href={routes.campaigns.viewCampaignBySlug(slug)}
      data-testid={`campaign-card-${index}`}
      sx={{
        background: `url(${campaignImagesUrl})`,
        height: '100%',
        backgroundSize: 'cover',
        border: `1px solid ${theme.palette.common.white}`,

        '&:hover': {
          opacity: 0.9,

          'a button': {
            visibility: 'visible',
            margin: '0 auto',
          },
        },
      }}>
      <Content>
        <CampaignTitle>{title}</CampaignTitle>
        <Grid textAlign="center">
          <SupportNowButton
            fullWidth
            href={routes.campaigns.oneTimeDonation(slug)}
            disabled={campaignState === CampaignState.complete && !allowDonationOnComplete}
            variant="contained"
            color="secondary"
            endIcon={<Favorite color="error" />}>
            {t('cta.support-now')}
          </SupportNowButton>
        </Grid>
      </Content>
    </CardActionArea>
  )
}
