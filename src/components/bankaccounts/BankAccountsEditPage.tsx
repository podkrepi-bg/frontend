import { useRouter } from 'next/router'
import { Container } from '@mui/material'

import AdminLayout from 'components/admin/navigation/AdminLayout'
import AdminContainer from 'components/admin/navigation/AdminContainer'

import BankAccountsEditForm from './BankAccountsEditForm'

export default function BankAccountsEditPage() {
  const router = useRouter()
  return (
    <AdminLayout>
      <AdminContainer title={'Банкови сметки'}>
        <Container maxWidth="md" sx={{ py: 5 }}>
          <BankAccountsEditForm id={`${router.query.id}`} />
        </Container>
      </AdminContainer>
    </AdminLayout>
  )
}
