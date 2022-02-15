import { Container } from '@mui/material'
import BankAccountsEditForm from './BankAccountsEditForm'
import MainLayout from './navigation/MainLayout'
function BankAccountsEditPage() {
  return (
    <MainLayout>
      <Container
        maxWidth={false}
        sx={{
          borderRadius: '13px',
          minHeight: 'calc(100vh - 64px)',
          position: 'relative',
          background: '#e9f6ff',
          width: '100%',
          py: 10,
        }}>
        <Container maxWidth="sm">
          <BankAccountsEditForm />
        </Container>
      </Container>
    </MainLayout>
  )
}
export default BankAccountsEditPage
