import React, { useMemo } from 'react'
import { UUID } from 'gql/types'

import { Root } from './CampaignProgress.styled'
import theme from 'common/theme'

type Props = {
  campaignId: UUID
  raised: number
  target: number
}

export default function CampaignProgress({ campaignId, raised, target }: Props) {
  const percentage = useMemo(() => (raised / target) * 100, [raised, target])

  return (
    <Root
      completed={percentage > 100 ? 100 : percentage}
      aria-labelledby={`campaign-${campaignId}--donations-progressbar`}
      height={theme.spacing(1.62)}
      baseBgColor={'#b1defe'}
      bgColor={theme.palette.primary.main}
      labelColor={theme.palette.common.black}
      borderRadius={theme.borders.round}
      labelSize={theme.spacing(1.5)}
      labelAlignment="right"
      customLabelStyles={{ fontWeight: 400 }}
    />
  )
}
