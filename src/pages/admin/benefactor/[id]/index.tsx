import { securedAdminProps } from 'middleware/auth/securedProps'
import BenefactorEditPage from 'components/admin/benefactor/BenefactorEditPage'
import { endpoints } from 'service/apiEndpoints'

export const getServerSideProps = securedAdminProps(
  ['common', 'auth', 'benefactor', 'validation'],
  (ctx) => endpoints.benefactor.editBenefactor(ctx.query.id as string).url,
)

export default BenefactorEditPage
