import React from 'react'
import { useRouter } from 'next/router'
import { FormikHelpers } from 'formik'
import { useMutation } from 'react-query'
import { useTranslation } from 'next-i18next'
import { AxiosError, AxiosResponse } from 'axios'
import { Button, Grid, Typography } from '@mui/material'

import { editCampaignType } from 'common/rest'
import GenericForm from 'components/common/form/GenericForm'
import SubmitButton from 'components/common/form/SubmitButton'
import FormTextField from 'components/common/form/FormTextField'
import { ApiErrors, isAxiosError, matchValidator } from 'common/api-errors'
import { useViewCampaignType } from 'common/hooks/campaign-types'
// import { axios } from 'service/api-client'
// import { endpoints } from 'common/api-endpoints'
import { useTheme } from '@mui/styles'
import { CampaignTypeFormData } from 'gql/campaign-types'
import { AlertStore } from 'stores/AlertStore'
import { validationSchema } from './PersonForm'

const defaults: CampaignTypeFormData = {
  name: '',
  description: '',
  slug: '',
  parentId: '',
}

export type CampaignTypeFormProps = { initialValues?: CampaignTypeFormData }

export default function EditBootcamper({ initialValues = defaults }: CampaignTypeFormProps) {
  const theme = useTheme()

  const router = useRouter()
  const id = Array.isArray(router.query.id) ? router.query.id[0] : router.query.id || ''

  const editWrapper = (id: string) => {
    return async (values: CampaignTypeFormData) => {
      return await editCampaignType(id, values)
    }
  }

  const info = useViewCampaignType(id)

  if (!info.isLoading) {
    initialValues.parentId = info.data?.parentId || ''
    initialValues.name = info.data?.name || ''
    initialValues.description = info.data?.description || ''
  }

  const { t } = useTranslation()

  const mutation = useMutation<
    AxiosResponse<CampaignTypeFormData>,
    AxiosError<ApiErrors>,
    CampaignTypeFormData
  >({
    mutationFn: editWrapper(id),
    onError: () => AlertStore.show(t('common:alerts.error'), 'error'),
    onSuccess: () => AlertStore.show(t('common:alerts.message-sent'), 'success'),
  })

  const onSubmit = async (
    values: CampaignTypeFormData,
    { setFieldError, resetForm }: FormikHelpers<CampaignTypeFormData>,
  ) => {
    try {
      // await axios.put(endpoints.campaignTypes.editCampaignType(id).url, values)
      mutation.mutateAsync(values)
      resetForm()
      AlertStore.show('Successfully edited campaign type', 'success')
      router.push('/admin/campaign-types')
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
          EDIT CAMPAIGN TYPE
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
  )
}
