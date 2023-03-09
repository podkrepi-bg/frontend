import React from 'react'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { IconButton, Tooltip } from '@mui/material'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import PageviewOutlinedIcon from '@mui/icons-material/PageviewOutlined'

import { ModalStoreImpl } from 'stores/dashboard/ModalStore'

type Props = {
  modalStore: ModalStoreImpl
  id: string
  name: string
  editLink?: string
  disableView?: boolean
}

export default function GridActions({ modalStore, id, name, editLink, disableView }: Props) {
  const { t } = useTranslation('admin')
  const { showDetails, showDelete, setSelectedRecord } = modalStore

  function detailsClickHandler() {
    setSelectedRecord({ id, name })
    showDetails()
  }

  function deleteClickHandler() {
    setSelectedRecord({ id, name })
    showDelete()
  }

  return (
    <>
      {!disableView ? (
        <Tooltip title={t('cta.view') || ''}>
          <IconButton size="small" color="primary" onClick={detailsClickHandler}>
            <PageviewOutlinedIcon />
          </IconButton>
        </Tooltip>
      ) : (
        ''
      )}
      {editLink ? (
        <Link href={editLink} passHref>
          <Tooltip title={t('cta.edit') || ''}>
            <IconButton size="small" color="primary">
              <EditOutlinedIcon />
            </IconButton>
          </Tooltip>
        </Link>
      ) : (
        ''
      )}
      <Tooltip title={t('cta.delete') || ''}>
        <IconButton size="small" color="primary" onClick={deleteClickHandler}>
          <DeleteOutlinedIcon />
        </IconButton>
      </Tooltip>
    </>
  )
}
