import React from 'react'
import { useRouter } from 'next/router'
import { FormikHelpers } from 'formik'
import { useMutation } from 'react-query'
import { useTranslation } from 'next-i18next'
import { AxiosError, AxiosResponse } from 'axios'
import { Button, Grid, Typography } from '@mui/material'

import { useEditBeneficiary, useViewBeneficiary } from 'service/beneficiary'
import GenericForm from 'components/common/form/GenericForm'
import SubmitButton from 'components/common/form/SubmitButton'
import FormTextField from 'components/common/form/FormTextField'
import { ApiErrors, isAxiosError, matchValidator } from 'service/apiErrors'
import { useTheme } from '@mui/styles'
import { BeneficiaryFormData } from 'gql/beneficiary'
import { AlertStore } from 'stores/AlertStore'
import { validationSchema } from './BeneficiaryForm'

const defaults: BeneficiaryFormData = {
  type: '',
  personId: '',
  companyId: '',
  coordinatorId: '',
  countryCode: '',
  cityId: '',
  description: '',
  publicData: '',
  privateData: '',
  campaigns: {},
}

export type BeneficiaryFormProps = { initialValues?: BeneficiaryFormData }

export default function EditBootcamper({ initialValues = defaults }: BeneficiaryFormProps) {
  const theme = useTheme()

  const router = useRouter()
  const id = Array.isArray(router.query.id) ? router.query.id[0] : router.query.id || ''

  const info = useViewBeneficiary(id)

  if (!info.isLoading) {
    defaults.type = info.data?.type || ''
    defaults.cityId = info.data?.cityId || ''
    defaults.companyId = info.data?.companyId || ''
    defaults.coordinatorId = info.data?.coordinatorId || ''
    defaults.countryCode = info.data?.countryCode || ''
    defaults.description = info.data?.description || ''
    defaults.personId = info.data?.personId || ''
    defaults.privateData = info.data?.privateData || ''
    defaults.publicData = info.data?.publicData || ''
    defaults.campaigns = Object(info.data?.campaigns) || {}
  }

  const { t } = useTranslation()

  const mutation = useMutation<
    AxiosResponse<BeneficiaryFormData>,
    AxiosError<ApiErrors>,
    BeneficiaryFormData
  >({
    mutationFn: useEditBeneficiary(id),
    onError: () => AlertStore.show(t('common:alerts.error'), 'error'),
    onSuccess: () => AlertStore.show(t('common:alerts.message-sent'), 'success'),
  })

  const onSubmit = async (
    values: BeneficiaryFormData,
    { setFieldError, resetForm }: FormikHelpers<BeneficiaryFormData>,
  ) => {
    try {
      // await axios.put(endpoints.campaignTypes.editCampaignType(id).url, values)
      mutation.mutateAsync(values)
      resetForm()
      AlertStore.show('Successfully edited beneficiary', 'success')
      router.push('/admin/beneficiary')
    } catch (error) {
      console.error(error)
      AlertStore.show('An error occured', 'error')
      if (isAxiosError(error)) {
        const { response } = error as AxiosError<ApiErrors>
        response?.data.message.map(({ property, constraints }) => {
          setFieldError(property, t(matchValidator(constraints)))
        })
      }
    }
  }

  return (
    <Grid container direction="column" component="section" style={{ marginLeft: '10%' }}>
      <Grid item xs={12} style={{ marginTop: '10%', marginLeft: '25%' }}>
        <Typography variant="h5" component="h2">
          EDIT BENEFICIARY
        </Typography>
      </Grid>
      <GenericForm onSubmit={onSubmit} initialValues={defaults} validationSchema={validationSchema}>
        <Grid container spacing={3}>
          <Grid item sm={5}>
            <FormTextField
              style={{ marginTop: '2%', width: '80%' }}
              type="text"
              name="type"
              autoComplete="target-amount"
              label="Type"
            />
          </Grid>
          <Grid item sm={5}>
            <FormTextField
              style={{ marginTop: '2%', width: '80%' }}
              type="text"
              name="personId"
              autoComplete="target-amount"
              label="Person"
            />
          </Grid>
          <Grid item sm={5}>
            <FormTextField
              style={{ marginTop: '2%', width: '80%' }}
              type="text"
              name="companyId"
              autoComplete="target-amount"
              label="Company (optional)"
            />
          </Grid>
          <Grid item sm={5}>
            <FormTextField
              style={{ marginTop: '2%', width: '80%' }}
              type="text"
              name="coordinatorId"
              autoComplete="target-amount"
              label="Coordinator"
            />
          </Grid>
          <Grid item sm={5}>
            <FormTextField
              style={{ marginTop: '2%', width: '80%' }}
              type="text"
              name="countryCode"
              autoComplete="target-amount"
              label="Country code"
            />
          </Grid>
          <Grid item sm={5}>
            <FormTextField
              style={{ marginTop: '2%', width: '80%' }}
              type="text"
              name="cityId"
              autoComplete="target-amount"
              label="City name"
            />
          </Grid>
          <Grid item sm={5}>
            <FormTextField
              style={{ marginTop: '2%', width: '193%', height: '30px' }}
              type="text"
              name="description"
              autoComplete="target-amount"
              label="Description"
              multiline
              rows={1.5}
            />
          </Grid>
          <Grid
            item
            xs={12}
            style={{
              display: 'flex',
              flexDirection: 'column',
              marginLeft: '15%',
              marginTop: '4%',
            }}>
            <SubmitButton
              style={{ width: '50%' }}
              label="Edit"
              loading={mutation.isLoading}
              sx={{ backgroundColor: theme.palette.secondary.main }}
            />
            <Button
              href="/admin/beneficiary"
              variant="outlined"
              sx={{
                width: '50%',
                marginTop: '1%',
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.background.default,
              }}>
              Cancel
            </Button>
          </Grid>
        </Grid>
      </GenericForm>
    </Grid>
  )
}
