import CityCreatePage from 'components/cities/CityCreatePage'
import { securedPropsWithTranslation } from 'middleware/auth/securedProps'

export const getServerSideProps = securedPropsWithTranslation([
  'common',
  'auth',
  'validation',
  'cities',
  'countries',
  'campaigns',
])

export default CityCreatePage
