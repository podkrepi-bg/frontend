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

type CountryType = {
  id: number
  name: string
  countryCode: string
  cities?: string[]
}

export default function CountriesPage(props: { countries: CountryType[] }) {
  const initialValues = { id: '', name: '', countryCode: '', cities: [] }

  const onSubmit = (data: { id: string; name: string; countryCode: string }) => {
    console.log(data)
  }

  return (
    <Layout>
      <GenericForm onSubmit={onSubmit} initialValues={initialValues}>
        <Grid style={{ marginTop: '100px' }} container spacing={3}>
          <Grid item xs={12}>
            <FormTextField type="text" label="Country name ..." name="countryName" />
          </Grid>
          <Grid item xs={12}>
            <FormTextField type="text" label="Country code ..." name="countryCode" />
          </Grid>
          <Grid item xs={12}>
            <SubmitButton fullWidth label="Create Country" />
          </Grid>
        </Grid>
      </GenericForm>
      <table style={{ border: 'solid black 1px', margin: '40px auto' }}>
        <tbody>
          {props.countries.map((country) => {
            return (
              <tr key={country.id}>
                <td style={{ border: 'solid 4px green' }}>{country.id}</td>
                <td style={{ border: 'solid 4px blue' }}>{country.countryCode}</td>
                <td style={{ border: 'solid 4px red' }}>{country.name}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const { data } = await axios.get<CountryType[]>('http://localhost:5010/api/countries')

  const client = new QueryClient()
  return {
    props: {
      // countries: response,
      ...(await serverSideTranslations(locale ?? 'bg', ['common'])),
      countries: data,
    },
  }
}
