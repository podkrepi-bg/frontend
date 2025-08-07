import React from 'react'
import * as yup from 'yup'
import { useRouter } from 'next/router'
import { FormikHelpers } from 'formik'
import { useMutation } from '@tanstack/react-query'
import { Grid2, Box, Typography, Link, Button } from '@mui/material'
import { AxiosError, AxiosResponse } from 'axios'
import { useTranslation } from 'next-i18next'

import { routes } from 'common/routes'
import { AlertStore } from 'stores/AlertStore'
import { createBenefactor } from 'service/benefactor'
import { BenefactorFormData, BenefactorInput, BenefactorResponse } from 'gql/benefactor'
import GenericForm from 'components/common/form/GenericForm'
import SubmitButton from 'components/common/form/SubmitButton'
import FormTextField from 'components/common/form/FormTextField'

import { ApiErrors, isAxiosError, matchValidator } from 'service/apiErrors'

const validationSchema: yup.SchemaOf<BenefactorFormData> = yup.object().defined().shape({
  // id: yup.string().required(),
  extCustomerId: yup.string().required(),
  // createdAt: yup.string(),
  // updatedAt: yup.string(),
  person: yup.string().required(),
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
  const { t } = useTranslation('benefactor')

  const mutation = useMutation<
    AxiosResponse<BenefactorResponse>,
    AxiosError<ApiErrors>,
    BenefactorInput
  >({
    mutationFn: createBenefactor,
    onError: () => AlertStore.show(t('alerts.error'), 'error'),
    onSuccess: () => AlertStore.show(t('alerts.create'), 'success'),
  })

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
      router.push(routes.admin.benefactor.index)
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
    <Grid2
      container
      direction="column"
      component="section"
      sx={{
        maxWidth: '700px',
        margin: '0 auto',
      }}>
      <GenericForm
        onSubmit={onSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}>
        <Box sx={{ marginTop: '5%', height: '62.6vh' }}>
          <Grid2 container spacing={3}>
            <Grid2 size={12}>
              <Typography variant="h6">{t('form-heading')}</Typography>
            </Grid2>
            {/* <Grid2 item xs={12} sm={4}>
            <FormTextField
              type="text"
              label="auth:fields.id"
              name="id"
              autoComplete="id"
            />
          </Grid2> */}
            <Grid2
              size={{
                xs: 12,
                sm: 4,
              }}>
              <FormTextField
                type="text"
                label={t('customerId')}
                name="extCustomerId"
                autoComplete="extCustomerId"
              />
            </Grid2>
            <Grid2
              size={{
                xs: 12,
                sm: 4,
              }}>
              <FormTextField
                type="text"
                label={t('personId')}
                name="person"
                autoComplete="person"
              />
            </Grid2>
            <Grid2 size={12}>
              <SubmitButton fullWidth label={t('cta.submit')} />
            </Grid2>
            <Grid2 size={6}>
              <Link href={routes.admin.benefactor.index}>
                <Button>{t('cta.cancel')}</Button>
              </Link>
            </Grid2>
          </Grid2>
        </Box>
      </GenericForm>
    </Grid2>
  )
}
