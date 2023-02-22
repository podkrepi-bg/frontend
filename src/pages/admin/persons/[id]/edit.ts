import EditPage from 'components/admin/person/grid/EditPage'
import { securedAdminProps } from 'middleware/auth/securedProps'
import { endpoints } from 'service/apiEndpoints'

export const getServerSideProps = securedAdminProps(
  ['common', 'auth', 'validation', 'person', 'admin'],
  (ctx) => endpoints.person.editPerson(ctx.query.id as string).url,
)

export default EditPage
