import LayoutPanel from './navigation/LayoutPanel'
import AppBarMenu from './navigation/AppBarMenu'
import { Container } from '@mui/material'
import BankAccountsModal from './BankAccountsModal'
import BankAccountsGrid from './BankAccountsGrid'
import BankAccountsDetails from './BankAccountsDetails'

const BankAccountsPage = () => {
  return (
    <div style={{ minHeight: '100vh', background: '#f7f7f7', paddingTop: 70 }}>
      <LayoutPanel>
        <BankAccountsModal>
          <BankAccountsDetails />
        </BankAccountsModal>
        <Container>
          <Container disableGutters>
            <AppBarMenu />
            <BankAccountsGrid />
          </Container>
        </Container>
      </LayoutPanel>
    </div>
  )
}
export default BankAccountsPage
