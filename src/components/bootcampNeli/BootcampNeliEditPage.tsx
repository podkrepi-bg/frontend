import { Container } from '@mui/material'

import EditForm from './EditForm'

import AdminLayout from 'components/admin/navigation/AdminLayout'
import AdminContainer from 'components/admin/navigation/AdminContainer'

export default function BootcampNeliEditPage() {
  return (
    <AdminLayout>
      <AdminContainer title={'BootcampNeli'}>
        <Container maxWidth="md" sx={{ py: 5 }}>
          <EditForm />
        </Container>
      </AdminContainer>
    </AdminLayout>
  )
}
