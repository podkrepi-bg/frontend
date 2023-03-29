import { useTranslation } from 'next-i18next'
import Link from 'next/link'

import { CampaignResponse } from 'gql/campaigns'

import { Favorite } from '@mui/icons-material'
import { CardActionArea } from '@mui/material'

import { routes } from 'common/routes'
import { campaignListPictureUrl } from 'common/util/campaignImageUrls'
import { CampaignState } from 'components/client/campaigns/helpers/campaign.enums'

import { CampaignTitle, Content, SupportNowButton } from './ActiveCampaignCard.styled'

type Props = { campaign: CampaignResponse; index: number }

export default function ActiveCampaignCard({ campaign, index }: Props) {
  const { t } = useTranslation('campaigns')
  const { state: campaignState, allowDonationOnComplete, slug, title } = campaign
  const pictureUrl = campaignListPictureUrl(campaign)

  return (
    <CardActionArea
      LinkComponent={Link}
      href={routes.campaigns.viewCampaignBySlug(slug)}
      data-testid={`campaign-card-${index}`}
      sx={{
        background: `url(${pictureUrl})`,
        height: '100%',
        backgroundSize: 'cover',
        '&:hover': {
          'a button': {
            visibility: 'visible',
            margin: '0 auto',
          },
        },
      }}>
      <Content>
        <CampaignTitle>{title}</CampaignTitle>
        <SupportNowButton
          fullWidth
          href={routes.campaigns.oneTimeDonation(slug)}
          disabled={campaignState === CampaignState.complete && !allowDonationOnComplete}
          variant="contained"
          color="secondary"
          endIcon={<Favorite color="error" />}>
          {t('cta.support-now')}
        </SupportNowButton>
      </Content>
    </CardActionArea>
  )
}
