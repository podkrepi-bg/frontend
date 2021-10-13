import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import AdminPage from 'components/admin/AdminPage'

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: await serverSideTranslations(locale ?? 'bg', ['common', 'auth', 'validation']),
  }
}

export default AdminPage
