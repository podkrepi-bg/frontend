import { Container } from '@mui/material'

import CreateForm from './CreateForm'

import AdminLayout from 'components/admin/navigation/AdminLayout'
import AdminContainer from 'components/admin/navigation/AdminContainer'

export default function BootcampNeliCreatePage() {
  return (
    <AdminLayout>
      <AdminContainer title={'BootcampNeli'}>
        <Container maxWidth="md" sx={{ py: 5 }}>
          <CreateForm />
        </Container>
      </AdminContainer>
    </AdminLayout>
  )
}
