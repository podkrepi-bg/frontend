import { GetStaticProps } from 'next'
import IndexPage from 'components/IndexPage'
import { getTranslations } from 'common/useNextLocale'

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    i18nResources: await getTranslations(locale, ['common']),
  },
})

export default IndexPage
