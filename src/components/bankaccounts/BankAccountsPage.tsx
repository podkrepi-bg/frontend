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
        sx={{ background: 'grey', borderRadius: '10px', minHeight: '100vh', position: 'relative' }}>
        <AppBarMenu />
        <BankAccountsGrid />
      </Container>
    </MainLayout>
  )
}
export default BankAccountsPage
