import { securedAdminProps } from 'middleware/auth/keycloak'
import WithdrawalsPage from 'components/withdrawals/WithdrawalPage'
import { endpoints } from 'service/apiEndpoints'

export const getServerSideProps = securedAdminProps(
  ['common', 'auth', 'withdrawals', 'validation'],
  () => endpoints.withdrawals.withdrawalsList.url,
)

export default WithdrawalsPage
