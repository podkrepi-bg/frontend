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
import { useCoordinatorsList } from 'service/restRequests/coordinator'
import { useCitiesList } from 'common/hooks/cities'
import { useCountriesList } from 'common/hooks/countries'
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
      .trim()
      .oneOf(Object.values(PersonRelation).sort((a, b) => a.localeCompare(b))),
  })

export default function Form() {
  const router = useRouter()
  const { t } = useTranslation()
  let id = router.query.id
  const [beneficiaryType, setBeneficiaryType] = useState<string>('')
  const [personId, setPersonId] = useState<string>('')
  const [companyId, setCompanyId] = useState<string>('')
  const [coordinatorId, setCoordinatorId] = useState<string>('')
  const [cityId, setCityId] = useState<string>('')
  const [countryCode, setCountryCode] = useState<string>('')
  const people = usePeopleList().data
  const companies = useCompaniesList().data
  const coordinators = useCoordinatorsList().data
  const coordinatorRelations = Object.values(PersonRelation)
  const cities = useCitiesList().data
  const countries = useCountriesList().data

  let initialValues: BeneficiaryFormData = {
    type: beneficiaryType,
    personId: personId,
    companyId: companyId,
    coordinatorId: coordinatorId,
    countryCode: countryCode,
    cityId: cityId,
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
      <Box sx={{ height: '62.6vh', marginBottom: '9%' }}>
        <Typography variant="h5" component="h2" sx={{ textAlign: 'center' }}>
          {id ? t('beneficiary:forms:edit-heading') : t('beneficiary:forms:add-heading')}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <InputLabel>{t('beneficiary:grid:type')}</InputLabel>
            <Select
              fullWidth
              sx={{
                height: '55%',
              }}
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
                    {t('beneficiary:grid:' + type)}
                  </MenuItem>
                )
              })}
            </Select>
          </Grid>
          <Grid item xs={6}>
            <InputLabel>{t('beneficiary:grid:individual')}</InputLabel>
            <Select
              fullWidth
              sx={{
                height: '55%',
              }}
              name="personId"
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
            <InputLabel>{t('beneficiary:grid:company')}</InputLabel>
            <Select
              fullWidth
              sx={{
                height: '55%',
              }}
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
            <InputLabel>{t('beneficiary:grid:coordinatorRelation')}</InputLabel>
            <Select
              fullWidth
              sx={{
                height: '55%',
              }}
              name="coordinatorRelation"
              defaultValue={initialValues.coordinatorRelation}
              onChange={(e: SelectChangeEvent) => {
                setPersonId(e.target.value)
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
          </Grid>
          <Grid item xs={6}>
            <InputLabel>{t('beneficiary:grid:coordinator')}</InputLabel>
            <Select
              fullWidth
              sx={{
                height: '55%',
              }}
              name="coordinatorId"
              defaultValue={initialValues.coordinatorId}
              onChange={(e: SelectChangeEvent) => {
                setCoordinatorId(e.target.value)
              }}>
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {coordinators?.map((coordinator) => {
                return (
                  <MenuItem key={coordinator.id} value={coordinator.id}>
                    {coordinator.person.firstName} {coordinator.person.lastName}
                  </MenuItem>
                )
              })}
            </Select>
          </Grid>
          <Grid item xs={6}>
            <InputLabel>{t('beneficiary:grid:countryCode')}</InputLabel>
            <Select
              fullWidth
              sx={{
                height: '55%',
              }}
              name="countryCode"
              defaultValue={initialValues.countryCode}
              onChange={(e: SelectChangeEvent) => {
                setCountryCode(e.target.value)
              }}>
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {countries?.map((country) => {
                return (
                  <MenuItem key={country.id} value={country.countryCode}>
                    {country.countryCode} - {country.name}
                  </MenuItem>
                )
              })}
            </Select>
          </Grid>
          <Grid item xs={6}>
            <InputLabel>{t('beneficiary:grid:city')}</InputLabel>
            <Select
              fullWidth
              sx={{
                height: '55%',
              }}
              name="cityId"
              defaultValue={initialValues.cityId}
              onChange={(e: SelectChangeEvent) => {
                setCityId(e.target.value)
              }}>
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {cities?.map((city) => {
                return (
                  <MenuItem key={city.id} value={city.id}>
                    {city.name}
                  </MenuItem>
                )
              })}
            </Select>
          </Grid>
          <Grid item xs={6}>
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
              <Button>{t('documents:cta:cancel')}</Button>
            </Link>
          </Grid>
        </Grid>
      </Box>
    </GenericForm>
  )
}
