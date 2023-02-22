import EditPage from 'components/common/campaign-types/EditPage'
import { securedAdminProps } from 'middleware/auth/securedProps'
import { endpoints } from 'service/apiEndpoints'

export const getServerSideProps = securedAdminProps(
  ['common', 'auth', 'campaigns', 'campaign-types', 'validation', 'documents'],
  (ctx) => endpoints.campaignTypes.viewCampaignType(ctx.query.id as string).url,
)

export default EditPage
