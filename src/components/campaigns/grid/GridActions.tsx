import React, { Dispatch, SetStateAction } from 'react'
import Link from 'next/link'
import { Box, IconButton } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import ShareIcon from '@mui/icons-material/ImportExport'

import { routes } from 'common/routes'
import { ModalStore } from 'stores/dashboard/ModalStore'
import { GridRenderCellParams } from '@mui/x-data-grid'

type Props = {
  id: string
  setSelectedId: Dispatch<SetStateAction<string>>
  setDetails: Dispatch<
    SetStateAction<{
      title: string
      slug: string
      description: string
      targetAmount: number
      startDate: string
      endDate: string
      essence: string
      campaignTypeId: string
      beneficiaryId: string
      coordinatorId: string
      currency: string
    }>
  >
  cellValues: GridRenderCellParams<unknown, unknown, unknown>
}

export default function GridActions({ id, setSelectedId, setDetails, cellValues }: Props) {
  const { showDetails, showDelete } = ModalStore

  function detailsClickHandler(cellValues: GridRenderCellParams) {
    setSelectedId(id)
    setDetails({ ...cellValues.row })
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
      <IconButton size="small" onClick={() => detailsClickHandler(cellValues)}>
        <ShareIcon />
      </IconButton>
      <Link href={routes.admin.campaigns.edit(id)} passHref>
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
