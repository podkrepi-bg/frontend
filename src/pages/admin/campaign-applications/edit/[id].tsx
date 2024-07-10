import EditPage from 'components/admin/campaign-applications/EditPage'

import { securedPropsWithTranslation } from 'middleware/auth/securedProps'
import { GetServerSideProps } from 'next'

export const getServerSideProps: GetServerSideProps = securedPropsWithTranslation(
  ['common', 'auth', 'validation', 'campaigns', 'campaign-application'],
  '',
)

export default EditPage
