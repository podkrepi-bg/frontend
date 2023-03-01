import DocumentsPage from 'components/admin/documents/DocumentsPage'
import { securedAdminProps } from 'middleware/auth/securedProps'
import { endpoints } from 'service/apiEndpoints'

export const getServerSideProps = securedAdminProps(
  ['common', 'auth', 'admin', 'documents', 'validation'],
  () => endpoints.documents.documentsList.url,
)

export default DocumentsPage
