import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import IndexPage from 'components/index/IndexPage'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = getSession(ctx)
  return {
    props: {
      ...(await serverSideTranslations(ctx.locale ?? 'bg', ['common', 'index'])),
      session,
    },
  }
}

export default IndexPage
