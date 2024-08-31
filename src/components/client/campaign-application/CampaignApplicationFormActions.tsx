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

type CampaignApplicationFormActionsProps = {
  activeStep: number
  onBack?: (event: MouseEvent) => void
  isLast: boolean
}

export default function CampaignApplicationFormActions({
  onBack,
  activeStep,
  isLast,
}: CampaignApplicationFormActionsProps) {
  const { t } = useTranslation('campaign-application')

  return (
    <Root container item xs={12} spacing={6} sx={{ marginTop: 1 }} justifyContent="space-between">
      <Grid item xs={12} md={6} flexWrap="nowrap">
        {activeStep === 0 ? (
          <ActionLinkButton
            fullWidth
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
      <Grid item xs={12} md={6} flexWrap="nowrap">
        <ActionSubmitButton
          fullWidth
          label={t(isLast ? 'cta.submit' : 'cta.next')}
          endIcon={<ArrowForwardIosIcon fontSize="small" />}
        />
      </Grid>
    </Root>
  )
}
