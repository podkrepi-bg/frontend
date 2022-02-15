import { Container } from '@mui/material'
import BankAccountsForm from './BankAccountsForm'
import MainLayout from '../admin/navigation/MainLayout'
function BankAccountsAddPage() {
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
          <BankAccountsForm />
        </Container>
      </Container>
    </MainLayout>
  )
}

export default BankAccountsAddPage
