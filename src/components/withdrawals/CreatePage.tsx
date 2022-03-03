import { useTranslation } from 'next-i18next'
import { Container } from '@mui/material'

import AdminContainer from 'components/admin/navigation/AdminContainer'
import AdminLayout from 'components/admin/navigation/AdminLayout'

import Form from './Form'

export default function CreatePage() {
  const { t } = useTranslation()

  return (
    <AdminLayout>
      <AdminContainer title={t('withdrawals:withdrawals')}>
        <Container maxWidth="md" sx={{ py: 5 }}>
          <Form />
        </Container>
      </AdminContainer>
    </AdminLayout>
  )
}
