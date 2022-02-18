import { Container } from '@mui/material'
import EditForm from './EditForm'
import AdminContainer from './layout/AdminContainer'
import AdminLayout from './layout/AdminLayout'

export default function EditPage() {
  return (
    <AdminLayout>
      <AdminContainer title="Документи">
        <Container maxWidth="md" sx={{ py: 5 }}>
          <EditForm />
        </Container>
      </AdminContainer>
    </AdminLayout>
  )
}
