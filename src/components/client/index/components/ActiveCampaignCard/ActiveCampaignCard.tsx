import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import Link from 'next/link'

import { CampaignResponse } from 'gql/campaigns'

import { Favorite } from '@mui/icons-material'
import { CardActionArea, CardContent } from '@mui/material'

import { routes } from 'common/routes'
import { campaignListPictureUrl } from 'common/util/campaignImageUrls'
import { CampaignState } from 'components/client/campaigns/helpers/campaign.enums'

import { CampaignTitle, Card, CardWrapper, SupportNowButton } from './ActiveCampaignCard.styled'

type Props = { campaign: CampaignResponse; index: number }

export default function ActiveCampaignCard({ campaign, index }: Props) {
  const { t } = useTranslation('campaigns')

  const { state: campaignState, allowDonationOnComplete, slug, title } = campaign

  const pictureUrl = campaignListPictureUrl(campaign)

  return (
    <CardWrapper>
      <CardActionArea
        LinkComponent={Link}
        href={routes.campaigns.viewCampaignBySlug(slug)}
        data-testid={`campaign-card-${index}`}>
        <Card title={title}>
          <div>
            <Image alt={title} src={pictureUrl} fill style={{ objectFit: 'contain' }} />
          </div>
        </Card>
        <CardContent>
          <CampaignTitle gutterBottom variant="h5">
            {title}
          </CampaignTitle>
        </CardContent>
      </CardActionArea>
      <SupportNowButton
        fullWidth
        href={routes.campaigns.oneTimeDonation(slug)}
        disabled={campaignState === CampaignState.complete && !allowDonationOnComplete}
        variant="contained"
        color="secondary"
        endIcon={<Favorite color="error" />}>
        {t('cta.support-now')}
      </SupportNowButton>
    </CardWrapper>
  )
}
