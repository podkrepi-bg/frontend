import React from 'react'
import { useMutation, useQueryClient, UseQueryResult } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

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
  Typography,
} from '@mui/material'

import { BeneficiaryFormData, BeneficiaryListResponse } from 'gql/beneficiary'
import { BeneficiaryType } from './BeneficiaryTypes'
import { routes } from 'common/routes'
import { ApiErrors } from 'service/apiErrors'
import { useViewBeneficiary, useEditBeneficiary } from 'service/beneficiary'
import { useCompaniesList } from 'service/company'
import { AlertStore } from 'stores/AlertStore'
import PersonSelect from 'components/common/person/PersonSelect'
import GenericForm from 'components/common/form/GenericForm'
import FormTextField from 'components/common/form/FormTextField'
import SubmitButton from 'components/common/form/SubmitButton'
import CitySelect from 'components/admin/cities/CitySelect'
import CountrySelect from 'components/admin/countries/CountrySelect'
import { endpoints } from 'service/apiEndpoints'
import CompanySelect from 'components/admin/companies/CompanySelect'
import Link from 'components/common/Link'
import OrganizerRelationSelect from './OrganizerRelationSelect'

const validationSchema = yup
  .object()
  .defined()
  .shape({
    type: yup.mixed().oneOf(Object.values(BeneficiaryType)),
    personId: yup.string().when('type', {
      is: (value: string) => value === 'individual',
      then: yup.string().required(),
      otherwise: yup.string().notRequired(),
    }),
    companyId: yup.string().when('type', {
      is: (value: string) => value === 'company',
      then: yup.string().required(),
      otherwise: yup.string().notRequired(),
    }),
    description: yup.string().notRequired(),
    cityId: yup.string().when('type', {
      is: (value: string) => value === 'individual',
      then: yup.string().required(),
      otherwise: yup.string().notRequired(),
    }),
    countryCode: yup.string().when('type', {
      is: (value: string) => value === 'individual',
      then: yup.string().required(),
      otherwise: yup.string().notRequired(),
    }),
  })

export default function EditForm() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const { t } = useTranslation()
  const id = router.query.id
  const { data: companies } = useCompaniesList()
  const { data }: UseQueryResult<BeneficiaryListResponse> = useViewBeneficiary(String(id))

  const initialValues = {
    type: data?.type,
    cityId: data?.cityId || '',
    companyId: data?.companyId || undefined,
    countryCode: data?.countryCode || '',
    description: data?.description || '',
    personId: data?.personId || undefined,
    privateData: data?.privateData || '',
    publicData: data?.publicData || '',
    organizerRelation: data?.organizerRelation || '',
    campaigns: data?.campaigns || [],
  }

  const mutationFn = useEditBeneficiary(String(id))
  const mutation = useMutation<
    AxiosResponse<BeneficiaryListResponse>,
    AxiosError<ApiErrors>,
    BeneficiaryFormData
  >({
    mutationFn,
    onError: () => AlertStore.show(t('common:alerts.error'), 'error'),
    onSuccess: () => {
      AlertStore.show(t('common:alerts.success'), 'success')
      queryClient.invalidateQueries([endpoints.beneficiary.listBeneficiary.url])
      router.push(routes.admin.beneficiary.index)
    },
  })

  async function onSubmit(values: BeneficiaryFormData) {
    const data = {
      type: values.type,
      personId: values.personId,
      companyId: values.companyId,
      countryCode:
        companies?.find((c) => c.id === values.companyId)?.countryCode || values.countryCode,
      cityId: companies?.find((c) => c.id === values.companyId)?.cityId || values.cityId,
      organizerRelation: values.organizerRelation,
      description: values.description,
      campaigns: values.campaigns,
    }
    mutation.mutateAsync(data)
  }

  return (
    <GenericForm
      onSubmit={onSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}>
      <Box sx={{ height: '62.6vh', marginBottom: '9%' }}>
        <Typography variant="h5" component="h2" sx={{ textAlign: 'center' }}>
          {t('beneficiary:forms:edit-heading')}
        </Typography>
        <Typography variant="body1" sx={{ textAlign: 'center', padding: '8px', mb: 2 }}>
          {t('beneficiary:forms:info')}
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined" size="small">
              <InputLabel>{t('beneficiary:grid:type')}</InputLabel>
              <Select
                fullWidth
                name="type"
                disabled={Boolean(id)}
                defaultValue={initialValues.type}
                label={t('beneficiary:grid:type')}>
                <MenuItem value={undefined} disabled>
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
            <OrganizerRelationSelect
              name="organizerRelation"
              label="beneficiary:grid:organizerRelation"
            />
          </Grid>
          {initialValues.type === BeneficiaryType.individual ? (
            <>
              <Grid item xs={12}>
                <Typography paddingLeft={'inherit'} marginBottom={2}>
                  {t('beneficiary:forms.labels.person-select')}{' '}
                  <Link href={routes.admin.person.create}>
                    {t('beneficiary:forms.labels.create-new')}
                  </Link>
                </Typography>
                <PersonSelect name="personId" label={t('beneficiary:forms.labels.person-label')} />
              </Grid>
              <Grid item xs={6}>
                <CountrySelect />
              </Grid>
              <Grid item xs={6}>
                <CitySelect name="cityId" />
              </Grid>
            </>
          ) : (
            <Grid item xs={12}>
              <Typography paddingLeft={'inherit'} marginBottom={2}>
                {t('beneficiary:forms.labels.company-select')}{' '}
                <Link href={routes.admin.company.create}>
                  {t('beneficiary:forms.labels.create-new')}
                </Link>
              </Typography>
              <CompanySelect name="companyId" label={t('beneficiary:forms.labels.company-label')} />
            </Grid>
          )}
          <Grid item xs={12}>
            <FormTextField
              type="text"
              name="description"
              label={t('beneficiary:grid:description')}
              multiline
              rows={2}
            />
          </Grid>
          <Grid item xs={6}>
            <SubmitButton fullWidth label={t('beneficiary:cta:submit')} />
          </Grid>
          <Grid item xs={6}>
            <Link href={routes.admin.beneficiary.index}>
              <Button fullWidth>{t('beneficiary:cta:cancel')}</Button>
            </Link>
          </Grid>
        </Grid>
      </Box>
    </GenericForm>
  )
}
