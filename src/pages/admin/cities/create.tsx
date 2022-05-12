import CityCreatePage from 'components/cities/CityCreatePage'
import { securedPropsWithTranslation } from 'middleware/auth/securedProps'

export const getServerSideProps = securedPropsWithTranslation([
  'common',
  'auth',
  'validation',
  'cities',
  'campaigns',
])

export default CityCreatePage
