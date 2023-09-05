import UNsubscriptionPage from 'components/client/notifications/UNsubscriptionsPage'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export const getServerSideProps: GetServerSideProps = async ({ locale, query }) => {
  const { email, campaign } = query

  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'bg', ['common', 'campaigns', `notifications`])),
      email: email || null,
      campaign: campaign || null,
    },
  }
}

export default UNsubscriptionPage
