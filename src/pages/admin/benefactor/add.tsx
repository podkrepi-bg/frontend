import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import BenefactorAddPage from 'components/benefactor/BenefactorAddPage'

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'bg', [
        'common',
        'auth',
        'benefactor',
        'validation',
      ])),
    },
  }
}

export default BenefactorAddPage
