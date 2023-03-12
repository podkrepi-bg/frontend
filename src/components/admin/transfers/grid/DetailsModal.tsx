import { observer } from 'mobx-react'
import { UseQueryResult } from '@tanstack/react-query'
import { useTranslation } from 'next-i18next'

import { useTransfer } from 'common/hooks/transfers'

import { TransferResponse } from 'gql/transfer'

import DetailsDialog from 'components/admin/DetailsDialog'

import { ModalStore } from '../TransferPage'

export default observer(function DetailsModal() {
  const { t } = useTranslation('transfer')
  const { selectedRecord } = ModalStore

  const { data }: UseQueryResult<TransferResponse> = useTransfer(selectedRecord.id)

  const dataConverted = [
    { name: 'ID', value: data?.id },
    { name: t('status'), value: data?.status },
    { name: t('currency'), value: data?.currency },
    { name: t('amount'), value: data?.amount },
    { name: t('reason'), value: data?.reason },
    {
      name: t('approvedBy'),
      value: `${data?.approvedBy?.firstName || ''} ${data?.approvedBy?.lastName || ''}`,
    },
    { name: t('documentId'), value: data?.documentId || '' },
    { name: t('targetDate'), value: data?.targetDate?.toLocaleString() || '' },
    { name: t('sourceCampaign'), value: data?.sourceCampaign?.title },
    { name: t('sourceVault'), value: data?.sourceVault?.name },
    { name: t('targetCampaign'), value: data?.targetCampaign?.title },
    { name: t('targetVault'), value: data?.targetVault?.name },
  ]

  return <DetailsDialog modalStore={ModalStore} data={dataConverted} />
})
