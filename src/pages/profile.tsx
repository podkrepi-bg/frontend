import { securedProps } from 'common/util/keycloak'
import ProfilePage from 'components/auth/profile/ProfilePage'

export const getServerSideProps = securedProps

export default ProfilePage
