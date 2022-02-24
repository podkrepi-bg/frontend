import AdminLayout from 'components/admin/navigation/AdminLayout'
import AdminContainer from 'components/admin/navigation/AdminContainer'

import CoordinatorsGrid from './CoordinatorsGrid'
import CoordinatorBottomAppbar from './CoordinatorBottomAppbar'

export default function BankAccountsPage() {
  return (
    <AdminLayout>
      <AdminContainer title={'Координатори'}>
        <CoordinatorBottomAppbar />
        <CoordinatorsGrid />
      </AdminContainer>
    </AdminLayout>
  )
}
