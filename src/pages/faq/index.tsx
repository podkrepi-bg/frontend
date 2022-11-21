import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { FaqCategory } from 'components/faq/contents/faq-categories.enum'
import FaqPage from '../../components/faq/FaqPage'

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'bg', ['common', 'faq'])),
    section: FaqCategory.Common,
  },
})

export default FaqPage
