import { useTranslation, i18n } from 'next-i18next'
import Link from 'next/link'

import { CampaignResponse } from 'gql/campaigns'

import { Box, CardActionArea, Grid } from '@mui/material'

import { routes } from 'common/routes'
import theme from 'common/theme'
import { campaignListPictureUrl } from 'common/util/campaignImageUrls'

import { CampaignTitle, SupportNowButton } from './ActiveCampaignCard.styled'
import { moneyPublic } from 'common/util/money'
import { SumWrapper, Sum } from '../../CompletedCampaignsSection/CompletedCampaignsSection.styled'
import CampaignProgress from '../../../../campaigns/CampaignProgress'

type Props = { campaign: CampaignResponse; index: number }

export default function ActiveCampaignCard({ campaign, index }: Props) {
  const { t } = useTranslation('campaigns')
  const { id, slug, title, summary, targetAmount: target } = campaign
  const campaignImagesUrl = campaignListPictureUrl(campaign)
  const reachedAmount = moneyPublic(campaign.summary.reachedAmount)
  const targetAmount = moneyPublic(campaign.targetAmount)
  const reached = summary ? summary.reachedAmount : 0

  return (
    <CardActionArea
      LinkComponent={Link}
      href={routes.campaigns.viewCampaignBySlug(slug)}
      data-testid={`campaign-card-${index}`}
      sx={{ display: 'flex', flexDirection: 'column' }}>
      <SumWrapper>
        <Grid>
          <Sum>
            {t('campaign.reached')}{' '}
            {i18n.language === 'bg'
              ? reachedAmount.split(',')[0] + ' лв.'
              : reachedAmount.split('.')[0]}
          </Sum>
        </Grid>
        <Grid>
          <Sum>
            {t('campaign.target')}{' '}
            {i18n.language === 'bg'
              ? targetAmount.split(',')[0] + ' лв.'
              : targetAmount.split('.')[0]}
          </Sum>
        </Grid>
      </SumWrapper>
      <Box p={2} width={1}>
        <CampaignProgress campaignId={id} raised={reached} target={target} />
      </Box>
      <Grid
        sx={{
          background: `url(${campaignImagesUrl})`,
          height: '100%',
          width: '100%',
          backgroundSize: 'cover',
          border: `1px solid ${theme.palette.common.white}`,

          '&:hover a button': {
            display: 'flex',
            margin: '0 auto',
          },
        }}>
        <Grid textAlign="center">
          <SupportNowButton
            fullWidth
            href={routes.campaigns.oneTimeDonation(slug)}
            variant="contained"
            color="secondary">
            {t('cta.support')}
          </SupportNowButton>
        </Grid>
      </Grid>
      <CampaignTitle>{title}</CampaignTitle>
    </CardActionArea>
  )
}
