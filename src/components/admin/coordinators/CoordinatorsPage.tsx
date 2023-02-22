import AdminLayout from 'components/common/navigation/AdminLayout'
import AdminContainer from 'components/common/navigation/AdminContainer'
import { ModalStoreImpl } from 'stores/dashboard/ModalStore'

import CoordinatorsGrid from './grid/CoordinatorsGrid'
import GridAppbar from './grid/GridAppbar'

export const ModalStore = new ModalStoreImpl()

export default function BankAccountsPage() {
  return (
    <AdminLayout>
      <AdminContainer title={'Координатори'}>
        <GridAppbar />
        <CoordinatorsGrid />
      </AdminContainer>
    </AdminLayout>
  )
}
