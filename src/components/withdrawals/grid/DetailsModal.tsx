import React from 'react'
import { UseQueryResult } from 'react-query'
import { observer } from 'mobx-react'
import { useTranslation } from 'next-i18next'

import { WithdrawalResponse } from 'gql/withdrawals'
import { useWithdrawalDetailsPage } from 'common/hooks/withdrawals'
import { ModalStore } from 'stores/dashboard/ModalStore'
import DetailsDialog from 'components/admin/DetailsDialog'

export default observer(function DetailsModal() {
  const { selectedRecord } = ModalStore
  const { data }: UseQueryResult<WithdrawalResponse> = useWithdrawalDetailsPage(selectedRecord.id)
  const { t } = useTranslation('withdrawals')

  const dataConverted = [
    { name: 'ID', value: `${data?.id}` },
    { name: t('status'), value: `${data?.status}` },
    { name: t('currency'), value: `${data?.currency}` },
    { name: t('amount'), value: `${data?.amount}` },
    { name: t('approvedBy'), value: `${data?.approvedBy.firstName} ${data?.approvedBy.lastName}` },
    { name: t('bankAccount'), value: `${data?.bankAccount.accountHolderName}` },
    { name: t('sourceCampaign'), value: `${data?.sourceCampaign.state}` },
    { name: t('sourceVault'), value: `${data?.sourceVault.name}` },
  ]

  return <DetailsDialog data={dataConverted} />
})
