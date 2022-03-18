import AdminLayout from 'components/admin/navigation/AdminLayout'
import AdminContainer from 'components/admin/navigation/AdminContainer'

import BankAccountsGrid from './grid/BankAccountsGrid'
import GridAppbar from './grid/GridAppbar'

export default function BankAccountsPage() {
  return (
    <AdminLayout>
      <AdminContainer title={'Банкови сметки'}>
        <GridAppbar />
        <BankAccountsGrid />
      </AdminContainer>
    </AdminLayout>
  )
}
