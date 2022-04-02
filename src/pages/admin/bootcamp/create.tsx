import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import BootcampCreatePage from 'components/bootcamp/BootcampCreatePage'

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'bg', ['common', 'auth', 'validation', 'bootcamp'])),
  },
})

export default BootcampCreatePage
