import { securedAdminProps } from 'middleware/auth/securedProps'
import EditPage from 'components/admin/withdrawals/EditPage'
import { endpoints } from 'service/apiEndpoints'

export const getServerSideProps = securedAdminProps(
  ['common', 'auth', 'withdrawals', 'validation'],
  (ctx) => endpoints.withdrawals.editWithdrawal(ctx.query.id as string).url,
)

export default EditPage
