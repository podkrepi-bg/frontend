import { securedAdminProps } from 'middleware/auth/securedProps'
import EditPage from 'components/admin/transfers/EditPage'
import { endpoints } from 'service/apiEndpoints'

export const getServerSideProps = securedAdminProps(
  ['common', 'auth', 'validation', 'transfer', 'admin'],
  (ctx) => endpoints.transfer.viewTransfer(ctx.query.id as string).url,
)

export default EditPage
