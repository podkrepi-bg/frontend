import CreateForm from './CreateForm'
import { Container } from '@mui/material'
import AdminContainer from 'components/common/navigation/AdminContainer'
import AdminLayout from 'components/common/navigation/AdminLayout'

export default function CreatePage() {
  return (
    <AdminLayout>
      <AdminContainer title={'Кампании'}>
        <Container maxWidth="md" sx={{ py: 5 }}>
          <CreateForm />
        </Container>
      </AdminContainer>
    </AdminLayout>
  )
}
