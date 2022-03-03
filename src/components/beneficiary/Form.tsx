import React, { useState } from 'react'
import { useMutation, UseQueryResult } from 'react-query'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { AxiosError, AxiosResponse } from 'axios'
import * as yup from 'yup'
import {
  Box,
  Button,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material'

import { BeneficiaryFormData, BeneficiaryType } from 'gql/beneficiary'
import { LegalEntityType, PersonRelation } from './BeneficiaryTypes'
import { routes } from 'common/routes'
import { ApiErrors } from 'service/apiErrors'
import { useBeneficiary, useEditBeneficiary, useCreateBeneficiary } from 'service/beneficiary'
import { usePeopleList } from 'service/person'
import { useCompaniesList } from 'service/company'
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
  const [beneficiaryType, setBeneficiaryType] = useState<string>('')
  const [personId, setPersonId] = useState<string>('')
  const [companyId, setCompanyId] = useState<string>('')
  const people = usePeopleList().data
  const companies = useCompaniesList().data

  let initialValues: BeneficiaryFormData = {
    type: beneficiaryType,
    personId: personId,
    companyId: companyId,
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
      type: data?.type,
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
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <InputLabel>{t('beneficiary:grid:type')}</InputLabel>
            <Select
              fullWidth
              name="type"
              defaultValue={initialValues.type}
              onChange={(e: SelectChangeEvent) => {
                setBeneficiaryType(e.target.value)
                console.log(beneficiaryType)
              }}>
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {Object.values(LegalEntityType)?.map((type) => {
                return (
                  <MenuItem key={type} value={type}>
                    {t('beneficiary:forms:labels:type:' + type)}
                  </MenuItem>
                )
              })}
            </Select>
          </Grid>
          <Grid item xs={6}>
            <InputLabel>{t('beneficiary:grid:personId')}</InputLabel>
            <Select
              fullWidth
              name="type"
              defaultValue={initialValues.personId}
              onChange={(e: SelectChangeEvent) => {
                setPersonId(e.target.value)
              }}>
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {people?.map((person) => {
                return (
                  <MenuItem key={person.id} value={person.id}>
                    {person.firstName + ' ' + person.lastName}
                  </MenuItem>
                )
              })}
            </Select>
          </Grid>
          <Grid item xs={6}>
            <InputLabel>{t('beneficiary:grid:companyId')}</InputLabel>
            <Select
              fullWidth
              name="companyId"
              defaultValue={initialValues.personId}
              onChange={(e: SelectChangeEvent) => {
                setCompanyId(e.target.value)
              }}>
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {companies?.map((company) => {
                return (
                  <MenuItem key={company.id} value={company.id}>
                    {company.companyName}
                  </MenuItem>
                )
              })}
            </Select>
          </Grid>
          <Grid item xs={6}>
            <FormTextField
              type="text"
              name="coordinatorRelation"
              autoComplete="target-amount"
              label={t('beneficiary:grid:coordinatorRelation')}
            />
          </Grid>
          <Grid item xs={6}>
            <FormTextField
              type="text"
              name="coordinatorId"
              autoComplete="target-amount"
              label={t('beneficiary:grid:coordinatorId')}
            />
          </Grid>
          <Grid item xs={6}>
            <FormTextField
              type="text"
              name="countryCode"
              autoComplete="target-amount"
              label={t('beneficiary:grid:countryCode')}
            />
          </Grid>
          <Grid item xs={6}>
            <FormTextField
              type="text"
              name="cityId"
              autoComplete="target-amount"
              label={t('beneficiary:grid:cityId')}
            />
          </Grid>
          <Grid item xs={6}>
            <FormTextField
              type="text"
              name="description"
              autoComplete="target-amount"
              label={t('beneficiary:grid:description')}
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
