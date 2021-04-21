import { useEffect } from 'react'
import { GetServerSideProps } from 'next'
import { useSession, signOut } from 'next-auth/client'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { routes, baseUrl } from 'common/routes'

const callbackUrl = `${baseUrl}${routes.index}`

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'bg', ['common', 'auth', 'validation'])),
  },
})

const Logout = () => {
  const [session] = useSession()

  useEffect(() => {
    signOut({ callbackUrl })
  }, [session])

  return null
}

export default Logout
