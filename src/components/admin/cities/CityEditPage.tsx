import EditForm from './EditForm'
import { Container } from '@mui/material'
import AdminLayout from 'components/common/navigation/AdminLayout'
import AdminContainer from 'components/common/navigation/AdminContainer'

export default function CityEditPage() {
  return (
    <AdminLayout>
      <AdminContainer title={'Градове'}>
        <Container maxWidth="md" sx={{ py: 5 }}>
          <EditForm />
        </Container>
      </AdminContainer>
    </AdminLayout>
  )
}
