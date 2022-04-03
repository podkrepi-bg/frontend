import { Container } from '@mui/material'
import AdminLayout from 'components/admin/navigation/AdminLayout'
import AdminContainer from 'components/admin/navigation/AdminContainer'
import EditBootcampForm from './EditBootcampForm'

export default function BootcampEditPage() {
  return (
    <AdminLayout>
      <AdminContainer title={'Бууткамп Георги Генчев'}>
        <Container maxWidth="md" sx={{ py: 5 }}>
          <EditBootcampForm />
        </Container>
      </AdminContainer>
    </AdminLayout>
  )
}
