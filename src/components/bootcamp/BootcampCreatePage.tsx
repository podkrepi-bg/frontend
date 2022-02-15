import { useMutation } from 'react-query'
import { useRouter } from 'next/router'
import { AxiosError, AxiosResponse } from 'axios'
import { FormikHelpers } from 'formik'
import { Grid } from '@mui/material'

import { AlertStore } from 'stores/AlertStore'
import { ApiErrors, isAxiosError, matchValidator } from 'common/api-errors'
import { useTranslation } from 'next-i18next'
import { routes } from 'common/routes'

import GenericForm from 'components/common/form/GenericForm'
import FormTextField from 'components/common/form/FormTextField'
import SubmitButton from 'components/common/form/SubmitButton'
import { createBootcamp } from 'common/bootcampRest'
import { BootcampFormData, BootcampInput, BootcampResponse } from 'gql/bootcamp'
import Layout from './Layout'

export default function BootcampPage() {
  const router = useRouter()
  const { t } = useTranslation()

  const mutation = useMutation<
    AxiosResponse<BootcampResponse>,
    AxiosError<ApiErrors>,
    BootcampInput
  >({
    mutationFn: createBootcamp,
    onError: () => AlertStore.show(t('common:alerts.error'), 'error'),
    onSuccess: () => AlertStore.show(t('common:alerts.message-sent'), 'success'),
  })

  const onSubmit = async (
    values: BootcampFormData,
    { setFieldError, resetForm }: FormikHelpers<BootcampFormData>,
  ) => {
    try {
      await mutation.mutateAsync(values)
      resetForm()
      router.push(routes.bootcamp.index)
    } catch (error) {
      if (isAxiosError(error)) {
        const { response } = error as AxiosError<ApiErrors>
        response?.data.message.map(({ property, constraints }) => {
          setFieldError(property, t(matchValidator(constraints)))
        })
      }
    }
  }

  return (
    <Layout>
      <GenericForm onSubmit={onSubmit} initialValues={{ firstName: ' ', lastName: ' ' }}>
        <Grid container spacing={3} sx={{ m: 10 }}>
          <Grid item xs={10}>
            <FormTextField type="text" label="First Name" name="firstName" />
          </Grid>
          <Grid item xs={10}>
            <FormTextField type="text" label="Last Name" name="lastName" />
          </Grid>
          <Grid item xs={4}>
            <SubmitButton fullWidth label="Add" />
          </Grid>
        </Grid>
      </GenericForm>
    </Layout>
  )
}
