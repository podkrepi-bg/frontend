import React from 'react'
import { UseQueryResult } from '@tanstack/react-query'
import { observer } from 'mobx-react'
import { useTranslation } from 'next-i18next'

import { RecurringDonationResponse } from 'gql/recurring-donation'
import { useRecurringDonation } from 'common/hooks/recurringDonation'
import { ModalStore } from 'stores/dashboard/ModalStore'
import DetailsDialog from 'components/admin/DetailsDialog'

export default observer(function DetailsModal() {
  const { selectedRecord } = ModalStore
  const { data }: UseQueryResult<RecurringDonationResponse> = useRecurringDonation(
    selectedRecord.id,
  )
  const { t } = useTranslation('recurring-donation')

  const dataConverted = [
    { name: 'ID', value: `${data?.id}` },
    { name: t('status'), value: `${data?.status}` },
    { name: t('currency'), value: `${data?.currency}` },
    { name: t('amount'), value: `${data?.amount}` },
    { name: t('extSubscriptionId'), value: `${data?.extSubscriptionId}` },
    { name: t('extCustomerId'), value: `${data?.extCustomerId}` },
    { name: t('vaultId'), value: `${data?.sourceVault}` },
  ]

  return <DetailsDialog modalStore={ModalStore} data={dataConverted} />
})
