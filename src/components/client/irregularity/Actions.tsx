import { MouseEvent } from 'react'

import { useTranslation } from 'next-i18next'

import { CampaignResponse } from 'gql/campaigns'

import { Grid2 } from '@mui/material'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'

import { ActionButton, ActionLinkButton, ActionSubmitButton } from './helpers/Irregularity.styled'

type ActionsProps = {
  nextLabel: string
  backLabel: string
  loading?: boolean
  disableBack?: boolean
  activeStep: number
  onBack?: (event: MouseEvent) => void
  campaign: CampaignResponse
}

export default function Actions({
  onBack,
  nextLabel,
  backLabel,
  disableBack = false,
  activeStep,
  loading = false,
  campaign,
}: ActionsProps) {
  const { t } = useTranslation('irregularity')

  return (
    <Grid2 container spacing={3} justifyContent="space-between" size={12}>
      <Grid2 sx={{ textAlign: 'left' }}>
        {activeStep === 0 ? (
          <ActionLinkButton
            href={`/campaigns/${campaign.slug}`}
            variant="text"
            startIcon={<ArrowBackIosIcon fontSize="small" />}>
            {t(backLabel)}
          </ActionLinkButton>
        ) : (
          <ActionButton
            fullWidth
            disabled={disableBack}
            onClick={onBack}
            startIcon={<ArrowBackIosIcon fontSize="small" />}>
            {t(backLabel)}
          </ActionButton>
        )}
      </Grid2>
      <Grid2>
        <ActionSubmitButton
          fullWidth
          label={t(nextLabel)}
          loading={loading}
          endIcon={<ArrowForwardIosIcon fontSize="small" />}
        />
      </Grid2>
    </Grid2>
  );
}
