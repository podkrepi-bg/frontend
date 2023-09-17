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
import CheckboxField from 'components/common/form/CheckboxField'
import { useCreateCoordinator, useDeleteCoordinator } from 'service/coordinator'
import { CoordinatorResponse, CoorinatorInput } from 'gql/coordinators'
import { createOrganizer, deleteOrganizer } from 'service/organizer'
import { OrganizerInput } from 'gql/organizer'

const validationSchema: yup.SchemaOf<AdminPersonFormData> = yup.object().defined().shape({
  firstName: name.required(),
  lastName: name.required(),
  email: email.required(),
  phone: phone.notRequired(),
  isBeneficiary: yup.bool().required(),
  isCoordinator: yup.bool().required(),
  isOrganizer: yup.bool().required(),
})

const defaults: AdminPersonFormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  isBeneficiary: false,
  isCoordinator: false,
  isOrganizer: false,
}

type FormProps = {
  initialValues?: {
    coordinatorId?: string
    activeCoordinator?: boolean
    organizerId?: string
    activeOrganizer?: boolean
    beneficiaryId?: string
    activeBeneficiary?: boolean
  } & AdminPersonFormData
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
  })

  const coordinatorCreateMutation = useMutation<
    AxiosResponse<CoordinatorResponse>,
    AxiosError<ApiErrors>,
    CoorinatorInput
  >({
    mutationFn: useCreateCoordinator(),
    onError: () => AlertStore.show(t('common:alerts.error'), 'error'),
  })

  const coordinatorDeleteMutation = useMutation<
    AxiosResponse<CoordinatorResponse>,
    AxiosError<ApiErrors>,
    string
  >({
    mutationFn: useDeleteCoordinator(),
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

  const organizerDeleteMutation = useMutation<
    AxiosResponse<CoordinatorResponse>,
    AxiosError<ApiErrors>,
    string
  >({
    mutationFn: deleteOrganizer(),
    onError: () => AlertStore.show(t('common:alerts.error'), 'error'),
  })

  async function handleSubmit(values: AdminPersonFormData) {
    const { data: userResponse } = await mutation.mutateAsync(values)

    if (values.isCoordinator !== initialValues.isCoordinator) {
      !values.isCoordinator && initialValues.coordinatorId
        ? coordinatorDeleteMutation.mutate(initialValues.coordinatorId)
        : coordinatorCreateMutation.mutate({ personId: userResponse.id })
    }

    if (values.isOrganizer !== initialValues.isOrganizer) {
      !values.isOrganizer && initialValues.organizerId
        ? organizerDeleteMutation.mutate(initialValues.organizerId)
        : organizerCreateMutation.mutate({ personId: userResponse.id })
    }

    router.push(routes.admin.person.index)
  }

  if (editPersonId) {
    editPersonId = String(editPersonId)
    const { data }: UseQueryResult<PersonResponse> = usePerson(editPersonId)

    initialValues = {
      firstName: data?.firstName ?? '',
      lastName: data?.lastName ?? '',
      email: data?.email ?? '',
      phone: data?.phone ?? '',
      isBeneficiary: !!data?.beneficiaries?.length,
      beneficiaryId: data?.beneficiaries?.at(0)?.id,
      activeBeneficiary: !!data?.beneficiaries?.at(0)?._count?.campaigns,
      isCoordinator: !!data?.coordinators,
      coordinatorId: data?.coordinators?.id,
      activeCoordinator: !!data?.coordinators?._count?.campaigns,
      isOrganizer: !!data?.organizer,
      organizerId: data?.organizer?.id,
      activeOrganizer: !!data?.organizer?._count?.campaigns,
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
          <Grid item xs={12}>
            <CheckboxField
              name="isOrganizer"
              disabled={initialValues.activeOrganizer}
              label="person:admin.fields.organizer"
            />
          </Grid>
          <Grid item xs={12}>
            <CheckboxField
              name="isCoordinator"
              disabled={initialValues.activeCoordinator}
              label="person:admin.fields.coordinator"
            />
          </Grid>
          <Grid item xs={12}>
            <CheckboxField
              name="isBeneficiary"
              disabled={initialValues.activeBeneficiary}
              label="person:admin.fields.beneficiary"
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
