import AdminLayout from 'components/admin/navigation/AdminLayout'
import AdminContainer from 'components/admin/navigation/AdminContainer'

import BankAccountsForm from './BankAccountsForm'
import { Container } from '@mui/material'

export default function BankAccountsAddPage() {
  return (
    <AdminLayout>
      <AdminContainer title={'Банкови сметки'}>
        <Container maxWidth="md" sx={{ py: 5 }}>
          <BankAccountsForm />
        </Container>
      </AdminContainer>
    </AdminLayout>
  )
}
