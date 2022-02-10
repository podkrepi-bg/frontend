import { Container } from '@mui/material'
import LayoutPanel from './navigation/LayoutPanel'
import BankAccountsForm from './BankAccountsForm'
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
