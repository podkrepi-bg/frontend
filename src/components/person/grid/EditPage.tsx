import { useTranslation } from 'next-i18next'

import { Container } from '@mui/material'

import AdminLayout from 'components/admin/navigation/AdminLayout'
import AdminContainer from 'components/admin/navigation/AdminContainer'
import PersonForm from './PersonForm'

export default function CreatePage() {
  const { t } = useTranslation()

  return (
    <AdminLayout>
      <AdminContainer title={t('person:admin.headings.edit')}>
        <Container maxWidth="md" sx={{ py: 5 }}>
          <PersonForm />
        </Container>
      </AdminContainer>
    </AdminLayout>
  )
}
