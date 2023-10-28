import React, { useState } from 'react'
import { useTranslation } from 'next-i18next'

import { Dialog, Typography, DialogTitle, DialogContent, Grid, CardContent } from '@mui/material'
import { useRefundStripeDonation } from 'service/donation'
import { AlertStore } from 'stores/AlertStore'
import { UseQueryResult, useMutation } from '@tanstack/react-query'
import SubmitButton from 'components/common/form/SubmitButton'
import { DonationResponse, StripeRefundRequest } from 'gql/donations'
import CloseModalButton from 'components/common/CloseModalButton'
import { useDonation } from 'common/hooks/donation'
import { observer } from 'mobx-react'
import { RefundStore } from '../DonationsPage'
import GenericForm from 'components/common/form/GenericForm'
import { fromMoney } from 'common/util/money'

export default observer(function RefundModal() {
  const { t } = useTranslation('donations')
  const { isRefundOpen, hideRefund, selectedRecord } = RefundStore
  const { data }: UseQueryResult<DonationResponse> = useDonation(selectedRecord.id)

  const initialValues: StripeRefundRequest = {
    extPaymentIntentId: '',
  }

  if (data) {
    initialValues.extPaymentIntentId = data.extPaymentIntentId
  }

  const refundMutation = useMutation({
    mutationFn: useRefundStripeDonation(),
    onError: () => AlertStore.show(t('alerts.error'), 'error'),
    onSuccess: () => {
      AlertStore.show(t('alerts.refundSuccess'), 'success')
      hideRefund()
    },
  })
  const [loading, setLoading] = useState(false)

  async function onSubmit(values: StripeRefundRequest) {
    setLoading(true)
    try {
      await refundMutation.mutateAsync(values.extPaymentIntentId)
    } finally {
      setLoading(false)
    }
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
        <Grid style={{ display: 'flex', justifyContent: 'end', marginRight: '-4rem' }}>
          <CloseModalButton href={''} onClose={hideRefund} />
        </Grid>
        <DialogTitle style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          {t('refund.title')}
        </DialogTitle>
        <Grid container direction="column" component="section">
          <GenericForm onSubmit={onSubmit} initialValues={initialValues}>
            <CardContent>
              <Typography variant="body1">{t('refund.confirmation')}</Typography>
              <Typography variant="body1">
                {t('refund.number')} {data?.id}
              </Typography>
              <Typography variant="body1">
                {t('refund.amount')} {fromMoney(data?.amount as number)} {data?.currency}
              </Typography>
              <Typography variant="body1"> {t('refund.email')} {data?.billingEmail}
              </Typography>
              <Grid item xs={12} marginTop={3}>
                <SubmitButton fullWidth label={t('refund.confirm-button')} loading={loading} />
              </Grid>
            </CardContent>
          </GenericForm>
        </Grid>
      </DialogContent>
    </Dialog>
  )
})
