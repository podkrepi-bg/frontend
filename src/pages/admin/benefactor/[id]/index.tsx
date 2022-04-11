import { securedPropsWithTranslation } from 'middleware/auth/keycloak'
import BenefactorEditPage from 'components/benefactor/BenefactorEditPage'

export const getServerSideProps = securedPropsWithTranslation([
  'common',
  'auth',
  'benefactor',
  'validation',
])

export default BenefactorEditPage
