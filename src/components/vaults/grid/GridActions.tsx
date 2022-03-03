import React, { Dispatch, SetStateAction } from 'react'
import Link from 'next/link'
import { Box, IconButton } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import ImportExportIcon from '@mui/icons-material/ImportExport'

import { routes } from 'common/routes'
import { ModalStore } from 'stores/documents/ModalStore'

type Props = {
  id: string
  setSelectedId: Dispatch<SetStateAction<string>>
}

export default function GridActions({ id, setSelectedId }: Props) {
  const { showDetails, showDelete } = ModalStore

  function detailsClickHandler() {
    setSelectedId(id)
    showDetails()
  }

  function deleteClickHandler() {
    setSelectedId(id)
    showDelete()
  }

  return (
    <Box
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
      }}>
      <IconButton size="small" onClick={detailsClickHandler}>
        <ImportExportIcon />
      </IconButton>
      <Link href={routes.admin.vaults.edit(id)}>
        <IconButton size="small">
          <EditIcon />
        </IconButton>
      </Link>
      <IconButton size="small" onClick={deleteClickHandler}>
        <DeleteIcon />
      </IconButton>
    </Box>
  )
}
