import React from 'react'
import * as yup from 'yup'
import { useRouter } from 'next/router'
import { FormikHelpers } from 'formik'
import { useMutation } from 'react-query'
import { useTranslation } from 'next-i18next'
import { AxiosError, AxiosResponse } from 'axios'
import { Button, Grid, Typography } from '@mui/material'

import { editPerson } from 'common/rest'
import GenericForm from 'components/common/form/GenericForm'
import SubmitButton from 'components/common/form/SubmitButton'
import FormTextField from 'components/common/form/FormTextField'
import { ApiErrors, isAxiosError, matchValidator } from 'common/api-errors'
import { useViewPerson } from 'common/hooks/person'
import { axios } from 'common/api-client'
import { endpoints } from 'common/api-endpoints'
import { useTheme } from '@mui/styles'
import { PersonFormData } from 'gql/person'
import { AlertStore } from 'stores/AlertStore'

export const validationSchema: yup.SchemaOf<PersonFormData> = yup.object().defined().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().required(),
  phone: yup.string().required(),
  company: yup.string().notRequired(),
  adress: yup.string().required(),
})

const defaults: PersonFormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  company: '',
  adress: '',
}

export type CampaignTypeFormProps = { initialValues?: PersonFormData }

export default function EditBootcamper({ initialValues = defaults }: CampaignTypeFormProps) {
  const theme = useTheme()

  const router = useRouter()
  const id = Array.isArray(router.query.id) ? router.query.id[0] : router.query.id || ''

  const editWrapper = (id: string) => {
    return async (values: PersonFormData) => {
      return await editPerson(id, values)
    }
  }

  const info = useViewPerson(id)

  if (!info.isLoading) {
    initialValues.firstName = info.data?.firstName || ''
    initialValues.lastName = info.data?.lastName || ''
    initialValues.email = info.data?.email || ''
    initialValues.phone = info.data?.phone || ''
    initialValues.company = info.data?.company || ''
    initialValues.adress = info.data?.adress || ''
  }

  const { t } = useTranslation()

  const mutation = useMutation<
    AxiosResponse<PersonFormData>,
    AxiosError<ApiErrors>,
    PersonFormData
  >({
    mutationFn: editWrapper(id),
    onError: () => AlertStore.show(t('common:alerts.error'), 'error'),
    onSuccess: () => AlertStore.show(t('common:alerts.message-sent'), 'success'),
  })

  const onSubmit = async (
    values: PersonFormData,
    { setFieldError, resetForm }: FormikHelpers<PersonFormData>,
  ) => {
    try {
      await axios.put(endpoints.person.viewPerson(id).url, values)
      resetForm()
      AlertStore.show('Successfully edited campaign type', 'success')
      router.push('/admin/person')
    } catch (error) {
      console.error(error)
      AlertStore.show('An error occured', 'error')
      if (isAxiosError(error)) {
        const { response } = error as AxiosError<ApiErrors>
        response?.data.message.map(({ property, constraints }) => {
          setFieldError(property, t(matchValidator(constraints)))
        })
      }
    }
  }

  return (
    <Grid container direction="column" component="section" style={{ marginLeft: '10%' }}>
      <Grid item xs={12} style={{ marginTop: '10%', marginLeft: '25%' }}>
        <Typography variant="h5" component="h2">
          EDIT CAMPAIGN TYPE
        </Typography>
      </Grid>
      <GenericForm
        onSubmit={onSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}>
        <Grid container spacing={1}>
          <Grid item sm={5}>
            <FormTextField
              style={{ marginTop: '2%', width: '80%' }}
              type="text"
              name="firstName"
              autoComplete="target-amount"
              label="First Name"
            />
          </Grid>
          <Grid item sm={5}>
            <FormTextField
              style={{ marginTop: '2%', width: '80%' }}
              type="text"
              name="lastName"
              autoComplete="target-amount"
              label="Last name"
            />
          </Grid>
          <Grid item sm={5}>
            <FormTextField
              style={{ marginTop: '2%', width: '80%' }}
              type="text"
              name="email"
              autoComplete="target-amount"
              label="Email"
            />
          </Grid>
          <Grid item sm={5}>
            <FormTextField
              style={{ marginTop: '2%', width: '80%' }}
              type="text"
              name="phone"
              autoComplete="target-amount"
              label="Phone"
            />
          </Grid>
          <Grid item sm={5}>
            <FormTextField
              style={{ marginTop: '2%', width: '80%' }}
              type="text"
              name="company"
              autoComplete="target-amount"
              label="Company (optional)"
            />
          </Grid>
          <Grid item sm={5}>
            <FormTextField
              style={{ marginTop: '2%', width: '80%' }}
              type="text"
              name="adress"
              autoComplete="target-amount"
              label="Adress"
            />
          </Grid>

          <Grid
            item
            xs={12}
            style={{
              display: 'flex',
              flexDirection: 'column',
              marginLeft: '15%',
              marginTop: '1.1%',
            }}>
            <SubmitButton
              style={{ width: '50%' }}
              label="Edit"
              loading={mutation.isLoading}
              sx={{ backgroundColor: theme.palette.secondary.main }}
            />
            <Button
              href="/admin/person"
              variant="outlined"
              sx={{
                width: '50%',
                marginTop: '1%',
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.background.default,
              }}>
              Cancel
            </Button>
          </Grid>
          <Grid item xs={12}></Grid>
        </Grid>
      </GenericForm>
    </Grid>
  )
}
