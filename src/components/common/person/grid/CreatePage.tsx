import { useTranslation } from 'next-i18next'

import { Container } from '@mui/material'

import AdminLayout from 'components/common/navigation/AdminLayout'
import AdminContainer from 'components/common/navigation/AdminContainer'
import PersonForm from './PersonForm'

export default function CreatePage() {
  const { t } = useTranslation()

  return (
    <AdminLayout>
      <AdminContainer title={t('person:admin.headings.create')}>
        <Container maxWidth="md" sx={{ py: 5 }}>
          <PersonForm />
        </Container>
      </AdminContainer>
    </AdminLayout>
  )
}
