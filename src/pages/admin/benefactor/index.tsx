import { securedAdminProps } from 'middleware/auth/securedProps'
import BenefactorPage from 'components/admin/benefactor/BenefactorPage'
import { endpoints } from 'service/apiEndpoints'

export const getServerSideProps = securedAdminProps(
  ['common', 'auth', 'benefactor', 'admin', 'validation'],
  () => endpoints.benefactor.benefactorList.url,
)

export default BenefactorPage
