import { MouseEvent } from 'react'
import { Button, Grid } from '@material-ui/core'
import { useTranslation } from 'next-i18next'

import SubmitButton from 'components/common/form/SubmitButton'

type ActionsProps = {
  nextLabel: string
  loading?: boolean
  disableBack?: boolean
  onBack?: (event: MouseEvent) => void
  onNext?: (event: MouseEvent) => void
}

export default function Actions({
  onBack,
  nextLabel,
  loading = false,
  disableBack = false,
}: ActionsProps) {
  const { t } = useTranslation()
  return (
    <Grid container justify="space-around">
      <Grid item>
        <Button disabled={disableBack} onClick={onBack}>
          {t('support:cta.back')}
        </Button>
      </Grid>
      <Grid item>
        <SubmitButton label={nextLabel} loading={loading} />
      </Grid>
    </Grid>
  )
}
