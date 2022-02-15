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
import { createCampaign } from 'service/restRequests'
import { AlertStore } from 'stores/AlertStore'
import { createSlug } from 'common/util/createSlug'
import PersonDialog from 'components/person/PersonDialog'
import GenericForm from 'components/common/form/GenericForm'
import SubmitButton from 'components/common/form/SubmitButton'
import FormTextField from 'components/common/form/FormTextField'
import AcceptTermsField from 'components/common/form/AcceptTermsField'
import { ApiErrors, isAxiosError, matchValidator } from 'service/apiErrors'
import { CampaignResponse, CampaignFormData, CampaignInput } from 'gql/campaigns'
import AcceptPrivacyPolicyField from 'components/common/form/AcceptPrivacyPolicyField'

import CampaignTypeSelect from './CampaignTypeSelect'
import FileUploadModal from './FileUploadModal'

const formatString = 'yyyy-MM-dd'

const parseDateString = (value: string, originalValue: string) => {
  const parsedDate = isDate(originalValue)
    ? originalValue
    : parse(originalValue, formatString, new Date())

  return parsedDate
}

const validationSchema: yup.SchemaOf<CampaignFormData> = yup
  .object()
  .defined()
  .shape({
    title: yup.string().trim().min(10).max(100).required(),
    description: yup.string().trim().min(50).max(500).required(),
    targetAmount: yup.number().required(),
    campaignTypeId: yup.string().uuid().required(),
    beneficiaryId: yup.string().uuid().required(),
    coordinatorId: yup.string().uuid().required(),
    startDate: yup.date().transform(parseDateString).required(),
    endDate: yup
      .date()
      .transform(parseDateString)
      .min(yup.ref('startDate'), `end date can't be before start date`),
    terms: yup.bool().required().oneOf([true], 'validation:terms-of-use'),
    gdpr: yup.bool().required().oneOf([true], 'validation:terms-of-service'),
  })

const defaults: CampaignFormData = {
  title: '',
  campaignTypeId: '',
  beneficiaryId: '',
  coordinatorId: '',
  targetAmount: 1000,
  startDate: format(new Date(), formatString),
  endDate: format(new Date().setMonth(new Date().getMonth() + 1), formatString),
  description: '',
  terms: false,
  gdpr: false,
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

export type CampaignFormProps = { initialValues?: CampaignFormData }

export default function CampaignForm({ initialValues = defaults }: CampaignFormProps) {
  const classes = useStyles()
  const { t } = useTranslation()
  const router = useRouter()
  const [coordinator, setCoordinator] = useState<PersonFormData>()
  const [beneficiary, setBeneficiary] = useState<PersonFormData>()

  const mutation = useMutation<
    AxiosResponse<CampaignResponse>,
    AxiosError<ApiErrors>,
    CampaignInput
  >({
    mutationFn: createCampaign,
    onError: () => AlertStore.show(t('common:alerts.error'), 'error'),
    onSuccess: () => AlertStore.show(t('common:alerts.message-sent'), 'success'),
  })

  const onSubmit = async (
    values: CampaignFormData,
    { setFieldError, resetForm }: FormikHelpers<CampaignFormData>,
  ) => {
    try {
      const response = await mutation.mutateAsync({
        title: values.title,
        slug: createSlug(values.title),
        description: values.description,
        targetAmount: values.targetAmount,
        startDate: values.startDate,
        endDate: values.endDate,
        essence: '',
        campaignTypeId: values.campaignTypeId,
        beneficiaryId: values.beneficiaryId,
        coordinatorId: values.coordinatorId,
        currency: 'BGN',
      })
      resetForm()
      router.push(routes.campaigns.viewCampaignBySlug(response.data.slug))
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
          {t('bankaccounts:form-heading')}
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
              name="title"
              autoComplete="title"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CampaignTypeSelect />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormTextField
              type="number"
              name="targetAmount"
              autoComplete="target-amount"
              label="campaigns:campaign.amount"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormTextField
              type="date"
              name="startDate"
              label="campaigns:campaign.start-date"
              helperText={null}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormTextField
              type="date"
              name="endDate"
              label="campaigns:campaign.end-date"
              helperText={null}
            />
          </Grid>
          <Grid item xs={12}>
            <FormTextField
              rows={5}
              multiline
              type="text"
              name="description"
              label="campaigns:campaign.description"
              autoComplete="description"
              className={classes.message}
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
          <Grid item xs={12} sm={6}>
            {beneficiary ? (
              <Typography fontWeight="bold" variant="body2">
                {beneficiary?.firstName} {beneficiary?.lastName}
              </Typography>
            ) : (
              <PersonDialog
                type="beneficiary"
                label={t('campaigns:campaign.beneficiary.add')}
                onSubmit={async (values: PersonFormData) => {
                  setBeneficiary(values)
                  console.log('new beneficiary', { values })
                }}
              />
            )}
            <input type="hidden" name="beneficiaryId" />
          </Grid>
          <Grid item xs={12}>
            <FileUploadModal />
          </Grid>
          <Grid item xs={12}>
            <AcceptTermsField name="terms" />
            <AcceptPrivacyPolicyField name="gdpr" />
          </Grid>
          <Grid item xs={12}>
            <SubmitButton fullWidth label="campaigns:cta.submit" loading={mutation.isLoading} />
          </Grid>
        </Grid>
      </GenericForm>
    </Grid>
  )
}
