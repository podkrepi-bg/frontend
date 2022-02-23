import React, { Dispatch, SetStateAction } from 'react'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { IconButton, Tooltip } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import ImportExportIcon from '@mui/icons-material/ImportExport'

import { ModalStore } from 'stores/dashboard/ModalStore'

type Props = {
  id: string
  setSelectedId: Dispatch<SetStateAction<string>>
  editLink: string
}

export default function GridActions({ id, setSelectedId, editLink }: Props) {
  const { t } = useTranslation('admin')
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
      <Tooltip title={t('grid-actions.view') || ''}>
        <IconButton size="small" color="primary" onClick={detailsClickHandler}>
          <ImportExportIcon />
        </IconButton>
      </Tooltip>
      <Link href={editLink} passHref>
        <Tooltip title={t('grid-actions.edit') || ''}>
          <IconButton size="small" color="primary">
            <EditIcon />
          </IconButton>
        </Tooltip>
      </Link>
      <Tooltip title={t('grid-actions.delete') || ''}>
        <IconButton size="small" color="primary" onClick={deleteClickHandler}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </>
  )
}
