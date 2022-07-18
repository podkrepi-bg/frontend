import { useTranslation } from 'next-i18next'

import { Container } from '@mui/material'

import AdminLayout from 'components/admin/navigation/AdminLayout'
import AdminContainer from 'components/admin/navigation/AdminContainer'
import CreateForm from './CreateForm'

export default function CreatePage() {
  const { t } = useTranslation('organizer')

  return (
    <AdminLayout>
      <AdminContainer title={t('admin.create.heading')}>
        <Container maxWidth="md" sx={{ py: 5 }}>
          <CreateForm />
        </Container>
      </AdminContainer>
    </AdminLayout>
  )
}
