import { Container } from '@mui/material'
import BankAccountsEditForm from './BeneficiaryEditForm'
import MainLayout from './navigation/MainLayout'

function BankAccountsEditPage() {
  return (
    <MainLayout>
      <Container maxWidth="sm">
        <BankAccountsEditForm />
      </Container>
    </MainLayout>
  )
}
export default BankAccountsEditPage
