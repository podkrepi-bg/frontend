import { Container } from '@mui/material'
import MainLayout from './navigation/MainLayout'
import GenericGrid from './PersonGrid'
import { usePersonList } from 'common/hooks/person'
import { useRouter } from 'next/router'
import AppBarMenu from './navigation/AppBarMenu'
import BankAccountsBottomAppbar from './PersonBottomAppBar'
import BankAccountsModal from './PersonModal'
import BankAccountsDetails from './PersonDetails'

export default function BootcampPage() {
  const { query } = useRouter()
  const queryId = (Array.isArray(query.id) ? query.id[0] : query.id) || ''

  const info = usePersonList()
  const bootcampers = info.data?.filter(
    (x) =>
      x.firstName.toLocaleLowerCase().includes(queryId.toLocaleLowerCase()) ||
      x.lastName.toLocaleLowerCase().includes(queryId.toLocaleLowerCase()),
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
