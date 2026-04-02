import React from 'react'
import { useTranslation } from 'next-i18next'
import { Box, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

import { CampaignState } from '../helpers/campaign.enums'
import { CampaignProgressProps } from './types'

/**
 * Campaign Progress Pie Chart Component
 *
 * Displays campaign progress as a circular pie chart with percentage.
 * Matches Figma design exactly:
 * - Outer ring: Light blue #4AC3FF (background)
 * - Progress arc: Dark blue #294E85
 * - Inner circle: White #FFFFFF
 * - Percentage text: #005783, Montserrat 600, 10px
 *
 * Reference: https://github.com/podkrepi-bg/frontend/issues/2027
 */

const PREFIX = 'CampaignProgressPie'

const classes = {
  container: `${PREFIX}-container`,
  innerCircle: `${PREFIX}-innerCircle`,
  percentage: `${PREFIX}-percentage`,
}

interface StyledContainerProps {
  size: 'extraSmall' | 'small' | 'medium' | 'large'
}

const sizeMap = {
  extraSmall: 37,
  small: 60,
  medium: 80,
  large: 100,
}

const innerCircleRatio = 0.788

const fontSizeMap = {
  extraSmall: 10,
  small: 12,
  medium: 14,
  large: 18,
}

const StyledContainer = styled(Box)<StyledContainerProps>(({ size }) => {
  const containerSize = sizeMap[size]
  const innerSize = Math.round(containerSize * innerCircleRatio)

  return {
    [`&.${classes.container}`]: {
      position: 'relative',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: containerSize,
      height: containerSize,
    },

    [`& .${classes.innerCircle}`]: {
      position: 'absolute',
      width: innerSize,
      height: innerSize,
      borderRadius: '50%',
      backgroundColor: '#FFFFFF',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1,
    },

    [`& .${classes.percentage}`]: {
      fontFamily: 'Montserrat, sans-serif',
      fontWeight: 600,
      fontSize: fontSizeMap[size],
      lineHeight: 1.2,
      color: '#005783',
    },
  }
})

const stateColors: Record<CampaignState, { background: string; progress: string }> = {
  [CampaignState.active]: { background: '#4AC3FF', progress: '#294E85' },
  [CampaignState.partially_financed]: { background: '#FFE5A0', progress: '#FFCB57' },
  [CampaignState.paused]: { background: '#FFE5A0', progress: '#FFCB57' },
  [CampaignState.complete]: { background: '#A8F0C0', progress: '#5EDF8F' },
  [CampaignState.suspended]: { background: '#FFE5A0', progress: '#FFCB57' },
  [CampaignState.blocked]: { background: '#E0E0E0', progress: '#C0BBBB' },
  [CampaignState.deleted]: { background: '#FFCDD2', progress: '#D32F2F' },
  [CampaignState.draft]: { background: '#FFE5A0', progress: '#FFCB57' },
}

export default function CampaignProgressPie({
  currentAmount,
  targetAmount,
  state,
  showPercentage = true,
  size = 'medium',
}: CampaignProgressProps) {
  const { t } = useTranslation('campaigns')

  const safeCurrent = Math.max(0, currentAmount)
  const safeTarget = Math.max(1, targetAmount)
  const percentage = Math.min(100, Math.floor((safeCurrent / safeTarget) * 100))

  const strokeWidthMap = { extraSmall: 4, small: 5, medium: 6, large: 7 }
  const svgSize = sizeMap[size]
  const strokeWidth = strokeWidthMap[size]
  const radius = (svgSize - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const progressOffset = circumference - (percentage / 100) * circumference

  const colors = stateColors[state] || stateColors[CampaignState.active]

  const ariaLabel = t('campaign-progress-pie.aria-label', {
    percentage,
    defaultValue: `Campaign progress: ${percentage}% funded`,
  })

  return (
    <StyledContainer
      size={size}
      className={classes.container}
      role="progressbar"
      aria-valuenow={percentage}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={ariaLabel}>
      <svg
        width={svgSize}
        height={svgSize}
        viewBox={`0 0 ${svgSize} ${svgSize}`}
        style={{ position: 'absolute', top: 0, left: 0 }}>
        <circle
          cx={svgSize / 2}
          cy={svgSize / 2}
          r={radius}
          fill="none"
          stroke={colors.background}
          strokeWidth={strokeWidth}
        />
        <circle
          cx={svgSize / 2}
          cy={svgSize / 2}
          r={radius}
          fill="none"
          stroke={colors.progress}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={progressOffset}
          strokeLinecap="round"
          transform={`rotate(-90 ${svgSize / 2} ${svgSize / 2})`}
          style={{ transition: 'stroke-dashoffset 400ms ease-out' }}
        />
      </svg>
      <Box className={classes.innerCircle}>
        {showPercentage && (
          <Typography component="span" className={classes.percentage}>
            {percentage}%
          </Typography>
        )}
      </Box>
    </StyledContainer>
  )
}
