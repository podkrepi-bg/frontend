import { Container } from '@mui/material'
import MainLayout from 'components/bankaccounts/navigation/MainLayout'
import BankAccountsForm from './BankAccountsForm'

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
