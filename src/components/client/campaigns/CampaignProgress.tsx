import React from 'react'
import { useTranslation } from 'next-i18next'

import { alpha, styled } from '@mui/material/styles'

import type { Theme } from '@mui/material'

import theme from 'common/theme'
import { moneyPublic } from 'common/util/money'
import { CampaignState } from './helpers/campaign.enums'

const PREFIX = 'CampaignProgress'

const classes = {
  root: `${PREFIX}-root`,
  bar: `${PREFIX}-bar`,
  donationProgress: `${PREFIX}-donationProgress`,
  label: `${PREFIX}-label`,
}

const ProgressBar = styled('div')(
  ({
    theme,
    progress = 0,
    labelSize = `0.81rem`,
    color,
    state,
  }: {
    theme?: Theme
    progress: number
    labelSize?: string
    color: string
    state: keyof typeof CampaignState
  }) => ({
    borderRadius: 10,
    backgroundColor: alpha(color, 0.4),
    height: `calc(${labelSize} * 1)`,

    [`&.${classes.donationProgress}`]: {
      width: '100%',
      position: 'relative',
      overflow: 'hidden',
    },

    [`& .${classes.bar}`]: {
      borderRadius: 10,
      height: `calc(${labelSize} * 1)`,
      width: `${progress}%`,
      background: progress >= 100 ? '#5EDF8F' : color,
      transition: `width 400ms ease-out`,
    },

    [`& .${classes.label}`]: {
      paddingLeft: 5,
      paddingRight: 5,
      lineHeight: `calc(${labelSize} * 1)`,
      fontSize: labelSize,
      textAlign: 'right',
      color: theme?.palette.common.black,
      display: 'block',
    },
  }),
)

type Props = {
  state: keyof typeof CampaignState
  raised: number
  target: number
  showPercentage?: boolean
  currency?: string
}
export default function CampaignProgress({ state, raised, target, showPercentage, currency = 'EUR' }: Props) {
  const { t } = useTranslation('campaigns')
  const raisedSafe = Math.max(0, raised)
  const targetSafe = Math.max(0, target)
  const percentage = Math.floor((raisedSafe / targetSafe) * 100)
  const progressBarWidth = Math.min(percentage, 100)

  const progressBarColorMap = {
    [CampaignState.active]: theme.palette.primary.main,
    [CampaignState.partially_financed]: '#FFCB57',
    [CampaignState.paused]: '#FFCB57',
    [CampaignState.complete]: '#5EDF8F',
    [CampaignState.suspended]: '#FFCB57',
    [CampaignState.blocked]: '#C0BBBB',
    [CampaignState.deleted]: '#D32F2F',
    [CampaignState.draft]: '#FFCB57',
  }

  // Format amounts for accessibility
  const raisedFormatted = moneyPublic(raisedSafe, currency)
  const targetFormatted = moneyPublic(targetSafe, currency)

  // Create comprehensive aria-label with campaign state and amounts
  const ariaLabel = t('campaign-progress.aria-label', {
    state: t(`campaign-status.${state}`),
    raised: raisedFormatted,
    target: targetFormatted,
    defaultValue: `Campaign progress: ${t(
      `campaign-status.${state}`,
    )} - ${raisedFormatted} raised of ${targetFormatted} target`,
  })

  // Create detailed aria-valuetext with percentage and amounts
  const ariaValueText = t('campaign-progress.aria-valuetext', {
    percentage,
    raised: raisedFormatted,
    target: targetFormatted,
    defaultValue: `${percentage}% complete - ${raisedFormatted} raised of ${targetFormatted} target`,
  })

  return (
    <ProgressBar
      state={state}
      role="progressbar"
      color={progressBarColorMap[state]}
      progress={progressBarWidth}
      labelSize="0.938rem"
      className={classes.donationProgress}
      aria-valuenow={percentage}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={ariaLabel}
      aria-valuetext={ariaValueText}>
      <div className={classes.bar}>
        {showPercentage && <div className={classes.label}>{progressBarWidth}%</div>}
      </div>
    </ProgressBar>
  )
}
