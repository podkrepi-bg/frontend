import React from 'react'
import { UseQueryResult } from '@tanstack/react-query'
import { observer } from 'mobx-react'
import { useTranslation } from 'next-i18next'

import { VaultResponse } from 'gql/vault'
import { useVault } from 'common/hooks/vaults'
import DetailsDialog from 'components/admin/DetailsDialog'

import { ModalStore } from '../VaultsPage'

export default observer(function DetailsModal() {
  const { selectedRecord } = ModalStore
  const { data }: UseQueryResult<VaultResponse> = useVault(selectedRecord.id)
  const { t } = useTranslation('vaults')

  const dataConverted = [
    { name: 'ID', value: `${data?.id}` },
    { name: t('name'), value: `${data?.name}` },
    { name: t('currency'), value: `${data?.currency}` },
    { name: t('amount'), value: `${data?.amount}` },
    { name: t('createdAt'), value: `${data?.createdAt}` },
    { name: t('updatedAt'), value: `${data?.updatedAt}` },
    { name: t('campaignId'), value: `${data?.campaignId}` },
  ]

  return <DetailsDialog modalStore={ModalStore} data={dataConverted} />
})
