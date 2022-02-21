import CityForm from './CityEditForm'
import { Container } from '@mui/material'
import AdminLayout from 'components/admin/navigation/AdminLayout'
import AdminContainer from 'components/admin/navigation/AdminContainer'
import { useRouter } from 'next/router'

type Props = { id: string }
export default function CityEditPage() {
  const router = useRouter()

  return (
    <AdminLayout>
      <AdminContainer title={'Градове'}>
        <Container maxWidth="md" sx={{ py: 5 }}>
          <CityForm id={`${router.query.id}`} />
        </Container>
      </AdminContainer>
    </AdminLayout>
  )
}
