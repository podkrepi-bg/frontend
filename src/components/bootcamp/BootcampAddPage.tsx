import { useTranslation } from 'next-i18next'
import { Container } from '@mui/material'

import AdminContainer from 'components/admin/navigation/AdminContainer'
import AdminLayout from 'components/admin/navigation/AdminLayout'

import AddBootcampForm from './AddBootcampForm'

export default function BootcampAddPage() {
  const { t } = useTranslation()

  return (
    <AdminLayout>
      <AdminContainer title={t('Bootcamp demo')}>
        <Container maxWidth="md" sx={{ py: 5 }}>
          <AddBootcampForm />
        </Container>
      </AdminContainer>
    </AdminLayout>
  )
}
