import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { Session } from 'common/util/useSession'
import IndexPage from 'components/index/IndexPage'

export const getServerSideProps: GetServerSideProps<{
  session: Session | null
}> = async (ctx) => {
  const session = null // TODO: Add proper checking for session
  return {
    props: {
      ...(await serverSideTranslations(ctx.locale ?? 'bg', ['common', 'index', 'campaigns'])),
      session,
    },
  }
}

export default IndexPage
