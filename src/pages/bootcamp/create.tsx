import BootcampAddPage from 'components/bootcamp/BootcampAddPage'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'bg', [
      'common',
      'auth',
      'validation',
      'bootcamp',
      'admin',
      'documents',
    ])),
  },
})

export default function CreatePageComponet() {
  return <BootcampAddPage />
}
