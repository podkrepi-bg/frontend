import AdminPage from 'components/admin/AdminPage'
import { securedPropsWithTranslation } from 'middleware/auth/keycloak'

export const getServerSideProps = securedPropsWithTranslation()

export default AdminPage
