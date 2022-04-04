import React from 'react'
import { UseQueryResult } from 'react-query'
import { observer } from 'mobx-react'
import { useTranslation } from 'next-i18next'

import { ModalStore } from 'stores/dashboard/ModalStore'
import DetailsDialog from 'components/admin/DetailsDialog'
import { BootcampResponse } from 'gql/bootcamp'
import { getOneBootcamp } from 'service/bootcamp'

export default observer(function DetailsModal() {
  const { selectedRecord } = ModalStore
  const { data }: UseQueryResult<BootcampResponse> = getOneBootcamp(selectedRecord.id)
  const { t } = useTranslation()

  type DataType = [
    { name: string; value: string },
    { name: string; value: string },
    { name: string; value: string },
  ]

  const dataConverted: DataType = [
    { name: 'ID', value: `${data?.id}` },
    { name: t('bootcamp:grid:individual'), value: `${data?.firstName} ${data?.lastName}` },
    { name: t('bootcamp:grid:city'), value: `${data?.city}` },
  ]

  return <DetailsDialog data={dataConverted} />
})
