import { MouseEvent } from 'react'

import { useTranslation } from 'next-i18next'

import { Grid } from '@mui/material'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'

import {
  ActionButton,
  ActionLinkButton,
  ActionSubmitButton,
  Root,
} from './helpers/campaignApplicationFormActions.styled'

type ActionsProps = {
  loading?: boolean
  activeStep: number
  onBack?: (event: MouseEvent) => void
}

export default function CampaignApplicationFormActions({
  onBack,
  activeStep,
  loading = false,
}: ActionsProps) {
  const { t } = useTranslation('campaign-application')

  return (
    <Root container item xs={12} spacing={3} justifyContent="space-between">
      <Grid item sx={{ textAlign: 'left' }}>
        {activeStep === 0 ? (
          <ActionLinkButton
            href=""
            variant="outlined"
            startIcon={<ArrowBackIosIcon fontSize="small" />}>
            {t('cta.back')}
          </ActionLinkButton>
        ) : (
          <ActionButton
            fullWidth
            onClick={onBack}
            startIcon={<ArrowBackIosIcon fontSize="small" />}>
            {t('cta.back')}
          </ActionButton>
        )}
      </Grid>
      <Grid item>
        <ActionSubmitButton
          fullWidth
          label={t('cta.next')}
          loading={loading}
          endIcon={<ArrowForwardIosIcon fontSize="small" />}
        />
      </Grid>
    </Root>
  )
}
