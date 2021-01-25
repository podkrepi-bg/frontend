import { GetStaticProps } from 'next'
import IndexPage from 'components/IndexPage'
import { serverSideTranslations } from 'common/useNextLocale'

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    i18nResources: await serverSideTranslations(locale, ['common']),
  },
})

export default IndexPage
