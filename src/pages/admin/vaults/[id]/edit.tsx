import { securedAdminProps } from 'middleware/auth/securedProps'
import EditPage from 'components/admin/vaults/EditPage'
import { endpoints } from 'service/apiEndpoints'

export const getServerSideProps = securedAdminProps(
  ['common', 'auth', 'vaults', 'validation'],
  (ctx) => endpoints.vaults.editVault(ctx.query.id as string).url,
)

export default EditPage
