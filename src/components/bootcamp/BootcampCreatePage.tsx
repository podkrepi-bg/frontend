import CreateForm from './CreateForm'
import { Container } from '@mui/material'
import AdminContainer from 'components/admin/navigation/AdminContainer'
import AdminLayout from 'components/admin/navigation/AdminLayout'

export default function BootcampCreatePage() {
  return (
    <AdminLayout>
      <AdminContainer title={'Бууткамп Георги'}>
        <Container maxWidth="md" sx={{ py: 5 }}>
          <CreateForm />
        </Container>
      </AdminContainer>
    </AdminLayout>
  )
}
