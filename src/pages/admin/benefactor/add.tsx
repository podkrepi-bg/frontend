import BenefactorAddPage from 'components/benefactor/BenefactorAddPage'
import { securedPropsWithTranslation } from 'middleware/auth/securedProps'

export const getServerSideProps = securedPropsWithTranslation([
  'common',
  'auth',
  'benefactor',
  'validation',
])
export default BenefactorAddPage
