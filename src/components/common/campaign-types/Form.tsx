import React, { useState } from 'react'
import { useMutation, UseQueryResult } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { AxiosError, AxiosResponse } from 'axios'
import * as yup from 'yup'
import {
  Box,
  Button,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material'

import { CampaignTypeFormData, CampaignTypesResponse } from 'gql/campaign-types'
import { routes } from 'common/routes'
import { ApiErrors, handleUniqueViolation } from 'service/apiErrors'
import { useCampaignType, useEditCampaignType, useCreateCampaignType } from 'service/campaignTypes'
import { createSlug } from 'common/util/createSlug'
import { AlertStore } from 'stores/AlertStore'
import GenericForm from 'components/common/form/GenericForm'
import FormTextField from 'components/common/form/FormTextField'
import SubmitButton from 'components/common/form/SubmitButton'
import { CampaignTypeCategory } from './categories'

const validationSchema = yup.object().defined().shape({
  name: yup.string().required(),
  description: yup.string().notRequired(),
})

export default function Form() {
  const router = useRouter()
  const { t } = useTranslation()
  let id = router.query.id
  const [selectedCategory, setCategory] = useState<string>('')
  //TODO: add parent-child campaignTypes
  //const campaignTypes = useCampaignTypesList().data

  let initialValues: CampaignTypeFormData = {
    name: '',
    category: CampaignTypeCategory.others,
    description: '',
  }

  if (id) {
    id = String(id)
    const { data }: UseQueryResult<CampaignTypesResponse> = useCampaignType(id)

    initialValues = {
      name: data?.name || '',
      category: data?.category || '',
      description: data?.description || '',
    }
  }
  const mutationFn = id ? useEditCampaignType(id) : useCreateCampaignType()

  const handleError = (e: AxiosError<ApiErrors>) => {
    const error = e.response

    if (error?.status === 409) {
      const message = error.data.message.map(() =>
        handleUniqueViolation({ campaignTypeSlug: '' }, t),
      )
      return AlertStore.show(message.join('/n'), 'error')
    }

    AlertStore.show(t('documents:alerts:error'), 'error')
  }

  const mutation = useMutation<
    AxiosResponse<CampaignTypesResponse>,
    AxiosError<ApiErrors>,
    CampaignTypeFormData
  >({
    mutationFn,
    onError: (error) => handleError(error),
    onSuccess: () => {
      AlertStore.show(id ? t('documents:alerts:edit') : t('documents:alerts:create'), 'success')
      router.push(routes.admin.campaignTypes.index)
    },
  })

  async function onSubmit(data: CampaignTypeFormData) {
    data.category = selectedCategory
    data.slug = createSlug(data.name)
    mutation.mutateAsync(data)
  }

  return (
    <GenericForm
      onSubmit={onSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}>
      <Box sx={{ height: '62.6vh', marginBottom: '9%' }}>
        <Typography variant="h5" component="h2" sx={{ textAlign: 'center' }}>
          {id ? t('campaign-types:forms:edit-heading') : t('campaign-types:forms:add-heading')}
        </Typography>
        <Grid
          sx={{ display: 'flex', marginTop: '1%' }}
          container
          direction="column"
          component="section"
          spacing={2}>
          <Grid item xs={6} md={6}>
            <FormTextField
              type="text"
              name="name"
              autoComplete="target-amount"
              label={t('campaign-types:grid:name')}
            />
          </Grid>
          <Grid item xs={6} md={6}>
            <InputLabel>{t('campaign-types:grid:category')}</InputLabel>
            <Select
              fullWidth
              size="small"
              sx={{
                height: '55%',
              }}
              name="category"
              defaultValue={initialValues.category || ''}
              onChange={(e: SelectChangeEvent) => {
                setCategory(e.target.value)
              }}>
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {Object.values(CampaignTypeCategory).map((type) => {
                return (
                  <MenuItem key={type} value={type}>
                    {t(`campaigns:filters.${type}`)}
                  </MenuItem>
                )
              })}
            </Select>
          </Grid>
          <Grid item xs={12}>
            <FormTextField
              type="text"
              name="description"
              autoComplete="target-amount"
              label={t('campaign-types:grid:description')}
              multiline
              rows={3}
            />
          </Grid>
          <Grid item xs={6}>
            <SubmitButton fullWidth label={t('documents:cta:submit')} />
          </Grid>
          <Grid item xs={6}>
            <Link href={routes.admin.campaignTypes.index} passHref>
              <Button fullWidth>{t('documents:cta:cancel')}</Button>
            </Link>
          </Grid>
        </Grid>
      </Box>
    </GenericForm>
  )
}
