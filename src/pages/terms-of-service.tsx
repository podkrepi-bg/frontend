import { GetServerSideProps } from 'next'
import TermsOfServicePage from 'components/terms-of-service/TermsOfServicePage'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'bg', ['common'])),
  },
})

export default TermsOfServicePage
