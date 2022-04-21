import DocumentsPage from 'components/documents/DocumentsPage'
import { securedAdminProps } from 'middleware/auth/keycloak'
import { endpoints } from 'service/apiEndpoints'

export const getServerSideProps = securedAdminProps(
  ['common', 'auth', 'admin', 'documents', 'validation'],
  () => endpoints.documents.documentsList.url,
)

export default DocumentsPage
