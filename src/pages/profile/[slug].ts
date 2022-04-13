import { GetServerSideProps } from 'next'
import { securedProps } from 'middleware/auth/keycloak'
import ProfilePage from 'components/auth/profile/ProfilePage'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    props: {
      ...(await serverSideTranslations(ctx.locale ?? 'bg', ['common', 'index'])),
      ...(await securedProps(ctx)),
    },
  }
}

export default ProfilePage
