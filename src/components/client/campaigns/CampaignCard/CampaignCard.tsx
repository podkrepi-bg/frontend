import { useTranslation } from 'next-i18next'
import { CampaignResponse } from 'gql/campaigns'

import { Box, CardActions, Grid2, Typography } from '@mui/material'

import { routes } from 'common/routes'
import { campaignListPictureUrl } from 'common/util/campaignImageUrls'
import { moneyPublic } from 'common/util/money'
import theme from 'common/theme'
import Link from 'components/common/Link'
import CampaignProgress from 'components/client/campaigns/CampaignProgress'
import SuccessfullCampaignTag from '../SuccessfullCampaignTag'
import { CampaignState, canAcceptDonationState } from '../helpers/campaign.enums'

import { Root } from './CampaignCard.styled'
import {
  CampaignTitle,
  LearnMoreButton,
  StyledCardActions,
  StyledContent,
  Sum,
  SumNumber,
  SumWrapper,
} from '../../index/sections/ActiveCampaignsSection/ActiveCampaignCard/ActiveCampaignCard.styled'
import Image from 'next/image'

import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined'
import TaskAltIcon from '@mui/icons-material/TaskAlt'
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'
import BackHandOutlinedIcon from '@mui/icons-material/BackHandOutlined'
import TonalityOutlinedIcon from '@mui/icons-material/TonalityOutlined'

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

  const reached = summary ? summary.reachedAmount + (summary.guaranteedAmount ?? 0) : 0
  const reachedAmount = moneyPublic(reached, 'EUR', 100, 0, 0)
  const targetAmount = moneyPublic(campaign.targetAmount, 'EUR', 100, 0, 0)
  const percentage = (reached / target) * 100

  const stateIconMap = {
    [CampaignState.active]: <ArrowCircleRightOutlinedIcon />,
    [CampaignState.partially_financed]: <TonalityOutlinedIcon />,
    [CampaignState.paused]: <PauseCircleOutlineIcon />,
    [CampaignState.complete]: <TaskAltIcon />,
    [CampaignState.suspended]: <BackHandOutlinedIcon />,
    [CampaignState.blocked]: <CancelOutlinedIcon />,
  }

  return (
    <Root data-testid={`campaign-card-${index}`}>
      <Link href={routes.campaigns.viewCampaignBySlug(slug)}>
        <Box
          position={'relative'}
          sx={{
            width: '100%',
            aspectRatio: 1.5,
            maxHeight: theme.spacing(27.9),
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
        {campaignState === CampaignState.complete && percentage >= 100 ? (
          <SuccessfullCampaignTag />
        ) : (
          ''
        )}
        <StyledContent>
          <Grid2 className="cardcontent--state">
            <Typography
              variant="h5"
              component={'p'}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                fontSize: theme.typography.pxToRem(16),
              }}>
              {t('status')}:{' '}
              <Box
                component="span"
                sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 1 }}>
                {t(`campaign-status.${campaignState}`)}
                {stateIconMap[campaignState as keyof typeof stateIconMap]}
              </Box>
            </Typography>
          </Grid2>
          <CampaignProgress state={campaignState} raised={reached} target={target} showPercentage />
          <SumWrapper>
            <Sum>
              <SumNumber>{reachedAmount}</SumNumber>
            </Sum>
            <Sum>
              <SumNumber>{targetAmount}</SumNumber>
            </Sum>
          </SumWrapper>
          <CampaignTitle>{title}</CampaignTitle>
        </StyledContent>
      </Link>
      <CardActions
        disableSpacing
        sx={{
          position: 'absolute',
          bottom: theme.spacing(20.37),
          right: theme.spacing(0.75),
          padding: 0,
        }}>
        <LearnMoreButton
          href={routes.campaigns.viewCampaignBySlug(slug)}
          variant="contained"
          color="secondary">
          {t('cta.learn-more')}
        </LearnMoreButton>
      </CardActions>
    </Root>
  )
}
