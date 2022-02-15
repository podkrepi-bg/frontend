import { Container } from '@mui/material'

import BankAccountsGrid from './BankAccountsGrid'
import BankAccountsModal from './BankAccountsModal'
import MainLayout from '../admin/navigation/MainLayout'
import AppBarMenu from '../admin/navigation/AppBarMenu'
import BankAccountsDetails from './BankAccountsDetails'
import BankAccountsBottomAppbar from './BankAccountsBottomAppBar'

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
          <AppBarMenu title={'Банкови сметки'} />
          <BankAccountsBottomAppbar />
          <BankAccountsGrid />
        </Container>
      </Container>
    </MainLayout>
  )
}
export default BankAccountsPage
