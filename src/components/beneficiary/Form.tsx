import React from 'react'
import { useMutation, UseQueryResult } from 'react-query'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { AxiosError, AxiosResponse } from 'axios'
import * as yup from 'yup'
import { Box, Button, Grid, Typography } from '@mui/material'

import { BeneficiaryFormData, BeneficiaryType } from 'gql/beneficiary'
import { LegalEntityType, PersonRelation } from './BeneficiaryTypes'
import { routes } from 'common/routes'
import { ApiErrors } from 'service/apiErrors'
import { useBeneficiary, useEditBeneficiary, useCreateBeneficiary } from 'service/beneficiary'
import { AlertStore } from 'stores/AlertStore'
import GenericForm from 'components/common/form/GenericForm'
import FormTextField from 'components/common/form/FormTextField'
import SubmitButton from 'components/common/form/SubmitButton'

const validationSchema = yup
  .object()
  .defined()
  .shape({
    type: yup
      .string()
      .required()
      .oneOf(Object.values(LegalEntityType).sort((a, b) => a.localeCompare(b))),
    personId: yup.string().notRequired(),
    companyId: yup.string().notRequired(),
    coordinatorId: yup.string().required(),
    countryCode: yup.string().required(),
    cityId: yup.string().required(),
    description: yup.string().notRequired(),
    coordinatorRelation: yup
      .string()
      .required()
      .oneOf(Object.values(PersonRelation).sort((a, b) => a.localeCompare(b))),
  })

export default function EditForm() {
  const router = useRouter()
  const { t } = useTranslation()
  let id = router.query.id

  let initialValues: BeneficiaryFormData = {
    type: 'individual',
    personId: '',
    companyId: '',
    coordinatorId: '',
    countryCode: '',
    cityId: '',
    description: '',
    publicData: '',
    privateData: '',
    coordinatorRelation: 'none',
    campaigns: [],
  }

  if (id) {
    id = String(id)
    const { data }: UseQueryResult<BeneficiaryType> = useBeneficiary(id)
    initialValues = {
      type: data?.type || 'individual',
      cityId: data?.cityId || '',
      companyId: data?.companyId || '',
      coordinatorId: data?.coordinatorId || '',
      countryCode: data?.countryCode || '',
      description: data?.description || '',
      personId: data?.personId || '',
      privateData: data?.privateData || '',
      publicData: data?.publicData || '',
      coordinatorRelation: data?.coordinatorRelation || '',
      campaigns: data?.campaigns || [],
    }
  }
  const mutationFn = id ? useEditBeneficiary(id) : useCreateBeneficiary()

  const mutation = useMutation<
    AxiosResponse<BeneficiaryType>,
    AxiosError<ApiErrors>,
    BeneficiaryFormData
  >({
    mutationFn,
    onError: () => AlertStore.show(t('documents:alerts:error'), 'error'),
    onSuccess: () => {
      AlertStore.show(id ? t('documents:alerts:edit') : t('documents:alerts:create'), 'success')
      router.push(routes.admin.beneficiary.index)
    },
  })

  async function onSubmit(data: BeneficiaryFormData) {
    mutation.mutateAsync(data)
  }

  return (
    <GenericForm
      onSubmit={onSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}>
      <Box sx={{ marginTop: '5%', height: '62.6vh' }}>
        <Typography variant="h5" component="h2" sx={{ marginBottom: 2, textAlign: 'center' }}>
          {id ? t('beneficiary:forms:edit-heading') : t('beneficiary:forms:add-heading')}
        </Typography>
        <Grid container spacing={2} sx={{ width: 600, margin: '0 auto' }}>
          <Grid item xs={6}>
            <FormTextField
              type="text"
              name="type"
              autoComplete="target-amount"
              label={t('beneficiary:forms:labels:type')}
            />
          </Grid>
          <Grid item xs={6}>
            <FormTextField
              type="text"
              name="personId"
              autoComplete="target-amount"
              label="Person (if beneficiary is not company)"
            />
          </Grid>
          <Grid item xs={6}>
            <FormTextField
              type="text"
              name="companyId"
              autoComplete="target-amount"
              label="Company (optional)"
            />
          </Grid>
          <Grid item xs={6}>
            <FormTextField
              type="text"
              name="coordinatorRelation"
              autoComplete="target-amount"
              label={t('beneficiary:forms:labels:relation')}
            />
          </Grid>
          <Grid item xs={6}>
            <FormTextField
              type="text"
              name="coordinatorId"
              autoComplete="target-amount"
              label="Coordinator"
            />
          </Grid>
          <Grid item xs={6}>
            <FormTextField
              type="text"
              name="countryCode"
              autoComplete="target-amount"
              label="Country code"
            />
          </Grid>
          <Grid item xs={6}>
            <FormTextField type="text" name="cityId" autoComplete="target-amount" label="City ID" />
          </Grid>
          <Grid item xs={6}>
            <FormTextField
              type="text"
              name="description"
              autoComplete="target-amount"
              label="Description"
              multiline
              rows={1.5}
            />
          </Grid>
          <Grid item xs={6}>
            <SubmitButton fullWidth label={t('documents:cta:submit')} />
          </Grid>
          <Grid item xs={6}>
            <Link href={routes.admin.beneficiary.index} passHref>
              <Button>{t('documents:cta:cancel')}</Button>
            </Link>
          </Grid>
        </Grid>
      </Box>
    </GenericForm>
  )
}
