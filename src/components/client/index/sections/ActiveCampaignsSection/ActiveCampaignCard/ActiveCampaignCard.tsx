import { useTranslation, i18n } from 'next-i18next'
import { CampaignResponse } from 'gql/campaigns'

import { Box } from '@mui/material'

import Link from 'components/common/Link'
import CampaignProgress from 'components/client/campaigns/CampaignProgress'
import theme from 'common/theme'
import { routes } from 'common/routes'
import { campaignListPictureUrl } from 'common/util/campaignImageUrls'
import { moneyPublic } from 'common/util/money'
import Image from 'next/image'

import {
  CampaignTitle,
  LearnMoreButton,
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

  const reached = summary ? summary.reachedAmount + (summary.guaranteedAmount ?? 0) : 0

  const reachedAmount = moneyPublic(reached)
  const targetAmount = moneyPublic(campaign.targetAmount)

  return (
    <Root data-testid={`campaign-card-${index}`}>
      <Link href={routes.campaigns.viewCampaignBySlug(slug)}>
        <Box
          position={'relative'}
          sx={{
            width: '100%',
            aspectRatio: 1.5,
            [theme.breakpoints.up('lg')]: {
              maxHeight: index === 0 ? theme.spacing(71.72) : theme.spacing(27.65),
              aspectRatio: index === 0 ? 0.9 : 1,
            },
          }}>
          <Image
            priority
            src={campaignImagesUrl}
            alt={title}
            fill
            sizes="(min-width: 2000px) 312px, (min-width: 1200px) calc(30vw - 38px), (min-width: 900px) calc(40.57vw - 29px), (min-width: 600px) calc(50vw - 28px), calc(100vw - 32px)"
            quality={index === 0 ? 100 : 75}
            style={{ objectFit: 'cover' }}
          />
        </Box>
        <StyledContent>
          <SumWrapper>
            <Sum>
              <SumNumber>
                {i18n?.language === 'bg'
                  ? reachedAmount.split(',')[0] + ' лв.'
                  : reachedAmount.split('.')[0]}
              </SumNumber>
            </Sum>
            <Sum>
              <SumNumber>
                {i18n?.language === 'bg'
                  ? targetAmount.split(',')[0] + ' лв.'
                  : targetAmount.split('.')[0]}
              </SumNumber>
            </Sum>
          </SumWrapper>
          <CampaignProgress
            state={campaign.state}
            raised={reached}
            target={target}
            showPercentage
          />
          <CampaignTitle>{title}</CampaignTitle>
        </StyledContent>
      </Link>
      <StyledCardActions disableSpacing>
        <LearnMoreButton
          href={routes.campaigns.viewCampaignBySlug(slug)}
          variant="contained"
          color="secondary">
          {t('cta.learn-more')}
        </LearnMoreButton>
      </StyledCardActions>
    </Root>
  )
}
