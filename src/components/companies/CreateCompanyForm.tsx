import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { Button, Grid, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import * as yup from 'yup'
import { useMutation } from 'react-query'
import { AxiosError, AxiosResponse } from 'axios'

import { useCreateCompany, useEditCompany } from 'service/restRequests'
import { routes } from 'common/routes'
import { ApiErrors, isAxiosError } from 'service/apiErrors'
import { companyName, name } from 'common/form/validation'
import { CompanyFormData, CompanyInput, CompanyResponse } from 'gql/companies'
import { AlertStore } from 'stores/AlertStore'
import FormTextField from 'components/common/form/FormTextField'
import GenericForm from 'components/common/form/GenericForm'

import CompaniesCitySelect from './CompaniesCitySelect'

const useStyles = makeStyles({
  cancelBtn: {
    marginLeft: 16,
    ':hover': {
      backgroundColor: '#bf0000',
    },
  },
})

const validationSchema: yup.SchemaOf<CompanyFormData> = yup.object().defined().shape({
  companyName: companyName.required(),
  companyNumber: yup.string().trim().required(),
  legalPersonName: name.required().trim(),
  countryCode: yup.string().trim(),
  cityId: yup.string().uuid(),
})

const defaults: CompanyInput = {
  id: '',
  companyName: '',
  companyNumber: '',
  legalPersonName: '',
  cityId: '',
  countryCode: '',
}

type Props = {
  initialValues?: CompanyInput
}

export default function CreateCompanyForm({ initialValues }: Props) {
  const { t } = useTranslation()
  const router = useRouter()
  const classes = useStyles()
  const mutation = useMutation<AxiosResponse<CompanyResponse>, AxiosError<ApiErrors>, CompanyInput>(
    {
      mutationFn: initialValues ? useEditCompany() : useCreateCompany(),
      onSuccess: () => AlertStore.show(t('common:alerts.message-sent'), 'success'),
    },
  )

  const cancelHandler = () => {
    router.back()
  }

  const submitHandler = async (values: CompanyInput) => {
    try {
      await mutation.mutateAsync({
        id: initialValues?.id,
        companyName: values.companyName,
        companyNumber: values.companyNumber,
        legalPersonName: values.legalPersonName,
        cityId: values.cityId,
        countryCode: values.countryCode,
      })
      router.push(routes.dashboard.companies)
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
        initialValues={initialValues || defaults}
        onSubmit={submitHandler}
        validationSchema={validationSchema}>
        <Grid item xs={12}>
          <Typography variant="h5" component="h2" sx={{ marginBottom: 2 }}>
            {initialValues ? t('companies:edit-form-heading') : t('companies:form-heading')}
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
              {initialValues ? t('companies:cta.edit') : t('companies:cta.add')}
            </Button>
            {initialValues && (
              <Button
                onClick={cancelHandler}
                variant="contained"
                color="error"
                className={classes.cancelBtn}>
                {t('companies:cta.cancel')}
              </Button>
            )}
          </Grid>
        </Grid>
      </GenericForm>
    </Grid>
  )
}
