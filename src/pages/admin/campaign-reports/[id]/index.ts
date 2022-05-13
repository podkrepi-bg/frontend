import { endpoints } from 'service/apiEndpoints'
import { securedAdminProps } from 'middleware/auth/securedProps'
import EditPage from 'components/irregularity-report/admin/EditPage'

export const getServerSideProps = securedAdminProps(
  ['common', 'auth', 'validation', 'irregularity-report', 'admin'],
  (ctx) => endpoints.campaignReport.editCampaignReport(ctx.query.id as string).url,
)

export default EditPage
