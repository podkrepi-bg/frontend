import CreateForm from './CreateForm'
import { Container } from '@mui/material'
import AdminContainer from 'components/admin/navigation/AdminContainer'
import AdminLayout from 'components/admin/navigation/AdminLayout'
import { useTranslation } from 'next-i18next'

export default function BootcampCreatePage() {
  const { t } = useTranslation()
  return (
    <AdminLayout>
      <AdminContainer title={t('bootcamp:manyTasks')}>
        <Container maxWidth="md" sx={{ py: 5 }}>
          <CreateForm />
        </Container>
      </AdminContainer>
    </AdminLayout>
  )
}
