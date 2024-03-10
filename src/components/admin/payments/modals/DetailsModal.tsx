import React from 'react'
import { UseQueryResult } from '@tanstack/react-query'
import { observer } from 'mobx-react'
import { useTranslation } from 'next-i18next'

import { TPaymentResponse } from 'gql/donations'
import { useGetPayment } from 'common/hooks/donation'
import DetailsDialog from 'components/admin/DetailsDialog'

import { ModalStore } from '../PaymentsPage'

export default observer(function DetailsModal() {
  const { selectedRecord } = ModalStore
  const { data }: UseQueryResult<TPaymentResponse> = useGetPayment(selectedRecord.id)
  const { t } = useTranslation('donations')

  const dataConverted = [
    { name: 'ID', value: `${data?.id}` },
    { name: t('type'), value: `${data?.type}` },
    { name: t('status'), value: `${data?.status}` },
    { name: t('provider'), value: `${data?.provider}` },
    { name: t('ext-customer-id'), value: `${data?.extCustomerId}` },
    { name: t('ext-payment-intent-id'), value: `${data?.extPaymentIntentId}` },
    { name: t('ext-payment-method-id'), value: `${data?.extPaymentMethodId}` },
    { name: t('created-at'), value: `${data?.createdAt}` },
    { name: t('updated-at'), value: `${data?.updatedAt}` },
    { name: t('amount'), value: `${data?.amount}` },
    { name: t('currency'), value: `${data?.currency}` },
  ]

  return <DetailsDialog modalStore={ModalStore} data={dataConverted} />
})
