import { Box, Modal, Typography } from '@mui/material'
import { DocumentType } from 'gql/document'
import React, { Dispatch, SetStateAction } from 'react'

const modalStyle: any = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'auto',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

type Props = {
  detailsOpen: boolean
  setDetailsOpen: Dispatch<SetStateAction<boolean>>
  details?: DocumentType | null
}

export default function DetailsModal({ detailsOpen, setDetailsOpen, details }: Props) {
  return (
    <Modal open={detailsOpen} onClose={() => setDetailsOpen(false)}>
      <Box sx={modalStyle}>
        <Typography sx={{ mb: 2, fontSize: 24 }}>Type: {details?.type}</Typography>
        <Typography sx={{ mb: 2, fontSize: 24 }}>Name: {details?.name}</Typography>
        <Typography sx={{ mb: 2, fontSize: 24 }}>File Name: {details?.filename}</Typography>
        <Typography sx={{ mb: 2, fontSize: 24 }}>File Type: {details?.filetype}</Typography>
        <Typography sx={{ mb: 2, fontSize: 24 }}>description: {details?.description}</Typography>
        <Typography sx={{ mb: 2, fontSize: 24 }}>
          Source url:{' '}
          {
            <a target="_blank" href={details?.sourceUrl} rel="noreferrer">
              Link
            </a>
          }
        </Typography>
      </Box>
    </Modal>
  )
}
