import React from 'react'
import { MutationFunction, useMutation } from 'react-query'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { AxiosError, AxiosResponse } from 'axios'
import { Box, Button, Grid } from '@mui/material'
import * as yup from 'yup'

import { axios } from 'common/api-client'
import { ApiErrors } from 'common/api-errors'
import { endpoints } from 'common/api-endpoints'
import { routes } from 'common/routes'
import { DocumentData, DocumentInput, DocumentResponse } from 'gql/document'
import GenericForm from 'components/common/form/GenericForm'
import FormTextField from 'components/common/form/FormTextField'
import SubmitButton from 'components/common/form/SubmitButton'

const validDocumentTypes = ['invoice', 'receipt', 'medical_record', 'other']

export const validationSchema = yup
  .object()
  .defined()
  .shape({
    type: yup.string().oneOf(validDocumentTypes).required(),
    name: yup.string().trim().min(1).max(20).required(),
    filename: yup.string().trim().min(1).max(20).required(),
    filetype: yup.string().trim().min(1).max(3),
    description: yup.string().trim().min(3).max(30),
    sourceUrl: yup.string().trim().min(3).max(50).required(),
  })

export default function CreateForm() {
  const router = useRouter()

  const initialValues: DocumentInput = {
    type: '',
    name: '',
    filename: '',
    filetype: '',
    description: '',
    sourceUrl: '',
  }

  const createDocument: MutationFunction<AxiosResponse<DocumentResponse>, DocumentInput> = async (
    data: DocumentInput,
  ) => {
    return await axios.post<DocumentInput, AxiosResponse<DocumentResponse>>(
      endpoints.documents.createDocument.url,
      data,
    )
  }

  const mutation = useMutation<
    AxiosResponse<DocumentResponse>,
    AxiosError<ApiErrors>,
    DocumentInput
  >({
    mutationFn: createDocument,
    onSuccess: () => {
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
      <Box sx={{ mt: 15, ml: 75, width: 600 }}>
        <Grid container spacing={2}>
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
