import { useMemo } from 'react'
import { useTranslation, i18n } from 'next-i18next'
import { CampaignResponse } from 'gql/campaigns'

import { CardMedia } from '@mui/material'

import { routes } from 'common/routes'
import { campaignListPictureUrl } from 'common/util/campaignImageUrls'
import { moneyPublic } from 'common/util/money'
import theme from 'common/theme'
import Link from 'components/common/Link'
import CampaignProgress from 'components/client/campaigns/CampaignProgress'
import SuccessfullCampaignTag from '../SuccessfullCampaignTag'
import { CampaignState } from '../helpers/campaign.enums'

import { Root } from './CampaignCard.styled'
import {
  CampaignTitle,
  DonateButton,
  StyledCardActions,
  StyledContent,
  Sum,
  SumNumber,
  SumWrapper,
} from '../../index/sections/ActiveCampaignsSection/ActiveCampaignCard/ActiveCampaignCard.styled'

type Props = { campaign: CampaignResponse; index: number }

export default function ActiveCampaignCard({ campaign, index }: Props) {
  const { t } = useTranslation('campaigns')
  const {
    id,
    slug,
    title,
    summary,
    targetAmount: target,
    state: campaignState,
    allowDonationOnComplete,
  } = campaign

  const campaignImagesUrl = campaignListPictureUrl(campaign)

  const reachedAmount = moneyPublic(campaign.summary.reachedAmount)
  const targetAmount = moneyPublic(campaign.targetAmount)
  const reached = summary ? summary.reachedAmount : 0
  const percentage = useMemo(() => (reached / target) * 100, [reached, target])

  return (
    <Root data-testid={`campaign-card-${index}`}>
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
              height: theme.spacing(22.3),
              maxHeight: 'inherit',
            },

            [theme.breakpoints.up(1430)]: {
              height: theme.spacing(27.9),
            },
          }}
        />
        {campaignState === CampaignState.complete && percentage >= 100 ? (
          <SuccessfullCampaignTag />
        ) : (
          ''
        )}
        <StyledContent>
          <SumWrapper>
            <Sum>
              <SumNumber>
                {i18n.language === 'bg'
                  ? reachedAmount.split(',')[0] + ' лв.'
                  : reachedAmount.split('.')[0]}
              </SumNumber>
            </Sum>
            <Sum>
              <SumNumber>
                {i18n.language === 'bg'
                  ? targetAmount.split(',')[0] + ' лв.'
                  : targetAmount.split('.')[0]}
              </SumNumber>
            </Sum>
          </SumWrapper>
          <CampaignProgress campaignId={id} raised={reached} target={target} />
          <CampaignTitle>{title}</CampaignTitle>
        </StyledContent>
      </Link>
      <StyledCardActions disableSpacing>
        <DonateButton
          href={routes.campaigns.oneTimeDonation(slug)}
          disabled={
            campaignState === CampaignState.complete &&
            percentage >= 100 &&
            !allowDonationOnComplete
          }
          variant="contained"
          color="secondary">
          {t('cta.support')}
        </DonateButton>
      </StyledCardActions>
    </Root>
  )
}
