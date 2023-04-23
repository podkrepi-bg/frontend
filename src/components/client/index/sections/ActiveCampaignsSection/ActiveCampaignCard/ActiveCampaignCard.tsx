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
import { moneyPublic } from 'common/util/money'
import {
  MoneyWrapper,
  MoneyWrapperFlex,
  MoneyUnit,
  MoneyFraction,
  MoneyText,
} from '../../CompletedCampaignsSection/CompletedCampaignsSection.styled'

type Props = { campaign: CampaignResponse; index: number }

export default function ActiveCampaignCard({ campaign, index }: Props) {
  const { t } = useTranslation('campaigns')
  const { state: campaignState, allowDonationOnComplete, slug, title } = campaign
  const campaignImagesUrl = campaignListPictureUrl(campaign)
  const reachedMoneyUnit = moneyPublic(campaign.summary.reachedAmount).split(',')[0]
  const reachedMoneyFraction = moneyPublic(campaign.summary.reachedAmount)
    .split(',')[1]
    .substring(0, 2)
  const targetMoneyUnit = moneyPublic(campaign.targetAmount).split(',')[0]
  const targetMoneyFraction = moneyPublic(campaign.targetAmount).split(',')[1].substring(0, 2)

  return (
    <CardActionArea
      LinkComponent={Link}
      href={routes.campaigns.viewCampaignBySlug(slug)}
      data-testid={`campaign-card-${index}`}
      sx={{
        background: `linear-gradient(180deg, rgba(81, 81, 81, 0) 50%, rgba(0, 0, 0, 0.78) 80%, #000000 100%), url(${campaignImagesUrl})`,
        height: '100%',
        backgroundSize: 'cover',
        border: `1px solid ${theme.palette.common.white}`,

        '&:hover': {
          background: `linear-gradient(180deg, rgba(81, 81, 81, 0) -8.88%, rgba(0, 0, 0, 0.78) 80%, #000000 100%), url(${campaignImagesUrl})`,
          backgroundSize: 'cover',

          'a button': {
            display: 'flex',
            margin: '0 auto',
          },
        },
      }}>
      <MoneyWrapper>
        <MoneyWrapperFlex>
          <MoneyText>{t('campaign.reached')}</MoneyText>
          <MoneyUnit>{reachedMoneyUnit}</MoneyUnit>
          <MoneyFraction>{reachedMoneyFraction}</MoneyFraction>
          <MoneyText>{t('campaign.from')}</MoneyText>
          <MoneyUnit>{targetMoneyUnit}</MoneyUnit>
          <MoneyFraction>{targetMoneyFraction}</MoneyFraction>
        </MoneyWrapperFlex>
      </MoneyWrapper>
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
