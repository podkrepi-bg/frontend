import BankAccountsEditForm from './BankAccountsEditForm'
import LayoutPanel from './navigation/LayoutPanel'
import { Container } from '@mui/material'
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
