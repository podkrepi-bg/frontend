import { Dialog, Grid } from '@mui/material'
import GenericForm from 'components/common/form/GenericForm'
import SubmitButton from 'components/common/form/SubmitButton'
import { useState } from 'react'
import { useTranslation } from 'next-i18next'
import * as yup from 'yup'
import CloseModalButton from 'components/common/CloseModalButton'
import { RerunTransactionsDatesInput } from 'gql/bank-transactions'
import { useRerunBankImportForDate } from 'service/bankTransaction'
import FormDatePicker from 'components/common/form/FormDatePicker'
import { useMutation } from '@tanstack/react-query'
import { AlertStore } from 'stores/AlertStore'
import { StyledDialogContent, StyledDialogTitle } from 'components/admin/styles/Admin.styled'

const validationSchema: yup.SchemaOf<RerunTransactionsDatesInput> = yup
  .object()
  .defined()
  .shape({
    startDate: yup.date().required().min(new Date('2023, 07, 17')), //* start date minimum is set to 17/07/2023 because on this date  started auto-sync https://github.com/podkrepi-bg/frontend/issues/1649
    endDate: yup.date().required(),
  })

export default function RerunTransactionSyncModal({
  isOpen,
  handleClose,
}: {
  isOpen: boolean
  handleClose: () => void
}) {
  const { t } = useTranslation()
  const [loading, setLoading] = useState(false)

  const rerunSyncMutation = useMutation({
    mutationFn: useRerunBankImportForDate(),
    onError: () => AlertStore.show(t('common:alerts.error'), 'error'),
    onSuccess: () => {
      AlertStore.show(t('common:alerts.success'), 'success')
      handleClose()
    },
  })

  async function onSubmit(values: RerunTransactionsDatesInput) {
    setLoading(true)
    try {
      await rerunSyncMutation.mutateAsync(values)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      sx={{ scroll: 'none' }}
      fullWidth={true}
      maxWidth={'sm'}>
      <StyledDialogContent>
        <Grid sx={{ display: 'flex', justifyContent: 'end', mr: '-4rem' }}>
          <CloseModalButton href={''} onClose={handleClose} />
        </Grid>
        <StyledDialogTitle> {t('bank-transactions:rerun-dates')}</StyledDialogTitle>
        <Grid container direction="column" component="section">
          <GenericForm
            onSubmit={onSubmit}
            initialValues={{ startDate: new Date(), endDate: new Date() }}
            validationSchema={validationSchema}>
            <Grid container direction="row" spacing={3}>
              <Grid item xs={6} sx={{ marginBottom: '1rem' }}>
                <FormDatePicker label={t('bank-transactions:cta.from')} name="startDate" />
              </Grid>
              <Grid item xs={6} sx={{ marginBottom: '1rem' }}>
                <FormDatePicker label={t('bank-transactions:cta.to')} name="endDate" />
              </Grid>
              <Grid item xs={12}>
                <SubmitButton
                  fullWidth
                  label="bank-transactions:cta.start-sync"
                  loading={loading}
                />
              </Grid>
            </Grid>
          </GenericForm>
        </Grid>
      </StyledDialogContent>
    </Dialog>
  )
}
