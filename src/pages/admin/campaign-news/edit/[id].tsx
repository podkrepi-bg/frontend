import EditPage from 'components/admin/campaign-news/EditPage'
import { securedAdminProps } from 'middleware/auth/securedProps'
import { endpoints } from 'service/apiEndpoints'

export const getServerSideProps = securedAdminProps(
  ['common', 'auth', 'campaigns', 'news', 'validation'],
  (ctx) => endpoints.campaignNews.editNewsArticle(ctx.query.id as string).url,
)

export default EditPage
