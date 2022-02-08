import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import EditForm from 'components/admin/coordinator/EditForm'
import { getCordinator } from 'common/rest'

export const getServerSideProps: GetServerSideProps = async ({ locale, params }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'bg', ['common', 'validation'])),
      data: await getCordinator(params?.id as string),
    },
  }
}

export default EditForm
