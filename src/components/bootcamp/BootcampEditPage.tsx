import { Container } from '@mui/material'
import AdminLayout from 'components/admin/navigation/AdminLayout'
import AdminContainer from 'components/admin/navigation/AdminContainer'
import EditBootcampForm from './EditBootcampForm'
import { useTranslation } from 'next-i18next'

export default function BootcampEditPage() {
  const { t } = useTranslation()
  return (
    <AdminLayout>
      <AdminContainer title={t('bootcamp:manyTasks')}>
        <Container maxWidth="md" sx={{ py: 5 }}>
          <EditBootcampForm />
        </Container>
      </AdminContainer>
    </AdminLayout>
  )
}
