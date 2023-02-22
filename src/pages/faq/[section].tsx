import FaqPage from '../../components/client/faq/FaqPage'
import { GetStaticPaths, GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { FaqCategory } from 'components/client/faq/contents/faq-categories.enum'

export const getStaticProps: GetStaticProps = async ({ locale, params }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'bg', ['common', 'faq'])),
    section: `${params?.section ?? FaqCategory.Common}`,
  },
})

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [
    { params: { section: FaqCategory.Common } },
    { params: { section: FaqCategory.Campaigns } },
    { params: { section: FaqCategory.Donations } },
    { params: { section: FaqCategory.RecurringDonations } }, // Note: It seems that it's no longer used, maybe remove it?
    { params: { section: FaqCategory.PotentialFraud } }, // Note: It seems that it's no longer used, maybe remove it?
    { params: { section: FaqCategory.AttractDonators } },
    { params: { section: FaqCategory.CorporatePartnership } },
  ],
  fallback: true,
})

export default FaqPage
