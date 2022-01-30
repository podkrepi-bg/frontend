import React from 'react'
import { Container } from '@mui/material'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import CustomLayout from './layout'
import CreateForm from 'components/bootcamp-dimitar/createForm'

function CreateBootcampDimitar() {
  return (
    <CustomLayout title="Create">
      <Container maxWidth="sm">
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
