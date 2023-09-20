import React, { useState } from 'react'
import * as yup from 'yup'
import { Grid } from '@mui/material'

import GenericForm from 'components/common/form/GenericForm'
import { name, phone, email } from 'common/form/validation'
import SubmitButton from 'components/common/form/SubmitButton'
import FormTextField from 'components/common/form/FormTextField'
import EmailField from 'components/common/form/EmailField'
import { AdminPersonFormData, AdminPersonResponse } from 'gql/person'
import { useMutation } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'
import { ApiErrors } from 'service/apiErrors'
import { useCreatePerson } from 'service/person'
import { AlertStore } from 'stores/AlertStore'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { routes } from 'common/routes'
import CheckboxField from 'components/common/form/CheckboxField'
import { useCreateCoordinator } from 'service/coordinator'
import { CoordinatorResponse, CoorinatorInput } from 'gql/coordinators'
import { createOrganizer } from 'service/organizer'
import { OrganizerInput } from 'gql/organizer'
import { BeneficiaryFormData, BeneficiaryListResponse } from 'gql/beneficiary'
import { BeneficiaryType } from 'components/admin/beneficiary/BeneficiaryTypes'
import { useCreateBeneficiary } from 'service/beneficiary'
import OrganizerRelationSelect from 'components/admin/beneficiary/OrganizerRelationSelect'
import CountrySelect from 'components/admin/countries/CountrySelect'
import CitySelect from 'components/admin/cities/CitySelect'

const validationSchema = yup
  .object()
  .defined()
  .shape({
    firstName: name.required(),
    lastName: name.required(),
    email: email.required(),
    phone: phone.notRequired(),
    isCoordinator: yup.bool().required(),
    isOrganizer: yup.bool().required(),
    isBeneficiary: yup.bool().required(),
    description: yup.string().notRequired(),
    cityId: yup.string().when('isBeneficiary', {
      is: true,
      then: yup.string().required(),
      otherwise: yup.string().notRequired(),
    }),
    countryCode: yup.string().when('isBeneficiary', {
      is: true,
      then: yup.string().required(),
      otherwise: yup.string().notRequired(),
    }),
    organizerRelation: yup.string().when('isBeneficiary', {
      is: true,
      then: yup.string().required(),
      otherwise: yup.string().notRequired(),
    }),
  })

const initialValues: AdminPersonFormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  isOrganizer: false,
  isCoordinator: false,
  isBeneficiary: false,
  countryCode: 'BG',
  cityId: '',
  description: '',
  organizerRelation: 'none',
}

export default function CreateForm() {
  const router = useRouter()
  const { t } = useTranslation()
  const [showBenefactor, setShowBenefactor] = useState<boolean>(false)

  const mutation = useMutation<
    AxiosResponse<AdminPersonResponse>,
    AxiosError<ApiErrors>,
    AdminPersonFormData
  >({
    mutationFn: useCreatePerson(),
    onError: () => AlertStore.show(t('common:alerts.error'), 'error'),
  })

  const coordinatorCreateMutation = useMutation<
    AxiosResponse<CoordinatorResponse>,
    AxiosError<ApiErrors>,
    CoorinatorInput
  >({
    mutationFn: useCreateCoordinator(),
    onError: () => AlertStore.show(t('common:alerts.error'), 'error'),
  })

  const organizerCreateMutation = useMutation<
    AxiosResponse<CoordinatorResponse>,
    AxiosError<ApiErrors>,
    OrganizerInput
  >({
    mutationFn: createOrganizer(),
    onError: () => AlertStore.show(t('common:alerts.error'), 'error'),
  })

  const beneficiaryCreateMutation = useMutation<
    AxiosResponse<BeneficiaryListResponse>,
    AxiosError<ApiErrors>,
    BeneficiaryFormData
  >({
    mutationFn: useCreateBeneficiary(),
    onError: () => AlertStore.show(t('common:alerts.error'), 'error'),
  })

  async function handleSubmit(values: AdminPersonFormData) {
    const { data: userResponse } = await mutation.mutateAsync(values)

    if (values.isCoordinator) coordinatorCreateMutation.mutate({ personId: userResponse.id })

    if (values.isOrganizer) organizerCreateMutation.mutate({ personId: userResponse.id })

    if (values.isBeneficiary)
      beneficiaryCreateMutation.mutate({
        type: BeneficiaryType.individual,
        personId: userResponse.id,
        countryCode: values.countryCode,
        cityId: values.cityId,
        organizerRelation: values.organizerRelation,
        description: values.description,
        campaigns: [],
      })

    AlertStore.show(t('common:alerts.success'), 'success')
    router.push(routes.admin.person.index)
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
          <Grid item xs={4}>
            <CheckboxField name="isOrganizer" label="person:admin.fields.organizer" />
          </Grid>
          <Grid item xs={4}>
            <CheckboxField name="isCoordinator" label="person:admin.fields.coordinator" />
          </Grid>
          <Grid item xs={4}>
            <CheckboxField
              name="isBeneficiary"
              label="person:admin.fields.beneficiary"
              onChange={(e) => {
                setShowBenefactor(e.target.checked)
              }}
            />
          </Grid>
          {showBenefactor && (
            <>
              <Grid item xs={12}>
                <OrganizerRelationSelect
                  name="organizerRelation"
                  label="person:admin.fields.organizerRelation"
                />
              </Grid>
              <Grid item xs={6}>
                <CountrySelect />
              </Grid>
              <Grid item xs={6}>
                <CitySelect name="cityId" />
              </Grid>
              <Grid item xs={12}>
                <FormTextField
                  type="text"
                  name="description"
                  label="person:admin.fields.description"
                  multiline
                  rows={2}
                />
              </Grid>
            </>
          )}
          <Grid item xs={4} margin="auto">
            <SubmitButton fullWidth label="person:admin.cta.create" />
          </Grid>
        </Grid>
      </GenericForm>
    </Grid>
  )
}
