import { securedAdminProps } from 'middleware/auth/securedProps'
import VaultsPage from 'components/vaults/VaultsPage'
import { endpoints } from 'service/apiEndpoints'

export const getServerSideProps = securedAdminProps(
  ['common', 'auth', 'vaults', 'admin', 'validation'],
  () => endpoints.vaults.vaultsList.url,
)

export default VaultsPage
