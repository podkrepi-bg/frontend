import EditPage from 'components/campaign-types/EditPage'
import { securedAdminProps } from 'middleware/auth/keycloak'
import { endpoints } from 'service/apiEndpoints'

export const getServerSideProps = securedAdminProps(
  ['common', 'auth', 'campaign-types', 'validation', 'documents'],
  (ctx) => endpoints.campaignTypes.viewCampaignType(ctx.query.id as string).url,
)

export default EditPage
