import DocumentsPage from 'components/beneficiary/BeneficiaryPage'
import { securedAdminProps } from 'middleware/auth/securedProps'
import { endpoints } from 'service/apiEndpoints'

export const getServerSideProps = securedAdminProps(
  ['common', 'auth', 'beneficiary', 'validation', 'admin', 'documents'],
  () => endpoints.documents.documentsList.url,
)
export default DocumentsPage
