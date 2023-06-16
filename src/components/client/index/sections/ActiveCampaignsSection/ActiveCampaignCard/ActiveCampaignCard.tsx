import { useTranslation, i18n } from 'next-i18next'
import Link from 'next/link'

import { CampaignResponse } from 'gql/campaigns'

import { Favorite } from '@mui/icons-material'
import { CardActionArea, Grid } from '@mui/material'

import { routes } from 'common/routes'
import theme from 'common/theme'
import { campaignListPictureUrl } from 'common/util/campaignImageUrls'
import { CampaignState } from 'components/client/campaigns/helpers/campaign.enums'

import { CampaignTitle, Content, SupportNowButton } from './ActiveCampaignCard.styled'
import { moneyPublic } from 'common/util/money'
import {
  SumWrapper,
  Sum,
  SumText,
} from '../../CompletedCampaignsSection/CompletedCampaignsSection.styled'

type Props = { campaign: CampaignResponse; index: number }

export default function ActiveCampaignCard({ campaign, index }: Props) {
  const { t } = useTranslation('campaigns')
  const { state: campaignState, allowDonationOnComplete, slug, title } = campaign
  const campaignImagesUrl = campaignListPictureUrl(campaign)
  const reachedAmount = moneyPublic(campaign.summary.reachedAmount)
  const targetAmount = moneyPublic(campaign.targetAmount)

  return (
    <CardActionArea
      LinkComponent={Link}
      href={routes.campaigns.viewCampaignBySlug(slug)}
      data-testid={`campaign-card-${index}`}>
      <SumWrapper>
        <SumText>{t('campaign.reached')}</SumText>
        <Sum>
          {i18n.language === 'bg'
            ? reachedAmount.split(',')[0] + ' лв.'
            : reachedAmount.split('.')[0]}
        </Sum>
        <SumText>{t('campaign.from')}</SumText>
        <Sum>
          {i18n.language === 'bg'
            ? targetAmount.split(',')[0] + ' лв.'
            : targetAmount.split('.')[0]}
        </Sum>
      </SumWrapper>
      <Grid
        sx={{
          background: `url(${campaignImagesUrl})`,
          height: '100%',
          backgroundSize: 'cover',
          border: `1px solid ${theme.palette.common.white}`,

          '&:hover': {
            backgroundSize: 'cover',

            'a button': {
              display: 'flex',
              margin: '0 auto',
            },
          },
        }}
      />
      <Grid textAlign="center">
        <SupportNowButton
          fullWidth
          href={routes.campaigns.oneTimeDonation(slug)}
          variant="contained"
          color="secondary"
          endIcon={<Favorite color="error" />}>
          {t('cta.support-now')}
        </SupportNowButton>
      </Grid>
      <Content>
        <CampaignTitle>{title}</CampaignTitle>
      </Content>
    </CardActionArea>
  )
}
