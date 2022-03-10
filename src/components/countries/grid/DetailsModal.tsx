import { UseQueryResult } from 'react-query'
import { observer } from 'mobx-react'
import { useTranslation } from 'next-i18next'

import { ModalStore } from 'stores/dashboard/ModalStore'
import { useCountry } from 'common/hooks/countries'

import { CountryResponse } from 'gql/countries'
import DetailsDialog from 'components/admin/DetailsDialog'

export default observer(function DetailsModal() {
  const { selectedRecord } = ModalStore
  const { data }: UseQueryResult<CountryResponse> = useCountry(selectedRecord.id)
  const { t } = useTranslation('countries')

  const dataConverted = [
    { name: 'ID', value: `${data?.id}` },
    { name: t('fields.name'), value: `${data?.name}` },
    { name: t('fields.country-code'), value: `${data?.countryCode}` },
  ]

  return <DetailsDialog data={dataConverted} />
})
