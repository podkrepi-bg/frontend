import Link from 'next/link'
import React from 'react'
import { Box, IconButton } from '@mui/material'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import PageviewOutlinedIcon from '@mui/icons-material/PageviewOutlined'

import { routes } from 'common/routes'

type Props = {
  id: string
  allowDelete?: boolean
  onView: () => void
  onDelete: () => void
}

export default function GridActions({ id, allowDelete = false, onView, onDelete }: Props) {
  return (
    <Box
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
      }}>
      <IconButton size="small" color="primary" onClick={onView}>
        <PageviewOutlinedIcon />
      </IconButton>
      <Link href={routes.admin.campaigns.edit(id)} passHref>
        <IconButton size="small" color="primary">
          <EditOutlinedIcon />
        </IconButton>
      </Link>
      {allowDelete && (
        <IconButton size="small" color="primary" onClick={onDelete}>
          <DeleteOutlinedIcon />
        </IconButton>
      )}
    </Box>
  )
}
