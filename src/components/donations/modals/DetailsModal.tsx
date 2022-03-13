import React from 'react'
import { UseQueryResult } from 'react-query'
import { observer } from 'mobx-react'
import { Dialog, Card, CardContent, Typography, Divider } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { DonationResponse } from 'gql/donations'
import { useDonation } from 'common/hooks/donations'
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
            {'Детайли'}
          </Typography>
          <Divider />
          <Typography variant="body1" sx={{ fontSize: 24, marginTop: '8px' }}>
            {t('donations:type')}: {data?.type}
          </Typography>
          <Typography variant="body1" sx={{ fontSize: 24 }}>
            {'Статус'}: {data?.status}
          </Typography>
          <Typography variant="body1" sx={{ fontSize: 24 }}>
            {'Доставчик'}: {data?.provider}
          </Typography>
          <Typography variant="body1" sx={{ fontSize: 24 }}>
            {'Трезор'}: {data?.targetVaultId}
          </Typography>
          <Typography variant="body1" sx={{ fontSize: 24 }}>
            {'ID на клиент'}: {data?.extCustomerId}
          </Typography>
          <Typography variant="body1" sx={{ fontSize: 24 }}>
            {'ID на транзакция'}: {data?.extPaymentIntentId}
          </Typography>
          <Typography variant="body1" sx={{ fontSize: 24 }}>
            {'ID на плащане'}: {data?.extPaymentMethodId}
          </Typography>
          <Typography variant="body1" sx={{ fontSize: 24 }}>
            {'Създаден на'}: {data?.createdAt}
          </Typography>
          <Typography variant="body1" sx={{ fontSize: 24 }}>
            {'Променен на'}: {data?.updatedAt}
          </Typography>
          <Typography variant="body1" sx={{ fontSize: 24 }}>
            {'Валута'}: {data?.currency}
          </Typography>
          <Typography variant="body1" sx={{ fontSize: 24 }}>
            {'Сума'}: {data?.amount}
          </Typography>
          <Typography variant="body1" sx={{ fontSize: 24 }}>
            {'Създал'}: {data?.personId}
          </Typography>
        </CardContent>
      </Card>
    </Dialog>
  )
})
