import { MouseEvent } from 'react'
import { Button, Grid2 } from '@mui/material'
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
    <Grid2 container justifyContent="space-around">
      <Grid2>
        <Button disabled={disableBack} onClick={onBack}>
          {t('support:cta.back')}
        </Button>
      </Grid2>
      <Grid2>
        <SubmitButton label={nextLabel} loading={loading} />
      </Grid2>
    </Grid2>
  );
}
