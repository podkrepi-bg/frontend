import ProfilePage from 'components/auth/profile/ProfilePage'
import { securedPropsWithTranslation } from 'middleware/auth/keycloak'

export const getServerSideProps = securedPropsWithTranslation(['auth', 'common'])

export default ProfilePage
