import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import SupportersPage from 'components/admin/SupportersPage'
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    props: {
      ...(await serverSideTranslations(ctx.locale ?? 'bg', ['common', 'auth', 'validation'])),
    },
  }
}
export default SupportersPage
