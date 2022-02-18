import React from 'react'
import { MutationFunction, useMutation } from 'react-query'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { AxiosError, AxiosResponse } from 'axios'
import { Box, Button, Grid } from '@mui/material'
import * as yup from 'yup'

import { ApiErrors } from 'service/apiErrors'
import { apiClient } from 'service/apiClient'
import { endpoints } from 'service/apiEndpoints'
import { routes } from 'common/routes'
import { DocumentData, DocumentInput, DocumentResponse } from 'gql/document'
import GenericForm from 'components/common/form/GenericForm'
import FormTextField from 'components/common/form/FormTextField'
import SubmitButton from 'components/common/form/SubmitButton'
import { AlertStore } from 'stores/AlertStore'
import { observer } from 'mobx-react'
import { useCreateDocument } from 'service/restRequests'

const validDocumentTypes = ['invoice', 'receipt', 'medical_record', 'other']

export const validationSchema = yup
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

export default observer(function CreateForm() {
  const router = useRouter()

  const initialValues: DocumentInput = {
    type: '',
    name: '',
    filename: '',
    filetype: '',
    description: '',
    sourceUrl: '',
  }

  const mutationFn = useCreateDocument()

  const mutation = useMutation<
    AxiosResponse<DocumentResponse>,
    AxiosError<ApiErrors>,
    DocumentInput
  >({
    mutationFn,
    onError: () => AlertStore.show('An error has occured!', 'error'),
    onSuccess: () => {
      AlertStore.show('Document has been created successfully!', 'success')
      router.push(routes.documents.index)
    },
  })

  async function onCreateSubmit(data: DocumentInput) {
    mutation.mutate(data)
  }

  return (
    <GenericForm
      onSubmit={onCreateSubmit}
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
})
