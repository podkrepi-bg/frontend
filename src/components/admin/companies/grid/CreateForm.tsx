import React from 'react'
import * as yup from 'yup'
import { Grid } from '@mui/material'

import GenericForm from 'components/common/form/GenericForm'
import { companyName } from 'common/form/validation'
import SubmitButton from 'components/common/form/SubmitButton'
import FormTextField from 'components/common/form/FormTextField'
import { AdminCompanyFormData, AdminCompanyResponse } from 'gql/person'
import { useMutation } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'
import { ApiErrors, handleUniqueViolation } from 'service/apiErrors'
import { AlertStore } from 'stores/AlertStore'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { routes } from 'common/routes'
import CountrySelect from 'components/admin/countries/CountrySelect'
import CitySelect from 'components/admin/cities/CitySelect'
import { useCreateCompany } from 'service/company'
import Link from 'components/common/Link'

const validationSchema: yup.SchemaOf<AdminCompanyFormData> = yup.object().defined().shape({
  companyName: companyName.required(),
  companyNumber: yup.string().required(),
  legalPersonName: yup.string().required(),
  address: yup.string().required(),
  countryId: yup.string().required(),
  cityId: yup.string().required(),
})

const initialValues: AdminCompanyFormData = {
  companyName: '',
  companyNumber: '',
  legalPersonName: '',
  address: '',
  countryId: '',
  cityId: '',
}

export default function CreateForm() {
  const router = useRouter()
  const { t } = useTranslation()

  const handleError = (e: AxiosError<ApiErrors>) => {
    const error = e.response

    if (error?.status === 409) {
      const message = error.data.message.map((el) => handleUniqueViolation(el.constraints, t))
      return AlertStore.show(message.join('/n'), 'error')
    }

    AlertStore.show(t('common:alerts.error'), 'error')
  }

  const mutation = useMutation<
    AxiosResponse<AdminCompanyResponse>,
    AxiosError<ApiErrors>,
    AdminCompanyFormData
  >({
    mutationFn: useCreateCompany(),
    onError: (error) => {
      handleError(error)
    },
    onSuccess: () => {
      AlertStore.show(t('common:alerts.success'), 'success')
      router.push(routes.admin.index)
    },
  })

  function handleSubmit(values: AdminCompanyFormData) {
    mutation.mutate(values)
  }

  return (
    <Grid container direction="column" component="section">
      <GenericForm
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormTextField
              type="text"
              label="companies:admin.fields.company-name"
              name="companyName"
              autoComplete="companies:admin.fields.company-name"
            />
          </Grid>
          <Grid item xs={12}>
            <FormTextField
              type="text"
              label="companies:admin.fields.company-number"
              name="companyNumber"
              autoComplete="companies:admin.fields.company-number"
            />
          </Grid>
          <Grid item xs={12}>
            <FormTextField
              type="text"
              label="companies:admin.fields.legal-person-name"
              name="legalPersonName"
              autoComplete="companies:admin.fields.legal-person-name"
            />
          </Grid>
          <Grid item xs={12}>
            <FormTextField
              type="text"
              name="address"
              autoComplete="companies:admin.fields.address"
              label="companies:admin.fields.address"
            />
          </Grid>
          <Grid item xs={6}>
            <p>
              {t('companies:admin.cta.select-country')}{' '}
              <Link href={routes.admin.countries.create} target="_blank">
                {t('companies:admin.cta.create-new')}
              </Link>
            </p>
            <CountrySelect formField="countryId" valueName="id" />
          </Grid>
          <Grid item xs={6}>
            <p>
              {t('companies:admin.cta.select-city')}{' '}
              <Link href={routes.admin.cities.create} target="_blank">
                {t('companies:admin.cta.create-new')}
              </Link>
            </p>
            <CitySelect name="cityId" />
          </Grid>
          <Grid item xs={12} margin="auto">
            <SubmitButton fullWidth label="companies:admin.cta.create" />
          </Grid>
        </Grid>
      </GenericForm>
    </Grid>
  )
}
