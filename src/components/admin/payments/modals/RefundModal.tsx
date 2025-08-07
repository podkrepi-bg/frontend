import React from 'react'
import { useTranslation } from 'next-i18next'

import {
  Dialog,
  Typography,
  DialogTitle,
  DialogContent,
  Grid2,
  CardContent,
  CircularProgress,
} from '@mui/material'
import { useRefundStripeDonation } from 'service/donation'
import { AlertStore } from 'stores/AlertStore'
import { UseQueryResult, useMutation } from '@tanstack/react-query'
import SubmitButton from 'components/common/form/SubmitButton'
import { StripeRefundRequest, TPaymentResponse } from 'gql/donations'
import CloseModalButton from 'components/common/CloseModalButton'
import { useGetPayment } from 'common/hooks/donation'
import { observer } from 'mobx-react'
import { RefundStore } from '../PaymentsPage'
import GenericForm from 'components/common/form/GenericForm'
import { fromMoney } from 'common/util/money'

export default observer(function RefundModal() {
  const { t } = useTranslation('donations')
  const { isRefundOpen, hideRefund, selectedRecord } = RefundStore
  const { data, isLoading, isError }: UseQueryResult<TPaymentResponse> = useGetPayment(
    selectedRecord.id,
  )

  const refundMutation = useMutation({
    mutationFn: useRefundStripeDonation(),
    onError: () => AlertStore.show(t('alerts.error'), 'error'),
    onSuccess: () => {
      AlertStore.show(t('alerts.refundSuccess'), 'success')
      hideRefund()
    },
  })

  if (isLoading) {
    return (
      <Dialog open={true}>
        <CircularProgress />
      </Dialog>
    )
  }
  if (isError) {
    AlertStore.show(t('alerts.error'), 'error')
    return
  }

  const initialValues: StripeRefundRequest = {
    extPaymentIntentId: data.extPaymentIntentId,
  }

  async function onSubmit(values: StripeRefundRequest) {
    refundMutation.mutate(values.extPaymentIntentId)
  }

  return (
    <Dialog
      open={isRefundOpen}
      onClose={hideRefund}
      sx={{ scroll: 'none' }}
      fullWidth={true}
      maxWidth={'sm'}>
      <DialogContent
        style={{
          overflow: 'hidden',
          padding: '2rem',
          width: '100%',
        }}>
        <Grid2 style={{ display: 'flex', justifyContent: 'end', marginRight: '-4rem' }}>
          <CloseModalButton href={''} onClose={hideRefund} />
        </Grid2>
        <DialogTitle style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          {t('refund.title')}
        </DialogTitle>
        <Grid2 container direction="column" component="section">
          <GenericForm onSubmit={onSubmit} initialValues={initialValues}>
            <CardContent>
              <Typography variant="body1">{t('refund.confirmation')}</Typography>
              <Typography variant="body1">
                {t('refund.number')} {data?.extPaymentIntentId}
              </Typography>
              <Typography variant="body1">
                {t('refund.amount')} {fromMoney(data?.amount as number)} {data?.currency}
              </Typography>
              <Typography variant="body1">
                {' '}
                {t('refund.email')} {data?.billingEmail}
              </Typography>
              <Grid2 marginTop={3} size={12}>
                <SubmitButton
                  fullWidth
                  label={t('refund.confirm-button')}
                  loading={refundMutation.isLoading}
                />
              </Grid2>
            </CardContent>
          </GenericForm>
        </Grid2>
      </DialogContent>
    </Dialog>
  )
})
