import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import NotFoundPage from 'components/common/errors/NotFoundPage/NotFoundPage'

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'bg', ['common', 'errors', 'validation', 'auth'])),
  },
})

export default NotFoundPage
