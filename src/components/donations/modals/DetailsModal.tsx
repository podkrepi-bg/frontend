import React from 'react'
import { UseQueryResult } from 'react-query'
import { observer } from 'mobx-react'
import { Dialog, Card, CardContent, Typography, Divider } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { DonationResponse } from 'gql/donations'
import { useDonation } from 'common/hooks/donation'
import { ModalStore } from 'stores/documents/ModalStore'

type Props = {
  id: string
}

export default observer(function DetailsModal({ id }: Props) {
  const { data }: UseQueryResult<DonationResponse> = useDonation(id)
  const { isDetailsOpen, hideDetails } = ModalStore
  const { t } = useTranslation()

  return (
    <Dialog open={isDetailsOpen} onClose={hideDetails} sx={{ top: '-35%' }}>
      <Card>
        <CardContent>
          <Typography variant="h5" sx={{ marginBottom: '16px' }}>
            {t('donations:cta:details')}
          </Typography>
          <Divider />
          <Typography variant="body1" sx={{ fontSize: 24, marginTop: '8px' }}>
            {t('donations:type')}: {data?.type}
          </Typography>
          <Typography variant="body1" sx={{ fontSize: 24 }}>
            {t('donations:status')}: {data?.status}
          </Typography>
          <Typography variant="body1" sx={{ fontSize: 24 }}>
            {t('donations:provider')}: {data?.provider}
          </Typography>
          <Typography variant="body1" sx={{ fontSize: 24 }}>
            {t('donations:vault')}: {data?.targetVaultId}
          </Typography>
          <Typography variant="body1" sx={{ fontSize: 24 }}>
            {t('donations:ext-customer-id')}: {data?.extCustomerId}
          </Typography>
          <Typography variant="body1" sx={{ fontSize: 24 }}>
            {t('donations:ext-payment-intent-id')}: {data?.extPaymentIntentId}
          </Typography>
          <Typography variant="body1" sx={{ fontSize: 24 }}>
            {t('donations:ext-payment-method-id')}: {data?.extPaymentMethodId}
          </Typography>
          <Typography variant="body1" sx={{ fontSize: 24 }}>
            {t('donations:created-at')}: {data?.createdAt}
          </Typography>
          <Typography variant="body1" sx={{ fontSize: 24 }}>
            {t('donations:updated-at')}: {data?.updatedAt}
          </Typography>
          <Typography variant="body1" sx={{ fontSize: 24 }}>
            {t('donations:currency')}: {data?.currency}
          </Typography>
          <Typography variant="body1" sx={{ fontSize: 24 }}>
            {t('donations:amount')}: {data?.amount}
          </Typography>
          <Typography variant="body1" sx={{ fontSize: 24 }}>
            {t('donations:person')}: {data?.personId}
          </Typography>
        </CardContent>
      </Card>
    </Dialog>
  )
})
