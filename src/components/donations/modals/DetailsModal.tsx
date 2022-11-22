import React from 'react'
import { UseQueryResult } from '@tanstack/react-query'
import { observer } from 'mobx-react'
import { useTranslation } from 'next-i18next'

import { DonationResponse } from 'gql/donations'
import { useDonation } from 'common/hooks/donation'
import DetailsDialog from 'components/admin/DetailsDialog'
import { useVault } from 'common/hooks/vaults'
import { useViewPerson } from 'service/person'

import { ModalStore } from '../DonationsPage'

export default observer(function DetailsModal() {
  const { selectedRecord } = ModalStore
  const { data }: UseQueryResult<DonationResponse> = useDonation(selectedRecord.id)
  const { t } = useTranslation('donations')
  const vault = useVault(data?.targetVaultId || '').data
  const person = useViewPerson(data?.personId || '').data

  const dataConverted = [
    { name: 'ID', value: `${data?.id}` },
    { name: t('type'), value: `${data?.type}` },
    { name: t('status'), value: `${data?.status}` },
    { name: t('provider'), value: `${data?.provider}` },
    { name: t('vault'), value: `${vault?.name}` },
    { name: t('ext-customer-id'), value: `${data?.extCustomerId}` },
    { name: t('ext-payment-intent-id'), value: `${data?.extPaymentIntentId}` },
    { name: t('ext-payment-method-id'), value: `${data?.extPaymentMethodId}` },
    { name: t('created-at'), value: `${data?.createdAt}` },
    { name: t('updated-at'), value: `${data?.updatedAt}` },
    { name: t('amount'), value: `${data?.amount}` },
    { name: t('currency'), value: `${data?.currency}` },
    { name: t('person'), value: `${person?.firstName + ' ' + person?.lastName}` },
  ]

  return <DetailsDialog modalStore={ModalStore} data={dataConverted} />
})
