import AdminPage from 'components/admin/AdminPage'
import { securedProps } from 'middleware/auth/keycloak'

export const getServerSideProps = securedProps

export default AdminPage
