import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { UseQueryResult } from 'react-query'
import { Alert, Box, Fab, Typography } from '@mui/material'
import {
  DataGrid,
  GridColDef,
  GridColumns,
  GridRenderCellParams,
  GridRowId,
  GridSelectionModel,
} from '@mui/x-data-grid'

import { useDocumentsList } from 'common/hooks/documents'
import { DocumentResponse } from 'gql/document'

import DetailsModal from './DetailsModal'
import DeleteModal from './DeleteModal'
import DeleteAllModal from './DeleteAllModal'
import Actions from './Actions'
import { observer } from 'mobx-react'
import { useTranslation } from 'next-i18next'

export default observer(function Grid() {
  const [selectedId, setSelectedId] = useState<string>('')
  const [selectionModel, setSelectionModel] = useState<GridRowId[]>([])
  const [pageSize, setPageSize] = useState(5)
  const { t } = useTranslation()

  const { data }: UseQueryResult<DocumentResponse[]> = useDocumentsList()

  const commonProps: Partial<GridColDef> = {
    align: 'left',
    width: 150,
    headerAlign: 'left',
  }

  const columns: GridColumns = [
    {
      field: 'type',
      headerName: t('documents:type'),
      ...commonProps,
    },
    {
      field: 'name',
      headerName: t('documents:name'),
      ...commonProps,
    },
    {
      field: 'filename',
      headerName: t('documents:filename'),
      ...commonProps,
    },
    {
      field: 'filetype',
      headerName: t('documents:filetype'),
      ...commonProps,
    },
    {
      field: 'description',
      headerName: t('documents:description'),
      ...commonProps,
    },
    {
      field: 'sourceUrl',
      headerName: t('documents:sourceUrl'),
      ...commonProps,
      width: 450,
    },
    {
      field: t('documents:actions'),
      width: 200,
      align: 'right',
      renderCell: (cellValues: GridRenderCellParams) => {
        return <Actions id={cellValues.row.id} setSelectedId={setSelectedId} />
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
            setSelectionModel(newSelectionModel)
          }}
        />
      </Box>
      <DetailsModal id={selectedId} />
      <DeleteModal id={selectedId} />
      <DeleteAllModal selectionModel={selectionModel} />
    </>
  )
})
