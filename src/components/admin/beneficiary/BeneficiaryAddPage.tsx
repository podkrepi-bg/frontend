import { Container } from '@mui/material'
import MainLayout from 'components/admin/person/navigation/MainLayout'
import BankAccountsForm from './BeneficiaryForm'

function BankAccountsAddPage() {
  return (
    <MainLayout>
      <Container maxWidth="sm">
        <BankAccountsForm />
      </Container>
    </MainLayout>
  )
}

export default BankAccountsAddPage
