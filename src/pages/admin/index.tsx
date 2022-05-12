import AdminPage from 'components/admin/AdminPage'
import { securedPropsWithTranslation } from 'middleware/auth/securedProps'

export const getServerSideProps = securedPropsWithTranslation()

export default AdminPage
