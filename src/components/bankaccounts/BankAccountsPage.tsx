import AdminLayout from 'components/admin/navigation/AdminLayout'
import AdminContainer from 'components/admin/navigation/AdminContainer'

import BankAccountsGrid from './grid/BankAccountsGrid'
import BankAccountsBottomAppbar from './BankAccountsBottomAppBar'

export default function BankAccountsPage() {
  return (
    <AdminLayout>
      <AdminContainer title={'Банкови сметки'}>
        <BankAccountsBottomAppbar />
        <BankAccountsGrid />
      </AdminContainer>
    </AdminLayout>
  )
}
