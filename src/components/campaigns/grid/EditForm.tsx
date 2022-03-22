import React, { useState } from 'react'
import * as yup from 'yup'
import { useRouter } from 'next/router'
import { FormikHelpers } from 'formik'
import { useMutation, UseQueryResult } from 'react-query'
import { useTranslation } from 'next-i18next'
import { parse, isDate } from 'date-fns'
import { AxiosError, AxiosResponse } from 'axios'
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  Link,
  MenuItem,
  Select,
  Typography,
} from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import createStyles from '@mui/styles/createStyles'

import { routes } from 'common/routes'
import { useEditCampaign } from 'service/campaign'
import { AlertStore } from 'stores/AlertStore'
import { createSlug } from 'common/util/createSlug'
import GenericForm from 'components/common/form/GenericForm'
import SubmitButton from 'components/common/form/SubmitButton'
import FormTextField from 'components/common/form/FormTextField'
import AcceptTermsField from 'components/common/form/AcceptTermsField'
import { ApiErrors, isAxiosError, matchValidator } from 'service/apiErrors'
import { CampaignResponse, CampaignFormData, CampaignInput } from 'gql/campaigns'
import AcceptPrivacyPolicyField from 'components/common/form/AcceptPrivacyPolicyField'

import { format } from 'date-fns'
import CampaignTypeSelect from '../CampaignTypeSelect'
import FileUploadModal from '../FileUploadModal'
import { useViewCampaign } from 'common/hooks/campaigns'
import { useCoordinatorsList } from 'common/hooks/coordinators'
import { useBeneficiariesListPerson } from 'common/hooks/beneficiary'

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
    beneficiaryId: yup.string().required(),
    coordinatorId: yup.string().required(),
    startDate: yup.date().transform(parseDateString).required(),
    endDate: yup
      .date()
      .transform(parseDateString)
      .min(yup.ref('startDate'), `end date can't be before start date`),
    terms: yup.bool().required().oneOf([true], 'validation:terms-of-use'),
    gdpr: yup.bool().required().oneOf([true], 'validation:terms-of-service'),
  })

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

export default function CampaignForm() {
  const classes = useStyles()
  const { t } = useTranslation()
  const router = useRouter()
  const id = router.query.id
  const { data: coordinators } = useCoordinatorsList()
  const { data: beneficiaries } = useBeneficiariesListPerson()
  const { data: campaign }: UseQueryResult<CampaignResponse> = useViewCampaign(String(id))
  const [coordinatorId, setCoordinatorId] = useState<string>(campaign?.coordinatorId)
  const [beneficiaryId, setBeneficiaryId] = useState<string>(campaign?.beneficiaryId)

  const initialValues: CampaignFormData = {
    title: campaign?.title || '',
    coordinatorId: coordinatorId,
    campaignTypeId: campaign?.campaignTypeId,
    beneficiaryId: beneficiaryId,
    targetAmount: campaign?.targetAmount || 0,
    startDate: format(new Date(campaign?.startDate), formatString),
    endDate: format(new Date(campaign?.endDate).setMonth(new Date().getMonth() + 1), formatString),
    description: campaign?.description || '',
    terms: true,
    gdpr: true,
  }

  const mutation = useMutation<
    AxiosResponse<CampaignResponse>,
    AxiosError<ApiErrors>,
    CampaignInput
  >({
    mutationFn: useEditCampaign(String(id)),
    onError: () => AlertStore.show(t('common:alerts.error'), 'error'),
    onSuccess: () => AlertStore.show(t('common:alerts.message-sent'), 'success'),
  })

  const onSubmit = async (
    values: CampaignFormData,
    { setFieldError }: FormikHelpers<CampaignFormData>,
  ) => {
    try {
      const data = {
        title: values.title,
        slug: createSlug(values.title),
        description: values.description,
        targetAmount: values.targetAmount,
        startDate: values.startDate,
        endDate: values.endDate,
        essence: campaign!.essence,
        campaignTypeId: values.campaignTypeId,
        beneficiaryId: beneficiaryId,
        coordinatorId: coordinatorId,
        currency: 'BGN',
      }
      await mutation.mutateAsync(data)
      router.push(routes.admin.campaigns.index)
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
            <FormControl fullWidth size="small" variant="outlined">
              <InputLabel>{t('Кординатор')}</InputLabel>
              <Select
                fullWidth
                label={t('Кординатор')}
                id="coordinatorId"
                name="coordinatorId"
                value={coordinatorId}
                onChange={(event) => setCoordinatorId(event.target.value)}>
                <MenuItem value="" disabled>
                  {t('Кординатор')}
                </MenuItem>
                {coordinators?.map((coordinator, index) => (
                  <MenuItem key={index} value={coordinator.id}>
                    {coordinator.person.firstName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth size="small" variant="outlined">
              <InputLabel>{t('Бенефициент')}</InputLabel>
              <Select
                fullWidth
                label={t('Бенефициент')}
                id="beneficiaryId"
                name="beneficiaryId"
                value={beneficiaryId}
                onChange={(event) => setBeneficiaryId(event.target.value)}>
                <MenuItem value="" disabled>
                  {t('Бенефициент')}
                </MenuItem>
                {beneficiaries?.map((beneficiary, index) => (
                  <MenuItem key={index} value={beneficiary.id}>
                    {beneficiary.person.firstName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
            <Link href={routes.admin.campaigns.index}>
              <Button fullWidth={true}>{t('Отказ')}</Button>
            </Link>
          </Grid>
        </Grid>
      </GenericForm>
    </Grid>
  )
}
