import FaqPage from '../../components/faq/FaqPage'
import { GetStaticPaths, GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export const getStaticProps: GetStaticProps = async ({ locale, params }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'bg', ['common'])),
    section: `${params?.section ?? 'common-questions'}`,
  },
})

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [
    { params: { section: 'common-questions' } },
    { params: { section: 'campaigns' } },
    { params: { section: 'donations' } },
    { params: { section: 'recurring-donations' } },
    { params: { section: 'potential-fraud' } },
    { params: { section: 'attracting-donators' } },
    { params: { section: 'corporate-partnership' } },
  ],
  fallback: true,
})

export default FaqPage
