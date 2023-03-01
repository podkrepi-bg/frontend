import { useTranslation } from 'next-i18next'
import { Container } from '@mui/material'

import AdminContainer from 'components/common/navigation/AdminContainer'
import AdminLayout from 'components/common/navigation/AdminLayout'

import Form from './Form'

export default function CreatePage() {
  const { t } = useTranslation('recurring-donation')

  return (
    <AdminLayout>
      <AdminContainer title={t('recurring-donation')}>
        <Container maxWidth="md" sx={{ py: 5 }}>
          <Form />
        </Container>
      </AdminContainer>
    </AdminLayout>
  )
}
