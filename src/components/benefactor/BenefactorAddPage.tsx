import { useTranslation } from 'next-i18next'
import { Container } from '@mui/material'

import AdminContainer from 'components/admin/navigation/AdminContainer'
import AdminLayout from 'components/admin/navigation/AdminLayout'

import AddBenefactorForm from './AddBenefactorForm'

export default function BenefactorPage() {
  const { t } = useTranslation()

  return (
    <AdminLayout>
      <AdminContainer title={t('benefactor:benefactor')}>
        <Container maxWidth="md" sx={{ py: 5 }}>
          <AddBenefactorForm />
        </Container>
      </AdminContainer>
    </AdminLayout>
  )
}
