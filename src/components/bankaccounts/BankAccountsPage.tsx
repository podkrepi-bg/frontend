import AdminLayout from 'components/admin/navigation/AdminLayout'
import AdminContainer from 'components/admin/navigation/AdminContainer'
import { ModalStoreImpl } from 'stores/dashboard/ModalStore'

import BankAccountsGrid from './grid/BankAccountsGrid'
import GridAppbar from './grid/GridAppbar'

export const ModalStore = new ModalStoreImpl()

export default function BankAccountsPage() {
  const { selectedIdsToDelete, setSelectedIdsToDelete } = ModalStore

  selectedIdsToDelete.length > 0 ? setSelectedIdsToDelete([]) : null

  return (
    <AdminLayout>
      <AdminContainer title={'Банкови сметки'}>
        <GridAppbar />
        <BankAccountsGrid />
      </AdminContainer>
    </AdminLayout>
  )
}
