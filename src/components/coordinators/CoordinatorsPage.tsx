import AdminLayout from 'components/admin/navigation/AdminLayout'
import AdminContainer from 'components/admin/navigation/AdminContainer'

import CoordinatorsGrid from './CoordinatorsGrid'
import CoordinatorModal from './CoordinatorModal'
import CoordinatorDetails from './CoordinatorDetails'
import CoordinatorBottomAppbar from './CoordinatorBottomAppbar'

export default function BankAccountsPage() {
  return (
    <AdminLayout>
      <CoordinatorModal>
        <CoordinatorDetails />
      </CoordinatorModal>
      <AdminContainer title={'Координатори'}>
        <CoordinatorBottomAppbar />
        <CoordinatorsGrid />
      </AdminContainer>
    </AdminLayout>
  )
}
