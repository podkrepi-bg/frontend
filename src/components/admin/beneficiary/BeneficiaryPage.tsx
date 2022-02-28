import { Container } from '@mui/material'
import BankAccountsModal from './BeneficiaryModal'
import BankAccountsGrid from './BeneficiaryGrid'
import BankAccountsDetails from './BeneficiaryDetails'
import BankAccountsBottomAppbar from './BeneficiaryBottomAppBar'
import MainLayout from './navigation/MainLayout'
import AppBarMenu from './navigation/AppBarMenu'
import { useBeneficiariesList } from 'service/beneficiary'

const BankAccountsPage = () => {
  const data = useBeneficiariesList().data

  console.log(data)

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
          <AppBarMenu message="Beneficiaries" />
          <BankAccountsBottomAppbar />
          <BankAccountsGrid data={data || []} />
        </Container>
      </Container>
    </MainLayout>
  )
}
export default BankAccountsPage
