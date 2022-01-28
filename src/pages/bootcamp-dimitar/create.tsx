import React from 'react'
import { Container } from '@mui/material'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Layout from 'components/layout/Layout'
import CreateForm from 'components/bootcamp-dimitar/createForm'

function CreateBootcampDimitar() {
  return (
    <Layout title="Create">
      <Container maxWidth="sm">
        <CreateForm />
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
  },
})

export default CreateBootcampDimitar
