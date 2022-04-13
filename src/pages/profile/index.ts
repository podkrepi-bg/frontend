import { GetServerSideProps } from 'next'
import ProfilePage from 'components/auth/profile/ProfilePage'
import { routes } from 'common/routes'
import { securedProps } from 'middleware/auth/keycloak'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    ...(await securedProps(ctx)),
    redirect: {
      destination: routes.profile.donations,
      permanent: true,
    },
  }
}

export default ProfilePage
