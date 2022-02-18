import { Container } from '@mui/material'
import AdminContainer from 'components/admin/navigation/AdminContainer'
import AdminLayout from 'components/admin/navigation/AdminLayout'
import Form from './Form'

export default function CreatePage() {
  return (
    <AdminLayout>
      <AdminContainer title="Документи">
        <Container maxWidth="md" sx={{ py: 5 }}>
          <Form />
        </Container>
      </AdminContainer>
    </AdminLayout>
  )
}
