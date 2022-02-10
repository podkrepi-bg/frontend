import { Container } from '@mui/material'
import BankAccountsEditForm from './BankAccountsEditForm'
import LayoutPanel from './navigation/LayoutPanel'
function BankAccountsEditPage() {
  return (
    <LayoutPanel>
      <Container maxWidth="sm">
        <BankAccountsEditForm />
      </Container>
    </LayoutPanel>
  )
}
export default BankAccountsEditPage
