import React from 'react'
import { MutationFunction, useMutation, UseQueryResult } from 'react-query'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { AxiosError, AxiosResponse } from 'axios'
import { Box, Button, Grid } from '@mui/material'

import { DocumentInput, DocumentType } from 'gql/document'
import { useDocument } from 'common/hooks/documents'
import GenericForm from 'components/common/form/GenericForm'
import FormTextField from 'components/common/form/FormTextField'
import SubmitButton from 'components/common/form/SubmitButton'
import { axios } from 'common/api-client'
import { ApiErrors } from 'common/api-errors'
import { endpoints } from 'common/api-endpoints'

export default function EditForm() {
  const router = useRouter()

  const id = String(router.query.id)
  const { data: document }: UseQueryResult<DocumentType> = useDocument(id)

  const initialValues: DocumentInput = {
    type: document?.type,
    name: document?.name,
    filename: document?.filename,
    filetype: document?.filetype,
    description: document?.description,
    sourceUrl: document?.sourceUrl,
  }

  const editDocument: MutationFunction<AxiosResponse<DocumentType>, DocumentInput> = async (
    data: DocumentInput,
  ) => {
    return await axios.put<DocumentInput, AxiosResponse<DocumentType>>(
      endpoints.documents.editDocument(id).url,
      data,
    )
  }

  const mutation = useMutation<AxiosResponse<DocumentType>, AxiosError<ApiErrors>, DocumentInput>({
    mutationFn: editDocument,
    onSuccess: () => {
      router.push('/documents')
    },
  })

  async function onEditSubmit(data: DocumentInput) {
    mutation.mutate(data)
  }

  return (
    <GenericForm onSubmit={onEditSubmit} initialValues={initialValues}>
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
