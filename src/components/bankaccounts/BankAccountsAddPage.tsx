import BankAccountsForm from './BankAccountsForm'
import LayoutPanel from './navigation/LayoutPanel'
import { Container } from '@mui/material'
function BankAccountsAddPage() {
  return (
    <LayoutPanel>
      <Container maxWidth="sm">
        <BankAccountsForm />
      </Container>
    </LayoutPanel>
  )
}

export default BankAccountsAddPage
