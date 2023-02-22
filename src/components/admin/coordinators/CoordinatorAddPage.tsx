import AdminLayout from 'components/admin/navigation/AdminLayout'
import AdminContainer from 'components/admin/navigation/AdminContainer'

import CoordinatorsForm from './CoordinatorsForm'
import { Container } from '@mui/material'

export default function CoordinatorsAddPage() {
  return (
    <AdminLayout>
      <AdminContainer title={'Координатори'}>
        <Container maxWidth="md" sx={{ py: 5 }}>
          <CoordinatorsForm />
        </Container>
      </AdminContainer>
    </AdminLayout>
  )
}
