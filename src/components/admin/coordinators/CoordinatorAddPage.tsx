import AdminLayout from 'components/common/navigation/AdminLayout'
import AdminContainer from 'components/common/navigation/AdminContainer'

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
