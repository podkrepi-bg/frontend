import Tasks from 'components/admin/tasks/Tasks'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import axios, { AxiosResponse } from 'axios'
import { dehydrate, QueryClient } from 'react-query'
export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  const response = await fetch('http://localhost:5010/api/car')
  const data = await response.json()

  return {
    props: {
      cars: { data },
      ...(await serverSideTranslations(locale ?? 'bg', [
        'common',
        'auth',
        'validation',
        'campaigns',
      ])),
    },
  }
}
export default Tasks
