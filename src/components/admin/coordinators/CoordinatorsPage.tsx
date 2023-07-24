import AdminLayout from 'components/common/navigation/AdminLayout'
import AdminContainer from 'components/common/navigation/AdminContainer'
import { ModalStoreImpl } from 'stores/dashboard/ModalStore'

import CoordinatorsGrid from './grid/CoordinatorsGrid'
import GridAppbar from './grid/GridAppbar'
import { useTranslation } from 'next-i18next'

export const ModalStore = new ModalStoreImpl()

export default function BankAccountsPage() {
  const { t } = useTranslation('coordinator')

  return (
    <AdminLayout>
      <AdminContainer title={t('coordinators')}>
        <GridAppbar />
        <CoordinatorsGrid />
      </AdminContainer>
    </AdminLayout>
  )
}
