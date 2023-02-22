import { GetStaticProps } from 'next'
import FinanceReportPage from 'components/client/about-project/FinanceReportPage'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'bg', ['common', 'about-project'])),
  },
})

export default FinanceReportPage
