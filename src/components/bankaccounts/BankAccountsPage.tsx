import AdminLayout from 'components/admin/navigation/AdminLayout'
import AdminContainer from 'components/admin/navigation/AdminContainer'

import BankAccountsGrid from './BankAccountsGrid'
import BankAccountsModal from './BankAccountsModal'
import BankAccountsDetails from './BankAccountsDetails'
import BankAccountsBottomAppbar from './BankAccountsBottomAppBar'

export default function BankAccountsPage() {
  return (
    <AdminLayout>
      <BankAccountsModal>
        <BankAccountsDetails />
      </BankAccountsModal>
      <AdminContainer title={'Банкови сметки'}>
        <BankAccountsBottomAppbar />
        <BankAccountsGrid />
      </AdminContainer>
    </AdminLayout>
  )
}
