import { Container } from '@mui/material'
import BankAccountsModal from './PersonModal'
import BankAccountsGrid from './PersonGrid'
import BankAccountsDetails from './PersonDetails'
import BankAccountsBottomAppbar from './PersonBottomAppBar'
import MainLayout from './navigation/MainLayout'
import AppBarMenu from './navigation/AppBarMenu'
import { usePersonList } from 'common/hooks/person'

const BankAccountsPage = () => {
  const data = usePersonList().data

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
          <AppBarMenu message="People" />
          <BankAccountsBottomAppbar />
          <BankAccountsGrid data={data || []} />
        </Container>
      </Container>
    </MainLayout>
  )
}
export default BankAccountsPage
