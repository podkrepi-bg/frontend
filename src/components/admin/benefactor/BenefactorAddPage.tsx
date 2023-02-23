import { useTranslation } from 'next-i18next'
import { Container } from '@mui/material'

import AdminContainer from 'components/common/navigation/AdminContainer'
import AdminLayout from 'components/common/navigation/AdminLayout'

import AddBenefactorForm from './AddBenefactorForm'

export default function BenefactorPage() {
  const { t } = useTranslation('benefactor')

  return (
    <AdminLayout>
      <AdminContainer title={t('benefactor')}>
        <Container maxWidth="md" sx={{ py: 5 }}>
          <AddBenefactorForm />
        </Container>
      </AdminContainer>
    </AdminLayout>
  )
}
