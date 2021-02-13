import { useEffect } from 'react'
import { GetStaticProps } from 'next'
import { useSession, signOut } from 'next-auth/client'

import { serverSideTranslations } from 'common/useNextLocale'
import { routes, baseUrl } from 'common/routes'

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    i18nResources: await serverSideTranslations(locale, ['common', 'auth', 'validation']),
  },
})

const Logout = () => {
  const [session] = useSession()

  useEffect(() => {
    const url = `${baseUrl}${routes.index}`
    console.log(url)
    if (session) {
      signOut({ callbackUrl: url })
    } else {
      window.location.replace(url)
    }
  }, [])

  return null
}

export default Logout
