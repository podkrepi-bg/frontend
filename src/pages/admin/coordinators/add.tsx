import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import CoordinatorAddPage from 'components/coordinators/CoordinatorAddPage'

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'bg', [
      'common',
      'auth',
      'validation',
      'bankaccounts',
      'campaigns',
    ])),
  },
})

export default CoordinatorAddPage
