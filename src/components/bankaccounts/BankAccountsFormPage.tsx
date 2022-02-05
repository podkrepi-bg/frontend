import BankAccountsForm from './BankAccountsForm'
import LayoutPanel from 'components/bankaccounts/navigation/LayoutPanel'
import { Container } from '@mui/material'
function BankAccountsPageFormPage() {
  return (
    <LayoutPanel>
      <Container maxWidth="sm">
        <BankAccountsForm />
      </Container>
    </LayoutPanel>
  )
}

export default BankAccountsPageFormPage
