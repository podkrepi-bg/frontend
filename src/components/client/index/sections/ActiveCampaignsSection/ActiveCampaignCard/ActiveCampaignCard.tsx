import { useTranslation, i18n } from 'next-i18next'

import { CampaignResponse } from 'gql/campaigns'

import { Grid } from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

import { routes } from 'common/routes'
import { campaignListPictureUrl } from 'common/util/campaignImageUrls'
import theme from 'common/theme'
import { moneyPublic } from 'common/util/money'

import {
  CampaignProgressWrapper,
  CampaignTitle,
  DonateButton,
  LearnMoreButton,
  SumNumber,
} from './ActiveCampaignCard.styled'
import { SumWrapper, Sum } from '../../CompletedCampaignsSection/CompletedCampaignsSection.styled'
import CampaignProgress from 'components/client/campaigns/CampaignProgress'

type Props = { campaign: CampaignResponse; index: number }

export default function ActiveCampaignCard({ campaign, index }: Props) {
  const { t } = useTranslation('campaigns')
  const { id, slug, title, summary, targetAmount: target } = campaign
  const campaignImagesUrl = campaignListPictureUrl(campaign)
  const reachedAmount = moneyPublic(campaign.summary.reachedAmount)
  const targetAmount = moneyPublic(campaign.targetAmount)
  const reached = summary ? summary.reachedAmount : 0

  return (
    <Grid
      data-testid={`campaign-card-${index}`}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'initial',
        minHeight: '390px',

        [theme.breakpoints.up('md')]: {
          '&:nth-of-type(1)': {
            gridArea: '1 / 1 / 3 / 3',
            height: '570px',
          },
        },

        [theme.breakpoints.up('lg')]: {
          '&:nth-of-type(1)': {
            minHeight: '800px',
          },
        },
      }}>
      <Grid
        sx={{
          background: `url(${campaignImagesUrl})`,
          height: '100%',
          backgroundSize: 'cover',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'flex-end',
        }}
      />
      <SumWrapper>
        <Sum>
          {t('campaign.reached')}{' '}
          <SumNumber>
            {i18n.language === 'bg'
              ? reachedAmount.split(',')[0] + ' лв.'
              : reachedAmount.split('.')[0]}
          </SumNumber>
        </Sum>
        <Sum style={{ fontWeight: 400 }}>
          {t('campaign.target')}{' '}
          <SumNumber>
            {i18n.language === 'bg'
              ? targetAmount.split(',')[0] + ' лв.'
              : targetAmount.split('.')[0]}
          </SumNumber>
        </Sum>
      </SumWrapper>
      <CampaignProgressWrapper width={1}>
        <CampaignProgress campaignId={id} raised={reached} target={target} />
      </CampaignProgressWrapper>
      <CampaignTitle>{title}</CampaignTitle>
      <Grid>
        <DonateButton
          fullWidth
          href={routes.campaigns.oneTimeDonation(slug)}
          variant="contained"
          color="secondary">
          {t('cta.support')}
        </DonateButton>
        <LearnMoreButton
          href={routes.campaigns.viewCampaignBySlug(slug)}
          endIcon={<ArrowForwardIcon color="warning" fontSize="medium" />}>
          {t('campaign.learn-more')}
        </LearnMoreButton>
      </Grid>
    </Grid>
  )
}
