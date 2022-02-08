import AppBarMenu from './navigation/AppBarMenu'
import { Container } from '@mui/material'
import BankAccountsModal from './BankAccountsModal'
import BankAccountsGrid from './BankAccountsGrid'
import BankAccountsDetails from './BankAccountsDetails'
import MainLayout from './navigation/MainLayout'
const BankAccountsPage = () => {
  return (
    <MainLayout>
      <BankAccountsModal>
        <BankAccountsDetails />
      </BankAccountsModal>
      <Container
        maxWidth={false}
        sx={{
          borderRadius: '13px',
          minHeight: 'calc(100vh - 64px)',
          position: 'relative',
          background: '#e9f6ff',
        }}>
        <Container sx={{ pt: '24px' }} disableGutters>
          <AppBarMenu />
          <BankAccountsGrid />
        </Container>
      </Container>
    </MainLayout>
  )
}
export default BankAccountsPage
