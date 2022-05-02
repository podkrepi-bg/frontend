import { MouseEvent } from 'react'
import { useTranslation } from 'next-i18next'

import { Button, Grid } from '@mui/material'
import { createStyles, makeStyles } from '@mui/styles'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'

import SubmitButton from 'components/common/form/SubmitButton'
import LinkButton from 'components/common/LinkButton'
import { CampaignResponse } from 'gql/campaigns'

const useStyles = makeStyles(() =>
  createStyles({
    button: {
      backgroundColor: '#0098E3',
      border: '1px solid #909090',
      padding: '10px 40px',
      borderRadius: '60px',
      width: 'auto',
      color: '#FFFFFF',
      fontSize: '18px',
      '&:hover': { backgroundColor: '#62C4FB', color: '#000000' },
    },
  }),
)

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
  loading = false,
  disableBack = false,
  activeStep,
  campaign,
}: ActionsProps) {
  const { t } = useTranslation('irregularity-report')
  const classes = useStyles()

  return (
    <Grid container item spacing={3} justifyContent="space-between" direction="row">
      <Grid item xs={6} md={6} sx={{ textAlign: 'left' }}>
        {activeStep === 0 ? (
          <LinkButton
            href={`/campaigns/${campaign.slug}`}
            variant="outlined"
            startIcon={<ArrowBackIosIcon sx={{ transform: 'scale(0.8)' }} />}
            className={classes.button}>
            {t(backLabel)}
          </LinkButton>
        ) : (
          <Button
            fullWidth
            disabled={disableBack}
            onClick={onBack}
            startIcon={<ArrowBackIosIcon sx={{ transform: 'scale(0.8)' }} />}
            className={classes.button}>
            {t(backLabel)}
          </Button>
        )}
      </Grid>
      <Grid item xs={6} md={6} sx={{ textAlign: 'right' }}>
        <SubmitButton
          fullWidth
          label={t(nextLabel)}
          loading={loading}
          endIcon={<ArrowForwardIosIcon sx={{ transform: 'scale(0.8)' }} />}
          className={classes.button}
        />
      </Grid>
    </Grid>
  )
}
