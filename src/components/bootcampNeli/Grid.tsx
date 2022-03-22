import { observer } from 'mobx-react'
import React, { useState } from 'react'
import { UseQueryResult } from 'react-query'
import { useTranslation } from 'next-i18next'

import { Box } from '@mui/material'
import {
  DataGrid,
  GridColumns,
  GridRenderCellParams,
  GridRowId,
  GridSelectionModel,
} from '@mui/x-data-grid'

import { useBootcampNeliList } from 'common/hooks/bookcampNeli'

import { ModalStore } from 'stores/bootcampNeli/ModalStore'

import GridActions from './GridActions'
import DeleteModal from './modals/DeleteModal'
import DetailsModal from './modals/DetailsModal'
import DeleteSelectedModal from './modals/DeleteSelectedModal'

import { BootcampNeliResponse } from 'gql/bootcampNeli'

export default observer(function BootcampNeliGrid() {
  const [selectedId, setSelectedId] = useState<string>('')
  const [selectionModel, setSelectionModel] = useState<GridRowId[]>([])
  const [pageSize, setPageSize] = useState(5)
  const { t } = useTranslation()
  const { selectedPositive, selectedNegative } = ModalStore
  const { data }: UseQueryResult<BootcampNeliResponse[]> = useBootcampNeliList()

  const columns: GridColumns = [
    {
      field: 'id',
      headerName: 'ID',
      hide: true,
    },
    {
      field: 'firstName',
      headerName: t('bootcampNeli:first-name'),
      editable: false,
      width: 200,
      flex: 1,
    },
    {
      field: 'lastName',
      headerName: t('bootcampNeli:last-name'),
      editable: false,
      width: 200,
      flex: 1,
    },
    {
      field: 'email',
      headerName: t('bootcampNeli:email'),
      editable: false,
      width: 200,
      flex: 1,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 200,
      align: 'center',
      renderCell: (cellValues: GridRenderCellParams) => {
        return <GridActions id={cellValues.row.id} setSelectedId={setSelectedId} />
      },
    },
  ]

  return (
    <>
      <Box sx={{ marginTop: '2%', mx: 'auto', width: 700 }}>
        <DataGrid
          style={{
            background: 'white',
            position: 'absolute',
            height: 'calc(100vh - 300px)',
            border: 'none',
            width: 'calc(100% - 48px)',
            left: '24px',
            overflowY: 'auto',
            overflowX: 'hidden',
            borderRadius: '0 0 13px 13px',
          }}
          rows={data || []}
          columns={columns}
          rowsPerPageOptions={[5, 10]}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          autoHeight
          autoPageSize
          disableSelectionOnClick
          checkboxSelection
          onSelectionModelChange={(newSelectionModel: GridSelectionModel) => {
            newSelectionModel.length !== 0 ? selectedPositive() : selectedNegative()
            setSelectionModel(newSelectionModel)
          }}
        />
      </Box>
      <DetailsModal id={selectedId} />
      <DeleteModal id={selectedId} />
      <DeleteSelectedModal selectionModel={selectionModel} />
    </>
  )
})
