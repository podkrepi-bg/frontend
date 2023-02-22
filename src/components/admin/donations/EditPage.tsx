import { useTranslation } from 'next-i18next'
import { Container } from '@mui/material'

import AdminContainer from 'components/common/navigation/AdminContainer'
import AdminLayout from 'components/common/navigation/AdminLayout'

import Form from './Form'

export default function EditPage() {
  const { t } = useTranslation()

  return (
    <AdminLayout>
      <AdminContainer title={t('donations:donations')}>
        <Container maxWidth="md" sx={{ py: 5 }}>
          <Form />
        </Container>
      </AdminContainer>
    </AdminLayout>
  )
}
