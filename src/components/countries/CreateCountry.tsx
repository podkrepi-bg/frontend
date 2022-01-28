import { useRouter } from 'next/router'
import { Container, Grid, Typography } from '@mui/material'
import { axios } from 'common/api-client'
import { FormikHelpers } from 'formik'

import FormTextField from 'components/common/form/FormTextField'
import GenericForm from 'components/common/form/GenericForm'
import SubmitButton from 'components/common/form/SubmitButton'
import Layout from 'components/layout/Layout'

import { CountryType } from 'pages/countries'

const defaults: CountryType = {
  id: '',
  name: '',
  countryCode: '',
}

export default function CreateCountry(props: { initialValues?: CountryType }): JSX.Element {
  const router = useRouter()

  const onSubmit = async (values: CountryType, { resetForm }: FormikHelpers<CountryType>) => {
    try {
      if (props.initialValues) {
        await axios.put(
          `http://localhost:5010/api/countries/${props.initialValues.id}/edit`,
          values,
        )
      } else {
        await axios.post('http://localhost:5010/api/countries/create', values)
      }
      resetForm()
      router.push('/countries')
    } catch (error) {
      console.log(error)
      //show notification
    }
  }

  return (
    <Layout>
      <Container>
        <Grid container direction="column">
          <Grid item sx={{ mb: 1 }}>
            <Typography variant="h5">{props.initialValues ? 'Edit' : 'Create'} country</Typography>
          </Grid>
          <GenericForm initialValues={props.initialValues || defaults} onSubmit={onSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <FormTextField type="text" label="name" name="name" autoComplete="title" />
              </Grid>
              <Grid item xs={12}>
                <FormTextField
                  type="text"
                  label="countryCode"
                  name="countryCode"
                  autoComplete="title"
                />
              </Grid>
              <Grid item xs={2}>
                <SubmitButton fullWidth label={props.initialValues ? 'Edit' : 'Create'} />
              </Grid>
            </Grid>
          </GenericForm>
        </Grid>
      </Container>
    </Layout>
  )
}
