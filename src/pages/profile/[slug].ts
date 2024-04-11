import { securedAdminProps } from 'middleware/auth/securedProps'
import ProfilePage from 'components/client/auth/profile/ProfilePage'
import { endpoints } from 'service/apiEndpoints'

export const getServerSideProps = securedAdminProps(
  ['auth', 'profile', 'common', 'validation', 'campaigns', 'recurring-donation', 'donations'],
  () => endpoints.account.me.url,
)

export default ProfilePage
