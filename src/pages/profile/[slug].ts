import { GetServerSideProps } from 'next'
import { securedProps } from 'middleware/auth/keycloak'
import ProfilePage from 'components/auth/profile/ProfilePage'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { slug } = ctx.query
  return {
    props: {
      slug,
      ...securedProps(ctx),
    },
  }
}

export default ProfilePage
