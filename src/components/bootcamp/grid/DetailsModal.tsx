import { UseQueryResult } from 'react-query'
import { observer } from 'mobx-react'
import { useTranslation } from 'next-i18next'

import { ModalStore } from 'stores/dashboard/ModalStore'
import { useTask } from 'common/hooks/bootcamp'

import { BootcampResponse } from 'gql/bootcamp'
import DetailsDialog from 'components/admin/DetailsDialog'

export default observer(function DetailsModal() {
  const { selectedRecord } = ModalStore
  const { data }: UseQueryResult<BootcampResponse> = useTask(selectedRecord.id)
  const { t } = useTranslation('bootcamp')

  const dataConverted = [
    { name: 'ID', value: `${data?.id}` },
    { name: t('status'), value: `${data?.status}` },
    { name: t('title'), value: `${data?.title}` },
    { name: t('message'), value: `${data?.message}` },
    { name: t('startDate'), value: `${data?.startDate}` },
    { name: t('endDate'), value: `${data?.endDate}` },
    { name: t('firstName'), value: `${data?.firstName}` },
    { name: t('lastName'), value: `${data?.lastName}` },
  ]

  return <DetailsDialog data={dataConverted} />
})
