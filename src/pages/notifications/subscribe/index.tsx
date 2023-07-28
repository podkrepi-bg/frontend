import SubscriptionPage from 'components/client/notifications/SubscriptionPage'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export const getServerSideProps: GetServerSideProps = async ({ locale, query, res }) => {
  const { hash, email, consent, campaign } = query

  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'bg', ['common', 'campaigns', `notifications`])),
      hash: hash || null,
      email: email || null,
      consent: consent || null,
      campaign: campaign || null,
    },
  }
}

export default SubscriptionPage
