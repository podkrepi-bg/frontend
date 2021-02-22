import { GetStaticProps } from 'next'
import SupportFormPage from 'components/support-form/SupportForm'
import { serverSideTranslations } from 'common/useNextLocale'

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    i18nResources: await serverSideTranslations(locale, ['common', 'about', 'validation']),
  },
})

export default SupportFormPage
