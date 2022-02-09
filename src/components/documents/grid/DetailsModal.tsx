import React, { Dispatch, SetStateAction } from 'react'
import { UseQueryResult } from 'react-query'
import { Box, Modal, Typography, CSSObject } from '@mui/material'

import { DocumentType } from 'gql/document'
import { useDocument } from 'common/hooks/documents'

const modalStyle: CSSObject = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'auto',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  p: 4,
}

type Props = {
  detailsOpen: boolean
  setDetailsOpen: Dispatch<SetStateAction<boolean>>
  id: string
}

export default function DetailsModal({ detailsOpen, setDetailsOpen, id }: Props) {
  const { data: document }: UseQueryResult<DocumentType> = useDocument(id)

  return (
    <Modal open={detailsOpen} onClose={() => setDetailsOpen(false)}>
      <Box sx={modalStyle}>
        <Typography sx={{ mb: 2, fontSize: 24 }}>Type: {document?.type}</Typography>
        <Typography sx={{ mb: 2, fontSize: 24 }}>Name: {document?.name}</Typography>
        <Typography sx={{ mb: 2, fontSize: 24 }}>File Name: {document?.filename}</Typography>
        <Typography sx={{ mb: 2, fontSize: 24 }}>File Type: {document?.filetype}</Typography>
        <Typography sx={{ mb: 2, fontSize: 24 }}>description: {document?.description}</Typography>
        <Typography sx={{ mb: 2, fontSize: 24 }}>
          Source url:{' '}
          {
            <a target="_blank" href={document?.sourceUrl} rel="noreferrer">
              Link
            </a>
          }
        </Typography>
      </Box>
    </Modal>
  )
}
