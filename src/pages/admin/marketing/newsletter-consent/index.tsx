import MarketingPage from 'components/admin/marketing/MarketingPage'
import { securedAdminProps } from 'middleware/auth/securedProps'

export const getServerSideProps = securedAdminProps(['common', 'auth', 'validation', 'marketing'])

export default MarketingPage
