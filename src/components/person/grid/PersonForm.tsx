import React from 'react'
import * as yup from 'yup'
import { Grid } from '@mui/material'

import GenericForm from 'components/common/form/GenericForm'
import { name, phone, email } from 'common/form/validation'
import SubmitButton from 'components/common/form/SubmitButton'
import FormTextField from 'components/common/form/FormTextField'
import EmailField from 'components/common/form/EmailField'
import { AdminPersonFormData, AdminPersonResponse, PersonResponse } from 'gql/person'
import { useMutation, UseQueryResult } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'
import { ApiErrors } from 'service/apiErrors'
import { useCreatePerson, useEditPerson } from 'service/person'
import { AlertStore } from 'stores/AlertStore'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { routes } from 'common/routes'
import { usePerson } from 'common/hooks/person'

const validationSchema: yup.SchemaOf<AdminPersonFormData> = yup.object().defined().shape({
  firstName: name.required(),
  lastName: name.required(),
  email: email.required(),
  phone: phone.notRequired(),
})

const defaults: AdminPersonFormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
}

type FormProps = {
  initialValues?: AdminPersonFormData
}

export default function PersonForm({ initialValues = defaults }: FormProps) {
  const router = useRouter()
  const { t } = useTranslation()
  let editPersonId = router.query.id as string

  const mutation = useMutation<
    AxiosResponse<AdminPersonResponse>,
    AxiosError<ApiErrors>,
    AdminPersonFormData
  >({
    mutationFn: editPersonId ? useEditPerson(editPersonId) : useCreatePerson(),
    onError: () => AlertStore.show(t('common:alerts.error'), 'error'),
    onSuccess: () => {
      AlertStore.show(t('common:alerts.success'), 'success')
      router.push(routes.admin.person.index)
    },
  })

  function handleSubmit(values: AdminPersonFormData) {
    mutation.mutate(values)
  }

  if (editPersonId) {
    editPersonId = String(editPersonId)
    const { data }: UseQueryResult<PersonResponse> = usePerson(editPersonId)

    initialValues = {
      firstName: data?.firstName ?? '',
      lastName: data?.lastName ?? '',
      email: data?.email ?? '',
      phone: data?.phone ?? '',
    }
  }

  return (
    <Grid container direction="column" component="section">
      <GenericForm
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormTextField
              autoFocus
              type="text"
              label="person:admin.fields.first-name"
              name="firstName"
              autoComplete="first-name"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormTextField
              type="text"
              label="person:admin.fields.last-name"
              name="lastName"
              autoComplete="family-name"
            />
          </Grid>
          <Grid item xs={12}>
            {/* TODO: <CheckboxField
              name="skipRegistration"
              label="Бенефициента ще бъде представляван от организатора"
            /> */}
          </Grid>
          <Grid item xs={12}>
            <EmailField label="person:admin.fields.email" name="email" />
          </Grid>
          <Grid item xs={12}>
            <FormTextField
              type="tel"
              name="phone"
              inputMode="tel"
              autoComplete="tel"
              label="person:admin.fields.phone"
            />
          </Grid>
          <Grid item xs={4} margin="auto">
            <SubmitButton
              fullWidth
              label={editPersonId ? 'person:admin.cta.edit' : 'person:admin.cta.create'}
            />
          </Grid>
        </Grid>
      </GenericForm>
    </Grid>
  )
}
