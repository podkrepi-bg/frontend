import { useTranslation, i18n } from 'next-i18next'

import { CampaignResponse } from 'gql/campaigns'

import { Grid } from '@mui/material'

import { routes } from 'common/routes'
import { campaignListPictureUrl } from 'common/util/campaignImageUrls'
import theme from 'common/theme'
import { moneyPublic } from 'common/util/money'
import CampaignProgress from '../../../../campaigns/CampaignProgress'

import { CampaignProgressWrapper, CampaignTitle, DonateButton } from './ActiveCampaignCard.styled'
import { SumWrapper, Sum } from '../../CompletedCampaignsSection/CompletedCampaignsSection.styled'

type Props = { campaign: CampaignResponse; index: number }

export default function ActiveCampaignCard({ campaign, index }: Props) {
  const { t } = useTranslation('campaigns')
  const { id, slug, title, summary, targetAmount: target } = campaign
  // const campaignImagesUrl = campaignListPictureUrl(campaign)
  const campaignImagesUrl = '/img/team-photos/StankaCherkezova.jpg'
  const reachedAmount = moneyPublic(campaign.summary.reachedAmount)
  const targetAmount = moneyPublic(campaign.targetAmount)
  const reached = summary ? summary.reachedAmount : 0

  return (
    <Grid
      // LinkComponent={Link}
      // href={routes.campaigns.viewCampaignBySlug(slug)}
      data-testid={`campaign-card-${index}`}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'initial',

        [theme.breakpoints.down('md')]: {
          minHeight: '425px',
        },

        [theme.breakpoints.up('sm')]: {
          '&:nth-of-type(1)': {
            gridArea: '1 / 1 / 3 / 3',
            height: '570px',
          },
        },

        [theme.breakpoints.up('lg')]: {
          '&:nth-of-type(1)': {
            minHeight: '650px',
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
        }}>
        <Grid sx={{ margin: '24px' }}>
          <DonateButton
            fullWidth
            href={routes.campaigns.oneTimeDonation(slug)}
            variant="contained"
            color="secondary">
            {t('cta.support')}
          </DonateButton>
        </Grid>
      </Grid>
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
      <CampaignProgressWrapper width={1}>
        <CampaignProgress campaignId={id} raised={reached} target={target} />
      </CampaignProgressWrapper>
      <CampaignTitle>{title}</CampaignTitle>
    </Grid>
  )
}
