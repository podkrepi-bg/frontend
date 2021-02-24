import { GetServerSideProps } from 'next'

import SupportFormPage from 'components/support-form/SupportPage'
import { serverSideTranslations } from 'common/useNextLocale'

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    i18nResources: await serverSideTranslations(locale, ['common', 'about', 'validation']),
  },
})

export default SupportFormPage
