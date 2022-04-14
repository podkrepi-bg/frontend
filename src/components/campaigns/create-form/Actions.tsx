import { MouseEvent } from 'react'
import { useTranslation } from 'next-i18next'

import { Button, Grid } from '@mui/material'
import { createStyles, makeStyles } from '@mui/styles'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'

import SubmitButton from 'components/common/form/SubmitButton'

const useStyles = makeStyles(() =>
  createStyles({
    button: {
      backgroundColor: '#ffffff',
      border: '1px solid #909090',
      borderRadius: '60px',
      color: '#000000',
      fontSize: '12px',
      textAlign: 'center',
      paddingLeft: '0',
      paddingRight: '0',
      '&:hover': { backgroundColor: '#62C4FB', color: '#000000' },
    },
    gridItem: {
      '&.MuiGrid-item': {
        paddingLeft: '0',
      },
    },
  }),
)

type ActionsProps = {
  nextLabel: string
  loading?: boolean
  disableBack?: boolean
  activeStep: number
  onBack?: (event: MouseEvent) => void
}

export default function Actions({
  onBack,
  nextLabel,
  loading = false,
  disableBack = false,
  activeStep,
}: ActionsProps) {
  const { t } = useTranslation('campaigns')
  const classes = useStyles()

  return (
    <Grid container item spacing={3} justifyContent="space-between" direction="row">
      <Grid item xs={8} md={5} className={activeStep === 1 ? classes.gridItem : ''}>
        <Button
          fullWidth
          disabled={disableBack}
          onClick={onBack}
          startIcon={<ArrowBackIosIcon sx={{ transform: 'scale(0.8)' }} />}
          className={classes.button}>
          {t('steps.cta.back')}
        </Button>
      </Grid>
      <Grid item xs={8} md={5} className={classes.gridItem}>
        <SubmitButton
          fullWidth
          label={nextLabel}
          loading={loading}
          endIcon={<ArrowForwardIosIcon sx={{ transform: 'scale(0.8)' }} />}
          className={classes.button}
        />
      </Grid>
    </Grid>
  )
}
