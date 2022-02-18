import { Container } from '@mui/material'
import CreateForm from './CreateForm'
import AdminContainer from './layout/AdminContainer'
import AdminLayout from './layout/AdminLayout'

export default function CreatePage() {
  return (
    <AdminLayout>
      <AdminContainer title="Документи">
        <Container maxWidth="md" sx={{ py: 5 }}>
          <CreateForm />
        </Container>
      </AdminContainer>
    </AdminLayout>
  )
}
