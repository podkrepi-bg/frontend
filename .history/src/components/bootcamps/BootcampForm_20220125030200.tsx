import React, { useState } from 'react'
import * as yup from 'yup'
import { useRouter } from 'next/router'
import { FormikHelpers } from 'formik'
import { useMutation } from 'react-query'
import { useTranslation } from 'next-i18next'
import { format, parse, isDate } from 'date-fns'
import { AxiosError, AxiosResponse } from 'axios'
import { Grid, Typography } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import createStyles from '@mui/styles/createStyles'

import { routes } from 'common/routes'
import { PersonFormData } from 'gql/person'
import { createBootcamp } from 'common/rest'
import { AlertStore } from 'stores/AlertStore'
import { createSlug } from 'common/util/createSlug'
import PersonDialog from 'components/person/PersonDialog'
import GenericForm from 'components/common/form/GenericForm'
import SubmitButton from 'components/common/form/SubmitButton'
import FormTextField from 'components/common/form/FormTextField'
import AcceptTermsField from 'components/common/form/AcceptTermsField'
import { ApiErrors, isAxiosError, matchValidator } from 'common/api-errors'
import { BootcampResponse, BootcampFormData, BootcampInput } from 'gql/bootcamps'
import AcceptPrivacyPolicyField from 'components/common/form/AcceptPrivacyPolicyField'

const formatString = 'yyyy-MM-dd'

const parseDateString = (value: string, originalValue: string) => {
  const parsedDate = isDate(originalValue)
    ? originalValue
    : parse(originalValue, formatString, new Date())

  return parsedDate
}

const validationSchema: yup.SchemaOf<BootcampFormData> = yup
  .object()
  .defined()
  .shape({
    firstName: yup.string().trim().min(10).max(100).required(),
    lastName: yup.string().trim().min(50).max(500).required(),
  })

const defaults: BootcampFormData = {
  firstName: '',
  lastName: '',
}

const useStyles = makeStyles((theme) =>
  createStyles({
    heading: {
      marginBottom: theme.spacing(5),
      color: theme.palette.primary.dark,
      textAlign: 'center',
    },
    message: {
      '& textarea': { resize: 'vertical' },
    },
  }),
)

export type BootcampFormProps = { initialValues?: BootcampFormData }

export default function BootcampForm({ initialValues = defaults }: BootcampFormProps) {
  const classes = useStyles()
  const { t } = useTranslation()
  const router = useRouter()

  const mutation = useMutation<
    AxiosResponse<BootcampResponse>,
    AxiosError<ApiErrors>,
    BootcampInput
  >({
    mutationFn: createBootcamp,
    onError: () => AlertStore.show(t('common:alerts.error'), 'error'),
    onSuccess: () => AlertStore.show(t('common:alerts.message-sent'), 'success'),
  })

  const onSubmit = async (
    values: BootcampFormData,
    { setFieldError, resetForm }: FormikHelpers<BootcampFormData>,
  ) => {
    try {
      const response = await mutation.mutateAsync({
        firstName: values.firstName,
        lastName: values.lastName,
      })
      resetForm()
      router.push(routes.campaigns.viewCampaignBySlug(response.data.id))
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
    <Grid container direction="column" component="section">
      <Grid item xs={12}>
        <Typography variant="h5" component="h2" className={classes.heading}>
          {t('campaigns:form-heading')}
        </Typography>
      </Grid>
      <GenericForm
        onSubmit={onSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormTextField
              type="text"
              label="campaigns:campaign.title"
              name="firstName"
              autoComplete="title"
            />
          </Grid>
          <Grid item xs={12}>
            <FormTextField
              type="text"
              label="campaigns:campaign.title"
              name="lastName"
              autoComplete="title"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            {coordinator ? (
              <Typography fontWeight="bold" variant="body2">
                {coordinator?.firstName} {coordinator?.lastName}
              </Typography>
            ) : (
              <PersonDialog
                type="coordinator"
                label={t('campaigns:campaign.coordinator.add')}
                onSubmit={async (values: PersonFormData) => {
                  setCoordinator(values)
                  console.log('new coordinator', { values })
                }}
              />
            )}
            <input type="hidden" name="coordinatorId" />
          </Grid>
          <Grid item xs={12}>
            <SubmitButton fullWidth label="campaigns:cta.submit" loading={mutation.isLoading} />
          </Grid>
        </Grid>
      </GenericForm>
    </Grid>
  )
}
