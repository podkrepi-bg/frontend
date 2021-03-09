import { GetServerSideProps } from 'next'
import AboutProjectPage from 'components/about-project/AboutProjectPage'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'bg', ['common', 'about-project'])),
  },
})

export default AboutProjectPage
