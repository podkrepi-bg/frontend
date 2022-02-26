import { useEffect } from 'react'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { routes, baseUrl } from 'common/routes'
import { useSession } from 'common/util/useSession'

const callbackUrl = `${baseUrl}${routes.index}`

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'bg', ['common', 'auth', 'validation'])),
  },
})

const Logout = () => {
  const { keycloak } = useSession()

  useEffect(() => {
    keycloak?.logout({ redirectUri: callbackUrl })
  }, [])

  return null
}

export default Logout
