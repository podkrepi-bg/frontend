import React, { useState } from 'react'
import { useMutation, useQueryClient, UseQueryResult } from 'react-query'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { AxiosError, AxiosResponse } from 'axios'
import * as yup from 'yup'
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material'

import { BeneficiaryFormData, BeneficiaryListResponse } from 'gql/beneficiary'
import { BeneficiaryType, PersonRelation } from './BeneficiaryTypes'
import { routes } from 'common/routes'
import { ApiErrors } from 'service/apiErrors'
import { useViewBeneficiary, useEditBeneficiary, useCreateBeneficiary } from 'service/beneficiary'
import { useCompaniesList } from 'service/company'
import { useCitiesList } from 'common/hooks/cities'
import { AlertStore } from 'stores/AlertStore'
import PersonSelect from 'components/person/PersonSelect'
import CoordinatorSelect from 'components/campaigns/grid/CoordinatorSelect'
import GenericForm from 'components/common/form/GenericForm'
import FormTextField from 'components/common/form/FormTextField'
import SubmitButton from 'components/common/form/SubmitButton'
import CitySelect from 'components/cities/CitySelect'
import CountrySelect from 'components/countries/CountrySelect'
import { endpoints } from 'service/apiEndpoints'

const validationSchema = yup
  .object()
  .defined()
  .shape({
    type: yup
      .string()
      .required()
      .oneOf(Object.values(BeneficiaryType).sort((a, b) => a.localeCompare(b))),
    personId: yup.string().notRequired(),
    companyId: yup.string().notRequired(),
    coordinatorId: yup.string().notRequired(),
    countryCode: yup.string().required(),
    cityId: yup.string().required(),
    description: yup.string().notRequired(),
    coordinatorRelation: yup
      .string()
      .notRequired()
      .trim()
      .oneOf(Object.values(PersonRelation).sort((a, b) => a.localeCompare(b))),
  })

export default function BeneficieryForm() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const { t } = useTranslation()
  let id = router.query.id

  const [beneficiaryType, setBeneficiaryType] = useState<string>('')
  const [personRelation, setPersonRelation] = useState<string>('')
  const [companyId, setCompanyId] = useState<string>('')
  const companies = useCompaniesList().data
  const coordinatorRelations = Object.values(PersonRelation)
  const cities = useCitiesList().data

  let initialValues: BeneficiaryFormData = {
    type: BeneficiaryType.individual,
    personId: undefined,
    companyId: undefined,
    coordinatorId: '',
    countryCode: 'BG',
    cityId: '',
    description: '',
    publicData: '',
    privateData: '',
    coordinatorRelation: 'none',
    campaigns: [],
  }

  if (id) {
    id = String(id)
    const { data }: UseQueryResult<BeneficiaryListResponse> = useViewBeneficiary(id)
    initialValues = {
      type: data?.type,
      cityId: data?.cityId || '',
      companyId: data?.companyId || undefined,
      coordinatorId: data?.coordinatorId || '',
      countryCode: data?.countryCode || '',
      description: data?.description || '',
      personId: data?.personId || undefined,
      privateData: data?.privateData || '',
      publicData: data?.publicData || '',
      coordinatorRelation: data?.coordinatorRelation || '',
      campaigns: data?.campaigns || [],
    }
  }
  const mutationFn = id ? useEditBeneficiary(id) : useCreateBeneficiary()

  const mutation = useMutation<
    AxiosResponse<BeneficiaryListResponse>,
    AxiosError<ApiErrors>,
    BeneficiaryFormData
  >({
    mutationFn,
    onError: () => AlertStore.show(t('documents:alerts:error'), 'error'),
    onSuccess: () => {
      AlertStore.show(id ? t('documents:alerts:edit') : t('documents:alerts:create'), 'success')

      queryClient.invalidateQueries(endpoints.beneficiary.listBeneficiary.url)
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
      <Box sx={{ height: '62.6vh', marginBottom: '9%' }}>
        <Typography variant="h5" component="h2" sx={{ textAlign: 'center' }}>
          {id ? t('beneficiary:forms:edit-heading') : t('beneficiary:forms:add-heading')}
        </Typography>
        <Typography variant="body1" sx={{ textAlign: 'center', padding: '8px' }}>
          {t('beneficiary:forms:info')}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl fullWidth variant="outlined" size="small">
              <InputLabel>{t('beneficiary:grid:type')}</InputLabel>
              <Select
                fullWidth
                name="type"
                label={t('beneficiary:grid:type')}
                defaultValue={initialValues.type}
                onChange={(e: SelectChangeEvent) => {
                  console.log('setting type to: ' + e.target.value)
                  setBeneficiaryType(e.target.value)
                }}>
                <MenuItem value="" disabled>
                  <em>None</em>
                </MenuItem>
                {Object.values(BeneficiaryType)?.map((type) => {
                  return (
                    <MenuItem key={type} value={type}>
                      {t('beneficiary:grid:' + type)}
                    </MenuItem>
                  )
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <PersonSelect name="personId" label={t('beneficiary:forms:labels:personSelect')} />
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined" size="small">
              <InputLabel>{t('beneficiary:grid:company')}</InputLabel>
              <Select
                fullWidth
                name="companyId"
                defaultValue={initialValues.personId}
                label={t('beneficiary:grid:company')}
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
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined" size="small">
              <InputLabel>{t('beneficiary:grid:coordinatorRelation')}</InputLabel>
              <Select
                fullWidth
                name="coordinatorRelation"
                label={t('beneficiary:grid:coordinatorRelation')}
                defaultValue={initialValues.coordinatorRelation}
                onChange={(e: SelectChangeEvent) => {
                  setPersonRelation(e.target.value)
                }}>
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {coordinatorRelations?.map((relation) => {
                  return (
                    <MenuItem key={relation} value={relation}>
                      {relation}
                    </MenuItem>
                  )
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <CoordinatorSelect />
          </Grid>
          <Grid item xs={6}>
            <CountrySelect name="countryId" />
          </Grid>
          <Grid item xs={6}>
            <CitySelect label={t('beneficiary:grid:city')} name="cityId" cityList={cities} />
          </Grid>
          <Grid item xs={12}>
            <FormTextField
              type="text"
              name="description"
              autoComplete="target-amount"
              label={t('beneficiary:grid:description')}
              multiline
              rows={1.5}
              defaultValue={initialValues.description}
            />
          </Grid>
          <Grid item xs={6}>
            <SubmitButton fullWidth label={t('documents:cta:submit')} />
          </Grid>
          <Grid item xs={6}>
            <Link href={routes.admin.beneficiary.index} passHref>
              <Button fullWidth>{t('documents:cta:cancel')}</Button>
            </Link>
          </Grid>
        </Grid>
      </Box>
    </GenericForm>
  )
}
