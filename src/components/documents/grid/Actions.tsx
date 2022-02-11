import React, { Dispatch, SetStateAction } from 'react'
import Link from 'next/link'
import { IconButton } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import PageviewIcon from '@mui/icons-material/Pageview'

import { routes } from 'common/routes'
import { ModalStore } from 'stores/ModalStore'

type Props = {
  id: string
  setSelectedId: Dispatch<SetStateAction<string>>
}

export default function Actions({ id, setSelectedId }: Props) {
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
