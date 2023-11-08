import { securedAdminProps } from 'middleware/auth/securedProps'
import { endpoints } from 'service/apiEndpoints'
import AffiliatesPage from 'components/admin/affiliates/AffiliatesPage'

export const getServerSideProps = securedAdminProps(
  ['common', 'auth', 'admin', 'validation', 'profile'],
  () => endpoints.affiliate.getAffiliates.url,
)

export default AffiliatesPage
