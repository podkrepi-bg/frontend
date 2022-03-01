import React from 'react'
import * as yup from 'yup'
import { useRouter } from 'next/router'
import { FormikHelpers } from 'formik'
import { useMutation } from 'react-query'
import { Grid, Box, Typography, Link, Button } from '@mui/material'
import { AxiosError, AxiosResponse } from 'axios'
import { useTranslation } from 'next-i18next'
import { makeStyles } from '@mui/styles'

import { routes } from 'common/routes'
import { AlertStore } from 'stores/AlertStore'
import { createBenefactor } from 'service/restRequests'
import { BenefactorFormData, BenefactorInput, BenefactorResponse } from 'gql/benefactor'
import GenericForm from 'components/common/form/GenericForm'
import SubmitButton from 'components/common/form/SubmitButton'
import FormTextField from 'components/common/form/FormTextField'

import { ApiErrors, isAxiosError, matchValidator } from 'service/apiErrors'
import { stringify } from 'querystring'

const useStyles = makeStyles({
  container: {
    maxWidth: '700px',
    margin: '0 auto',
  },
})

const validationSchema: yup.SchemaOf<BenefactorFormData> = yup.object().defined().shape({
  // id: yup.string().required(),
  extCustomerId: yup.string().required(),
  // createdAt: yup.string(),
  // updatedAt: yup.string(),
  person: yup.string(),
})

const defaults: BenefactorFormData = {
  // id: "",
  extCustomerId: '',
  // createdAt: "",
  // updatedAt: "",
  person: '',
}

type BenefactorFormProps = { initialValues?: BenefactorFormData }

export default function AddBenefactorForm({ initialValues = defaults }: BenefactorFormProps) {
  const classes = useStyles()
  const mutation = useMutation<
    AxiosResponse<BenefactorResponse>,
    AxiosError<ApiErrors>,
    BenefactorInput
  >({
    mutationFn: createBenefactor,
    onError: () => AlertStore.show(t('alerts:error'), 'error'),
    onSuccess: () => AlertStore.show(t('alerts:create'), 'success'),
  })

  const { t } = useTranslation('benefactor')
  const router = useRouter()

  const onSubmit = async (
    values: BenefactorFormData,
    { setFieldError, resetForm }: FormikHelpers<BenefactorFormData>,
  ) => {
    try {
      const data = {
        // id: values.id,
        extCustomerId: values.extCustomerId,
        // createdAt: values.createdAt,
        // updatedAt: values.updatedAt,
        person: values.person,
      }
      await mutation.mutateAsync(data)
      resetForm()
      router.push(routes.benefactor.index)
    } catch (error) {
      console.error(error)
      if (isAxiosError(error)) {
        const { response } = error as AxiosError<ApiErrors>
        response?.data.message.map(({ property, constraints }) => {
          setFieldError(property, t(matchValidator(constraints)))
        })
      }
    }
  }
  return (
    <Grid container direction="column" component="section" className={classes.container}>
      <GenericForm
        onSubmit={onSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}>
        <Box sx={{ marginTop: '5%', height: '62.6vh' }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6">{t('form-heading')}</Typography>
            </Grid>
            {/* <Grid item xs={12} sm={4}>
            <FormTextField
              type="text"
              label="auth:fields.id"
              name="id"
              autoComplete="id"
            />
          </Grid> */}
            <Grid item xs={12} sm={4}>
              <FormTextField
                type="text"
                label={t('customerId')}
                name="extCustomerId"
                autoComplete="extCustomerId"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormTextField
                type="text"
                label={t('personId')}
                name="person"
                autoComplete="person"
              />
            </Grid>
            <Grid item xs={12}>
              <SubmitButton fullWidth label={t('cta.submit')} />
            </Grid>
            <Grid item xs={6}>
              <Link href={routes.benefactor.index}>
                <Button>{t('cta.cancel')}</Button>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </GenericForm>
    </Grid>
  )
}
