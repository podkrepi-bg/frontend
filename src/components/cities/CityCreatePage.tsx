import CityCreateForm from './CityCreateForm'
import { Container } from '@mui/material'
import AdminContainer from 'components/admin/navigation/AdminContainer'
import AdminLayout from 'components/admin/navigation/AdminLayout'

export default function CityCreatePage() {
  return (
    <AdminLayout>
      <AdminContainer title={'Градове'}>
        <Container maxWidth="md" sx={{ py: 5 }}>
          <CityCreateForm />
        </Container>
      </AdminContainer>
    </AdminLayout>
  )
}
