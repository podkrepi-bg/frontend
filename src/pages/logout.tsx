import { useEffect } from 'react'
import { GetServerSideProps } from 'next'
import { useSession, signOut } from 'next-auth/client'

import { serverSideTranslations } from 'common/useNextLocale'
import { routes, baseUrl } from 'common/routes'

const callbackUrl = `${baseUrl}${routes.index}`

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    i18nResources: await serverSideTranslations(locale, ['common', 'auth', 'validation']),
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
