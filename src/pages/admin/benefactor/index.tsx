import { securedPropsWithTranslation } from 'middleware/auth/keycloak'
import BenefactorPage from 'components/benefactor/BenefactorPage'

export const getServerSideProps = securedPropsWithTranslation([
  'common',
  'auth',
  'benefactor',
  'admin',
  'validation',
])

export default BenefactorPage
