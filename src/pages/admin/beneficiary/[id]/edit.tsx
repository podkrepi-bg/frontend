import EditPage from 'components/beneficiary/EditPage'
import { securedAdminProps } from 'middleware/auth/securedProps'
import { endpoints } from 'service/apiEndpoints'

export const getServerSideProps = securedAdminProps(
  ['common', 'auth', 'beneficiary', 'validation', 'documents'],
  (ctx) => endpoints.beneficiary.editBeneficiary(ctx.query.id as string).url,
)
export default EditPage
