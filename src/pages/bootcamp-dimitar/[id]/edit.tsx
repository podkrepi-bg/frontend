import React from 'react'
import { Container } from '@mui/material'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Layout from 'components/layout/Layout'
import EditForm from 'components/bootcamp-dimitar/editForm'
import { getBootcampDimitar } from '../../../common/rest'

function EditBootcampDimitar({ data }: { data: any }) {
  // const router = useRouter()
  // // const { data } = useBootcampDimitar(slug as string)

  return (
    <Layout title="Edit">
      <Container maxWidth="sm">
        <EditForm data={data} />
      </Container>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'bg', [
      'common',
      'auth',
      'validation',
      'campaigns',
    ])),
    data: await getBootcampDimitar('fce452f2-d84e-49b9-9bc4-6889ff186eda'),
  },
})

export default EditBootcampDimitar
