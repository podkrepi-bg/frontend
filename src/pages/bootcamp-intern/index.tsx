import GenericForm from 'components/common/form/GenericForm'
import { Grid } from '@mui/material'
import FormTextField from 'components/common/form/FormTextField'
import SubmitButton from 'components/common/form/SubmitButton'
import Layout from 'components/layout/Layout'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { dehydrate, QueryClient } from 'react-query'
import { queryFn } from 'common/rest'
import { GetStaticProps } from 'next'
import { axios } from 'common/api-client'

type bootcampInternType = {
  id: string
  firstName: string
  lastName: string
  email?: string
}

export default function BootcampInternPage(props: { bootcampInterns: bootcampInternType[] }) {
  const initialValues = { firstName: '', lastName: '', email: '' }

  console.log(props.bootcampInterns)
  const onSubmit = (data: { firstName: string; lastName: string; email: string }) => {
    console.log(data)
  }

  return (
    <Layout>
      <GenericForm onSubmit={onSubmit} initialValues={initialValues}>
        <Grid style={{ marginTop: '100px' }} container spacing={3}>
          <Grid item xs={12}>
            <FormTextField type="text" label="Your first name ..." name="firstName" />
          </Grid>
          <Grid item xs={12}>
            <FormTextField type="text" label="Your last name ..." name="lastName" />
          </Grid>
          <Grid item xs={12}>
            <SubmitButton fullWidth label="Apply" />
          </Grid>
        </Grid>
      </GenericForm>
      <table style={{ border: 'solid black 1px', margin: '40px auto' }}>
        <tbody>
          {props.bootcampInterns.map((bootcampIntern) => {
            return (
              <tr key={bootcampIntern.id}>
                <td style={{ border: 'solid 4px green' }}>{bootcampIntern.id}</td>
                <td style={{ border: 'solid 4px blue' }}>{bootcampIntern.firstName}</td>
                <td style={{ border: 'solid 4px red' }}>{bootcampIntern.lastName}</td>
                <td style={{ border: 'solid 4px red' }}>{bootcampIntern.email}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const { data } = await axios.get<bootcampInternType[]>(
    'http://localhost:5010/api/bootcamp-intern',
  )

  const client = new QueryClient()
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'bg', ['common'])),
      bootcampInterns: data,
    },
  }
}
