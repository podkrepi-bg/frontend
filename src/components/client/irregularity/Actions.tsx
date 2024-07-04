import { MouseEvent } from 'react'

import { useTranslation } from 'next-i18next'

import { CampaignResponse } from 'gql/campaigns'

import { Grid } from '@mui/material'
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
    <Grid container item xs={12} spacing={3} justifyContent="space-between">
      <Grid item sx={{ textAlign: 'left' }}>
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
      </Grid>
      <Grid item>
        <ActionSubmitButton
          fullWidth
          label={t(nextLabel)}
          loading={loading}
          endIcon={<ArrowForwardIosIcon fontSize="small" />}
        />
      </Grid>
    </Grid>
  )
}
