import React, { Dispatch, SetStateAction } from 'react'
import Link from 'next/link'
import { IconButton } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import PageviewIcon from '@mui/icons-material/Pageview'
import { GridRenderCellParams } from '@mui/x-data-grid'

type Props = {
  cellValues: GridRenderCellParams
  setDetailsOpen: Dispatch<SetStateAction<boolean>>
  setDeleteOpen: Dispatch<SetStateAction<boolean>>
  setSelectedId: Dispatch<SetStateAction<string>>
}

export default function Actions({
  cellValues,
  setDetailsOpen,
  setDeleteOpen,
  setSelectedId,
}: Props) {
  function detailsClickHandler() {
    setSelectedId(cellValues.row.id)
    setDetailsOpen(true)
  }

  function deleteClickHandler() {
    setSelectedId(cellValues.row.id)
    setDeleteOpen(true)
  }

  return (
    <>
      <IconButton
        size="small"
        sx={{ mr: 1 }}
        onClick={() => {
          detailsClickHandler()
        }}>
        <PageviewIcon />
      </IconButton>
      <Link href={`/documents/${cellValues.row.id}/edit`}>
        <IconButton size="small" sx={{ mr: 1 }}>
          <EditIcon />
        </IconButton>
      </Link>
      <IconButton
        size="small"
        onClick={() => {
          deleteClickHandler()
        }}>
        <DeleteIcon />
      </IconButton>
    </>
  )
}
