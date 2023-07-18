import { useTranslation, i18n } from 'next-i18next'
import { CampaignResponse } from 'gql/campaigns'

import { CardMedia } from '@mui/material'

import Link from 'components/common/Link'
import theme from 'common/theme'
import { routes } from 'common/routes'
import { campaignListPictureUrl } from 'common/util/campaignImageUrls'
import { moneyPublic } from 'common/util/money'
import CampaignProgress from '../../../../campaigns/CampaignProgress'

import {
  CampaignProgressWrapper,
  CampaignTitle,
  DonateButton,
  Root,
  StyledCardActions,
  StyledContent,
  Sum,
  SumNumber,
  SumWrapper,
} from './ActiveCampaignCard.styled'

type Props = { campaign: CampaignResponse; index: number }

export default function ActiveCampaignCard({ campaign, index }: Props) {
  const { t } = useTranslation('campaigns')
  const { id, slug, title, summary, targetAmount: target } = campaign
  const campaignImagesUrl = campaignListPictureUrl(campaign)
  const reachedAmount = moneyPublic(campaign.summary.reachedAmount)
  const targetAmount = moneyPublic(campaign.targetAmount)
  const reached = summary ? summary.reachedAmount : 0

  return (
    <Root data-testid={`completed-campaign-${index}`}>
      <Link href={routes.campaigns.viewCampaignBySlug(slug)} sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height="100%"
          image={campaignImagesUrl}
          alt={title}
          sx={{
            maxHeight: theme.spacing(42.5),

            [theme.breakpoints.up('lg')]: {
              aspectRatio: '2',
              height: theme.spacing(22.5),
              maxHeight: 'inherit',
            },

            [theme.breakpoints.up(1430)]: {
              height: theme.spacing(28),
            },
          }}
        />
        <StyledContent>
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
        </StyledContent>
      </Link>
      <StyledCardActions disableSpacing>
        <DonateButton
          href={routes.campaigns.oneTimeDonation(slug)}
          variant="contained"
          color="secondary">
          {t('cta.support')}
        </DonateButton>
      </StyledCardActions>
    </Root>
  )
}
