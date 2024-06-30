import EditPage from 'components/admin/campaign-applications/EditPage'

import { securedPropsWithTranslation } from 'middleware/auth/securedProps'

export const getServerSideProps = securedPropsWithTranslation()

export default EditPage
