import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import BootcampAddInternPage from 'components/bootcamp/BootcampAddInternPage'

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'bg', [
        'common',
        'auth',
        'bootcamp',
        'validation',
      ])),
    },
  }
}

export default BootcampAddInternPage
