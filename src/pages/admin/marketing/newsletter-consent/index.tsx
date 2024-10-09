import SendEmailConsentPage from 'components/admin/marketing/EmailConsent/SendEmailConsentPage'
import { securedAdminProps } from 'middleware/auth/securedProps'

export const getServerSideProps = securedAdminProps(['common', 'auth', 'validation', 'marketing'])

export default SendEmailConsentPage
