import { securedAdminProps } from 'middleware/auth/keycloak'
import BenefactorPage from 'components/benefactor/BenefactorPage'
import { endpoints } from 'service/apiEndpoints'

export const getServerSideProps = securedAdminProps(
  ['common', 'auth', 'benefactor', 'admin', 'validation'],
  () => endpoints.benefactor.benefactorList.url,
)

export default BenefactorPage
