import EditPage from 'components/admin/documents/EditPage'
import { securedAdminProps } from 'middleware/auth/securedProps'
import { endpoints } from 'service/apiEndpoints'

export const getServerSideProps = securedAdminProps(
  ['common', 'auth', 'documents', 'validation'],
  (ctx) => endpoints.documents.getDocument(ctx.query.id as string).url,
)
export default EditPage
