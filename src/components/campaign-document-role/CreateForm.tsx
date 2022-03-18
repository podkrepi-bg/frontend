import React from 'react'
import { useMutation } from 'react-query'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { AxiosError, AxiosResponse } from 'axios'
import * as yup from 'yup'
import { Box, Button, Grid, Typography } from '@mui/material'
import { ApiErrors } from 'service/apiErrors'
import { AlertStore } from 'stores/AlertStore'
import GenericForm from 'components/common/form/GenericForm'
import FormTextField from 'components/common/form/FormTextField'
import SubmitButton from 'components/common/form/SubmitButton'
import { campaignDocumentRoleInput, campaignDocumentRoleResponse } from 'gql/campaign-document-role'
import { useCreateCampaignDocumentRole } from 'service/campaignDocumentRole'
import { routes } from 'common/routes'

const validationSchema: yup.SchemaOf<campaignDocumentRoleInput> = yup
  .object()
  .defined()
  .shape({
    name: yup.string().trim().min(3).max(50).required(),
    description: yup.string().trim().min(3).max(200).required(),
  })

export default function EditForm() {
  const router = useRouter()
  const { t } = useTranslation('campaign-document-role')

  const initialValues: campaignDocumentRoleInput = {
    name: '',
    description: '',
  }

  const mutationFn = useCreateCampaignDocumentRole()

  const mutation = useMutation<
    AxiosResponse<campaignDocumentRoleResponse>,
    AxiosError<ApiErrors>,
    campaignDocumentRoleInput
  >({
    mutationFn,
    onError: () => AlertStore.show(t('alerts.error'), 'error'),
    onSuccess: () => {
      AlertStore.show(t('alerts.create'), 'success')
      router.push(routes.admin.campaignDocumentRole.index)
    },
  })

  async function onSubmit(values: campaignDocumentRoleInput) {
    const data = {
      name: values.name,
      description: values.description,
    }
    mutation.mutate(data)
  }

  return (
    <GenericForm
      onSubmit={onSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}>
      <Box sx={{ marginTop: '5%', height: '62.6vh' }}>
        <Typography variant="h5" component="h2" sx={{ marginBottom: 2, textAlign: 'center' }}>
          {t('form-heading')}
        </Typography>
        <Grid container spacing={2} sx={{ width: 600, margin: '0 auto' }}>
          <Grid item xs={12}>
            <FormTextField type="text" label={t('Name')} name="name" autoComplete="name" />
          </Grid>
          <Grid item xs={12}>
            <FormTextField
              type="string"
              label={t('Description')}
              name="description"
              multiline
              rows={4}
            />
          </Grid>
          <Grid item xs={6}>
            <SubmitButton fullWidth label={t('cta.add')} />
          </Grid>
          <Grid item xs={6}>
            <Link href={routes.admin.campaignDocumentRole.index} passHref>
              <Button fullWidth>{t('cta.cancel')}</Button>
            </Link>
          </Grid>
        </Grid>
      </Box>
    </GenericForm>
  )
}
