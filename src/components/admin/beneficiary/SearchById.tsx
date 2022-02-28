import { Container } from '@mui/material'
import MainLayout from './navigation/MainLayout'
import GenericGrid from './BeneficiaryGrid'
import { useRouter } from 'next/router'
import { useBeneficiariesList } from 'service/beneficiary'
import AppBarMenu from './navigation/AppBarMenu'
import BankAccountsBottomAppbar from './BeneficiaryBottomAppBar'
import BankAccountsModal from './BeneficiaryModal'
import BankAccountsDetails from './BeneficiaryDetails'

export default function BootcampPage() {
  const { query } = useRouter()
  const queryId = (Array.isArray(query.id) ? query.id[0] : query.id) || ''

  const info = useBeneficiariesList()
  const bootcampers = info.data?.filter((x) =>
    x.countryCode.toLocaleLowerCase().includes(queryId.toLocaleLowerCase()),
  )

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
          <AppBarMenu message={`Search results for '${queryId}'`} />
          <BankAccountsBottomAppbar />
          <GenericGrid data={bootcampers || []} />
        </Container>
      </Container>
    </MainLayout>
  )
}
