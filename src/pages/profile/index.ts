import { GetServerSideProps } from 'next'
import ProfilePage from 'components/auth/profile/ProfilePage'

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: '/profile/donations',
      permanent: false,
    },
  }
}

export default ProfilePage
