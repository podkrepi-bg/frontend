import { MouseEvent } from 'react'
import { Button, Grid } from '@material-ui/core'
import { useTranslation } from 'next-i18next'

type ActionsProps = {
  nextLabel: string
  disableBack?: boolean
  onBack?: (event: MouseEvent) => void
  onNext?: (event: MouseEvent) => void
}

export default function Actions({ onBack, onNext, nextLabel, disableBack = false }: ActionsProps) {
  const { t } = useTranslation()
  return (
    <Grid container justify="space-around">
      <Grid item>
        <Button disabled={disableBack} onClick={onBack}>
          {t('common:support-form.cta.back')}
        </Button>
      </Grid>
      <Grid item>
        <Button variant="contained" color="primary" onClick={onNext}>
          {nextLabel}
        </Button>
      </Grid>
    </Grid>
  )
}
