import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { FaqCategory } from 'components/client/faq/contents/faq-categories.enum'
import FaqPage from '../../components/client/faq/FaqPage'

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'bg', ['common', 'faq'])),
    section: FaqCategory.Common,
  },
})

export default FaqPage
