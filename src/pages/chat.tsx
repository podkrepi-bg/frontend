import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import WidgetBot from '@widgetbot/react-embed'

import Layout from 'components/layout/Layout'

export type LoginPageProps = {
  providers: string[]
  csrfToken: string
}

export const getServerSideProps: GetServerSideProps<LoginPageProps> = async (ctx) => {
  return {
    props: {
      ...(await serverSideTranslations(ctx.locale ?? 'bg', ['common', 'auth', 'validation'])),
      csrfToken: '',
      providers: [],
    },
  }
}

export default function Chat() {
  return (
    <Layout hideFooter maxWidth={false} boxProps={{ pb: 0 }}>
      {/* @ts-expect-error pass css string instead of number */}
      <WidgetBot
        server="778984868146577458"
        channel="778984868146577461"
        height="calc(100vh - 10rem)"
        width="calc(100vw - 4rem)"
      />
    </Layout>
  )
}
