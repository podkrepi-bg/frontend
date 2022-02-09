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
  id: string
  detailsOpen: boolean
  setDetailsOpen: Dispatch<SetStateAction<boolean>>
}

export default function DetailsModal({ id, detailsOpen, setDetailsOpen }: Props) {
  const { data }: UseQueryResult<DocumentType> = useDocument(id)

  return (
    <Modal open={detailsOpen} onClose={() => setDetailsOpen(false)}>
      <Box sx={modalStyle}>
        <Typography sx={{ mb: 2, fontSize: 24 }}>Type: {data?.type}</Typography>
        <Typography sx={{ mb: 2, fontSize: 24 }}>Name: {data?.name}</Typography>
        <Typography sx={{ mb: 2, fontSize: 24 }}>File Name: {data?.filename}</Typography>
        <Typography sx={{ mb: 2, fontSize: 24 }}>File Type: {data?.filetype}</Typography>
        <Typography sx={{ mb: 2, fontSize: 24 }}>description: {data?.description}</Typography>
        <Typography sx={{ mb: 2, fontSize: 24 }}>
          Source url:{' '}
          {
            <a target="_blank" href={data?.sourceUrl} rel="noreferrer">
              Link
            </a>
          }
        </Typography>
      </Box>
    </Modal>
  )
}
