import React from 'react'
import { MutationFunction, useMutation, UseQueryResult } from 'react-query'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { AxiosError, AxiosResponse } from 'axios'
import { Box, Button, Grid } from '@mui/material'

import { DocumentInput, DocumentResponse } from 'gql/document'
import { useDocument } from 'common/hooks/documents'
import { ApiErrors } from 'service/apiErrors'
import { apiClient } from 'service/apiClient'
import { endpoints } from 'service/apiEndpoints'
import { routes } from 'common/routes'
import GenericForm from 'components/common/form/GenericForm'
import FormTextField from 'components/common/form/FormTextField'
import SubmitButton from 'components/common/form/SubmitButton'

import { validationSchema } from './CreateForm'
import { AlertStore } from 'stores/AlertStore'
import { useEditDocument } from 'service/restRequests'

export default function EditForm() {
  const router = useRouter()

  const id = String(router.query.id)
  const { data }: UseQueryResult<DocumentResponse> = useDocument(id)

  const initialValues: DocumentInput = {
    type: data?.type,
    name: data?.name,
    filename: data?.filename,
    filetype: data?.filetype,
    description: data?.description,
    sourceUrl: data?.sourceUrl,
  }

  const mutationFn = useEditDocument(id)

  const mutation = useMutation<
    AxiosResponse<DocumentResponse>,
    AxiosError<ApiErrors>,
    DocumentInput
  >({
    mutationFn,
    onError: () => AlertStore.show('An error has occured!', 'error'),
    onSuccess: () => {
      AlertStore.show('Document has been edited successfully!', 'success')
      router.push(routes.documents.index)
    },
  })

  async function onEditSubmit(data: DocumentInput) {
    mutation.mutate(data)
  }

  return (
    <GenericForm
      onSubmit={onEditSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}>
      <Box sx={{ marginTop: '5%', height: '62.6vh' }}>
        <Grid container spacing={2} sx={{ width: 600, margin: '0 auto' }}>
          <Grid item xs={6}>
            <FormTextField type="text" label="Type" name="type" />
          </Grid>
          <Grid item xs={6}>
            <FormTextField type="text" label="Name" name="name" />
          </Grid>
          <Grid item xs={6}>
            <FormTextField type="text" label="File name" name="filename" />
          </Grid>
          <Grid item xs={6}>
            <FormTextField type="text" label="File type" name="filetype" />
          </Grid>
          <Grid item xs={6}>
            <FormTextField type="text" label="Description" name="description" />
          </Grid>
          <Grid item xs={6}>
            <FormTextField type="text" label="Source url" name="sourceUrl" />
          </Grid>
          <Grid item xs={6}>
            <SubmitButton fullWidth label="Submit" />
          </Grid>
          <Grid item xs={6}>
            <Link href="/documents">
              <Button>Cancel</Button>
            </Link>
          </Grid>
        </Grid>
      </Box>
    </GenericForm>
  )
}
