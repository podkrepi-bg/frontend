import { useTranslation } from 'next-i18next'
import { Container } from '@mui/material'

import AdminContainer from 'components/common/navigation/AdminContainer'
import AdminLayout from 'components/common/navigation/AdminLayout'

import EditForm from './EditForm'

export default function EditPage() {
  const { t } = useTranslation('beneficiary')

  return (
    <AdminLayout>
      <AdminContainer title={t('all')}>
        <Container maxWidth="md" sx={{ py: 5 }}>
          <EditForm />
        </Container>
      </AdminContainer>
    </AdminLayout>
  )
}
