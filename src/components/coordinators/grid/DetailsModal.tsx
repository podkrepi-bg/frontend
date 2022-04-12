import { observer } from 'mobx-react'
import { useTranslation } from 'next-i18next'

import DetailsDialog from 'components/admin/DetailsDialog'

import { ModalStore } from '../CoordinatorsPage'

export default observer(function DetailsModal() {
  const { selectedRecord } = ModalStore
  const { t } = useTranslation('coordinator')
  const dataConverted = [
    { name: 'ID', value: `${selectedRecord?.id}` },
    { name: t('fields.name'), value: `${selectedRecord?.name}` },
  ]

  return <DetailsDialog modalStore={ModalStore} data={dataConverted} />
})
