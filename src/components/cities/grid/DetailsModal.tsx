import { UseQueryResult } from '@tanstack/react-query'
import { observer } from 'mobx-react'
import { useTranslation } from 'next-i18next'

import { useCity } from 'common/hooks/cities'
import { CityResponse } from 'gql/cities'
import DetailsDialog from 'components/admin/DetailsDialog'

import { ModalStore } from '../CityPage'

export default observer(function DetailsModal() {
  const { selectedRecord } = ModalStore
  const { data }: UseQueryResult<CityResponse> = useCity(selectedRecord.id)
  const { t } = useTranslation('cities')

  const dataConverted = [
    { name: 'ID', value: `${data?.id}` },
    { name: t('name'), value: `${data?.name}` },
    { name: t('postalCode'), value: `${data?.postalCode}` },
  ]

  return <DetailsDialog modalStore={ModalStore} data={dataConverted} />
})
