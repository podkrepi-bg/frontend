import CreateForm from './CreateForm'
import { Container } from '@mui/material'
import AdminContainer from 'components/admin/navigation/AdminContainer'
import AdminLayout from 'components/admin/navigation/AdminLayout'
import { useTranslation } from 'next-i18next'

export default function CreatePage() {
  const { t } = useTranslation('campaign-document')
  return (
    <AdminLayout>
      <AdminContainer title={t('title')}>
        <Container maxWidth="md" sx={{ py: 5 }}>
          <CreateForm />
        </Container>
      </AdminContainer>
    </AdminLayout>
  )
}
