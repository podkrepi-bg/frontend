import { Container } from '@mui/material'
import { useTranslation } from 'next-i18next'

import AdminLayout from 'components/admin/navigation/AdminLayout'
import AdminContainer from 'components/admin/navigation/AdminContainer'

import EditForm from './EditForm'

export default function EditPage() {
  const { t } = useTranslation()

  return (
    <AdminLayout>
      <AdminContainer title={t('transfer:transfers')}>
        <Container maxWidth="md" sx={{ py: 5 }}>
          <EditForm />
        </Container>
      </AdminContainer>
    </AdminLayout>
  )
}
