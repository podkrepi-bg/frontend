import EditPage from 'components/admin/campaigns/grid/EditPage'
import { securedAdminProps } from 'middleware/auth/securedProps'
import { endpoints } from 'service/apiEndpoints'

export const getServerSideProps = securedAdminProps(
  ['common', 'auth', 'campaigns', 'validation'],
  (ctx) => endpoints.campaign.editCampaign(ctx.query.id as string).url,
)

export default EditPage
