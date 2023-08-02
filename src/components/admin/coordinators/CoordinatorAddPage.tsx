import AdminLayout from 'components/common/navigation/AdminLayout'
import AdminContainer from 'components/common/navigation/AdminContainer'

import CoordinatorsForm from './CoordinatorsForm'
import { Container } from '@mui/material'
import { useTranslation } from 'next-i18next'

export default function CoordinatorsAddPage() {
  const { t } = useTranslation('coordinator')

  return (
    <AdminLayout>
      <AdminContainer title={t('coordinators')}>
        <Container maxWidth="md" sx={{ py: 5 }}>
          <CoordinatorsForm />
        </Container>
      </AdminContainer>
    </AdminLayout>
  )
}
