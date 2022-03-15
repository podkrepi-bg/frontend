import React from 'react'
import { useMutation, UseQueryResult } from 'react-query'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { AxiosError, AxiosResponse } from 'axios'
import * as yup from 'yup'
import { Box, Button, Grid, Typography } from '@mui/material'

import { DocumentInput, DocumentResponse } from 'gql/document'
import { useDocument } from 'common/hooks/documents'
import { routes } from 'common/routes'
import { ApiErrors } from 'service/apiErrors'
import { useCreateDocument, useEditDocument } from 'service/document'
import { AlertStore } from 'stores/AlertStore'
import GenericForm from 'components/common/form/GenericForm'
import FormTextField from 'components/common/form/FormTextField'
import SubmitButton from 'components/common/form/SubmitButton'

const validDocumentTypes = ['invoice', 'receipt', 'medical_record', 'other']

const validationSchema = yup
  .object()
  .defined()
  .shape({
    type: yup.string().oneOf(validDocumentTypes).required(),
    name: yup.string().trim().min(2).max(20).required(),
    filename: yup.string().trim().min(2).max(20).required(),
    filetype: yup.string().trim().max(3),
    description: yup.string().trim().max(30),
    sourceUrl: yup.string().trim().min(3).required(),
  })

export default function EditForm() {
  const router = useRouter()
  const { t } = useTranslation()

  let id = router.query.id

  let initialValues: DocumentInput = {
    type: '',
    name: '',
    filename: '',
    filetype: '',
    description: '',
    sourceUrl: '',
  }

  if (id) {
    id = String(id)
    const { data }: UseQueryResult<DocumentResponse> = useDocument(id)

    initialValues = {
      type: data?.type,
      name: data?.name,
      filename: data?.filename,
      filetype: data?.filetype,
      description: data?.description,
      sourceUrl: data?.sourceUrl,
    }
  }

  const mutationFn = id ? useEditDocument(id) : useCreateDocument()

  const mutation = useMutation<
    AxiosResponse<DocumentResponse>,
    AxiosError<ApiErrors>,
    DocumentInput
  >({
    mutationFn,
    onError: () => AlertStore.show(t('documents:alerts:error'), 'error'),
    onSuccess: () => {
      AlertStore.show(id ? t('documents:alerts:edit') : t('documents:alerts:create'), 'success')
      router.push(routes.admin.documents.index)
    },
  })

  async function onSubmit(data: DocumentInput) {
    mutation.mutate(data)
  }

  return (
    <GenericForm
      onSubmit={onSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}>
      <Box sx={{ marginTop: '5%', height: '62.6vh' }}>
        <Typography variant="h5" component="h2" sx={{ marginBottom: 2, textAlign: 'center' }}>
          {id ? t('documents:edit-form-heading') : t('documents:form-heading')}
        </Typography>
        <Grid container spacing={2} sx={{ width: 600, margin: '0 auto' }}>
          <Grid item xs={6}>
            <FormTextField type="text" label={t('documents:type')} name="type" />
          </Grid>
          <Grid item xs={6}>
            <FormTextField type="text" label={t('documents:name')} name="name" />
          </Grid>
          <Grid item xs={6}>
            <FormTextField type="text" label={t('documents:filename')} name="filename" />
          </Grid>
          <Grid item xs={6}>
            <FormTextField type="text" label={t('documents:filetype')} name="filetype" />
          </Grid>
          <Grid item xs={6}>
            <FormTextField type="text" label={t('documents:description')} name="description" />
          </Grid>
          <Grid item xs={6}>
            <FormTextField type="text" label={t('documents:sourceUrl')} name="sourceUrl" />
          </Grid>
          <Grid item xs={6}>
            <SubmitButton fullWidth label={t('documents:cta:submit')} />
          </Grid>
          <Grid item xs={6}>
            <Link passHref href={routes.admin.documents.index}>
              <Button>{t('documents:cta:cancel')}</Button>
            </Link>
          </Grid>
        </Grid>
      </Box>
    </GenericForm>
  )
}
