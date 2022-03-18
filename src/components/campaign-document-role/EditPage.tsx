import EditForm from './EditForm'
import { Container } from '@mui/material'
import AdminLayout from 'components/admin/navigation/AdminLayout'
import AdminContainer from 'components/admin/navigation/AdminContainer'
import { useTranslation } from 'next-i18next'

export default function CityEditPage() {
  const { t } = useTranslation('campaign-document-role')
  return (
    <AdminLayout>
      <AdminContainer title={t('title')}>
        <Container maxWidth="md" sx={{ py: 5 }}>
          <EditForm />
        </Container>
      </AdminContainer>
    </AdminLayout>
  )
}
