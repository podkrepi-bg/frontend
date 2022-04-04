import { useTranslation } from 'next-i18next'
import { Container } from '@mui/material'

import AdminContainer from 'components/admin/navigation/AdminContainer'
import AdminLayout from 'components/admin/navigation/AdminLayout'

import EditBootcampForm from './EditBootcampForm'
import { useBootcampGetOne } from 'common/hooks/bootcamp'

type Props = { id: string }
export default function BootcampEditPage({ id }: Props) {
  const { t } = useTranslation()
  console.log(id)

  const { data } = useBootcampGetOne(id)
  const initialValues = {
    firstName: data?.firstName || '',
    lastName: data?.lastName || '',
    city: data?.city || '',
  }

  return (
    <AdminLayout>
      <AdminContainer title={t('')}>
        <Container maxWidth="md" sx={{ py: 5 }}>
          <EditBootcampForm initialValues={initialValues} id={id} />
        </Container>
      </AdminContainer>
    </AdminLayout>
  )
}
