import { useMutation } from 'react-query'
import { useRouter } from 'next/router'
import { FormikHelpers } from 'formik'
import { Button, Grid } from '@mui/material'

import { AxiosError, AxiosResponse } from 'axios'
import { ApiErrors, isAxiosError, matchValidator } from 'common/api-errors'
import { useTranslation } from 'next-i18next'
import { AlertStore } from 'stores/AlertStore'

import GenericForm from 'components/common/form/GenericForm'
import FormTextField from 'components/common/form/FormTextField'
import SubmitButton from 'components/common/form/SubmitButton'
import { useBootcampSingle } from 'common/hooks/bootcamp'
import { BootcampEdit, BootcampFormData, BootcampResponse } from 'gql/bootcamp'
import { updateBootcampREST } from 'common/bootcampRest'
import { routes } from 'common/routes'
import Layout from './Layout'

type Props = { id: string }

export default function BootcampEditPage({ id }: Props) {
  const router = useRouter()
  const { t } = useTranslation()

  const { data } = useBootcampSingle(id)

  const updateMutation = useMutation<
    AxiosResponse<BootcampResponse>,
    AxiosError<ApiErrors>,
    BootcampEdit
  >({
    mutationFn: updateBootcampREST,
    onError: () => AlertStore.show(t('common:alerts.error'), 'error'),
    onSuccess: () => AlertStore.show(t('common:alerts.message-sent'), 'success'),
  })

  const onSubmit = async (
    values: BootcampFormData,
    { setFieldError, resetForm }: FormikHelpers<BootcampFormData>,
  ) => {
    try {
      await updateMutation.mutateAsync({ id, ...values })
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
      <GenericForm
        onSubmit={onSubmit}
        initialValues={{ firstName: data?.firstName || '', lastName: data?.lastName || '' }}>
        <Grid container spacing={3} sx={{ m: 10 }}>
          <Grid item xs={10}>
            <FormTextField type="text" label="First Name" name="firstName" />
          </Grid>
          <Grid item xs={10}>
            <FormTextField type="text" label="Last Name" name="lastName" />
          </Grid>
          <Grid item xs={4}>
            <SubmitButton fullWidth label="Save" />
          </Grid>
          <Grid item xs={4}>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => {
                ;('')
              }}>
              Cancel
            </Button>
          </Grid>
        </Grid>
      </GenericForm>
    </Layout>
  )
}
