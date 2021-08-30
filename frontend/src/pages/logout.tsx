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
  const { session } = useSession()

  useEffect(() => {
    console.log({ callbackUrl })
    // TODO: Logout the user
  }, [session])

  return null
}

export default Logout
