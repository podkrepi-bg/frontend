import { Dialog, Grid, DialogContent, DialogTitle } from '@mui/material'
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

const validationSchema: yup.SchemaOf<RerunTransactionsDatesInput> = yup
  .object()
  .defined()
  .shape({
    startDate: yup.date().required().min(new Date('2023, 07, 17')),
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
      <DialogContent
        style={{
          overflow: 'hidden',
          padding: '4rem',
          paddingTop: '1rem',
          width: '100%',
        }}>
        <Grid style={{ display: 'flex', justifyContent: 'end', marginRight: '-4rem' }}>
          <CloseModalButton href={''} onClose={handleClose} />
        </Grid>
        <DialogTitle style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          {t('bank-transactions:rerun-dates')}
        </DialogTitle>
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
      </DialogContent>
    </Dialog>
  )
}
