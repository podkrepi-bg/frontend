import { securedAdminProps } from 'middleware/auth/keycloak'
import EditPage from 'components/vaults/EditPage'
import { endpoints } from 'service/apiEndpoints'

export const getServerSideProps = securedAdminProps(
  ['common', 'auth', 'vaults', 'validation'],
  (ctx) => endpoints.vaults.editVault(ctx.query.id as string).url,
)

export default EditPage
