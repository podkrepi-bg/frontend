import Link from 'next/link'
import React from 'react'
import { Box, IconButton } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import ShareIcon from '@mui/icons-material/ImportExport'

import { routes } from 'common/routes'

type Props = {
  id: string
  onView: () => void
  onDelete: () => void
}

export default function GridActions({ id, onView, onDelete }: Props) {
  return (
    <Box
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
      }}>
      <IconButton size="small" onClick={onView}>
        <ShareIcon />
      </IconButton>
      <Link href={routes.admin.campaigns.edit(id)} passHref>
        <IconButton size="small">
          <EditIcon />
        </IconButton>
      </Link>
      <IconButton size="small" onClick={onDelete}>
        <DeleteIcon />
      </IconButton>
    </Box>
  )
}
