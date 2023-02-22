import { securedAdminProps } from 'middleware/auth/securedProps'
import WithdrawalsPage from 'components/admin/withdrawals/WithdrawalPage'
import { endpoints } from 'service/apiEndpoints'

export const getServerSideProps = securedAdminProps(
  ['common', 'auth', 'withdrawals', 'validation'],
  () => endpoints.withdrawals.withdrawalsList.url,
)

export default WithdrawalsPage
