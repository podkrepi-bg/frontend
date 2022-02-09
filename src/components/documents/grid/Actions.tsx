import React, { Dispatch, SetStateAction } from 'react'
import Link from 'next/link'
import { IconButton } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import PageviewIcon from '@mui/icons-material/Pageview'
import { routes } from 'common/routes'

type Props = {
  id: string
  setDetailsOpen: Dispatch<SetStateAction<boolean>>
  setDeleteOpen: Dispatch<SetStateAction<boolean>>
  setSelectedId: Dispatch<SetStateAction<string>>
}

export default function Actions({ id, setDetailsOpen, setDeleteOpen, setSelectedId }: Props) {
  function detailsClickHandler() {
    setSelectedId(id)
    setDetailsOpen(true)
  }

  function deleteClickHandler() {
    setSelectedId(id)
    setDeleteOpen(true)
  }

  return (
    <>
      <IconButton size="small" sx={{ mr: 1 }} onClick={detailsClickHandler}>
        <PageviewIcon />
      </IconButton>
      <Link href={routes.documents.edit(id)}>
        <IconButton size="small" sx={{ mr: 1 }}>
          <EditIcon />
        </IconButton>
      </Link>
      <IconButton size="small" onClick={deleteClickHandler}>
        <DeleteIcon />
      </IconButton>
    </>
  )
}
