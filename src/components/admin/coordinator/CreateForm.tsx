import { Grid } from '@mui/material'
import { AxiosError, AxiosResponse } from 'axios'
import { ApiErrors } from 'common/api-errors'
import { createCordinator } from 'common/rest'
import FormTextField from 'components/common/form/FormTextField'
import GenericForm from 'components/common/form/GenericForm'
import SubmitButton from 'components/common/form/SubmitButton'
import { CoordinatorResponse } from 'gql/coordinator'
import { useRouter } from 'next/router'
import { useMutation } from 'react-query'
import { AlertStore } from 'stores/AlertStore'
import Layout from '../Layout'

const initialValues = {
  personId: '',
}

function CreateForm() {
  const router = useRouter()

  const mutation = useMutation<AxiosResponse<CoordinatorResponse>, AxiosError<ApiErrors>, any>({
    mutationFn: createCordinator,
    onError: () => AlertStore.show('error', 'error'),
    onSuccess: () => AlertStore.show('success', 'success'),
  })

  const onSubmit = async (values: any) => {
    mutation.mutateAsync(values).then((data) => {
      router.push('/admin/coordinator')
    })
  }

  return (
    <Layout>
      <h1>Create coordinator</h1>
      <GenericForm onSubmit={onSubmit} initialValues={initialValues}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormTextField type="text" label="Person ID" name="personId" autoComplete="personId" />
          </Grid>
          <Grid item xs={12}>
            <SubmitButton fullWidth label="Submit" />
          </Grid>
        </Grid>
      </GenericForm>
    </Layout>
  )
}

export default CreateForm
