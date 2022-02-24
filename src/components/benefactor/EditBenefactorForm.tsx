import React from 'react'
import * as yup from 'yup'
import { useRouter } from 'next/router'
import { FormikHelpers } from 'formik'
import { useMutation } from 'react-query'
import { Box, Button, Grid, Typography } from '@mui/material'
import { AxiosError, AxiosResponse } from 'axios'
import { useTranslation } from 'next-i18next'
import { makeStyles } from '@mui/styles'

import { routes } from 'common/routes'
import { AlertStore } from 'stores/AlertStore'
import { editBenefactor } from 'common/rest'
import { BenefactorFormData, BenefactorInput, BenefactorResponse } from 'gql/benefactor'
import GenericForm from 'components/common/form/GenericForm'
import FormTextField from 'components/common/form/FormTextField'
import { ApiErrors, isAxiosError, matchValidator } from 'common/api-errors'
import LinkButton from 'components/common/LinkButton'

const useStyles = makeStyles({
  container: {
    maxWidth: '700px',
    margin: '0 auto',
    padding: '30px',
    textAlign: 'center',
  },
})

const validationSchema: yup.SchemaOf<BenefactorFormData> = yup.object().defined().shape({
  extCustomerId: yup.string().required(),
  person: yup.string(),
})

const defaults: BenefactorFormData = {
  extCustomerId: '',
  person: '',
}

type BenefactorFormProps = {
  id: string
  initialValues?: BenefactorFormData
}

type EditBenefactorProp = {
  id: string
  data: BenefactorInput
}

export default function EditBenefactorForm({ id, initialValues = defaults }: BenefactorFormProps) {
  const classes = useStyles()
  const mutation = useMutation<
    AxiosResponse<BenefactorResponse>,
    AxiosError<ApiErrors>,
    EditBenefactorProp
  >({
    mutationFn: editBenefactor,
    onError: () => AlertStore.show(t('benefactor:alerts.edit-row.error'), 'error'),
    onSuccess: () => AlertStore.show(t('benefactor:alerts.edit-row.success'), 'success'),
  })

  const { t } = useTranslation()
  const router = useRouter()

  const onSubmit = async (
    values: BenefactorFormData,
    { setFieldError }: FormikHelpers<BenefactorFormData>,
  ) => {
    try {
      const data = {
        extCustomerId: values.extCustomerId,
        person: values.person,
      }
      await mutation.mutateAsync({
        id,
        data,
      })
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
        enableReinitialize={true}
        onSubmit={onSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}>
        <Box sx={{ marginTop: '5%', height: '62.6vh' }}>
          <Grid container spacing={2} sx={{ width: 600, margin: '0 auto' }}>
            <Grid item xs={12}>
              <Typography variant="h5" component="h2" sx={{ marginBottom: 2, textAlign: 'center' }}>
                {t('benefactor:form.edit-benefactor')}
              </Typography>
              {/* <Typography variant="h6">{t('benefactor:form.edit-benefactor')}</Typography> */}
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormTextField
                type="text"
                label="extCustomerId"
                name="extCustomerId"
                autoComplete="extCustomerId"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormTextField type="text" label="person" name="person" autoComplete="person" />
            </Grid>
            <Grid item xs={6}>
              <Button fullWidth variant="contained" type="submit" color="secondary">
                {t('benefactor:btns.save')}
              </Button>
            </Grid>
            <Grid item xs={6}>
              <LinkButton
                fullWidth
                variant="contained"
                color="primary"
                href={routes.benefactor.index}>
                {t('benefactor:btns.cancel')}
              </LinkButton>
            </Grid>
          </Grid>
        </Box>
      </GenericForm>
    </Grid>
  )
}
