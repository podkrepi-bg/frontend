import { useEffect } from 'react'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { routes, baseUrl } from 'common/routes'
import { signOut } from 'next-auth/react'

const callbackUrl = `${baseUrl}${routes.index}`

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'bg', ['common', 'auth', 'validation'])),
  },
})

const Logout = () => {
  useEffect(() => {
    signOut({ callbackUrl })
  }, [])

  return null
}

export default Logout
