import { useRouter } from 'next/router'
import { Button, Grid, Typography } from '@mui/material'
import * as yup from 'yup'
import { useMutation } from 'react-query'
import { useTranslation } from 'next-i18next'
import { AxiosError, AxiosResponse } from 'axios'
import { FormikHelpers } from 'formik'

import { createCompany } from 'common/rest'
import { routes } from 'common/routes'
import { ApiErrors, isAxiosError } from 'common/api-errors'
import { CompanyFormData, CompanyInput, CompanyResponse } from 'gql/companies'
import { AlertStore } from 'stores/AlertStore'
import FormTextField from 'components/common/form/FormTextField'
import GenericForm from 'components/common/form/GenericForm'

import CompaniesCitySelect from './CompaniesCitySelect'

const validationSchema: yup.SchemaOf<CompanyFormData> = yup
  .object()
  .defined()
  .shape({
    companyName: yup.string().trim().max(100).required(),
    companyNumber: yup.string().trim().required(),
    legalPersonName: yup.string().trim(),
    countryCode: yup.string().trim(),
    cityId: yup.string().uuid(),
  })

const defaults: CompanyFormData = {
  companyName: '',
  companyNumber: '',
  legalPersonName: '',
  cityId: '',
  countryCode: '',
}

export default function CreateCompanyForm({ initialValues = defaults }) {
  const { t } = useTranslation()
  const router = useRouter()

  const mutation = useMutation<AxiosResponse<CompanyResponse>, AxiosError<ApiErrors>, CompanyInput>(
    {
      mutationFn: createCompany,
      onSuccess: () => AlertStore.show(t('common:alerts.message-sent'), 'success'),
    },
  )

  const submitHandler = async (
    values: CompanyFormData,
    { resetForm }: FormikHelpers<CompanyFormData>,
  ) => {
    try {
      await mutation.mutateAsync({
        companyName: values.companyName,
        companyNumber: values.companyNumber,
        legalPersonName: values.legalPersonName || null,
        cityId: values.cityId || null,
        countryCode: values.countryCode || null,
      })
      resetForm()
      router.push(routes.dashboard.index)
    } catch (error) {
      if (isAxiosError(error)) {
        const { response } = error as AxiosError<{
          statusCode: number
          message: string
          error: string
        }>
        let alertText = 'common:alerts.error'
        if (response?.data.message.includes('Unique')) {
          alertText = 'companies:alerts.uniqueNumber'
        }
        AlertStore.show(t(alertText), 'error')
      }
    }
  }
  return (
    <Grid
      container
      direction="column"
      component="section"
      sx={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
      <GenericForm
        initialValues={initialValues}
        onSubmit={submitHandler}
        validationSchema={validationSchema}>
        <Grid item xs={12}>
          <Typography variant="h5" component="h2" sx={{ marginBottom: 2 }}>
            {t('companies:form-heading')}
          </Typography>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormTextField type="text" label="companies:title" name="companyName" />
          </Grid>
          <Grid item xs={12}>
            <FormTextField type="text" label="companies:number" name="companyNumber" />
          </Grid>
          <Grid item xs={12}>
            <FormTextField type="text" label="companies:representative" name="legalPersonName" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormTextField type="text" label="companies:countryCode" name="countryCode" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CompaniesCitySelect />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained">
              {t('companies:cta.add')}
            </Button>
          </Grid>
        </Grid>
      </GenericForm>
    </Grid>
  )
}
