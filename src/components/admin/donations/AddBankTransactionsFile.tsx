import { useTranslation } from 'next-i18next'
import { Container } from '@mui/material'
import AdminContainer from 'components/admin/navigation/AdminContainer'
import AdminLayout from 'components/admin/navigation/AdminLayout'
import BankTransactionsFileForm from './AddBankTransactionsFileForm'

export default function AddBankTransactionsFile() {
  const { t } = useTranslation()

  return (
    <AdminLayout>
      <AdminContainer title={t('donations:donations')}>
        <Container maxWidth="md" sx={{ py: 5 }}>
          <BankTransactionsFileForm />
        </Container>
      </AdminContainer>
    </AdminLayout>
  )
}
