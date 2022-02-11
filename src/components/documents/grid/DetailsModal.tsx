import React, { Dispatch, SetStateAction } from 'react'
import { UseQueryResult } from 'react-query'
import { observer } from 'mobx-react'
import { Dialog, Card, CardContent, Typography, Divider } from '@mui/material'

import { DocumentResponse } from 'gql/document'
import { useDocument } from 'common/hooks/documents'
import { ModalStore } from 'stores/ModalStore'

type Props = {
  id: string
}

export default observer(function DetailsModal({ id }: Props) {
  const { data }: UseQueryResult<DocumentResponse> = useDocument(id)
  const { isDetailsOpen, hideDetails } = ModalStore

  return (
    <Dialog open={isDetailsOpen} onClose={hideDetails} sx={{ top: '-35%' }}>
      <Card>
        <CardContent>
          <Typography variant="h5" sx={{ marginBottom: '16px' }}>
            Document details:
          </Typography>
          <Divider />
          <Typography variant="body1" sx={{ fontSize: 24, marginTop: '8px' }}>
            Type: {data?.type}
          </Typography>
          <Typography variant="body1" sx={{ fontSize: 24 }}>
            Name: {data?.name}
          </Typography>
          <Typography variant="body1" sx={{ fontSize: 24 }}>
            File Name: {data?.filename}
          </Typography>
          <Typography variant="body1" sx={{ fontSize: 24 }}>
            File Type: {data?.filetype}
          </Typography>
          <Typography variant="body1" sx={{ fontSize: 24 }}>
            description: {data?.description}
          </Typography>
          <Typography variant="body1" sx={{ fontSize: 24 }}>
            Source url:{' '}
            {
              <a target="_blank" href={data?.sourceUrl} rel="noreferrer">
                Link
              </a>
            }
          </Typography>
        </CardContent>
      </Card>
    </Dialog>
  )
})
