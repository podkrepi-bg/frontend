import React, { useState } from 'react'
import { useMutation, UseQueryResult } from 'react-query'
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
import { ApiErrors } from 'service/apiErrors'
import {
  useCampaignType,
  useEditCampaignType,
  useCreateCampaignType,
  useCampaignTypesList,
} from 'service/campaignTypes'
import { createSlug } from 'common/util/createSlug'
import { AlertStore } from 'stores/AlertStore'
import GenericForm from 'components/common/form/GenericForm'
import FormTextField from 'components/common/form/FormTextField'
import SubmitButton from 'components/common/form/SubmitButton'

const validationSchema = yup.object().defined().shape({
  name: yup.string().required(),
  description: yup.string().notRequired(),
  parentId: yup.string().notRequired(),
})

export default function Form() {
  const router = useRouter()
  const { t } = useTranslation()
  let id = router.query.id
  const [parentId, setParentId] = useState<string>('')
  const campaignTypes = useCampaignTypesList().data

  let initialValues: CampaignTypeFormData = {
    name: '',
    description: '',
    parentId,
  }

  if (id) {
    id = String(id)
    const { data }: UseQueryResult<CampaignTypesResponse> = useCampaignType(id)

    initialValues = {
      name: data?.name || '',
      description: data?.description || '',
      parentId: data?.parentId || '',
    }
  }
  const mutationFn = id ? useEditCampaignType(id) : useCreateCampaignType()

  const mutation = useMutation<
    AxiosResponse<CampaignTypesResponse>,
    AxiosError<ApiErrors>,
    CampaignTypeFormData
  >({
    mutationFn,
    onError: () => AlertStore.show(t('documents:alerts:error'), 'error'),
    onSuccess: () => {
      AlertStore.show(id ? t('documents:alerts:edit') : t('documents:alerts:create'), 'success')
      router.push(routes.admin.campaignTypes.index)
    },
  })

  async function onSubmit(data: CampaignTypeFormData) {
    data.parentId = parentId
    if (data.parentId === '') {
      delete data['parentId']
    }
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
        <Grid sx={{ display: 'flex', marginTop: '1%' }}>
          <Grid item xs={6} sx={{ marginRight: '10%' }}>
            <FormTextField
              type="text"
              name="name"
              autoComplete="target-amount"
              label={t('campaign-types:grid:name')}
              multiline
              rows={1.5}
            />
          </Grid>
          <Grid item xs={6}>
            <FormTextField
              type="text"
              name="description"
              autoComplete="target-amount"
              label={t('campaign-types:grid:description')}
              multiline
              rows={3}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ marginTop: '1%' }}>
          <Grid item xs={12}>
            <InputLabel>{t('campaign-types:grid:category')}</InputLabel>
            <Select
              fullWidth
              sx={{
                height: '55%',
              }}
              name="parentId"
              defaultValue={initialValues.parentId || ''}
              onChange={(e: SelectChangeEvent) => {
                setParentId(e.target.value)
              }}>
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {Object.values(campaignTypes || [])?.map((type) => {
                return (
                  <MenuItem key={type.id} value={type.id}>
                    {type.name}
                  </MenuItem>
                )
              })}
            </Select>
          </Grid>
          <Grid item xs={6}>
            <SubmitButton fullWidth label={t('documents:cta:submit')} />
          </Grid>
          <Grid item xs={6}>
            <Link href={routes.admin.campaignTypes.index} passHref>
              <Button>{t('documents:cta:cancel')}</Button>
            </Link>
          </Grid>
        </Grid>
      </Box>
    </GenericForm>
  )
}
