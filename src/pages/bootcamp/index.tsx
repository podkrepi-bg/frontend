import BootcampComponent from 'components/bootcamp/BootcampPageComponent'
import { securedProps } from 'middleware/auth/keycloak'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'bg', [
      'common',
      'auth',
      'validation',
      'bootcamp',
      'admin',
      'documents',
    ])),
  },
})

const BootcampPage = () => {
  return <BootcampComponent />
}

export default BootcampPage
