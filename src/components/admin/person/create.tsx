import React from 'react'
import * as yup from 'yup'
import { useRouter } from 'next/router'
import { FormikHelpers } from 'formik'
import { useMutation } from 'react-query'
import { useTranslation } from 'next-i18next'
import { AxiosError, AxiosResponse } from 'axios'
import { Button, Grid, Typography } from '@mui/material'

import { CampaignTypeFormData, CampaignTypesInput, CampaignTypesResponse } from 'gql/campaign-types'
import { createCampaignType } from 'common/rest'
import { AlertStore } from './layout/NotificationsAlert/AlertStore'
import GenericForm from 'components/common/form/GenericForm'
import SubmitButton from 'components/common/form/SubmitButton'
import FormTextField from 'components/common/form/FormTextField'
import { ApiErrors, isAxiosError, matchValidator } from 'common/api-errors'
import BootcampersLayout from './layout/Layout'
import { useTheme } from '@mui/styles'

const validationSchema: yup.SchemaOf<CampaignTypeFormData> = yup.object().defined().shape({
  parentId: yup.string().required(),
  name: yup.string().required(),
  description: yup.string().required(),
  slug: yup.string().optional(),
})

const defaults: CampaignTypeFormData = {
  name: '',
  description: '',
  slug: '',
  parentId: '',
} as CampaignTypeFormData

export type CampaignTypeFormProps = { initialValues?: CampaignTypeFormData }

export default function CreateBootcamper({ initialValues = defaults }: CampaignTypeFormProps) {
  const theme = useTheme()
  const { t } = useTranslation()
  const router = useRouter()

  const mutation = useMutation<
    AxiosResponse<CampaignTypesResponse>,
    AxiosError<ApiErrors>,
    CampaignTypesInput
  >({
    mutationFn: createCampaignType,
    onError: () => AlertStore.show(t('common:alerts.error'), 'error'),
    onSuccess: () => AlertStore.show(t('common:alerts.message-sent'), 'success'),
  })

  const onSubmit = async (
    values: CampaignTypeFormData,
    { setFieldError, resetForm }: FormikHelpers<CampaignTypeFormData>,
  ) => {
    try {
      await mutation.mutateAsync({
        parentId: values.parentId,
        name: values.name,
        description: values.description,
      } as CampaignTypeFormData)
      resetForm()
      router.push('/admin/campaign-types')
      AlertStore.show('Successfully added new campaign type', 'success', 1)
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
    <BootcampersLayout>
      <Grid container direction="column" component="section" style={{ marginLeft: '10%' }}>
        <Grid item xs={12} style={{ marginTop: '10%', marginLeft: '26%' }}>
          <Typography variant="h5" component="h2" style={{ marginBottom: '1%' }}>
            ADD CAMPAIGN TYPE
          </Typography>
        </Grid>
        <GenericForm
          onSubmit={onSubmit}
          initialValues={initialValues}
          validationSchema={validationSchema}>
          <Grid container spacing={1}>
            <Grid item sm={5}>
              <FormTextField
                style={{ marginTop: '2%', width: '80%' }}
                type="text"
                name="name"
                autoComplete="target-amount"
                label="Name"
              />
            </Grid>
            <Grid item sm={5}>
              <FormTextField
                style={{ marginTop: '2%', width: '80%', height: '30px' }}
                type="text"
                name="description"
                autoComplete="target-amount"
                label="Description"
                multiline
                rows={3.5}
              />
            </Grid>
            <Grid item sm={5}>
              <FormTextField
                style={{ marginTop: '2%', width: '80%' }}
                type="text"
                name="parentId"
                autoComplete="target-amount"
                label="Category"
              />
            </Grid>
            <Grid
              item
              xs={12}
              style={{
                display: 'flex',
                flexDirection: 'column',
                marginLeft: '15%',
                marginTop: '1.1%',
              }}>
              <SubmitButton
                style={{ width: '50%' }}
                label="Add campagin type"
                loading={mutation.isLoading}
                sx={{ backgroundColor: theme.palette.secondary.main }}
              />
              <Button
                onClick={() => {
                  router.push('/admin/campaign-types')
                }}
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
    </BootcampersLayout>
  )
}
