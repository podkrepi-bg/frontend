import { Container } from '@mui/material'
import BankAccountsModal from './BankAccountsModal'
import BankAccountsGrid from './BankAccountsGrid'
import BankAccountsDetails from './BankAccountsDetails'
import BankAccountsBottomAppbar from './BankAccountsBottomAppBar'
import MainLayout from './navigation/MainLayout'
import AppBarMenu from './navigation/AppBarMenu'
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
          width: '100%',
        }}>
        <Container sx={{ pt: '24px' }} disableGutters maxWidth={false}>
          <AppBarMenu />
          <BankAccountsBottomAppbar />
          <BankAccountsGrid />
        </Container>
      </Container>
    </MainLayout>
  )
}
export default BankAccountsPage
