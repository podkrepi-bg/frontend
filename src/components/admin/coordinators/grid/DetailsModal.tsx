import { UseQueryResult } from '@tanstack/react-query'
import { useViewCoordinator } from 'common/hooks/coordinators'
import { CoordinatorResponse } from 'gql/coordinators'
import { observer } from 'mobx-react'
import { useTranslation } from 'next-i18next'

import DetailsDialog from 'components/admin/DetailsDialog'

import { ModalStore } from '../CoordinatorsPage'

export default observer(function DetailsModal() {
  const { selectedRecord } = ModalStore
  const { data }: UseQueryResult<CoordinatorResponse> = useViewCoordinator(selectedRecord.id)
  const { t } = useTranslation('coordinator')
  const dataConverted = [
    { name: 'ID', value: data?.id },
    { name: t('fields.name'), value: data?.person?.firstName + ' ' + data?.person?.lastName },
    { name: t('fields.email'), value: data?.person?.email },
    { name: t('fields.phone'), value: data?.person?.phone },
  ]

  return <DetailsDialog modalStore={ModalStore} data={dataConverted} />
})
