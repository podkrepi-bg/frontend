import { UseQueryResult } from 'react-query'
import { observer } from 'mobx-react'
import { useTranslation } from 'next-i18next'

import { ModalStore } from 'stores/dashboard/ModalStore'
import { useCity } from 'common/hooks/cities'

import { CityResponse } from 'gql/city'
import DetailsDialog from 'components/admin/DetailsDialog'

export default observer(function DetailsModal() {
  const { selectedRecord } = ModalStore
  const { data }: UseQueryResult<CityResponse> = useCity(selectedRecord.id)
  const { t } = useTranslation('cities')

  const dataConverted = [
    { name: 'ID', value: `${data?.id}` },
    { name: t('name'), value: `${data?.name}` },
    { name: t('postalCode'), value: `${data?.postalCode}` },
  ]

  return <DetailsDialog data={dataConverted} />
})
