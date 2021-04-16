import { GetServerSideProps } from 'next'
import PrivacyPolicyPage from 'components/privacy-policy/PrivacyPolicyPage'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'bg', ['common', 'privacy-policy'])),
  },
})

export default PrivacyPolicyPage
