import BeneficiaryPage from 'components/admin/beneficiary/BeneficiaryPage'
import { securedAdminProps } from 'middleware/auth/securedProps'
import { endpoints } from 'service/apiEndpoints'

export const getServerSideProps = securedAdminProps(
  ['common', 'auth', 'beneficiary', 'validation', 'admin'],
  () => endpoints.documents.documentsList.url,
)
export default BeneficiaryPage
