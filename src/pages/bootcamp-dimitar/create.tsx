import React from 'react'
import { Container } from '@mui/material'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import CustomLayout from '../../components/bootcamp-dimitar/CustomLayout'
import CreateForm from 'components/bootcamp-dimitar/createForm'

function CreateBootcampDimitar() {
  return (
    <CustomLayout>
      <Container maxWidth="sm">
        <h1>Create bootcamper</h1>
        <CreateForm />
      </Container>
    </CustomLayout>
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
