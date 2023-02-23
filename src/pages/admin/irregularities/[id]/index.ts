import { endpoints } from 'service/apiEndpoints'
import { securedAdminProps } from 'middleware/auth/securedProps'
import EditPage from 'components/admin/irregularity/admin/EditPage'

export const getServerSideProps = securedAdminProps(
  ['common', 'auth', 'validation', 'irregularity', 'admin'],
  (ctx) => endpoints.irregularity.editIrregularity(ctx.query.id as string).url,
)

export default EditPage
